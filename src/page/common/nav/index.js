import './index.css'
import { mm } from 'util/mm.js'
import userService from 'service/user-service.js'
import cartService from 'service/cart-service.js'

const nav = {
  init() {
    this.bindEvent()
    this.loadUserInfo()
    this.loadCartCount()
    return this
  },

  bindEvent() {
    //登录点击事件
    $('.js-register').click(function() {
      window.location.href = ''
    })

    //注册点击事件
    $('.js-login').click(function() {
      window.location.href = './register.html'
    })

    //退出
    $('.js-logout').click(function() {
      userService.logout(
        function(ret) {
          window.location.reload()
        },
        function(err) {
          mm.errorTips(err)
        },
      )
    })
  },

  loadUserInfo() {
    userService.checkLogin(
      function(res) {
        //隐藏登录，查找兄弟元素
        $('.user.login')
          .hide()
          .siblings('.user.login')
          .show()
          .find('.username')
          .text(res.username)
      },
      function(errMsg) {
        mm.errorTips(err)
      },
    )
  },

  loadCartCount() {
    cartService.getCartCount(
      function(res) {
        $('.nav .cart-count').text(res || 0)
      },
      function(errMsg) {
        $('.nav .cart-count').text(0)
      },
    )
  },
}

const deault = nav.init()

//导出时就初始化
export { deault }
