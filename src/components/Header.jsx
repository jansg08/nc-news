import { useContext } from "react";
import { UserContext } from "../contexts/User";
import styles from "../styles/Header.module.css";

export const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <header>
      <nav className={styles.navbar}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className="icon icon-big"
        >
          <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          {/* <navlinks> */}
        </svg>
        <h1 className="styles.title">NC News</h1>
        <img
          className={`${styles.navbar_lastItem} avatar avatar-big`}
          src={user.avatar_url}
        />
      </nav>
    </header>
  );
};
