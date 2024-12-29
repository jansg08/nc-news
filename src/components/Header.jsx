import { useContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import MenuIcon from "../icons/menu.svg?react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { NavBarLink } from "./NavBarLink";

export const Header = () => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setShowNav(false);
  }, [pathname]);
  const handleLoginButton = () => {
    navigate(`/login?redirect=${pathname.replace("/", "%2F")}`);
  };
  const handleAvatarClick = () => {
    logout(false);
  };
  return (
    <header className="flex flex-col gap-2 box-border rounded-b-lg w-screen py-3 px-6 bg-secondary-bg fixed z-10 shadow-2xl xl:px-[calc((100vw-1232px)/2)] items-center">
      <div className="flex items-center gap-2 w-full">
        <button onClick={() => setShowNav(!showNav)}>
          <MenuIcon className="icon icon-big" />
        </button>
        <Link className="link" to="/">
          <h1>NC News</h1>
        </Link>
        {user?.username ? (
          <img
            onClick={handleAvatarClick}
            className="ml-auto avatar avatar-big"
            src={user.avatar_url}
          />
        ) : (
          <button
            onClick={handleLoginButton}
            className="ml-auto underline button button-white"
          >
            Log in
          </button>
        )}
      </div>
      {showNav && (
        <nav className="flex flex-col gap-4 py-2">
          <NavBarLink to="/">All Articles</NavBarLink>
          <NavBarLink to="/topics">Topics</NavBarLink>
          {user?.username && <NavBarLink>My Articles (coming soon)</NavBarLink>}
        </nav>
      )}
    </header>
  );
};
