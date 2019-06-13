<template>
  <div class="trend">
    <div v-if="list.length == 0" style="margin: 60px 0;display:flex;justify-content: center;">
      <Spin></Spin>
    </div>
    <table class="trend-data" v-if="list.length > 0">
      <thead>
        <th>期号</th>
        <th>开奖号码</th>
        <th v-for="(p, i) in position" :key="i">
          <div class="trend-th-position">{{p}}</div>
          <div class="trend-num trend-th-num">
            <span v-for="(n, j) in nums" :key="j">{{n}}</span>
          </div>
        </th>
      </thead>
      <tbody>
        <tr v-for="(row, i) in list" :key="i">
          <td><div>{{row.issue_no}}</div></td>
          <td>
            <div class="trend-prize">
              <span v-for="(num, j) in row.prize_num.split(',')" :key="j">{{num}}</span>
            </div>
          </td>
          <td v-for="(m, j) in row.missing" :key="j" :style="{background: colors2[j % 10]}">
            <div class="trend-num trend-td-num">
              <span v-for="(mm, l) in m" :key="l">{{mm}}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <table class="trend-sum" v-if="list.length > 0">
      <thead>
        <th>数据统计</th>
        <th v-for="(p, i) in position" :key="i">
          <div class="trend-th-position">{{p}}</div>
          <div class="trend-num trend-th-num">
            <span v-for="(n, j) in nums" :key="j">{{n}}</span>
          </div>
        </th>
      </thead>
      <tbody>
        <tr>
          <td><div>出现次数</div></td>
          <td v-for="(m, j) in count" :key="j" :style="{background: colors2[j % 10]}">
            <div class="trend-num trend-td-num">
              <span v-for="(mm, l) in m" :key="l">{{mm}}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td><div>平均遗漏</div></td>
          <td v-for="(m, j) in average" :key="j" :style="{background: colors2[j % 10]}">
            <div class="trend-num trend-td-num">
              <span v-for="(mm, l) in m" :key="l">{{mm}}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td><div>最大连出</div></td>
          <td v-for="(m, j) in maxContinue" :key="j" :style="{background: colors2[j % 10]}">
            <div class="trend-num trend-td-num">
              <span v-for="(mm, l) in m" :key="l">{{mm}}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td><div>最大遗漏</div></td>
          <td v-for="(m, j) in maxMiss" :key="j" :style="{background: colors2[j % 10]}">
            <div class="trend-num trend-td-num">
              <span v-for="(mm, l) in m" :key="l">{{mm}}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 走势线条 -->
    <div class="trend-line" ref="trendLine"></div>

    <!-- 走势球 -->
    <div class="trend-ball">
      <div class="trend-ball-row" v-for="(row, i) in balls" :key="i">
        <div class="trend-ball-item" v-for="(item, j) in row" :key="i + j" :style="{ left: item.left + 'px', top: item.top + 'px', background: item.color }">{{item.num}}</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Trend',
  data () {
    return {
      colors1: ['#ff8c46', '#35ca45', '#8b69dc', '#fb5d71', '#69c3e1', '#de5bcd', '#d5d809', '#7e7ef7', '#ff5c5c', '#12cbb8'],
      colors2: ['#fff8f4', '#f6fff7', '#f9f6ff', '#ffedef', '#f0f9fc', '#ffeefd', '#ffffee', '#f6f6fe', '#ffeeee', '#e6f9f7'],
      balls: []
    }
  },
  props: {
    data: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  computed: {
    // 走势列表数据
    list () {
      return this.data.list || []
    },
    position () {
      return this.data.position
    },
    nums () {
      return this.data.nums
    },
    count () {
      return this.data.show_count
    },
    average () {
      return this.data.average_miss
    },
    maxContinue () {
      return this.data.max_continue
    },
    maxMiss () {
      return this.data.max_miss
    }
  },
  watch: {
    list (v) {
      let data = { list: this.list, nums: this.nums }
      this.createSvg(data)
      this.createBalls(data)
    }
  },
  methods: {
    createSvg (data) {
      const list = data.list
      const nums = data.nums.map(item => Number(item))
      const size = {
        width: 32,
        height: 32
      }
      const colors = this.colors1
      // 生成columns
      let columns = []
      list.forEach((row) => {
        for (let i = 0; i < row.missing.length; i++) {
          if (columns[i] === undefined) {
            columns[i] = [nums.indexOf(Number(row.prize_num.split(',')[i]))]
          } else {
            columns[i].push(nums.indexOf(Number(row.prize_num.split(',')[i])))
          }
        }
      })
      const count = nums.length
      const allWidth = (count * size.width + 1) * columns.length
      const allHeight = size.height * list.length
      // 先清空wrap
      let wrap = this.$refs['trendLine']
      var childs = wrap.childNodes
      for (let i = childs.length - 1; i >= 0; i--) {
        wrap.removeChild(childs[i])
      }

      // 创建svg
      let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.setAttribute('style', 'width:' + allWidth + 'px;height:' + allHeight + 'px;')
      svg.setAttribute('viewBox', '0 0 ' + allWidth + ' ' + allHeight)
      // 使用path创建扇形元素
      // 单元格宽高
      let offset = 0
      for (let i = 0; i < columns.length; i++) {
        let width = size.width
        let height = size.height
        let color = colors[i % 10]
        let path = this.createPath(offset, width, height, columns[i], color)
        svg.appendChild(path)
        offset += count * width + 1
      }
      // 添加到wrap
      wrap.appendChild(svg)
    },

    createPath (offset, width, height, column, color) {
      let aOffsetY = width / 2
      let path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      let pathStr = 'M ' + (offset + column[0] * width + width / 2) + ' ' + aOffsetY
      for (let i = 1; i < column.length; i++) {
        pathStr += ' L' + (offset + column[i] * width + width / 2) + ' ' + (i * height + aOffsetY)
      }
      path.setAttribute('style', 'fill:transparent;stroke:' + color + ';stroke-width:1;')
      path.setAttribute('d', pathStr)
      return path
    },

    createBalls (data) {
      const nums = data.nums.map(item => Number(item))
      const list = data.list
      this.balls = list.map((item, j) => {
        return item.prize_num.split(',').map(item => Number(item)).map((n, i) => {
          return {
            num: n,
            left: (32 * nums.length + 1) * i + 32 * nums.indexOf(n),
            top: 32 * j,
            color: this.colors1[i % 10]
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
  table {
    border-collapse: collapse;
    table-layout: fixed;
    th, td {
      border: 1px solid #dcdee2;
      height: 32px;
    }
    th {
      background: #f8f8f9;
      height: 60px;
    }
  }
  .trend-data {
    th, td {
      &:nth-child(1) {
        div {
          width: 100px;
          font-weight: bold;
        }
      }
      &:nth-child(2) {
        div {
          width: 140px;
          font-weight: bold;
        }
      }
    }
  }
  .trend-sum {
    th, td {
      &:nth-child(1) {
        div {
          width: 241px;
          font-weight: bold;
        }
      }
    }
  }
  .trend {
    width: 100%;
    overflow-x: auto;
    position: relative;
    &-line {
      position: absolute;
      top: 61px;
      left: 243px;
    }
    &-ball {
      position: absolute;
      top: 61px;
      left: 243px;
      &-item {
        position: absolute;
        height: 26px;
        width: 26px;
        border-radius: 50%;
        color: #FFF;
        text-align: center;
        line-height: 26px;
        margin: 3px 0 0 3px;
      }
    }
    &-num {
      display: flex;
      width: 100%;
      span {
        width: 32px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #dcdee2;
        &:last-child {
          border-right: none;
        }
      }
    }
    &-prize {
      display: flex;
      padding: 0 5px;
      span {
        flex: 1;
        text-align: center;
        color: #ed4014;
      }
    }
    &-th {
      &-position {
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #dcdee2;
      }
      &-num {
        height: 30px;
      }
    }
    &-td {
      &-num {
        height: 100%;
      }
    }
  }
</style>
