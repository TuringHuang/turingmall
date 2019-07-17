import './index.css'
import { mm } from 'util/mm.js'
import templateIndex from './index.string'

//侧边导航
const navSide = {
  option: {
    name: '',
    navList: [
      { name: 'user-center', desc: '个人中心', href: './user-center.html' },
      { name: 'order-list', desc: '我的订单', href: './order-list.html' },
      { name: 'pass-update', desc: '修改密码', href: './pass-update.html' },
      { name: 'about', desc: '关于Mall', href: './about.html' },
    ],
  },
  init(option) {
    //合并选项{name:'user-center',navlist:[...]}
    $.extend(this.option, option)
    this.renderNav()
  },

  //渲染导航菜单
  renderNav() {
    for (let i = 0, iLength = this.option.navList.length; i < iLength; i++) {
      if (this.option.navList[i].name === this.option.name) {
        this.option.navList[i].isActive = true
      }
    }

    //渲染list数据
    let navHtml = mm.renderHtml(templateIndex, {
      navList: this.option.navList,
    })

    //把html放入容器
    $('.nav-side').html(navHtml)
  },
}

export default navSide
