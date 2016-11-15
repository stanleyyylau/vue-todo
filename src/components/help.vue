<!-- Loading template so I can test Axios interceptor -->
<template>
  <!-- Show loading for every Ajax request -->
  <div id="help">
    <div v-show="showLoading">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import loading from './loading.vue';

export default {
  name: 'help',
  props: ['showLoading'],
  methods: {
    addnew: function(){
      var newtodo = this.newtodotext;
      console.log(newtodo);
      this.newtodotext = '';
      this.$emit('addnew', newtodo);
    }
  },
  components: {
    'loading': loading
  }
}
</script>
