<template>
  <el-input
      :clearable="clearable"
      :maxlength="0"
      :value="value"
      class="vm-select-input"
      placeholder="请选择"
      @change="change"
      @clear="clear">
    <div slot="append" class="iconWrapper" @click="onSelect">
      <i class="el-icon-search"/>
    </div>
  </el-input>
</template>

<script>
  export default {
    props: {
      value: [String, Number],
      clearable: Boolean,
    },
    methods: {
      onSelect() {
        this.$emit("select");
      },
      change(val) {
        this.$emit("input", val);
      },
      clear() {
        this.$emit("clear");
      },
    },
  };
</script>

<style lang="scss">
  .vm-select-input {
    .iconWrapper {
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin: -20px -20px;
      height: 40px
    }
  }

</style>
