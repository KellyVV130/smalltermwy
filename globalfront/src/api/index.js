import Vue from 'vue'
import axios from 'axios'
import Vuex from "vuex"
Vue.use(Vuex)
const Axios = axios.create({
  //请求接口
  baseURL:"http://47.104.15.57/",
  //超时设置
  timeout:5000,
  //请求头设置
})
//POST传参序列化(添加请求拦截器)
 // 在发送请求之前做某件事
Axios.interceptors.request.use(config => {
    // 设置以 form 表单的形式提交参数，如果以 JSON 的形式提交表单，可忽略
    // if(config.method  === 'post'){
    //     // JSON 转换为 FormData
    //     const formData = new FormData()
    //     Object.keys(config.data).forEach(key => formData.append(key, config.data[key]))
    //     config.data = formData
    // }

    // 下面会说在什么时候存储 token
    if (localStorage.token) {
        config.headers.Authorization = 'JWT ' + localStorage.token
    }
    return config
},error =>{
    this.$message({message:'参数错误',type:'error'})
    return Promise.reject(error.response.data)
})
// const axiosInstance = Axios.create({
//   withCredentials: true
// })

// 通过拦截器处理csrf问题，这里的正则和匹配下标可能需要根据实际情况小改动
// axiosInstance.interceptors.request.use((config) => {
//     config.headers['X-Requested-With'] = 'XMLHttpRequest'
//     const regex = /.*csrftoken=([^;.]*).*$/
//     config.headers['X-CSRFToken'] = document.cookie.match(regex) === null ? null : document.cookie.match(regex)[1]
//     if (localStorage.getItem('Authorization')) {
//         config.headers.Authorization = localStorage.getItem('Authorization')
//     }
//     return config
// },error => {
//     return Promise.reject(error)
// })

// let self = this
// axiosInstance.interceptors.response.use(
//     response => {
//         return response
//     },
//     error => { // 如果前端拿到状态码为401，就清除token信息并跳转到登录页面
//         if (error.response) {
//             if (error.response.status === 401) {
//               self.$message({
//                 message:error.response.detail, type:'error'
//               })
//               localStorage.removeItem('Authorization')
//               self.$router.push('/MainPage')
//             }
//           }
//         return Promise.reject(error)
//     }
// )

Vue.prototype.axios = Axios

export default Axios