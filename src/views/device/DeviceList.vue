<template>
  <div>
    <vm-table
        ref="vmTable"
        :filter.sync="filter"
        url="devices">
      <el-button slot="toolbar" size="mini" type="primary" @click="$refs.editPage.open(0)">新增</el-button>
      <template slot="adSearch">
        <div class="vm-search">
          <vm-search label="编号">
            <el-input v-model.trim="filter.no" clearable/>
          </vm-search>
          <vm-search label="名称">
            <el-input v-model.trim="filter.name" clearable/>
          </vm-search>
          <vm-search label="型号">
            <el-input v-model.trim="filter.model" clearable/>
          </vm-search>
        </div>
      </template>
      <el-table-column align="center" label="编号" prop="no"/>
      <el-table-column label="名称" prop="name"/>
      <el-table-column label="型号" prop="model">
        <template slot-scope="scope">
          {{constant.deviceType.$object[scope.row.model]}}
        </template>
      </el-table-column>
      <el-table-column label="维保工" prop="maintUserName"/>
      <el-table-column
          v-if="hasAuth"
          align="center"
          class-name="vm-table_operate"
          label="操作"
          width="160px">
        <template slot-scope="scope">
          <el-button type="primary" @click="$refs.editPage.open(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="deleteRow(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </vm-table>
    <edit-page ref="editPage" @save-success="getList(-1)"/>
  </div>
</template>
<script>
  import VmTable from "@/components/VmTable.vue";
  import VmSearch from "@/components/VmSearch.vue";
  import EditPage from "./DeviceEdit.vue";
  import constant from "@/util/constant";

  export default {
    name: "DeviceList",
    components: {VmTable, VmSearch, EditPage},
    data() {
      return {
        hasAuth: this.$hasAuth("device:edit"),
        constant,
        filter: {
          no: "",
          name: "",
          model: "",
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
      deleteRow(row) {
        this.$confirm(`确定删除${row.no}吗?`, "提示", {type: "warning"}).then(() => {
          this.$http.delete("devices", row.id).then(() => {
            this.getList(-1);
            this.$message.success(row.no + "删除成功");
          });
        });
      },
    },
  };
</script>
<style lang="scss" scoped>
</style>
