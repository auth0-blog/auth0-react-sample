import React, { Fragment } from "react";

import { Hero, HomeContent } from "../components";

const Home: React.FC = () => (
  <Fragment>
    <Hero />
    <hr />
    <HomeContent />
  </Fragment>
);

export default Home;
