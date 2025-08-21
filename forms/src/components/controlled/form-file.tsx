import type { ControlledFieldProps } from '../../types/types';

const FormFile = ({
  form,
  field,
  fieldId,
  register,
  touchedFields,
  errors,
}: ControlledFieldProps) => {
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
            placeholder="Select file"
            {...register(fieldId)}
          />
          <label htmlFor="picture"></label>
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
