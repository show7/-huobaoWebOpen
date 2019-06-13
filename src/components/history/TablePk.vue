<template>
  <Table :columns="columns" :data="data" :loading="loading">
    <template slot-scope="{ row }" slot="prizeNum">
      <div class="td-balls">
        <Balls
          :code="code"
          :numbers="row[mode]"
          :attached="row.attached"
        />
      </div>
    </template>
    <template slot-scope="{ row }" slot="zonghe1">
      <div class="td-zonghe">
        <span
          class="td-zonghe-item"
          v-for="(item, i) in row.zonghe.split(',').slice(0, 3)"
          :key="i"
          :style="{color: i == 0 ? '#ed4014' : ''}"
        >{{item}}</span>
      </div>
    </template>
    <template slot-scope="{ row }" slot="zonghe2">
      <div class="td-zonghe">
        <span
          class="td-zonghe-item"
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
  name: 'HistoryTablePk',
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
          align: 'center',
          renderHeader: (h, params) => {
            return h('RadioGroup', {
              props: {
                type: 'button',
                value: this.mode
              },
              on: {
                'on-change': (e) => {
                  this.mode = e
                }
              }
            }, [
              h('radio', {
                props: {
                  label: 'prize_num'
                }
              }, '显示号码'),
              h('radio', {
                props: {
                  label: 'daxiao'
                }
              }, '显示大小'),
              h('radio', {
                props: {
                  label: 'danshuang'
                }
              }, '显示单双')
            ])
          }
        },
        {
          title: '冠亚和',
          slot: 'zonghe1',
          width: 120,
          align: 'center'
        },
        {
          title: '1-5龙虎',
          slot: 'zonghe2',
          width: 160,
          align: 'center'
        }
      ],
      mode: 'prize_num'
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
    width: 20px;
  }
}
</style>
