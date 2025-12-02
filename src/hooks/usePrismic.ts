import { useEffect, useState } from "react";
import { prismicClient } from "../lib/prismic";
import * as prismic from "@prismicio/client";

/**
 * Generic Prismic data fetch hook
 */
export const usePrismicData = <T,>(
  fetchFunction: () => Promise<T>,
  deps: any[] = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;

    const fetch = async () => {
      try {
        setLoading(true);
        const result = await fetchFunction();
        if (active) setData(result);
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err : new Error("Prismic error"));
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetch();
    return () => {
      active = false;
    };
  }, deps);

  return { data, loading, error };
};

/**
 * Fetch all documents by type
 */
export const usePrismicDocumentsByType = <
  T extends prismic.PrismicDocument = prismic.PrismicDocument
>(
  documentType: string
) =>
  usePrismicData<T[]>(
    () => prismicClient.getAllByType(documentType),
    [documentType]
  );

/**
 * Fetch single document by UID
 */
export const usePrismicDocumentByUID = <
  T extends prismic.PrismicDocument = prismic.PrismicDocument
>(
  documentType: string,
  uid: string
) =>
  usePrismicData<T>(
    () => prismicClient.getByUID(documentType, uid),
    [documentType, uid]
  );

/**
 * Fetch single document by ID
 */
export const usePrismicDocumentByID = <
  T extends prismic.PrismicDocument = prismic.PrismicDocument
>(
  id: string
) =>
  usePrismicData<T>(() => prismicClient.getByID(id), [id]);

/**
 * Custom Prismic query
 */
export const usePrismicQuery = <
  T extends prismic.PrismicDocument = prismic.PrismicDocument
>(
  predicates: prismic.Predicates[],
  options?: prismic.BuildQueryURLArgs
) =>
  usePrismicData<prismic.Query<T>>(
    () => prismicClient.get({ predicates, ...options }),
    [JSON.stringify(predicates), JSON.stringify(options)]
  );
