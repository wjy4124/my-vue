<template>
  <div id="app">
    <err v-if="errorMask.visible"></err>
    <template v-else>
      <hd class="hd"></hd>
      <div class="ctn">
        <keep-alive>
          <router-view v-if="$route.meta.keep"/>
        </keep-alive>
        <router-view v-if="!$route.meta.keep"/>
      </div>
      <div class="nav-wrap">
        <btn-nav class="nav"></btn-nav>
      </div>
    </template>
  </div>
</template>

<script>
  import Hd from '@/components/hd'
  import Fd from '@/components/fd'
  import Err from '@/components/err'
  import BtnNav from '@/components/btnNav'
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        loading: false
      }
    },
    created() {
      console.info(2)
      console.info(2)
      console.info(2)
      this.loading = false
    },
    computed: {
      ...mapState({
        errorMask: state => state.app.errorMask
      })
    },
    components: {
      Hd,
      Err,
      Fd,
      BtnNav
    }
  }
</script>

<style lang="scss">
  *{
    padding:0;
    margin:0;
  }
  .g-s-page{
    position:absolute;
    top:0;
    bottom:0;
    right:0;
    left:0;
  }
</style>
<style scoped lang="scss">
  #app{
    display:flex;
    flex-direction:column;
    min-height:100vh;
  }
  .hd{
    background:red;
    height:30px;
    line-height:30px;
    color:#fff;
    text-align:center;
  }
  .ctn{
    position:relative;
    flex:1;
    display:flex;
    flex-direction:column;
  }
  .nav-wrap{
    height:50px;
  }
  .nav{
    height:50px;
    line-height:50px;
    background:green;
    color:#fff;
    position:fixed;
    bottom:0;
    z-index: 1;
    width:100%;
  }
</style>
