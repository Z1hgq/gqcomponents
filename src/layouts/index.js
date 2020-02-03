import React, { useEffect } from "react";
import "./index.less";
import Nav from "./Nav";
import Header from "./Header";

export default function Layout(props) {
  const {
    children,
    location: { pathname }
  } = props;
  const _pages = [];
  const pageItem = _pages.find(item => pathname.indexOf(item) > -1);
  if (pageItem) {
    return children;
  }
  console.log(children);
  return (
    <div className="ceiba3-layout">
      <div className="ceiba3-layout-header">
        <div className="img-box">
          <img
            className="logo"
            src={"https://avatars2.githubusercontent.com/u/26574371?s=40&v=4"}
          />
        </div>
        <span className="title-sub">{""}</span>
        <Header />
      </div>
      <div className="ceiba3-layout-content">
        <div className="nav">
          <Nav />
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
