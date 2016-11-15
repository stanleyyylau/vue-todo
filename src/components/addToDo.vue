<!-- Add new todo item template, the popup -->
<template>
  <form>
    <div class="form-group text-center">
      <label for="newToDo">Enter new todo</label>
      <input v-model="newtodotext" type="text" class="form-control" id="newToDo" placeholder="Enter your todo">
      <button type="button" class="btn btn-primary confirm-add" @click="addnew">confirm</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'addtodo',
  data () {
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
}
</script>
