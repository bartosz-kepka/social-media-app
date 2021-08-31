import store from '@/store/index';

export function loadDataFromLocalStorage() {
  const userItem = localStorage.getItem('user');
  if (userItem) {
    const user = JSON.parse(userItem);
    store.dispatch('user/setUser', user).then();
  }

  const tokenItem = localStorage.getItem('token');
  if (tokenItem) {
    const token = JSON.parse(tokenItem);
    store.dispatch('user/setToken', token).then();
  }

  const settingsItem = localStorage.getItem('settings');
  if (settingsItem) {
    const settings = JSON.parse(settingsItem);
    store.dispatch('settings/setSettings', settings).then();
  }
}
