<template>
  <div class="role-list">
    <vm-table
        ref="vmTable"
        url="roles">
      <el-button slot="toolbar" size="mini" type="primary" @click="$refs.editPage.open(0)">新增</el-button>
      <el-table-column align="center" type="index" width="50"/>
      <el-table-column label="角色名称" prop="name"/>
      <el-table-column label="备注" prop="note"/>
      <el-table-column label="创建人" prop="createBy"/>
      <el-table-column label="创建时间" prop="createTime"/>
      <el-table-column label="最后修改人" prop="updateBy"/>
      <el-table-column label="最后修改时间" prop="updateTime"/>
      <el-table-column v-if="hasAuth" align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="primary" @click="$refs.editPage.open(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </vm-table>
    <edit-page ref="editPage" @save-success="getList"/>
  </div>
</template>
<script>
  import VmTable from "@/components/VmTable.vue";
  import EditPage from "./RoleEdit.vue";

  export default {
    name: "RoleList",
    components: {VmTable, EditPage},
    data() {
      return {
        hasAuth: this.$hasAuth("role:edit"),
      };
    },
    mounted() {
      this.getList();
    },
    methods: {
      getList() {
        this.$refs.vmTable.getList();
      },
      handleDelete(row) {
        this.$confirm(`确定删除${row.name}吗?`, "提示", {type: "warning"}).then(() => {
          this.$http.delete("roles", row.id).then(() => {
            this.getList();
            this.$message.success("删除成功");
          });
        });
      },
    },
  };
</script>
<style lang="scss" scoped>
  .role-list {
    .permissionLabel {
      display: inline-block;
      border-radius: 2px;
      background-color: #fafafa;
      border: 1px solid #E4E7ED;
      color: #666;
      padding: 0 7px;
      margin: 2px;
      font-size: 11px;
    }
  }
</style>
