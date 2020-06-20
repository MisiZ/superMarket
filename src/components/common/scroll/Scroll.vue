<template>
  <div class="wrapper" ref="scl">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll"

export default {
  name:"Scroll",
  props:{
    probeType:{
      type:Number,
      default: 0
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    }
  },
  data(){
    return {
      scroll:null
    }
  },
  mounted(){
    this.scroll=new Bscroll(this.$refs.scl,{  //创建实例对象
      probeType:this.probeType,
      click:true,
      pullUpLoad:this.pullUpLoad
    })
    this.scroll.on("scroll",(position)=>{ //监听滚动的位置
      this.$emit("scroll",position)
    })
    this.scroll.on("pullingUp",()=>{  //监听上拉加载更多
     this.$emit("pullingUp")
    })
  },
  methods:{
    refresh(){
      this.scroll && this.scroll.refresh()
      console.log("----")
    }
  }
}
</script>

<style scoped>

</style>