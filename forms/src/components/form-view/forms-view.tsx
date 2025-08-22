import { useAppSelector } from '@/redux/hooks';
import Card from './card';

const FormsView = () => {
  const uncontrolled = useAppSelector((state) => state.formsData.uncontrolled);
  const controlled = useAppSelector((state) => state.formsData.controlled);
  const highlighterControlled = useAppSelector(
    (state) => state.formsData.highlightControlled
  );
  const highlighterUncontrolled = useAppSelector(
    (state) => state.formsData.highlightUncontrolled
  );

  return (
    <section className="tiles">
      <Card
        type="Uncontrolled"
        data={uncontrolled}
        highlighter={highlighterUncontrolled}
      />
      <Card
        type="Controlled"
        data={controlled}
        highlighter={highlighterControlled}
      />
    </section>
  );
};

export default FormsView;
