# Phase 0: PurgeCSS Instructions

## Current Status
✅ Bootstrap JS removed from all HTML files  
✅ Resource hints added to all pages  
✅ Image optimization complete (width/height, lazy loading, fetchpriority)

## Bootstrap Class Analysis

**Your site uses only ~48 unique Bootstrap classes** out of hundreds available in the framework.

Most-used categories:
- Flexbox utilities (40+ instances): `d-flex`, `justify-content-*`, `align-items-*`
- Spacing utilities (50+ instances): `py-*`, `px-*`, `my-*`, `mb-*`
- Grid system: `container`, `row`, `col-md-*` (medium breakpoint focused)
- Components: Cards (6), Navigation (8), Buttons (2)

**Recommendation:** PurgeCSS will significantly reduce Bootstrap CSS from 26KB → estimated 8-12KB.

---

## Option 1: Online Tool (Easiest - No Installation)

### Using PurgeCSS Online

1. **Download Bootstrap CSS from CDN:**
   - Visit: https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css
   - Save as `bootstrap-original.css` in your project folder

2. **Visit PurgeCSS Online Tool:**
   - Go to: https://purgecss.com/
   - OR use: https://www.purgecss-online.com/

3. **Upload files:**
   - Upload `bootstrap-original.css`
   - Upload all 4 HTML files: `index.html`, `portfolio.html`, `pricing.html`, `contact.html`

4. **Run PurgeCSS**
   - Click "Purge CSS"
   - Download the result as `bootstrap-purged.css`

5. **Check file size:**
   - Original: ~26KB
   - Expected: 8-12KB
   - If <8KB: **Perfect! Use this.**
   - If 8-15KB: Still good, proceed
   - If >15KB: Consider custom CSS instead

6. **Update HTML files:**
   Replace in all 4 HTML files:
   ```html
   <!-- OLD -->
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css"
         rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT"
         crossorigin="anonymous">
   
   <!-- NEW -->
   <link rel="stylesheet" href="bootstrap-purged.css">
   ```

7. **Test all pages:**
   - Open each page in browser
   - Verify everything looks identical
   - Check responsive behavior (resize browser)
   - If anything breaks, revert and try Option 2

---

## Option 2: Command Line Tool (Requires Node.js)

### Prerequisites
- Node.js installed (check: `node --version` in terminal)

### Steps

1. **Open PowerShell in your project directory:**
   ```powershell
   cd "C:\Users\ryan_\Documents\Websites\Head Start Web Development"
   ```

2. **Download Bootstrap CSS:**
   ```powershell
   Invoke-WebRequest -Uri "https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" -OutFile "bootstrap-original.css"
   ```

3. **Run PurgeCSS (one-time, no install):**
   ```powershell
   npx purgecss --css bootstrap-original.css --content *.html --output bootstrap-purged.css
   ```

4. **Check the result:**
   ```powershell
   Get-ChildItem bootstrap*.css | Select-Object Name, Length
   ```
   
   You should see:
   - `bootstrap-original.css` - ~26KB
   - `bootstrap-purged.css` - ~8-12KB

5. **Update HTML files** (same as Option 1, step 6)

6. **Clean up (optional):**
   ```powershell
   Remove-Item bootstrap-original.css
   ```

---

## Option 3: Alternative - UnCSS Online

If PurgeCSS doesn't work well:

1. Visit: https://uncss-online.com/
2. Paste your HTML content (one page at a time)
3. Let it analyze
4. Download cleaned CSS
5. Combine results from all 4 pages

---

## After PurgeCSS: Decision Point

### If purged Bootstrap is <8KB:
✅ **STOP HERE** - You're done with Bootstrap optimization!  
✅ Keep purged Bootstrap  
✅ Skip to Phase 1 (WebP image conversion) next  

### If purged Bootstrap is 8-15KB:
⚠️ **Evaluate:** Is 15KB acceptable? If yes, keep it. If no, consider custom CSS.

### If purged Bootstrap is >15KB:
🔴 **Proceed to custom CSS** (Phase 2-3 in the plan)  
🔴 This means Bootstrap has too much bloat even after purging

---

## Testing After PurgeCSS

1. **Visual regression:** Open all 4 pages, compare before/after
2. **Responsive test:** Resize browser to mobile (375px), tablet (768px), desktop (1200px)
3. **Interactive elements:** 
   - Hover over navigation links (should still animate)
   - Hover over cards (should still elevate)
   - Test form on contact page
4. **Browser console:** Check for CSS warnings
5. **Lighthouse audit:** Run in Chrome DevTools (should improve performance score)

---

## Common Issues & Fixes

**Issue:** Some styling is missing after PurgeCSS  
**Fix:** PurgeCSS may have removed classes used dynamically in JS. Check `myscripts.js` for class additions (like `.fade-in-visible`). Add these to a safelist.

**Issue:** Flexbox layout broken  
**Fix:** Ensure all HTML files were included in the PurgeCSS scan. Re-run with all 4 files.

**Issue:** Buttons/cards look wrong  
**Fix:** PurgeCSS may have removed component CSS. Download full Bootstrap and manually extract card/button classes.

---

## Next Steps After PurgeCSS

1. ✅ Update HTML files to use `bootstrap-purged.css`
2. ✅ Test all pages thoroughly
3. ✅ Move to Task 6: Convert images to WebP
4. ✅ Then proceed with remaining performance optimizations

---

## Questions?

If PurgeCSS doesn't work as expected or you encounter issues, let me know and we can:
- Troubleshoot the PurgeCSS output
- Manually create a minimal Bootstrap file
- Or proceed directly to custom CSS (Phase 2-3)

**Estimated time for this step:** 30-60 minutes
