import type { UncontrolledFieldProps } from '@/types/types';
import FieldError from './field-error';

const FormCheckbox = ({
  form,
  field,
  fieldId,
  errors,
}: UncontrolledFieldProps) => {
  return (
    <div className="field">
      <label htmlFor="t&c" className="field__label">
        {field}
      </label>
      <div className="field__info">
        <div className="field__checkbox">
          <input form={form} name={fieldId} type="checkbox" id="t&c" />
          <label htmlFor="t&c">Terms and Conditions</label>
        </div>
        <FieldError fieldId={fieldId} errors={errors} />
      </div>
    </div>
  );
};

export default FormCheckbox;
