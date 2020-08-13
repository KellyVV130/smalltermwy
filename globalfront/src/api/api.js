import Axios from './index'

const axios = Axios

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

// 获取个人信息
export const getUserInfo = (id) => {
  return axios.get('http://127.0.0.1:8000/users/'+id+'/')
}


  /*
  // 他人获取个人信息，可能不返回
  export const getUserInfo2 = (id) => {
    return axios.get('http://127.0.0.1:8000/users/', {
      params: {id: id}})
  }
  
  
  */
export const changeVisibility = (docId, role) => {
  return axios.put('http://127.0.0.1:8000/DocRoleEditViewset/'+docId,{'role':role})
}

export const fetchRecentDocs = (id) => {
  return axios.get('http://127.0.0.1:8000/DocRoleEditViewset/'+id)
}