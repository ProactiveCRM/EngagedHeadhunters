import { z } from 'zod';

/**
 * Form validation schemas for security and data integrity
 * All forms MUST validate on both client and server side
 */

export const contactFormSchema = z.object({
  name: z.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters'),

  email: z.string()
    .trim()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase(),

  phone: z.string()
    .trim()
    .regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number format')
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number must be less than 20 characters')
    .optional()
    .or(z.literal('')),

  company: z.string()
    .trim()
    .max(200, 'Company name must be less than 200 characters')
    .optional()
    .or(z.literal('')),

  message: z.string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),

  // Honeypot field - must be empty to pass validation
  honeypot: z.string()
    .max(0, 'Invalid submission')
    .optional()
    .or(z.literal('')),

  // TCPA consent required
  tcpa_consent: z.boolean()
    .refine(val => val === true, {
      message: 'You must consent to be contacted to submit this form'
    })
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Resume upload validation
 */
export const resumeUploadSchema = z.object({
  name: z.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),

  email: z.string()
    .trim()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase(),

  phone: z.string()
    .trim()
    .regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number')
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number must be less than 20 characters'),

  position: z.string()
    .trim()
    .min(2, 'Position must be at least 2 characters')
    .max(100, 'Position must be less than 100 characters'),

  experience: z.enum(['entry', 'mid', 'senior', 'executive'], {
    message: 'Please select your experience level',
  }),

  honeypot: z.string()
    .max(0)
    .optional()
    .or(z.literal('')),

  tcpa_consent: z.boolean()
    .refine(val => val === true, {
      message: 'You must consent to be contacted'
    })
});

export type ResumeUploadData = z.infer<typeof resumeUploadSchema>;

/**
 * Agent application validation
 */
export const agentApplicationSchema = z.object({
  full_name: z.string()
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters'),

  email: z.string()
    .trim()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase(),

  phone: z.string()
    .trim()
    .regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number')
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number must be less than 20 characters'),

  location: z.string()
    .trim()
    .min(2, 'Location must be at least 2 characters')
    .max(100, 'Location must be less than 100 characters'),

  experience_years: z.number()
    .int('Experience must be a whole number')
    .min(0, 'Experience cannot be negative')
    .max(50, 'Please enter a valid number of years'),

  niche: z.string()
    .trim()
    .min(2, 'Niche must be at least 2 characters')
    .max(100, 'Niche must be less than 100 characters'),

  why_join: z.string()
    .trim()
    .min(50, 'Please provide at least 50 characters explaining why you want to join')
    .max(1000, 'Explanation must be less than 1000 characters'),

  honeypot: z.string()
    .max(0)
    .optional()
    .or(z.literal('')),

  tcpa_consent: z.boolean()
    .refine(val => val === true, {
      message: 'You must consent to be contacted'
    })
});

export type AgentApplicationData = z.infer<typeof agentApplicationSchema>;

/**
 * Auth form validation schemas
 */
const emailSchema = z.string()
  .trim()
  .min(1, 'Email is required')
  .email('Invalid email address')
  .max(255, 'Email must be less than 255 characters')
  .toLowerCase();

const strongPasswordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required')
});

export type SignInData = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  email: emailSchema,
  password: strongPasswordSchema
});

export type SignUpData = z.infer<typeof signUpSchema>;

export const forgotPasswordSchema = z.object({
  email: emailSchema
});

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  password: strongPasswordSchema,
  confirmPassword: z.string().min(1, 'Please confirm your password')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

/**
 * Newsletter subscription validation
 */
export const newsletterSchema = z.object({
  email: z.string()
    .trim()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase()
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

/**
 * Alliance application validation
 */
export const allianceApplicationSchema = z.object({
  full_name: z.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),

  email: z.string()
    .trim()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase(),

  phone: z.string()
    .trim()
    .regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number format')
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number must be less than 20 characters'),

  company_name: z.string()
    .trim()
    .min(2, 'Company name must be at least 2 characters')
    .max(200, 'Company name must be less than 200 characters'),

  location: z.string()
    .trim()
    .min(2, 'Location must be at least 2 characters')
    .max(100, 'Location must be less than 100 characters'),

  years_experience: z.number()
    .int('Experience must be a whole number')
    .min(1, 'Must have at least 1 year of experience')
    .max(50, 'Please enter a valid number of years'),

  specialty_niche: z.string()
    .min(1, 'Please select your specialty'),

  current_placements_year: z.string()
    .min(1, 'Please select your placement volume'),

  why_join: z.string()
    .trim()
    .min(50, 'Please provide at least 50 characters explaining why you want to join')
    .max(1500, 'Explanation must be less than 1500 characters'),

  how_heard: z.string()
    .optional()
    .or(z.literal('')),

  linkedin_url: z.string()
    .url('Invalid URL format')
    .optional()
    .or(z.literal('')),

  website_url: z.string()
    .url('Invalid URL format')
    .optional()
    .or(z.literal('')),

  honeypot: z.string()
    .max(0)
    .optional()
    .or(z.literal('')),

  tcpa_consent: z.boolean()
    .refine(val => val === true, {
      message: 'You must consent to be contacted'
    })
});

export type AllianceApplicationData = z.infer<typeof allianceApplicationSchema>;
