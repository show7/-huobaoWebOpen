<template>
  <div class="road">
    <div class="road-col" v-for="(col, i) in list" :key="i">
      <div class="road-cell" v-for="(cell, j) in col" :key="j">
        <span v-if="cell !== ''">{{cell}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Road',
  data () {
    return {

    }
  },
  props: {
    data: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  computed: {
    list () {
      let res1 = []
      let res2 = []
      this.data.forEach((item, i) => {
        if (res2.length < 6 && (res2.length === 0 || res2[0] === item)) {
          res2.push(item)
        } else {
          res2 = [...res2, '', '', '', '', '', ''].slice(0, 6)
          res1.push([...res2])
          res2 = [item]
        }
      })
      if (res2[0] !== '') { // 修改遍历结束的条件，避免漏掉最后一组数据
        res2 = [...res2, '', '', '', '', '', ''].slice(0, 6)
        res1.push([...res2])
      }
      return res1.slice(-33)
    }
  }
}
</script>

<style scoped lang="less">
  .road {
    display: flex;
    overflow-x: auto;
    padding: 1px 0 0 1px;
    &-col {
      &:nth-child(odd) {
        .road-cell span {
          background: #2d8cf0;
        }
      }
      &:nth-child(even) {
        .road-cell span {
          background: #ff9900;
        }
      }
    }
    &-cell {
      height: 30px;
      width: 30px;
      border: 1px solid #dcdee2;
      margin: -1px 0 0 -1px;
      padding: 2px;
      span {
        display: flex;
        height: 100%;
        border-radius: 2px;
        justify-content: center;
        align-items: center;
        color: #FFF;
      }
    }
  }
</style>
