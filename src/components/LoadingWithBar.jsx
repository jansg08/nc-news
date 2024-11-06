import { BarLoader } from "react-spinners";
import { Loading } from "./Loading";

export const LoadingWithBar = ({ currentlyLoading, colour }) => {
  return (
    <Loading currentlyLoading={currentlyLoading}>
      <BarLoader color={colour} />
    </Loading>
  );
};
