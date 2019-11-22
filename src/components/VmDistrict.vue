<template>
  <div class="vm-district" style="width: 100%">
    <el-cascader
        :options="options"
        placeholder="请选择地区"
        style="width: 100%"
        v-bind="$attrs"
        v-on="$listeners"/>
  </div>
</template>

<script>
  const storage = window.localStorage;
  const cacheName = "step_district";

  export default {
    components: {},
    data() {
      return {
        options: JSON.parse(storage.getItem(cacheName)),
      };
    },
    mounted() {
      if (!this.options) {
        this.initData();
      }
    },
    methods: {
      initData() {
        this.$http.get("districts").then(res => {
          this.options = res.data;
          storage.setItem(cacheName, JSON.stringify(res.data));
        });
      },
    },
  };
</script>

<style lang="scss">
</style>
