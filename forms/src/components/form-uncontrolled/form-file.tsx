import type { UncontrolledFieldProps } from '@/types/types';
import FieldError from './field-error';
import { useRef } from 'react';

const FormFile = ({ form, field, fieldId, errors }: UncontrolledFieldProps) => {
  const labelRef = useRef<HTMLLabelElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileName = e.target.files?.[0]?.name;
    if (labelRef.current) {
      labelRef.current.textContent = fileName || '\u00A0';
    }
  };

  return (
    <div className="field">
      <label htmlFor="picture" className="field__label">
        {field}
      </label>
      <div className="field__info">
        <div className="field__file">
          <input
            form={form}
            name={fieldId}
            type="file"
            id="picture"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />
          <label htmlFor="picture" ref={labelRef} className="file-name">
            {'\u00A0'}
          </label>
        </div>
        <FieldError fieldId={fieldId} errors={errors} />
      </div>
    </div>
  );
};

export default FormFile;
