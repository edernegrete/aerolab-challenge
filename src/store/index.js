/* eslint no-param-reassign: */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    products: [],
    viewProducts: [],
    enoughCoins: true,
    currentPage: 0,
    coins: 0,
    userName: '',
    filters: {
      data: [
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
        },
      ],
      config: {
        isLast: false,
        isFirst: false,
      },
    },
  },
  mutations: {
    SET_PRODUCTS(state) {
      state.viewProducts = state.products[state.currentPage].map((item) => {
        item.enough = state.coins - item.cost >= 0;
        item.left = item.enough ? false : item.cost - state.coins;
        return item;
      });
    },
    SET_ENOUGH_COINS(state) {
      state.enoughCoins = Math.min(
        ...state.products[state.currentPage].map(item => item.cost),
      ) <= state.coins;
    },
    SET_PAGINATOR(state, { arr, n }) {
      const res = [];
      while (arr.length) {
        res.push(arr.splice(0, n));
      }
      state.products = res;
    },
    SET_CURRENT_PAGE(state, data) {
      if (data === 'next') {
        state.currentPage += 1;
      } else {
        state.currentPage -= 1;
      }
    },
    SET_FILTERS(state) {
      state.filters.config.isLast = state.products.length === state.currentPage + 1;
      state.filters.config.isFirst = state.currentPage === 0;
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
      state.filters.data = state.filters.data.map((item) => {
        item.active = data === item.id;
        return item;
      });
    },
  },
  actions: {
    setProducts({ commit }, data) {
      commit('SET_PAGINATOR', { arr: data, n: 16 });
      commit('SET_PRODUCTS');
      commit('SET_FILTERS');
      commit('SET_ENOUGH_COINS');
    },
    setUser({ commit }, data) {
      commit('SET_USER', data);
    },
    setCurrentPage({ commit }, data) {
      commit('SET_CURRENT_PAGE', data);
      commit('SET_PRODUCTS');
      commit('SET_FILTERS');
    },
    redeem({ commit }, data) {
      commit('REDEEM_PRODUCT', data);
      commit('SET_PRODUCTS');
      commit('SET_ENOUGH_COINS');
    },
    filter({ commit }, data) {
      // commit('FILTER_LIST', data);
      commit('SET_CURRENT_FILTER', data);
    },
  },
  getters: {
    getProducts: state => state.viewProducts,
    getCoins: state => state.coins,
    getName: state => state.userName,
    getEnoughCoins: state => state.enoughCoins,
    getFilters: state => state.filters,
    getcurrentPage: state => state.currentPage,
  },
});
