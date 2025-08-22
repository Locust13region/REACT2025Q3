import type {
  FieldErrors,
  FieldNamesMarkedBoolean,
  UseFormRegister,
} from 'react-hook-form';
import z from 'zod';

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, { error: 'Name is required' })
      .refine((value) => /^[A-Z А-Я]/.test(value), {
        error: 'Name should start with an uppercase letter',
      }),
    age: z
      .number({ error: 'Age must be specified as a number' })
      .min(1, { error: 'Age must be specified' })
      .nullable()
      .refine((value) => !(value === null), {
        error: 'Age cannot be negative or null',
      })
      .refine((value) => value !== null && value > 0, {
        error: 'Age cannot be negative or null',
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
    gender: z.enum(['Male', 'Female'], { error: 'Please select gender' }),
    acceptTerms: z
      .boolean()
      .refine((value) => value === true, { error: 'You must accept T&C' }),
    picture: z
      .file()
      .min(1, { error: 'File is empty' })
      .max(2000000, { error: 'File is too large.' })
      .mime(['image/png', 'image/jpeg'], { error: 'Invalid file type' })
      .nullable()
      .refine((value) => value !== null, { error: 'Please select file' }),
    country: z.string().min(1, 'Country is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type Form = z.infer<typeof formSchema>;

export type DataState = Omit<Form, 'picture'> & {
  pictureName: string;
  picture: string;
};

export type FormsState = { controlled: DataState; uncontrolled: DataState };

export type UncontrolledFieldProps = {
  form: string;
  field: string;
  fieldId: keyof Form;
  register: UseFormRegister<Form>;
  touchedFields: Partial<FieldNamesMarkedBoolean<Form>>;
  errors: FieldErrors<Form>;
};

export type UncontrolledFieldErrorProps = Pick<
  UncontrolledFieldProps,
  'fieldId' | 'touchedFields' | 'errors'
>;
