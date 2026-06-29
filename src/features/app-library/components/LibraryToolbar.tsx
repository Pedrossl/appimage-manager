import type { AppTranslations } from "../../../shared/i18n/translations";

type LibraryToolbarProps = {
  copy: AppTranslations["library"];
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  onSearchShortcut: (key: "Enter" | "Escape") => void;
};

export function LibraryToolbar({
  copy,
  searchTerm,
  onSearchTermChange,
  onSearchShortcut,
}: LibraryToolbarProps) {
  return (
    <div className="library-toolbar">
      <input
        className="search-field"
        value={searchTerm}
        onChange={(event) => onSearchTermChange(event.currentTarget.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === "Escape") {
            onSearchShortcut(event.key);
          }
        }}
        placeholder={copy.searchPlaceholder}
        type="search"
      />
    </div>
  );
}
