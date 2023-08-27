import {createApp} from 'vue'
import App from "./App.vue";
import router from './router'
import store from "./application/store";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.component('VueDatePicker', VueDatePicker);
app.mount('#app')
