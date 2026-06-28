import type { AppTranslations } from "../../../shared/i18n/translations";

type LibraryToolbarProps = {
  copy: AppTranslations["library"];
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
};

export function LibraryToolbar({
  copy,
  searchTerm,
  onSearchTermChange,
}: LibraryToolbarProps) {
  return (
    <div className="library-toolbar">
      <input
        className="search-field"
        value={searchTerm}
        onChange={(event) => onSearchTermChange(event.currentTarget.value)}
        placeholder={copy.searchPlaceholder}
        type="search"
      />
    </div>
  );
}
