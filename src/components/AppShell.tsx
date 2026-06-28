import type { ReactNode } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { AppTranslations } from "../shared/i18n/translations";
import type { LanguageCode, LanguageOption } from "../shared/types/language";
import type { ThemeMode } from "../shared/types/theme";

type AppShellProps = {
  totalApps: number;
  readyApps: number;
  themeMode: ThemeMode;
  language: LanguageCode;
  languages: LanguageOption[];
  copy: AppTranslations["sidebar"];
  onThemeToggle: () => void;
  onLanguageChange: (language: LanguageCode) => void;
  children: ReactNode;
};

export function AppShell({
  totalApps,
  readyApps,
  themeMode,
  language,
  languages,
  copy,
  onThemeToggle,
  onLanguageChange,
  children,
}: AppShellProps) {
  return (
    <div className="app-shell" data-theme={themeMode}>
      <aside className="sidebar">
        <div className="brand">
          <h1 className="brand__name">AppImage Manager</h1>
          <span className="brand__label">{copy.brandLabel}</span>
        </div>

        <nav className="sidebar-nav" aria-label={copy.navigationLabel}>
          <button className="sidebar-nav__item sidebar-nav__item--active" type="button">
            {copy.library}
            <span>{totalApps}</span>
          </button>
          <button className="sidebar-nav__item" type="button">
            {copy.favorites}
            <span>0</span>
          </button>
          <button className="sidebar-nav__item" type="button">
            {copy.settings}
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-summary">
            <div className="sidebar-summary__item">
              <span className="sidebar-summary__value">{readyApps}</span>
              <span className="sidebar-summary__label">{copy.readyToLaunch}</span>
            </div>
            <div className="sidebar-summary__item">
              <span className="sidebar-summary__value">{totalApps}</span>
              <span className="sidebar-summary__label">{copy.registeredAppImages}</span>
            </div>
          </div>

          <LanguageSwitcher
            label={copy.language}
            language={language}
            languages={languages}
            onLanguageChange={onLanguageChange}
          />

          <button className="theme-toggle" type="button" onClick={onThemeToggle}>
            {themeMode === "dark" ? copy.normalMode : copy.darkMode}
          </button>
        </div>
      </aside>

      <main className="main-panel">{children}</main>
    </div>
  );
}
