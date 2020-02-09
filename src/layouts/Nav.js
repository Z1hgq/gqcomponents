import React, { useEffect, useState } from "react";
import { Menu, Icon, Button } from "antd";
import { withRouter } from "react-router-dom";
import "./Nav.less";

const { SubMenu } = Menu;

const Nav = props => {
  const [data, setData] = useState([
    {
      id: 4,
      name: "gqcomponents",
      path: "/index",
      icon: "dropbox",
      active: false,
      subShow: false,
      sub: []
    },
    {
      id: 5,
      name: "快速上手",
      path: "/quick-start",
      icon: "highlight",
      active: false,
      subShow: false,
      sub: []
    },
    {
      id: 6,
      name: "项目实践",
      path: "/project-practice",
      icon: "edit",
      active: false,
      subShow: false,
      sub: []
    },
    {
      id: 0,
      name: "组件",
      icon: "mail",
      active: false,
      subShow: false,
      sub: [
        {
          id: 1,
          name: "通用",
          options: [{ id: 2, name: "CodeView", path: "/code-view", active: false }]
        }
      ]
    }
  ]);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (props.location.pathname === "/") {
      props.history.push("./index");
    }
  }, []);

  const getActiveKey = url => {
    let key;
    for (const e of data) {
      if (e.path && e.path === url) {
        key = e.id;
      }
      if (e.sub.length) {
        for (const sub of e.sub) {
          for (const option of sub.options) {
            if (option.path === url) {
              key = option.id;
            }
          }
        }
      }
    }
    return String(key);
  };

  const handleClick = e => {
    skipPage(e.key);
  };

  const skipPage = key => {
    key = parseInt(key);
    for (const e of data) {
      if (e.id === key) {
        props.history.push(e.path);
        return;
      }
      if (e.sub.length) {
        for (const sub of e.sub) {
          for (const option of sub.options) {
            if (option.id === key) {
              props.history.push(option.path);
              return;
            }
          }
        }
      }
    }
  };
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    const n = document.querySelector("#nav");
    const cl = document.querySelector("#content_left");
    if (collapsed) {
      n.style.width = "80px";
      cl.style.width = "calc(100% - 80px)";
    } else {
      n.style.width = "256px";
      cl.style.width = "calc(100% - 256px)";
    }
  }, [collapsed]);

  return (
    <div className="nav-container">
      <div className="btn-container">
        <Button type="primary" onClick={toggleCollapsed} className="btn">
          <Icon type={collapsed ? "menu-unfold" : "menu-fold"} onClick={toggleCollapsed} />
        </Button>
      </div>
      <Menu
        onClick={handleClick}
        style={{ width: collapsed ? 80 : 256 }}
        selectedKeys={[getActiveKey(props.location.pathname)]}
        defaultOpenKeys={["0"]}
        mode="inline"
        inlineCollapsed={collapsed}
      >
        {data.map(e => {
          return e.sub.length ? (
            <SubMenu
              key={e.id}
              title={(
                <span>
                  <Icon type={e.icon} />
                  <span>{e.name}</span>
                </span>
              )}
            >
              {e.sub.map(sub => {
                return (
                  <Menu.ItemGroup key={sub.id} title={sub.name}>
                    {sub.options.map(option => {
                      return <Menu.Item key={option.id}>{option.name}</Menu.Item>;
                    })}
                  </Menu.ItemGroup>
                );
              })}
            </SubMenu>
          ) : (
            <Menu.Item key={e.id}>
              <Icon type={e.icon} />
              <span>{e.name}</span>
            </Menu.Item>
          );
        })}
      </Menu>
    </div>
  );
};

export default withRouter(Nav);
