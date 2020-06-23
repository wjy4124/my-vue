<template>
  <infinite-loading
    :identifier="infiniteId"
    @infinite="$emit('infinite', $event)"
  >
    <div slot="spinner">
      <slot name="spinner">Loading...</slot>
    </div>
    <div slot="no-more">
      <slot name="no-more">No more message</slot>
    </div>
    <div slot="no-results">
      <slot name="no-results">No results message</slot>
    </div>
    <div slot="error" slot-scope="{ trigger }">
      <slot name="error" :trigger="trigger">Error message, click <a href="javascript:;" @click="trigger">here</a> to retry</slot>
    </div>
  </infinite-loading>
</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading';
  export default {
    name: "infinitedScroll",
    data() {
      return {
        infiniteId: 0,
      }
    },
    methods: {
      reset() {
        this.infiniteId++
      }
    },
    components: {
      InfiniteLoading
    }
  }
</script>

<style scoped>

</style>
