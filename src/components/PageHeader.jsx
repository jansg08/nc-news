import Popular from "../icons/popular.svg?react";
import { pageHeader, headingItems } from "../styles/PageHeader.module.css";
export const PageHeader = ({ headingIcon, heading, buttonIconSrc }) => {
  return (
    <header className={pageHeader}>
      <div className={headingItems}>
        {headingIcon}
        <h2>{heading}</h2>
        {buttonIconSrc && (
          <button>
            <img src={buttonIconSrc} />
          </button>
        )}
      </div>
      <hr className="h-rule" />
    </header>
  );
};
