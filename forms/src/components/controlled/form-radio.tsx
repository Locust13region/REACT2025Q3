import type {
  FieldErrors,
  FieldNamesMarkedBoolean,
  UseFormRegister,
} from 'react-hook-form';
import type { Form } from '../../types/types';

type FormRadioProps = {
  form: string;
  field: string;
  fieldId: keyof Form;
  register: UseFormRegister<Form>;
  touchedFields: Partial<FieldNamesMarkedBoolean<Form>>;
  errors: FieldErrors<Form>;
};

const FormRadio = ({
  form,
  field,
  fieldId,
  register,
  touchedFields,
  errors,
}: FormRadioProps) => {
  return (
    <div className="field">
      <label className="field__label">{field}</label>
      <div className="field__info">
        <div className="field__radio">
          <input
            form={form}
            type="radio"
            value="Male"
            {...register('gender')}
            // className="field__radio"
          />
          <label htmlFor="male">Male</label>
          <input
            form={form}
            type="radio"
            value="Female"
            {...register('gender')}
            // className="field__radio"
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
