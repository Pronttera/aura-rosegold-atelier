import * as prismic from "@prismicio/client";

/**
 * Prismic Client Setup
 */

// Environment Variables
const endpoint = import.meta.env.VITE_PRISMIC_ENDPOINT;
const repositoryName = import.meta.env.VITE_PRISMIC_REPOSITORY_NAME;
const accessToken = import.meta.env.VITE_PRISMIC_ACCESS_TOKEN;

if (!endpoint) {
  throw new Error(
    "VITE_PRISMIC_ENDPOINT is missing. Add it to your .env file."
  );
}

if (!repositoryName) {
  throw new Error(
    "VITE_PRISMIC_REPOSITORY_NAME is missing. Add it to your .env file."
  );
}

export const createClient = (config: prismic.ClientConfig = {}) => {
  return prismic.createClient(endpoint, {
    accessToken: accessToken || undefined,
    ...config,
  });
};

// Default shared client
export const prismicClient = createClient();

/**
 * Helpers
 */

export const getAllByType = async (documentType: string) => {
  return await prismicClient.getAllByType(documentType);
};

export const getByUID = async (documentType: string, uid: string) => {
  return await prismicClient.getByUID(documentType, uid);
};

export const getByID = async (id: string) => {
  return await prismicClient.getByID(id);
};

export const query = async (
  predicates: prismic.Predicate[],
  options?: prismic.BuildQueryURLArgs
) => {
  return await prismicClient.get({ predicates, ...options });
};
