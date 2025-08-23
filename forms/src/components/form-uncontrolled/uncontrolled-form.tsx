import { type Form } from '@/types/types';
import FormString from './form-string';
import FormRadio from './form-radio';
import FormCheckbox from './form-checkbox';
import FormFile from './form-file';
import FormNumber from './form-number';
import FormSelect from './form-select';
import { useAppDispatch } from '@/redux/hooks';
import { useState } from 'react';
import { handleSubmit } from './submit-handler';

const UncontrolledForm = () => {
  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});

  const commonProps = {
    form: 'uncontrolledForm',
    errors: errors,
  };

  return (
    <div className="form">
      <h3>Uncontrolled</h3>
      <form
        id="uncontrolledForm"
        onSubmit={(e) => handleSubmit(e, dispatch, setErrors)}
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
        <FormFile {...commonProps} field="Picture" fieldId={'picture'} />
        <FormCheckbox {...commonProps} field="Accept" fieldId={'acceptTerms'} />
      </form>
      <button type="submit" form="uncontrolledForm">
        Update user
      </button>
    </div>
  );
};

export default UncontrolledForm;
