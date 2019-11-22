//路由和菜单工具类

/**
 * @param title 菜单名称
 * @param name 路由名称，也是菜单icon的名称
 * @param childrenMeta 支持的参数 {title:'',name:'',path:'',componentPath:''}，Path则默认为componentPath
 */
const mainMenu = (title, name, childrenMeta) => {
  return {
    path: "/",
    meta: {
      title: title,
      type: 1,
      icon: name,
    },
    component: () => import("@/views/main/Main.vue"),
    children: buildChildren(childrenMeta),
  };
};

/**
 *在main组件中展示但是不显示在菜单中
 * @param childrenMeta 支持的参数 {title:'',name:'',path:'',componentPath:''}，Path则默认为componentPath
 */
const mainNotMenu = childrenMeta => {
  return {
    path: "/",
    meta: {
      type: 2,
    },
    component: () => import("@/views/main/Main.vue"),
    children: buildChildren(childrenMeta),
  };
};

const buildChildren = childrenMeta => {
  let children = [];
  for (let item of childrenMeta) {
    if (!item.path) {
      item.path = item.componentPath;
    }
    let child = {
      path: item.path.startsWith("/") ? item.path : "/" + item.path,
      meta: {
        title: item.title,
        auth: item.auth,
      },
      component: resolve => {
        require([`@/views/${item.componentPath}.vue`], resolve);
      },
    };
    if (item.name) {
      child.name = item.name;
    }
    children.push(child);
  }
  return children;
};

/**
 *不在main组件中展示的路由
 * @param title 标题
 * @param path 访问的url
 * @param componentPath 组件路径，不填表示componentPath=path
 */
const notMain = (title, path, componentPath) => {
  if (!componentPath) {
    componentPath = path;
  }
  return {
    path: "/" + path,
    meta: {
      title: title,
      type: 3,
    },
    component: resolve => {
      require([`@/views/${componentPath}.vue`], resolve);
    },
  };
};

export {mainMenu, mainNotMenu, notMain};
