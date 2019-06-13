import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [],
    hot: [],
    all: [],
    openData: []
  },
  mutations: {
    // 更新彩种分类
    updateCategories (state, categories) {
      state.categories = categories
    },
    // 更新彩种分类
    updateAll (state, all) {
      state.all = all
    },
    // 更新彩种分类
    updateHot (state, hot) {
      state.hot = hot
    },
    // wss更新
    setMessage (state, message) {
      state.openData.forEach(item => {
        if (item.code === message.code) {
          item.prize_num = message.prizeNum
          item.no = message.issueNo
          item.issue_no = message.issueNo
        }
      })
    },
    // wss更新
    setOpen (state, data) {
      state.openData.forEach(item => {
        if (item.code === data.code) {
          item.prize_num = data.prize_num
          item.no = data.no
          item.time = data.time
          item.had_open_num = data.had_open_num
          item.remain_num = data.remain_num
        }
      })
    },
    // 倒计时
    countdown (state) {
      state.openData.forEach(item => {
        if (item.time <= 0) {
          item.time = item.interval
        } else {
          item.time -= 1
        }
      })
    },
    // 设置开奖中
    setOpening (state, code) {
      state.openData.forEach(item => {
        if (item.code === code) {
          item.prize_num = '正在开奖...'
        }
      })
    },
    // 设置开奖中
    setOpens (state, data) {
      state.openData = data
    }
  },
  actions: {
    async ini ({ commit }) {
      let res = await Vue.$api.lottery.getCategory({
        is_hot: 1
      })
      // 去除官方彩票
      // 传统彩票改名高频彩
      // 传统彩的传统去掉
      let categories = res.filter(item => item.name !== '全部' && item.name !== '热门' && item.name !== '官方彩')
        .map(cat => {
          if (cat.name === '传统彩') {
            cat.name = '高频彩'
          }
          cat.items = cat.items.map(item => {
            item.image_url = '/items/' + item.code.replace(/^ct/, '') + '.png'
            item.name = item.name.replace('传统', '')
            return item
          })
          return cat
        })
      let all = res.find(item => item.name === '全部').items
      let hot = res.find(item => item.name === '热门').items
        .filter(item => item.category_code !== 'gpc')
        .map(item => {
          item.name = item.name.replace('传统', '')
          return item
        })
      console.log(all.reduce((total, item) => {
        return { ...total, [item.code]: 'normal' }
      }, {}))
      commit('updateCategories', categories)
      commit('updateAll', all)
      commit('updateHot', hot)
      let opens = await Vue.$api.lottery.getLotteryNotice({
        get_time: 1,
        top: 1
      })
      opens.map(item => {
        item.image_url = '/items/' + item.code.replace(/^ct/, '') + '.png'
        item.name = item.name.replace('传统', '')
        return item
      }).forEach(item => {
        item.category_code = all.find(a => {
          return a.code === item.code
        }).category_code
      })
      console.log(opens)
      commit('setOpens', opens)
    },
    // 获取开奖信息
    async getOpen ({ commit }, code) {
      let res = await Vue.$api.lottery.getLotteryNotice({
        item_code: code,
        get_time: 1,
        top: 1
      })
      commit('setOpen', res[0])
    }
  }
})
