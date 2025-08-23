import type { ControlledFieldProps } from '@/types/types';
import FieldError from './field-error';

const FormString = ({
  form,
  field,
  fieldId,
  register,
  touchedFields,
  errors,
}: ControlledFieldProps) => {
  return (
    <div className="field">
      <label htmlFor={fieldId} className="field__label">
        {field}
      </label>
      <div className="field__info">
        <input
          form={form}
          id={fieldId}
          {...register(fieldId)}
          className="field__input"
        />
        <FieldError
          fieldId={fieldId}
          touchedFields={touchedFields}
          errors={errors}
        />
      </div>
    </div>
  );
};

export default FormString;
