<template>
  <div id="app">
    <div class="loading" v-if="loading">
      <spinner/>
    </div>
    <div class="store" v-else>
      <div class="app-header">
        <app-header :coins="coins" :name="name"/>
      </div>
      <div class="app-mask">
        <img src="./assets/header-x1.png" class="app-image">
        <span class="app-section">{{section}}</span>
      </div>
      <div class="app-products" v-if="!loading">
        <app-filter class="app-filter"
          :filters="filters"
          @filter="hadleFilter"
          @navigate="pagination"/>
        <div class="app-products-list">
          <app-product
            v-for="product in products"
            :product="product"
            :key="product._id"
            :enough="product.enough"
            :left="product.left"
            :category="product.category"
            :coins="product.cost"
            :name="product.name"
            :image="product.img.url"
            @redeem="handleRedeem"/>
        </div>
      </div>
      <div class="app-loading" v-if="loading">
        <img src="./assets/loading.gif" alt="">
        <h1>Loading</h1>
      </div>
      <div class="modal" v-if="showModal">
        <app-modal @close="showModal = false" @getCoins="getMoreCoins"/>
      </div>
      <div class="app-help" v-if="!showModal && !enoughCoins">
        <button class="button button-help" @click="getMoreCoins">Get More Coins</button>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader';
import AppFilter from './components/AppFilter';
import AppProduct from './components/AppProduct';
import AppModal from './components/AppModal';
import Spinner from './components/Spinner';
import { getProducts, getUser } from './api/requests';

export default {
  name: 'app',
  components: {
    AppHeader,
    AppFilter,
    AppProduct,
    AppModal,
    Spinner,
  },
  data() {
    return {
      section: 'Electronics',
      loading: false,
      showModal: false,
    };
  },
  computed: {
    products() {
      return this.$store.getters.getProducts;
    },
    filters() {
      return this.$store.getters.getFilters;
    },
    name() {
      return this.$store.getters.getName;
    },
    currentPage() {
      return this.$store.getters.currentPage;
    },
    coins() {
      return this.$store.getters.getCoins;
    },
    enoughCoins() {
      return this.$store.getters.getEnoughCoins;
    },
  },
  watch: {
    enoughCoins(enough) {
      this.showModal = !enough;
    },
  },
  mounted() {
    const initialRequests = [Promise.resolve(getUser()), Promise.resolve(getProducts())];
    // this.loading = true;
    Promise.all(initialRequests).then((res) => {
      this.$store.dispatch('setUser', res[0]);
      this.$store.dispatch('setProducts', res[1]);
      this.loading = false;
    });
  },
  methods: {
    handleRedeem(data) {
      // const key = '_id';
      // redeem({
      //   productId: data[key],
      // }).then(() => {
      this.$store.dispatch('redeem', data);
      // });
    },
    hadleFilter(data) {
      this.$store.dispatch('filter', data);
    },
    getMoreCoins() {
      // getCoins().then(res => {
      // this.store.dispatch('setCoins', res.newPoints);
      // })
    },
    pagination(data) {
      this.$store.dispatch('setCurrentPage', data);
    },
  },
};
</script>

<style>
  .app-image {
    width: 100%;
  }
  .app-mask {
    position: relative;
  }
  .app-section {
    bottom: 30px;
    color: white;
    font-size: 64px;
    font-weight: 500;
    position: absolute;
  }
  .app-products {
    background: #f9f9f9;
    padding: 1rem;
  }
  .app-products-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .app-filter {
    margin-bottom: 1rem;
  }
  .app-help {
    position: fixed;
    bottom: 24px;
  }
  .button {
    background: #ededed;
    border: none;
    border-radius: 100px;
    cursor: pointer;
    outline: none;
    padding: 5px;
    width: 67px;
    height: 30px;
  }
  .button-help {
    background: #ff5252;
    font-size: 1rem;
    color: white;
    width: auto;
  }
  .button-blue {
    background: #0ad4fa;
    color: #fff;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
