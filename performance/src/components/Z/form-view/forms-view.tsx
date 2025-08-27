import Card from './card';
import {
  selectControlled,
  selectHighlightControlled,
  selectHighlightUncontrolled,
  selectUncontrolled,
} from '@/redux/co2-slice';
import { useAppSelector } from '@/redux/hooks';

const FormsView = () => {
  const controlled = useAppSelector(selectControlled);
  const uncontrolled = useAppSelector(selectUncontrolled);
  const highlighterControlled = useAppSelector(selectHighlightControlled);
  const highlighterUncontrolled = useAppSelector(selectHighlightUncontrolled);

  return (
    <section className="tiles">
      <Card
        type="Controlled"
        data={controlled}
        highlighter={highlighterControlled}
      />
      <Card
        type="Uncontrolled"
        data={uncontrolled}
        highlighter={highlighterUncontrolled}
      />
    </section>
  );
};

export default FormsView;
