/*
 * @Author      : Mr.bin
 * @Date        : 2024-02-07 14:19:10
 * @LastEditTime: 2024-11-04 11:34:08
 * @Description : Vuex
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 规格
    spec: '',

    // 型号
    model: ''
  },

  mutations: {
    // 规格
    CHANGE_SPEC(state, spec) {
      state.spec = spec
    },

    // 型号
    CHANGE_MODEL(state, model) {
      state.model = model
    }
  },

  actions: {
    // 规格
    changeSpec({ commit }, spec) {
      return new Promise((resolve, reject) => {
        commit('CHANGE_SPEC', spec)
        resolve()
      })
    },

    // 型号
    changeModel({ commit }, model) {
      return new Promise((resolve, reject) => {
        commit('CHANGE_MODEL', model)
        resolve()
      })
    }
  }
})
