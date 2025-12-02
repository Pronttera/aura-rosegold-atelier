import { useState, useEffect, useCallback } from "react";
import * as prismic from "@prismicio/client";
import { prismicClient } from "@/lib/prismic";

export const useProducts = (
  collectionId: string | undefined,
  designTypeId?: string | undefined
) => {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [count, setCount] = useState(8);

  const fetchProducts = useCallback(async () => {
    if (!collectionId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      /* ---------------------- BUILD PRISMIC FILTERS ---------------------- */
      const filters: any[] = [
        prismic.filter.at("my.product_details.category", collectionId),
      ];

      if (designTypeId) {
        filters.push(
          prismic.filter.at("my.product_details.design_type", designTypeId)
        );
      }

      /* ------------------------------ FETCH ------------------------------ */
      const response = await prismicClient.getByType("product_details", {
        filters: [
          prismic.filter.at("my.product_details.category", collectionId),
          ...(designTypeId
            ? [
                prismic.filter.at(
                  "my.product_details.design_type",
                  designTypeId
                ),
              ]
            : []),
        ],

        pageSize: 100,
        fetchLinks: ["design_type.design_name"], // 👈 ADD THIS
      });

      const all = response.results;

      setAllProducts(all);
      setVisibleProducts(all.slice(0, 8));
      setCount(8);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to load products")
      );
      setAllProducts([]);
      setVisibleProducts([]);
    } finally {
      setLoading(false);
    }
  }, [collectionId, designTypeId]);

  /* ------------------------------ LOAD MORE ------------------------------ */
  const loadMore = useCallback(() => {
    setCount((prev) => {
      const next = prev + 8;

      if (next > allProducts.length) {
        setVisibleProducts(allProducts);
        return allProducts.length;
      }

      setVisibleProducts(allProducts.slice(0, next));
      return next;
    });
  }, [allProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products: visibleProducts,
    loadMore,
    hasMore: visibleProducts.length < allProducts.length,
    loading,
    error,
  };
};

export default useProducts;
