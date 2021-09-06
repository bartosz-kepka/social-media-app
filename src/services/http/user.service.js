import $axios from '@/axios';

const baseURL = '/users';

const UserService = {
  searchUsersIdentitiesByFullName(fullName) {
    const url = `${baseURL}/identities`;
    const params = {
      fullName,
    };
    return $axios.get(url, { params });
  },
  editUser(userId, editUserDTO) {
    const url = `${baseURL}/${userId}`;
    return $axios.put(url, editUserDTO);
  },
  getUser(userId) {
    const url = `${baseURL}/${userId}`;
    return $axios.get(url);
  },
};

export default UserService;
