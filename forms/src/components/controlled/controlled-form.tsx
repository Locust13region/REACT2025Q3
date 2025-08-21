import { useForm } from 'react-hook-form';
import { formSchema, type Form } from '../../types/types';
import FormInput from './form-input';
import { zodResolver } from '@hookform/resolvers/zod';
import FormRadio from './form-radio';
import FormCheckbox from './form-checkbkx';
import FormFile from './form-file';

const ControlledForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<Form>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const commonProps = {
    form: 'controlledForm',
    register: register,
    touchedFields: touchedFields,
    errors: errors,
  };

  const onSubmit = (data: Form) => console.log(data);
  return (
    <div className="form">
      <h3>Controlled</h3>
      <form
        autoComplete="off"
        id="controlledForm"
        onSubmit={handleSubmit(onSubmit)}
        className="form__inner"
      >
        <FormInput {...commonProps} field="Name" fieldId={'name'} />
        <FormInput {...commonProps} field="Age" fieldId={'age'} />
        <FormInput {...commonProps} field="Email" fieldId={'email'} />
        <FormInput {...commonProps} field="Password" fieldId={'password'} />
        <FormInput
          {...commonProps}
          field="Confirm password"
          fieldId={'confirmPassword'}
        />
        <FormRadio {...commonProps} field="Select gender" fieldId={'gender'} />
        <FormCheckbox {...commonProps} field="Accept" fieldId={'acceptTerms'} />
        <FormFile {...commonProps} field="Picture" fieldId={'picture'} />
        <FormInput {...commonProps} field="Country" fieldId={'country'} />
      </form>
      <button type="submit" form="controlledForm">
        Update user
      </button>
    </div>
  );
};

export default ControlledForm;
