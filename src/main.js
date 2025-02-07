import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import "./plugins/vee-validate";
import "./plugins/tokenStorage";
import OtpInput from "@bachdgvn/vue-otp-input";
import VueAnalytics from 'vue-analytics';

Vue.config.productionTip = false;

Vue.component("v-otp-input", OtpInput)

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");
Vue.use(VueAnalytics, {
    id: 'UA-165631711-1',
    router
});