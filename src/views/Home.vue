<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {api1, page} from '@/api/test'
import {Toast} from 'vant'
export default {
  name: 'Home',
  data() {
    return {
      echartVisible: false,
      count: 0
    }
  },
	mounted() {
    page({
      params: {
        shop_id: 'j54g72862j3630ed1b',
        page: 1,
        size: 10
      }
    }).then(e => {
      console.info(e)
    })
	},
  methods: {
    get(l) {
      return api1(++this.count, {
        params: {
          status: 500,
          msg: 1
        },
        cache: {
          // ignoreCache: false
        },
        'axios-retry': {
          retries: 0
        }
      })
    },
    click() {
      this.echartVisible = true
    }
  },
  components: {
    HelloWorld,
    Echart: () => import(/* webpackChunkName: "echart" */ '@/components/echart')
  }
}
</script>
