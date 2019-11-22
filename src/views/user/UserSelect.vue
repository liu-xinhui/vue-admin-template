<template>
  <el-dialog
      v-el-drag-dialog
      :visible.sync="dialogVisible"
      append-to-body
      class="small-padding"
      title="选择用户"
      top="3vh"
      width="1000px">
    <vm-table
        ref="vmTable"
        :filter.sync="filter"
        url="users">
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
      <el-table-column align="center" label="操作" width="70">
        <template slot-scope="scope">
          <el-button plain type="primary" @click="onSelect(scope.row)">选择</el-button>
        </template>
      </el-table-column>
    </vm-table>
  </el-dialog>
</template>

<script>
  import VmTable from "@/components/VmTable.vue";
  import VmSearch from "@/components/VmSearch.vue";
  import constant from "@/util/constant";

  export default {
    components: {VmTable, VmSearch},
    data() {
      return {
        dialogVisible: false,
        constant,
        filter: {
          phone: "",
          name: "",
        },
      };
    },
    methods: {
      open() {
        this.dialogVisible = true;
        this.$nextTick(() => {
          this.$refs.vmTable.getList(1);
        });
      },
      onSelect(row) {
        this.dialogVisible = false;
        this.$emit("select", row);
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>
