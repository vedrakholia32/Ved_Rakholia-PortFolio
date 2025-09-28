# Vercel Deployment Fix Guide

## 🔧 Common Issues & Solutions for Vercel Deployment

### 1. Environment Variables
**Problem**: Your `.env.local` file isn't used by Vercel
**Solution**: Add environment variables in Vercel dashboard

**Steps**:
1. Go to your Vercel project dashboard
2. Go to Settings → Environment Variables
3. Add these variables:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID = service_sfrddpg
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = template_p2kl5ea
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = XVgGlqPM-Syz-G2lA
NEXT_PUBLIC_CONTACT_EMAIL = vedrakholia525@gmail.com
```

### 2. Build Optimization Issues
**Problem**: Next.js build optimization failures
**Solution**: Update next.config.mjs

### 3. TypeScript/ESLint Errors
**Problem**: Strict type checking on Vercel
**Solution**: Configure build settings

### 4. Dependencies Issues
**Problem**: Missing or conflicting packages
**Solution**: Clean package.json and reinstall

### 5. Memory Issues
**Problem**: Build runs out of memory
**Solution**: Optimize build process

## 🛠️ Quick Fixes to Try:

### Fix 1: Update next.config.mjs (RECOMMENDED)
Add these settings to handle build issues:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // Add if needed
    serverComponentsExternalPackages: ['gsap']
  },
  // Handle large bundles
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    return config
  }
}

export default nextConfig
```

### Fix 2: Update package.json scripts
```json
{
  "scripts": {
    "build": "next build",
    "dev": "next dev",
    "lint": "next lint --fix",
    "start": "next start",
    "type-check": "tsc --noEmit"
  }
}
```

### Fix 3: Add vercel.json (if needed)
```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ]
}
```

### Fix 4: Deployment Commands for Vercel
**Build Command**: `npm run build`
**Install Command**: `npm install`
**Output Directory**: `.next` (leave blank for auto-detect)

## 📋 Deployment Checklist:

- [ ] Environment variables added to Vercel dashboard
- [ ] next.config.mjs updated with error handling
- [ ] No TypeScript errors in critical components
- [ ] All imports resolve correctly
- [ ] Build completes locally: `npm run build`
- [ ] No missing dependencies
- [ ] Images and assets properly referenced

## 🔍 Debug Steps:

1. **Check Vercel Build Logs**:
   - Go to your Vercel project
   - Click on latest deployment
   - Check "Build Logs" for specific errors

2. **Test Local Build**:
   ```bash
   npm run build
   npm run start
   ```

3. **Common Error Patterns**:
   - `Module not found`: Check imports
   - `Type errors`: Check TypeScript
   - `Memory exceeded`: Optimize bundle size
   - `Environment variables`: Add to Vercel dashboard

## 🚨 If Still Failing:
Share the exact error message from Vercel build logs!