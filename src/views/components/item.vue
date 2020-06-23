<template>
	<div class="item">
    <img class="img" v-if="image" :key="image" v-lazy="image">
    <p>{{text}}</p>
    <p>loading</p>
  </div>
</template>

<script>
  export default {
    props: ['text', 'image'],
    name: "item"
  }
</script>

<style lang="scss" scoped>
  .img{
    width:50px;
    height:50px;
  }
  .item{
    text-align:center;
    background:#ccc;
    border:1px solid red;
    word-break:break-all;
  }
</style>
