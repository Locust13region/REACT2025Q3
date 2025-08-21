import type { UncontrolledFieldProps } from '../../types/types';

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
        <p
          className={`field__error ${touchedFields[fieldId] && errors[fieldId] ? 'field__error-show' : ''}`}
        >
          {errors[fieldId]?.message || '\u00A0'}
        </p>
      </div>
    </div>
  );
};

export default FormRadio;
