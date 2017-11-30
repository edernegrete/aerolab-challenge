<template>
  <div>
    <div class="loading" v-if="loading">
      <spinner/>
    </div>
    <div id="app" v-else>
      <div class="app-header">
        <app-header :coins="coins" :name="name"/>
      </div>
      <div class="app-mask">
        <img src="./assets/header-x1.png" class="app-image">
        <span class="app-section">{{section}}</span>
      </div>
      <div class="app-products" v-if="!loading">
        <app-filter class="app-filter" :filters="filters" @filter="hadleFilter"/>
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
      <div class="modal" v-if="!enoughCoins">
        <app-modal/>
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
    coins() {
      return this.$store.getters.getCoins;
    },
    enoughCoins() {
      return this.$store.getters.getEnoughCoins;
    },
  },
  mounted() {
    const initialRequests = [Promise.resolve(getUser()), Promise.resolve(getProducts())];
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
      this.$store.dispatch('setProducts', this.products);
      // });
    },
    hadleFilter(data) {
      this.$store.dispatch('filter', data);
    },
  },
};
</script>

<style>
  body {
    margin: 0;
  }
  p {
    margin: 0;
  }
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
