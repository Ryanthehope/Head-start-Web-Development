# Phase 1: WebP Image Conversion Instructions

## Images to Convert

You need to convert 4 images from JPG to WebP format:

1. **Logo/Logo.png** → `Logo/Logo.webp`
2. **images/logo.jpg** → `images/logo.webp`
3. **images/meeting.jpg** → `images/meeting.webp`
4. **images/runner.jpg** → `images/runner.webp`
5. **images/coming soon.jpg** → `images/coming-soon.webp`

Note: `images/timmorris.webp` is already WebP format ✅

---

## Method 1: Online Tool (Easiest)

### Using Squoosh (Recommended)

1. **Visit:** https://squoosh.app/
2. **For each image:**
   - Drag and drop the JPG/PNG file
   - Select "WebP" from compression options
   - Adjust quality (recommended: 85-90 for photos, 95 for logo)
   - Click "Download" to save the WebP version
3. **Save files:**
   - Keep original JPG/PNG files (needed as fallback)
   - Save WebP versions with same filename: `logo.webp`, `meeting.webp`, etc.

**Estimated time:** 5-10 minutes

---

## Method 2: Batch Conversion with CloudConvert

1. **Visit:** https://cloudconvert.com/jpg-to-webp
2. **Upload all JPG files at once**
3. **Set quality:** 85%
4. **Convert and download**
5. **Rename files** to match originals

---

## Method 3: PowerShell (Requires ImageMagick)

### Install ImageMagick

```powershell
# Using Chocolatey
choco install imagemagick

# OR download from: https://imagemagick.org/script/download.php
```

### Convert Images

```powershell
cd "C:\Users\ryan_\Documents\Websites\Head Start Web Development"

# Convert logo
magick Logo/Logo.png -quality 95 Logo/Logo.webp

# Convert images
magick images/logo.jpg -quality 85 images/logo.webp
magick images/meeting.jpg -quality 85 images/meeting.webp
magick images/runner.jpg -quality 85 images/runner.webp
magick "images/coming soon.jpg" -quality 85 images/coming-soon.webp
```

---

## Creating Responsive Variants (Optional - Advanced)

For maximum performance, create 3 sizes of each image:

### Recommended Sizes
- **-320w.webp**: 320px width (mobile)
- **-640w.webp**: 640px width (tablet)
- **-1024w.webp**: 1024px width (desktop)

### Using ImageMagick:

```powershell
# Example for meeting.jpg
magick images/meeting.jpg -resize 320x -quality 85 images/meeting-320w.webp
magick images/meeting.jpg -resize 640x -quality 85 images/meeting-640w.webp
magick images/meeting.jpg -resize 1024x -quality 85 images/meeting-1024w.webp

# Repeat for runner.jpg
magick images/runner.jpg -resize 320x -quality 85 images/runner-320w.webp
magick images/runner.jpg -resize 640x -quality 85 images/runner-640w.webp
magick images/runner.jpg -resize 1024x -quality 85 images/runner-1024w.webp
```

**Note:** For logo and portfolio card images, single size is fine (they're smaller).

---

## After Conversion: Update HTML

Once you've created the WebP files, let me know and I'll update the HTML to use `<picture>` elements with WebP + fallback.

Example of what I'll implement:

```html
<picture>
  <source type="image/webp" srcset="images/meeting-320w.webp 320w,
                                     images/meeting-640w.webp 640w,
                                     images/meeting-1024w.webp 1024w"
          sizes="(max-width: 600px) 100vw, 50vw">
  <img src="images/meeting.jpg" width="800" height="600" alt="Meeting room" loading="lazy">
</picture>
```

---

## File Checklist

After conversion, you should have:

### Logo folder:
- ✅ Logo.png (original - keep)
- ✅ Logo.webp (new)

### Images folder:
- ✅ logo.jpg (original - keep)
- ✅ logo.webp (new)
- ✅ meeting.jpg (original - keep)
- ✅ meeting.webp (new)
- ✅ runner.jpg (original - keep)
- ✅ runner.webp (new)
- ✅ coming soon.jpg (original - keep)
- ✅ coming-soon.webp (new) *Note: renamed to remove space*
- ✅ timmorris.webp (already exists)

### Optional responsive variants:
- meeting-320w.webp, meeting-640w.webp, meeting-1024w.webp
- runner-320w.webp, runner-640w.webp, runner-1024w.webp

---

## Expected Results

**File size comparison:**
- JPG: ~200-500KB each
- WebP (85% quality): ~50-150KB each (60-70% smaller)
- Total savings: ~1-2MB across all images

**Performance impact:**
- Faster page loads (especially on mobile)
- Lower bandwidth usage
- Better Lighthouse score

---

## Next Steps

1. ✅ Convert images to WebP
2. ✅ (Optional) Create responsive variants
3. ✅ Let me know when done - I'll update HTML with `<picture>` elements
4. ✅ Test images load correctly in all browsers

**Estimated time:** 15-30 minutes (10-15 min conversion + 5-10 min validation)
