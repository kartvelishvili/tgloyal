# TG Legal - Tamar Gegiadze Legal Services Website

Professional legal services website with multilingual support (Georgian/English) and comprehensive admin panel.

## 🌟 Features

### Public Website
- ⚖️ Georgian lawyer portfolio and services showcase
- 🌐 Bilingual support (Georgian/English)
- 📱 Fully responsive design
- ⚡ Built with React + Vite for optimal performance
- 🎨 Multiple design versions for each section with live preview/publish
- 📧 Contact form with lead capture (stored in Supabase)

### Admin Panel (`/paneli`)
- 🔐 Secure login system (Supabase + localStorage fallback)
- 📝 Content editor for all website sections (KA/EN)
- 🎨 Design version manager - preview, publish, and rollback section designs
- 📱 Social media links manager with custom HTML support
- 📊 Leads dashboard - view contact form submissions
- 👥 Admin user management (Supabase integration)
- 💾 Dual-storage: Supabase (cloud) + localStorage (fallback)

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ (recommended: v24.13.1 via nvm)
- npm or yarn
- Supabase account (optional but recommended)

### Installation

```bash
# Clone repository
git clone https://github.com/kartvelishvili/tgloyal.git
cd tgloyal

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will run at `http://localhost:3000`

### Build for Production

```bash
npm run build
# Output in /dist folder
```

## 🗄️ Supabase Setup

### 1. Create Supabase Project
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Copy your Project URL and anon/public API key

### 2. Update Environment Variables
Edit `src/lib/customSupabaseClient.js` with your credentials:
```javascript
const SUPABASE_URL = 'YOUR_PROJECT_URL';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';
```

### 3. Run SQL Migration
1. Open **SQL Editor** in Supabase Dashboard
2. Copy contents of `supabase-migration.sql`
3. Run the SQL script

This creates:
- `admins` table - admin users
- `social_links` table - footer social media buttons
- `footer_custom_html` table - custom HTML for footer
- Default super admin account

### 4. Default Admin Credentials
- **Email:** `qartvela.ge@gmial.com`
- **Password:** `Qartvela2786`

⚠️ **Change these credentials after first login!**

## 📁 Project Structure

```
tglegal/
├── src/
│   ├── components/          # React components
│   │   ├── versions/        # Section design versions (V2, V3)
│   │   ├── admin/           # Admin panel components
│   │   └── ui/              # Reusable UI components
│   ├── pages/
│   │   ├── HomePage.jsx     # Main website
│   │   └── AdminPage.jsx    # Admin panel
│   ├── contexts/            # React contexts (Language, Supabase)
│   ├── lib/                 # Utilities & config
│   │   ├── translations.js  # KA/EN translations
│   │   ├── customSupabaseClient.js
│   │   └── sectionVersionRegistry.js
│   └── hooks/               # Custom React hooks
├── plugins/                 # Vite plugins
├── public/                  # Static assets
└── supabase-migration.sql   # Database schema
```

## 🎨 Admin Panel Features

### Content Editor
- Edit all sections in Georgian and English
- Real-time preview
- Search functionality
- Save/reset changes

### Design Manager
- 2-3 design versions per section
- Preview before publishing
- Publish to production
- Rollback to previous version
- Version history

### Social Links Manager
- Add/edit/delete social media buttons
- Icon selector (Facebook, Instagram, LinkedIn, YouTube, etc.)
- URL management
- Visibility toggle
- Reorder buttons
- Custom HTML editor for footer (Google Maps, widgets, etc.)

### Leads Panel
- View contact form submissions
- Mark as read/unread
- Delete leads
- Filter and search

### Admin Management
- Add new admins
- Role-based access (super admin / admin)
- Delete admins (except default super admin)
- Supabase sync with localStorage fallback

## 🛡️ Security Notes

- Row Level Security (RLS) enabled on all Supabase tables
- Passwords stored in plain text (⚠️ **Use bcrypt/Argon2 for production!**)
- Admin panel accessible only with valid credentials
- Default super admin cannot be deleted

## 🔧 Tech Stack

- **Frontend:** React 18, React Router v7
- **Build Tool:** Vite 4.5
- **Styling:** Tailwind CSS 3.4
- **Animations:** Framer Motion 11
- **Icons:** Lucide React
- **Backend:** Supabase (PostgreSQL)
- **State:** localStorage + Supabase sync

## 📝 License

Private project - All rights reserved © 2026

## 👤 Author

**Tamar Gegiadze**
- Legal services in Tbilisi, Georgia
- Website: [tglegal.ge](https://tglegal.ge)

---

Developed with ❤️ by [Smarketer.ge](https://smarketer.ge)
