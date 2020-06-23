import Axios from 'axios'
import Retry from 'axios-retry'
import localforage from 'localforage'
import {
  setupCache,
  serializeQuery
} from 'axios-cache-adapter'

let store = localforage.createInstance({
  driver: localforage.LOCALSTORAGE,
  name: 'api-cache'
});
let cacheKey = req => req.url + serializeQuery(req.params)
let cache = setupCache({
    limit: 10,
    maxAge: 5 * 1000,
    // debug: true,
    key: cacheKey,
    exclude: {
        filter(cfg) {
            // 是否排除 缓存
            let hasCache = !!cfg.cache
            return !hasCache || cfg.cache.ignoreCache !== false
        }
    },
    ignoreCache: true,
    store: store
})

const base = Axios.create({
    adapter: cache.adapter
})

Retry(base, {
  retries: 10,
  retryCondition(error) {
    return Retry.isNetworkOrIdempotentRequestError(error)
  },
  retryDelay() {
    return 1000
  }
})

base.interceptors.request.use(function(config) {
  if (config.cache) {
    config.cache._key = cacheKey(config)
  }
  return config
}, null)

// {code, msg, data}
base.interceptors.response.use(function(response) {
  let {data, config} = response
  let {code, msg, data: result} = data
  if (code !== 0) {
    return createError(response, config)
  } else {
    return {
      result,
      response
    }
  }
} ,function (error) {
  let {response, config, request} = error
  return createError(response, config)
})
base.interceptors.response.use(function(response) {

  return response
} ,function (error) {

  return error
})

// {result, config, response}
function createError(response, config) {
  let {data, status} = response || {data: {code: -1, msg: '页面请求异常', data: {}}, status: 0}
  let {code, msg, data: result} = data
  let error = new Error(`[${status} - ${code}]: ${msg}`)
  error.result = result
  error.config = config
  error.response = response
  return Promise.reject(error)
}

export default base
