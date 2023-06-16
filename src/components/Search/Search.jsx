import { useDispatch } from "react-redux";
import "./index.css";
import { setSearch } from "../../storage/slices/productsSlice";

export const Search = () => {
  const dispatch = useDispatch();

  return (
    <input
      placeholder="Поиск"
      onChange={(e) => dispatch(setSearch(e.target.value))}
      className="search__input"
    />
  );
};
