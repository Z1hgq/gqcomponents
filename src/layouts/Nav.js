import React, { useState, useEffect } from "react";
import "./Nav.less";
import classnames from "classnames";
import { Popover } from "antd";
import { push } from "react-router-redux";
import { withRouter } from "react-router-dom";
import { connect } from "dva";

const Nav = props => {
  const [initData, setData] = useState([
    {
      id: 0,
      name: "start",
      path: "/",
      icon: "",
      active: false,
      subShow: false,
      sub: []
    }
  ]);

  useEffect(() => {
    activeNav("/");
    addHistoryListener();
  });

  const addHistoryListener = () => {
    props.history.listen(param => {
      activeNav(param.pathname);
    });
  };
  // 根据路由激活导航
  const activeNav = pathname => {
    const data = JSON.parse(JSON.stringify(initData));
    data.forEach(element => {
      if (element) {
        element.active = false;
        element.sub.forEach(item => {
          if (item) {
            item.active = false;
          }
        });
      }
    });
    for (let i = 0; i < data.length; i++) {
      if (data[i]) {
        const sub = data[i].sub;
        if (pathname === data[i].path) {
          data[i].active = true;
          break;
        }
        for (let j = 0; j < sub.length; j++) {
          if (pathname === sub[j].path) {
            sub[j].active = true;
            data[i].active = true;
            break;
          }
        }
      }
    }
    setData(data);
  };
  // 跳转界面
  const skipPage = path => {
    if (path) {
      props.dispatch(
        push({
          pathname: path
        })
      );
    }
  };
  return (
    <div className="nav-container">
      {initData.map((element, index) => {
        if (element) {
          const sub = element.sub;
          if (sub.length > 0) {
            const content = (
              <div>
                {element.sub.map((subItem, index) => {
                  if (subItem) {
                    return (
                      <div
                        className={classnames("sub-item", {
                          "sub-item-active": subItem.active
                        })}
                        key={index}
                        onClick={() => {
                          skipPage(subItem.path);
                        }}
                        title={subItem.name}
                      >
                        <span className={`${subItem.icon} sub-icon`} />
                        {subItem.name}
                      </div>
                    );
                  }
                })}
              </div>
            );
            return (
              <Popover
                key={index}
                placement="rightTop"
                overlayClassName="nav-sub-left"
                content={content}
              >
                <div
                  className={classnames("nav-item", {
                    "nav-item-active": element.active
                  })}
                  key={index}
                  onClick={() => {
                    skipPage(element.path);
                  }}
                >
                  <div
                    className={classnames("nav-circle", {
                      "nav-item-circle-active": element.active
                    })}
                  >
                    <span
                      className={classnames(`nav-icon ${element.icon}`, {
                        "nav-icon-color-active": element.active
                      })}
                    />
                  </div>
                  <div className="nav-title" title={element.name}>
                    {element.name}
                  </div>
                </div>
              </Popover>
            );
          } else {
            return (
              <div
                className={classnames("nav-item", {
                  "nav-item-active": element.active
                })}
                key={index}
                onClick={() => {
                  skipPage(element.path);
                }}
              >
                <div
                  className={classnames("nav-circle", {
                    "nav-item-circle-active": element.active
                  })}
                >
                  <span
                    className={classnames(`nav-icon ${element.icon}`, {
                      "nav-icon-color-active": element.active
                    })}
                  />
                </div>
                <div className="nav-title" title={element.name}>
                  {element.name}
                </div>
              </div>
            );
          }
        }
      })}
    </div>
  );
};

export default withRouter(connect()(Nav));
