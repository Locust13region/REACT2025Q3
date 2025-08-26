import { formSchema, type Form } from '@/types/types';
import type { Dispatch } from 'react';

export const validateAllFields = (
  data: unknown,
  setErrors: Dispatch<Partial<Record<keyof Form, string>>>
): data is Form => {
  const parsed = formSchema.safeParse(data);

  if (parsed.success) {
    setErrors({});
    return true;
  } else {
    const newErrors: Partial<Record<keyof Form, string>> = {};
    parsed.error.issues.forEach((issue) => {
      const key = issue.path[0] as keyof Form;
      newErrors[key] = issue.message;
    });
    setErrors(newErrors);
    return false;
  }
};
