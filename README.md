# ProCareerVista — Next.js + Admin Panel

Clone of [procareervista.com](http://procareervista.com/) built with Next.js 15, React, and TypeScript — now with a full **Admin Panel** and **Backend API**.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/about` | About |
| `/services` | Services |
| `/templates` | Resume templates |
| `/pricing` | Pricing |
| `/team` | Team |
| `/blog` | Blog |
| `/contact` | Contact |
| `/get-started` | Order form |
| `/admin` | **Admin Panel** (content management) |
| `/admin/login` | Admin login |

## Admin Panel

Full content management system at `/admin` — manage everything from one place:

| Section | What You Manage |
|---------|-----------------|
| **Dashboard** | Stats, recent orders, recent messages |
| **Orders** | Customer orders, resume uploads, status tracking |
| **Templates** | Resume templates with Word/PDF file uploads |
| **Blog** | Articles, categories, publishing |
| **Team** | Leaders and writers, bios, credentials |
| **Pricing** | Plans and add-ons with bundle pricing |
| **Services** | Six service offerings |
| **FAQs** | Questions for home and pricing pages |
| **Testimonials** | Client reviews and success stories |
| **Industries** | Homepage industry cards |
| **Messages** | Contact form inbox |
| **Applications** | Job application queue |
| **Newsletter** | Email subscribers |
| **Settings** | Contact info, social links, SEO |

### Default Admin Login

| Field | Value |
|-------|-------|
| Email | `admin@procareervista.com` |
| Password | `Admin@123456` |

## Backend API (`backend-provista/`)

REST API powered by Express + Prisma + PostgreSQL. Live API: [https://backend-provista-production-9ba0.up.railway.app](https://backend-provista-production-9ba0.up.railway.app). See [backend-provista/README.md](backend-provista/README.md) for full API documentation.

## Quick Start (Full Stack)

### 1. Start the Backend

```bash
cd backend-provista
npm install
cp .env.example .env
npm run db:setup
npm run dev
```

API runs at **http://localhost:4000**

### 2. Start the Frontend

```bash
# In project root
npm install
npm run dev
```

Open **http://localhost:3000** — Admin at **http://localhost:3000/admin**

### Environment

Create `.env.local` in the project root:

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Features

- Same design as the live site
- Full admin panel for all content management
- Real form submissions (orders, contact, applications)
- Template file uploads (Word, PDF, preview images)
- JWT authentication for admin routes
- Instant page transitions with progress bar
- Smooth scroll to sections
- Scroll reveal + animated stat counters
- Mobile menu with overlay

## Production

```bash
# Backend (Railway)
# API: https://backend-provista-production-9ba0.up.railway.app
cd backend-provista && npm run db:setup && npm run build && npm start

# Frontend
# Set NEXT_PUBLIC_API_URL=https://backend-provista-production-9ba0.up.railway.app
npm run build && npm start
```

## Push Backend to GitHub

The `backend-provista` folder is a separate git repository: [github.com/basir2353/backend-provista](https://github.com/basir2353/backend-provista).
