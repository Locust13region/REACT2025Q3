import type { ControlledFieldProps } from '../../types/types';

const FormInput = ({
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
          autoComplete="off"
          {...register(fieldId)}
          className="field__input"
        />
        <p
          className={`field__error ${touchedFields[fieldId] && errors[fieldId] ? 'field__error-show' : ''}`}
        >
          {errors[fieldId]?.message || '\u00A0'}
        </p>
      </div>
    </div>
  );
};

export default FormInput;
