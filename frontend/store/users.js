export const state = () => ({
  users: null,
  curret_user: null
})

export const getters = {
  users: state => { state.users },
  curret_user: state => { state.curret_user },
}

export const mutations = {
  setUsers( state, { users }){
    state.users = users
  },
  
  setUser( state, { user }){
    state.user = user
  }
}