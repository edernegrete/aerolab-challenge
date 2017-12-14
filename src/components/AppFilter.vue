<template>
  <div class="Filter">
    <span class="Filter-total">16 of 32</span>
    <div class="Filters">
      <p class="Filters-title">Sort by:</p>
      <button
        v-for="filter in filters.data"
        :class="[filter.active ? 'active' : 'disabled', 'button']"
        @click="emitFilter(filter.id)">
        {{filter.title}}
      </button>
    </div>
    <div class="Filter-actions">
      <img src="../assets/icons/arrow-left.svg" class="arrow"
      :hidden="filters.config.isFirst"
      @click="$emit('navigate', 'prev')">
      <img src="../assets/icons/arrow-right.svg" class="arrow"
      :hidden="filters.config.isLast"
      @click="$emit('navigate', 'next')">
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppFilter',
  props: ['filters'],
  methods: {
    emitFilter(ev) {
      this.$emit('filter', ev);
    },
  },
};
</script>

<style scoped>
  .arrow {
    cursor: pointer;
    width: 40px;
  }
  .active {
    background: #0ad4fa;
    color: #fff;
  }
  .disabled {
    background: #ededed;
    color: #a3a3a3;
  }
  .button {
    font-size: 1rem;
    height: 34px;
    width: 140px;
  }
  .Filter {
    border-bottom: 1px solid #d9d9d9;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .Filter-total {
    flex-grow: 0.03;
    border-right: 1px solid #d9d9d9;
  }
  .Filters {
    flex-grow: 0.9;
  }
  .Filters-title {
    display: inline-block;
  }
</style>
