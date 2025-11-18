import { useEffect, useState } from 'react';
import { Query } from '@prismicio/client';
import * as prismicH from '@prismicio/client';

/**
 * Custom hook for fetching Prismic content
 * 
 * @param fetchFunction - Function that returns a Promise with Prismic data
 * @returns Object containing data, loading state, and error
 */
export const usePrismicData = <T,>(
  fetchFunction: () => Promise<T>
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchFunction();
        
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('An error occurred'));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
};

/**
 * Hook for fetching all documents of a specific type
 * 
 * @param documentType - The type of document to fetch
 * @returns Object containing documents, loading state, and error
 */
export const usePrismicDocumentsByType = <T extends prismicH.PrismicDocument>(
  documentType: string
) => {
  return usePrismicData<T[]>(async () => {
    const { prismicClient } = await import('../lib/prismic');
    return prismicClient.getAllByType(documentType) as Promise<T[]>;
  });
};

/**
 * Hook for fetching a single document by UID
 * 
 * @param documentType - The type of document to fetch
 * @param uid - The unique identifier of the document
 * @returns Object containing document, loading state, and error
 */
export const usePrismicDocumentByUID = <T extends prismicH.PrismicDocument>(
  documentType: string,
  uid: string
) => {
  return usePrismicData<T>(async () => {
    const { prismicClient } = await import('../lib/prismic');
    return prismicClient.getByUID(documentType, uid) as Promise<T>;
  });
};

/**
 * Hook for fetching a single document by ID
 * 
 * @param id - The ID of the document
 * @returns Object containing document, loading state, and error
 */
export const usePrismicDocumentByID = <T extends prismicH.PrismicDocument>(
  id: string
) => {
  return usePrismicData<T>(async () => {
    const { prismicClient } = await import('../lib/prismic');
    return prismicClient.getByID(id) as Promise<T>;
  });
};

/**
 * Hook for querying documents with custom predicates
 * 
 * @param predicates - Prismic predicates for filtering
 * @param options - Additional query options
 * @returns Object containing query results, loading state, and error
 */
export const usePrismicQuery = <T extends prismicH.PrismicDocument>(
  predicates: string | string[],
  options?: prismicH.BuildQueryURLArgs
) => {
  return usePrismicData<Query<T>>(async () => {
    const { prismicClient } = await import('../lib/prismic');
    return prismicClient.get({ predicates, ...options }) as Promise<Query<T>>;
  });
};
