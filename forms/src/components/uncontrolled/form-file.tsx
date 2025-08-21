import type { UseFormWatch } from 'react-hook-form';
import type { Form, UncontrolledFieldProps } from '../../types/types';

const FormFile = ({
  form,
  field,
  fieldId,
  register,
  touchedFields,
  errors,
  // watch,
}: UncontrolledFieldProps & { watch: UseFormWatch<Form> }) => {
  return (
    <div className="field">
      <label htmlFor="picture" className="field__label">
        {field}
      </label>
      <div className="field__info">
        <div className="field__file">
          <input
            form={form}
            type="file"
            id="picture"
            accept="image/png, image/jpeg"
            {...register(fieldId, {
              setValueAs: (files: FileList | null) => files?.[0] ?? null,
            })}
          />
          <label htmlFor="picture">
            <span className="file-name"></span>
          </label>
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

export default FormFile;
