import base from './index'
import Axios from 'axios'
import debounce from 'lodash/debounce'

export const api1 = debounce(function(id, config) {
    return base({
      url: `/api/${id}`,
      method: 'GET',
      ...config
    })
}, 500, {
    leading: true,
    trailing: false
})

export const page = function(config) {
  return Axios({
    url: `/page/fairy/api/v1/physical_commodity/`,
    method: 'GET',
    ...config
  }).then(({data: data}) => {
    return data.response
  })
}
