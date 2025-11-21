# Vercel Deployment Process - Complete Guide

## Overview
Vercel is a serverless platform that automatically deploys your code from GitHub. For TinyLink, it will:
1. **Build** both frontend and backend
2. **Host** them together at a single URL
3. **Route** requests intelligently between them

---

## 📋 PHASE 1: BEFORE DEPLOYMENT (Preparation)

### Step 1: Ensure Code is on GitHub ✅ (Already Done)
```bash
# Your code is already pushed to:
# https://github.com/Er-Mayur/TinyLink.git
```

**What happens here:**
- Your entire project (frontend + backend) lives on GitHub
- Vercel watches this repository for changes
- Every push to `main` can trigger automatic deployments

### Step 2: Prepare Environment Variables
Before deploying, you'll need:

**For Backend:**
```
DATABASE_URL=postgresql://user:password@host:5432/database_name
FRONTEND_URL=https://your-domain.vercel.app (or custom domain)
NODE_ENV=production
```

**For Frontend:**
```
VITE_API_BASE_URL=https://your-domain.vercel.app
```

**Where to get DATABASE_URL:**
- Use **Supabase** (recommended): https://supabase.com
- Use **AWS RDS**: https://aws.amazon.com/rds/
- Use **Railway**: https://railway.app

---

## 🚀 PHASE 2: DEPLOYMENT DAY (Going Live)

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account
5. Complete signup

### Step 2: Import Project to Vercel

```
Vercel Dashboard
    ↓
"Add New..." → "Project"
    ↓
Select GitHub Account
    ↓
Search & Find "TinyLink" Repository
    ↓
Click "Import"
```

### Step 3: Configure Build Settings

When you click "Import", Vercel shows import settings:

```
Project Name:           tinylink
Framework Preset:       Other (or Auto-detect)
Root Directory:         ./
Build Command:          (custom - see below)
Output Directory:       (custom - see below)
Install Command:        npm install --legacy-peer-deps
```

**Vercel reads `vercel.json` automatically:**
- Sees `builds` array → knows to build both frontend & backend
- Sees `routes` array → knows how to route requests
- No manual configuration needed!

---

## ⚙️ PHASE 3: BUILD PROCESS (What Vercel Does)

### Timeline of Build Process:

```
1. SOURCE CODE DOWNLOAD
   └─ Vercel clones your GitHub repo
   
2. INSTALL DEPENDENCIES
   └─ npm install --legacy-peer-deps (installs node_modules)
   
3. PARALLEL BUILDS (Based on vercel.json)
   
   ┌─────────────────────────────────────┐
   │     BUILD BACKEND                   │
   ├─────────────────────────────────────┤
   │ Src: backend/package.json           │
   │ Use: @vercel/node                   │
   │ Action: Prepares Node.js functions  │
   │ Output: Serverless functions        │
   └─────────────────────────────────────┘
   
   ┌─────────────────────────────────────┐
   │     BUILD FRONTEND                  │
   ├─────────────────────────────────────┤
   │ Src: frontend/package.json          │
   │ Use: @vercel/static-build           │
   │ Action: Runs 'npm run build'        │
   │ Output: frontend/dist folder        │
   │ (React compiled to HTML/JS/CSS)     │
   └─────────────────────────────────────┘
   
4. OPTIMIZATION
   └─ Minify, compress, optimize assets
   
5. UPLOAD TO VERCEL SERVERS
   └─ Deploy to CDN globally
   
6. ASSIGN URL
   └─ your-project-name.vercel.app
```

### What Each Build Does:

**Backend Build (@vercel/node):**
```javascript
// Input: backend/src/server.js
// Vercel wraps it as serverless function
// Output: Runs on demand when /api/* requests come in
```

**Frontend Build (@vercel/static-build):**
```javascript
// Input: React source files
// Command: npm run build (Vite bundler)
// Output: Static files in frontend/dist/
//   - index.html
//   - bundle.js (all React code)
//   - bundle.css (styles)
//   - assets/ (images, etc)
// These are served instantly from CDN
```

---

## 🛣️ PHASE 4: ROUTING (How Requests Work)

After deployment, your app lives at: `https://tinylink.vercel.app`

### How Vercel Routes Requests:

```
User visits: https://tinylink.vercel.app
                    ↓
         Vercel checks routes in vercel.json
                    ↓
    ┌───────────────┼───────────────┐
    ↓               ↓               ↓
Request to      Request to      Everything else
/api/links       /healthz        (/, /stats/*, etc)
    ↓               ↓               ↓
Backend         Backend         Frontend
Node.js         Node.js         React App
Function        Function        (from dist/)
    ↓               ↓               ↓
JSON            JSON            HTML
Response        Response        Page
```

### Real Examples:

**1. User clicks "Create Short Link"**
```
Frontend sends: POST /api/links
                ↓
Vercel routes to: backend/src/server.js
                ↓
Backend processes → Creates link in database
                ↓
Returns JSON → Frontend updates display
```

**2. User visits https://tinylink.vercel.app**
```
Browser requests: GET /
                ↓
Vercel routes to: frontend/dist/index.html
                ↓
Serves HTML with React bundled
                ↓
React loads in browser → App is interactive
```

**3. User visits short link: https://tinylink.vercel.app/abc123**
```
Browser requests: GET /abc123
                ↓
Vercel matches: /:code pattern
                ↓
Routes to: backend/src/server.js
                ↓
Backend controller redirects to original URL
                ↓
Browser redirects automatically
```

---

## 🔐 PHASE 5: ENVIRONMENT VARIABLES (Secrets)

### How It Works:

