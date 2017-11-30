<template>
  <div class="Product-wrapper">
    <div class="Product box">
      <div class="Product-icon" v-if="enough"></div>
      <div v-if="!enough" class="Product-icon--not-enough">
        <span> You need {{left}} </span>
        <img src="../assets/icons/coin.svg" alt="" width="15px">
      </div>
      <img :src="image" class="Product-image">
      <span class="Product-category">{{category}}</span>
      <span class="Product-name">{{name}}</span>
      <div :class="[enough ? 'Product-detail' : 'hidden', 'box']">
        <div class="Product-detail-coins">
          <span class="Product-coins">{{coins}}</span>
          <img class="Product-coin-image" src="../assets/icons/coin.svg">
        </div>
        <button class="button" @click="redeem(product)">Redeem Now</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppProduct',
  props: ['category', 'name', 'image', 'coins', 'enough', 'left', 'product'],
  methods: {
    redeem(product) {
      this.$emit('redeem', product);
    },
  },
};
</script>

<style>
  .box {
    max-width: 276px;
    padding: 1rem;
  }
  .button {
    background: #fff;
    border: none;
    border-radius: 100px;
    color: #616161;
    cursor: pointer;
    font-size: 1rem;
    height: 34px;
    outline: none;
    width: 140px;
  }
  .hidden {
    display: none;
  }
  .Product {
    background: #fff;
    box-shadow: 2px 2px 4px 0 rgba(0,0,0,0.10);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    position: relative;
    transition: 0.5s all ease;
  }
  .Product-icon--not-enough {
    align-self: flex-end;
    opacity: 0.8;
    background: #616161;
    border-radius: 100px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 142px;
  }
  .Product:hover {
    transform: scale(0.9, 0.9);
    box-shadow: 2px 2px 20px 20px rgba(0,0,0,0.10);
  }
  .Product:hover > .Product-detail{
    display: flex;
    width: 89%;
    height: 90%;
  }
  .Product:hover > .Product-icon {
    background-image: url('../assets/icons/buy-white.svg');
  }
  .Product-category {
    color: #a3a3a3;
  }
  .Product-coins {
    color: #fff;
    font-size: 1.5rem;
  }
  .Product-coin-image {
    margin-left: 3px;
    width: 23px;
  }
  .Product-icon {
    background-image: url('../assets/icons/buy-blue.svg');
    align-self: flex-end;
    height: 42px;
    width: 42px;
    z-index: 1;
  }
  .Product-image {
    border-bottom: 1px solid #d9d9d9;
    margin-bottom: 1rem;
  }
  .Product-detail {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 0.5s all ease;
    background: linear-gradient(-180deg, #0ad4faed 0%, #25bbf1d4 100%);
    position: absolute;
    top: 0;
    left: 0;
  }
  .Product-detail-coins {
    align-items: center;
    display: flex;
    flex-grow: 0.1;
  }
</style>
