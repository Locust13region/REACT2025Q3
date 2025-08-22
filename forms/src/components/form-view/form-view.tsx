import { useAppSelector } from '@/redux/hooks';
import Card from './card';

const FormView = () => {
  const uncontrolled = useAppSelector((state) => state.formsData.uncontrolled);
  const controlled = useAppSelector((state) => state.formsData.controlled);
  return (
    <section className="tiles">
      <Card type="Uncontrolled" data={uncontrolled} />
      <Card type="Controlled" data={controlled} />
    </section>
  );
};

export default FormView;
