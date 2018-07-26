<template>
  <div class="Home">
    <Head />
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="20%" style="background-color: rgb(238, 241, 246)">
        <!-- <el-menu :default-openeds="['1', '3']" @select="onselect" @open="onopen" @close="onclose">
          <el-submenu index="1" title="试试看" >
              <template slot="title"><i class="el-icon-message"></i>导航一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>导航二</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>导航三</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu> -->
        <el-tree :data="menuItems" :props="defaultProps" @node-click="handleNodeClick" :render-content="renderContent"></el-tree>
      </el-aside>
      
      <el-container>
        
        
        <el-main>
          <!-- <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table> -->
          <el-container class="title">
            {{content.content_name || '请选择左侧课程~'}}
            <span class="title-description" v-if="content.content_type === 'VIDEO'"> (本课程有{{content_quiz.length}}道随堂练习)</span>
          </el-container>
          <div v-if="content.content_type === 'HTML'">
            <div v-if="content.html_text" v-html="content.html_text"></div>
            <div v-if="!content.html_text" style="margin-top:20px">Coming soon.</div>
          </div>
          <div v-if="content.content_type === 'VIDEO'">
            <div>
              <video :src="content.video_url" id="videoPlay" controls="controls" class="video" oncontextmenu="return false;" v-show="!isBeginQuiz" @timeupdate="timeupdate" @ended="videoEnd">您的浏览器不支持 video 视屏播放。</video>
              <Quiz :studentId="studentId" :quizs="quizs" :onDone="onQuizDone" />
            </div>
          </div>

          


        </el-main>
        <!-- <div class="console">
            console
        </div> -->
      </el-container>
      
    </el-container>
    
  </div>
</template>

<script>
import { getContents, getContent } from '../service.js'
import Cookie from 'js-cookie'

import Head from './Head'
import Quiz from './Quiz'

export default {
  name: 'Home',
  props: {
    msg: String
  },
  components: {
    Head,
    Quiz,
  },
  mounted() {
    this.session_id = this.$router.currentRoute.query.seession_id
    this.studentId = Cookie.get('studentid')
    getContents({session_id: this.session_id}).then((data) => {
      // console.log(data)
      this.menuItems = this.handleList(data) 
      // console.log(this.menuItems)
    })
  },
  methods: {
    renderContent(h, { node }) {
        return (
          <span class="el-tree-node__label">
            <span title={node.label}>{node.label}</span>
          </span>);
      },
      handleNodeClick(data) {
        console.log(data.content_info)

        if( data.content_info.content_type === 'VIDEO'){
          getContent({content_id: data.content_info.content_id}).then((data) => {
            // console.log(data.content_quiz)
            this.quizsByTimes = {}
            this.isBeginQuiz = false
            this.quizs = []
            this.videoDone = false        
            const quizsByTimes = this.quizsByTimes
            this.content_quiz = data.content_quiz
            data.content_quiz.map((v) => {
              if(quizsByTimes[+v.quiz_position]) {
                quizsByTimes[v.quiz_position].push(v)
              } else {
                quizsByTimes[v.quiz_position] = [v]
              }
            })
            // this.quizs = [...data.content_quiz]
            // quizsByTimes
          })
          
        }
        // getContent({content_id: data.content_info.content_id}).then((i) => {
          this.content = data.content_info
        // })
      },
      handleList(list) {
        let result = []
        list.map(v => {
          this.dfs(result, v)
        })
        return result
      },
      dfs(result, v) {
        // console.log(v, result)
        if (+v.content_info.content_level === 1) {
          result.push({
            label: v.content_info.content_name,
            children: [],
            content_info: {
              ...v.content_info,
              id: v._id.$id,
            }
          })
        } else {
          const len = result.length
          const l = +v.content_info.content_level
          v.content_info.content_level = l - 1
          v.content_info.content_raw_level = l
          this.dfs(result[len-1].children, v)
        }
      },
      onQuizDone() {
        this.isBeginQuiz = false
        this.quizs = []
        this.videoDone || this.videoElement.play()
        this.videoDone = false
      },
      timeupdate(event) {
        const currentTime = event.target.currentTime;//获取当前播放时间
        this.videoElement = event.target
        // console.log(currentTime,this.quizsByTimes[~~currentTime],this.quizsByTimes);//在调试器中打印
        if(this.quizsByTimes[~~currentTime]){
          this.quizs = this.quizsByTimes[~~currentTime]
          setTimeout(() => {
            this.videoElement.pause()
          }, 1000);
          this.isBeginQuiz = true
        }
      },
      videoEnd() {
        if(this.quizsByTimes[-1]){
          this.quizs = this.quizsByTimes[-1]
          
          this.isBeginQuiz = true
          this.videoDone = true
        }
      }
    },
  data() {
    return {
      videoDone: false,
      videoElement: null,
      session_id: '',
      menuItems:[],
      defaultProps: {
        children: 'children',
        label: 'label',
        content_info: 'content_info'
      },
      content: {},
      studentId: '',
      quizs: [],
      isBeginQuiz: false,
      quizsByTimes: {},
      content_quiz: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .Home {
    width: 100%;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .console{
    position: absolute;
    bottom: 0;
    height: 300px;
    width: calc(100% - 201px);
    border-top: 1px solid #ccc;
  }
  .el-tree-node{
    padding: 15px 0;
  }
  .title{
    font-size: 20px;
  }
  #videoPlay{
    width: 100%;
  }
  .title-description{
    font-size: 14px;
    display: contents;
  }
</style>
<style>
.el-tree-node{
  white-space: normal!important;
  background: rgb(238, 241, 246);
}
.el-tree-node__content{
    padding: 15px 0;
    
  }
  .el-tree-node__label{
    /* overflow: hidden;
    text-overflow: ellipsis; */
  }
  .el-tree-node__expand-icon + .el-tree-node__label{
    font-weight:bolder;
  }
  .el-tree-node__expand-icon.is-leaf + .el-tree-node__label{
    font-weight: normal;
  }
  video::-internal-media-controls-download-button { 
    display:none; 
  }

  video::-webkit-media-controls-enclosure { 
    overflow:hidden; 
  }
  video::-webkit-media-controls-panel { 
    width: calc(100% + 30px); 
  }

</style>

