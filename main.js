//
// var config = {
//   headers: {'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODFlZTc1YmFjZWEyMDAwMTAwYzQ2NGYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNDc4NDIwMzE1fQ.mr2E8is4VUxQqk1pfhusgw80wUuLV92Kx-4D-_oUk5M'}
// };

// Vue.http.headers.common['x-auth'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODI5NGViMzVmMmQ3YTY2YmY1ZGZkNmIiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNDc5MTAyMTMxfQ.RAABJJ1pr509ME-GQ6YGEDlQF0XULEJzrnojJ_GyLQ8';

var instance = axios.create({
  baseURL: 'https://st-todo-api.herokuapp.com',
  headers: {
          'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODFlZTc1YmFjZWEyMDAwMTAwYzQ2NGYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNDc4NDIwMzE1fQ.mr2E8is4VUxQqk1pfhusgw80wUuLV92Kx-4D-_oUk5M'
            }
});



var data = {
  "todos": [
    {
      "_id": "581ee7feacea2000100c4651",
      "text": "Loading todo items...",
      "_creator": "581ee75bacea2000100c464f",
      "__v": 0,
      "completedAt": null,
      "completed": false
    }
  ]
};

Vue.component('todoitem', {
  props: ['todo'],
  template: "#todoitem-template",
  data: function(){
    return {
      showdetail: false,
      updating: false
    }
  },
  methods: {
    deletetodo: function(){
      var text = this.todo.text
      this.$emit('deletetodo', text)
    },
    toggle: function(){
      var text = this.todo.text
      this.$emit('toggle', text)
    },
    edit: function(){
      // this.updating = !this.updating
      this.$emit('edit')
    },
    confirmEdit: function(){

    }
  }
});

Vue.component('addtodo', {
  template: "#addtodo-template",
  data: function(){
    return {
      newtodotext: ''
    }
  },
  methods: {
    addnew: function(){
      var newtodo = this.newtodotext;
      console.log(newtodo);
      this.newtodotext = '';
      this.$emit('addnew', newtodo);
    }
  }
})


var app = new Vue({
  el: '#app',
  data: {
    todos: data.todos,
    query: 'all',
    addingnewtodo: false,
    newtodo: ''
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
          app.$root.todos = app.$root.todos.filter(function(elem, index){
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
            app.$root.todos.push(response.data)
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
          for(var i = 0; i < app.$root.todos.length; i++){
            if(app.$root.todos[i].text == text){
              app.$root.todos[i].completed = !app.$root.todos[i].completed;
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
  mounted: function(){
    instance.get('/todos')
      .then(function (response) {
        console.log(response.data);
        app.$root.todos = response.data.todos;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
})
