import Navbar from '@/components/Navbar';
import HeroCarousel from '@/components/HeroCarousel';
import CategoryGrid from '@/components/CategoryGrid';
import HighlightSection from '@/components/HighlightSection';
// import FeaturedCarousel from '@/components/FeaturedCarousel';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <main>
        <HeroCarousel />
        <CategoryGrid />
        <HighlightSection />
        {/* <FeaturedCarousel /> */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
