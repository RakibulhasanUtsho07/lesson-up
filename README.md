# 🌟 Digital Life Lessons (LessonUp)

A premium, full-stack web application where users can create, store, and share meaningful life lessons, personal growth insights, and wisdom gathered over time. Built with a modern glassmorphic UI design, robust authentication, and seamless payment integration.

## 🚀 Live Links & Credentials

- **Live Deployment:** [https://lesson-up.vercel.app](https://lesson-up.vercel.app)
- **Backend API Server:** [https://lesson-up-sarver-one.vercel.app](https://lesson-up-sarver-one.vercel.app)

### 🔑 Admin Access (For Examiners/Recruiters)
- **Admin Email:** `admin@lessonup.com` *(Replace with your actual admin email)*
- **Admin Password:** `AdminPass123` *(Replace with your actual admin password)*

---

## 🛠️ Tech Stack & NPM Packages Used

### Frontend (Client-Side)
- **Framework:** Next.js 16 (App Router) with JavaScript
- **Styling:** Tailwind CSS & HeroUI Component Library
- **Icons:** React Icons (`react-icons`)
- **State & Interactivity:** Framer Motion (for premium UI animations)
- **Social Sharing:** `react-share` *(Optional Feature)*

### Backend (Server-Side)
- **Environment:** Node.js & Express.js
- **Database:** MongoDB Atlas
- **Authentication:** Better Auth (Secure Email/Password & Google OAuth)
- **Payments:** Stripe API (Stripe Webhooks for automated membership upgrade)

---

## ✨ Key Features

### 👤 User Capabilities
- **Dual-Method Authentication:** Secure signup/login using Email/Password (with strict validation rules) or Google OAuth via Better Auth.
- **Dynamic Dashboard:** A full-width interactive panel showcasing personal stats (Total lessons created, saved favorites, recent activity, and quick shortcuts).
- **Smart Content Creation:** Create wisdom entries with Titles, Descriptions, Categories, Emotional Tones, and Images. 
  - *Free Users:* Can create "Free" lessons.
  - *Premium Users:* Can unlock the option to create exclusive "Premium" content.
- **Interactive Feed:** Browse public wisdom, toggle Likes in real-time, save lessons to a "Favorites" directory, and report inappropriate content.

### ⭐ Premium Perks & Stripe Integration
- **Free vs Premium Comparison:** A clean, 8-row feature table explaining Lifetime access perks.
- **One-time Lifetime Upgrade:** Integrated with Stripe Checkout (Test Mode) costing ৳1500. Automatic background role upgrade via Stripe Webhooks.
- **Content Gating:** Premium lessons automatically apply a gorgeous **Glassmorphic Blur Overlay** with a customized orange gradient "Get Premium" CTA for standard users.

### 👑 Admin Management
- **Platform Analytics:** Overview counters displaying total users, public lessons, flagged reports, and active contributors.
- **User Moderation:** Control user roles (Promote standard users to admins).
- **Content Moderation:** Feature exceptional lessons on the main homepage carousel, or handle/ignore reported content through the dedicated complaints center.

---

## ⚙️ Local Installation & Setup Guide

Follow these steps to run the project locally on your machine.

### 1. Clone the Repositories
```bash
# Clone the client-side repository
git clone [https://github.com/YOUR_USERNAME/lesson-up-client.git](https://github.com/YOUR_USERNAME/lesson-up-client.git)
cd lesson-up-client

# Clone the server-side repository (in a separate folder)
git clone [https://github.com/YOUR_USERNAME/lesson-up-server.git](https://github.com/YOUR_USERNAME/lesson-up-server.git)