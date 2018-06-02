<template>
  <div style="text-align: left; font-size: 16px" class="quiz" v-if="quizs.length && !isDone">
    
    <span>{{question.question_title}}</span>
    
    <div>
      <el-radio-group v-model="answer" @change="oneDone" :disabled="isOneDone">
          <el-radio  v-for="(i, index) in question.question_options" :key="i" class="choose" :label="index" >{{i}}</el-radio>
      </el-radio-group>
    </div>
    <span class="answer" v-if="isOneDone">此题答案: 第{{question.question_answer}}个</span>
    <el-button type="primary" class="question-button" @click="clickC(question.now_index)">{{question.now_index === quizs.length ? '完成答题' : '下一题'}}</el-button>
    
  </div>
</template>

<script>
export default {
  name: 'Quiz',
  props: {
    studentId: String,
    quizs: Array,
    onDone: Function,
  },
  watch: {
    quizs: function () {
      
      this.question = {
        ...this.quizs[0],
        now_index: 1,
      }
    },
  },
  data() {
    return {
      isDone: false,
      isOneDone: false,
      answer: null,
      question: {
        now_index: 1,
        question_title: 'ceshi',
        question_options: ['1','2','3','4'],
        question_answer: '1',
        _id: {
          $id: '5b08289209f7789c538b45d4'
        }
      }
    }
  },
  methods: {
    goNext() {
      const old_index = this.question.now_index
      this.question = {
        ...this.quizs[old_index],
        now_index: old_index + 1,
      }
      // this.$forceUpdate()
    },
    done() {
      this.isDone = true
      this.onDone()
    },
    clickC(now_index) {
      now_index === this.quizs.length ? this.done() : this.goNext()
    },
    oneDone() {
      this.isOneDone = true
    }

  },
  computed:{
    name(){
      return this.$store.state.user_info.student_lastName + this.$store.state.user_info.student_givenName
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.quiz{
  padding: 20px;
}
.choose{
  margin-top:30px;
  display: block;
}
.answer{
  margin-top: 30px;
  display: inline-block;
}
.question-button{
  right: 20px;
  position: absolute;
  margin-top: 20px;
}
.el-radio+.el-radio {
    margin-left: 0;
}
</style>
