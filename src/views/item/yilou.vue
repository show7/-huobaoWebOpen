<template>
  <div class="page">

    <div class="page-title">
      <OpenTitle title="两面长龙">

      </OpenTitle>
    </div>

    <div class="page-content">
      <Table :columns="columns" :data="data" :loading="loading"></Table>
    </div>

  </div>
</template>

<script>
import OpenTitle from '@/components/open/Title.vue'
import { mapState } from 'vuex'
export default {
  name: 'home',
  components: {
    OpenTitle
  },
  data () {
    return {
      columns: [
        {
          title: '玩法',
          key: 'off_name',
          align: 'center'
        },
        {
          title: '遗漏期数',
          key: 'off_count',
          align: 'center'
        }
      ],
      // 历史数据
      data: [],
      // 查询起始编号
      loading: false
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
      this.$api.lottery.getYilou({
        item_code: this.code
      }).then(res => {
        this.data = res
        this.loading = false
      })
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
