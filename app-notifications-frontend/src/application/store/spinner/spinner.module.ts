export default {
    namespaced: true,
    state: {
        isLoading: false,
    },
    mutations: {
        UPDATE_LOADING(state: any, status: boolean) {
            state.isLoading = status;
        },
    },
    actions: {
        updateIsLoading(context: any, status: boolean): void {
            context.commit('UPDATE_LOADING', status);
        }
    },
    getters: {
        getIsLoading: function (state: any): boolean {
            return state.isLoading;
        }
    }
}