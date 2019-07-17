import { mm } from 'util/mm.js'
export default {
  logout(resolve, reject) {
    mm.request({
      url: mm.getServerUrl('user/logout.do'),
      method: 'POST',
      success: resolve,
      error: reject,
    })
  },


  //检查登录状态
  checkLogin(resolve,reject){
    mm.request({
        url: mm.getServerUrl('user/get_user_info.do'),
        method: 'POST',
        success: resolve,
        error: reject,
      })
  }
}
