import {AlertType} from "./types/alertType";
import {AlertTypeBox} from "./types/alertTypeBox";
import {AlertTypeIcon} from "./types/alertTypeIcon";

export default {
    namespaced: true,
    state: {
        id: 1,
        messages: Array<AlertType>()
    },
    mutations: {
        HIDE_ALL_ALERTS(state: any) {
            state.messages = [];
            state.id = 1;
        },
        HIDE_ALERT(state: any, id: number) {
            state.messages = state.messages.filter((message: any) => message.id !== id);
        },
        PUSH_ALERT(state: any, messageData: AlertType) {
            state.messages.push(messageData);
            setTimeout(() => {
                //document.querySelector("#" + messageData.id).scrollIntoView({behavior: 'smooth', block: 'center'});
            }, 1);

        },
    },
    actions: {
        hideAllAlerts(context: any): void {
            context.commit('HIDE_ALL_ALERTS');
        },
        hideAlert(context: any, id: number): void {
            context.commit('HIDE_ALERT', id);
        },
        hideAlertAuto(context: any, id: number): void {
            setTimeout(() => {
                context.dispatch('hideAlert', id)
            }, 10000);
        },
        showAlertByStatusHttp(context: any, {message, httpStatus}: any): void {
            switch (true) {
                case (httpStatus == 200 || httpStatus == 201):
                    context.dispatch('showAlertSuccess', message);
                    break;
                case (httpStatus == 400 || httpStatus == 409):
                    context.dispatch('showAlertWarning', message);
                    break;
                case (httpStatus == 500):
                    context.dispatch('showAlertDanger', message);
                    break;
                default:
                    context.dispatch('showAlertInfo', message);
                    break;
            }
        },
        showAlertWithMessage(context: any, {type, icon, message}: any): void {
            context.dispatch('buildMessageData', {type, icon, message})
                .then((messageData: AlertType) => {
                    context.commit('PUSH_ALERT', messageData);
                    context.dispatch('hideAlertAuto', messageData.id);
                });
        },
        showAlertDanger(context: any, message: string): void {
            const type = AlertTypeBox.Danger;
            const icon = AlertTypeIcon.Danger;
            context.dispatch('showAlertWithMessage', {type, icon, message});
        },
        showAlertWarning(context: any, message: string): void {
            const type = AlertTypeBox.Warning;
            const icon = AlertTypeIcon.Warning;
            context.dispatch('showAlertWithMessage', {type, icon, message});
        },
        showAlertInfo(context: any, message: string): void {
            const type = AlertTypeBox.Info;
            const icon = AlertTypeIcon.Info;
            context.dispatch('showAlertWithMessage', {type, icon, message});
        },
        showAlertSuccess(context: any, message: string): void {
            const type = AlertTypeBox.Success;
            const icon = AlertTypeIcon.Success;
            context.dispatch('showAlertWithMessage', {type, icon, message});
        },
        generateIdAlert(context: any): number {
            return (context.state.id++);
        },
        buildMessageData(context: any, {type, icon, message}: any): AlertType {
            return context.dispatch('generateIdAlert').then((idAlert: any) => {
                return {
                    id: "notification-" + idAlert,
                    type: type,
                    icon: icon,
                    message: message
                }
            });
        },
    },
    getters: {
        getMessages: function (state: any): [] {
            return state.messages;
        },
    }
}