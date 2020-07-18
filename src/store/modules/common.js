export default {
    state: {
        loading: false,
        isInited: false, //when first mount passed
    },
    mutations: {
        loading(state) {
            state.loading = true
        },
        loaded(state) {
            state.loading = false
        },
        init(state) {
            state.isInited =true
        },
    },
    getters: {
        isLoading(state) {
            return state.loading
        },
        isInited(state){
          return state.isInited
        },
    }
}