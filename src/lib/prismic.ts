import * as prismic from '@prismicio/client';

/**
 * Prismic Client Configuration
 * 
 * This file sets up the Prismic client for fetching content from your Prismic repository.
 * Make sure to set the required environment variables in your .env file.
 */

// Get environment variables
const repositoryName = import.meta.env.VITE_PRISMIC_REPOSITORY_NAME;
const accessToken = import.meta.env.VITE_PRISMIC_ACCESS_TOKEN;

// Validate required environment variables
if (!repositoryName) {
  throw new Error(
    'VITE_PRISMIC_REPOSITORY_NAME is not defined. Please add it to your .env file.'
  );
}

/**
 * Creates and configures a Prismic client instance
 * @returns Configured Prismic client
 */
export const createClient = (config: prismic.ClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    accessToken: accessToken || undefined,
    ...config,
  });

  return client;
};

/**
 * Default Prismic client instance
 * Use this for most queries throughout your application
 */
export const prismicClient = createClient();

/**
 * Helper function to get all documents of a specific type
 * @param documentType - The type of document to fetch
 * @returns Promise with all documents of the specified type
 */
export const getAllByType = async (documentType: string) => {
  const client = createClient();
  return await client.getAllByType(documentType);
};

/**
 * Helper function to get a single document by UID
 * @param documentType - The type of document to fetch
 * @param uid - The unique identifier of the document
 * @returns Promise with the document
 */
export const getByUID = async (documentType: string, uid: string) => {
  const client = createClient();
  return await client.getByUID(documentType, uid);
};

/**
 * Helper function to get a single document by ID
 * @param id - The ID of the document
 * @returns Promise with the document
 */
export const getByID = async (id: string) => {
  const client = createClient();
  return await client.getByID(id);
};

/**
 * Helper function to query documents with custom predicates
 * @param predicates - Prismic predicates for filtering
 * @param options - Additional query options
 * @returns Promise with query results
 */
export const query = async (
  predicates: string | string[],
  options?: prismic.BuildQueryURLArgs
) => {
  const client = createClient();
  return await client.get({ predicates, ...options });
};
