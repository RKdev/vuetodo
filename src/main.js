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
    app.currentroute = 'all';
  }
}

/*.filter is an arrayPrototype function.
   filters receives an array of all todos, then returns a new array of
   elements that pass the filter
*/

var filters = {
  //no filter - returns everything
  all: function (todos) {
    return todos;
  },
  //returns everything that hasn't been completed yet (completed items disappear when checked)
  active: function (todos) {
    return todos.filter(function (todo) {
      return !todo.completed;
    });
  },
  //returns everything has been completed
  completed: function (todos) {
    return todos.filter(function (todo) {
      return todo.completed;
    });
  }
};

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
    currentRoute: 'all'
  },
  watch:{},
  computed:{
    filteredTodos: function () {
      return filters[this.currentRoute](this.todos);
    }
  },
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
