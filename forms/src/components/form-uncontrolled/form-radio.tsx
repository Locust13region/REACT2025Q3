import type { UncontrolledFieldProps } from '@/types/types';
import FieldError from './field-error';

const FormRadio = ({
  form,
  field,
  fieldId,
  register,
  touchedFields,
  errors,
}: UncontrolledFieldProps) => {
  return (
    <div className="field">
      <label htmlFor="male" className="field__label">
        {field}
      </label>
      <div className="field__info">
        <div className="field__radio">
          <input
            defaultChecked
            form={form}
            type="radio"
            value="Male"
            id="male"
            {...register(fieldId)}
          />
          <label htmlFor="male">Male</label>
          <input
            form={form}
            type="radio"
            value="Female"
            id="female"
            {...register(fieldId)}
          />
          <label htmlFor="female">Female</label>
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

export default FormRadio;
