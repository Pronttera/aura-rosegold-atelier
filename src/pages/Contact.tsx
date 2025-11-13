import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: 'Message Sent',
      description: 'Thank you for your inquiry. We will be in touch soon.',
    });

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        {/* Header */}
        <section className="container mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-leather mb-3 sm:mb-4 tracking-wide">
              Get In Touch
            </h1>
            <p className="font-body text-base sm:text-lg text-taupe max-w-2xl mx-auto tracking-elegant px-4">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </section>

        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="block font-body text-sm text-leather mb-2 tracking-elegant">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-champagne border-taupe focus:border-rosegold focus:ring-rosegold"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-body text-sm text-leather mb-2 tracking-elegant">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-champagne border-taupe focus:border-rosegold focus:ring-rosegold"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-body text-sm text-leather mb-2 tracking-elegant">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-champagne border-taupe focus:border-rosegold focus:ring-rosegold resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-rosegold to-mauve hover:shadow-hover transition-all duration-300 text-ivory font-body tracking-elegant h-12 sm:h-auto py-3 sm:py-2"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6 sm:space-y-8"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif text-leather mb-6 sm:mb-8 tracking-wide">
                  Visit Our Atelier
                </h2>
                
                <div className="space-y-5 sm:space-y-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-champagne flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-rosegold" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base sm:text-lg text-leather mb-1 tracking-elegant">
                        Location
                      </h3>
                      <p className="font-body text-sm sm:text-base text-taupe tracking-elegant">
                        123 Atelier Street<br />
                        Arts District, CA 90013
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-champagne flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-rosegold" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base sm:text-lg text-leather mb-1 tracking-elegant">
                        Phone
                      </h3>
                      <p className="font-body text-sm sm:text-base text-taupe tracking-elegant">
                        +1 (555) 123-4567
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-champagne flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-rosegold" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base sm:text-lg text-leather mb-1 tracking-elegant">
                        Email
                      </h3>
                      <p className="font-body text-sm sm:text-base text-taupe tracking-elegant">
                        hello@labbaikjewelry.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-champagne rounded-lg p-6 sm:p-8">
                <h3 className="font-serif text-lg sm:text-xl text-leather mb-3 sm:mb-4 tracking-elegant">
                  Atelier Hours
                </h3>
                <div className="space-y-2 font-body text-sm sm:text-base text-taupe tracking-elegant">
                  <p>Monday - Friday: 10am - 6pm</p>
                  <p>Saturday: 11am - 5pm</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
