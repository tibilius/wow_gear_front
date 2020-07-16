export default {
    state: {
        loading: false
    },
    mutations: {
        loading(state) {
            state.loading = true
        },
        loaded(state) {
            state.loading = false
        },
    },
    getters: {
        isLoading(state) {
            return state.loading
        },
    }
}