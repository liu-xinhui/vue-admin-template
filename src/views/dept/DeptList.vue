<template>
  <div>
    <el-button
        type="primary"
        @click="$refs.editPage.open(0,0)">
      新增一级部门
    </el-button>
    <el-table
        ref="vmTable"
        :data="tableData"
        row-key="id"
        default-expand-all
        border
        style="margin-top: 10px">
      <el-table-column prop="other.name" label="部门名称"/>
      <el-table-column prop="level" label="层级" align="center" width="70"/>
      <el-table-column prop="other.updateBy" label="最后修改人"/>
      <el-table-column prop="other.updateTime" label="最后修改时间"/>
      <el-table-column v-if="hasAuth" label="操作" align="center" class-name="vm-table_operate">
        <template slot-scope="scope">
          <el-button type="primary" @click="$refs.editPage.open(0,scope.row.id)">新增下级部门</el-button>
          <el-button type="primary" @click="$refs.editPage.open(scope.row.id,scope.row.parentId)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit-page ref="editPage" @save-success="getList()"/>
  </div>
</template>
<script>
  import EditPage from "./DeptEdit.vue";

  export default {
    name: "DeptList",
    components: {EditPage},
    data() {
      return {
        hasAuth: this.$hasAuth("dept:edit"),
        tableData: [],
      };
    },
    mounted() {
      this.getList();
    },
    methods: {
      getList() {
        this.$http
          .get("depts")
          .then(res => {
            this.tableData = res.data;
          })
          .catch(() => {
            this.status = "error";
          });
      },
      handleDelete(row) {
        this.$confirm(`确定删除${row.label}吗?`, "提示", {type: "warning"}).then(() => {
          this.$http.delete("depts", row.id).then(() => {
            this.getList();
            this.$message.success("删除成功");
          });
        });
      },
    },
  };
</script>
<style lang="scss" scoped>
  .wrapper {
    margin: 0 10px;
  }
</style>
