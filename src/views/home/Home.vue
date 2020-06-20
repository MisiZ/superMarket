<template>
  <div id="home">
    <nav-bar class="home-nav"></nav-bar>
     <tab-control
        class="tab-control"
        :titles="['流行','新款','精选']"
        ref="tabControl1"
        @tabclick="tabClick"
        v-show="isTabFixed"
      />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentClick"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperLoad="swiperLoad"/>
      <recommends-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行','新款','精选']"
        ref="tabControl2"
        @tabclick="tabClick"
      />
      <goodslist :goods="goods[currentType].list" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBacktop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendsView from "./childComps/RecommendsView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import Goodslist from "components/content/goods/GoodsList";

import { getHomeMultidata, getHomeGoods } from "network/home";
import scroll from "components/common/scroll/Scroll";
import backTop from "components/content/backTop/BackTop";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendsView,
    FeatureView,
    TabControl,
    Goodslist,
    scroll,
    backTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBacktop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata();
    //2.请求商品数据,对应home.js
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
    
  },

  mounted() {
    // 1.图片加载完成的事件监听
    const refresh = this.debounce(this.$refs.scroll.refresh, 50);
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
  },
  destroyed(){
    console.log("销毁")
  },
  activated(){
    this.$refs.scroll.refresh()
    this.$refs.scroll.scroll.scrollTo(0,this.saveY,0)
  },
  deactivated(){
    this.saveY = this.$refs.scroll.scroll.y
  },

  methods: {
    debounce(func, delay) {
      //防抖函数
      let timer = null;
      return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },


    swiperLoad(){   // 获取 流行新款精选 栏的offsettop
    this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    //事件监听相关
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;

    },

    backClick() {
      //返回顶部按钮
      this.$refs.scroll.scroll && this.$refs.scroll.scroll.scrollTo(0, 0, 500);
    },
    contentClick(position) {     //定位显示顶部按钮显示隐藏
      //1.定位显示顶部按钮显示隐藏
      this.isShowBacktop = -position.y > 1000;
      //2.决定tabContrl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      //根据类型加载更多数据
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.scroll.refresh(); //调用完成后重新计算可滚动区域高度
    },

    //网络请求相关
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        console.log(res);
        
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.scroll.finishPullUp(); //上拉加载后调用
      });
    }
  }
};
</script>

<style scoped>
#home {
  position: relative;
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;  //在使用原生滚动时需要添加此样式
  left: 0;
  top: 0;
  right: 0; */
  /* z-index: 2; */
}
.tab-control {
  position:relative;
  z-index: 10;
  background: #ffffff;;

}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
