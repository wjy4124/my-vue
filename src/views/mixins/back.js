import throttle from 'lodash/throttle'

const backPosition = {
  data() {
    return {
      _leaveScrollTop: 0
    }
  },
  created() {
  },
  deactivated() {
    window.removeEventListener('scroll', this._scrollHandler)
  },
  activated() {
    window.addEventListener('scroll', this._scrollHandler)
    this.$nextTick(e => {
      window.scrollTo(0, this._leaveScrollTop)
    })
  },
  methods: {
    _scrollHandler: throttle(function() {
      this._leaveScrollTop = window.scrollY
    })
  }
}

export default backPosition
