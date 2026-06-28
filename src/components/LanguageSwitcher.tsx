import type { LanguageCode, LanguageOption } from "../shared/types/language";

type LanguageSwitcherProps = {
  label: string;
  language: LanguageCode;
  languages: LanguageOption[];
  onLanguageChange: (language: LanguageCode) => void;
};

export function LanguageSwitcher({
  label,
  language,
  languages,
  onLanguageChange,
}: LanguageSwitcherProps) {
  return (
    <label className="language-control">
      <span className="language-control__label">{label}</span>
      <select
        className="language-control__select"
        value={language}
        onChange={(event) => onLanguageChange(event.currentTarget.value as LanguageCode)}
      >
        {languages.map((languageOption) => (
          <option key={languageOption.code} value={languageOption.code}>
            {languageOption.label}
          </option>
        ))}
      </select>
    </label>
  );
}
