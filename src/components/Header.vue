<template>
  <div class="header">
    <div class="header-wrap">
      <div class="header-logo">开奖网</div>
      <ul class="header-nav">
        <li>
          <div class="header-nav-item tran3" @click="goHome">首页</div>
        </li>
        <li>
          <div class="header-nav-item tran3" @click="showDrawer">
            <span>彩票大厅</span>
            <Icon type="md-arrow-dropdown" />
          </div>
          <div class="header-hall">
            <NavHeader></NavHeader>
          </div>
          <div class="header-hall-phone">
            <Drawer title="彩票大厅" :closable="true" v-model="visibleDrawer">
              <NavHeader @on-hide="hideDrawer"></NavHeader>
            </Drawer>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'
export default {
  name: 'Header',
  components: {
    NavHeader
  },
  data () {
    return {
      visibleDrawer: false
    }
  },
  methods: {
    goHome () {
      this.$router.push({
        name: 'home'
      })
    },
    showDrawer () {
      if (document.body.clientWidth < 768) {
        this.visibleDrawer = true
      } else {
        this.visibleDrawer = false
      }
    },
    hideDrawer () {
      this.visibleDrawer = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '~@/theme/index.less';
  .header {
    height: 64px;
    background: #FFF;
    border-bottom: 4px solid @primary-color;
    &-wrap {
      width: 1200px;
      display: flex;
      margin: 0 auto;
      justify-content: space-between;
    }
    &-logo {
      height: 64px;
      line-height: 64px;
      font-size: 32px;
    }
    &-nav {
      display: flex;
      li {
        height: 64px;
        font-size: 16px;
        text-align: center;
        width: 100px;
        &:hover {
          background: @primary-color;
          color: #FFF;
          .header-hall {
            display: block;
          }
        }
      }
      &-item {
        cursor: pointer;
        line-height: 64px;
      }
    }
    &-hall {
      position: absolute;
      display: none;
      z-index: 1;
      top: 64px;
      left: 0;
      right: 0;
      background: #FFF;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    &-hall-phone {
      display: none;
    }
  }
  @media screen and (max-width: 800px) {
    .header {
      &-wrap {
        width: 100%;
        padding: 0 10px;
      }
      &-hall {
        display: none !important;
      }
      &-hall-phone {
        display: block;
      }
    }
  }
</style>
