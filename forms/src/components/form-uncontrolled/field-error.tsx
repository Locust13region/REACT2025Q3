import type { UncontrolledFieldErrorProps } from '@/types/types';

const FieldError = ({ fieldId, errors }: UncontrolledFieldErrorProps) => {
  return <p className={`field__error`}>{errors?.[fieldId] || '\u00A0'}</p>;
};

export default FieldError;
