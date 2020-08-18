import Axios from './index'

const axios = Axios
//http://47.104.15.57
//http://127.0.0.1:8000

// 登录
export const postUser = (username, password) => {
  return axios.post('/login/', {
    'username': username, 'password': password
  })
}

//发送验证码
export const postCode = (phone) => {
   return axios.post('/codes/', {
      'mobile': phone
  })
} 
  
//注册
export const postNewUser = (name, password1, password2, phone, code) => {
  return axios.post('/users/', {
    'username': name, 'password': password1, 'pwd2': password2, 'mobile': phone, 'code': code
  })
}

// 获取个人信息
export const getUserInfo = (id) => {
  return axios.get('/users/'+id+'/')
}

//获取他人信息
export const getOtherInfo = (id) => {
  return axios.get('/OtherInfo/'+id+'/')
}
 
//查看未读消息
export const getMessage = () => {
  return axios.get('/Message/')
}

//查看所有消息
export const getAllMessage = () => {
  return axios.get('/AllMessage/')
}

//一键全部消息已读
export const readAllMessage = (id) => {
  return axios.put('/AllMessage/'+id+'/')
}

//一键删除全部消息
export const deleteAllMessage = (id) => {
  return axios.delete('/AllMessage/'+id+'/')
}

//单个消息已读
export const readMessage = (commentId,messageStatus) => {
  return axios.put('/Message/'+commentId+'/',{'status':messageStatus})
}

//单个消息删除
export const deleteMessage = (commentId) => {
  return axios.delete('/Message/'+commentId+'/')
}

//接受团队邀请
export const acceptInvitation = (document,user) =>{
  return axios.post('/AcceptInvitation/',{'document':document, 'user':user})
}

//拒绝团队邀请
export const refuseInvitation = (document,user) => {
  return axios.post('/RefuseInvitation/',{'document':document,'user':user})
}

export const changeVisibility = (docId, role) => {
  return axios.put('/DocRoleEdit/'+docId+'/',{'role':role})
}

export const fetchRecentDocs = () => {
  return axios.get('/RecentDoc/')
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
  return axios.get('/cancelCollect/' + id + '/')
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

export const createDoc = (type , name = '未命名', parent_doc, content ,model, role) => {
  return axios.post('/DocEdit/',{'name': name, 'content': content, 'parent_doc': parent_doc,
  'role': role, 'type': type, 'create_by_model': model})
}

export const deleteDoc = (id) => {
  return axios.delete('/DocEdit/'+id+'/')
}

export const deleteForAll = () => {
  return axios.get('/AllPack/')
}

export const undoDeleteAll = () => {
  return axios.get('/AllRecall/')
}

export const fetchTemplates = (keywords, ordering) => {
  return axios.get('/templates/', {params:{search: keywords, ordering:ordering}})
}

//修改文章内容
export const changeContent = (docId, name = '未命名', content) => {
  return axios.put('/DocEdit/'+docId+'/', {
    name: name,
    content: content,
  })
}

// 获取编辑者ID
export const Edit = (doc, status) => {
  return axios.put('/DocStatusEdit/' + doc+'/', {'status':status})
}

export const postMsg = (doc_id, body, reply_comment) => {
  return axios.post('/comment/', {
    document: doc_id,
    body: body,
    reply_comment: reply_comment
  })
}

export const deleteMsg = function(params) {
  return axios.delete('/comment/', { data: params })
}