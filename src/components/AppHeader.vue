<template>
  <div class="AppHeader">
    <header class="Header flex flex-space-between">
      <div class="Header-image">
        <img src="../assets/aerolab-logo.svg" alt="">
      </div>
      <div class="Header-user flex flex-center-items flex-space-between">
        <span class="Header-name"> {{name}} </span>
        <button class="Header-coins button flex flex-center-items">
          <span class="Header-amount"> {{coins}} </span>
          <img src="../assets/icons/coin.svg" class="Header-icon">
        </button>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  props: ['coins', 'name'],
};
</script>
<style scoped>
  .flex {
    display: flex;
  }
  .flex-center-items {
    align-items: center;
  }
  .flex-space-between {
    justify-content: space-between;
  }
  .button {
    background: #ededed;
  }
  .AppHeader {
    padding: 1rem;
  }
  .Header-user {
    flex-grow: 0.01;
  }
  .Header-icon {
    width: 1rem;
  }
  .Header-coins {
    justify-content: space-around;
  }
</style>
