import "./index.css";

export const Search = ({ setSearch }) => {
  return (
    <input
      placeholder="Поиск"
      onChange={(e) => setSearch(e.target.value)}
      className="search__input"
    />
  );
};
