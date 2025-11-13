import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Upload, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const Enquiry = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeImage = () => {
    setUploadedImage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before sending your enquiry.",
        variant: "destructive",
      });
      return;
    }

    // Show success toast
    toast({
      title: "Enquiry Prepared! ✨",
      description: "Your enquiry has been prepared for WhatsApp. Redirecting...",
    });

    // Simulate WhatsApp redirect (UI only)
    setTimeout(() => {
      console.log('WhatsApp enquiry would be sent with:', formData, uploadedImage);
    }, 1500);
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
      },
    }),
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 bg-gradient-to-br from-champagne via-ivory to-mauve/20"
      >
        <div className="container mx-auto max-w-2xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light tracking-wide text-leather mb-3 sm:mb-4"
          >
            Personalized Adornments by <span className="font-bold">Labbaik</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base sm:text-lg font-body text-taupe leading-relaxed mb-2 sm:mb-3 px-4"
          >
            Upload your inspiration and receive your dream jewellery—crafted within 7 days.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xs sm:text-sm font-body italic text-rosegold/80 mb-4 sm:mb-6"
          >
            Our 7-Day Custom Jewellery Guarantee
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="w-24 h-[1px] mx-auto bg-gradient-to-r from-transparent via-rosegold to-transparent"
          />
        </div>
      </motion.section>

      {/* Enquiry Form Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Name Field */}
            <motion.div
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
            >
              <Label htmlFor="name" className="text-leather font-body text-sm uppercase tracking-elegant mb-2 block">
                Your Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-champagne/30 border-taupe/30 focus:border-rosegold text-leather placeholder:text-taupe/60"
                placeholder="Enter your full name"
              />
            </motion.div>

            {/* Email Field */}
            <motion.div
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
            >
              <Label htmlFor="email" className="text-leather font-body text-sm uppercase tracking-elegant mb-2 block">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-champagne/30 border-taupe/30 focus:border-rosegold text-leather placeholder:text-taupe/60"
                placeholder="your.email@example.com"
              />
            </motion.div>

            {/* Message Field */}
            <motion.div
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
            >
              <Label htmlFor="message" className="text-leather font-body text-sm uppercase tracking-elegant mb-2 block">
                Design Details / Message
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="bg-champagne/30 border-taupe/30 focus:border-rosegold text-leather placeholder:text-taupe/60 min-h-[120px]"
                placeholder="Tell us about your vision, preferred materials, size, or any reference details..."
              />
            </motion.div>

            {/* Image Upload */}
            <motion.div
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
            >
              <Label className="text-leather font-body text-sm uppercase tracking-elegant mb-2 block">
                Upload Reference Image
              </Label>
              
              {!uploadedImage ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`relative border-2 border-dashed rounded-lg p-8 transition-all duration-300 ${
                    isDragging
                      ? 'border-rosegold bg-mauve/20'
                      : 'border-taupe/40 bg-champagne/20 hover:border-rosegold/60 hover:bg-mauve/10'
                  }`}
                >
                  <input
                    type="file"
                    id="image-upload"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center text-center">
                    <Upload className="w-12 h-12 text-rosegold mb-4" />
                    <p className="font-body text-leather mb-2">
                      Drag & drop your image here, or click to browse
                    </p>
                    <p className="font-body text-sm text-taupe">
                      Accepts JPG, JPEG, PNG (max 5MB)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-lg overflow-hidden bg-champagne/30 p-4 shadow-soft">
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 z-10 bg-leather/80 hover:bg-leather text-ivory rounded-full p-2 transition-all duration-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <img
                    src={uploadedImage}
                    alt="Uploaded reference"
                    className="w-full h-auto rounded-md"
                  />
                </div>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div
              custom={4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              className="flex justify-center pt-6"
            >
              <Button
                type="submit"
                className="bg-gradient-to-r from-rosegold to-mauve hover:shadow-hover transition-all duration-300 text-ivory font-body tracking-elegant px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base group h-12 sm:h-auto w-full sm:w-auto"
              >
                <MessageSquare className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Send Enquiry via WhatsApp
              </Button>
            </motion.div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Enquiry;
