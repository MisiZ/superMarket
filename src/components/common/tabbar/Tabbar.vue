<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "Tabbar"
  }
</script>

<style scoped>
  #tab-bar {
    display: flex;
    background: #f2f2f2;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 6px 2px 22px rgba(100, 100, 100, .8);
  }
</style>
