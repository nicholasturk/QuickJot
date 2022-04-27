import Vue from "vue";
import App from "./App.vue";
import VueNotification from "@mathieustan/vue-notification";
import VueRouter from "vue-router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import routes from "./routes";

library.add(faUserSecret);
library.add(faEraser);
library.add(faCopy);
library.add(faTrashCan);
library.add(faLink);

Vue.use(VueRouter);
Vue.use(VueNotification);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

const router = new VueRouter({
  routes,
  mode: "history"
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
