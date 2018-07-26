import axios from 'axios'

export function login({
  student_pwd,
  student_email
}) {
  return axios.post('/index.php', {
      function: 'loginByStudent',
      student_pwd,
      student_email,
    })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    })
}

export function getStudentClasses({
  student_id
}) {
  return axios.post('/index.php', {
      function: 'getStudentClasses',
      student_id
    })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    })
}


export function getSessions({
  class_id
}) {
  return axios.post('/index.php', {
    function: 'getSessions',
    class_id
  })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    })
}

export function getContents({
  session_id
}) {
  return axios.post('/index.php', {
      function: 'getContents',
      session_id
    })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    })
}

export function getContent({
  content_id
}) {
  return axios.post('/index.php', {
      function: 'getContent',
      content_id
    })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    })
}
export function uploadQuiz({
  quiz_id,
  student_id,
  quiz_answer,
}) {
  return axios.post('/index.php', {
      function: 'uploadQuiz',
      quiz_id,
      student_id,
      quiz_answer,
    })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    })
}
