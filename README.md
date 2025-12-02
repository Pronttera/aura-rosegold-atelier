# Aura Rose Gold Atelier

A luxurious e-commerce website for a premium jewellery brand specializing in custom rose gold pieces. Built with modern web technologies and featuring a complete admin portal for managing customer enquiries.

## 🌟 Project Overview

Aura Rose Gold Atelier is a full-featured jewellery e-commerce platform that combines elegant design with powerful functionality. The platform allows customers to browse collections, view product details, and submit custom jewellery enquiries with reference images. Administrators can securely log in to view and manage all customer enquiries through a protected dashboard.

## 💻 Development Workflow

You can edit this application using your preferred development environment:

### Local Development

The recommended way to work on this project is locally using your preferred IDE.

**Requirements:**
- Node.js 16+ and npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

**Steps:**

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd aura-rosegold-atelier

# Step 3: Install dependencies
npm install

# Step 4: Set up environment variables
cp .env.example .env
# Edit .env with your actual credentials

# Step 5: Start the development server
npm run dev
```

### GitHub Codespaces

For cloud-based development:

1. Navigate to the repository on GitHub
2. Click the "Code" button
3. Select the "Codespaces" tab
4. Click "New codespace"
5. Edit files and commit changes directly

### Direct GitHub Editing

For quick changes:

1. Navigate to the file you want to edit
2. Click the "Edit" button (pencil icon)
3. Make your changes
4. Commit the changes

## 🎨 Features

### Customer-Facing Features
- **Elegant Homepage**: Showcasing featured collections and brand story
- **Collections Gallery**: Browse through curated jewellery collections
- **Product Details**: Detailed product pages with high-quality images
- **Custom Jewellery Enquiry Form**: Submit design requests with reference images
- **Image Upload**: Drag-and-drop or click to upload reference images
- **Form Validation**: Real-time validation with user-friendly error messages
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Beautiful UI**: Rose gold and champagne color scheme with smooth animations

### Admin Features
- **Secure Authentication**: Email/password login with Supabase Auth
- **Protected Dashboard**: View all customer enquiries in one place
- **Statistics Overview**: Track total enquiries, images uploaded, and daily submissions
- **Enquiry Management**: View customer details, design requirements, and reference images
- **Session Management**: Persistent login with auto-redirect logic
- **Sign Out**: Secure logout functionality

### Technical Features
- **Database Integration**: Supabase PostgreSQL for data storage
- **File Storage**: Supabase Storage for image uploads
- **Row Level Security**: Secure data access with RLS policies
- **Type Safety**: Full TypeScript implementation
- **Form Management**: Formik with Yup validation
- **State Management**: React Context API for authentication
- **Routing**: React Router with protected routes
- **UI Components**: shadcn/ui component library
- **Animations**: Framer Motion for smooth transitions

## 🛠️ Technologies Used

### Frontend
- **Vite** - Fast build tool and development server
- **React 18** - UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Formik** - Form management
- **Yup** - Schema validation

### Backend & Services
- **Supabase** - Backend-as-a-Service
  - PostgreSQL Database
  - Authentication
  - Storage
  - Row Level Security
- **Prismic CMS** - Headless CMS for content management

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm (or bun)
- A Supabase account (free tier available)
- A Prismic CMS account (optional, for content management)

### Installation

1. **Clone the repository**
```bash
git clone <YOUR_GIT_URL>
cd aura-rosegold-atelier
```

2. **Install dependencies**
```bash
npm install
# or
bun install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Supabase Configuration (Required)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Prismic CMS Configuration (Optional)
VITE_PRISMIC_REPOSITORY_NAME=your_prismic_repository_name
VITE_PRISMIC_ACCESS_TOKEN=your_prismic_access_token
VITE_PRISMIC_ENDPOINT=your_prismic_endpoint
```

See `.env.example` for a template.

4. **Start the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## ⚙️ Configuration

### 1. Supabase Setup (Required)

Supabase provides the database, authentication, and file storage for this project.

**Quick Setup:**
1. Create a Supabase project at https://supabase.com
2. Run the SQL script to create the `custom_jewellery_enquiries` table
3. Create the `enquiry-images` storage bucket with public access
4. Set up Row Level Security policies
5. Add your Supabase URL and anon key to `.env`

**Detailed Instructions:** See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

**Database Schema:**
```sql
custom_jewellery_enquiries
├── id (UUID, Primary Key)
├── full_name (TEXT)
├── email (TEXT)
├── phone (TEXT)
├── design_details (TEXT)
├── reference_image_url (TEXT)
└── created_at (TIMESTAMPTZ)
```

### 2. Admin Authentication Setup (Required for Admin Access)

Set up admin authentication to access the enquiry dashboard.

**Quick Setup:**
1. Enable Email authentication in Supabase (Authentication → Providers)
2. Create admin users from Supabase dashboard (Authentication → Users)
3. Access the admin portal at `/admin-login`
4. View enquiries at `/admin-dashboard`

**Detailed Instructions:** See [ADMIN_AUTH_SETUP.md](./ADMIN_AUTH_SETUP.md)

### 3. Prismic CMS Setup (Optional)

Prismic CMS can be used for managing dynamic content.

**Quick Setup:**
1. Create a Prismic repository
2. Set up your content types
3. Add Prismic credentials to `.env`

**Detailed Instructions:** See [PRISMIC_SETUP.md](./PRISMIC_SETUP.md)

## 📁 Project Structure

```
aura-rosegold-atelier/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Navbar.tsx      # Navigation bar
│   │   ├── Footer.tsx      # Footer component
│   │   └── ProtectedRoute.tsx  # Route protection wrapper
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Homepage
│   │   ├── Collections.tsx # Collections gallery
│   │   ├── CollectionDetail.tsx  # Collection details
│   │   ├── ProductDetails.tsx    # Product details
│   │   ├── About.tsx       # About page
│   │   ├── Contact.tsx     # Contact page
│   │   ├── Enquiry.tsx     # Custom jewellery enquiry form
│   │   ├── AdminLogin.tsx  # Admin login page
│   │   └── AdminDashboard.tsx    # Admin dashboard
│   ├── lib/                # Utility libraries
│   │   ├── supabase.ts     # Supabase client & helpers
│   │   ├── auth.ts         # Authentication functions
│   │   ├── prismic.ts      # Prismic client (optional)
│   │   └── utils.ts        # General utilities
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.tsx     # Authentication hook & provider
│   │   └── use-toast.ts    # Toast notification hook
│   ├── types/              # TypeScript type definitions
│   ├── data/               # Static data
│   └── assets/             # Images and static assets
├── public/                 # Public static files
├── .env                    # Environment variables (gitignored)
├── .env.example            # Environment variables template
├── SUPABASE_SETUP.md       # Supabase setup guide
├── ADMIN_AUTH_SETUP.md     # Admin auth setup guide
├── PRISMIC_SETUP.md        # Prismic setup guide (if exists)
└── README.md               # This file
```

## 🌐 Routes

### Public Routes
- `/` - Homepage with featured collections
- `/collections` - Browse all collections
- `/collections/:slug` - View specific collection
- `/collections/:slug/:productId` - Product details
- `/about` - About the brand
- `/contact` - Contact information
- `/customize` - Custom jewellery enquiry form
- `/admin-login` - Admin login page

### Protected Routes (Requires Authentication)
- `/admin-dashboard` - View and manage customer enquiries

## 🔒 Security

- **Row Level Security (RLS)**: Enabled on all Supabase tables
- **Protected Routes**: Admin dashboard requires authentication
- **Secure Authentication**: Supabase Auth with email/password
- **Environment Variables**: Sensitive data stored in `.env` (gitignored)
- **HTTPS**: All API calls use secure connections
- **Input Validation**: Form validation with Yup schemas
- **XSS Protection**: React's built-in XSS protection

## 📝 Usage

### For Customers

1. **Browse Collections**: Navigate to `/collections` to view all jewellery collections
2. **View Products**: Click on any product to see detailed information
3. **Submit Custom Enquiry**: Go to `/customize` to submit a custom design request
4. **Upload Reference Image**: Drag and drop or click to upload inspiration images
5. **Fill Form**: Provide contact details and design requirements
6. **Submit**: Click "Submit Enquiry" to send your request

### For Administrators

1. **Login**: Navigate to `/admin-login`
2. **Enter Credentials**: Use your admin email and password
3. **View Dashboard**: After login, you'll see the admin dashboard
4. **Review Enquiries**: See all customer enquiries with:
   - Customer contact information
   - Design details and requirements
   - Reference images (if uploaded)
   - Submission date and time
5. **Statistics**: View quick stats on total enquiries, images, and daily submissions
6. **Sign Out**: Click "Sign Out" when done

## 🧪 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Adding New Features

1. **New Page**: Create a component in `src/pages/` and add route in `App.tsx`
2. **New Component**: Add to `src/components/`
3. **New API Function**: Add to `src/lib/supabase.ts`
4. **New Hook**: Add to `src/hooks/`
5. **New Type**: Add to `src/types/`

## 🚢 Deployment

### Deploy with Vercel (Recommended)

```bash
npm run build
vercel --prod
```

### Deploy with Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

### Environment Variables for Production

Make sure to set these environment variables in your deployment platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_PRISMIC_REPOSITORY_NAME` (if using Prismic)
- `VITE_PRISMIC_ACCESS_TOKEN` (if using Prismic)
- `VITE_PRISMIC_ENDPOINT` (if using Prismic)

