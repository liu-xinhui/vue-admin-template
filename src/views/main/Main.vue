<template>
  <div class="vm-main">
    <sidebar
        :sidebar-collapsed="sidebarCollapsed"
        class="vm-main-sidebar"/>
    <head-bar
        :class="{'vm-header-collapsed':sidebarCollapsed}"
        class="vm-main-header"
        @toggle-sidebar="toggleSidebar"/>
    <div
        :class="{'vm-main-collapsed':sidebarCollapsed}"
        class="vm-main-page">
      <div class="vm-content">
        <router-view class="vm-page"/>
      </div>
    </div>
  </div>
</template>
<script>
  import Sidebar from "./Sidebar.vue";
  import HeadBar from "./HeadBar.vue";

  const storage = window.localStorage;

  export default {
    components: {
      Sidebar,
      HeadBar,
    },
    data() {
      return {
        sidebarCollapsed: storage.getItem("sidebarCollapsed") === "true",
      };
    },
    methods: {
      toggleSidebar() {
        this.sidebarCollapsed = !this.sidebarCollapsed;
        storage.setItem("sidebarCollapsed", this.sidebarCollapsed);
      },
    },
  };
</script>
<style lang="scss">
  @import "../../style/variables";

  .vm-main {
    position: absolute;
    width: 100%;
    height: 100%;

    .vm-main-sidebar {
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
    }

    .vm-main-header {
      box-sizing: border-box;
      position: relative;
      left: $sidebar-width;
      width: calc(100% - #{$sidebar-width});
      height: $header-height;
      transition: all 0.3s;
    }

    .vm-main-page {
      position: absolute;
      top: $header-height;
      left: $sidebar-width;
      right: 0;
      bottom: 0;
      overflow: auto;
      padding: 10px;
      transition: left 0.3s;
      background-color: #ebeef2;

      .vm-content {
        width: 100%;
        border-radius: 4px;
        background-color: white;

        .vm-page {
          padding: 13px 20px;
        }
      }
    }

    .vm-header-collapsed {
      left: $sidebar-width-close;
      width: calc(100% - #{$sidebar-width-close});
    }

    .vm-main-collapsed {
      left: $sidebar-width-close;
    }
  }
</style>
