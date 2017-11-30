/* eslint no-param-reassign: */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    products: [],
    enoughCoins: true,
    coins: 0,
    userName: '',
    filters: [
      {
        title: 'Most Recent',
        id: 'recent',
        active: true,
      },
      {
        title: 'Lowest Price',
        id: 'lowest',
        active: false,
      },
      {
        title: 'Highest Price',
        id: 'highest',
        active: false,
      }],
  },
  mutations: {
    SET_PRODUCTS(state, data) {
      state.products = data.map((item) => {
        item.enough = state.coins - item.cost >= 0;
        item.left = item.enough ? false : item.cost - state.coins;
        return item;
      });
      state.enoughCoins = Math.min(...data.map(item => item.cost)) <= state.coins;
    },
    SET_USER(state, data) {
      state.coins = data.points;
      state.userName = data.name;
    },
    REDEEM_PRODUCT(state, data) {
      if (state.coins > 0 && state.coins - data.cost >= 0) {
        state.coins -= data.cost;
      }
    },
    FILTER_LIST(state, data) {
      console.log(data);
    },
    SET_CURRENT_FILTER(state, data) {
      state.filters = state.filters.map((item) => {
        item.active = data === item.id;
        return item;
      });
    },
  },
  actions: {
    setProducts({ commit }, data) {
      commit('SET_PRODUCTS', data);
    },
    setUser({ commit }, data) {
      commit('SET_USER', data);
    },
    redeem({ commit }, data) {
      commit('REDEEM_PRODUCT', data);
    },
    filter({ commit }, data) {
      // commit('FILTER_LIST', data);
      commit('SET_CURRENT_FILTER', data);
    },
  },
  getters: {
    getProducts: state => state.products,
    getCoins: state => state.coins,
    getName: state => state.userName,
    getEnoughCoins: state => state.enoughCoins,
    getFilters: state => state.filters,
  },
});
