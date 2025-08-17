import BackButton from '@components/back-button';
import { useTranslations } from 'next-intl';

const About = () => {
  const t = useTranslations('About');
  return (
    <div className="about">
      <h2>{t('title')}</h2>
      <h3>RS School REACT 2025 Q3</h3>
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noopener noreferrer"
        className="logo"
      >
        <img src="/react.svg" alt="logo" />
      </a>
      <h3>{t('creator')}</h3>
      <a
        href="https://github.com/locust13region"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 008.18 10.96c.6.11.82-.26.82-.58v-2.03c-3.33.73-4.03-1.6-4.03-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.1-.75.08-.74.08-.74 1.22.09 1.86 1.26 1.86 1.26 1.08 1.85 2.83 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.9 0-1.3.47-2.36 1.24-3.2-.13-.3-.54-1.5.12-3.14 0 0 1-.32 3.3 1.23A11.3 11.3 0 0112 6.8c1.01.01 2.03.14 2.98.4 2.29-1.55 3.29-1.23 3.29-1.23.66 1.64.25 2.84.12 3.14.77.84 1.24 1.9 1.24 3.2 0 4.58-2.82 5.59-5.5 5.88.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58A11.5 11.5 0 0023.5 12c0-6.27-5.23-11.5-11.5-11.5z" />
        </svg>
        {t('git')}
      </a>
      <BackButton />
    </div>
  );
};
export default About;
