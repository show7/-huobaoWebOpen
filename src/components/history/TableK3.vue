<template>
  <Table :columns="columns" :data="data" :loading="loading">
    <template slot-scope="{ row }" slot="prizeNum">
      <div class="td-balls">
        <Balls
          :code="code"
          :numbers="row.prize_num"
          :attached="row.attached"
        />
      </div>
    </template>
    <template slot-scope="{ row }" slot="zonghe1">
      <div class="td-zonghe">
        <span
          class="td-zonghe-item1"
          v-for="(item, i) in row.zonghe.split(',').slice(0, 3)"
          :key="i"
          :style="{color: '#ed4014'}"
        >{{item}}</span>
      </div>
    </template>
    <template slot-scope="{ row }" slot="zonghe2">
      <div class="td-zonghe">
        <span
          class="td-zonghe-item2"
          v-for="(item, i) in row.zonghe.split(',').slice(3, 9)"
          :key="i"
        >{{item}}</span>
      </div>
    </template>
  </Table>
</template>

<script>
import mixin from './mixin.js'
export default {
  name: 'HistoryTableK3',
  mixins: [mixin],
  data () {
    return {
      columns: [
        {
          title: '时间',
          key: 'open_time',
          width: 90
        },
        {
          title: '期数',
          key: 'issue_no',
          width: 90
        },
        {
          title: '号码',
          slot: 'prizeNum',
          align: 'center'
        },
        {
          title: '总和',
          slot: 'zonghe1',
          width: 120,
          align: 'center'
        },
        {
          title: '形态',
          slot: 'zonghe2',
          width: 180,
          align: 'center'
        }
      ]
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
  &-item1 {
    width: 20px;
  }
  &-item2 {
    width: 40px;
  }
}
</style>
