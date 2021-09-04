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
};

export default UserService;
