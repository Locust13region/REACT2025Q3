import { useForm } from 'react-hook-form';
import { formSchema, type Form } from '@/types/types';
import FormString from './form-string';
import { zodResolver } from '@hookform/resolvers/zod';
import FormRadio from './form-radio';
import FormCheckbox from './form-checkbox';
import FormFile from './form-file';
import FormNumber from './form-number';
import FormSelect from './form-select';
import { useAppDispatch } from '@/redux/hooks';
import { setUncontrolled } from '@/redux/form-data-slice';

const UncontrolledForm = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, touchedFields },
  } = useForm<Form>({
    resolver: zodResolver(formSchema),
    mode: 'all',
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: Form) => {
    dispatch(setUncontrolled(data));
  };

  const commonProps = {
    form: 'uncontrolledForm',
    register: register,
    touchedFields: touchedFields,
    errors: errors,
  };

  return (
    <div className="form">
      <h3>Uncontrolled</h3>
      <form
        autoComplete="off"
        id="uncontrolledForm"
        onSubmit={handleSubmit(onSubmit)}
        className="form__inner"
      >
        <FormString {...commonProps} field="Name" fieldId={'name'} />
        <FormNumber {...commonProps} field="Age" fieldId={'age'} />
        <FormRadio {...commonProps} field="Select gender" fieldId={'gender'} />
        <FormSelect {...commonProps} field="Country" fieldId={'country'} />
        <FormString {...commonProps} field="Email" fieldId={'email'} />
        <FormString {...commonProps} field="Password" fieldId={'password'} />
        <FormString
          {...commonProps}
          field="Confirm password"
          fieldId={'confirmPassword'}
        />
        <FormFile
          {...commonProps}
          field="Picture"
          fieldId={'picture'}
          watch={watch}
          control={control}
        />
        <FormCheckbox {...commonProps} field="Accept" fieldId={'acceptTerms'} />
      </form>
      <button type="submit" form="uncontrolledForm">
        Update user
      </button>
    </div>
  );
};

export default UncontrolledForm;
