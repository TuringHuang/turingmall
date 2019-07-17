import Hogan from 'hogan.js'

const conf = {
  serverHost: '',
}

const mm = {
  request(params) {
    let _this = this
    //请求数据
    $.ajax({
      type: params.method || 'get',
      url: params.url || '',
      dataType: params.type || 'json',
      data: params.data || '',
      success: function(res) {
        //请求成功
        if (0 === res.status) {
          typeof params.success === 'function' && params.success(res.data, res.msg)
        }
        //没有登录状态，需要强制登录
        else if (10 === res.status) {
          _this.doLogin()
        }
        //数据请求错误
        else if (1 === res.status) {
          typeof params.error === 'function' && params.error(res.msg)
        }
      },
      error: function(err) {
        typeof params.error === 'function' && params.error(err.statusText)
      },
    })
  },

  getServerUrl(path) {
    //获取服务器地址
    return conf.serverHost + path
  },

  //获取url里面参数名为name的值
  getUrlParam(name) {
    //例如：keyword=xxx&page=xxx
    //以name开头或者&name开头,=后面是非&符号N个(*表示多个)，然后以&或者字符串末尾结束
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    //url里面？里面的参数,匹配成功会返回数组，否则W为null
    let result = window.location.search.substring(1).match(reg)
    console.log(result)
    return result ? decodeURIComponent(result[2]) : null
  },

  //渲染html
  renderHtml(htmlTemplate, data) {
    let template = Hogan.compile(htmlTemplate)
    return template.render(data)
  },

  //成功提示
  successTips(msg) {
    alert(msg || '操作成功')
  },

  errorTips(msg) {
    alert(msg || '哪里不对了~')
  },

  doLogin() {
    window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href)
  },
}

export { conf, mm }
