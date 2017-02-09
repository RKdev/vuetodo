/*jshint esversion:6*/
import Vue from 'vue';
require('../index.html');

// handle routing
function onHashChange() {
  var route = window.location.hash.replace(/#\/?/, ''); //strip out the # and /
  console.log(window.location.hash);
  console.log(route);
  if (routes[route]) {  //check routes list
    app.currentRoute = route;
  } else {
    window.location.hash = '';
    app.currentRoute = 'all';
  }
}

window.addEventListener('hashchange', onHashChange);
var routes = {
  all: 'all',
  active: 'active',
  completed: 'completed'
};
window.app = new Vue({

  data: {
    todos: [],
    newTodo: '',
    currentRoute: false
  },
  watch:{},
  computed:{},
  filters:{},
  methods:{
    addTodo: function() {
      var value = this.newTodo;
      if (!value) {
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
onHashChange();
