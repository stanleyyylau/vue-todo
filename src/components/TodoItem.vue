<template id="todoitem-template">
  <li class="list-group-item">
    <template v-if="todo.completed">
      <span @click="showdetail = !showdetail" style="color: #9E9E9E;text-decoration: line-through;">{{ todo.text }}</span>
    </template>
    <template v-else>
      <span @click="showdetail = !showdetail">{{ todo.text }}</span>
    </template>
    <div class="detail-btns" v-show="showdetail">
      <button type="button" class="btn btn-sm btn-success" @click="toggle">Toggle</button>
      <button type="button" class="btn btn-sm btn-primary" @click="edit">Edit</button>
      <button type="button" class="btn btn-sm btn-danger" @click="deletetodo">DELETE</button>
    </div>
    <template v-if="updating">
      <form>
        <div class="form-group">
          <label for="updating">Enter your new todo name</label>
          <input type="email" class="form-control" id="updating">
          <button type="button" @click='confirmEdit' class="btn btn-primary confirm-add">confirm</button>
        </div>
      </form>
    </template>
  </li>
</template>

<script>
export default {
  name: 'todoitem',
  props: ['todo'],
  data () {
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
}
</script>



<!-- Vue.component('todoitem', {
  props: ['todo'],
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
}); -->
