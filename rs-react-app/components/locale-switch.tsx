const LocaleSwitch = () => {
  return (
    <div className="locale">
      <label>EN</label>
      <div className="switch">
        <label htmlFor="localeSwitch" className="switch__inner">
          <input type="checkbox" id="localeSwitch" hidden />
        </label>
      </div>
      <label>RU</label>
    </div>
  );
};

export default LocaleSwitch;
