<template>
  <div class="nav-left">
    <ul>
      <li
        class="tran3"
        :class="{'active':
        item.code == cat}"
        v-for="item in cats"
        :key="item.code"
        @click="goCat(item.code)"
      >{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'NavLeft',
  computed: {
    cat () {
      return this.$route.params.cat || 'hot'
    },
    ...mapState({
      // 分类列表
      cats: state => [{ name: '热门彩种', code: 'hot' }, ...state.categories.map(item => {
        return { name: item.name, code: item.code }
      })]
    })
  },
  methods: {
    goCat (code) {
      this.$router.push({
        name: 'home_cat',
        params: {
          cat: code
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '~@/theme/index.less';
  .nav-left {
    ul {
      width: 160px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin: 15px 0;
    }
    li {
      margin-bottom: 10px;
      height: 48px;
      line-height: 48px;
      width: 140px;
      background: #FFF;
      font-size: 15px;
      cursor: pointer;
      border-radius: 4px;
      &.active {
        background: @primary-color;
        color: #FFF;
        width: 160px;
      }
      &:hover {
        background: @primary-color;
        color: #FFF;
      }
    }
  }
</style>
