import dynamic from "dva/dynamic";
import createRoute from "./utils/createRoute";

const app = window.global_app;
// DO NOT USE ROOT ROUTE "/"
// DO NOT USE ROOT ROUTE "/"
// DO NOT USE ROOT ROUTE "/"
const routes = [
  {
    path: "/index",
    title: "首页",
    component: dynamic({
      app,
      component: () => import("./pages/index/index"),
      models: () => [import("./pages/index/model.js")]
    }),
    children: []
  },
  {
    path: "/quick-start",
    title: "快速开始",
    component: dynamic({
      app,
      component: () => import("./pages/quickStart/index"),
      models: () => [import("./pages/quickStart/model.js")]
    }),
    children: []
  }
];

const Router = createRoute(routes);

export default Router;
