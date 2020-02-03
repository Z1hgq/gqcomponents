import React, { useEffect } from "react";
import { connect } from "dva";
import "./index.less";

const quickStart = () => {
  return (
    <div className="normal">
      <h1 className="title">quckstart</h1>
      <div className="welcome" />
    </div>
  );
};

quickStart.propTypes = {};

export default connect()(quickStart);
