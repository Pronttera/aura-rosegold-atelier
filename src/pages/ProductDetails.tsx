import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { prismicClient } from "@/lib/prismic";
import { asText } from "@prismicio/client";

const ProductDetail = () => {
  const { slug, productUid } = useParams<{ slug: string; productUid: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  //
  // FETCH PRODUCT + CATEGORY
  //
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!productUid) return;

        // Fetch product
        const productDoc = await prismicClient.getByUID("product_details", productUid);

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
          <h1 className="text-4xl font-serif text-leather mb-4">Product Not Found</h1>
          <Link to={`/collections/${slug}`} className="text-rosegold hover:underline font-body">
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
              <div className="relative aspect-square overflow-hidden rounded-lg mb-4">

                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImage}
                    src={images[currentImage]}
                    alt={productName}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                </AnimatePresence>

                {/* Slider Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-ivory/80 text-leather hover:bg-rosegold hover:text-ivory transition-all"
                      onClick={() =>
                        setCurrentImage((i) => (i === 0 ? images.length - 1 : i - 1))
                      }
                    >
                      <ChevronLeft className="relative left-1.5" />
                    </button>

                    <button
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-ivory/80 text-leather hover:bg-rosegold hover:text-ivory transition-all"
                      onClick={() =>
                        setCurrentImage((i) => (i === images.length - 1 ? 0 : i + 1))
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
                    className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                      currentImage === i ? "border-rosegold" : "border-transparent"
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
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
                  <h3 className="font-body font-medium text-leather mb-3">Details</h3>
                  <ul className="space-y-2">
                    {product.details.map((d: any, index: number) => (
                      <li key={index} className="text-taupe text-sm">
                        • {d.detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* WhatsApp CTA */}
              <Button
                onClick={() => {
                  const msg = encodeURIComponent(
                    `Hello, I’m interested in the ${productName}. Please share more details.`
                  );
                  window.open(`https://wa.me/9834174885?text=${msg}`, "_blank");
                }}
                className="w-full bg-gradient-to-r from-rosegold to-mauve text-ivory rounded-full py-6 text-lg"
              >
                Send Enquiry on WhatsApp
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
