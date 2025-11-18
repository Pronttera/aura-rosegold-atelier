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

# Step 4: Set up environment variables for Prismic CMS
cp .env.example .env
# Edit .env and add your Prismic credentials

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## 🎨 Prismic CMS Integration

This project is integrated with [Prismic CMS](https://prismic.io/) for content management.

### Quick Setup

1. **Create a Prismic account** at [https://prismic.io/](https://prismic.io/)
2. **Create a new repository** for your project
3. **Copy `.env.example` to `.env`** and add your Prismic credentials:
   ```bash
   cp .env.example .env
   ```
4. **Update the `.env` file** with your repository details:
   ```env
   VITE_PRISMIC_REPOSITORY_NAME=your-repository-name
   VITE_PRISMIC_ACCESS_TOKEN=your-access-token
   ```

### 📚 Documentation

For detailed setup instructions and usage examples, see [PRISMIC_SETUP.md](./PRISMIC_SETUP.md)

### 🚀 Features

- ✅ Prismic client configuration with environment variables
- ✅ Custom React hooks for easy data fetching
- ✅ TypeScript support with type-safe environment variables
- ✅ PrismicProvider for app-wide context
- ✅ Helper functions for common queries
- ✅ Example component demonstrating usage

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

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/92ceb62f-5bd2-423f-807f-a0bad016ddc1) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
