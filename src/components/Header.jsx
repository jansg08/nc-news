import { useContext } from "react";
import { UserContext } from "../contexts/User";
import MenuIcon from "../icons/menu.svg?react";
import styles from "../styles/Header.module.css";

export const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <header>
      <nav className={styles.navbar}>
        <MenuIcon className="icon icon-big" />
        <h1 className="styles.title">NC News</h1>
        <img
          className={`${styles.navbar_lastItem} avatar avatar-big`}
          src={user.avatar_url}
        />
      </nav>
    </header>
  );
};
