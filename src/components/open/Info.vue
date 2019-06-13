<template>
  <div class="open-info">
    <div class="open-info-icon">
      <img :src="item.image_url" alt="">
    </div>
    <div class="open-info-data">
      <div class="open-info-title">
        <img class="open-info-title-icon" :src="item.image_url" alt="">
        <h1>{{item.name}}</h1>
        <span>第 {{item.no}} 期开奖</span>
        <span v-if="item.category_code !== 'dpc'">已开 {{item.had_open_num}} 期，还有 {{item.remain_num}} 期</span>
      </div>
      <div class="open-info-balls">
        <Balls
          :code="code"
          :numbers="item.prize_num"
          :attached="item.attached"
          :visibleSx="true"
        ></Balls>
      </div>
    </div>
    <div class="open-info-state">
      <Countdown
        :time="item.time"
        :opening="isOpening"
      />
    </div>
  </div>
</template>

<script>
import Balls from '@/components/Balls.vue'
import Countdown from '@/components/Countdown.vue'
import { mapState } from 'vuex'
export default {
  name: 'OpenInfo',
  components: {
    Balls,
    Countdown
  },
  data () {
    return {
      isOpening: false
    }
  },
  computed: {
    code () {
      return this.$route.params.code || ''
    },
    ...mapState({
      // 箭头函数可使代码更简练
      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      item (state) {
        return state.openData.find(item => item.code === this.code) || {}
      }
    }),
    remainTime () {
      return this.item.time
    },
    issueNo () {
      return this.item.issue_no
    }
  },
  watch: {
    remainTime (v) {
      if (v <= 0) {
        // 设置为开奖中
        this.$store.commit('setOpening', this.code)
        this.isOpening = true
      }
    },
    issueNo (v) {
      // 期号变化，说明获取了新的消息推送
      this.$store.dispatch('getOpen', this.code)
      this.isOpening = false
    }
  },
  mounted () {
    this.$store.dispatch('getOpen', this.code)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .open-info {
    display: flex;
    background: #FFF;
    &-icon {
      width: 160px;
      height: 160px;
      border-right: 1px solid #e8eaec;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        height: 100px;
        width: 100px;
        // border-radius: 50%;
        display: block;
        // background: #EEE;
      }
    }
    &-data {
      flex: 1;
      padding: 20px;
    }
    &-balls {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &-title {
      display: flex;
      align-items: baseline;
      &-icon {
        display: none;
      }
      h1 {
        margin-right: 20px;
      }
      span {
        margin-right: 10px;
        &:nth-child(2) {
          font-size: 14px;
        }
      }
    }
    &-state {
      width: 220px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  @media screen and (max-width: 800px) {
    .open-info {
      flex-direction: column;
      position: relative;
      &-icon {
        display: none;
      }
      &-balls {
        min-height: 40px;
        margin: 10px 0 0 10px;
        padding: 10px 0;
        border-top: 1px solid #e8eaec;
      }
      &-title {
        flex-direction: column;
        position: relative;
        padding-left: 110px;
        height: 100px;
        &-icon {
          display: block;
          position: absolute;
          left: 0;
          width: 100px;
          height: 100px;
        }
        h1 {
          font-size: 18px;
        }
      }
      &-state {
        position: absolute;
        left: 115px;
        top: 75px;
        width: auto;
        height: 40px;
      }
      &-data {
        padding: 10px;
      }
    }
  }
</style>
