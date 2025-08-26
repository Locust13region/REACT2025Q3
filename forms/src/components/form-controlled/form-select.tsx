import type { ControlledFieldProps } from '@/types/types';
import FieldError from './field-error';
import { useSelector } from 'react-redux';
import { selectCountries } from '@/redux/countries-slice';

const FormString = ({
  form,
  field,
  fieldId,
  register,
  touchedFields,
  errors,
}: ControlledFieldProps) => {
  const countries = useSelector(selectCountries);
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
        <FieldError
          fieldId={fieldId}
          touchedFields={touchedFields}
          errors={errors}
        />
      </div>
    </div>
  );
};

export default FormString;
