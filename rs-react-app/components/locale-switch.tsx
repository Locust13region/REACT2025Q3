'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const LocaleSwitch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParam = useSearchParams();
  const search = searchParam?.toString() ?? '';

  const handleToggle = () => {
    const currentLocale = pathname.startsWith('/en') ? 'en' : 'ru';
    const targetLocale = currentLocale === 'en' ? 'ru' : 'en';

    const newPath =
      pathname.replace(/^\/(en|ru)/, `/${targetLocale}`) +
      (search ? `?${search}` : '');

    router.push(newPath);
  };

  return (
    <div className="locale">
      <label>EN</label>
      <div className="switch">
        <label htmlFor="localeSwitch" className="switch__inner">
          <input
            type="checkbox"
            id="localeSwitch"
            hidden
            checked={pathname.startsWith('/ru')}
            onChange={handleToggle}
          />
        </label>
      </div>
      <label>RU</label>
    </div>
  );
};

export default LocaleSwitch;
