import { FaChevronRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export const NavBarLink = ({ children, to }) => (
  <NavLink
    className={({ isActive }) =>
      ["flex", "gap-2", isActive && to ? "text-accent" : ""].join(" ")
    }
    to={to}
  >
    <FaChevronRight />
    {children}
  </NavLink>
);
