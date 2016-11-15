import Vue from 'vue'
// import App from './App.vue'


import addtodo from './components/AddToDo.vue'
import help from './components/help.vue'
import todoitem from './components/TodoItem.vue'

import axios from 'axios';

var instance = axios.create({
  baseURL: 'https://st-todo-api.herokuapp.com',
  headers: {
          'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODFlZTc1YmFjZWEyMDAwMTAwYzQ2NGYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNDc4NDIwMzE1fQ.mr2E8is4VUxQqk1pfhusgw80wUuLV92Kx-4D-_oUk5M'
            }
});

instance.interceptors.request.use(function (config) {
  console.log('I intercept your request!!!!!!!!! right BEFORE you send it....');
  app.showLoading = true;
  return config;
});


var myInterceptor = instance.interceptors.request.use(function (config) {
  console.log('this is my second interceptor..........')
  return config;
});


instance.interceptors.response.use(function (response) {
    console.log('I intercept the response!!!!')
    app.showLoading = false;
    return response;
  }, function (error) {
    // Do something with response error
    console.log('I intercept the response!!!!')
    return Promise.reject(error);
  });


var app = new Vue({
  el: '#myapp',
  components: {
    'addtodo': addtodo,
    'todoitem': todoitem,
    'help': help
  },
  data: {
    todos: [],
    query: 'all',
    addingnewtodo: false,
    newtodo: '',
    showLoading: false
  },
  computed: {
    queryTodos: function(){
      if(this.query == 'all'){
        return this.todos;
      }
      if(this.query == 'completed'){
        return this.todos.filter(function(ele){
           return ele.completed == true;
        })
      }
      if(this.query == 'Notcompleted'){
        return this.todos.filter(function(ele){
          return ele.completed == false;
        })
      }
    }
  },
  methods: {
    deletetodo: function(text){
      console.log('you want to delete????')
      // find todo ID according to text
      var idToDelete;
      this.todos.forEach(function(elem, index){
        if(elem.text === text){
          idToDelete = elem._id;
          return false;
        }
      })

      // Todo delete that item from DB
      instance.delete('/todos/' + idToDelete)
      .then(function(response){
        console.log(response);
        console.log('above is what you get by deleting the todo')
        if(response.status === 200){
          // safely delete todo from app state now
          // Todo delete that item from app state
          // debugger
          app.todos = app.todos.filter(function(elem, index){
            return elem.text != text;
          })
        }
      })
      .catch(function(error){
        console.log(error)
      })
    },
    showaddnew: function(){
      this.addingnewtodo = !this.addingnewtodo;
    },
    addnew: function(newtodotext){
      console.log('you want to add new?')
      this.addingnewtodo = !this.addingnewtodo;
      // make ajax request to actually create a todo in the DB
      instance.post('/todos', {
        text: newtodotext
        })
        .then(function (response) {
          if(response.status == 200){
            // debugger
            app.todos.push(response.data)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    toggle: function(text){
      console.log(text);
      // find todo ID according to text
      var idToToggle;
      var targetElem;
      this.todos.forEach(function(elem, index){
        if(elem.text === text){
          targetElem = elem;
          idToToggle = elem._id;
          return false;
        }
      })

      // Todo delete that item from DB
      instance.patch('/todos/' + idToToggle ,{
        text: text,
        completed: !targetElem.completed
      })
      .then(function(response){
        console.log(response);
        console.log('above is what you get by toggle the todo')
        if(response.status === 200){
          // safely toggle todo from app state now
          for(var i = 0; i < app.todos.length; i++){
            if(app.todos[i].text == text){
              app.todos[i].completed = !app.todos[i].completed;
            }
          }
        }
      })
      .catch(function(error){
        console.log(error)
      })
    },
    edit: function(){
      alert('This function will be avariable soon!')
    }
  },
  beforeCreate: function(){
    instance.get('/todos')
      .then(function (response) {
        console.log(response.data);
        app.todos = response.data.todos;
        console.log(app.todos)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
})
