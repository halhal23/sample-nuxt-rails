import createPersistedState from 'vuex-persistedstate'

export const state = () => ({
  member: null
})

export const getters = {
  member: (state) =>  state.member 
}

export const mutations = {
setMember(state,  { data } ){
    console.log('set member /store.index')
    console.log('data')
    console.log(data)
    state.member = data
    console.log('↓state.member')
    console.log(state.member)
  }
}
