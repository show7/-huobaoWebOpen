<template>
  <div class="balls-lhc">
    <BallLhc v-for="(item, i) in numbersPre" :key="i" :number="item" :color="attached.color[i]" :sx="attached.sx[i]" :visibleSx="visibleSx"></BallLhc>
    <div class="balls-lhc-plus">+</div>
    <BallLhc :number="numbersLast" :color="attached.color[6]" :sx="attached.sx[6]" :visibleSx="visibleSx"></BallLhc>
  </div>
</template>

<script>
import BallLhc from './BallLhc.vue'
export default {
  name: 'BallsLhc',
  components: {
    BallLhc
  },
  props: {
    numbers: {
      type: Array,
      required: true
    },
    attached: {
      type: Object,
      required: true
    },
    visibleSx: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    numbersPre () {
      return this.numbers.slice(0, 6)
    },
    numbersLast () {
      return this.numbers[6]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .balls-lhc {
    display: flex;
    align-items: center;
    &-plus {
      font-size: 20px;
      margin: 0 8px 0 5px;
    }
  }
</style>
