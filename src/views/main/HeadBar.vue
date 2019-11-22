<template>
  <header class="header">
    <i class="iconfont nav item" @click="toggleSidebar"/>
    <div class="title">{{$route.meta.title}}</div>
    <span class="center"/>
    <el-dropdown style="margin-right: 10px" trigger="click" @command="handleCommand">
      <el-button size="mini">
        {{name}}<i class="el-icon-arrow-down el-icon--right"/>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
        <el-dropdown-item command="logout">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <change-pwd ref="changePwdDialog"/>
  </header>
</template>

<script>
  import auth from "@/util/loginUtil";
  import ChangePwd from "./ChangePwd";

  export default {
    components: {ChangePwd},
    data() {
      return {
        name: auth.getName() || auth.getPhone(),
      };
    },
    methods: {
      handleCommand(command) {
        switch (command) {
        case "logout":
          this.$confirm("确定退出登录吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            auth.logout();
            location.reload();
          });
          break;
        case "changePwd":
          this.$refs.changePwdDialog.open();
          break;
        }
      },
      toggleSidebar() {
        this.$emit("toggle-sidebar");
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../style/variables";

  .header {
    display: flex;
    align-items: center;
    height: $header-height;
    border-bottom: 1px solid #eeeeee;

    .center {
      flex: 1;
    }

    .item {
      line-height: $header-height;
      height: $header-height;
      padding: 0 15px;
      cursor: pointer;
      display: block;
      color: #495060;
      font-size: 20px;

      &:hover {
        color: $color-primary;
      }
    }

    .action {
      margin-right: 10px;
    }
  }
</style>
