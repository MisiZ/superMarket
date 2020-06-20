<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt @load="imgaeLoad"/>
    <div class="goods-info">
      <p class="p">{{goodsitems.title}}</p>
      <span class="price">{{goodsitems.price}}</span>
      <span class="cfav">{{goodsitems.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsitems: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed:{
   showImage(){
     return this.goodsitems.image || this.goodsitems.show.img
   }
  },
  methods:{
    imgaeLoad(){
      this.$bus.$emit("itemImageLoad")
    },
    itemClick(){
      this.$router.push("./detail/" + this.goodsitems.iid)
    }
  }
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;

  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .cfav {
  position: relative;
}

.goods-info .cfav::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>