```
1. You add env vars in Vercel Dashboard
   ├─ DATABASE_URL
   ├─ FRONTEND_URL
   └─ VITE_API_BASE_URL

2. Vercel injects them at BUILD TIME
   ├─ Backend reads process.env.DATABASE_URL
   ├─ Frontend reads import.meta.env.VITE_API_BASE_URL
   └─ Runtime values populated from Vercel secrets

3. Injected into running processes
   └─ Each request uses these values
```

### Why Not Commit .env Files?

```
❌ DANGEROUS:
git add .env
git push origin main
└─ Database password on public GitHub!

✅ SAFE:
1. Add .env to .gitignore ← Already done!
2. Store secrets in Vercel Dashboard
3. Vercel injects at runtime
```

---

## 📊 PHASE 6: MONITORING (After Deployment)

### What You Can Monitor:

```
Vercel Dashboard
├─ Deployments Tab
│  ├─ Show all deployments
│  ├─ See build logs
│  └─ Rollback to previous version
│
├─ Functions Tab
│  ├─ Backend function execution time
│  ├─ Errors & logs
│  └─ Memory usage
│
└─ Analytics Tab
   ├─ Traffic stats
   ├─ Performance metrics
   └─ Error rates
```

### View Build Logs:

```
Vercel Dashboard
  ↓
Deployments
  ↓
Click on any deployment
  ↓
See complete build output:
  ├─ npm install output
  ├─ Build command output
  ├─ Frontend build logs
  ├─ Backend build logs
  └─ Any errors or warnings
```

---

## 🔄 PHASE 7: AUTOMATIC DEPLOYMENTS

After initial deployment, every time you:

```
Step 1: Make code changes locally
         └─ git add .
         └─ git commit -m "Fix bug"
         └─ git push origin main

Step 2: GitHub receives push
         └─ Webhook sent to Vercel

Step 3: Vercel detected new code
         └─ Automatic build triggered
         └─ Same process as before (PHASE 3)

Step 4: Tests & Preview
         └─ Optional: Run tests
         └─ Optional: Create preview URL for testing

Step 5: Deploy to Production
         └─ New version live at tinylink.vercel.app
         └─ Takes 2-5 minutes typically
```

---

## 📈 COMPLETE FLOW DIAGRAM

```
┌─────────────────────────────────────────────────────────────┐
│ GITHUB (Source Code)                                        │
│ └─ Er-Mayur/TinyLink repository                             │
└────────────────────┬────────────────────────────────────────┘
                     │ Push to main branch
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ VERCEL (Build & Deploy)                                     │
│ ├─ Clone code                                               │
│ ├─ Install dependencies                                     │
│ ├─ Build Backend (Node.js serverless)                       │
│ ├─ Build Frontend (React to static files)                   │
│ └─ Upload to global CDN                                     │
└────────────────────┬────────────────────────────────────────┘
                     │ Domain assigned
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ LIVE URL                                                    │
│ https://tinylink.vercel.app                                 │
│                                                              │
│ ├─ /api/* ────────→ Backend (Node.js)                       │
│ ├─ /stats/* ──────→ Frontend (React)                        │
│ └─ / ─────────────→ Frontend (React)                        │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP Request
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ USER BROWSER                                                │
│ ├─ Loads frontend from CDN (fast!)                          │
│ ├─ React app runs in browser                                │
│ ├─ Makes API calls to /api/links                            │
│ └─ Backend processes → database → response                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚨 TROUBLESHOOTING COMMON ISSUES

### Issue: Build Fails
```
Check build logs in Vercel Dashboard
├─ Missing dependency? → Add to package.json
├─ Wrong Node version? → Vercel uses latest, usually fine
├─ Env var missing? → Add to Vercel dashboard
└─ Import error? → Check file paths
```

### Issue: Frontend Loads but API Calls Fail
```
Likely causes:
├─ DATABASE_URL not set → Add to Vercel env vars
├─ VITE_API_BASE_URL wrong → Should be your vercel domain
└─ CORS disabled → Check backend app.js has cors()
```

### Issue: Database Connection Error
```
Check:
├─ DATABASE_URL format correct
├─ PostgreSQL credentials valid
├─ IP whitelist allows Vercel IPs
└─ Database migrations ran
```

---

## ✅ STEP-BY-STEP DEPLOYMENT CHECKLIST

```
□ Code pushed to GitHub (Er-Mayur/TinyLink)
□ vercel.json configured correctly
□ .env files in .gitignore (secrets safe)
□ Database created (Supabase/RDS/Railway)
□ Vercel account created
□ Project imported to Vercel
□ Environment variables added to Vercel:
  □ DATABASE_URL
  □ FRONTEND_URL
  □ VITE_API_BASE_URL
□ Build successful (check deployment logs)
□ Frontend loads at vercel URL
□ Create link works (API calls backend)
□ Redirect works (/:code)
□ Custom domain configured (optional)
```

---

## 🎉 SUMMARY

Your TinyLink deployment journey:

1. **GitHub** - Your code repository
2. **Vercel** - Automatically watches GitHub, builds & deploys
3. **Build** - Frontend compiled to static files, Backend prepared as serverless
4. **Routing** - Smart routing sends /api/* to backend, everything else to frontend
5. **Live** - Your app runs at tinylink.vercel.app
6. **Auto-Deploy** - Every push to main triggers new deployment

Total time from push to live: **2-5 minutes** ⚡

---

## 📚 Quick Reference

| Component | Hosted Where | Build Tool | Access |
|-----------|--------------|-----------|---------|
| Frontend | Vercel CDN | Vite (npm run build) | Static files |
| Backend API | Vercel Serverless | Node.js | /api/* |
| Database | External (Supabase/RDS) | PostgreSQL | Backend connects |
| Domains | Vercel DNS | - | Custom or .vercel.app |

---

**Ready to deploy? Let's go! 🚀**
