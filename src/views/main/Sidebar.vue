<template>
  <div :class="{'vm-sidebar-close':sidebarCollapsed}" class="vm-sidebar">
    <el-scrollbar style="height: 100%" wrap-class="scrollbar">
      <div class="logo">
        <router-link to="/">
          <img v-if="!sidebarCollapsed" class="large" src="/img/logo_large.jpg">
          <img v-else class="small" src="/img/logo_small.jpg">
        </router-link>
      </div>
      <transition>
        <el-menu
            :collapse="sidebarCollapsed"
            :default-active="$route.path"
            active-text-color="#FFFFFF"
            background-color="#222633"
            text-color="#EEEEEE">
          <template v-for="(menu,index) in menus">
            <el-submenu
                :key="index"
                :index="index+''"
                style="border-bottom: 1px solid #171921">
              <template slot="title">
                <i
                    :class="[sidebarCollapsed?'icon-lg':sidebarCollapsed,menu.meta.icon]"
                    class="iconfont"
                    style="padding-right: 5px"/>
                <span>{{menu.meta.title}}</span>
              </template>
              <el-menu-item
                  v-for="(child,childIndex) in menu.children"
                  :key="childIndex"
                  :index="child.path"
                  @click="goto(child)">
                <i class="iconfont circle"/>
                {{child.meta.title}}
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </transition>
    </el-scrollbar>
  </div>
</template>

<script>
  import {routes} from "@/router/router";

  export default {
    components: {},
    props: {
      sidebarCollapsed: Boolean,
    },
    data() {
      return {
        menus: [],
      };
    },
    mounted() {
      this.initMenu();
    },
    methods: {
      initMenu() {
        routes.forEach(item => {
          if (item.meta.type === 1) {
            item.children = (item.children || []).filter(child => {
              console.log(child);
              return !child.meta.auth || this.$hasAuth(child.meta.auth);
            });
            if (item.children.length > 0) {
              this.menus.push(item);
            }
          }
        });
      },
      goto(menu) {
        this.$router.push({path: menu.path});
      },
    },
  };
</script>

<style lang="scss">
  @import "../../style/variables";

  .vm-sidebar {
    transition: width 0.25s ease-in-out;
    width: $sidebar-width;
    background-color: #222633;
    z-index: 10;

    .el-menu {
      border: none;
    }

    .icon-lg {
      font-size: 22px;
    }

    .iconfont {
      color: #ddd;
    }

    .el-menu-item {
      background-color: #000c17 !important;

      &:hover {
        background-color: #21252c !important;
      }
    }

    .is-active {
      background-color: $color-primary !important;

      &:hover {
        background-color: $color-primary !important;
      }
    }

    .logo {
      padding: 8px;
      text-align: center;
      overflow: hidden;

      img {
        height: 44px;
        width: auto;
      }
    }

    .scrollbar {
      height: 100vh;
      overflow-x: hidden;
    }
  }

  .vm-sidebar-close {
    width: $sidebar-width-close;
  }
</style>
