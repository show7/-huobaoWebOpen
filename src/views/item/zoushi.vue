<template>
  <div class="page">

    <div class="page-title">
      <OpenTitle title="基本走势">
        <Button
          v-for="item in tops"
          :key="item"
          :type="item === top ? 'primary' : 'default'"
          style="margin-right: 5px;"
          @click="selectTop(item)"
        >最近{{item}}期</Button>
      </OpenTitle>
    </div>

    <div class="page-content">
      <Trend :data="data" />
    </div>

  </div>
</template>

<script>
import OpenTitle from '@/components/open/Title.vue'
import Trend from '@/components/Trend.vue'
import { mapState } from 'vuex'
export default {
  name: 'home',
  components: {
    OpenTitle,
    Trend
  },
  data () {
    return {
      // 历史数据
      data: {},
      // 查询起始编号
      loading: false,
      top: 20,
      tops: [20, 50, 100]
    }
  },
  computed: {
    code () {
      return this.$route.params.code || ''
    },
    ...mapState({
      issueNo (state) {
        return (state.openData.find(item => item.code === this.code) || {}).issue_no
      }
    })
  },
  watch: {
    // 更换彩种
    code (v) {
      this.getData()
    },
    // 开奖了
    issueNo (v) {
      this.getData()
    }
  },
  methods: {
    // 获取路子数据
    getData () {
      this.loading = true
      this.$api.lottery.getTrend({
        item_code: this.code,
        top: this.top
      }).then(res => {
        this.data = res
      })
    },
    selectTop (top) {
      this.top = top
      this.getData()
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped lang="less">
  .page {
    &-title {
      margin-bottom: 15px;
    }
  }
</style>
