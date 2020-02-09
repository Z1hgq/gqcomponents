import React from "react";
import DocumentTitle from "react-document-title";
import { Route, Switch, routerRedux } from "dva/router";
import Layout from "../layouts";
const { ConnectedRouter: Router } = routerRedux;

export default function createRoute(routes) {
  routes = [
    {
      path: "/",
      exact: true,
      component: Layout,
      children: routes
    }
  ];
  return () => {
    // window.global_app._history.listen((location, action) => {});
    return (
      <Router history={window.global_app._history}>
        {create(routes)}
      </Router>
    );
  };
  function create(routes) {
    return (
      <Switch>
        {routes.map(item => {
          const hasChildren = item.children && item.children.length > 0;
          const Component = item.component;
          return (
            <Route
              key={item.path}
              path={item.path}
              render={matchProps => {
                if (hasChildren) {
                  return item.title ? (
                    <DocumentTitle title={item.title || ""}>
                      <Component {...matchProps}>{create(item.children)}</Component>
                    </DocumentTitle>
                  ) : (
                    <Component {...matchProps}>{create(item.children)}</Component>
                  );
                }
                return item.title ? (
                  <DocumentTitle title={item.title || ""}>
                    <Component {...matchProps} />
                  </DocumentTitle>
                ) : (
                  <Component {...matchProps} />
                );
              }}
            />
          );
        })}
      </Switch>
    );
  }
}
