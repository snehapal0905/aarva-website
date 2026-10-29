"""Turn the picked hero candidates into production assets in src/assets/hero/.

Run from the project root:  python -I scripts/process-hero.py
Needs: pillow, numpy, opencv-python-headless, rembg (cpu).
"""
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageFilter
from rembg import new_session, remove

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'media-candidates'
OUT = ROOT / 'src' / 'assets' / 'hero'
OUT.mkdir(parents=True, exist_ok=True)
session = new_session('birefnet-general-lite')


def load(rel):
    return Image.open(SRC / rel).convert('RGB')


def cutout(img, pad=0.04):
    """Background removal, keep only the largest object, trim to its box."""
    rgba = remove(img, session=session, post_process_mask=True)
    a = np.array(rgba)[:, :, 3]
    n, labels, stats, _ = cv2.connectedComponentsWithStats((a > 40).astype(np.uint8))
    if n > 1:
        areas = stats[1:, cv2.CC_STAT_AREA]
        keep = 1 + np.flatnonzero(areas >= 0.15 * areas.max())
        a = np.where(np.isin(labels, keep), a, 0).astype(np.uint8)
    arr = np.array(rgba)
    arr[:, :, 3] = a
    out = Image.fromarray(arr)
    box = out.getbbox()
    out = out.crop(box)
    p = int(max(out.size) * pad)
    framed = Image.new('RGBA', (out.width + 2 * p, out.height + 2 * p))
    framed.paste(out, (p, p))
    return framed


def save(img, name, width=None):
    if width and img.width > width:
        img = img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)
    path = OUT / name
    if img.mode == 'RGBA':
        img.save(path.with_suffix('.png'), optimize=True)
    else:
        img.save(path.with_suffix('.jpg'), quality=86, optimize=True, progressive=True)
    print('wrote', path.name, img.size)


# --- Plane: NASA DC-8 (public domain). Retouch the tail logo and registration, cut out, face left.
plane = np.array(load('plane/04.jpg'))
h, w = plane.shape[:2]
sx, sy = w / 480, h / 370
mask = np.zeros((h, w), np.uint8)
for (x0, y0, x1, y1) in [(52, 155, 90, 185), (92, 200, 122, 214)]:  # tail logo, registration (thumb coords)
    X0, Y0, X1, Y1 = int(x0 * sx), int(y0 * sy), int(x1 * sx), int(y1 * sy)
    region = plane[Y0:Y1, X0:X1].astype(int)
    sat = region.max(axis=2) - region.min(axis=2)
    dark = region.mean(axis=2) < 170
    mask[Y0:Y1, X0:X1] = ((sat > 28) | dark).astype(np.uint8) * 255
mask = cv2.dilate(mask, np.ones((7, 7), np.uint8))
plane = cv2.inpaint(plane, mask, 9, cv2.INPAINT_TELEA)
p = cutout(Image.fromarray(plane), pad=0.01).transpose(Image.FLIP_LEFT_RIGHT)
save(p, 'plane', 2400)

# --- Parts: NARA photos (public domain). Boxes in thumbnail coordinates (480 wide).
parts = [
    ('part-bracket', 'parts/06.jpg', (14, 78, 166, 276)),
    ('part-housing', 'parts/04.jpg', (34, 42, 252, 282)),
    ('part-block', 'parts/06.jpg', (156, 124, 250, 270)),
    ('part-spacer', 'parts/04.jpg', (260, 108, 404, 294)),
    ('part-valve', 'parts/06.jpg', (340, 158, 410, 270)),
    ('part-panel', 'parts/06.jpg', (258, 134, 330, 274)),
]
for name, rel, (x0, y0, x1, y1) in parts:
    img = load(rel)
    s = img.width / 480
    crop = img.crop((int(x0 * s), int(y0 * s), int(x1 * s), int(y1 * s)))
    save(cutout(crop), name, 1100)

# --- Cloud puffs: luminance / blue-sky key.
def sky_key(img):
    arr = np.array(img).astype(np.float32)
    r, b = arr[..., 0], arr[..., 2]
    blueness = np.clip((b - r) / np.maximum(b, 1), 0, 1)
    bright = arr.mean(axis=2) / 255
    alpha = 1 - np.clip((blueness - 0.06) / 0.22, 0, 1)
    alpha *= np.clip((bright - 0.45) / 0.25, 0, 1)
    alpha = cv2.GaussianBlur(alpha, (0, 0), 2)
    # Neutralise the blue cast the sky leaves in the cloud edges.
    grey = arr.mean(axis=2, keepdims=True)
    arr = arr * 0.4 + grey * 0.6
    return Image.fromarray(np.dstack([arr, alpha * 255]).astype(np.uint8))


def feathered(c):
    """Feather the crop edges so no straight line ever shows."""
    fw, fh = c.size
    yy, xx = np.mgrid[0:fh, 0:fw]
    edge = np.minimum.reduce([xx, fw - 1 - xx, yy, fh - 1 - yy]).astype(np.float32)
    a = np.array(c)
    a[..., 3] = (a[..., 3] * np.clip(edge / (0.18 * min(fw, fh)), 0, 1)).astype(np.uint8)
    return Image.fromarray(a)


pd_sky = sky_key(load('cloud-puffs/03.jpg'))  # public domain
s = pd_sky.width / 480
for i, (x0, y0, x1, y1) in enumerate([(0, 590, 480, 720), (150, 40, 430, 200)], 1):
    save(feathered(pd_sky.crop((int(x0 * s), int(y0 * s), int(x1 * s), int(y1 * s)))), f'puff-{i}', 1400)
# The near layer reuses the band mirrored, so every cloud stays public domain.
save(feathered(pd_sky.crop((0, int(590 * s), pd_sky.width, int(720 * s)))).transpose(Image.FLIP_LEFT_RIGHT), 'puff-3', 1400)

# --- Backgrounds.
gold = load('sky/03.jpg')  # Soyuz landing photo, cropped to exclude the parachute
gs = gold.width / 480
save(gold.crop((int(150 * gs), int(30 * gs), gold.width, int(236 * gs))), 'sky-day', 2400)
save(load('sky/01.jpg'), 'sky-dusk', 2400)

for side, rel, box in [('left', 'clouds-wall/05.jpg', (0, 80, 310, 360)), ('right', 'clouds-wall/08.jpg', (0, 80, 300, 300))]:
    img = load(rel)
    k = img.width / 480
    c = img.crop(tuple(int(v * k) for v in box))
    if side == 'right':
        c = c.transpose(Image.FLIP_LEFT_RIGHT)
    # Lift shadows so the wall reads as bright, thick cloud behind the navy title.
    c = Image.eval(c, lambda v: int(255 * ((v / 255) ** 0.72)))
    save(c, f'clouds-{side}', 1800)
    save(c.filter(ImageFilter.GaussianBlur(18)), f'clouds-{side}-blur', 900)
