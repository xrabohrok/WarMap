import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

import defaultState from './state/baseState'
import mutations from './state/mutations'


Vue.config.productionTip = false

Vue.use(Vuex)

const store = new Vuex.Store({
  state: defaultState,
  mutations: mutations
  //no actions yet
})
 

new Vue({
  render: h => h(App),
  store: store
}).$mount('#app')
