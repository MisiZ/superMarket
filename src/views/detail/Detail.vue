<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="detail-scroll" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="detailImageLoad" />
      <detail-params-info ref="param" :param-info="paramsInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamsInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";

import { debounce } from "@/common/utils";
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParams
} from "network/detail";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopys: [],
      getThemeTopY: null,
      currentIndex: 0
    };
  },
  created() {
    //保存传入的iid
    this.iid = this.$route.params.iid;
    //请求详情数据
    getDetail(this.iid).then(res => {
      //请求轮播图数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      //获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //获取店铺信息
      this.shop = new Shop(data.shopInfo);
      //获取展示图片信息
      this.detailInfo = data.detailInfo;
      //获取参数信息
      this.paramsInfo = new GoodsParams(
        data.itemParams.info,
        data.itemParams.rule
      );
      //获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    //请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
    this.getThemeTopY = debounce(() => {
      this.themeTopys = [];
      this.themeTopys.push(0);
      this.themeTopys.push(this.$refs.param.$el.offsetTop);
      this.themeTopys.push(this.$refs.comment.$el.offsetTop);
      this.themeTopys.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTopys);
    }, 100);
  },
  // updated(){  //页面渲染完之后调用,保证有值
  //   this.themeTopys = []
  //   this.themeTopys.push(0);
  //   this.themeTopys.push(this.$refs.param.$el.offsetTop);
  //   this.themeTopys.push(this.$refs.comment.$el.offsetTop);
  //   this.themeTopys.push(this.$refs.recommend.$el.offsetTop);
  //   console.log(this.themeTopys);
  // },
  methods: {
    detailImageLoad() {
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scroll.scrollTo(0, -(this.themeTopys[index] - 54), 100);
    },
    contentScroll(position) {
      //滚动改变导航栏下标
      const positionY = -position.y; //获取y值
      let length = this.themeTopys.length;
      for (let i=0; i < length; i++) {
        if (
          this.currentIndex != i &&
          ((i < length - 1 &&
            positionY >= this.themeTopys[i] &&
            positionY < this.themeTopys[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTopys[i]))
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
          console.log(i);
          
        }
      }
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background: #ffffff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.detail-scroll {
  height: calc(100% - 44px);
}
</style>