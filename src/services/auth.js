import ENDPOINT from '@/config/endpoint'
import axios from 'axios'

function login(user) {
  return axios({
    method: 'POST',
    url: ENDPOINT.SIGNIN,
    headers: {
      'Content-Type': 'application/json'
    },
    data: user
  })
}
export default {
  login
}
