# Deployment Instructions

## Vercel Setup

### Step 1: Connect GitHub Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Select your GitHub account
4. Find and select the "TinyLink" repository
5. Click "Import"

### Step 2: Configure Project Settings
When importing the project, Vercel should auto-detect it as a monorepo. Configure:

- **Project Name**: tinylink (or your preference)
- **Framework Preset**: Other
- **Root Directory**: `./`
- **Build Command**: `cd frontend && npm run build`
- **Output Directory**: `frontend/dist`

### Step 3: Set Environment Variables
In the Vercel project settings under "Environment Variables", add:

```
DATABASE_URL = your_postgresql_database_url
FRONTEND_URL = https://your-domain.vercel.app
VITE_API_BASE_URL = https://your-domain.vercel.app/api
```

### Step 4: Configure API Endpoint
Update your frontend `.env` or Vercel environment variables:
- Set `VITE_API_BASE_URL` to your Vercel domain

### Step 5: Deploy
- Click "Deploy"
- Vercel will build and deploy automatically
- Your frontend will be live!

## Database Setup

### Using PostgreSQL

1. **Option A: AWS RDS**
   - Create a PostgreSQL database on AWS RDS
   - Copy the connection string
   - Use as `DATABASE_URL` in Vercel

2. **Option B: Supabase** (Recommended for beginners)
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Copy the PostgreSQL connection string
   - Use as `DATABASE_URL` in Vercel

3. **Option C: Railway**
   - Go to [railway.app](https://railway.app)
   - Create PostgreSQL database
   - Copy connection string

### Run Migrations
Before first deployment, run:
```bash
node backend/src/migrate.js
```

This will create the `links` table if it doesn't exist.

## Monitoring & Logs

- **Vercel Logs**: Check in Vercel Dashboard → Deployments
- **Function Logs**: Backend serverless function logs visible in Vercel console
- **Frontend Errors**: Check browser console when accessing site

## Troubleshooting

### Build Fails
- Check that all dependencies are listed in `package.json`
- Ensure Node version is compatible (v14+)
- Check environment variables are set correctly

### API Not Working
- Verify `DATABASE_URL` is correct
- Check that database migrations have run
- Ensure `VITE_API_BASE_URL` points to correct domain

### Database Connection Error
- Verify PostgreSQL database is running
- Check connection string format
- Ensure IP whitelist allows Vercel IPs

## Post-Deployment

1. **Test the Application**
   - Visit your deployed URL
   - Create a test short link
   - Verify redirect works
   - Check stats page

2. **Set Up Custom Domain** (Optional)
   - In Vercel project settings
   - Add custom domain
   - Update DNS records
   - Enable SSL

3. **Monitor Performance**
   - Use Vercel Analytics
   - Monitor database queries
   - Track error rates

## Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
