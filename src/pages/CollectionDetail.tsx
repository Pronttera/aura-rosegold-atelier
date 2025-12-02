import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { asText } from "@prismicio/client";
import {
  usePrismicDocumentByUID,
  usePrismicDocumentsByType,
} from "@/hooks/usePrismic";
import { useProducts } from "@/hooks/useProducts";
import { useEffect, useState } from "react";
import DesignTypeFilter from "@/components/Buttons/DropdownMenuFilter";

const CollectionDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedDesignType, setSelectedDesignType] = useState<
    string | undefined
  >(undefined);

  // Fetch the collection
  const {
    data: collection,
    loading: collectionLoading,
    error: collectionError,
  } = usePrismicDocumentByUID("product_type", slug ?? "");

  // Fetch products for this collection
  const {
    products,
    loadMore,
    hasMore,
    loading: loadingProducts,
  } = useProducts(collection?.id, selectedDesignType);

  const { data: designTypes } = usePrismicDocumentsByType("design_type");

  /* ------------------------------ INFINITE SCROLL ------------------------------ */
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 350; // distance from bottom

      if (nearBottom && hasMore && !loadingProducts) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loadingProducts, loadMore]);

  /* ------------------------------ LOADING COLLECTION ------------------------------ */
  if (collectionLoading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <p>Loading collection...</p>
      </div>
    );
  }

  /* ------------------------------ COLLECTION NOT FOUND ------------------------------ */
  if (collectionError || !collection) {
    return (
      <div className="min-h-screen bg-ivory">
        <Navbar />
        <div className="container mx-auto px-6 pt-32 pb-16 text-center">
          <h1 className="text-4xl font-serif text-leather mb-4">
            Collection Not Found
          </h1>
          <Link
            to="/collections"
            className="text-rosegold hover:underline font-body"
          >
            Return to Collections
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Extract content
  const title = asText(collection.data.category_type);
  const description = asText(collection.data.category_description);

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />

      <main className="pt-24 pb-14">
        {/* HEADER */}
        <section className="container mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
          <Link
            to="/collections"
            className="inline-flex items-center gap-2 text-leather hover:text-rosegold transition-colors font-body text-sm mb-6 sm:mb-8 elegant-underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Collections
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-leather mb-3 sm:mb-4 tracking-wide">
              {title}
            </h1>
            <p className="font-body text-base sm:text-lg text-taupe max-w-2xl tracking-elegant">
              {description}
            </p>
          </motion.div>
        </section>

        {/* PRODUCTS GRID */}
        <section className="container mx-auto px-4 sm:px-6">
          {loadingProducts && products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-leather">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-taupe">
                No products found for this collection.
              </p>
            </div>
          ) : (
            <>
              {/* FILTER DROPDOWN */}
              <DesignTypeFilter selectedDesignType={selectedDesignType} setSelectedDesignType={setSelectedDesignType} designTypes={designTypes} />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {products.map((p: any, index: number) => {
                  const uid = p.uid;
                  const name = p.data.name ? p.data.name : "Unnamed Product";
                  const imageUrl = p.data.images?.[0]?.image?.url || "";

                  return (
                    <Link
                      key={p.id}
                      to={`/collections/${slug}/${uid}`}
                      state={{
                        productData: {
                          ...p.data,
                          uid: p.uid,
                          category: {
                            id: collection?.id,
                            slug: slug,
                          },
                        },
                      }}
                      className="block group"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="relative overflow-hidden rounded-lg shadow-soft hover:shadow-hover transition-all duration-500 mb-4">

                          {/* IMAGE */}
                          <div
                            className={`aspect-square overflow-hidden bg-champagne ${p.data.out_of_stock ? "opacity-60 grayscale" : ""
                              }`}
                          >
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={name}
                                className={`w-full h-full object-cover transition-transform duration-700 ${p.data.out_of_stock ? "" : "group-hover:scale-110"
                                  }`}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-taupe">
                                No image
                              </div>
                            )}
                          </div>

                          {/* OUT OF STOCK OVERLAY */}
                          {p.data.out_of_stock && (
                            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                              <span className="text-ivory font-serif text-xl tracking-wide">
                                Out of Stock
                              </span>
                            </div>
                          )}

                        </div>


                        <h3 className="font-serif text-xl text-leather mb-1 tracking-elegant group-hover:text-rosegold transition-colors">
                          {name}
                        </h3>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>

              {/* LOADING INDICATOR FOR INFINITE SCROLL */}
              {loadingProducts && (
                <div className="py-10 text-center text-leather">
                  Loading more...
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CollectionDetail;
