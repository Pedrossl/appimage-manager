import type { AppImageEntry } from "../../../shared/types/appImage";
import type { AppTranslations } from "../../../shared/i18n/translations";

type AppCardProps = {
  app: AppImageEntry;
  copy: AppTranslations["card"];
  onLaunch: (app: AppImageEntry) => void;
  onMakeExecutable: (app: AppImageEntry) => void;
  onOpenFolder: (app: AppImageEntry) => void;
  onRemove: (app: AppImageEntry) => void;
};

export function AppCard({
  app,
  copy,
  onLaunch,
  onMakeExecutable,
  onOpenFolder,
  onRemove,
}: AppCardProps) {
  const initials = app.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article
      className="app-card"
      onDoubleClick={() => onLaunch(app)}
    >
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
        <div
          className="app-card__actions"
          onDoubleClick={(event) => event.stopPropagation()}
        >
          {!app.executable ? (
            <button
              className="button button--ghost"
              type="button"
              onClick={() => onMakeExecutable(app)}
            >
              {copy.fixPermission}
            </button>
          ) : null}
          <button className="button button--ghost" type="button" onClick={() => onOpenFolder(app)}>
            {copy.openFolder}
          </button>
          <button className="button button--danger" type="button" onClick={() => onRemove(app)}>
            {copy.remove}
          </button>
          <button className="button button--primary" type="button" onClick={() => onLaunch(app)}>
            {copy.open}
          </button>
        </div>
      </div>
    </article>
  );
}
