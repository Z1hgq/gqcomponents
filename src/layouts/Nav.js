import React, { useEffect, useState } from "react";
import { Menu, Icon } from "antd";
import { withRouter } from "react-router-dom";

const { SubMenu } = Menu;

const Nav = props => {
  const [data, setData] = useState([
    {
      id: 4,
      name: "Antd Design of React",
      path: "/",
      icon: "",
      active: false,
      subShow: false,
      sub: []
    },
    {
      id: 5,
      name: "快速上手",
      path: "/quick-start",
      icon: "",
      active: false,
      subShow: false,
      sub: []
    },
    {
      id: 6,
      name: "项目实践",
      path: "/practice",
      icon: "",
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
          options: [{ id: 2, name: "Button 按钮", path: "/button", active: false }]
        }
      ]
    }
  ]);
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

  return (
    <Menu
      onClick={handleClick}
      style={{ width: 256 }}
      selectedKeys={[getActiveKey(props.location.pathname)]}
      defaultOpenKeys={["0"]}
      mode="inline"
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
          <Menu.Item key={e.id}>{e.name}</Menu.Item>
        );
      })}
    </Menu>
  );
};

export default withRouter(Nav);
