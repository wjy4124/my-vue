<template>
	<div class="err">
    {{errorMask.m}} - {{errorMask.s}}
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "err",
    computed: {
      ...mapState({
        errorMask: state => state.app.errorMask
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>
