import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Mail, MapPin, Phone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

// Validation Schema
const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  phone: Yup.string()
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      'Please enter a valid phone number'
    )
    .required('Phone number is required'),
  message: Yup.string()
    .min(10, 'Message is too short')
    .required('Message is required'),
});

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = async (
    values: { name: string; email: string; phone: string; message: string },
    { setSubmitting, resetForm }: any
  ) => {
    try {
      const { name, email, phone, message } = values;

      // Format WhatsApp message
      const whatsappMessage =
        `*New Contact Form Enquiry*%0A%0A` +
        `*Name:* ${name}%0A` +
        `*Email:* ${email}%0A` +
        `*Phone:* ${phone}%0A` +
        `*Message:* ${message}%0A`;

      // Replace with your WhatsApp number
      const whatsappNumber = "9834174885";

      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

      // Redirect user to WhatsApp
      window.open(whatsappURL, "_blank");

      toast({
        title: "Redirecting to WhatsApp...",
        description: "Please complete your enquiry on WhatsApp.",
      });

      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
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
              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  phone: '',
                  message: ''
                }}
                validationSchema={ContactSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form className="space-y-5 sm:space-y-6">
                    <div>
                      <label htmlFor="name" className="block font-body text-sm text-leather mb-2 tracking-elegant">
                        Name
                      </label>
                      <Field
                        as={Input}
                        id="name"
                        name="name"
                        type="text"
                        className={`bg-champagne border-taupe focus:border-rosegold focus:ring-rosegold ${errors.name && touched.name ? 'border-red-500' : ''
                          }`}
                      />
                      <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label htmlFor="email" className="block font-body text-sm text-leather mb-2 tracking-elegant">
                        Email
                      </label>
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        className={`bg-champagne border-taupe focus:border-rosegold focus:ring-rosegold ${errors.email && touched.email ? 'border-red-500' : ''
                          }`}
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block font-body text-sm text-leather mb-2 tracking-elegant">
                        Phone Number
                      </label>
                      <Field
                        as={Input}
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        maxLength={10}
                        className={`bg-champagne border-taupe focus:border-rosegold focus:ring-rosegold ${errors.phone && touched.phone ? 'border-red-500' : ''
                          }`}
                      />
                      <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label htmlFor="message" className="block font-body text-sm text-leather mb-2 tracking-elegant">
                        Message
                      </label>
                      <Field
                        as={Textarea}
                        id="message"
                        name="message"
                        rows={6}
                        className={`bg-champagne border-taupe focus:border-rosegold focus:ring-rosegold resize-none ${errors.message && touched.message ? 'border-red-500' : ''
                          }`}
                      />
                      <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-rosegold to-mauve hover:shadow-hover transition-all duration-300 text-ivory font-body tracking-elegant h-12 sm:h-auto py-3 sm:py-2"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Form>
                )}
              </Formik>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6 sm:space-y-8"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif text-leather mb-6 sm:mb-8 tracking-wide">
                  Visit Our Shop
                </h2>

                <div className="space-y-5 sm:space-y-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-champagne flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-rosegold" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base sm:text-lg text-leather mb-1 tracking-elegant">Our Locations</h4>
                      <div className="space-y-2">
                        <ul className='list-disc pl-4 space-y-2'>
                          <li className="font-body text-sm sm:text-base text-taupe tracking-elegant">
                            Kondhwa - Shop No.4, Konark Shopping Hub, Opp. Satyanand Hospital, Kondhwa Kurd, Near HDFC Bank, Pune, Maharashtra 41104
                          </li>
                          <li className="font-body text-sm sm:text-base text-taupe tracking-elegant">
                            Hadapsar - Opp, Lane Number 14/A, SayyedNagar, Hadapsar, Pune, Maharashtra 411028
                          </li>
                        </ul>
                      </div>
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
                        +91 9028474689
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
                        jewellerslabbaik@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-champagne rounded-lg p-6 sm:p-8">
                <h3 className="font-serif text-lg sm:text-xl text-leather mb-3 sm:mb-4 tracking-elegant">
                  Working Hours
                </h3>
                <div className="space-y-2 font-body text-sm sm:text-base text-taupe tracking-elegant">
                  <p>Everyday: 11am - 7pm</p>
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
