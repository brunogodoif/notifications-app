import {createStore} from 'vuex'
import SpinnerModule from './spinner/spinner.module'
import AlertsModule from '././alerts/alerts.module'
import AuthModule from "@/application/store/auth/auth.module";

export default createStore({
    modules: {
        spinner: SpinnerModule,
        alerts: AlertsModule,
        auth: AuthModule
    }
});