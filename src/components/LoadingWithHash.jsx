import { HashLoader } from "react-spinners";
import { Loading } from "./Loading";

export const LoadingWithHash = ({ currentlyLoading, colour }) => {
  return (
    <Loading currentlyLoading={currentlyLoading}>
      <HashLoader color={colour} />
    </Loading>
  );
};
