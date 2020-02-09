import React, { useEffect, useState } from "react";
import "./index.less";
import Nav from "./Nav";
import Header from "./Header";

const appName = "gqcomponents";

export default function Layout(props) {
  const {
    children,
    location: { pathname }
  } = props;
  // _page内的url不需要默认布局
  const _pages = [];
  const pageItem = _pages.find(item => pathname.indexOf(item) > -1);
  if (pageItem) {
    return children;
  }
  useEffect(() => {
    const content = document.getElementById("content");
    content.style.height = document.body.clientHeight - 60 + "px";
    window.onresize = function () {
      content.style.height = document.body.clientHeight - 60 + "px";
    };
  }, []);
  return (
    <div className="gq-layout">
      <div id="header">
        <div className="img-box">
          <img
            className="logo"
            src={"https://avatars2.githubusercontent.com/u/26574371?s=40&v=4"}
          />
        </div>
        <span className="title-sub">{appName}</span>
        <Header />
      </div>
      <div className="gq-layout-content" id="content">
        <div className="nav" id="nav">
          <Nav />
        </div>
        <div className="content" id="content_left">
          <div className="nav-content">{children}</div>
        </div>
      </div>
    </div>
  );
}
