import React, { useEffect } from "react";
import { connect } from "dva";
import CodeView from "@components/CodeView";
import { Button } from "antd";

import "@components/CodeView/less/index.less";
import "./index.less";

const quickStart = () => {
  return (
    <div className="quick-start">
      <CodeView
        babelTransformOptions={{
          presets: ["stage-0", "react", "es2015"]
        }}
        showCode
        theme="light"
        dependencies={{
          Button
        }}
      >
        {require("./example.md")}
      </CodeView>
    </div>
  );
};

quickStart.propTypes = {};

export default connect()(quickStart);
