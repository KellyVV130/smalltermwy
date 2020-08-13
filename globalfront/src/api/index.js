import Vue from 'vue'
import Axios from 'axios'

const axiosInstance = Axios.create({
   // withCredentials: true
})

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

Vue.prototype.axios = axiosInstance

export default axiosInstance