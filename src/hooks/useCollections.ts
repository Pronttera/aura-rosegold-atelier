import { useState, useEffect } from 'react';
import { prismicClient } from '@/lib/prismic';

type Collection = {
  name: string;
  slug: string;
  description: string;
  image: string;
};

export const useCollections = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await prismicClient.getAllByType("product_type");

        const formatted = res.map((doc) => ({
          name: doc.data.category_type?.[0]?.text || "",
          slug: doc.uid || "",
          description: doc.data.category_description?.[0]?.text || "",
          image: doc.data.category_image?.url || "",
        }));

        setCollections(formatted);
        setError(null);
      } catch (err) {
        console.error("Error fetching collections:", err);
        setError(err instanceof Error ? err : new Error('Failed to fetch collections'));
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  return { collections, loading, error };
};
