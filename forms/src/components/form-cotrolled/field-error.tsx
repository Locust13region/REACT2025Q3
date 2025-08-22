import type { UncontrolledFieldErrorProps } from '@/types/types';

const FieldError = ({
  fieldId,
  // touchedFields,
  errors,
}: ControlledFieldErrorProps) => {
  return (
    <p
      className={`field__error`}
      // className={`field__error ${touchedFields[fieldId] && errors[fieldId] ? 'field__error-show' : ''}`}
    >
      {errors[fieldId]?.message || '\u00A0'}
    </p>
  );
};

export default FieldError;
