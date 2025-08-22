import type { ControlledFieldProps } from '@/types/types';
import FieldError from './field-error';

const FormString = ({
  form,
  formData,
  setUserFormData,
  field,
  fieldId,
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
          value={formData[fieldId]?.toString() ?? ''}
          className="field__input"
          onChange={(e) =>
            setUserFormData((l) => ({ ...l, [fieldId]: e.target.value }))
          }
        />
        <FieldError fieldId={fieldId} errors={errors} />
      </div>
    </div>
  );
};

export default FormString;
