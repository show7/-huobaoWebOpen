<template>
  <div class="page">

    <div class="page-title">
      <OpenTitle title="号码分布">
        <Button type="primary" v-if="selects.length > 0" shape="circle" @click="clearSelects">清除筛选</Button>
      </OpenTitle>
    </div>

    <div class="page-content">
      <div class="page-shaixuan">
        <div class="page-shaixuan-row">
          <div class="page-shaixuan-row-title">号码分布</div>
          <div class="page-shaixuan-row-options">
            <span v-for="num in nums" :key="num" @click="select('haoma', num)" :class="{active: selects.includes(num)}">{{num}}</span>
          </div>
        </div>
        <div class="page-shaixuan-row" v-if="code !== 'pl3'">
          <div class="page-shaixuan-row-title">大小单双</div>
          <div class="page-shaixuan-row-options">
            <span v-for="d in dxds" :key="d" @click="select('dxds', d)" :class="{active: selects.includes(d)}">{{d}}</span>
          </div>
        </div>
      </div>
      <div class="page-table">
        <component
          v-bind:is="'FenbuTable' + type"
          :data="data"
          :loading="index === 0 && loading"
          :selects="selects"
          :style="{ minWidth: minWidth + 'px' }"
        />
      </div>
      <Button style="margin-top: 10px;" type="primary" :loading="loading" @click="addMore" v-if="index !== 0 && !nomore">加载更多</Button>
    </div>

  </div>
</template>

<script>
import OpenTitle from '@/components/open/Title.vue'
import FenbuTableNormal from '@/components/fenbu/TableNormal.vue'
import FenbuTableK3 from '@/components/fenbu/TableK3.vue'
import FenbuTablePk from '@/components/fenbu/TablePk.vue'
import FenbuTableLhc from '@/components/fenbu/TableLhc.vue'
import FenbuTablePl3 from '@/components/fenbu/TablePl3.vue'
import moment from 'moment'
import { types } from '@/config'
import { mapState } from 'vuex'
export default {
  name: 'home',
  components: {
    OpenTitle,
    FenbuTableNormal,
    FenbuTableK3,
    FenbuTablePk,
    FenbuTableLhc,
    FenbuTablePl3
  },
  data () {
    return {
      // 历史数据
      data: [],
      // 查询日期
      date: moment().format('YYYY-MM-DD'),
      // 查询起始编号
      dxds: ['大', '小', '单', '双'],
      nums: [],
      mode: 'haoma',
      selects: [],
      loading: false,
      nomore: false,
      index: 0
    }
  },
  computed: {
    code () {
      return this.$route.params.code || ''
    },
    type () {
      console.log(types[this.code])
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
      }
    })
  },
  watch: {
    // 更换彩种
    code (v) {
      this.index = 0
      this.nomore = true
      this.getHistory()
    },
    // 开奖了
    issueNo (v, ov) {
      if (ov.split('_')[0] !== 'undefined' && ov.split('_')[0] !== v.split('_')[0]) {
        return
      }
      if (ov.split('_')[0] !== 'undefined') {
        this.addHistory()
      } else {
        this.getHistory()
      }
    }
  },
  methods: {
    // 获取历史
    getHistory () {
      this.loading = true
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
        this.nums = res.nums.split(',').map(item => Number(item))
        this.index += res.issue_list.length
        this.nomore = res.issue_list.length === 0
        this.loading = false
      })
    },
    addHistory () {
      this.$api.lottery.getHistoryByDay({
        item_code: this.code,
        datetime: this.date,
        index: 0,
        size: 1
      }).then(res => {
        this.data = [...res.issue_list, ...this.data]
        this.index += 1
      })
    },
    // 加载更多
    addMore () {
      if (this.loading) {
        return
      }
      this.getHistory()
    },
    // 筛选号码
    select (mode, num) {
      if (mode !== this.mode) {
        this.selects = []
      }
      this.mode = mode
      if (this.selects.includes(num)) {
        this.selects = this.selects.filter(item => item !== num)
      } else {
        this.selects = [...this.selects, num]
      }
    },

    clearSelects () {
      this.selects = []
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
@import '~@/theme/index.less';
  .page {
    &-title {
      height: 50px;
    }
    &-shaixuan {
      margin-bottom: 10px;
      &-row {
        font-size: 14px;
        line-height: 30px;
        display: flex;
        align-items: flex-start;
        &-title {
          width: 80px;
          text-align: left;
          color: #515a6e;
          font-weight: bold;
        }
        &-options {
          flex: 1;
          text-align: left;
          display: flex;
          flex-wrap: wrap;
          span {
            width: 80px;
            text-align: center;
            border: 1px solid #dcdee2;
            margin: 0 5px 5px 0;
            border-radius: 4px;
            color: #333;
            &:hover,&.active {
              background: @primary-color;
              border: 1px solid @primary-color;
              color: #FFF;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 800px) {
    .page-title {
      height: auto;
    }
    .page-shaixuan-row-options span {
      &:hover {
        background: transparent;
        color: #333;
        border: 1px solid #dcdee2;
      }
      &.active:hover {
        background: @primary-color;
        border: 1px solid @primary-color;
        color: #FFF;
      }
    }
    .page-content {
      overflow: hidden;
    }
    .page-table {
      width: 100%;
      overflow-x: auto;
    }
  }
</style>
