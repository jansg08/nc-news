import Popular from "../icons/popular.svg?react";
import {
  pageHeader,
  headingItems,
  hRule,
} from "../styles/PageHeader.module.css";
export const PageHeader = ({ iconSrc, heading, buttonIconSrc }) => {
  return (
    <header className={pageHeader}>
      <div className={headingItems}>
        <Popular />
        <h2>{heading}</h2>
        {buttonIconSrc && (
          <button>
            <img src={buttonIconSrc} />
          </button>
        )}
      </div>
      <hr className={hRule} />
    </header>
  );
};
