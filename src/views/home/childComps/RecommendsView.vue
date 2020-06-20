<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommends-item">
      <a :href="item.link">
        <img :src="item.image" alt />
        <p>{{item.title}}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendsView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style>
.recommend {
  display: flex;
  text-align: center;
  border-bottom: 10px solid #eee;
  padding:10px 10px 20px;
  font-size: 12px;
}
.recommends-item {
  flex: 1;
}
.recommends-item img {
  width: 65px;
  height: 65px;
}
</style>