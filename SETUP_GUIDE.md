# 🚀 HireMinds AI - Complete Setup Guide

This guide will help you set up the HireMinds AI Job Portal on your local machine using VS Code.

> **Note:** The preview version uses localStorage for data storage. For production with Supabase, see the "Enable Supabase" section at the end.

---

## 📋 Prerequisites

Before starting, make sure you have:

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **VS Code** - [Download](https://code.visualstudio.com/)
3. **Git** - [Download](https://git-scm.com/)
4. **Supabase Account** - [Sign up free](https://supabase.com/)
5. **Google AI Studio Account** - [Get API Key](https://makersuite.google.com/app/apikey)

---

## 📥 Step 1: Download the Project

### Option A: Clone from Git (if you have a repository)
```bash
git clone <your-repo-url>
cd hireminds-ai
```

### Option B: Download ZIP
1. Download the project ZIP file
2. Extract to a folder
3. Open the folder in VS Code

---

## 💻 Step 2: Open in VS Code

1. Open VS Code
2. Go to **File → Open Folder**
3. Select the project folder
4. Open the integrated terminal: **Terminal → New Terminal** (or `Ctrl+``)

---

## 📦 Step 3: Install Dependencies

In the VS Code terminal, run:

```bash
npm install
```

This will install all required packages:
- React 19
- React Router DOM
- Tailwind CSS
- Lucide React Icons
- Supabase Client
- Google Generative AI
- React Markdown

---

## 🗄️ Step 4: Set Up Supabase

### 4.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com/) and sign in
2. Click **"New Project"**
3. Fill in:
   - **Project name**: `hireminds-ai`
   - **Database password**: (save this somewhere safe!)
   - **Region**: Choose closest to you
4. Click **"Create new project"** and wait for setup (~2 minutes)

### 4.2 Get Your API Keys

1. In your Supabase project, go to **Settings → API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### 4.3 Create Database Tables

1. In Supabase, go to **SQL Editor**
2. Click **"New Query"**
3. Copy the entire contents of `supabase/schema.sql` from this project
4. Paste it into the SQL Editor
5. Click **"Run"** (or press `Ctrl+Enter`)
6. You should see "Success. No rows returned" - this is normal!

### 4.4 Verify Tables Created

1. Go to **Table Editor** in Supabase
2. You should see these tables:
   - `users`
   - `jobs`
   - `applications`
   - `saved_jobs`
3. The `jobs` table should have 6 sample jobs

---

## 🔑 Step 5: Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the key (starts with `AI...`)

---

## ⚙️ Step 6: Configure Environment Variables

1. In VS Code, find the `.env` file in the root folder
2. Replace the placeholder values:

```env
# Gemini AI API Key
VITE_GEMINI_API_KEY=AIzaSy...your_actual_key_here

# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your_key
```

**⚠️ Important:** Never commit your `.env` file to Git! It's already in `.gitignore`.

---

## 🏃 Step 7: Run the Development Server

In the VS Code terminal, run:

```bash
npm run dev
```

You should see:
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open **http://localhost:5173** in your browser! 🎉

---

## 🌐 Step 8: Test the Application

### Test Authentication
1. Click **"Sign Up"**
2. Choose **Job Seeker** or **Recruiter**
3. Fill in the form and submit
4. You should be redirected to the Jobs page

### Test Job Posting (as Recruiter)
1. Sign up as a **Recruiter**
2. Click **"Post Job"** in the navbar
3. Fill in job details and submit
4. The job should appear in the Jobs list

### Test AI Tools
1. Go to **AI Tools**
2. Try **Resume Checker** - paste or upload a resume
3. Try **Interview Guide** - enter a job title
4. If you see results, Gemini AI is working!

---

## 🔧 Troubleshooting

### "Supabase not configured" warning
- Make sure your `.env` file has the correct Supabase URL and key
- Restart the dev server after changing `.env`

### AI tools not working
- Verify your Gemini API key is correct
- Check browser console for errors
- Make sure you have API quota remaining

### Database errors
- Go to Supabase → SQL Editor and run the schema again
- Check that Row Level Security policies are created

### Build errors
- Delete `node_modules` folder and run `npm install` again
- Make sure you're using Node.js v18+

---

## 📁 Project Structure

```
hireminds-ai/
├── src/
│   ├── backend/          # Express-style backend (in-browser)
│   │   ├── server.ts     # Main server
│   │   ├── router.ts     # Routing system
│   │   ├── middleware.ts # Auth, CORS, etc.
│   │   ├── jwt.ts        # JWT handling
│   │   ├── bcrypt.ts     # Password hashing
│   │   ├── db.ts         # Database layer
│   │   └── routes/       # API routes
│   │
│   ├── components/       # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── JobCard.tsx
│   │   └── AIToolLayout.tsx
│   │
│   ├── context/          # React Context
│   │   └── AppContext.tsx
│   │
│   ├── data/             # Sample data
│   │   └── jobs.ts
│   │
│   ├── lib/              # External services
│   │   ├── api.ts        # API client (uses Supabase)
│   │   └── supabase.ts   # Supabase client
│   │
│   ├── pages/            # Page components
│   │   ├── Home.tsx
│   │   ├── Jobs.tsx
│   │   ├── JobDetail.tsx
│   │   ├── SignIn.tsx
│   │   ├── SignUp.tsx
│   │   ├── PostJob.tsx
│   │   ├── AITools.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── ai/           # AI tool pages
│   │       ├── ResumeChecker.tsx
│   │       ├── ResumeImprover.tsx
│   │       ├── InterviewGuide.tsx
│   │       ├── CoverLetter.tsx
│   │       ├── SalaryEstimator.tsx
│   │       └── JobDescription.tsx
│   │
│   ├── services/         # AI service
│   │   └── ai.ts
│   │
│   ├── utils/            # Utilities
│   │   └── pdfParser.ts
│   │
│   ├── App.tsx           # Main app with routes
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
│
├── supabase/
│   └── schema.sql        # Database schema
│
├── .env                  # Environment variables
├── package.json
├── vite.config.ts
└── SETUP_GUIDE.md        # This file!
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com/) and sign in
3. Click **"New Project"**
4. Import your GitHub repository
5. Add environment variables:
   - `VITE_GEMINI_API_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click **"Deploy"**

### Deploy to Netlify

1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com/)
3. Drag and drop the `dist` folder
4. Add environment variables in Site Settings

---

## 📚 Technologies Used

| Category | Technology |
|----------|------------|
| Frontend | React 19, TypeScript, Tailwind CSS |
| Routing | React Router DOM |
| State | React Context |
| Backend | Supabase (PostgreSQL + Auth) |
| AI | Google Gemini API |
| Build | Vite |
| Icons | Lucide React |

---

## 🆘 Need Help?

- **Supabase Docs**: https://supabase.com/docs
- **Gemini API Docs**: https://ai.google.dev/docs
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com/docs

---

## ✅ Checklist

Before going live, make sure:

- [ ] Supabase project is created
- [ ] Database schema is applied
- [ ] Environment variables are set
- [ ] Sign up/Sign in works
- [ ] Jobs are loading
- [ ] AI tools are working
- [ ] Dark mode works
- [ ] Mobile responsive

---

**Happy coding! 🎉**
