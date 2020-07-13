import userServices from './userServices'

export function headers() {
  return {
    'Content-Type': 'application/json',
    Authorization: userServices.userData() ? userServices.userData().auth_token : ''
  }
}
