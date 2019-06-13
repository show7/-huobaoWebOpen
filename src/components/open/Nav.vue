<template>
  <div class="open-nav">
    <Button
      v-for="item in navs"
      :key="item.name"
      :type="item.name == pathname? 'primary' : 'text'"
      shape="circle"
      @click="goto(item.name)"
    >{{item.title}}</Button>
  </div>
</template>

<script>
import { types } from '@/config'
export default {
  name: 'OpenNav',
  components: {

  },
  data () {
    return {
      buttons: [
        { title: '历史开奖', name: 'history', notypes: [], nocats: [] },
        { title: '两面统计', name: 'liangmian', notypes: ['lhc', 'k3'], nocats: ['dpc'] },
        { title: '号码分布', name: 'fenbu', notypes: ['lhc'], nocats: [] },
        { title: '基本走势', name: 'zoushi', notypes: ['lhc'], nocats: [] },
        { title: '路子', name: 'luzi', notypes: ['lhc', 'k3'], nocats: ['gpc', 'dpc'] },
        { title: '两面长龙', name: 'changlong', notypes: ['k3'], nocats: ['gpc', 'dpc'] },
        { title: '遗漏', name: 'yilou', notypes: [], nocats: ['gpc', 'dpc'] }
      ]
    }
  },
  computed: {
    cat () {
      return this.$route.params.cat || ''
    },
    code () {
      return this.$route.params.code || ''
    },
    type () {
      return types[this.code] || 'normal'
    },
    pathname () {
      return this.$route.name.replace('item_', '')
    },
    navs () {
      return this.buttons.filter(item => {
        return !item.notypes.includes(this.type) && !item.nocats.includes(this.cat)
      })
    }
  },
  watch: {
    code (v) {
      this.check()
    }
  },
  methods: {
    goto (name) {
      this.$router.push({
        name: 'item_' + name
      })
    },
    // 检查当前彩种是否有此页面，如果没有则跳到history
    check () {
      const item = this.buttons.find(item => item.name === this.pathname)
      if (item.notypes.includes(this.type) || item.nocats.includes(this.cat)) {
        this.$router.replace({
          name: 'item_history'
        })
      }
    }
  },
  mounted () {
    this.check()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .open-nav {
    text-align: left;
    background: #FFF;
    padding: 10px 20px;
    border-top: 1px solid #e8eaec;
    // display: flex;
    // overflow-x: auto;
  }
</style>
