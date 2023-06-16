import axios from './axios'

// 提交注册信息
export const RegisterUserInfo = (params) =>{
    return axios.request({
        url:'/register',
        method: 'post',
        data: params 
    })
}
//  登录api
export const LoginUserInfo = (params) =>{
  return axios.request({
    url:'/login',
    method: 'post',
    data: params
  })
}
// 点击发送验证码
export const getEmailCode = (params) =>{
  return axios.request({
    url:'/send-email',
    method: 'post',
    data: params
  })
}
// 点击发送短信验证码
export const getTelCode = (params) =>{
  return axios.request({
    url:'/sms-send',
    method: 'post',
    data: params
  })
}
// 点击修改按钮
export const getRevise = (params) =>{
  return axios.request({
    url:'/forget-password',
    method: 'post',
    data: params
  })
}
// 问答接口
export const chatgptAnswer = (params) =>{
  return axios.request({
    url:'/chatgpt-answer',
    method: 'post',
    data: params
  })
}
// 获取支付列表
export const getOrderPayList = (params) =>{
  return axios.request({
    url:'/chatgpt-recharge-list',
    method: 'post',
    data: params
  })
}
// 获取支付接口
export const getOrderPay = (params) =>{
  return axios.request({
    url:'/wxpay',
    method: 'post',
    data: params
  })
}
// 监听支付轮询
export const get_order_status = (params) =>{
  return axios.request({
    url:'/order-detail',
    method: 'post',
    data: params
  })
}
// 获取用户次数
export const get_chatgpt_num = (params) =>{
  return axios.request({
    url:'/chatgpt-num',
    method: 'post',
    data: params
  })
}
// 提交邀请码
export const setInviteCode = (params) =>{
  return axios.request({
    url:'/bind-invite-code',
    method: 'post',
    data: params
  })
}
// 问答历史记录
export const getHistoryList = (params) =>{
  return axios.request({
    url:'/bind-history-list',
    method: 'post',
    data: params
  })
}
