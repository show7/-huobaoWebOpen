<template>
  <div class="page">

    <div class="page-title">
      <OpenTitle title="两面统计">
        <div class="page-title-buttons">
          <Button :type="day1 == date ? 'primary' : 'text'" @click="changeDate(day1)">今天</Button>
          <Button :type="day2 == date ? 'primary' : 'text'" @click="changeDate(day2)">昨天</Button>
          <Button :type="day3 == date ? 'primary' : 'text'" @click="changeDate(day3)">前天</Button>
          <DatePicker type="date" :options="options" :value="date" placeholder="选择日期" style="width: 120px; margin-left: 20px;" @on-change="changeDate"></DatePicker>
        </div>
      </OpenTitle>
    </div>

    <div class="page-content">
      <Table :columns="columns" :data="data" :loading="loading" style="min-width: 300px;"></Table>
    </div>

  </div>
</template>

<script>
import OpenTitle from '@/components/open/Title.vue'
import moment from 'moment'
import { mapState } from 'vuex'
export default {
  name: 'Liangmian',
  components: {
    OpenTitle
  },
  data () {
    return {
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
      columns: [
        {
          title: '标题',
          key: 'title',
          width: 100
        },
        {
          title: '大',
          key: 'da',
          align: 'center'
        },
        {
          title: '小',
          key: 'xiao',
          align: 'center'
        },
        {
          title: '单',
          key: 'dan',
          align: 'center'
        },
        {
          title: '双',
          key: 'shuang',
          align: 'center'
        },
        {
          title: '龙',
          key: 'long',
          align: 'center'
        },
        {
          title: '虎',
          key: 'hu',
          align: 'center'
        }
      ],
      data: []
    }
  },
  computed: {
    code () {
      return this.$route.params.code || ''
    },
    // type() {
    //   return types[this.code].replace(/^[a-z]/, (L) => L.toUpperCase()) || 'Normal'
    // },
    ...mapState({
      issueNo (state) {
        return (state.openData.find(item => item.code === this.code) || {}).issue_no
      }
    })
  },
  watch: {
    // 更换彩种
    code (v) {
      this.date = moment().format('YYYY-MM-DD')
      this.getData()
    },
    // 开奖了
    issueNo (v) {
      if (this.date === this.day1) {
        this.getData()
      }
    }
  },
  methods: {
    changeDate (e) {
      this.date = e
      this.getData()
    },
    // 获取两面数据
    getData () {
      this.loading = true
      this.$api.lottery.getLiangmian({
        item_code: this.code,
        datetime: this.date
      }).then(res => {
        let balls = res.ball.map(item => {
          let num = item[2].split(',')
          return {
            title: item[0],
            da: num[0],
            xiao: num[1],
            dan: num[2],
            shuang: num[3],
            long: num[4] || '-',
            hu: num[5] || '-'
          }
        })
        this.data = balls
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
