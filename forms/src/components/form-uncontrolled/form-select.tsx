import type { UncontrolledFieldProps } from '@/types/types';
import FieldError from './field-error';
import { selectCountries } from '@/redux/countries-slice';
import { useAppSelector } from '@/redux/hooks';

const FormString = ({
  form,
  field,
  fieldId,
  errors,
}: UncontrolledFieldProps) => {
  const countries = useAppSelector(selectCountries);
  return (
    <div className="field">
      <label htmlFor={fieldId} className="field__label">
        {field}
      </label>
      <div className="field__info">
        <div className="field__select">
          <select form={form} name={fieldId} id={fieldId}>
            <option value="">Please select a country</option>
            {countries &&
              countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
          </select>
        </div>
        <FieldError fieldId={fieldId} errors={errors} />
      </div>
    </div>
  );
};

export default FormString;
