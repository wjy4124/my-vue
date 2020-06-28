<template>
  <div class="audio">
    <audio
      ref="audio"
      @loadstart="event"
      @loadedmetadata="event"
      @canplaythrough="event"
      @play="event"
      @playing="event"
      @waiting="event"
      @pause="event"
      @timeupdate="event"
      @error="event"
    ></audio>
    <template v-if="!error">
      <div>
        <van-slider
          :value="precent"
          @change="changeHandler"
          active-color="#f44"
        >
          <div
            slot="button"
            class="custom-button"
          >
            <van-loading v-if="loading"></van-loading>
            <template v-else>
              {{ current | timeSn }}
            </template>
          </div>
        </van-slider>
        <div>duration: {{duration | timeSn}}</div>
        <a href="javascript:void(0)" @click="play" v-if="!playing">play</a>
        <a href="javascript:void(0)" @click="stop" v-else-if="!loading">stop</a>
      </div>
    </template>
    <template v-else>
      <div>出问题</div>
      <a href="javascript:void(0)" @click="retry" >retry</a>
    </template>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    data() {
      let history = this.$utils.localGet('audioHistory')
      if (history) {
        history = history.current
      }
      return {
        historyT: history || 0,
        current: 0,
        duration: 0,
        buffered: 0,
        loading: false,
        playthroughed: false,
        playing: false,
        error: null,
        audio: null,
        isWx: this.$utils.platform(true) === 'wechat',
        url: 'http://duanshu-1253562005.cossh.myqcloud.com/2019/09/11/19/54g72892jd75930ed1/common/audio/1568203106334_289283.mp3'
      }
    },
    created() {
    },
    filters: {
      timeSn(val) {
        let duration = moment.duration(val, 'seconds')
        return moment(0).add(duration).format('mm:ss')
      }
    },
    mounted() {
      this.audio = this.$refs.audio
      this.audio.src = this.url
      this.isWx && this.wxIosLoad()
      this.unloadH = this.unloadHandler.bind(this)
      window.addEventListener('pagehide', this.unloadH)
    },
    beforeDestroy() {
      this.unloadH()
      window.removeEventListener('beforeunload', this.unloadH)
    },
    computed: {
      precent() {
        let pre = this.current / this.duration * 100
        return pre ? parseFloat(pre.toFixed(2)) : 0
      }
    },
    methods: {
      wxIosLoad() {
        let $audio = this.audio
        let WeixinJSBridge = window.WeixinJSBridge
        if (typeof WeixinJSBridge === 'object' && typeof WeixinJSBridge.invoke === 'function') {
          WeixinJSBridge.invoke('getNetworkType', {}, res => {
            $audio.load()
          })
        } else {
          window.document.addEventListener('WeixinJSBridgeReady', e => {
            $audio.load()
          })
        }
      },
      event(e) {
        let $audio = this.audio
        let type = e.type
        // console.info(type, e)
        if (type === 'loadedmetadata') {
          this.duration = $audio.duration
          this.playing = false
        } else if (type === 'loadstart') {
          this.loading = true
        } else if (type === 'play') {
          this.error = null
          this.loading = true
        } else if (type === 'playing') {
          this.playing = true
          if (this.playthroughed > 0) {
            this.loading = false
          }
        } else if (type === 'canplaythrough') {
          this.playthroughed = true
          this.loading = false
          this.checkHistory()
        } else if (type === 'waiting') {
          this.loading = true
        } else if (type === 'timeupdate') {
          this.current = $audio.currentTime
          this.buffered = $audio.buffered.end(0)
        } else if (type === 'pause') {
          this.playing = false
        } else if (type === 'error') {
          this.playing = false
          this.error = e
        }
      },
      retry() {
        let $audio = this.audio
        $audio.src = 'http://duanshu-1253562005.cossh.myqcloud.com/2019/09/11/19/54g72892jd75930ed1/common/audio/1568203106334_289283.mp3'
        $audio.play()
      },
      play() {
        let $audio = this.audio
        $audio.play().catch(e => {})
      },
      stop() {
        let $audio = this.audio
        $audio.pause()
      },
      changeHandler(e) {
        let $audio = this.audio
        let t = $audio.duration * e / 100
        $audio.current = $audio.currentTime = t
      },
      unloadHandler() {
        this.setHistory()
      },
      checkHistory() {
        if (this.historyT) {
          this.audio.currentTime = this.historyT
        }
        this.historyT = 0
      },
      setHistory() {
        this.$utils.localSet('audioHistory', {
          key: '1',
          current: this.current
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .audio{
    padding: 20px;
    a{
      font-size:24px;
    }
    .custom-button{
      background:red;
      color:#fff;
      padding: 4px;
    }
  }
</style>
