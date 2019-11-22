import Vue from "vue";
import VueRouter from "vue-router";
import loginUtil from "@/util/loginUtil";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import {mainMenu, mainNotMenu, notMain} from "./routerBuilder";

Vue.use(VueRouter);

const routes = [
  //首页配置请放置在第一位
  mainNotMenu([{title: "首页", path: "/", componentPath: "main/Home"}]),

  notMain("登录", "login", "main/Login"),
  mainMenu("DEMO管理", "log", [
    {title: "设备管理", name: "DeviceList", componentPath: "device/DeviceList", auth: "device:query"},
  ]),
  mainMenu("系统管理", "system", [
    {title: "用户管理", name: "UserList", componentPath: "user/UserList", auth: "user:query"},
    {title: "角色管理", name: "RoleList", componentPath: "role/RoleList", auth: "role:query"},
    {title: "部门管理", name: "DeptList", componentPath: "dept/DeptList", auth: "dept:query"},
  ]),
];

const router = new VueRouter({
  routes,
});

const whiteUris = ["/login"]; // 白名单,无需登录即可访问

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (whiteUris.indexOf(to.path) !== -1 || loginUtil.isLogin()) {
    // 在白名单当中或者已经登录,放行
    next();
  } else {
    toLogin(to.fullPath);
  }
});

router.afterEach(() => {
  NProgress.done();
});

export const toLogin = () => {
  router.push({
    path: "/login",
  });
};

export {routes};

export default router;
