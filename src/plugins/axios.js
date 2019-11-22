import axios from "axios";
import auth from "@/util/loginUtil";
import {toLogin} from "@/router/router";
import {Notification} from "element-ui";

// axios 配置
axios.defaults.timeout = 40000;
axios.defaults.baseURL = window.config.serverUrl;
console.log(window.config.serverUrl);
// http request 拦截器
axios.interceptors.request.use(
  config => {
    config.headers["Authorization"] = auth.getToken();
    config.headers["Pragma"] = "no-cache"; // 防止ie下get方法缓存
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);
//防止一次性多次错误提示，1.5s内只提示一次
let showNotification = true;

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log("-------------接口请求错误信息start-------------");
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data, error.response.status, error.response.headers);
      if (error.response.status === 401) {
        toLogin();
      }
      if (showNotification) {
        showNotification = false;
        Notification.error({
          title: "提示",
          message: error.response.data.message,
        });
        setTimeout(function() {
          showNotification = true;
        }, 1500);
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
      Notification.error({title: "提示", message: "连接服务器失败"});
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
      Notification.error({title: "提示", message: "请求服务器出错"});
    }
    console.log("-------------接口请求错误信息end-------------");
    return Promise.reject(error);
  },
);

export default axios;
