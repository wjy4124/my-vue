import platform from 'platform'
let utils = {
  platform(app) {
    let ua = window.navigator.userAgent.toLowerCase()
    if (app) {
      if(/micromessenger/.test(ua)) {
        return 'wechat';
      }
    } else {
      let pl = platform.parse(ua)
      let white = ['iOS', 'Android', 'other']
      return white.indexOf(pl.os.family) !== -1 ? pl.os.family : white[2]
    }
  },
  localSet(key, val) {
    window.localStorage.setItem(key, JSON.stringify(val))
  },
  localGet(key) {
    let data = window.localStorage.getItem(key)
    try {
      data = JSON.parse(data)
    } catch (e) {
      data = null
    }
    return data
  }
}
export default {
  install(App) {
    App.prototype.$utils = utils
  }
}
