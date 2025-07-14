# 📰 Blog Summariser

A full-stack web application that summarizes long blog posts using Google Gemini AI and provides side-by-side Urdu translations using custom JavaScript dictionary based as well as AI based. Built with **Next.js 15**, **ShadCN UI**, **Supabase**, **MongoDB**, and **Gemini API**.

---

## Features

- Input a blog URL and fetch the blog's full content
- AI-powered summary generation using **Google Gemini**
- Urdu translation:
  - Dictionary-based (custom JS logic)
  - Gemini API-powered (AI based)
- Save:
  - Summary to **Supabase**
  - Full blog text to **MongoDB**
- Fully responsive UI with **ShadCN UI**
- Deployed on **Vercel**

---

## Tech Stack

- **Frontend:** Next.js 15, ShadCN UI, TailwindCSS
- **Backend:** Next.js API Routes
- **AI:** Google Gemini model via API
- **Database:**
  - Supabase (PostgreSQL) – to store summaries
  - MongoDB Atlas – to store full blog content
- **Other Tools:** Cheerio (for scraping), dotenv, pnpm

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/blog-summariser.git
cd blog-summariser
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Set Environment Variables
Create a `.env.local` file in the root folder:
```bash
# Google Gemini API
GEMINI_API_KEY=your-gemini-api-key

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# MongoDB
MONGODB_URI=mongodb+srv://your-mongo-connection-string
```
🔐 Make sure not to expose the service role or Mongo URI publicly.

---

## Project Structure
```bash
blog-summariser/
│
├── src/
│   ├── app/
│   │   └── api/
│   │       └── scrape/route.ts       # Main API route for scraping and summarizing
│   ├── components/
│   │   ├── HeroSection.tsx           # Main landing section with input + summary
│   │   └── ui/                        # ShadCN UI components
│   ├── lib/
│   │   ├── urduDictionary.ts         # Custom dictionary logic for Urdu translation
│   │   └── mongoClient.ts            # MongoDB client setup
├── public/
├── styles/
└── .env.local                        # Environment variables
```

---

## How It Works

1. User enters a blog URL.

2. The server:

   - Scrapes blog HTML with Cheerio

   - Extracts the article text

   - Sends the text to Gemini API for summarization

   - Translates the summary using a JS dictionary and AI model

3. The app:

   - Displays the summary

   - Shows both Urdu translations side by side for comparison

   - Stores the summary in Supabase

   - Stores full blog in MongoDB

---

## License

This project is licensed under the MIT License.

---

## Author

Made with 💻 by Izza Naseer

---