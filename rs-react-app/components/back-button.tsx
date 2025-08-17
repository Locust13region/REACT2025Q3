'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();
  const t = useTranslations('BackButton');
  return <button onClick={() => router.back()}>{t('back')}</button>;
};

export default BackButton;
