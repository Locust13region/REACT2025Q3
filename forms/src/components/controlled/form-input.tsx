import type {
  FieldErrors,
  FieldNamesMarkedBoolean,
  UseFormRegister,
} from 'react-hook-form';
import type { Form } from '../../types/types';

type FormInputProps = {
  form: string;
  field: string;
  fieldId: keyof Form;
  register: UseFormRegister<Form>;
  touchedFields: Partial<FieldNamesMarkedBoolean<Form>>;
  errors: FieldErrors<Form>;
};

const FormInput = ({
  form,
  field,
  fieldId,
  register,
  touchedFields,
  errors,
}: FormInputProps) => {
  return (
    <div className="field">
      <label htmlFor={fieldId} className="field__label">
        {field}
      </label>
      <div className="field__info">
        <input
          form={form}
          id={fieldId}
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
