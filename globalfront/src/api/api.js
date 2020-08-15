import Axios from './index'

const axios = Axios
//http://127.0.0.1:8000
//http://127.0.0.1:8000

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

export const fetchCollections = () => {
  return axios.get('/collectList/')
}

export const doCollect = (id) => {
  return axios.post('/collect/', {'document': id})
}

export const undoCollect = (id) => {
  return axios.delete('/cancelCollect/' + id + '/')
}

export const fetchDustbin = () => {
  return axios.get('/RecycleBin/')
}

export const deleteForever = (id) => {
  return axios.delete('/Pack/'+id+'/')
}

export const undoDelete = (id) => {
  return axios.get('/Recall/'+id+'/')
}