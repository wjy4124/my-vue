import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import throttle from 'lodash/throttle'
import Vconsole from 'vconsole'
import Vant from 'vant'
import 'vant/lib/index.css';
import Utils from './utils'

Vue.use(Utils)
Vue.use(Vant)
Vue.config.productionTip = false
Vue.use(VueLazyload, {
  preLoad: 1,
  error: require('@/assets/img-err.png'),
  loading: require('@/assets/loading.gif'),
  lazyComponent: true,
  silent: false,
  adapter: {
    error() {
      console.info(arguments)
    }
  }
})
Vue.prototype.$errorMask = (config) => {
  store.commit('app/SHOW_ERRORMASK', config)
}

function resize() {
  // REM是根据根结点来计算各个子节点的值，所以根结点也要做响应式变化。utils/setRem.jsexport default function setRem(baseWidth = 750) {
  const dpr = window.devicePixelRatio;
  const baseWidth = 750 / 2
  const currentWidth = document.documentElement.clientWidth;
  let remSize = 16;
  let scale = currentWidth / baseWidth;
  remSize = remSize * scale;
  document.documentElement.style.fontSize = remSize + 'px';
  document.documentElement.setAttribute('data-dpr', `${dpr}`)
}
window.addEventListener('resize', throttle(resize))
setTimeout(e => {
  resize()
}, 500)

let v = new Vconsole()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
