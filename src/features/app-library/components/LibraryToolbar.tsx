type LibraryToolbarProps = {
  categories: string[];
  searchTerm: string;
  selectedCategory: string;
  onSearchTermChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
};

export function LibraryToolbar({
  categories,
  searchTerm,
  selectedCategory,
  onSearchTermChange,
  onCategoryChange,
}: LibraryToolbarProps) {
  return (
    <div className="library-toolbar">
      <input
        className="search-field"
        value={searchTerm}
        onChange={(event) => onSearchTermChange(event.currentTarget.value)}
        placeholder="Search AppImages"
        type="search"
      />

      <div className="category-tabs" role="tablist" aria-label="App categories">
        {categories.map((category) => (
          <button
            className={
              category === selectedCategory
                ? "category-tabs__item category-tabs__item--active"
                : "category-tabs__item"
            }
            key={category}
            onClick={() => onCategoryChange(category)}
            role="tab"
            type="button"
            aria-selected={category === selectedCategory}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
