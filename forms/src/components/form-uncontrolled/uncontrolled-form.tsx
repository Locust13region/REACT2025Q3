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
import toBase64String from '@/utils/picture-to-base64';
import { submitUncontrolledThunk } from '@/redux/uncontrolled-thunk';

const UncontrolledForm = () => {
  const {
    reset,
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

  const onSubmit = async (data: Form) => {
    if (!data.picture) return;
    const pictureBase64 = await toBase64String(data.picture);
    const submitData = {
      ...data,
      picture: pictureBase64,
    };
    dispatch(submitUncontrolledThunk(submitData));
    reset();
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
