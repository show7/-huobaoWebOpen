<template>
  <div class="balls">
    <component
      v-if="!state"
      v-bind:is="type === 'lhc' ? 'BallsLhc' : 'BallsNormal'"
      :type="type"
      :numbers="numbersArray"
      :attached="attached"
      :visibleSx="visibleSx"
      :selects="selects"
    ></component>
    <div v-else class="balls-state">
      <Spin v-if="numbers.includes('正在')"></Spin>
      <Icon v-if="numbers === '已封盘'" type="md-lock" />
      <span>{{numbers}}</span>
    </div>
  </div>
</template>

<script>
import BallsNormal from './BallsNormal.vue'
import BallsLhc from './BallsLhc.vue'
import { types } from '@/config'
export default {
  name: 'Balls',
  components: {
    BallsNormal,
    BallsLhc
  },
  props: {
    code: {
      type: String,
      required: true
    },
    numbers: {
      type: String,
      required: false,
      default: ''
    },
    attached: {
      type: Object,
      required: false,
      default: () => {
        return {
          color: [],
          sx: []
        }
      }
    },
    visibleSx: {
      type: Boolean,
      required: false,
      default: false
    },
    selects: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  computed: {
    numbersArray () {
      return this.numbers ? this.numbers.split(',') : []
    },
    type () {
      return types[this.code] || 'normal'
    },
    // 其他状态
    state () {
      return /正在|封盘/.test(this.numbers)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .balls {
    display: flex;
    align-items: center;
    &-state {
      font-size: 16px;
      display: flex;
      align-items: center;
      &>span {
        margin-left: 10px;
      }
    }
  }
</style>
