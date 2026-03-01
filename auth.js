export function performLogout(router) {
  localStorage.removeItem('user-token');

  delete axios.defaults.headers.common['Authorization'];

  /* if (router) {
    router.push('/login');
  } else {
    window.location.href = '/login';
  } */
}