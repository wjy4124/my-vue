<template>
  <div class="page">
    <div class="tab">
      <div class="type" @click="changeType(v)" v-for="v in 4" :key="v">{{v}}</div>
    </div>

    <div class="content">
      <page-list
        :api="api"
        :params="params"
        @ajaxDone="ajaxDoneHandler"
      >
        <div @click="$router.push({name: 'Page3'})" v-for="(item, $index) in list" :key="$index">
          <!-- Hacker News item loop -->
          <img class="img" :src="item.images[0]" alt="">
          <div class="item">{{item.id}}</div>
        </div>
      </page-list>
    </div>
  </div>
</template>

<script>
  import { page } from '../api/test'
  import PageList from '@/components/pageList'
  import back from './mixins/back'

  export default {
    mixins: [back],
    data() {
      return {
        list: [],
        api: page,
        params: {
          type: 1
        }
      }
    },
    methods: {
      ajaxDoneHandler({data}) {
        this.list.push(...data)
      },
      changeType(v) {
        this.list = []
        this.params.type = v
      }
    },
    components: {
      PageList,
    }
  };
</script>

<style scoped lang="scss">
  .page{
    display:flex;
    flex-direction:column;
  }
  .tab{
    height:30px;
    display:flex;
  }
  .type{
    margin:0 10px;
  }
  .item{
    height:100px;
    background:#ccc;
    margin-bottom:5px;
  }
  .img{
    width:50px;
    height:50px;
  }
</style>
