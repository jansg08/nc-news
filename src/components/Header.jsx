import { useContext } from "react";
import { useAuth } from "../hooks/useAuth";
import MenuIcon from "../icons/menu.svg?react";
import {
  navbar,
  navbarLastItem,
  loginButton,
} from "../styles/Header.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Header = () => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleLoginButton = () => {
    navigate(`/login?redirect=${pathname.replace("/", "%2F")}`);
  };
  const handleAvatarClick = () => {
    logout(false);
  };
  return (
    <header>
      <nav className={navbar}>
        <MenuIcon className="icon icon-big" />
        <Link className="link" to="/">
          <h1>NC News</h1>
        </Link>
        {user?.username ? (
          <img
            onClick={handleAvatarClick}
            className={`${navbarLastItem} avatar avatar-big`}
            src={user.avatar_url}
          />
        ) : (
          <button onClick={handleLoginButton} className={loginButton}>
            Log in
          </button>
        )}
      </nav>
    </header>
  );
};
