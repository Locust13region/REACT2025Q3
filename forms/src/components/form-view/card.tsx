import type { DataState } from '@/types/types';
import fromBase64 from '@/utils/base64-to-picture';
import { camelCaseTransform } from '@/utils/camel-case-transform';

const Card = ({
  type,
  data,
  highlighter,
}: {
  type: string;
  data: DataState;
  highlighter: boolean;
}) => {
  const fieldsNames = Object.keys(data) as (keyof DataState)[];

  return (
    <article className={`tile ${highlighter ? 'tile-highlight' : ''}`}>
      <h3>{type}</h3>
      <ul className="tile__inner">
        {data &&
          fieldsNames.map((fieldName) => (
            <li key={fieldName}>
              <div className="field-name">{camelCaseTransform(fieldName)}</div>
              <div className="field-value">
                {fieldName === 'picture' && data[fieldName] ? (
                  <div className="field-value__picture">
                    <img src={fromBase64(data[fieldName])} alt={fieldName} />
                  </div>
                ) : (
                  data[fieldName]?.toString()
                )}
              </div>
            </li>
          ))}
      </ul>
    </article>
  );
};

export default Card;
