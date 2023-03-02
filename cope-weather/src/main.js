import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/tailwind.css";
// import "./font-awesome";
// import "font-awesome/css/font-awesome.min.css";

const app = createApp(App);

app.use(router);

app.mount("#app");
