import React, { useEffect } from "react";
import { connect } from "dva";
import "./index.less";

const IndexPage = () => {
  return (
    <div className="normal">
      <h1 className="title">Yay! Welcome to gqcomponents!</h1>
    </div>
  );
};

IndexPage.propTypes = {};

export default connect()(IndexPage);
