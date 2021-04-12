import store from '@/store/index';

export function loadDataFromLocalStorage() {
  if (localStorage.getItem('user')) {
    const user = JSON.parse(localStorage.getItem('user'));
    store.dispatch('user/setUser', user).then();
  }
}
