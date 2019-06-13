<template>
  <div id="app">
    <div class="app-header">
      <site-header></site-header>
    </div>
    <div class="app-nav">
      <nav-left></nav-left>
    </div>
    <div class="app-view">
      <router-view/>
    </div>
    <div class="app-footer">
      <site-footer></site-footer>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import NavLeft from '@/components/NavLeft.vue'
import WSS from '@/api/ws'
export default {
  name: 'app',
  components: {
    'site-header': Header,
    'site-footer': Footer,
    'nav-left': NavLeft
  },
  mounted () {
    this.$store.dispatch('ini')
    this.startWss()
    this.countdown()
  },
  methods: {
    // 开启wss
    startWss () {
      // 运行wss
      const events = {
        onMessage: (messages) => {
          messages.forEach(message => {
            if (message) {
              // msg = de().decrypt(msg);
              message = JSON.parse(message)
              switch (message.msgType) {
                // 开奖推送
                case 1:
                  this.$store.commit('setMessage', message.msg)
                  break
              }
            }
          })
        }
      }
      let wss = new WSS(events)
      wss.start()
    },
    // 全局计时系统
    countdown () {
      setInterval(() => {
        this.$store.commit('countdown')
      }, 1000)
    }
  }
}
</script>

<style lang="less">
html,body {
  height: 100%;
  overflow: hidden;
}
#app {
  font-family: 'Avenir', 'Microsoft Yahei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #e8eaec;
  color: #2c3e50;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

ui,li {
  padding: 0;
  margin: 0;
  list-style:  none;
}

.app {
  &-header {
    flex-shrink: 0;
  }
  &-footer {
    flex-shrink: 0;
  }
  &-nav {
    position: fixed;
    top: 64px;
    left: 50%;
    margin-left: -575px;
  }
  &-view {
    flex-shrink: 0;
    flex: 1;
    width: 1000px;
    margin: 0 auto;
    transform: translateX(100px);
  }
}

.tran3 {
  transition: all 0.3s;
}

@media screen and (max-width: 800px) {
  .app {
    &-nav {
      display: none;
    }
    &-view {
      width: 100%;
      transform: translateX(0);
    }
  }
  .page-content {
    overflow-x: auto;
  }
  .ivu-table-cell {
    padding-left: 6px !important;
    padding-right: 6px !important;
  }
}
</style>
