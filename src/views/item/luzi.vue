<template>
  <div class="page">

    <div class="page-title">
      <OpenTitle title="路子统计">
        <!-- 不同彩种的路子展示名称的区分展示 -->
        <Select v-model="num" style="width:200px">
          <Option  v-for="(item, i) in Array.from({length: count})" :value="i" :key="i">第{{ i + 1 }}{{unit}}</Option>
        </Select>
      </OpenTitle>
    </div>

    <div class="page-content">
      <div v-if="data.length == 0" style="margin: 60px 0;display:flex;justify-content: center;">
        <Spin></Spin>
      </div>
      <div class="luzi" v-for="(item, i) in data" :key="i">
        <div class="luzi-title">{{item.title}}</div>
        <Road :data="item.list[0].length == 1 ? item.list : item.list[num]"></Road>
      </div>
    </div>

  </div>
</template>

<script>
import OpenTitle from '@/components/open/Title.vue'
import Road from '@/components/Road.vue'
import { mapState } from 'vuex'
import { types } from '@/config'
export default {
  name: 'home',
  components: {
    OpenTitle,
    Road
  },
  data () {
    return {
      // 历史数据
      data: [],
      // 球号
      num: 0,
      count: 5,
      // 查询起始编号
      loading: false
    }
  },
  computed: {
    code () {
      return this.$route.params.code || ''
    },
    type () {
      return types[this.code].replace(/^[a-z]/, (L) => L.toUpperCase()) || 'Normal'
    },
    unit () {
      return this.type === 'Pk' ? '名' : '球'
    },
    ...mapState({
      issueNo (state) {
        return state.openData.find(item => item.code === this.code).issue_no
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
      this.$api.lottery.getLuzi({
        item_code: this.code
      }).then(res => {
        this.data = res.sort.map(item => {
          return {
            name: item,
            title: res.dic[item],
            list: res.list[item]
          }
        })
        let counts = this.data.reduce((total, item) => {
          if (item.list[0].length > 1) {
            total.push(item.list.length)
          }
          return total
        }, [])
        this.count = Math.max(...counts)
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
  .luzi {
    &-title {
      font-size: 16px;
      margin: 20px 0 10px 0;
    }
  }
</style>
