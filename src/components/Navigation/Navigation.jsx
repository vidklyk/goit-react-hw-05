import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const getActiveLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};
export default function Navigation() {
  return (
    <nav className={css.nav}>
      <NavLink to="/" className={getActiveLinkClass}>
        Home
      </NavLink>
      <NavLink to="/movies" className={getActiveLinkClass}>
        Movies
      </NavLink>
    </nav>
  );
}
