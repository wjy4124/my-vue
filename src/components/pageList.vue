<template>
  <div class="page">
    <slot></slot>
    <infinited-scroll ref="check" @infinite="infiniteHandler">
      <template slot="spinner">
        <slot name="spinner"></slot>
      </template>
      <template slot="no-more">
        <slot name="no-more"></slot>
      </template>
      <template slot="no-results">
        <slot name="no-results"></slot>
      </template>
      <template slot="error" slot-scope="{ trigger }">
        <slot name="error" :trigger="trigger"></slot>
      </template>
    </infinited-scroll>
  </div>
</template>

<script>
  import infinitedScroll from '@/components/infinitedScroll'

  export default {
    props: {
      params: {
        default() {
          return {}
        }
      },
      api: {}
    },
    data() {
      return {
        page: 1
      }
    },
    watch: {
      api() {
        this.reset()
      },
      params: {
        deep: true,
        handler(v){
          this.reset()
        }
      }
    },
    methods: {
      infiniteHandler($state) {
        this.api({
          params: Object.assign({
            page: this.page,
            size: 10
          }, this.params)
        }).then(res => {
          let {data, page} = res
          this.$emit('ajaxDone', res)
          if (data.length) {
            this.page += 1
            $state.loaded();
          } else {
            $state.complete();
          }
        }).catch(e => {
          $state.error();
        })
      },
      reset() {
        this.page = 1
        this.$refs.check.reset()
      }
    },
    components: {
      infinitedScroll,
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
  .content{
    height:400px;
    overflow:auto;
  }
  .item{
    height:100px;
    background:#ccc;
    margin-bottom:5px;
  }
</style>