## 🌍 Custom Domain

You can connect a custom domain to your deployed project.

### For Vercel:
1. Go to your project dashboard
2. Navigate to Settings → Domains
3. Add your custom domain
4. Configure DNS records as instructed

### For Netlify:
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow the DNS configuration steps

**Documentation:**
- [Vercel Custom Domains](https://vercel.com/docs/concepts/projects/custom-domains)
- [Netlify Custom Domains](https://docs.netlify.com/domains-https/custom-domains/)

## 🐛 Troubleshooting

### Common Issues

**"Missing Supabase environment variables"**
- Ensure `.env` file exists with correct variables
- Restart development server after adding variables

**"Bucket not found" error**
- Create the `enquiry-images` bucket in Supabase Storage
- Set bucket to public
- Configure storage policies (see SUPABASE_SETUP.md)

**"Invalid login credentials"**
- Verify admin user exists in Supabase
- Check email and password are correct
- Ensure email is confirmed (or confirmations are disabled)

**Form submission fails**
- Check Supabase table exists
- Verify RLS policies allow INSERT
- Check browser console for detailed errors

**Images not uploading**
- Verify storage bucket exists and is public
- Check storage policies allow INSERT and SELECT
- Ensure file is an image type

## 📚 Documentation

- [Supabase Setup Guide](./SUPABASE_SETUP.md) - Database and storage configuration
- [Admin Auth Setup Guide](./ADMIN_AUTH_SETUP.md) - Authentication and admin portal setup
- [Prismic Setup Guide](./PRISMIC_SETUP.md) - CMS configuration (if exists)

## 🤝 Contributing

This is a private project. For authorized contributors:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

Private and proprietary. All rights reserved.

## 🙏 Acknowledgments

- UI components from [shadcn/ui](https://ui.shadcn.com)
- Backend by [Supabase](https://supabase.com)
- Animations by [Framer Motion](https://www.framer.com/motion)
- Built with [Vite](https://vitejs.dev) and [React](https://react.dev)

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the setup documentation
3. Check Supabase dashboard for errors
4. Review browser console for client-side errors

---

**Built with ❤️ for Aura Rose Gold Atelier**
