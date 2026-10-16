import api from './chat'

/**
 * 获取当前用户资料
 */
export function getProfile() {
  return api.get('/user/profile')
}

/**
 * 更新用户资料
 * @param {Object} data - { nickname?, avatar? }
 */
export function updateProfile(data) {
  return api.put('/user/profile', data)
}

/**
 * 修改密码
 * @param {Object} data - { oldPassword, newPassword }
 */
export function changePassword(data) {
  return api.put('/user/password', data)
}
