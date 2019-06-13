<template>
  <div class="nav-header">
    <div class="nav-header-cat" v-for="cat in cats" :key="cat.name">
      <div class="nav-header-cat-title" @click="goCat(cat.code)">{{cat.name}}</div>
      <div class="nav-header-cat-items">
        <div class="nav-header-cat-item" v-for="item in cat.items" :key="item.code" @click="goto(item)">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'NavHeader',
  computed: {
    ...mapState({
      // 分类列表
      cats: state => {
        return [
          { name: '热门彩种', items: state.hot },
          ...state.categories
        ]
      }
    })
  },
  methods: {
    goto (item) {
      let pathname = this.$route.name
      if (!pathname.includes('item_')) {
        pathname = 'item_history'
      }
      this.$emit('on-hide')
      this.$router.push({
        name: pathname,
        params: {
          cat: item.category_code,
          code: item.code
        }
      })
    },
    goCat (code) {
      this.$emit('on-hide')
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
  .nav-header {
    color: #000;
    &-cat {
      width: 1200px;
      margin: 0 auto;
      padding: 15px 0;
      display: flex;
      border-bottom: 1px solid #e8eaec;
      &:last-child {
        border: none;
      }
      &-title {
        width: 120px;
        text-align: left;
        margin: 5px 0;
      }
      &-items {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
      }
      &-item {
        margin: 5px 20px 5px 0;
        color: #333;
        font-size: 14px;
        cursor: pointer;
        &:hover {
          color: @primary-color;
        }
      }
    }
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
      width: 140px;
      background: #FFF;
      font-size: 15px;
      cursor: pointer;
      &.active {
        background: #2d8cf0;
        color: #FFF;
        width: 160px;
      }
      &:hover {
        background: #2d8cf0;
        color: #FFF;
      }
    }
  }
  @media screen and (max-width: 800px) {
    .nav-header {
      &-cat {
        width: 100%;
        flex-direction: column;
        padding: 10px 20px;
        &-title {
          margin: 10px 0;
          font-weight: bold;
          font-size: 16px;
        }
        &-items {
          flex-direction: column;
          align-items: flex-start;
        }
      }
    }
  }
</style>
