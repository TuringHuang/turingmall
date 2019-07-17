import './index.css'
import { mm } from 'util/mm.js'

const header = {
  init() {
    this.bindEvent()
  },

  onLoad() {
    let keyword = mm.getUrlParam('keyword')
    //keyword存在，回填搜索框
    if (keyword) {
      $('#search-input').var(keyword)
    }
  },
  bindEvent() {
    let _this = this
    $('#search-btn').click(function() {
      //点击搜索提交
      _this.searchSubmit()
    })

    //输入回车后，也要提交
    $('#search-input').keyup(function(e) {
      //回车键值是13
      if (e.keyCode === 13) {
        _this.searchSubmit();
      }
    })
  },

  //搜索提交,跳转到list界面
  searchSubmit() {
    let keyword = $.trim($('#search-input').val())
    if (keyword) {
      window.location.href = './list.html/?keyword=' + keyword
    } else {
      mm.goHome()
    }
  },
}

header.init()
