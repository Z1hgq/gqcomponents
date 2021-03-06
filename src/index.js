import dva from "dva";
import { createBrowserHistory } from "history";
import "./index.less";
import "antd/dist/antd.less";
// import "rsuite-theme/dist/less/index.less";

// 1. Initialize
const app = dva({
  history: createBrowserHistory()
});
window.global_app = app;
// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(require("./router").default);

// 5. Start
app.start("#root");
