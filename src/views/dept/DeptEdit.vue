<template>
  <el-dialog
      v-el-drag-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      title="部门管理"
      class="dept-edit"
      width="450px"
      top="3vh"
      @close="$reset('form')">
    <el-form
        ref="form"
        :model="model"
        :rules="ruleValidate"
        class="form"
        label-width="75px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="model.name" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="model.phone" placeholder="请输入"/>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button :loading="submitLoading" type="primary" @click="handleSubmit">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>

  export default {
    data() {
      return {
        dialogVisible: false,
        submitLoading: false,
        model: {
          id: 0,
          parentId: 0,
          name: "",
          phone: "",
        },
        ruleValidate: {
          name: {required: true, message: "不能为空", trigger: "blur"},
        },
      };
    },
    methods: {
      open(id, parentId) {
        this.model.id = id;
        this.model.parentId = parentId;
        this.dialogVisible = true;
        if (this.model.id) {
          this.getData();
        }
      },
      getData() {
        this.$http
          .get(`depts/${this.model.id}`)
          .then(resp => {
            this.model = resp.data;
          });
      },
      handleSubmit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.submitLoading = true;
            this.$http
              .save("depts", this.model)
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
