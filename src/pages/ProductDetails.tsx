import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, Share2, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { findProduct, getAllProducts, Product } from '@/data/products';
import product1 from '@/assets/product-1.jpg';
import product2 from '@/assets/product-2.jpg';
import product3 from '@/assets/product-3.jpg';
import product4 from '@/assets/product-4.jpg';

// Mock data - In a real app, this would come from an API
const productsData = {
    rings: [
        {
            id: 1,
            name: 'Ethereal Band',
            price: '$285',
            description: 'A delicate band featuring a subtle rosegold finish, perfect for everyday elegance. Handcrafted with attention to detail, this piece embodies understated luxury.',
            category: 'Rings',
            images: [product1, product2, product3, product4],
            details: [
                '18K Rosegold',
                '2mm width',
                'Handcrafted',
                'Nickel-free',
                'Hypoallergenic'
            ]
        },
        // More products...
    ],
    // Other categories...
} as const;

const ProductDetail = () => {
    const { slug, productId } = useParams<{ slug: string; productId: string }>();
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [quantity, setQuantity] = useState(1);

    // Find the product data
    const product = slug && productId
        ? findProduct(slug, parseInt(productId, 10))
        : null;

    // If product not found, redirect to collections
    useEffect(() => {
        if (!product && slug) {
            navigate(`/collections/${slug}`);
        }
    }, [product, slug, navigate]);

    if (!product) {
        return (
            <div className="min-h-screen bg-ivory">
                <Navbar />
                <div className="container mx-auto px-6 pt-32 pb-16 text-center">
                    <h1 className="text-4xl font-serif text-leather mb-4">Product Not Found</h1>
                    <Link to="/collections" className="text-rosegold hover:underline font-body">
                        Return to Collections
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    const handlePrevImage = () => {
        setCurrentImageIndex(prev =>
            prev === 0 ? product.images.length - 1 : prev - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex(prev =>
            prev === product.images.length - 1 ? 0 : prev + 1
        );
    };

    const handleThumbnailClick = (index: number) => {
        setCurrentImageIndex(index);
    };

    const handleQuantityChange = (value: number) => {
        const newQuantity = quantity + value;
        if (newQuantity >= 1 && newQuantity <= 10) {
            setQuantity(newQuantity);
        }
    };

    // Mock related products - in a real app, this would be filtered by category or tags
    const relatedProducts = product
        ? getAllProducts()
            .filter(p => p.id !== product.id && p.category === product.category)
            .slice(0, 3)
            .map(p => ({
                id: p.id,
                name: p.name,
                price: p.price,
                image: p.images[0]
            }))
        : [];

    return (
        <div className="min-h-screen bg-ivory">
            <Navbar />

            <main className="pt-24 pb-16">
                {/* Back to Collection */}
                <div className="container mx-auto px-6 mb-8">
                    <Link
                        to={`/collections/${slug}`}
                        className="inline-flex items-center gap-2 text-leather hover:text-rosegold transition-colors font-body text-sm mb-8 elegant-underline"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to {product.category}
                    </Link>
                </div>

                {/* Product Section */}
                <section className="container mx-auto px-6 mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Product Images */}
                        <div className="relative">
                            <div className="relative aspect-square overflow-hidden rounded-lg bg-champagne mb-4">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentImageIndex}
                                        src={product.images[currentImageIndex]}
                                        alt={`${product.name} - ${currentImageIndex + 1}`}
                                        className="w-full h-full object-cover"
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </AnimatePresence>

                                {/* Navigation Arrows */}
                                {product.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={handlePrevImage}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-ivory/80 backdrop-blur-sm flex items-center justify-center text-leather hover:bg-rosegold hover:text-ivory transition-all shadow-md"
                                            aria-label="Previous image"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={handleNextImage}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-ivory/80 backdrop-blur-sm flex items-center justify-center text-leather hover:bg-rosegold hover:text-ivory transition-all shadow-md"
                                            aria-label="Next image"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </>
                                )}

                                {/* Favorite Button */}
                                <button
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    className={`absolute top-4 right-4 p-2 rounded-full ${isFavorite ? 'text-rose-500' : 'text-leather/80 hover:text-rose-500'} bg-ivory/80 backdrop-blur-sm transition-all`}
                                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                                >
                                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                                </button>
                            </div>

                            {/* Thumbnails */}
                            {product.images.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto py-2 -mx-2 px-2">
                                    {product.images.map((img: string, index: number) => (
                                        <button
                                            key={index}
                                            onClick={() => handleThumbnailClick(index)}
                                            className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${currentImageIndex === index
                                                ? 'border-rosegold'
                                                : 'border-transparent hover:border-taupe/30'
                                                }`}
                                            aria-label={`View image ${index + 1}`}
                                        >
                                            <img
                                                src={img}
                                                alt={`${product.name} - Thumbnail ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <motion.div
                            className="pt-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="uppercase text-xs tracking-wider text-taupe font-medium mb-2 block">
                                {product.category}
                            </span>

                            <h1 className="text-3xl md:text-4xl font-serif text-leather mb-4 tracking-wide">
                                {product.name}
                            </h1>

                            <p className="text-2xl font-serif text-rosegold mb-6">
                                {product.price}
                            </p>

                            <p className="text-leather/90 leading-relaxed mb-8 max-w-lg">
                                {product.description}
                            </p>

                            <div className="mb-8">
                                <h3 className="font-body font-medium text-leather mb-3">Details</h3>
                                <ul className="space-y-2">
                                    {product.details.map((detail: string, index: number) => (
                                        <li key={index} className="flex items-center text-taupe text-sm">
                                            <span className="w-1.5 h-1.5 rounded-full bg-rosegold/70 mr-2"></span>
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-8">
                                <Button
                                    onClick={() => {
                                        const message = `Hi, I'm interested in the ${product.name} (${product.category}). Could you please provide me with more information on the same?`;
                                        const encodedMessage = encodeURIComponent(message);
                                        window.open(`https://wa.me/9834174885?text=${encodedMessage}`, '_blank');
                                    }}
                                    className="w-full bg-gradient-to-r from-rosegold to-mauve hover:shadow-hover transition-all duration-300 text-ivory font-body tracking-elegant px-8 py-6 rounded-full text-lg"
                                    size="lg"
                                >
                                    Send Enquiry on WhatsApp
                                </Button>
                            </div>

                            <div className="flex items-center gap-4 pt-4 border-t border-taupe/10">
                                <button className="flex items-center text-taupe hover:text-rosegold transition-colors">
                                    <Share2 className="w-4 h-4 mr-2" />
                                    <span className="text-sm">Share</span>
                                </button>
                                <button className="flex items-center text-taupe hover:text-rosegold transition-colors">
                                    <Heart className="w-4 h-4 mr-2" />
                                    <span className="text-sm">Save for later</span>
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* You May Also Like Section */}
                <section className="bg-champagne/30 py-16">
                    <div className="container mx-auto px-6">
                        <h2 className="text-2xl font-serif text-leather mb-8 text-center">
                            You May Also Like
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedProducts.map((item) => (
                                <motion.div
                                    key={item.id}
                                    className="group"
                                    whileHover={{ y: -5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Link to={`/collections/${product?.category}/${item.id}`}>
                                        <div className="relative overflow-hidden rounded-lg shadow-soft hover:shadow-hover transition-all duration-500 mb-4">
                                            <div className="aspect-square overflow-hidden bg-champagne">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="absolute inset-0 bg-rosegold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </div>
                                        <h3 className="font-serif text-xl text-leather mb-1 tracking-elegant group-hover:text-rosegold transition-colors">
                                            {item.name}
                                        </h3>
                                        <p className="font-body text-taupe tracking-elegant">
                                            {item.price}
                                        </p>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetail;