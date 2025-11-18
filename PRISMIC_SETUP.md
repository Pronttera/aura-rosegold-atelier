# Prismic CMS Integration Guide

This project is integrated with [Prismic CMS](https://prismic.io/) for content management. Follow this guide to set up and use Prismic in your application.

## 🚀 Quick Start

### 1. Create a Prismic Account

1. Go to [https://prismic.io/](https://prismic.io/)
2. Sign up for a free account
3. Create a new repository for your project

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your Prismic credentials:
   ```env
   VITE_PRISMIC_REPOSITORY_NAME=your-repository-name
   VITE_PRISMIC_ACCESS_TOKEN=your-access-token (optional)
   VITE_PRISMIC_ENDPOINT=https://your-repository-name.cdn.prismic.io/api/v2
   ```

   **Where to find these values:**
   - **Repository Name**: Found in your Prismic dashboard URL (e.g., `https://your-repo-name.prismic.io`)
   - **Access Token**: Go to Settings → API & Security → Generate an Access Token (only needed for private repositories)
   - **Endpoint**: Auto-generated based on your repository name

### 3. Wrap Your App with PrismicProvider

Update your `main.tsx` or `App.tsx` to include the PrismicProvider:

```tsx
import { PrismicProvider } from './lib/prismicProvider';

function App() {
  return (
    <PrismicProvider>
      {/* Your app components */}
    </PrismicProvider>
  );
}
```

## 📚 Usage Examples

### Using Custom Hooks

The easiest way to fetch Prismic content is using the provided custom hooks:

```tsx
import { usePrismicDocumentsByType } from '@/hooks/usePrismic';

function MyComponent() {
  const { data, loading, error } = usePrismicDocumentsByType('page');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map(doc => (
        <div key={doc.id}>{doc.data.title}</div>
      ))}
    </div>
  );
}
```

### Available Hooks

#### 1. `usePrismicDocumentsByType`
Fetch all documents of a specific type:
```tsx
const { data, loading, error } = usePrismicDocumentsByType('blog_post');
```

#### 2. `usePrismicDocumentByUID`
Fetch a single document by its UID:
```tsx
const { data, loading, error } = usePrismicDocumentByUID('page', 'about-us');
```

#### 3. `usePrismicDocumentByID`
Fetch a single document by its ID:
```tsx
const { data, loading, error } = usePrismicDocumentByID('YXxyz123');
```

#### 4. `usePrismicQuery`
Perform custom queries:
```tsx
import * as prismic from '@prismicio/client';

const { data, loading, error } = usePrismicQuery([
  prismic.predicate.at('document.type', 'blog_post'),
  prismic.predicate.at('my.blog_post.featured', true)
]);
```

### Using the Prismic Client Directly

For more complex queries, use the Prismic client directly:

```tsx
import { prismicClient } from '@/lib/prismic';

async function fetchData() {
  // Get all documents of a type
  const pages = await prismicClient.getAllByType('page');

  // Get a single document by UID
  const about = await prismicClient.getByUID('page', 'about');

  // Custom query
  const featured = await prismicClient.get({
    predicates: [
      prismic.predicate.at('document.type', 'blog_post'),
      prismic.predicate.at('my.blog_post.featured', true)
    ],
    orderings: {
      field: 'my.blog_post.publish_date',
      direction: 'desc'
    }
  });
}
```

### Helper Functions

The following helper functions are available in `src/lib/prismic.ts`:

```tsx
import { getAllByType, getByUID, getByID, query } from '@/lib/prismic';

// Get all documents of a type
const posts = await getAllByType('blog_post');

// Get by UID
const page = await getByUID('page', 'home');

// Get by ID
const doc = await getByID('YXxyz123');

// Custom query
const results = await query([
  prismic.predicate.at('document.type', 'product')
]);
```

## 🎨 TypeScript Support

Define your document types for better type safety:

```tsx
import { PrismicDocument } from '@prismicio/client';

interface BlogPost extends PrismicDocument {
  data: {
    title: string;
    content: any; // RichText field
    author: string;
    publish_date: string;
    featured_image: {
      url: string;
      alt: string;
    };
  };
}

const { data } = usePrismicDocumentsByType<BlogPost>('blog_post');
```

## 🔧 Advanced Configuration

### Custom Client Configuration

Create a custom client with additional options:

```tsx
import { createClient } from '@/lib/prismic';

const customClient = createClient({
  fetch: customFetch,
  defaultParams: {
    lang: 'en-us',
  },
});
```

### Preview Mode

To enable Prismic preview mode, you'll need to set up preview routes. Refer to the [Prismic documentation](https://prismic.io/docs/preview) for detailed instructions.

## 📖 Resources

- [Prismic Documentation](https://prismic.io/docs)
- [Prismic React Documentation](https://prismic.io/docs/technologies/react)
- [Prismic Client API Reference](https://prismic.io/docs/technical-reference/prismicio-client)

## 🐛 Troubleshooting

### "VITE_PRISMIC_REPOSITORY_NAME is not defined"
Make sure you've created a `.env` file and added your repository name.

### "Access denied" or 401 errors
If your repository is private, you need to add an access token to your `.env` file.

### Content not updating
Prismic uses a CDN cache. Changes may take a few moments to propagate. You can also use the preview API for immediate updates during development.

## 📝 Example Component

Check out `src/components/PrismicExample.tsx` for a complete working example of how to fetch and display Prismic content.
