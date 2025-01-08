import { useContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import MenuIcon from "../icons/menu.svg?react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { NavBarLink } from "./NavBarLink";

function getWindowWidth() {
  const { innerWidth: width } = window;
  return width;
}

export const Header = () => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const [showNav, setShowNav] = useState(false);
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());
  const navigate = useNavigate();
  const breakpoint = 640;

  useEffect(() => {
    setShowNav(false);
  }, [pathname]);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(getWindowWidth());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const handleLoginButton = () => {
    navigate(`/login?redirect=${pathname.replace("/", "%2F")}`);
  };

  const handleAvatarClick = () => {
    logout(false);
  };

  return (
    <header className="flex flex-col gap-2 box-border rounded-b-lg w-full py-3 px-6 bg-secondary-bg fixed z-10 shadow-2xl xl:px-[calc((100%-1232px)/2)] items-center">
      <div className="flex items-center gap-2 w-full">
        {windowWidth < breakpoint && (
          <button onClick={() => setShowNav(!showNav)}>
            <MenuIcon className="icon icon-big" />
          </button>
        )}
        <Link className="link" to="/">
          <h1>NC News</h1>
        </Link>
        {windowWidth >= breakpoint && (
          <nav className="flex gap-3 ml-6 pt-3">
            <NavLink
              className={({ isActive }) =>
                ["flex", "gap-2", isActive ? "text-accent" : ""].join(" ")
              }
              to="/"
            >
              All Articles
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                ["flex", "gap-2", isActive ? "text-accent" : ""].join(" ")
              }
              to="/topics"
            >
              Topics
            </NavLink>
            {user?.username && <NavLink>My Articles (coming soon)</NavLink>}
          </nav>
        )}
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
        <nav className="flex flex-col gap-4 py-2 w-full items-start justify-start">
          <NavBarLink to="/">All Articles</NavBarLink>
          <NavBarLink to="/topics">Topics</NavBarLink>
          {user?.username && <NavBarLink>My Articles (coming soon)</NavBarLink>}
        </nav>
      )}
    </header>
  );
};
