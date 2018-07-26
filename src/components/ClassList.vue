<template>
  <div class="ClassList">
      <Head />
      <el-table
      :data="tableData2"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      @row-click="rowClik"
      >
      <el-table-column >
        <template slot-scope="scope">
          <div style="text-align: center"><img :src="scope.row.img_url" alt="" class="avatar_url"></div>
          
        </template>
      </el-table-column>
     
      <el-table-column
        prop="name"
        label="课程名"
        >
      </el-table-column>
      <el-table-column
        prop="description"
        label="课程描述">
      </el-table-column>
      <el-table-column
        prop="sessionNum"
        label="课时数量">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getStudentClasses } from '../service.js'
import Cookie from 'js-cookie'
import Head from './Head'

export default {
  name: 'ClassList',
  mounted() {
    const studentid = Cookie.get('studentid')
    getStudentClasses({
      student_id: studentid
    }).then((data) => {
      console.log(data)
      data.map(i => {
        this.tableData2.push({
          name: i.class_info.class_info.class_name,
          sessionNum: i.class_info.session_ids.length,
          class_id: i.class_id,
          description: i.class_info.class_info.class_description,
          img_url: i.class_info.class_info.class_avatar_url,
        })
      })
    })
  },
  components: {
    Head,
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
        this.$router.push({ path: 'sessionList', query: { class_id: row.class_id }})
      }
    },
    data() {
      return {
        tableData2: []
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
  .avatar_url{
    width: 50px;
    height: 50px;
    transform: translate(0, 10%);
    /* border-radius: 50%;  */
  }
</style>
<style>
.el-table__row{
      cursor: pointer;
}
</style>
