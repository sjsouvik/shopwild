import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader" data-testid="productLoader"></div>
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default Loader;
