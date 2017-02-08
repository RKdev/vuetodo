/*jshint esversion:6*/
import Vue from 'vue';
require('../index.html');

window.app = new Vue({

  data: {
    todos: [],
    newTodo: ''
  },
  watch:{},
  computed:{},
  filters:{},
  methods:{
    addTodo: function() {
      var value = this.newTodo.trim();
      if (value === '') {
        console.log('newTodo: empty');
        return(1);
      }

      this.todos.push({
        title: value,
        completed: false
      });
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
