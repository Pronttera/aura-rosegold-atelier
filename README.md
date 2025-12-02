# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/92ceb62f-5bd2-423f-807f-a0bad016ddc1

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/92ceb62f-5bd2-423f-807f-a0bad016ddc1) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (Database & Storage)
- Prismic CMS

## Environment Setup

This project uses Supabase for database and storage, and Prismic for content management. You'll need to set up environment variables before running the project.

### Required Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Prismic CMS Configuration
VITE_PRISMIC_REPOSITORY_NAME=your_prismic_repository_name
VITE_PRISMIC_ACCESS_TOKEN=your_prismic_access_token
VITE_PRISMIC_ENDPOINT=your_prismic_endpoint
```

### Supabase Setup

For detailed instructions on setting up Supabase for this project, see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md).

Quick setup:
1. Create a Supabase project at https://supabase.com
2. Create the `custom_jewellery_enquiries` table (SQL provided in SUPABASE_SETUP.md)
3. Create the `enquiry-images` storage bucket
4. Add your Supabase credentials to `.env`

### Prismic CMS Setup

For detailed instructions on setting up Prismic CMS, see [PRISMIC_SETUP.md](./PRISMIC_SETUP.md).

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/92ceb62f-5bd2-423f-807f-a0bad016ddc1) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
