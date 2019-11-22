<template>
  <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      title="更改密码"
      width="460px"
      @close="dialogClose">
    <el-form ref="form" :model="changePwd" :rules="ruleValidate" size="small">
      <el-form-item prop="oldPassword">
        <el-input v-model="changePwd.oldPassword" placeholder="请输入" type="password">
          <template slot="prepend">原密码</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="newPassword">
        <el-input v-model="changePwd.newPassword" placeholder="请输入" type="password">
          <template slot="prepend">新密码</template>
        </el-input>
      </el-form-item>
      <el-button
          :loading="submitLoading"
          size="small"
          style="width: 100%"
          type="primary"
          @click="submit">
        提交
      </el-button>
    </el-form>
  </el-dialog>
</template>

<script>
  import regular from "@/util/regular";

  export default {
    data() {
      return {
        dialogVisible: false,
        submitLoading: false,
        changePwd: {
          oldPassword: "",
          newPassword: "",
        },
        ruleValidate: {
          oldPassword: {
            required: true,
            trigger: "blur",
            message: "不能为空",
          },
          newPassword: {
            required: true,
            pattern: regular.password,
            trigger: "blur",
            message: "6~20位,不能为纯数字或者纯字母",
          },
        },
      };
    },
    methods: {
      open() {
        this.dialogVisible = true;
      },
      dialogClose() {
        this.$refs.form.resetFields();
      },
      submit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.submitLoading = true;
            this.$http
              .get("account/changePassword", this.changePwd)
              .then(() => {
                this.submitLoading = false;
                this.dialogVisible = false;
                this.$message.success("密码修改成功");
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
