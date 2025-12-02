import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for custom_jewellery_enquiries table
export interface CustomJewelleryEnquiry {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  design_details: string;
  reference_image_url?: string | null;
  created_at?: string;
}

/**
 * Upload an image to Supabase Storage
 * @param file - The image file to upload
 * @param bucket - The storage bucket name (default: 'enquiry-images')
 * @returns The public URL of the uploaded image
 */
export const uploadImage = async (file: File, bucket: string = 'enquiry-images'): Promise<string> => {
  try {
    // Generate unique filename with timestamp
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw error;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
};

/**
 * Submit a custom jewellery enquiry
 * @param enquiry - The enquiry data
 * @returns The created enquiry record
 */
export const submitEnquiry = async (enquiry: CustomJewelleryEnquiry) => {
  try {
    const { data, error } = await supabase
      .from('custom_jewellery_enquiries')
      .insert([enquiry])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    throw new Error('Failed to submit enquiry');
  }
};

/**
 * Submit enquiry with image upload
 * @param enquiry - The enquiry data without image URL
 * @param imageFile - Optional image file to upload
 * @returns The created enquiry record
 */
export const submitEnquiryWithImage = async (
  enquiry: Omit<CustomJewelleryEnquiry, 'reference_image_url'>,
  imageFile?: File | null
): Promise<CustomJewelleryEnquiry> => {
  try {
    let imageUrl: string | null = null;

    // Upload image if provided
    if (imageFile) {
      try {
        imageUrl = await uploadImage(imageFile);
      } catch (uploadError) {
        console.warn('Failed to upload image, continuing without it:', uploadError);
        // Continue with form submission even if image upload fails
        // This allows the form to work even if the storage bucket is not set up
      }
    }

    // Submit enquiry with image URL (or null if upload failed)
    const enquiryData: CustomJewelleryEnquiry = {
      ...enquiry,
      reference_image_url: imageUrl,
    };

    const result = await submitEnquiry(enquiryData);
    return result;
  } catch (error) {
    console.error('Error submitting enquiry with image:', error);
    throw error;
  }
};
