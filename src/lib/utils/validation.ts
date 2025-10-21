import * as z from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  industry: z.enum([
    'Oil & Gas',
    'Banking/Fintech',
    'Real Estate',
    'Agriculture',
    'Telecoms',
    'Entertainment'
  ], { error: 'Please select an industry' }),
  projectType: z.enum([
    'Website',
    'Dashboard',
    'Mobile App',
    'Other'
  ], { error: 'Please select a project type' }),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  // Honeypot field for spam protection
  website: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;


export const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

export const signupSchema = z
  .object({
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const verifyOtpSchema = z.object({
  otp: z.string().length(6, { message: 'OTP must be 6 digits' }),
});

export const resetPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });