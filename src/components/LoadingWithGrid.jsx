import { GridLoader } from "react-spinners";
import { Loading } from "./Loading";

export const LoadingWithGrid = ({ currentlyLoading, colour }) => {
  return (
    <Loading currentlyLoading={currentlyLoading}>
      <GridLoader color={colour} />
    </Loading>
  );
};
