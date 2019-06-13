<template>
  <div class="home">
    <div class="home-title">{{catname}}</div>
    <LotteryCard
      v-for="item in items"
      :key="item.code"
      :data="item"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import LotteryCard from '@/components/card/index.vue'
import { mapState } from 'vuex'
export default {
  name: 'home',
  components: {
    LotteryCard
  },
  data () {
    return {

    }
  },
  computed: {
    cat () {
      return this.$route.params.cat || 'hot'
    },
    ...mapState({
      // 箭头函数可使代码更简练
      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      items (state) {
        if (this.cat === 'hot') {
          return state.openData.filter(item => Number(item.is_hot) > 0)
        } else {
          return state.openData.filter(item => item.category_code === this.cat)
        }
      },
      catname (state) {
        if (this.cat === 'hot') {
          return '热门彩种'
        } else {
          return (state.categories.find(item => item.code === this.cat) || {}).name
        }
      }
    })
  }
}
</script>

<style lang="less" scoped>
  .home {
    display: flex;
    flex-wrap: wrap;
    &-title {
      display: none;
      width: 100%;
      font-size: 20px;
      margin: 10px 10px 0 10px;
      padding: 5px 0;
      background: #FFF;
    }
  }
  @media screen and (max-width: 800px) {
    .home-title {
      display: block;
    }
  }
</style>
