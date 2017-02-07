/*jshint esversion:6*/
import Vue from 'vue';
require('../index.html');

window.app = new Vue({

  data: {
    todos: [1,2,3],
    newTodo: ''
  },
  watch:{},
  computed:{},
  filters:{},
  methods:{
    addTodo: function() {
      if (this.newTodo === '') {
        return(1);
      }
      this.todos.push(
        this.newTodo
      );
      this.newTodo = '';
      return(0);
    },
    removeTodo: function (todo) {
        this.todos.splice(this.todos.indexOf(todo),1);
    },
    clearTodo: function(){
      this.newTodo = '';
    }
  },
  directives:{}
});

app.$mount('#todoapp');
