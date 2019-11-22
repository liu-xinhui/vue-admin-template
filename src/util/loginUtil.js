const USER_INFO = "hold_user_info";
const storage = window.localStorage;
let userInfo = null;
export const adminUserId = 1;
export default {
  login(obj) {
    storage.setItem(USER_INFO, JSON.stringify(obj));
  },
  logout() {
    storage.clear();
  },
  isLogin() {
    return !!this.getToken();
  },
  getUserInfo() {
    if (!userInfo) {
      userInfo = JSON.parse(storage.getItem(USER_INFO));
    }
    return userInfo || {};
  },
  getToken() {
    return this.getUserInfo().token;
  },
  getPhone() {
    return this.getUserInfo().phone;
  },
  getName() {
    return this.getUserInfo().name;
  },
  getUserId() {
    return this.getUserInfo().userId;
  },
  hasAuth(authName) {
    try {
      console.log(authName);
      //admin默认用于所有权限
      if (this.getUserId() === adminUserId) {
        return true;
      }
      let permissions = this.getUserInfo().permissions;
      return (permissions || []).indexOf(authName) > -1;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
};
