<!--带有分页逻辑的table-->
<template>
  <div class="vm-page-table">
    <div
        v-if="$slots.toolbar"
        class="tools-bar">
      <slot name="toolbar"/>
    </div>
    <div
        v-if="$slots.adSearch"
        ref="adSearch"
        class="ad-search">
      <div id="search" class="ad-search_content">
        <slot name="adSearch"/>
        <div class="ad-search-btn">
          <el-button
              v-if="!hideClear"
              plain
              size="mini"
              style="height: 26px;padding: 0 10px"
              type="primary"
              @click="handleClearClick">
            重置
          </el-button>
          <el-button
              :loading="status==='loading'"
              size="mini"
              style="height: 26px;padding: 0 10px"
              type="primary"
              @click="handleSearchClick">
            查询
          </el-button>
        </div>
      </div>
    </div>
    <slot name="otherButton"/>
    <div class="wrapper">
      <el-table
          ref="elTable"
          v-loading="status==='loading'&&tableData.length>0"
          :data="tableData"
          border
          stripe
          v-bind="$attrs"
          @selection-change="handleSelectionChange"
          v-on="$listeners">
        <el-table-column
            v-if="multiSelection"
            type="selection"
            width="55"/>
        <template slot="empty">
          <i v-if="status==='loading'" class="el-icon-loading" style="font-size: 18px"/>
          <el-button v-else-if="status==='error'" @click="handleSearchClick">加载失败，点击重新获取</el-button>
          <div v-else-if="status==='empty'">暂无数据</div>
        </template>
        <el-table-column v-if="showRadio" align="center" width="50">
          <template slot-scope="scope">
            <el-checkbox :value="scope.$index===currentRowIndex" @change="onCheckedChange($event,scope.$index)"/>
          </template>
        </el-table-column>
        <slot/>
      </el-table>
      <div style="margin-top: 16px;overflow: hidden">
        <el-pagination
            :current-page="currentPage"
            :total="total"
            class="page"
            layout="total, prev, pager, next, jumper"
            @current-change="handleCurrentChange"/>
      </div>
    </div>
  </div>
</template>

<script>
/*查询条件filter必须使用:filter.sync="filter"传递*/
  export default {
    components: {},
    props: {
      url: {
        type: String,
        required: true,
      },
      filter: {
        type: Object,
      },
      //是否显示清空按钮
      hideClear: {
        type: Boolean,
        default: false,
      },
      pageSize: {
        type: Number,
        default: 10,
      },
      multiSelection: {
        type: Boolean,
        default: false,
      },
      showRadio: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        status: "loading",//loading error empty
        currentPage: 1,
        total: 0,
        tableData: [],
        //保存一份filter的原始拷贝，用于重置条件
        filterCopy: JSON.stringify(this.filter),
        currentRowIndex: -1,
      };
    },
    mounted() {
      //为所有input框添加enter键搜索事件
      let searchBox = document.getElementById("search");
      if (searchBox) {
        let controls = searchBox.getElementsByTagName("input");
        for (let item of controls) {
          item.onkeydown = event => {
            if (event.key === "Enter") {
              this.getList(1);
            }
          };
        }
      }
    },
    methods: {
      //等于-1表示获取当前页
      getList(pageNum) {
        this.status = "loading";
        if (pageNum > 0) {
          this.currentPage = pageNum;
        }
        let params = Object.assign({pageSize: this.pageSize, pageNum: this.currentPage}, this.filter);
        this.$http
          .get(this.url, params)
          .then(res => {
            this.tableData = res.data.records;
            console.log(res.data);
            this.total = res.data.total;
            if (this.total === 0) {
              this.status = "empty";
            } else {
              this.status = "finish";
            }
          })
          .catch(() => {
            this.status = "error";
          });
      },
      handleCurrentChange(pageNum) {
        this.getList(pageNum);
      },
      handleSearchClick() {
        this.getList(1);
      },
      handleClearClick() {
        this.$emit("update:filter", JSON.parse(this.filterCopy));
        this.$nextTick(() => {
          this.getList(1);
        });
      },
      setCurrentRow(row) {
        this.$refs.elTable.setCurrentRow(row);
      },
      onCheckedChange(val, index) {
        this.currentRowIndex = val ? index : -1;
        this.$emit("radio-change", this.tableData[this.currentRowIndex], val);
      },
      getCurrentRow() {
        return this.tableData[this.currentRowIndex];
      },
      handleSelectionChange(val) {
        this.$emit("selection-change", val);
      },
    },
  };
</script>

<style lang="scss">
  .vm-page-table {

    .tools-bar {
      margin-bottom: 10px;
    }

    .ad-search {
      overflow: auto;
      width: auto;
      border: 1px solid #EBEEF5;
      margin-bottom: 10px;
      background-color: #f4f7fa;

      .ad-search_content {
        position: relative;
        display: inline-block;
        padding: 8px 133px 8px 10px;

        .ad-search-btn {
          position: absolute;
          right: 10px;
          bottom: 11px;
        }
      }
    }

    .page {
      float: right;
    }

    .el-loading-spinner {
      position: fixed;
      width: 100px;
      top: 50%;
      left: 50%;
    }
  }
</style>
