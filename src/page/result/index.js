import './index.css'
import { mm } from 'util/mm.js'
import '../common/nav-simple/index.js'

$(function() {
  let type = mm.getUrlParam('type') || 'default',
    $element = $('.' + type + '-success')
  $element.show()
})
