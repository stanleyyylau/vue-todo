<template>
  <div id="myapp">
    <!-- Container for todo items -->
    <div class="container">
      <div class="row text-center add-new-container">
        <button type="button" class="btn btn-primary" @click="showaddnew">add new</button>
      </div>
      <addtodo v-show="addingnewtodo" @addnew="addnew"></addtodo>
      <ul class="list-group">
        <todoitem v-for="todo in queryTodos" v-bind:todo="todo" @edit="edit" @deletetodo="deletetodo" @toggle="toggle">
        </todoitem>
      </ul>
    </div>

    <!-- Nav bar, it will have router function in future -->
    <div class="nav-bar-wrapper">
      <div class="nav-bar">
        <a @click="query='all'">All Todos</a>
        <a @click="query='completed'">Completed</a>
        <a @click="query='Notcompleted'">Not Completed</a>
      </div>
    </div>

  </div>
</template>

<script>




import addtodo from './components/AddToDo.vue'
import help from './components/help.vue'
import todoitem from './components/TodoItem.vue'

export default {
  name: 'app',
  data () {
    return {
      todos: '',
      query: 'all',
      addingnewtodo: false,
      newtodo: ''
    }
  },
  components: {
    'addtodo': addtodo,
    'todoitem': todoitem
  }
}
</script>
