/*jshint esversion:6*/ //tells linter to be quite about node syntax
import Vue from 'vue';
require('../index.html'); //tells webpack hot loader to reset on html changes too

// routes
var routes = {
  all: 'all',              // #/all
  active: 'active',       // #/active
  completed: 'completed' // #/completed
};

//define router
function onHashChange() {
  var route = window.location.hash.replace(/#\/?/, ''); //strip out the # and /
  if (routes[route]) {          //check routes list
    app.currentRoute = route;   // set route
  } else {
    window.location.hash = '';
    app.currentroute = 'all';
  }
}

//instantiate router
window.addEventListener('hashchange', onHashChange);

/*.filter is an arrayPrototype function.
   filters receives an array of all todos, then returns a new array of
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
    todos: [],
    newTodo: '',
    currentRoute: 'all' //define this as a real route, or else vue will cough
                        // when it can't find this value in the "filters" object
  },
  watch:{},
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
      if (!value) {
        console.log('newTodo: empty');
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
    }
  },
  directives:{}
});

app.$mount('#todoapp');
onHashChange();
