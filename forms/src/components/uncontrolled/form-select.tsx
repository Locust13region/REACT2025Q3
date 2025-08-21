import { useAppSelector } from '../../redux/hooks';
import type { UncontrolledFieldProps } from '../../types/types';

const FormString = ({
  form,
  field,
  fieldId,
  register,
  touchedFields,
  errors,
}: UncontrolledFieldProps) => {
  const countries = useAppSelector((state) => state.countries);
  return (
    <div className="field">
      <label htmlFor={fieldId} className="field__label">
        {field}
      </label>
      <div className="field__info">
        <div className="field__select">
          <select form={form} id={fieldId} {...register(fieldId)}>
            <option value="">Please select a country</option>
            {countries &&
              countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
          </select>
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

export default FormString;
