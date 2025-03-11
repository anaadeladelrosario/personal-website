import ClipLoader from "react-spinners/ClipLoader";

export const Spinner = ({ loading }: { loading: boolean }) => {
  return <ClipLoader color="#000000" loading={loading} size={10} />;
};
