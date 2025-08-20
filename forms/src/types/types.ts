import z from 'zod';

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, { error: 'Name is required' })
      .refine((value) => /^[A-Z А-Я]/.test(value), {
        error: 'Name should start with an uppercase letter',
      }),
    age: z.coerce
      .number({ error: 'Age must be specified as a number' })
      .refine((value) => value >= 0, {
        message: 'Age cannot be negative or null',
      }),
    email: z.email({ error: 'Enter valid email' }),
    password: z
      .string()
      .min(8, { error: 'Must be at least 8 characters' })
      .refine((value) => /[a-z]/.test(value), {
        error: 'Add one lowercase',
      })
      .refine((value) => /[A-Z]/.test(value), {
        error: 'Add one uppercase',
      })
      .refine((value) => /\d/.test(value), {
        error: 'Add one number',
      })
      .refine((value) => /[!@#$%^&*+-]/.test(value), {
        error: 'Add one special character ',
      }),
    confirmPassword: z.string(),
    gender: z
      .enum(['Male', 'Female'])
      .nullable()
      .refine((value) => value !== null, {
        error: 'Please select a gender',
      }),
    acceptTerms: z
      .boolean()
      .refine((value) => value === true, { error: 'You must accept T&C' }),
    picture: z
      .file()
      .min(1)
      .max(2000000)
      .mime(['image/png', 'image/jpeg'])
      .nullable(),
    country: z.string().min(1, 'Country is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type Form = z.infer<typeof formSchema>;
export type FormState = { controlled: Form; uncontrolled: Form };
