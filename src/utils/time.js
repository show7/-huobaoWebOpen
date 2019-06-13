const timeArr = (time) => {
  let res = []
  res[0] = String(parseInt(time / 3600))
  res[1] = String(parseInt((time % 3600) / 60))
  res[2] = String(time - res[0] * 3600 - res[1] * 60)
  return res
}

export const formatCountdown = (time) => {
  let res = timeArr(time)
  res[0] = res[0].padStart(2, '0')
  res[1] = res[1].padStart(2, '0')
  res[2] = res[2].padStart(2, '0')
  return res
}

// 格式化开奖周期
export const formatInterval = (time) => {
  let res = timeArr(time)
  res[0] = Number(res[0]) === 0 ? '' : res[0] + '小时'
  res[1] = Number(res[1]) === 0 ? '' : res[1] + '分钟'
  res[2] = Number(res[2]) === 0 ? '' : res[2] + '秒'
  return res
}
