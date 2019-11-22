<template>
  <div class="user-list">
    <vm-table
        ref="vmTable"
        :filter.sync="filter"
        url="users">
      <el-button slot="toolbar" size="mini" type="primary" @click="$refs.editPage.open(0)">新增</el-button>
      <template slot="adSearch">
        <div class="vm-search">
          <vm-search label="手机号">
            <el-input v-model.trim="filter.phone" clearable/>
          </vm-search>
          <vm-search label="姓名">
            <el-input v-model.trim="filter.name" clearable/>
          </vm-search>
        </div>
      </template>
      <el-table-column align="center" type="index" width="50"/>
      <el-table-column align="center" label="手机号" prop="phone"/>
      <el-table-column label="姓名" prop="name"/>
      <el-table-column label="最后修改人" prop="updateBy"/>
      <el-table-column label="最后修改时间" prop="updateTime"/>
      <el-table-column v-if="hasAuth" align="center" class-name="vm-table_operate" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="$refs.editPage.open(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="deleteRow(scope.row)">删除</el-button>
          <el-button type="warning" @click="resetPassword(scope.row)">重置密码</el-button>
          <el-button type="info" @click="toggleStatus(scope.row)">{{getStatusText(scope.row.status)}}</el-button>
        </template>
      </el-table-column>
    </vm-table>
    <edit-page ref="editPage" @save-success="getList(-1)"/>
  </div>
</template>
<script>
  import VmTable from "@/components/VmTable.vue";
  import VmSearch from "@/components/VmSearch.vue";
  import EditPage from "./UserEdit.vue";

  export default {
    name: "UserList",
    components: {VmTable, VmSearch, EditPage},
    data() {
      return {
        hasAuth: this.$hasAuth("user:edit"),
        filter: {
          phone: "",
          name: "",
        },
      };
    },
    mounted() {
      this.getList(1);
    },
    methods: {
      getList(pageNum) {
        this.$refs.vmTable.getList(pageNum);
      },
      getStatusText(status) {
        return status === "enabled" ? "禁用" : "启用";
      },
      toggleStatus(row) {
        let text = this.getStatusText(row.status);
        this.$confirm(`确定${text + row.phone}吗?`, "提示", {type: "warning"}).then(() => {
          this.$http.put(`users/${row.id}/toggleStatus`).then(() => {
            this.getList(-1);
            this.$message.success(row.phone + text + "成功");
          });
        });
      },
      resetPassword(row) {
        this.$confirm(`确定将${row.phone}的密码重置为template123456吗?`, "提示", {type: "warning"}).then(() => {
          this.$http.put(`users/${row.id}/resetPassword`).then(() => {
            this.$message.success("重置密码成功");
          });
        });
      },
      deleteRow(row) {
        this.$confirm(`确定删除${row.phone}吗?`, "提示", {type: "warning"}).then(() => {
          this.$http.delete("users", row.id).then(() => {
            this.getList(-1);
            this.$message.success(row.phone + "删除成功");
          });
        });
      },
    },
  };
</script>
<style lang="scss" scoped>
  .user-list {
  }
</style>
