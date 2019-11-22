import Vue from "vue";
import App from "./App.vue";
import router from "@/router/router";
import store from "./store/store";
import "./plugins/element.js";
import "./plugins/myPlugin.js";
import "normalize.css";
import "./style/main.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
