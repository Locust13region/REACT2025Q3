import type { UncontrolledFieldProps } from '@/types/types';
import FieldError from './field-error';

const FormCheckbox = ({
  form,
  field,
  fieldId,
  register,
  touchedFields,
  errors,
}: UncontrolledFieldProps) => {
  return (
    <div className="field">
      <label htmlFor="t&c" className="field__label">
        {field}
      </label>
      <div className="field__info">
        <div className="field__checkbox">
          <input
            form={form}
            type="checkbox"
            id="t&c"
            {...register(fieldId, { required: true })}
          />
          <label htmlFor="t&c">Terms and Conditions</label>
        </div>
        <FieldError
          fieldId={fieldId}
          touchedFields={touchedFields}
          errors={errors}
        />
      </div>
    </div>
  );
};

export default FormCheckbox;
