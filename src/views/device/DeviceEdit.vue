<template>
  <el-dialog
      v-el-drag-dialog
      :close-on-click-modal="false"
      :title="model.id?'编辑DEMO模块':'新增DEMO模块'"
      :visible.sync="dialogVisible"
      top="3vh"
      width="500px"
      @close="$reset('form')">
    <el-form
        ref="form"
        v-loading="contentLoading"
        :model="model"
        :rules="ruleValidate"
        class="form"
        label-width="60px">
      <el-form-item label="编号" prop="no">
        <el-input v-model="model.no" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="model.name" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="型号" prop="model">
        <el-select v-model="model.model" placeholder="请选择" clearable>
          <el-option
              v-for="item in constant.deviceType.$options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="维保工" prop="maintUserName">
        <vm-select-input
            :value="model.maintUserName"
            clearable
            @select="$refs.maintWorkerSelect.open()"
            @clear="onMaintWorkerClear"/>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="dialogVisible=false">取消</el-button>
      <el-button :loading="submitLoading" type="primary" @click="handleSubmit">保存</el-button>
    </span>
    <user-select ref="maintWorkerSelect" @select="onMaintWorkerSelect"/>
  </el-dialog>
</template>

<script>
  import constant from "@/util/constant";
  import UserSelect from "@/views/user/UserSelect";
  import VmSelectInput from "@/components/VmSelectInput";

  export default {
    components: {UserSelect, VmSelectInput},
    data() {
      return {
        constant,
        dialogVisible: false,
        contentLoading: false,
        submitLoading: false,
        model: {
          id: 0,
          no: "",
          name: "",
          model: "",
          maintUserId: null,
          maintUserName: "",
        },
        ruleValidate: {
          no: {required: true, message: "不能为空", trigger: "blur"},
          name: {required: true, message: "不能为空", trigger: "blur"},
        },
      };
    },
    methods: {
      open(id) {
        this.model.id = id;
        this.dialogVisible = true;
        this.getData();
      },
      getData() {
        if (this.model.id) {
          this.contentLoading = true;
          this.$http.get(`devices/${this.model.id}`).then(res => {
            this.model = res.data;
            this.contentLoading = false;
          }).catch(() => {
            this.contentLoading = false;
          });
        }
      },
      onMaintWorkerSelect(row) {
        this.model.maintUserId = row.id;
        this.model.maintUserName = row.name;
      },
      onMaintWorkerClear() {
        this.model.maintUserId = null;
        this.model.maintUserName = "";
      },
      handleSubmit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.submitLoading = true;
            this.$http
              .save("devices", this.model)
              .then(() => {
                this.submitLoading = false;
                this.dialogVisible = false;
                this.$emit("save-success");
                this.$message.success("保存成功");
              })
              .catch(() => {
                this.submitLoading = false;
              });
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>
