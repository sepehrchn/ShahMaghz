#!/bin/bash
# Optimize images locally before Cloudinary upload.
# Uses macOS `sips` for resize and basic JPEG recompress.

RAW_DIR="images/raw"
OUT_DIR="images/optimized"

mkdir -p "$OUT_DIR"

echo "═══════════════════════════════════════════════════════"
echo "  🖼️  ShahMaghz — Local Image Pre-Optimization"
echo "═══════════════════════════════════════════════════════"
echo ""

# Category images → 1200px wide, JPEG quality ~80%
CATEGORY_FILES=("nuts.jpg" "dried-fruits.jpg" "chocolate-dipped.jpg" "gift-boxes.jpg")
for f in "${CATEGORY_FILES[@]}"; do
  echo "🔄 Processing: $f"
  SRC="$RAW_DIR/$f"
  DST="$OUT_DIR/$f"

  if [ ! -f "$SRC" ]; then
    echo "  ❌ Not found: $SRC"
    continue
  fi

  ORIG_SIZE=$(stat -f%z "$SRC")

  # Copy first
  cp "$SRC" "$DST"

  # Resize: max dimension 1200px (maintains aspect ratio)
  sips --resampleWidth 1200 "$DST" > /dev/null 2>&1

  # Recompress as JPEG
  sips --setProperty format jpeg --setProperty formatOptions 80 "$DST" > /dev/null 2>&1

  NEW_SIZE=$(stat -f%z "$DST")
  SAVINGS=$(echo "scale=0; (1 - $NEW_SIZE / $ORIG_SIZE) * 100" | bc 2>/dev/null || echo "?")

  NEW_W=$(sips -g pixelWidth "$DST" 2>/dev/null | grep pixelWidth | awk '{print $2}')
  NEW_H=$(sips -g pixelHeight "$DST" 2>/dev/null | grep pixelHeight | awk '{print $2}')

  echo "  📦 Original:  $(echo "scale=0; $ORIG_SIZE / 1024" | bc) KB"
  echo "  📉 Optimized: $(echo "scale=0; $NEW_SIZE / 1024" | bc) KB (~${SAVINGS}% savings)"
  echo "  📐 Dimensions: ${NEW_W}x${NEW_H}"
  echo ""
done

# About page old-shop → 800px wide (portrait), JPEG quality ~80%
echo "🔄 Processing: old-shop.jpg (portrait)"
SRC="$RAW_DIR/old-shop.jpg"
DST="$OUT_DIR/old-shop.jpg"
if [ -f "$SRC" ]; then
  ORIG_SIZE=$(stat -f%z "$SRC")
  cp "$SRC" "$DST"
  sips --resampleWidth 800 "$DST" > /dev/null 2>&1
  sips --setProperty format jpeg --setProperty formatOptions 80 "$DST" > /dev/null 2>&1
  NEW_SIZE=$(stat -f%z "$DST")
  SAVINGS=$(echo "scale=0; (1 - $NEW_SIZE / $ORIG_SIZE) * 100" | bc 2>/dev/null || echo "?")
  NEW_W=$(sips -g pixelWidth "$DST" 2>/dev/null | grep pixelWidth | awk '{print $2}')
  NEW_H=$(sips -g pixelHeight "$DST" 2>/dev/null | grep pixelHeight | awk '{print $2}')
  echo "  📦 Original:  $(echo "scale=0; $ORIG_SIZE / 1024" | bc) KB"
  echo "  📉 Optimized: $(echo "scale=0; $NEW_SIZE / 1024" | bc) KB (~${SAVINGS}% savings)"
  echo "  📐 Dimensions: ${NEW_W}x${NEW_H}"
  echo ""
fi

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  📊  Summary"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "Optimized files in: $OUT_DIR/"
ls -lah "$OUT_DIR/"
echo ""
echo "✅ Ready for Cloudinary upload!"
