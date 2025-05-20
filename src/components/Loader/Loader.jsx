import { RingLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderWidth: "4px",
  borderColor: "#4B0082",
};
const Loader = ({ loading }) => {
  return (
    <div className="sweet-loading">
      <RingLoader
        color="#fff"
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
export default Loader;
