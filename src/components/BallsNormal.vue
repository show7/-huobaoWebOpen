<template>
  <div class="balls-normal">
    <BallNormal
      v-for="(item, i) in numbers"
      :key="i"
      :number="item"
      :type="type"
      :opacity="opacity[i]"
    />
  </div>
</template>

<script>
import BallNormal from './BallNormal.vue'
export default {
  name: 'BallsNormal',
  components: {
    BallNormal
  },
  props: {
    numbers: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    },
    type: {
      type: String,
      required: true
    },
    selects: {
      type: Array,
      required: false,
      default: () => []
    },
    attached: {
      type: Object,
      required: false,
      default: () => {
        return {
          daxiao: [],
          dashuang: []
        }
      }
    }
  },
  computed: {
    opacity () {
      return this.numbers.map((item, i) => {
        if (this.selects.length === 0) {
          return false
        }
        if (this.selects.includes(item) || this.selects.includes(Number(item))) {
          return false
        }
        if (this.attached.daxiao && this.selects.includes(this.attached.daxiao[i])) {
          return false
        }
        if (this.attached.danshuang && this.selects.includes(this.attached.danshuang[i])) {
          return false
        }
        return true
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .balls-normal {
    display: flex;
    align-items: center;
  }
</style>
