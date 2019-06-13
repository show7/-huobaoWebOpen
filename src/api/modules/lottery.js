export default [
  {
    name: 'getCategory',
    title: '获取彩种分类',
    url: 'categories',
    method: 'get'
  },
  {
    name: 'getOpenData',
    title: '获取开奖数据',
    url: 'get_item_info',
    method: 'get'
  },
  {
    name: 'getCurrentIssue',
    title: '获取当前信息',
    url: 'current_issue_no',
    method: 'get'
  },
  {
    name: 'getLotteryNotice',
    title: '获取彩票开奖公告',
    url: 'lottery_notice',
    method: 'get'
  },
  {
    name: 'getHistoryByDay',
    title: '获取某一天的开奖历史',
    url: 'lottery_stat_one',
    method: 'get'
  },
  {
    name: 'getLiangmian',
    title: '获取两面统计',
    url: 'lottery_stat_two',
    method: 'get'
  },
  {
    name: 'getLuzi',
    title: '获取路子',
    url: 'lottery_loss_lu',
    method: 'get'
  },
  {
    name: 'getChanglong',
    title: '获取两面长龙',
    url: 'lottery_loss_two',
    method: 'get'
  },
  {
    name: 'getYilou',
    title: '获取遗漏',
    url: 'lottery_loss_off',
    method: 'get'
  },
  {
    name: 'getHistoryLhc',
    title: '获取六合彩某一天的开奖历史',
    url: 'lottery_stat_xglhc',
    method: 'get'
  },
  {
    name: 'getTrend',
    title: '获取彩票的走势',
    url: 'trend',
    method: 'get'
  },
  {
    name: 'getFavorite',
    title: '获取收藏彩票列表',
    url: 'favorite_list',
    method: 'get'
  },
  {
    name: 'addFavorite',
    title: '收藏彩票',
    url: 'favorite_add',
    method: 'post'
  },
  {
    name: 'removeFavorite',
    title: '取消收藏彩票',
    url: 'favorite_remove',
    method: 'post'
  },
  {
    name: 'getOdds',
    title: '获取彩票的赔率',
    url: 'odds',
    method: 'get'
  },
  {
    name: 'getRecentHistory',
    title: '获取最近开奖历史',
    url: 'lottery_history',
    method: 'get'
  },
  {
    name: 'getAwardsList',
    title: '获取盈利榜',
    url: 'winning_rank',
    method: 'get'
  },
  {
    name: 'getItemPlay',
    title: '获取游戏玩法',
    url: 'item',
    method: 'get'
  },
  {
    name: 'getRestIssues',
    title: '获取剩余期数信息',
    url: 'issue_no_list',
    method: 'get'
  }
]
