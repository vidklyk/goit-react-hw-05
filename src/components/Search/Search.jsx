import { FcSearch } from "react-icons/fc";
const Search = ({ onSubmit, onChange, query }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="search"
        autoComplete="off"
        autoFocus
        placeholder="Search film"
        value={query}
        onChange={onChange}
      />
      <button type="submit">
        <FcSearch size="24px" />
      </button>
    </form>
  );
};
export default Search;
