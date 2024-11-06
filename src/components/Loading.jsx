import { container } from "../styles/Loading.module.css";

export const Loading = ({ currentlyLoading, children }) => {
  return (
    <div className={container}>
      {children}
      <p>Loading {currentlyLoading}... Please wait.</p>
    </div>
  );
};
