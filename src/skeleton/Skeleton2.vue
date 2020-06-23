<template>
  <div class="skeleton-wrapper">
    <e></e>
  </div>
</template>

<script>
  import e from './e'

  export default {
    name: 'skeleton',
    components: {
      e
    }
  };
</script>

<style scoped>
  .skeleton-header {
    height: 152px;
    background: grey;
    margin-top: 60px;
    width: 152px;
    margin: 60px auto;
  }
  .skeleton-block {
    display: flex;
    flex-direction: column;
    padding-top: 8px;
  }
</style>
