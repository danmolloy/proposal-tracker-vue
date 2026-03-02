export function performLogout(router) {
  localStorage.removeItem('user-token');

  delete axios.defaults.headers.common['Authorization'];

  
  window.location.href = '/login';
}