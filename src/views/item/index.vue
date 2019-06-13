<template>
  <div class="item">
    <div class="item-header">
      <OpenInfo></OpenInfo>
      <OpenNav></OpenNav>
    </div>
    <div class="item-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import OpenInfo from '@/components/open/Info.vue'
import OpenNav from '@/components/open/Nav.vue'
import { mapState } from 'vuex'
export default {
  name: 'home',
  components: {
    OpenInfo,
    OpenNav
  },
  computed: {
    code () {
      return this.$route.params.code || ''
    },
    ...mapState({
      // 箭头函数可使代码更简练
      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      item (state) {
        return state.all.find(item => item.code === this.code) || {}
      }
    })
  }
}
</script>

<style scoped lang="less">
  .item {
    padding: 15px 0;
    &-body {
      background: #FFF;
      min-height: 200px;
      margin-top: 15px;
      padding: 15px;
      overflow-x: auto;
    }
  }
</style>
