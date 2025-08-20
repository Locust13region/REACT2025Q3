import z from 'zod';

const firstUppercase = (value: string) =>
  /^[A-Z]/.test(value) || 'Name should start with an uppercase letter';

const passwordStrength = (value: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/.test(value) ||
  'Password must contain uppercase, lowercase, number and special character';

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Name is required' })
      .refine(firstUppercase),
    age: z
      .number()
      .refine((value) => value >= 0, { message: 'Age cannot be negative' }),
    email: z.email({ message: 'Invalid email' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .refine(passwordStrength),
    confirmPassword: z.string(),
    gender: z
      .enum(['Male', 'Female'])
      .nullable()
      .refine((value) => value !== null, {
        message: 'Please select a gender',
      }),
    acceptTerms: z
      .boolean()
      .refine((value) => value === true, 'You must accept T&C'),
    picture: z
      .file()
      .min(1)
      .max(2000000)
      .mime(['image/png', 'image/jpeg'])
      .nullable(),
    country: z.string().min(1, 'Country is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type Form = z.infer<typeof formSchema>;
export type FormState = { controlled: Form; uncontrolled: Form };
