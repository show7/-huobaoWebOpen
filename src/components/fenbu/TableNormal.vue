<template>
  <Table :columns="columns" :data="data" :loading="loading">
    <template slot-scope="{ row }" slot="prizeNum">
      <div class="td-balls">
        <Balls
          :code="code"
          :numbers="row.prize_num"
          :attached="{ daxiao: row.daxiao.split(','), danshuang: row.danshuang.split(',') }"
          :selects="selects"
        />
      </div>
    </template>
    <template slot-scope="{ row }" slot="zonghe">
      <div class="td-zonghe">
        <span
          class="td-zonghe-item"
          v-for="(item, i) in row.zonghe.split(',')"
          :key="i"
          :style="{color: getColor(item)}"
        >{{item}}</span>
      </div>
    </template>
  </Table>
</template>

<script>
import mixin from './mixin.js'
export default {
  name: 'FenbuTableNormal',
  mixins: [mixin],
  data () {
    return {
      columns: [
        {
          title: '时间',
          key: 'open_time',
          width: 100
        },
        {
          title: '期数',
          key: 'issue_no',
          width: 100
        },
        {
          title: '号码',
          slot: 'prizeNum',
          align: 'center'
        },
        {
          title: '总和/形态',
          slot: 'zonghe',
          width: 240,
          align: 'center'
        }
      ]
    }
  },
  methods: {
    getColor (text) {
      const colors = {
        red: '#ed4014',
        green: '#19be6b',
        blue: '#2d8cf0'
      }
      const reds = ['大', '双', '龙', '对子']
      const greens = ['和']
      if (!isNaN(text)) {
        return colors.red
      }
      if (reds.includes(text)) {
        return colors.red
      }
      if (greens.includes(text)) {
        return colors.green
      }
      return colors.blue
    }
  }
}
</script>

<style scoped lang="less">
  .td-balls {
    display: flex;
    justify-content: center;
  }
  .td-zonghe {
    width: 100%;
    display: flex;
    justify-content: space-around;
    font-weight: bold;
  }
</style>
