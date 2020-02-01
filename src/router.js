import dynamic from "dva/dynamic";
import createRoute from "./utils/createRoute";

console.log(() => import("./pages/index"));
const app = window.global_app;
const routes = [
    {
        path: "/",
        title: "",
        component: dynamic({
            app,
            component: () => import("./pages/index"),
            // models: () => [
            //     import(""),
            // ]
        }),
        children: []
    },
];

const Router = createRoute(routes);

export default Router;
