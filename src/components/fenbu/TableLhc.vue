<template>
  <Table :columns="columns" :data="data" :loading="loading">
    <template slot-scope="{ row }" slot="prizeNum">
      <div class="td-balls">
        <Balls
          :code="code"
          :numbers="row.prize_num"
          :attached="{ sx: row.sx.split(','), color: row.sebo.split(',') }"
          :selects="selects"
          :visibleSx="true"
        />
      </div>
    </template>
    <template slot-scope="{ row }" slot="zonghe">
      <div class="td-zonghe">
        <span
          class="td-zonghe-item"
          v-for="(item, i) in row.zonghe.split(',')"
          :key="i"
          :style="{color: i === 0 ? '#ed4014' : ''}"
        >{{item}}</span>
      </div>
    </template>
  </Table>
</template>

<script>
import mixin from './mixin.js'
export default {
  name: 'FenbuTableLhc',
  mixins: [mixin],
  data () {
    return {
      columns: [
        {
          title: '日期',
          key: 'date',
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
          width: 160,
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
  &-item {
    width: 40px;
  }
}
</style>
