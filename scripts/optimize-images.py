#!/usr/bin/env python3
"""Optimize deployed raster assets without changing source files."""
from pathlib import Path
from PIL import Image, ImageOps, UnidentifiedImageError
import re

root = Path("dist")
mapping = {}
total_before = total_after = 0
for path in list(root.rglob("*")):
    if not path.is_file() or path.suffix.lower() not in {".png", ".jpg", ".jpeg", ".webp", ".bmp", ".tif", ".tiff"}:
        continue
    try:
        with Image.open(path) as im:
            im = ImageOps.exif_transpose(im)
            if getattr(im, "is_animated", False):
                continue
            old_size = path.stat().st_size
            target = path.with_suffix(".webp")
            if path.suffix.lower() == ".webp":
                target = path
            mode = "RGBA" if "A" in im.getbands() else "RGB"
            im = im.convert(mode)
            im.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
            temp = path.with_name(path.name + ".optimized")
            im.save(temp, format="WEBP", quality=78, method=6)
            new_size = temp.stat().st_size
            if target == path and new_size >= old_size:
                temp.unlink()
                continue
            if target != path and new_size >= old_size and path.suffix.lower() != ".webp":
                # Convert regardless: requested consistent WebP delivery.
                pass
            temp.replace(target)
            if target != path:
                path.unlink()
                mapping[path.relative_to(root).as_posix()] = target.relative_to(root).as_posix()
            total_before += old_size
            total_after += new_size
    except (OSError, ValueError, UnidentifiedImageError) as exc:
        print(f"Skipping {path}: {exc}")

# Rewrite references in generated site only, preserving source assets in git.
for path in root.rglob("*"):
    if not path.is_file() or path.suffix.lower() not in {".html", ".css", ".js", ".json", ".xml"}:
        continue
    try:
        content = path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        continue
    updated = content
    for old, new in mapping.items():
        updated = updated.replace(old, new)
    if updated != content:
        path.write_text(updated, encoding="utf-8")
print(f"Optimized raster images: {total_before:,} -> {total_after:,} bytes; converted {len(mapping)} paths to WebP")
