<!--搜索框，自动添加label-->
<template>
  <div class="vm-search-com">
    <div :style="labelStyle" class="vm-search-label">
      {{label}}
    </div>
    <slot/>
  </div>
</template>

<script>

  export default {
    props: {
      label: {
        type: String,
        required: true,
      },
      labelWidth: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {};
    },
    computed: {
      labelStyle: function() {
        return {
          width: this.labelWidth === 0 ? "auto" : this.labelWidth + "px",
        };
      },
    },
    methods: {},
  };
</script>

<style lang="scss" scoped>
  .vm-search-com {
    display: inline-flex;
    margin: 2px 0;
    width: 230px;

    .vm-search-label {
      box-sizing: border-box;
      display: inline-block;
      font-size: 13px;
      color: #333;
      line-height: 26px;
      padding-left: 10px;
      padding-right: 5px;
      white-space: nowrap;
      text-align: right;
    }

    /deep/ .el-select, .el-input {
      flex: 1;
    }
  }
</style>
