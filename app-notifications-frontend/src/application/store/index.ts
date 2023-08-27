import {createStore} from 'vuex'
import SpinnerModule from './spinner/spinner.module'
import AlertsModule from './notifications/alerts.module'

export default createStore({
    modules: {
        spinner: SpinnerModule,
        notifications: AlertsModule,
        //auth: AuthModule
    }
});