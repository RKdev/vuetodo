/*jshint esversion:6*/     //tells linter to be quiet about node syntax
import Vue from 'vue';
require('../index.html'); //tells webpack hot loader to reset on html changes
require('../index.css'); //tells webpack hot loader to reset on css changes

// routes
var routes = {
  all: 'all',              // #/all
  active: 'active',       // #/active
  completed: 'completed' // #/completed
};

//define router
function onHashChange() {
  var route = window.location.hash.replace(/#\/?/, ''); //strip out the # and /
  if (routes[route]) {           //check routes list for valid route
    app.currentRoute = route;   // set route
                               //really it sets a string that gets passed to the "filters" object
  } else {
    window.location.hash = '';
    app.currentRoute = 'all';
  }
}

//instantiate router
window.addEventListener('hashchange', onHashChange);

//localStorage

var STORAGE_KEY = 'todos-vuejs-2.1';
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return todos;
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
};

/*.filter is an arrayPrototype function.
   filter receives an array of all todos, then returns a new array of
   elements that pass the filter
*/

//I want a different word than "filters" for this part
//it's easy to confuse with vue filters when I'm trying to reason about the code
//it works for now though
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
  //returns everything that has been completed
  completed: function (todos) {
    return todos.filter(function (todo) {
      return todo.completed;
    });
  }
};

window.app = new Vue({

  data: {
    todos: todoStorage.fetch(),
    newTodo: '',
    currentRoute: 'all', //define this as a real route, or else vue will cough
                       // when it can't find this value in the "filters" object
    editedTodo: false,
    beforeEditCache: ''
  },
  watch:{
    todos: {
      handler: function (todos) {
        todoStorage.save(todos);
      }
    }
  },
  computed:{
    /* passes the current route to the "filters" object and runs
       the associated function to return a filtered list of todo items
    */
    filteredTodos: function () {
      return filters[this.currentRoute](this.todos);
    },
    allDone: {
      //changes checkbox based on if there are remaining unfinished todos
      get: function(){
          return this.remaining === 0; //boolean typecast based on if any todos are unfinished
        },
      //somehow passing an argument to the "set" function lets you see the value of "allDone"
      //but the same doesn't apply to "get" for some reason
      set: function (value) {
        this.todos.forEach(function (todo) {
          todo.completed = value;
        });
      }
      //if check box is set to true, sets all to true
      //if check box is set to false, sets all to false
      //check box is only true if all are true or none exist
    },
    // returns number of remaining todos
    remaining: function () {
      return filters.active(this.todos).length;
    }
  },
  filters:{},
  methods:{
    addTodo: function() {
      var value = this.newTodo;
      if (value === '') {
        return('newTodo: empty');
      }
      this.todos.push({
        title: value,
        completed: false
      });
      this.newTodo = '';
    },
    removeTodo: function (todo) {
        //look up index of selected todo in array of todos and remove it
        this.todos.splice(this.todos.indexOf(todo),1);
    },
    clearTodo: function(){
      //use reactive property of vue data elements to clear the bound input box
      this.newTodo = '';
    },
    removeCompleted: function () {
      //creates an array of the current active elements
     // and overwrites the todos array
      this.todos = filters.active(this.todos);
    },
    editTodo: function (todo) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
      console.log(todo.title);
    },
    cancelEdit: function (todo) {
      this.editedTodo = false;
      todo.title = this.beforeEditCache;
    },
    doneEdit: function (todo) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = false;
      todo.title = todo.title.trim();
      if (!todo.title) {
        this.removeTodo(todo);
      }
    }
  },
  directives:{
    'todo-focus': function (el, expression){
      if (expression.value === true) {
        el.focus();
      }
    },
    'todo-input-focus': function (el, expression){
      if (expression.value === false) {
        el.focus();
      }
    }
  }
});

app.$mount('#todoapp');
onHashChange();
