# LocalChefBazaar — Frontend

A responsive React + Vite frontend for LocalChefBazaar — a platform connecting local chefs with customers for home-cooked meals. This repository contains only the frontend application built with React, Vite and Firebase for authentication & hosting.

## Key Features

- Role-based dashboard (Admin / Chef / Customer)
- Browse meals, meal details and reviews
- Add / update meals (Chef)
- Place orders and payment workflow

# LocalChefBazaar — Frontend

Professional, responsive frontend for LocalChefBazaar — a marketplace that connects local chefs with customers to order home-cooked meals. This repository contains the React + Vite frontend that integrates with a separate server (API) and Firebase for authentication & hosting.

**Live Demo:** `https://local-chef-bazaar-309ab.web.app/`

**Server (backend) repository:** `https://github.com/toukir5588/local-chef-bazaar-server`

**Status:** Production-ready frontend (features implemented; see list below).

**Tech stack highlights:** React, Vite, Tailwind CSS + DaisyUI, Firebase (Auth & Hosting), Axios, React Query.

**Table of Contents**

- **Project**: short description and links
- **Implemented Features**: what the app currently supports
- **What You Can Do**: user-facing tasks and flows
- **Packages & Tooling**: important dependencies used
- **Local Setup**: how to run the project locally
- **Build & Deploy**: how to build and deploy
- **Notes & Contributing**

**Implemented Features**

- **Authentication & Roles:** Email/password (Firebase) authentication with role-based UI (Admin, Chef, Customer).
- **Role-based Dashboard:** Separate dashboards and menus for Admin, Chef and Customer with protected routes.
- **Meals Management (Chef):** Add, update, and remove meals; upload images; manage inventory.
- **Meal Browsing (Customer):** Browse meals, view meal details, top meals, and search/filter lists.
- **Orders & Payments:** Create orders, view order history; integrated with a payment workflow (payment success page and order status updates).
- **Favorites & Reviews:** Customers can favorite meals and write reviews; chefs can view reviews for their meals.
- **Admin Tools:** Manage users, promote/demote roles, view chef requests and application approvals.
- **Real-time UI & Animations:** Uses Framer Motion, Lottie and subtle animations for polished UX.
- **Client-side Data Fetching:** Uses Axios and `@tanstack/react-query` for caching and secure API calls.

**What you can do with this website**

- As a **Customer**: Browse meals, add favorites, place orders, pay (via configured payment provider), leave reviews, and manage your profile.
- As a **Chef**: Create and manage meals, view incoming orders, update order status, and manage inventory.
- As an **Admin**: Review and manage users, accept/reject chef applications, view site statistics, and moderate content.

**Major packages & tooling (selected from `package.json`)**

- **Core:** `react`, `react-dom`, `vite`
- **Styling & UI:** `tailwindcss`, `daisyui`, `@headlessui/react`, `react-icons`
- **State & Data:** `@tanstack/react-query`, `axios`, `react-hook-form`
- **Firebase & Hosting:** `firebase` (Auth, Hosting)
- **UX & Animation:** `framer-motion`, `lottie-react`, `react-hot-toast`, `react-spinners`
- **Routing & Carousel:** `react-router`, `react-responsive-carousel`, `swiper`
- **Dev & Linting:** `eslint`, `@vitejs/plugin-react`

If you want exact versions, run `cat package.json` or inspect the `dependencies`/`devDependencies` sections in `package.json`.

**Local Setup**

1. Clone and open this frontend folder:

```bash
git clone https://github.com/toukir5588/local-chef-bazaar
cd LocalChefBazaarFrontend
```

2. Install dependencies:

```bash
npm install
```

3. Firebase configuration: add your Firebase project config to `src/firebase/firebase.config.js` (the project expects that file). Do not commit secrets to public repos.

4. Start development server:

```bash
npm run dev
```

Open the Vite dev URL printed in the terminal (commonly `http://localhost:5173`).

**Build & Preview**

```bash
npm run build
npm run preview
```

**Deploy (Firebase Hosting)**

1. Build the app: `npm run build`
2. Deploy the `dist` folder with Firebase Hosting:

```bash
firebase deploy --only hosting
```

Make sure you have `firebase.json` configured and are logged in (`firebase login`).

**Icons & Visuals**

- This README includes light emoji icons in UI sections. The app uses `react-icons` for in-app icons. If you want GitHub or CI badges at the top (build, coverage, license), I can add them.

**Notes & Contributing**

- Keep PRs small and focused. Document the purpose and testing steps.
- Sensitive keys: never commit Firebase private keys to public repositories. Use environment variables or secret managers for production.

**Contact / Links**

- Live demo: `https://local-chef-bazaar-309ab.web.app/`
- Server repo: `https://github.com/toukir5588/local-chef-bazaar-server`
- Frontend repo (this folder): see your current workspace

---

If you'd like:

- I can add small badges (Live | Server | License) at the top.
- I can add screenshots (please point to images to include), or generate a short `CONTRIBUTING.md` and `LICENSE` template.
