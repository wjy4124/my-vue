let state = {
  errorMask: {
    m: '',
    s: '',
    visible: false
  }
}
let mutations = {
  ['SHOW_ERRORMASK'](state, {m, s}) {
    state.errorMask.m = m
    state.errorMask.s = s
    state.errorMask.visible = true
  }
}
let getters = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
