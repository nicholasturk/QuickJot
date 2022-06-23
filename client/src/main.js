import Vue from "vue";
import App from "./App.vue";
import VueNotification from "@mathieustan/vue-notification";
import VueRouter from "vue-router";
import KeyPress from "vue-keypress";
import vueAlerts from "vue-alerts";
import VTooltip from "v-tooltip";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faGrip } from "@fortawesome/free-solid-svg-icons";
import { faBomb } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faClipboardQuestion } from "@fortawesome/free-solid-svg-icons";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { faClone } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import routes from "./routes";

library.add(faAnglesDown);
library.add(faAnglesUp);
library.add(faAnglesDown);
library.add(faUserSecret);
library.add(faCaretDown);
library.add(faCaretRight);
library.add(faClipboardQuestion);
library.add(faFileExport);
library.add(faMagnifyingGlass);
library.add(faBomb);
library.add(faSort);
library.add(faClone);
library.add(faClipboard);
library.add(faTrashCan);
library.add(faLink);
library.add(faGrip);
library.add(faXmark);

Vue.use(VueRouter);
Vue.use(VTooltip);
Vue.use(VueNotification);
Vue.use(vueAlerts, {
  developerMode: true,
  presentBlockTime: 100,
  dismissBlockTime: 100,
});
Vue.component("key-press", KeyPress);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

const router = new VueRouter({
  routes,
  mode: "history",
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
