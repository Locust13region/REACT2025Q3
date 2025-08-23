import type { ControlledFieldErrorProps } from '@/types/types';

const FieldError = ({
  fieldId,
  // touchedFields,
  errors,
}: ControlledFieldErrorProps) => {
  return (
    <p className={`field__error`}>{errors[fieldId]?.message || '\u00A0'}</p>
  );
};

export default FieldError;
