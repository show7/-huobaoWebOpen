<template>
  <div class="lhc-ball">
    <div class="ball" :class="[color]">
      {{number}}
    </div>
    <div class="sx" v-if="visibleSx">{{sx}}</div>
  </div>
</template>

<script>
export default {
  name: 'LhcBall',
  props: {
    color: {
      type: String,
      required: false,
      // normal,pk,k3,lhc
      default: 'green'
    },
    sx: {
      type: String,
      required: false,
      // normal,pk,k3,lhc
      default: '猪'
    },
    number: {
      type: String,
      required: false,
      default: '1'
    },
    visibleSx: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .lhc-ball {
    margin-right: 3px;
  }
  .sx {
    margin: 5px 0;
    font-size: 13px;
  }
  .ball {
    width: 36px;
    height: 36px;
    line-height: 26px;
    font-size: 16px;
    border-radius: 50%;
    &.green {
      border: 6px solid #19be6b;
    }
    &.red {
      border: 6px solid #ed4014;
    }
    &.blue {
      border: 6px solid #2d8cf0;
    }
  }
</style>
