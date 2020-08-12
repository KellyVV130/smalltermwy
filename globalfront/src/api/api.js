import axiosInstance from './index'

const axios = axiosInstance

// 登录
export const postUser = (username, password) => {
    return axios.post('http://127.0.0.1:8000/login/', {
      'username': username, 'password': password
    })
  }

//发送验证码
export const postCode = (phone) => {
    return axios.post('http://127.0.0.1:8000/codes/', {
        'mobile': phone
    })
} 
  
//注册
export const postNewUser = (name, password1, password2, phone, code) => {
    return axios.post('http://127.0.0.1:8000/users/', {
      'username': name, 'password': password1, 'pwd2': password2, 'mobile': phone, 'code': code
    })
}

  /*
  // 修改个人信息
  export const changeUserInfo = (id, username, password, email, intro) => { // 'head': url
    return axios.put('http://127.0.0.1:8000/users/' + id + '/', {
      'username': username, 'password': password, 'email': email, 'introduction': intro,
    })
  }
  
  // 他人获取个人信息，可能不返回
  export const getUserInfo2 = (id) => {
    return axios.get('http://127.0.0.1:8000/users/', {
      params: {id: id}})
  }
  
  // 获取个人信息
  export const getUserInfo = () => {
    return axios.get('http://127.0.0.1:8000/users/1')
  }
  */