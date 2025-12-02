import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Upload, X, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { submitEnquiryWithImage } from '@/lib/supabase';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const Enquiry = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Yup Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter your name"),
    email: Yup.string().email("Invalid email address").required("Please enter your email"),
    phone: Yup.string()
      .matches(/^[0-9+\-\s]+$/, "Invalid phone number")
      .required("Please enter your phone number"),
    message: Yup.string().required("Please enter a message"),
  });

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);

      try {
        // Submit enquiry with image to Supabase
        await submitEnquiryWithImage(
          {
            full_name: values.name,
            email: values.email,
            phone: values.phone,
            design_details: values.message,
          },
          uploadedFile
        );

        // Show success notification
        toast({
          title: "Enquiry Submitted Successfully! ✨",
          description: "Thank you! We have received your enquiry and will contact you soon.",
        });

        // Reset form
        formik.resetForm();
        setUploadedImage(null);
        setUploadedFile(null);
      } catch (error) {
        console.error('Error submitting enquiry:', error);
        toast({
          title: "Submission Failed",
          description: "There was an error submitting your enquiry. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Image upload handling
  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      // Store the actual file for upload
      setUploadedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageUpload(file);
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6 },
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
        className="relative pt-24 pb-12 px-4 bg-gradient-to-br from-champagne via-ivory to-mauve/20"
      >
        <div className="container mx-auto max-w-2xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl md:text-4xl font-serif text-leather mb-3"
          >
            Personalized Adornments by <span className="font-bold">Labbaik</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base text-taupe mb-3"
          >
            Upload your inspiration and receive your dream jewellery—crafted within 7 days.
          </motion.p>
        </div>
      </motion.section>

      {/* Form Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <form onSubmit={formik.handleSubmit} className="space-y-8">

            {/* Name */}
            <motion.div custom={0} initial="hidden" whileInView="visible" variants={fadeUpVariants}>
              <Label>Your Name</Label>
              <Input
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-champagne/30 border-taupe/30"
                placeholder="Enter your full name"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div custom={1} initial="hidden" whileInView="visible" variants={fadeUpVariants}>
              <Label>Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-champagne/30"
                placeholder="your.email@example.com"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
              )}
            </motion.div>

            {/* Phone */}
            <motion.div custom={2} initial="hidden" whileInView="visible" variants={fadeUpVariants}>
              <Label>Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-champagne/30"
                placeholder="+91 98765 43210"
                pattern="[0-9]{10}"
                maxLength={10}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
              )}
            </motion.div>

            {/* Message */}
            <motion.div custom={3} initial="hidden" whileInView="visible" variants={fadeUpVariants}>
              <Label>Design Details / Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-champagne/30 min-h-[120px]"
                placeholder="Describe your design idea..."
              />
              {formik.touched.message && formik.errors.message && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.message}</p>
              )}
            </motion.div>

            {/* Image Upload */}
            <motion.div custom={4} initial="hidden" whileInView="visible" variants={fadeUpVariants}>
              <Label>Upload Reference Image</Label>

              {!uploadedImage ? (
                <label
                  onDrop={handleDrop}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  className={`relative block border-2 border-dashed rounded-lg p-8 cursor-pointer transition ${isDragging
                      ? "border-rosegold bg-mauve/20"
                      : "border-taupe/40 bg-champagne/20"
                    }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  <div className="text-center">
                    <Upload className="w-12 h-12 text-rosegold mx-auto mb-4" />
                    <p>Click or drag an image here</p>
                  </div>
                </label>
              ) : (
                <div className="relative p-4 bg-champagne/30 rounded-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setUploadedImage(null);
                      setUploadedFile(null);
                    }}
                    className="absolute top-2 right-2 bg-leather/80 text-ivory p-2 rounded-full hover:bg-leather transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <img src={uploadedImage} className="w-full rounded-md" alt="uploaded" />
                </div>
              )}
            </motion.div>

            {/* Submit */}
            <motion.div custom={5} initial="hidden" whileInView="visible" variants={fadeUpVariants}>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-rosegold to-mauve text-ivory py-5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <MessageSquare className="mr-2" />
                    Submit Enquiry
                  </>
                )}
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
