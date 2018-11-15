import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

export default () => {
  return new Vuex.Store({
    strict: true,
    state: defaultState,
    mutations,
    getters,
    actions,
    modules: {
      a: {
        namespaced: true,
        state: {
          text: 1
        },
        mutations: {
          updateText (state, text) {
            console.log(state)
            state.text = text;
          }
        },
        getters: {
          textPlus (state) {
            return state.text + 1
          }
        }
      },
      b: {
        state: {
          text: 2
        }
      }
    }
  });
}
