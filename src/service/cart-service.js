import { mm } from 'util/mm.js'

export default {
  //获取购物车数量
  getCartCount(resolve,reject) {
    mm.request({
        url: mm.getServerUrl('cart/get_cart_product_count.do'),
        success: resolve,
        error: reject,
      })
  },
}
