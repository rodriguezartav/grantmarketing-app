export const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return user;
};

const authProvider = {
  login: (loginResponse) => {
    const { token } = loginResponse;

    localStorage.setItem("token", token);
    const user = {};

    localStorage.setItem("userId", user.id);
    localStorage.setItem("user", JSON.stringify(user));
    return Promise.resolve(true);
  },
  logout: () => {
    localStorage.removeItem("token");
    return Promise.resolve();
  },
  checkAuth: () => {
    return localStorage.getItem("token")
      ? Promise.resolve({})
      : Promise.reject({});
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getPermissions: (params) => Promise.resolve(),
};

export default authProvider;
