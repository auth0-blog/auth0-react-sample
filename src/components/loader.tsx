import React from "react";
const loadingImg =
  "https://cdn.auth0.com/blog/auth0-react-sample/assets/loading.svg";

const Loader: React.FC = () => (
  <div className="loader">
    <img className="loader__image" src={loadingImg} alt="Loading..." />
  </div>
);

export default Loader;
