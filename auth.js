import { ref } from 'vue'
import axios from 'axios'

export const token = ref(localStorage.getItem('user-token'))

export const isLoggedIn = () => !!token.value

export const setToken = (newToken) => {
  token.value = newToken
  localStorage.setItem('user-token', newToken)
  axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
}

export const performLogout = (router) => {
  token.value = null
  localStorage.removeItem('user-token')
  delete axios.defaults.headers.common['Authorization']
  router.push('/login')
}