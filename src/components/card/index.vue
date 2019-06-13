<template>
  <div class="card tran3">
    <div class="card-title">
      <img :src="data.image_url" alt="">
      <div class="card-info">
        <h2>{{data.name}} <span>第{{data.no}}期开奖</span></h2>
        <p>距下期开奖<span style="margin-left: 5px;"></span><span v-if="countdown[0] !='00'">{{countdown[0]}}时</span> <span>{{countdown[1]}}分{{countdown[2]}}秒</span></p>
      </div>
    </div>
    <div class="card-balls">
      <Balls
        :code="data.code"
        :numbers="data.prize_num"
        :attached="data.attached"
      />
    </div>
    <!-- <div class="card-data">
      <LotteryCardData></LotteryCardData>
    </div> -->
    <div class="card-buttons">
      <LotteryCardButtons :data="data"></LotteryCardButtons>
    </div>
  </div>
</template>

<script>
import LotteryCardButtons from './Buttons.vue'
// import LotteryCardData from './Data.vue'
import Balls from '@/components/Balls.vue'
import { formatCountdown } from '@/utils/time.js'
export default {
  name: 'LotteryCard',
  components: {
    LotteryCardButtons,
    // LotteryCardData,
    Balls
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    countdown () {
      return formatCountdown(this.data.time)
    },
    remainTime () {
      return this.data.time
    },
    issueNo () {
      return this.data.issue_no
    }
  },
  watch: {
    remainTime (v) {
      if (v <= 0) {
        // 设置为开奖中
        this.$store.commit('setOpening', this.data.code)
      }
    },
    issueNo (v) {
      // 期号变化，说明获取了新的消息推送
      this.$store.dispatch('getOpen', this.data.code)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .card {
    width: 480px;
    background: #FFF;
    margin: 10px;
    border-radius: 4px;
    overflow: hidden;
    &:hover {
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    &-title {
      padding: 24px 24px 10px 24px;
      display: flex;
      align-items: center;
      img {
        display: block;
        width: 100px;
        height: 100px;
        // background: #EEE;
      }
    }
    &-info {
      text-align: left;
      margin-left: 20px;
      h2 {
        margin-bottom: 10px;
        font-size: 18px;
        span {
          font-size: 16px;
          color: #333;
        }
      }
      p {
        font-size: 14px;
        color: #666;
        span {
          color: #ed4014;
          font-weight: bold;
        }
      }
    }
    &-balls {
      padding: 0 30px;
      height: 60px;
      display: flex;
      align-items: center;
    }
  }
  @media screen and (max-width: 800px) {
    .card {
      &-title {
        padding: 10px;
        img {
          width: 72px;
          height: 72px;
        }
      }
      &-info {
        margin-left: 10px;
        h2 {
          font-size: 16px;
          span {
            font-size: 14px;
          }
        }
        p {
          font-size: 12px;
        }
      }
      &-balls {
        padding: 10px;
      }
    }
  }
</style>
