import { Controller, type Control, type UseFormWatch } from 'react-hook-form';
import type { ControlledFieldProps, Form } from '@/types/types';
import FieldError from './field-error';

const FormFile = ({
  form,
  field,
  fieldId,
  touchedFields,
  errors,
  watch,
  control,
}: ControlledFieldProps & {
  watch: UseFormWatch<Form>;
  control: Control<Form>;
}) => {
  const file = watch(fieldId);

  return (
    <div className="field">
      <label htmlFor="picture" className="field__label">
        {field}
      </label>
      <div className="field__info">
        <div className="field__file">
          <Controller
            name={fieldId}
            control={control}
            render={({ field }) => (
              <input
                form={form}
                type="file"
                id="picture"
                ref={field.ref}
                onBlur={field.onBlur}
                accept="image/png, image/jpeg"
                onChange={(e) => field.onChange(e.target.files?.[0] ?? null)}
              />
            )}
          />
          <label tabIndex={0} className="file-name" htmlFor="picture">
            {(file instanceof File && file?.name) || '\u00A0'}
          </label>
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

export default FormFile;
