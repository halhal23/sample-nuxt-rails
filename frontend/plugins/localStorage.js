import createPersistedState from 'vuex-persistedstate'
 
export default ({ store }) => {
    window.onNuxtReady(() => {
        createPersistedState({
            key: 'hal-key'
        })(store)
    })
}