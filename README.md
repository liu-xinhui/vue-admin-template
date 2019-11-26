<h1 align="center">
<a href="https://github.com/liunewshine/vue-admin-template.git" target="_blank">vue-admin-template(项目模板)</a>
</h1>

### 配合使用的服务器端spring boot项目，请移步[spring-boot-template](https://github.com/liunewshine/spring-boot-template.git)
### 项目演示：<a href="http://118.25.44.86:8011" target="_blank">地址</a> 账号密码默认填充（admin，a123456）
## 简介
多个`vue管理系统`开发经验总结而成，集成`element ui`、`axios`等，封装了`网络请求`、`dialog数据重置`、
`登录`、`正则`、`权限验证`等工具类和全局方法

**完整的、生产环境可直接使用的项目示例**，而不是各种组件示例（组件示例可参考[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)）

特别适合`中小型项目`和`个人开发者`参考及使用，一天开发一个项目不是梦。

## 开发环境
- **NPM 6.9.0 +**(*更低版本请自行尝试*)
- **IntelliJ IDEA ULTIMATE 、 WebStorm、VSCode、记事本 均可**

## 技术选型
|名称|介绍
| ----- | ----
| [element ui](https://element.eleme.cn/#/zh-CN/component/installation) |UI组件
| [axios](https://github.com/axios/axios) |网络请求
| [vue cli 4](https://cli.vuejs.org/zh/guide/) | 使用`vue cli4`生成的项目

## 工程结构
``` 
template-front
├── public
│   ├── img -- 放置项目中的图片
│   ├── config.js -- 项目环境配置（服务器base url等），未使用vue cli的多环境配置文件(.env.development等)因为这种方式修改baseUrl必须重新打包
│   └── 其他文件夹 -- 为vue自带文件不做介绍
├── src
│   ├── components -- 放置项目公用组件
│   │   ├── VmSearch.vue -- 搜索框组件
│   │   └── VmTable.vue -- 表格封装，包含分页、搜索、搜索条件重置、网络请求等
│   ├── plugins -- 放置插件
│   │   ├── el-dialog-drag.js -- 此指令加在el-dialog上可实现dialog拖曳
│   │   ├── axios.js -- axios配置文件，token、全局网络请求错误提示、401跳转到登录页 均在此配置
│   │   ├── element.js -- 引入element ui
│   │   ├── http.js -- 在axios基础上增加的一层封装，简写网络请求，适合restfull风格的接口，挂在到全局
│   │   └── myPlugin.js -- 全局指令、方法挂载、全局异常处理
│   ├── router -- 路由
│   │   ├── router.js -- 路由配置文件
│   │   └── routerBuilder.js -- 路由生成工具类，也可不适用此工具类按照原有语法书写路由
│   ├── store -- vue状态管理
│   ├── style -- 全局css配置
│   │   ├── element.scss -- 覆写element ui的样式，例如圆角、主题色、表格边框等
│   │   ├── main.scss -- 项目全局css，放置公用css
│   │   ├── transition.scss -- 项目全局css动画
│   │   └── variables.scss -- css变量
│   ├── util -- 工具
│   │   ├── constant.js -- 放置静态变量、文本对照。可直接转化为el-select使用的数据格式.使用方式参照DeviceList.vue和DeviceEdit.vue
│   │   ├── loginUtil.js -- 登录返回数据保存和获取，token、用户名、权限等
│   │   └── regular.js -- 常用的正则表达式，校验用户名、密码等
│   └── 其他文件夹 -- 为vue自带文件不做介绍
│   ├── views -- 页面
│   │   ├── main -- 放置登录、主页、侧边栏等等
│   │   └── 其他文件夹  -- 放置自己的项目模块
│   └── 其他文件夹 -- 为vue自带文件不做介绍
├── .gitignore -- git忽略dist、node_modules、ide配置文件等
├── .npmrc -- 此文件npm会自动读取，无需改动。更改npm源，防止node-sass等安装失败
├── alias.config.js -- 编辑器无法识别vue的@符号路径，无法跳转。Intellij idea或者WebStorm中搜索webpack选中此文件，可使编辑器识别到@路径。如果无需跳转，可删除
├── Dockerfile -- 用docker的人懂得，不用的可删除此文件。
├── nginx.conf -- Dockerfile中使用此文件作为nginx配置文件(原版配置文件，只改动启用了gzip)。不使用docker和nginx部署的请忽略
└── 其他文件 -- 为vue cli自带文件不做介绍
```

## 运行项目
```
# clone或者下载项目

# 修改服务器地址`public/config.js`,可直接连接"http://118.25.44.86:8010/"进行测试
# 进入项目目录
cd template-front

# 安装依赖
npm install

# 启动项目
npm run serve
```

## 部署项目
#### docker部署
```
#进入项目根目录
cd template-front

#打包项目
npm run build

#docker打包镜像
docker build -t template-front:latest .

#启动docker容器,可使用-e SPRING_PROFILES_ACTIVE=${env}指定环境，不指定则默认为dev
docker run -itd --name template-front -e env=dev template-front:latest
```

#### 使用Intellij idea docker插件部署
![idea docker](https://uploader.shimo.im/f/Z4LwLkkD3moqaiEr.png)

#### docker+jenkins部署
参考我的文章
[最优雅的Docker+Jenkins pipeline部署vue项目，前端项目都可参考](https://juejin.im/post/5d90735a6fb9a04e161b5384)

#### 直接部署
```
#进入项目根目录
cd template-front

#打包项目
npm run build

#将dist目录拷贝至任意web容器即可，tomcat、jetty、nginx、IIS均可
```

## 权限实现

#### RBAC基于角色的权限访问控制(Role-Based Access Control)
取消了`用户`和`权限`的直接关联，改为通过`用户关联角色`、`角色关联权限`的方法来间接地赋予用户权限。
当新增用户时只需分配已有的角色，大大减少运营人员工作量和出错率。

- 三张表分别为多对多关系
![权限](https://uploader.shimo.im/f/2zAPUtHpCVUwYEHk.png)

- 生成关联网之后的结构如下 
![权限](https://uploader.shimo.im/f/BFf7EHNkSsop3kil.png)

- 代码实现,具体参考代码
![权限](https://uploader.shimo.im/f/eSVZ3KkYdrUwHzCH.png!thumbnail)

![权限](https://uploader.shimo.im/f/xKCoUruZQoAGsN2t.png)

![权限](https://uploader.shimo.im/f/gawmgQJf4lEZD0pN.png!thumbnail)

![权限](https://uploader.shimo.im/f/lD4tay7dNeAnB17u.png!thumbnail)


## 建议
- 服务器地址配置在`public/config.js`
- 图标采用在线[iconfont](https://www.iconfont.cn/)，请在index.html替换成自己的图标库
![index.html](https://uploader.shimo.im/f/TCwF5gfz94gpyvo8.png!thumbnail)

- 强烈建议启用eslint，可自动修复代码，既能避免很多错误也能统一团队的开发规范，用好的话大大提高效率

  Jetbrains系列（Intellij idea、WebStorm等）启用方式如下
![eslint](https://uploader.shimo.im/f/UtyaD5QjfQQ2KsLw.png!thumbnail)

- vue cli项目中，@默认表示src路径，但是编译器无法识别路径，导致无法ctrl+鼠标左键跳转，
在Jetbrains系列（Intellij idea、WebStorm等）setting中配置webpack别名路径即可。其他编辑器自行百度。
![webpack](https://uploader.shimo.im/f/BhbXr1R7hxYdjyFM.png!thumbnail)

## 界面截图
![截图](https://uploader.shimo.im/f/veMUj9E9N6Q9LUqK.png)

![截图](https://uploader.shimo.im/f/veMUj9E9N6Q9LUqK.png)

![截图](https://uploader.shimo.im/f/yHzugmhRcbgdSAuw.png)

![截图](https://uploader.shimo.im/f/ZRGaQzk9xAE0VJeO.png)

![截图](https://uploader.shimo.im/f/hUit5SzXXDImYWq4.png)
