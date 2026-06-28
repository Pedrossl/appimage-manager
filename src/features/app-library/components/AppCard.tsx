import type { AppImageEntry } from "../../../shared/types/appImage";
import type { AppTranslations } from "../../../shared/i18n/translations";

type AppCardProps = {
  app: AppImageEntry;
  copy: AppTranslations["card"];
};

export function AppCard({ app, copy }: AppCardProps) {
  const initials = app.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="app-card">
      <div className="app-card__top">
        <div className="app-card__icon" aria-hidden="true">
          {initials}
        </div>
        <div>
          <h2 className="app-card__title">{app.name}</h2>
          <p className="app-card__meta">{app.version}</p>
        </div>
      </div>

      <p className="app-card__path">{app.path}</p>

      <div className="app-card__footer">
        <span
          className={app.executable ? "status-pill" : "status-pill status-pill--warning"}
        >
          {app.executable ? copy.ready : copy.needsPermission}
        </span>
        <button className="button button--ghost" type="button">
          {copy.open}
        </button>
      </div>
    </article>
  );
}
