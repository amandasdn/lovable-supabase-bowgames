# 🎮 Bow Games — A Lovable & Supabase Integration Study

> **A specialized case study on building a high-performance gaming portfolio using AI-driven UI orchestration ([Lovable](https://lovable.dev)) and a scalable Backend-as-a-Service ([Supabase](https://supabase.com)).**

This project goes beyond a simple portfolio. It is a deliberate, iterative experiment designed to stress-test the boundaries of AI-assisted full-stack development — from complex UI state management to relational data integrity.

---

## 🎯 The Challenge & Goals

The primary objective was to evaluate three critical integration points between an AI-powered frontend builder and a production-grade backend:

- [x] **Complex UI State Management** — Implementing a stacked modal architecture where a secondary modal (reviews) overlays a primary modal (game details) without destroying its state.
- [x] **Real-Time Data Synchronization** — Fetching, displaying, and inserting data from a live PostgreSQL database with immediate UI reflection.
- [x] **Seamless AI-to-Database Hand-off** — Testing how effectively Lovable can generate a Supabase client, manage typed queries, and handle relational data insertion with zero manual boilerplate.

---

## 🛠 Tech Stack & Integration

| Layer        | Technology                                                    |
| ------------ | ------------------------------------------------------------- |
| **Frontend** | React 18 · TypeScript 5 · Vite 5 · Tailwind CSS 3 · shadcn/ui |
| **Backend**  | Supabase (PostgreSQL 15)                                      |
| **State**    | TanStack React Query v5                                       |
| **UI**       | Embla Carousel · Radix UI Primitives · Lucide Icons           |
| **Tooling**  | Lovable (AI orchestration) · Vitest · Playwright              |

### How It Works

Lovable handles the complete frontend lifecycle — component generation, routing, and styling — while also managing the **Supabase client connection** out of the box. Data fetching is abstracted through custom React hooks (`useGames`) that leverage TanStack Query for caching and background re-fetching. Data insertion (reviews, newsletter subscriptions) is handled via direct Supabase client calls with optimistic UI updates through query invalidation.

---

## 🧠 Database Architecture (The "Brain")

The relational schema was designed to test foreign key integrity and simple marketing capture logic:

```
┌──────────────┐       ┌──────────────────┐       ┌──────────────┐
│    games     │       │     reviews      │       │  newsletter  │
├──────────────┤       ├──────────────────┤       ├──────────────┤
│ id (PK)      │◄──┐   │ id (PK)          │       │ id (PK)      │
│ title        │   └───│ game_id (FK)     │       │ email        │
│ description  │       │ user_name        │       │ created_at   │
│ tagline      │       │ comment_text     │       └──────────────┘
│ image_url    │       │ rating_stars     │
│ hero_image   │       │ created_at       │
│ android_link │       └──────────────────┘
│ apple_link   │
│ is_latest    │
└──────────────┘
```

- **`games`** — Core catalog with metadata, platform links, and hero image support.
- **`reviews`** — Linked to `games` via `game_id` (1:N) to validate relational integrity and cascading queries.
- **`newsletter`** — Standalone capture table for email subscriptions, testing simple insert operations.

---

## 📈 Development Process & Metrics

This entire application was built through a sequence of **~10–12 iterative prompts**, evolving from concept to production-ready UI:

| Phase | Prompt Focus                          | Outcome                                      |
| ----- | ------------------------------------- | --------------------------------------------- |
| 1     | Initial SPA scaffold                  | Static landing page with Black & Purple theme |
| 2     | Content localization (PT → EN)        | Full English conversion + NYC address          |
| 3     | Review system + form validation       | Star rating, validation, toast feedback        |
| 4     | Supabase integration                  | Live data fetching, typed client, RLS policies |
| 5     | Stacked modal architecture            | z-index layering, state preservation           |
| 6     | Carousel + new game content           | Embla integration, drag/swipe, 6 game catalog  |
| 7     | Side-by-side review layout            | Dual-column modal, responsive stacking         |
| 8     | Newsletter + scroll spy               | Supabase insert, smooth scroll, active links   |

---

## 💡 Key Learnings

### Prompt Engineering for Complex UI
Describing layered UI behaviors (stacked modals, z-index management) requires precise, spatial language. Ambiguity in prompts leads to state conflicts — specificity is everything.

### Managing Database Policies (RLS)
Row Level Security must be considered from the first migration. Lovable can scaffold RLS policies, but understanding the `anon` vs `authenticated` role distinction is essential for production readiness.

### Designing for Responsiveness in AI Workflows
AI-generated layouts default to desktop-first. Explicitly requesting mobile breakpoints and testing touch interactions (swipe, tap targets) in prompts produces significantly better responsive output.

---

## 🚀 How to Setup

### Prerequisites

- Node.js ≥ 18
- npm or bun
- A Supabase project with the schema above

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd bow-games

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Run

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📄 License

This project is intended for educational and portfolio purposes.

---

<p align="center">
  <strong>Project developed by Amanda Nascimento.</strong><br/>
  <em>A study on the future of software engineering and AI collaboration.</em>
</p>
