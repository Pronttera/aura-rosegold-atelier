import { usePrismicDocumentsByType } from '@/hooks/usePrismic';
import { PrismicDocument } from '@prismicio/client';

/**
 * Example component demonstrating how to use Prismic in your application
 * 
 * This component fetches and displays documents from Prismic.
 * Replace 'your_document_type' with your actual Prismic document type.
 */

interface ExampleDocument extends PrismicDocument {
  data: {
    title?: string;
    description?: string;
    // Add your custom fields here based on your Prismic schema
  };
}

export const PrismicExample = () => {
  // Fetch documents of a specific type
  // Replace 'page' with your actual document type
  const { data: documents, loading, error } = usePrismicDocumentsByType<ExampleDocument>('page');

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-3">Loading content from Prismic...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-800 font-semibold mb-2">Error loading content</h3>
        <p className="text-red-600">{error.message}</p>
        <p className="text-sm text-red-500 mt-2">
          Make sure your Prismic environment variables are set correctly in your .env file.
        </p>
      </div>
    );
  }

  if (!documents || documents.length === 0) {
    return (
      <div className="p-8 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-yellow-800 font-semibold mb-2">No content found</h3>
        <p className="text-yellow-600">
          No documents found in your Prismic repository. Create some content in Prismic to see it here.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Content from Prismic</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">
              {doc.data.title || 'Untitled'}
            </h3>
            <p className="text-gray-600">
              {doc.data.description || 'No description available'}
            </p>
            <div className="mt-4 text-sm text-gray-400">
              <p>ID: {doc.id}</p>
              <p>Type: {doc.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrismicExample;
