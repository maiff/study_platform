<template>
  <div class="ClassList">
    <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>某某学生</span>
        </el-header>
      <el-table
      :data="tableData2"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="课程名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="描述">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ClassList',
  methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      }
    },
    data() {
      return {
        tableData2: [{
          date: '2016-05-02',
          name: '这是一个课',
          address: '这是一个描述',
        }, {
          date: '2016-05-04',
          name: '这是一个课',
          address: '这是一个描述'
        }, {
          date: '2016-05-01',
          name: '这是一个课',
          address: '这是一个描述',
        }, {
          date: '2016-05-03',
          name: '这是一个课',
          address: '这是一个描述'
        }]
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
.el-table{
      width: 80%!important;
    margin: 0 auto;
}
.el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .ClassList{
    width: 100%;
    /* margin: 0 auto; */
  }
</style>
