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

//获取他人信息
export const getOtherInfo = (id) => {
  return axios.get('http://127.0.0.1:8000/OtherInfo/'+id+'/')
}
 
//查看未读消息
export const getMessage = () => {
  return axios.get('http://127.0.0.1:8000/Message/')
}

//查看所有消息
export const getAllMessage = () => {
  return axios.get('http://127.0.0.1:8000/AllMessage/')
}

//一键全部消息已读
export const readAllMessage = (id) => {
  return axios.put('http://127.0.0.1:8000/AllMessage/'+id+'/')
}

//一键删除全部消息
export const deleteAllMessage = (id) => {
  return axios.delete('http://127.0.0.1:8000/AllMessage/'+id+'/')
}

//单个消息已读
export const readMessage = (commentId,messageStatus) => {
  return axios.put('http://127.0.0.1:8000/Message/'+commentId+'/',{'status':messageStatus})
}

//单个消息删除
export const deleteMessage = (commentId) => {
  return axios.delete('http://127.0.0.1:8000/Message/'+commentId+'/')
}

export const changeVisibility = (docId, role) => {
  return axios.put('http://127.0.0.1:8000/DocRoleEdit/'+docId+'/',{'role':role})
}

export const fetchRecentDocs = () => {
  return axios.get('http://127.0.0.1:8000/RecentDoc/')
}

export const fetchDocInfo= (id) =>{
  return axios.get('/DocEdit/'+id)
}

export const fetchCoworkers = (id) => {
  return axios.get('/Coworker/' + id)
}

export const addCoworker = (doc, user) => {
  return axios.post('/AddMember/', {'document': doc, 'user': user})
}

export const removeCoworker = (doc, user) => {
  return axios.post('/DeleteMember/', {'document': doc, 'user': user})
}

export const fetchTeams = () => {
  return axios.get('/MyTeam/')
}

export const fetchMyDocs = () => {
  return axios.get('/MyDoc/')
}

export const fetchUsers = (keywords) => {
  return axios.get('/search/', {params:{str: keywords}})
}

export const fetchTeamDocs = (id) => {
  return axios.get('/ChildDoc/'+id+'/')
}