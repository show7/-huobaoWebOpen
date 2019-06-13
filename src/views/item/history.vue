<template>
  <div class="page">

    <div class="page-title">
      <OpenTitle title="历史记录">
        <div class="page-title-buttons" v-if="cat !== 'dpc'">
          <Button :type="day1 == date ? 'primary' : 'text'" @click="changeDate(day1)">今天</Button>
          <Button :type="day2 == date ? 'primary' : 'text'" @click="changeDate(day2)">昨天</Button>
          <Button :type="day3 == date ? 'primary' : 'text'" @click="changeDate(day3)">前天</Button>
          <DatePicker :options="options" type="date" :value="date" placeholder="选择日期" style="width: 120px; margin-left: 20px;" @on-change="changeDate"></DatePicker>
        </div>
      </OpenTitle>
    </div>

    <div class="page-content">
      <div class="page-table">
        <component
          v-bind:is="'HistoryTable' + type"
          :data="data"
          :loading="index === 0 && loading"
          :style="{ minWidth: minWidth + 'px' }"
        />
      </div>
      <Button style="margin-top: 10px;" type="primary" :loading="loading" @click="addMore" v-if="index !== 0 && !nomore">加载更多</Button>
    </div>

  </div>
</template>

<script>
import OpenTitle from '@/components/open/Title.vue'
import HistoryTableNormal from '@/components/history/TableNormal.vue'
import HistoryTableK3 from '@/components/history/TableK3.vue'
import HistoryTablePk from '@/components/history/TablePk.vue'
import HistoryTableLhc from '@/components/history/TableLhc.vue'
import HistoryTablePl3 from '@/components/history/TablePl3.vue'
import moment from 'moment'
import { types } from '@/config'
import { mapState } from 'vuex'
export default {
  name: 'home',
  components: {
    OpenTitle,
    HistoryTableNormal,
    HistoryTableK3,
    HistoryTablePk,
    HistoryTableLhc,
    HistoryTablePl3
  },
  data () {
    return {
      // 历史数据
      data: [],
      // 查询日期
      date: moment().format('YYYY-MM-DD'),
      // 今天
      day1: moment().format('YYYY-MM-DD'),
      // 昨天
      day2: moment().subtract(1, 'days').format('YYYY-MM-DD'),
      // 前天
      day3: moment().subtract(2, 'days').format('YYYY-MM-DD'),
      options: {
        disabledDate (date) {
          return date > new Date()
        }
      },
      // 查询起始编号
      loading: false,
      index: 0,
      nomore: false
    }
  },
  computed: {
    code () {
      return this.$route.params.code || ''
    },
    type () {
      return types[this.code].replace(/^[a-z]/, (L) => L.toUpperCase()) || 'Normal'
    },
    minWidth () {
      if (this.type === 'Pk') {
        return 800
      }
      if (this.type === 'K3') {
        return 600
      }
      if (this.type === 'Lhc') {
        return 700
      }
      return 700
    },
    ...mapState({
      issueNo (state) {
        let od = state.openData.find(item => item.code === this.code) || {}
        return od.code + '_' + od.issue_no
      },
      cat (state) {
        return (state.openData.find(item => item.code === this.code) || {}).category_code
      }
    })
  },
  watch: {
    // 更换彩种
    code (v) {
      this.date = moment().format('YYYY-MM-DD')
      this.index = 0
      this.nomore = true
      this.getHistory()
    },
    // 开奖了
    issueNo (v, ov) {
      if (ov.split('_')[0] !== 'undefined' && ov.split('_')[0] !== v.split('_')[0]) {
        return
      }
      if (this.date === this.day1) {
        if (ov.split('_')[0] !== 'undefined') {
          this.addHistory()
        } else {
          this.getHistory()
        }
      }
    }
  },
  methods: {
    // 获取历史
    getHistory () {
      this.loading = true
      if (this.type !== 'Lhc') {
        this.$api.lottery.getHistoryByDay({
          item_code: this.code,
          datetime: this.date,
          index: this.index,
          size: 50
        }).then(res => {
          if (this.index === 0) {
            this.data = res.issue_list
          } else {
            this.data = [...this.data, ...res.issue_list]
          }
          this.index += res.issue_list.length
          this.nomore = res.issue_list.length === 0
          this.loading = false
        })
      } else {
        this.$api.lottery.getHistoryLhc({
          code: this.code,
          year: moment().format('YYYY'),
          index: this.index,
          size: 50
        }).then(res => {
          if (this.index === 0) {
            this.data = res
          } else {
            this.data = [...this.data, ...res]
          }
          this.index += res.length
          this.nomore = res.length === 0
          this.loading = false
        })
      }
    },
    // 更换日期
    changeDate (e) {
      if (e !== this.date) {
        this.date = e
        this.getHistory()
      }
    },
    // 加载更多
    addMore () {
      if (this.loading) {
        return
      }
      this.getHistory()
    },
    addHistory () {
      if (this.type !== 'Lhc') {
        this.$api.lottery.getHistoryByDay({
          item_code: this.code,
          datetime: this.date,
          index: 0,
          size: 1
        }).then(res => {
          this.data = [...res.issue_list, ...this.data]
          this.index += 1
        })
      } else {
        this.$api.lottery.getHistoryLhc({
          code: this.code,
          year: moment().format('YYYY'),
          index: 0,
          size: 1
        }).then(res => {
          this.data = [...res, this.data]
          this.index += 1
        })
      }
    }
  },
  mounted () {
    if (this.issueNo.split('_')[0] !== 'undefined') {
      this.getHistory()
    }
  }
}
</script>

<style scoped lang="less">
  .page {
    &-title {
      margin-bottom: 15px;
    }
  }
  .page-content {
    overflow: hidden;
  }
  .page-table {
    width: 100%;
    overflow-x: auto;
  }
</style>
