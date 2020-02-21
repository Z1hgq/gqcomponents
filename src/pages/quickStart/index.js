import React, { useEffect } from "react";
import { connect } from "dva";
import CodeView from "@components/CodeView";
import Directory from "@components/Directory";
import { Table, Input, Button, Popconfirm, Form } from "antd";

import "@components/CodeView/less/index.less";
import "./index.less";

const quickStart = () => {
  return (
    <div className="quick-start">
      <CodeView
        babelTransformOptions={{
          presets: ["stage-0", "react", "es2015"],
          plugins: ["transform-class-properties"]
        }}
        showCode
        theme="light"
        dependencies={{
          React,
          Table,
          Input,
          Button,
          Popconfirm,
          Form
        }}
      >
        {require("./example.md")}
      </CodeView>
      {/* <Directory /> */}
    </div>
  );
};

quickStart.propTypes = {};

export default connect()(quickStart);
