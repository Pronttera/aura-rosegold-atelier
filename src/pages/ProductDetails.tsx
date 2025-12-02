import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { prismicClient } from "@/lib/prismic";
import { asText } from "@prismicio/client";
import useProducts from "@/hooks/useProducts";

const ProductDetail = () => {
  const { slug, productUid } = useParams<{
    slug: string;
    productUid: string;
  }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoomModal, setShowZoomModal] = useState(false);

  // Inside your ProductDetails component, after the existing state
  const { products: relatedProducts, loading: relatedProductsLoading } =
    useProducts(product?.category?.id);

  //
  // FETCH PRODUCT + CATEGORY
  //
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!productUid) return;

        // Fetch product
        const productDoc = await prismicClient.getByUID(
          "product_details",
          productUid,
          {
            fetchLinks: ["design_type.design_name"], // <-- fetch linked fields
          }
        );

        if (!productDoc) {
          navigate(`/collections/${slug}`);
          return;
        }

        setProduct(productDoc.data);

        // Fetch linked "product_type" category
        const categoryId = productDoc.data?.category?.id;
        if (categoryId) {
          const categoryDoc = await prismicClient.getByID(categoryId);
          setCategory(categoryDoc?.data || null);
        }
      } catch (err) {
        console.error("Product load error:", err);
        navigate(`/collections/${slug}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productUid, slug, navigate]);

  //
  // LOADING STATE
  //
  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <p className="text-leather font-body">Loading product...</p>
      </div>
    );
  }

  //
  // PRODUCT NOT FOUND
  //
  if (!product) {
    return (
      <div className="min-h-screen bg-ivory">
        <Navbar />
        <div className="container mx-auto px-6 pt-32 pb-16 text-center">
          <h1 className="text-4xl font-serif text-leather mb-4">
            Product Not Found
          </h1>
          <Link
            to={`/collections/${slug}`}
            className="text-rosegold hover:underline font-body"
          >
            Return to Products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  //
  // IMAGES ARRAY
  //
  const images =
    product.images?.map((img: any) => img?.image?.url).filter(Boolean) ?? [];

  const productName = product.name || "Product";

  const designTypeName =
    product?.design_type?.data?.design_name?.[0]?.text;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* BACK BUTTON */}
        <div className="container mx-auto px-6 mb-8">
          <Link
            to={`/collections/${slug}`}
            className="inline-flex items-center gap-2 text-leather hover:text-rosegold transition-colors font-body text-sm elegant-underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {asText(category?.category_type) || "Collection"}
          </Link>
        </div>

        {/* PRODUCT CONTENT */}
        <section className="container mx-auto px-6 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* IMAGE GALLERY */}
            <div className="relative">
              <div 
                className="relative aspect-square overflow-hidden rounded-lg mb-4 cursor-zoom-in"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onClick={() => setShowZoomModal(true)}
              >
                <AnimatePresence mode="wait">
                  <motion.div className="relative w-full h-full">
                    <motion.img
                      key={currentImage}
                      src={images[currentImage]}
                      alt={productName}
                      className="w-full h-full object-cover transition-transform duration-200"
                      style={{
                        transform: isZoomed ? 'scale(2)' : 'scale(1)',
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Zoom Indicator */}
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 pointer-events-none">
                  <ZoomIn className="w-3 h-3" />
                  <span>Click to enlarge</span>
                </div>

                {/* Slider Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-ivory/80 text-leather hover:bg-rosegold hover:text-ivory transition-all"
                      onClick={() =>
                        setCurrentImage((i) =>
                          i === 0 ? images.length - 1 : i - 1
                        )
                      }
                    >
                      <ChevronLeft className="relative left-1.5" />
                    </button>

                    <button
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-ivory/80 text-leather hover:bg-rosegold hover:text-ivory transition-all"
                      onClick={() =>
                        setCurrentImage((i) =>
                          i === images.length - 1 ? 0 : i + 1
                        )
                      }
                    >
                      <ChevronRight className="relative left-2" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto py-2">
                {images.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-20 h-20 rounded-md overflow-hidden border-2 relative ${currentImage === i
                        ? "border-rosegold"
                        : "border-transparent"
                      }`}
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* PRODUCT INFO */}
            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Category Name */}
              <span className="uppercase text-xs tracking-wider text-taupe mb-2 block">
                {asText(category?.category_type)}
              </span>

              {/* Product Name */}
              <h1 className="text-3xl md:text-4xl font-serif text-leather mb-4 tracking-wide">
                {productName}
              </h1>

              {/* Description */}
              {product.description && (
                <p className="text-leather/90 leading-relaxed mb-8 max-w-lg">
                  {asText(product.description)}
                </p>
              )}

              {/* Details List */}
              {product.details?.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-body font-medium text-leather mb-3">
                    Details
                  </h3>

                  <ul className="space-y-2">
                    {/* Show Design Type once */}
                    {designTypeName && (
                      <li key="designType" className="text-taupe text-sm">
                        • {designTypeName} Design
                      </li>
                    )}

                    {/* All other details */}
                    {product.details.map((d: any, index: number) => (
                      <li key={index} className="text-taupe text-sm">
                        • {d.detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* WhatsApp CTA */}
              <div className="space-y-4">
                {product.out_of_stock && (
                  <div className="bg-ivory/90 border border-rosegold/20 p-4 rounded-lg text-center">
                    <p className="text-taupe">
                      This item is currently out of stock, but we can help you get it!
                      Contact us for availability and delivery time.
                    </p>
                  </div>
                )}

                <Button
                  onClick={() => {
                    // Build concise WhatsApp message
                    let message = `Hello, I'm interested in the *${productName}*`;
                    
                    // Add category if available
                    if (category?.category_type) {
                      message += ` from your ${asText(category.category_type)} collection`;
                    }
                    
                    message += `.\n\n`;
                    
                    // Add design type if available
                    if (designTypeName) {
                      message += `Design: ${designTypeName}\n`;
                    }
                    
                    // Add stock status if out of stock
                    if (product.out_of_stock) {
                      message += `\nNote: I understand this is currently out of stock.\n`;
                    }
                    
                    message += `\nPlease share pricing and availability details.\n\nThank you.`;
                    
                    const encodedMsg = encodeURIComponent(message);
                    window.open(`https://wa.me/9834174885?text=${encodedMsg}`, "_blank");
                  }}
                  className="w-full bg-gradient-to-r from-rosegold to-mauve text-ivory rounded-full py-6 text-lg"
                >
                  Send Enquiry on WhatsApp
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="bg-champagne/30 py-16">
            <div className="container mx-auto px-6">
              <h2 className="text-2xl font-serif text-leather mb-8 text-center">
                You May Also Like
              </h2>

              {relatedProductsLoading ? (
                <div className="text-center py-8">
                  <p className="text-taupe">Loading related products...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedProducts
                    .filter((p) => p.uid !== productUid) // Exclude current product
                    .slice(0, 3) // Show maximum 3 related products
                    .map((item) => {
                      const imageUrl = item.data.images?.[0]?.image?.url || "";
                      const productCategory =
                        item.data.category?.uid || "collection";

                      return (
                        <motion.div
                          key={item.id}
                          className="group"
                          whileHover={{ y: -5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Link
                            to={`/collections/${productCategory}/${item.uid}`}
                            state={{
                              productData: {
                                ...item.data,
                                uid: item.uid,
                                category: {
                                  id: item.data.category?.id,
                                  slug: productCategory,
                                },
                              },
                            }}
                          >
                            <div className="relative overflow-hidden rounded-lg shadow-soft hover:shadow-hover transition-all duration-500 mb-4">

                          {/* IMAGE */}
                          <div
                            className={`aspect-square overflow-hidden bg-champagne ${item.data.out_of_stock ? "opacity-60 grayscale" : ""
                              }`}
                          >
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={item.data.name}
                                className={`w-full h-full object-cover transition-transform duration-700 ${item.data.out_of_stock ? "" : "group-hover:scale-110"
                                  }`}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-taupe">
                                No image
                              </div>
                            )}
                          </div>

                          {/* OUT OF STOCK OVERLAY */}
                          {item.data.out_of_stock && (
                            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                              <span className="text-ivory font-serif text-xl tracking-wide">
                                Out of Stock
                              </span>
                            </div>
                          )}

                        </div>
                            <h3 className="font-serif text-xl text-leather mb-1 tracking-elegant group-hover:text-rosegold transition-colors">
                              {item.data.name || "Unnamed Product"}
                            </h3>
                          </Link>
                        </motion.div>
                      );
                    })}
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      <Footer />
      
      {/* Zoom Modal */}
      <AnimatePresence>
        {showZoomModal && images.length > 0 && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowZoomModal(false)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-rosegold transition-colors z-10"
              onClick={() => setShowZoomModal(false)}
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="relative max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center">
              <motion.img
                src={images[currentImage]}
                alt={`${productName} - Enlarged`}
                className="max-w-full max-h-full object-contain"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* Navigation in Modal */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImage((i) => i === 0 ? images.length - 1 : i - 1);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImage((i) => i === images.length - 1 ? 0 : i + 1);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
              
              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                {currentImage + 1} / {images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetail;
