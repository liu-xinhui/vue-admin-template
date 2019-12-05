const USER_INFO = "hold_user_info";
const storage = window.localStorage;
let userInfo = null;
export const adminUserId = 1;
export default {
  login(obj) {
    userInfo = obj;
    storage.setItem(USER_INFO, JSON.stringify(obj));
  },
  logout() {
    userInfo = null;
    storage.clear();
  },
  isLogin() {
    return userInfo && this.getToken();
  },
  getUserInfo() {
    return userInfo || JSON.parse(storage.getItem(USER_INFO)) || {};
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
      //admin默认用于所有权限
      return (this.getUserId() === adminUserId) || (this.getUserInfo().permissions || []).indexOf(authName) > -1;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
};
