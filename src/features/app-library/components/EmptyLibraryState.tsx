import type { AppTranslations } from "../../../shared/i18n/translations";

type EmptyLibraryStateProps = {
  copy: AppTranslations["library"];
  isFiltered: boolean;
  onImportAppImage: () => void;
};

export function EmptyLibraryState({
  copy,
  isFiltered,
  onImportAppImage,
}: EmptyLibraryStateProps) {
  return (
    <section className="empty-state">
      <div className="empty-state__icon" aria-hidden="true">
        AI
      </div>
      <h2>{copy.emptyTitle}</h2>
      <p>{copy.emptyDescription}</p>
      {!isFiltered ? (
        <button className="button button--primary" type="button" onClick={onImportAppImage}>
          {copy.emptyAction}
        </button>
      ) : null}
    </section>
  );
}
