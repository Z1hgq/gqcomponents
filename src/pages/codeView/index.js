import React, { useEffect } from "react";
import { connect } from "dva";
import CodeView from "@components/CodeView";
import Directory from "@components/Directory";
import { Button } from "antd";

import "@components/CodeView/less/index.less";
import "./index.less";

const codeView = () => {
  return (
    <div className="code-view">
      <CodeView
        babelTransformOptions={{
          presets: ["@babel/stage-0", "@babel/react", "@babel/preset-env"]
        }}
        showCode
        theme="dark"
        dependencies={{
          Button
        }}
      >
        {require("./example.md")}
      </CodeView>
      <Directory />
    </div>
  );
};

codeView.propTypes = {};

export default connect()(codeView);
