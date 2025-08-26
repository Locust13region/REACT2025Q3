import type { UncontrolledFieldProps } from '@/types/types';
import FieldError from './field-error';

const FormRadio = ({
  form,
  field,
  fieldId,
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
            name={fieldId}
            type="radio"
            value="Male"
            id="male"
          />
          <label htmlFor="male">Male</label>
          <input
            form={form}
            name={fieldId}
            type="radio"
            value="Female"
            id="female"
          />
          <label htmlFor="female">Female</label>
        </div>
        <FieldError fieldId={fieldId} errors={errors} />
      </div>
    </div>
  );
};

export default FormRadio;
