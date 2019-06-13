<template>
  <div class="open-title">
    <div class="open-title-con">{{title}}</div>
    <div class="open-title-slot">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OpenTitle',
  components: {
  },
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .open-title {
    display: flex;
    justify-content: space-between;
    &-con {
      font-size: 18px;
    }
  }
  @media screen and (max-width: 800px) {
    .open-title {
      flex-direction: column;
      align-items: flex-start;
      &-slot {
        margin-top: 10px;
      }
    }
  }
</style>
