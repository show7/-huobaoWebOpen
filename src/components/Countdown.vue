<template>
  <div class="countdown">
    <div v-if="!opening" class="countdown-title">离开奖还有</div>
    <div v-if="!opening" class="countdown-time">
      <span v-if="countdown[0] != '00'">{{countdown[0]}}</span>
      <span v-if="countdown[0] != '00'">时</span>
      <span>{{countdown[1]}}</span>
      <span>分</span>
      <span>{{countdown[2]}}</span>
      <span>秒</span>
    </div>
    <div v-if="opening" class="countdown-opening">正在开奖…</div>
  </div>
</template>

<script>
import { formatCountdown } from '@/utils/time.js'
export default {
  name: 'Countdown',
  props: {
    time: {
      type: Number,
      require: false,
      default: 0
    },
    opening: {
      type: Boolean,
      require: false,
      default: false
    }
  },
  computed: {
    countdown () {
      return formatCountdown(this.time)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .countdown {
    &-title {
      margin-bottom: 5px;
      font-size: 16px;
    }
    &-opening {
      background: #515a6e;
      color: #ff9900;
      padding: 10px 20px;
      font-size: 16px;
      border-radius: 4px;
    }
    &-time {
      display: flex;
      align-items: center;
      font-size: 14px;
      span:nth-child(odd) {
        background: #515a6e;
        color: #ff9900;
        height: 40px;
        width: 40px;
        margin: 0 5px;
        line-height: 40px;
        font-size: 22px;
        border-radius: 4px;
      }
    }
  }
  @media screen and (max-width: 800px) {
    .countdown {
      &-title {
        display: none;
      }
      &-opening {
        padding: 5px 10px;
      }
      &-time {
        span:nth-child(odd) {
          font-size: 18px;
          height: 36px;
          width: 36px;
          line-height: 36px;
        }
      }
    }
  }
</style>
