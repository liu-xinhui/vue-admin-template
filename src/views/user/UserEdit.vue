<template>
  <el-dialog
      v-el-drag-dialog
      :close-on-click-modal="false"
      :title="model.id?'编辑用户':'新增用户'"
      :visible.sync="dialogVisible"
      class="user-edit"
      top="3vh"
      width="500px"
      @close="$reset('form')">
    <el-form
        ref="form"
        v-loading="contentLoading"
        :model="model"
        :rules="ruleValidate"
        class="form"
        label-width="80px">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="model.phone" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="model.name" placeholder="请输入"/>
      </el-form-item>
      <el-form-item v-if="model.id === 0" label="密码" prop="password">
        <el-input v-model="model.password" placeholder="请输入" type="password"/>
      </el-form-item>
      <el-form-item label="用户角色" prop="type">
        <el-select
            v-model="checkedRoleIds"
            multiple
            placeholder="请选择角色"
            style="width: 100%">
          <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="dialogVisible=false">取消</el-button>
      <el-button :loading="submitLoading" type="primary" @click="handleSubmit">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import regular from "@/util/regular";

  export default {
    components: {},
    data() {
      return {
        dialogVisible: false,
        contentLoading: false,
        submitLoading: false,
        roles: [],
        checkedRoleIds: [],
        model: {
          id: 0,
          phone: "",
          password: "",
          name: "",
        },
        ruleValidate: {
          phone: {
            required: true,
            pattern: regular.phone,
            trigger: "blur",
            message: "手机号格式不正确",
          },
          password: {
            required: true,
            pattern: regular.password,
            trigger: "blur",
            message: "6~20位,不能为纯数字或者纯字母",
          },
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
      async getData() {
        this.contentLoading = true;
        let roleResponse = await this.$http.get("roles/all");
        this.roles = roleResponse.data;
        if (this.model.id) {
          let userResponse = await this.$http.get(`users/${this.model.id}`);
          this.model = userResponse.data;
          for (let item of this.model.roles) {
            this.checkedRoleIds.push(item.id);
          }
        }
        this.contentLoading = false;
      },
      handleSubmit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.submitLoading = true;
            this.model.roles = this.checkedRoleIds.map(item => ({id: item}));
            this.$http
              .save("users", this.model)
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
