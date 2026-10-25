# 🌍 Wanderlust - Travel & Booking Single Page Application

> **Live Deployment Link**: https://wanderlust-planner-react.vercel.app
> **GitHub Repository**: https://github.com/Preslava-7/wanderlust-planner-react

---

## 📋 Functional Guide

### 1. Application Purpose & Overview
**Wanderlust** is a full-featured travel catalog and tour booking Single Page Application (SPA) built with React and Supabase. The platform connects travelers with curated tour packages around the globe, allowing users to search, filter, and reserve trips, while giving administrators complete management authority over catalog listings and customer reservations.

### 2. User Roles & Capabilities

| Feature / Permission | Guest User | Authenticated User | Admin User |
| :--- | :---: | :---: | :---: |
| View Home, Catalog & Tour Details | ✅ | ✅ | ✅ |
| Dynamic Search & Price Sorting | ✅ | ✅ | ✅ |
| Register & Login | ✅ | ❌ *(Redirected)* | ❌ *(Redirected)* |
| Reserve Tours (Dynamic Guest Names & Counts) | ❌ | ✅ | ❌ |
| View & Cancel Personal Bookings | ❌ | ✅ | ✅ |
| View Global Bookings + Customer Emails | ❌ | ❌ | ✅ |
| Create, Edit & Delete Tours (CRUD) | ❌ | ❌ | ✅ |

### 3. Detailed Feature Description
- **Hero Search Bar**: Located on the homepage; extracts unique destinations dynamically from Supabase and redirects to the catalog with URL query parameters (`/tours?search=Destination`).
- **Catalog & Real-time Filtering**: Displays all tour offers with client-side text search and price sorting (Ascending / Descending).
- **Tour Booking Engine**: Authenticated users can specify the number of travelers (1–10) and dynamically enter full names for each guest. Prices are computed automatically.
- **My Bookings Dashboard**: Lists user reservations with joined tour information. Admin users see all platform bookings alongside customer email addresses (`user_email`).
- **Admin Management (CRUD)**: Restricted routes (`/create-tour`, `/tours/:id/edit`) backed by Supabase metadata authorization.

---

## 🛠️ Technical Architecture & Implementation

### 1. Application Structure & Routing
- **Pages & Client-Side Routing**: Implemented using `react-router-v6` with dynamic views (`Catalog`, `TourDetails`, `MyBookings`) and URL parameters (`/tours/:id`, `/tours/:id/edit`).
- **Route Guards**: Managed via `ProtectedRoute.jsx`. Restricts private functional activities from guests, secures admin-only management views, and redirects logged-in users away from authentication pages (`/login`, `/register`).

### 2. Authentication & Remote Data Handling
- **Authentication Flow**: Managed via Supabase Auth (Register, Login, Logout). Global session state is persisted across the app using `AuthContext`.
- **Remote Data Communication**: Asynchronous API interactions with Supabase PostgreSQL BaaS using `@supabase/supabase-js`.
- **CRUD Operations**: Full Create, Read, Update, and Delete support on the `tours` collection with role-based access checks.

### 3. Forms, Validation & Interaction
- **Bound Forms & Events**: Fully controlled inputs (`value` + `onChange`) across all forms with React synthetic event handling.
- **Validation & Error Surface**: Duplicate email prevention on registration, password constraints, required guest name inputs, and user-facing network error notifications.
- **User Interactivity**: Logged-in users can create persistent tour reservations (`bookings`) and manage/cancel existing reservations via backend API queries.

### 4. React Architecture & Styling
- **Hooks & State Lifecycle**: Demonstrates effective usage of `useState`, `useEffect`, `useParams`, `useNavigate`, `useSearchParams`, and `useContext`.
- **Context API**: Global state sharing for user authentication state (`user`, `loading`, `isAdmin`) via `AuthContext.jsx`.
- **Organization & Styling**: Modular, component-based structure styled using external CSS and Bootstrap 5.

---

## 📁 Folder Structure

```text
src/
├── components/
│   ├── catalog/         # Catalog page with search & sorting
│   ├── common/          # Route guards (ProtectedRoute.jsx)
│   ├── contacts/        # Contacts section component
│   ├── create-tour/     # Admin Create Tour page
│   ├── edit-tour/       # Admin Edit Tour page
│   ├── footer/          # Global Footer component
│   ├── header/          # Navigation Header with dynamic Auth links
│   ├── home/            # Homepage component
│   ├── login/           # User Login page
│   ├── my-bookings/     # User / Admin Bookings dashboard
│   ├── register/        # User Register page with validation
│   ├── search-filter/   # Dynamic Hero search filter
│   ├── services/        # Services section
│   ├── tour-details/    # Tour Details & Booking engine
├── context/
│   └── AuthContext.jsx  # Context API provider for Supabase Auth
├── services/
│   └── supabaseClient.js# Supabase SDK configuration
├── App.jsx              # React Router configuration & layout
├── App.css              # Main application styling
└── main.jsx             # Entry point with AuthProvider & BrowserRouter

⚙️ Installation & Local Setup Instructions
Prerequisites
Node.js (v18.x or higher)

npm (v9.x or higher)

Step-by-Step Setup
Clone the repository:

Bash
git clone https://github.com/Preslava-7/wanderlust-planner-react.git
cd wanderlust
Install dependencies:

Bash
npm install
Configure Environment Variables:
Create a .env file in the root folder with your Supabase project credentials:

Фрагмент от код
VITE_SUPABASE_URL=[https://your-supabase-project.supabase.co](https://your-supabase-project.supabase.co)
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
Start the local development server:

Bash
npm run dev
Open http://localhost:5173 in your browser.

Build for production:

Bash
npm run build
🗄️ Database Setup (Supabase SQL Schema)
SQL
-- 1. Create Tours Table
CREATE TABLE tours (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  title TEXT NOT NULL,
  destination TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT,
  image_url TEXT
);

-- 2. Create Bookings Table
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  tour_id UUID REFERENCES tours(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email TEXT,
  people_count INT NOT NULL,
  guest_names TEXT[] NOT NULL,
  total_price NUMERIC NOT NULL
);