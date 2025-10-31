# Vercel Deployment Guide - Next.js Portfolio

## ✅ What Was Fixed

The previous deployment error was caused by an incorrect `vercel.json` configuration that was trying to define function runtimes for TypeScript files. This has been fixed.

**Error was:**
```
Error: Function Runtimes must have a valid version, for example `now-php@1.0.0`.
```

**Solution:** Simplified `vercel.json` to use Vercel's default Next.js configuration.

---

## 🚀 Deployment Steps

### Option 1: Redeploy Existing Project (Recommended)

If you already have a Vercel project created:

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Find your project**: `nextjs-portfolio`
3. **Click on it** to open the project
4. **Go to Settings** → **Git** → **Deployments**
5. **Trigger a redeploy**:
   - Click the **"Redeploy"** button, OR
   - Push a new commit to `master` branch (already done!)
6. **Wait for build** (2-3 minutes)
7. **Check deployment status** - should show ✅ Success

---

### Option 2: Fresh Deployment (If Starting Over)

1. **Go to Vercel**: https://vercel.com
2. **Sign in with GitHub**
3. **Click "Add New"** → **"Project"**
4. **Import Git Repository**
5. **Search and select**: `nextjs-portfolio`
6. **Click "Import"**
7. **Configure Project**:
   - Framework: `Next.js` (auto-detected) ✓
   - Build Command: `npm run build` (auto-detected) ✓
   - Output Directory: `.next` (auto-detected) ✓
   - Install Command: `npm install` (auto-detected) ✓
8. **Click "Deploy"**
9. **Wait for completion** (2-3 minutes)

---

## 📋 Verification Checklist

After deployment, verify:

- ✅ Build completed successfully
- ✅ All 12 pages are accessible
- ✅ Animations work smoothly
- ✅ Contact form functions (if EmailJS configured)
- ✅ No console errors in browser DevTools

---

## 🔗 Your Deployment URL

Once deployed, your site will be available at:
```
https://nextjs-portfolio-[random-id].vercel.app
```

Or with a custom domain (if configured).

---

## 🛠️ Project Configuration

**vercel.json** (Simplified):
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": ".next"
}
```

**package.json** (Build scripts):
```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start"
  }
}
```

---

## 📊 Build Performance

- **Build Time**: ~15 seconds
- **First Load JS**: 189 kB
- **Total Pages**: 12 (all static)
- **Framework**: Next.js 15.5.4

---

## 🔐 Environment Variables (Optional)

If you need to add environment variables:

1. **Go to Project Settings** → **Environment Variables**
2. **Add variables** (e.g., EmailJS keys)
3. **Redeploy** for changes to take effect

Example:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## 🆘 Troubleshooting

### Build Fails
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Verify `.gitignore` excludes `node_modules`

### Pages Not Loading
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for errors
- Verify all imports are correct

### Slow Performance
- Check Vercel Analytics
- Optimize images in `/public`
- Review bundle size in build logs

---

## 📝 Next Steps

1. **Redeploy** using the steps above
2. **Test all pages** on the live URL
3. **Add custom domain** (optional)
4. **Set up analytics** (optional)
5. **Configure auto-deployments** (already enabled)

---

## ✨ Auto-Deployment

Every time you push to `master` branch:
```bash
git add .
git commit -m "Your message"
git push origin master
```

Vercel will **automatically redeploy** your site! 🚀

---

**Questions?** Check Vercel docs: https://vercel.com/docs

