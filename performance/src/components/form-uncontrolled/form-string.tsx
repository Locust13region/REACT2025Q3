import type { UncontrolledFieldProps } from '@/types/types';
import FieldError from './field-error';

const FormString = ({
  form,
  field,
  fieldId,
  errors,
}: UncontrolledFieldProps) => {
  return (
    <div className="field">
      <label htmlFor={fieldId} className="field__label">
        {field}
      </label>
      <div className="field__info">
        <input
          form={form}
          name={fieldId}
          id={fieldId}
          className="field__input"
        />
        <FieldError fieldId={fieldId} errors={errors} />
      </div>
    </div>
  );
};

export default FormString;
