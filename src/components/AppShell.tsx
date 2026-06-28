import type { ReactNode } from "react";

type AppShellProps = {
  totalApps: number;
  readyApps: number;
  children: ReactNode;
};

export function AppShell({ totalApps, readyApps, children }: AppShellProps) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <h1 className="brand__name">AppImage Manager</h1>
          <span className="brand__label">Desktop launcher</span>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          <button className="sidebar-nav__item sidebar-nav__item--active" type="button">
            Library
            <span>{totalApps}</span>
          </button>
          <button className="sidebar-nav__item" type="button">
            Favorites
            <span>0</span>
          </button>
          <button className="sidebar-nav__item" type="button">
            Settings
          </button>
        </nav>

        <div className="sidebar-summary">
          <div>
            <span className="sidebar-summary__value">{readyApps}</span>
            <span className="sidebar-summary__label">Ready to launch</span>
          </div>
          <div>
            <span className="sidebar-summary__value">{totalApps}</span>
            <span className="sidebar-summary__label">Registered AppImages</span>
          </div>
        </div>
      </aside>

      <main className="main-panel">{children}</main>
    </div>
  );
}
