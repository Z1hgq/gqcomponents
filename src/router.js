import dynamic from "dva/dynamic";
import createRoute from "./utils/createRoute";

const app = window.global_app;
const routes = [
  {
    path: "/",
    title: "首页",
    component: dynamic({
      app,
      component: () => import("./pages/index")
      // models: () => [
      //     import(""),
      // ]
    }),
    children: []
  },
  {
    path: "/quick-start",
    title: "快速开始",
    component: dynamic({
      app,
      component: () => import("./pages/quickStart/index")
      // models: () => [
      //     import(""),
      // ]
    }),
    children: []
  }
];

const Router = createRoute(routes);

export default Router;
