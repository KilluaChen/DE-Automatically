// ==UserScript==
// @name         Drive-Easy一键创建案件
// @namespace    http://tampermonkey.net/
// @version      3.0.4
// @description  Drive-Easy一键创建案件,安装完成后请修改username变量为你自己的用户名
// @author       KilluaChen
// @match        *test.drive-easy.com/alarm-center/identify-customer*
// @match        *test.drive-easy.com/alarm-center/customer-location*
// @match        *test.drive-easy.com/alarm-center/identify-problem*
// @match        *://54.222.236.241/*/alarm-center/identify-customer*
// @match        *://54.222.236.241/*/alarm-center/customer-location*
// @match        *://54.222.236.241/*/alarm-center/identify-problem*
// @match        https://www.drive-easy.cn/*/alarm-center/identify-customer*
// @match        https://www.drive-easy.cn/*/alarm-center/customer-location*
// @match        https://www.drive-easy.cn/*/alarm-center/identify-problem*

// @grant        none
// ==/UserScript==

(function () {
  var username = 'Test'
  var is_submit = false
  $(document.body).append('<div style=\'position: fixed;top: 19px;right: 36%;z-index: 999;padding: 5px;\'><button id=\'killua_fill\' style=\'font-size:17px; color: green;border-radius: 3px;\'>&nbsp;Fill&Commit&nbsp;</button></div>')
  $('#killua_fill').click(function () {
    var location = window.location.href
    if (location.indexOf('identify-customer') !== -1) {
      if ($('#client_id').val() != '') {
        $('#proceed').click()
        return false
      }
      var date = new Date()
      $('#user_first_name').val('test_' + username + '_' + date.toLocaleDateString())
      $('#user_mobile_number').val('13800138000')
      $('#is_assumed_coverage').click()
      $('#client_id').val(8).change()
      $('#client_case_no').val(username + '_test_case_no_666')
    }
    if (location.indexOf('customer-location') !== -1) {
      $('#searchInput').val('上海市闵行区虹桥万科中心')
      window['$BAIDU$']._instances['TANGRAM__1r']._itemClick(event, 0)
      setTimeout(function () {
        $('.address_button button').click()
      }, 2000)
    }
    if (location.indexOf('identify-problem') !== -1) {
      if (is_submit && $('#primary_sub_service_id').children().length !== 1) {
        $('#nextBtn').click()
        return false
      }
      $('#registeration_number').val('沪-' + username + '-666')
      $('#problem_description').val('问题描述...' + username + '_test')
      $('#fk_fault_type_id').val(2)
      $('#primary_service_id').val(3).change()
      $('#fk_car_make_id').val(3).change()
      var interval_m = setInterval(function () {
        if ($('#fk_car_model_id').children().length !== 1) {
          $('#fk_car_model_id').val(32).change()
          is_submit = true
          clearInterval(interval_m)
        }
      }, 100)
      var interval_s = setInterval(function () {
        if ($('#primary_sub_service_id').children().length !== 1) {
          $('#primary_sub_service_id').val(2)
          is_submit = true
          clearInterval(interval_s)
        }
      }, 100)
    }
    var buttonArr = $('button[type=submit]').offset()
    var inputArr = $('input[type=submit]').offset()
    var top = 0
    if (buttonArr != null) {
      top = buttonArr.top
    }
    if (inputArr != null) {
      top = inputArr.top
    }
    $('html,body').animate({
      scrollTop: top
    }, 100)
  })
})()