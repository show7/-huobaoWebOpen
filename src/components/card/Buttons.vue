<template>
  <div class="card-buttons">
    <ul>
      <li class="tran3" v-for="nav in navs" :key="nav.name" @click="goto(nav.name)">{{nav.title}}</li>
    </ul>
  </div>
</template>

<script>
import { types } from '@/config'
export default {
  name: 'LotteryCardButtons',
  data () {
    return {
      buttons: [
        { title: '历史开奖', name: 'history', notypes: [], nocats: [] },
        { title: '路珠分析', name: 'luzi', notypes: ['lhc', 'k3'], nocats: ['dpc'] },
        { title: '趋势走势', name: 'zoushi', notypes: ['lhc'], nocats: [] },
        { title: '两面长龙', name: 'changlong', notypes: ['lhc'], nocats: ['dpc'] }
      ]
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    cat () {
      return this.data.category_code
    },
    type () {
      return types[this.data.code]
    },
    navs () {
      return this.buttons.filter(item => {
        return !item.notypes.includes(this.type) && !item.nocats.includes(this.cat)
      })
    }
  },
  methods: {
    goto (path) {
      this.$router.push({
        name: 'item_' + path,
        params: {
          cat: this.cat,
          code: this.data.code
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .card-buttons {
    ul {
      display: flex;
      border-top: 1px solid #dcdee2;
      li {
        flex: 1;
        font-size: 14px;
        padding: 10px 0;
        border-left: 1px solid #dcdee2;
        cursor: pointer;
        font-weight: bold;
        &:first-child {
          border: none;
        }
        &:hover {
          background: #EEE;
        }
      }
    }
  }
</style>
