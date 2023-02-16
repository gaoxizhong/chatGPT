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
export const getQuestion = (params) =>{
  return axios.request({
    url:'/zsk/qw',
    method: 'post',
    data: params
  })
}