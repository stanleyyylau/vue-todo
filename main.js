//
// var config = {
//   headers: {'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODFlZTc1YmFjZWEyMDAwMTAwYzQ2NGYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNDc4NDIwMzE1fQ.mr2E8is4VUxQqk1pfhusgw80wUuLV92Kx-4D-_oUk5M'}
// };

Vue.http.headers.common['x-auth'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODFlZTc1YmFjZWEyMDAwMTAwYzQ2NGYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNDc4NDIwMzE1fQ.mr2E8is4VUxQqk1pfhusgw80wUuLV92Kx-4D-_oUk5M';

// var instance = axios.create({
//   baseURL: 'https://st-todo-api.herokuapp.com/todos',
//   headers: {
//           'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODFlZTc1YmFjZWEyMDAwMTAwYzQ2NGYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNDc4NDIwMzE1fQ.mr2E8is4VUxQqk1pfhusgw80wUuLV92Kx-4D-_oUk5M'
//             }
// });



var data = {
  "todos": [
    {
      "_id": "581ee7feacea2000100c4651",
      "text": "What am I gonna do1?",
      "_creator": "581ee75bacea2000100c464f",
      "__v": 0,
      "completedAt": null,
      "completed": true
    },
    {
      "_id": "58213287a28c2e0010ec80e0",
      "text": "What am I gonna do?",
      "_creator": "581ee75bacea2000100c464f",
      "__v": 0,
      "completedAt": null,
      "completed": false
    },
    {
      "_id": "5821329da28c2e0010ec80e1",
      "text": "this is another fsample to do",
      "_creator": "581ee75bacea2000100c464f",
      "__v": 0,
      "completedAt": null,
      "completed": true
    },
    {
      "_id": "582132a9a28c2e0010ec80e2",
      "text": "I got somethinffg else to do",
      "_creator": "581ee75bacea2000100c464f",
      "__v": 0,
      "completedAt": null,
      "completed": false
    },
    {
      "_id": "582132b7a28c2e0010ec80e3",
      "text": "my todo list is fucking awesome",
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
      this.updating = !this.updating
      this.$emit('edit')
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


new Vue({
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
      this.todos = this.todos.filter(function(elem, index){
        return elem.text != text;
      })
    },
    showaddnew: function(){
      this.addingnewtodo = !this.addingnewtodo;
    },
    addnew: function(newtodotext){
      console.log('you want to add new?')
      this.addingnewtodo = !this.addingnewtodo;
      var newtodo = {
        text: newtodotext,
        completed: false
      }
      console.log(newtodo);
      this.todos.push(newtodo)
    },
    toggle: function(text){
      console.log(text);
      for(var i = 0; i < this.todos.length; i++){
        if(this.todos[i].text == text){
          this.todos[i].completed = !this.todos[i].completed;
        }
      }
    },
    edit: function(){

    }
  },
  mounted: function(){
    // instance.get('')
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    this.$http.post('https://st-todo-api.herokuapp.com/todos').then((response) => {
        console.log(response)
      }, (response) => {
        // error callback
      });
  }
})
