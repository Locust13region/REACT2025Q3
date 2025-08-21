import type { UncontrolledFieldProps } from '../../types/types';

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
        <p
          className={`field__error ${touchedFields[fieldId] && errors[fieldId] ? 'field__error-show' : ''}`}
        >
          {errors[fieldId]?.message || '\u00A0'}
        </p>
      </div>
    </div>
  );
};

export default FormCheckbox;
