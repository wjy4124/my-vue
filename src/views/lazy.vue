<template>
  <div class="g-s-page">
    <div class="content-wrap">
      <div class="content">
        <div class="box"></div>
        <img v-lazy="imgs[0]" alt="">
        <lazy-component @show="loadComponent">
          <echart v-if="showItem"></echart>
        </lazy-component>
      </div>
    </div>
    <div class="btn-group">
      <van-button type="default" @click="fn1">fn1</van-button>
      <van-button type="default" @click="fn2">fn2</van-button>
      <van-button type="default" @click="fn3">fn3</van-button>
    </div>
  </div>
</template>

<script>
  import { RecycleScroller, DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
  import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
  import { Button } from 'vant'
  import { page } from '../api/test'
  import PageList from '@/components/pageList'
  import Item from './components/item'

  export default {
    data() {
      return {
        imgs: [
          `https://duanshu-1253562005.image.myqcloud.com/2020/06/04/16/j54g72862j3630ed1b/common/content/1591259906035_955222.jpeg?imageMogr2/auto-orient`,
          `https://duanshu-1253562005.image.myqcloud.com/2020/04/26/18/j54g72862j3630ed1b/common/content/1587897833018_932838.jpg?imageMogr2/auto-orient`
        ],
        showItem: false,
        page,
        params: {},
        list: []
      }
    },
    created() {
    },
    filters: {
    },
    methods: {
      fn1() {
        let idx = 0
        let item = this.list[idx]
        item.images = new Array(10)
      },
      fn2() {
        let idx = 0
        let item = this.list[idx]
        item.images = new Array(1)
      },
      fn3() {
      },
      loadComponent() {
        this.showItem = true
      }
    },
    components: {
      PageList,
      [Button.name]: Button,
      Item,
      Echart: () => ({
        component: import('../components/echart'),
        loading: Item
      }),
      RecycleScroller,
      DynamicScroller,
      DynamicScrollerItem,
    }
  };
</script>

<style scoped lang="scss">
  .g-s-page{
    display:flex;
    flex-direction:column;
  }
  .content-wrap{
    flex:1;
    position:relative;
  }
  .content{
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    overflow-y: auto;
    .box{
      height:1000px;
      background:red;
      margin-bottom:10px;
    }
    img{
      width:100%;
    }
  }
</style>
