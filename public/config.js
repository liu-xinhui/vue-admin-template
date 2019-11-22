/*全局配置文件，url类型的必须以"/"结尾*/
var vueEnv = {
  //当前激活的环境
  active: "dev",
  //开发环境
  dev: {
    serverUrl: "http://localhost:8020/",
  },
  //测试环境
  test: {
    serverUrl: "/",
  },
  prod: {
    serverUrl: "/",
  },
};

switch (vueEnv.active) {
  case "dev":
    window.config = vueEnv.dev;
    break;
  case "test":
    window.config = vueEnv.test;
    break;
  default:
    window.config = vueEnv.prod;
    break;
}
