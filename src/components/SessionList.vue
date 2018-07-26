<template>
  <div class="ClassList">
      <Head />
      <el-table
      :data="tableData2"
      style="width: 100%"
      :row-class-name="tableRowClassName"
       @row-click="rowClik"
      >
     
      <el-table-column
        prop="name"
        label="课时名"
        >
      </el-table-column>
      <el-table-column
        prop="session_description"
        label="课程描述">
      </el-table-column>
      <el-table-column
        prop="sessionNum"
        label="课程内容数量">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getSessions } from '../service.js'
import Head from './Head'

export default {
  name: 'ClassList',
  components: {
    Head,
  },
  mounted() {
    // const studentid = Cookie.get('studentid')
    this.class_id = this.$router.currentRoute.query.class_id
    getSessions({
      class_id: this.class_id
    }).then((data) => {
      console.log(data)
      data.map(i => {
        this.tableData2.push({
          name: i.session_info.session_name,
          sessionNum: i.session_first_content_count,
          seession_id: i.session_info.session_id,
          session_description: i.session_info.session_description,
        })
      })
    })
  },
  methods: {
      tableRowClassName({ rowIndex }) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      rowClik(row) {
        console.log(row)
        this.$router.push({ path: 'Home', query: { seession_id: row.seession_id }})
      }
    },
    data() {
      return {
        tableData2: [],
        class_id: '',
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
