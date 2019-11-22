<template>
  <el-dialog
      v-el-drag-dialog
      :close-on-click-modal="false"
      :title="role.id? '编辑角色' : '新增角色'"
      :visible.sync="dialogVisible"
      class="role-edit"
      top="3vh"
      width="700px"
      @close="$reset('form')">
    <el-form
        ref="form"
        :model="role"
        :rules="ruleValidate"
        class="form"
        label-width="80px">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="role.name" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <el-input v-model="role.note" placeholder="请输入" type="textarea"/>
      </el-form-item>
    </el-form>
    <div v-loading="contentLoading" class="permission">
      <div class="permissionContent">
        <div
            v-for="(item,index) in permissions"
            :key="index">
          <div class="permissionTitle">{{item.label}}</div>
          <el-checkbox-group v-model="checkedPermissionIds">
            <el-checkbox
                v-for="itemChild in item.children"
                :key="itemChild.id"
                :label="itemChild.id"
                style="width: 100px;margin-left: 15px;margin-bottom: 8px">
              {{itemChild.label}}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
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
        contentLoading: true,
        submitLoading: false,
        permissions: [],
        checkedPermissionIds: [],
        role: {
          id: 0,
          name: "",
          note: "",
          permissions: [],
        },
        ruleValidate: {
          name: [
            {
              required: true,
              trigger: "blur",
              message: "名称不能为空",
            },
          ],
        },
      };
    },
    methods: {
      open(id) {
        this.role.id = id;
        this.dialogVisible = true;
        this.getData();
      },
      async getData() {
        try {
          let permissionResponse = await this.$http.get("permissions");
          this.permissions = permissionResponse.data;
          if (this.role.id > 0) {
            let roleResponse = await this.$http.get(`roles/${this.role.id}`);
            this.role = roleResponse.data;
            for (let item of this.role.permissions) {
              this.checkedPermissionIds.push(item.id);
            }
          }
          this.contentLoading = false;
        } catch (e) {
          this.contentLoading = false;
        }
      },
      handleSubmit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.submitLoading = true;
            this.role.permissions = this.checkedPermissionIds.map(item => ({id: item}));
            this.$http
              .save("roles", this.role)
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

<style lang="scss">
  @import "../../style/variables";

  .role-edit {
    .permissionContent {
      border: 1px solid $border-color;
      border-radius: 2px;
    }

    .permissionTitle {
      font-size: 13px;
      padding: 9px 12px;
      background-color: #f5f5f5;
      margin-bottom: 10px;
    }

    .el-checkbox__label {
      font-size: 13px;
    }

  }
</style>
