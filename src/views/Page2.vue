<template>
  <div class="g-s-page">
    <div class="content-wrap">
      <DynamicScroller
        ref="scroller"
        class="content"
        :items="list"
        :buffer="10"
        :min-item-size="20"
        key-field="id"
      >
        <template
          v-slot="{ item, active }"
        >
          <DynamicScrollerItem
            :item="item"
            :active="active"
          >
            <item
              class="i"
              :image="`${item.images[0]}`"
              :text="item | itemText"
            ></item>
          </DynamicScrollerItem>
        </template>
        <template #after>
          <page-list
            :api="page"
            :params="params"
            @ajaxDone="ajaxDone"
          ></page-list>
        </template>
      </DynamicScroller>
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
  import Item from './components/item'
  import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
  import { Button } from 'vant'
  import { page } from '../api/test'
  import PageList from '@/components/pageList'

  export default {
    data() {
      return {
        page,
        params: {},
        list: []
      }
    },
    created() {
    },
    filters: {
      itemText(item) {
        let imgsLen = item.images.length
        let text = item.id
        while(imgsLen > 1) {
          text += item.id
          imgsLen--
        }
        return text
      }
    },
    methods: {
      ajaxDone({data, page}) {
        this.list.push(...data)
      },
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
      }
    },
    components: {
      PageList,
      [Button.name]: Button,
      Item,
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
    .i{
      padding-bottom:10px;
      position:relative;
      z-index:9;
      &.active{
        z-index: 10;
      }
    }
    .item{
      img{
        width:50px;
        height:50px;
      }
    }
  }
</style>
