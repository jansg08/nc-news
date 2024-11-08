import { paddedContainer } from "../styles/PaddedContainer.module.css";

export const PaddedContainer = ({ children }) => {
  return <div className={paddedContainer}>{children}</div>;
};
