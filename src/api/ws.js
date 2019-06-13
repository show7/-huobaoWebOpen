import axios from 'axios'
import { getRandom, de, aesDecode } from './decode.js'

console.log(window.globalApiConfig.websocket_host)
class WSS {
  // 构造器
  constructor (events) {
    this.events = events
    // 重试延迟
    this.retryDelay = 0
    // ws连接地址
    this.url = window.globalApiConfig.websocket_host + '/platform/web/v1/ws/v2/link?devType=pc&key=' + getRandom(16) + '&code=' + window.globalApiConfig.websocket_code + '&token='
    // 连接
    // this.start()
  }

  // 开始
  start () {
    axios.get(window.globalApiConfig.websocket_host.replace('wss://', 'https://') + '/platform/web/v1/draw/token').then(res => {
      this.token = de().decrypt(res.data.token)
      this.connect()
    })
  }

  // 连接
  connect () {
    this.socket = new WebSocket(this.url + this.token)

    // 开启
    this.socket.onopen = () => {
      this.connected = true
      this.events.onOpen && this.events.onOpen()
    }

    // 收到消息
    this.socket.onmessage = (message) => {
      // 解密消息体
      // 业务逻辑不放在这里，放到执行的地方（events）
      // let msgArr = data.data.split("@@@@@");
      console.log('有消息了')
      message = aesDecode(message.data)
      console.log(message)
      this.events.onMessage && this.events.onMessage(message)
    }

    // 发生错误
    this.socket.onerror = () => {
      console.log('ws连接错误')
      this.connected = false
      this.events.onError && this.events.onError()
      // this.reconnect()
    }

    // 关闭
    this.socket.onclose = (e) => {
      console.log('ws连接关闭')
      this.connected = false
      this.events.onClose && this.events.onClose()
      this.reconnect()
    }
  }

  // 断线重连
  reconnect () {
    if (this.retryDelay < 15000) {
      this.retryDelay += 1000
      setTimeout(() => {
        this.start()
      }, this.retryDelay)
    } else {
      setTimeout(() => {
        this.start()
        this.retryDelay = 0
      }, 60000)
    }
  }

  // 发送消息
  send (message) {
    this.socket.send(message)
  }

  // 断开连接
  close () {
    this.socket.close()
  }
}

export default WSS
