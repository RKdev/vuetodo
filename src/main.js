/*jshint esversion:6*/     //tells linter to be quiet about node syntax
import Vue from 'vue';
require('../index.html');
require('../index.css');

var routes = {
  all: 'all',
  active: 'active',
  completed: 'completed'
};

function onHashChange() {
  var route = window.location.hash.replace(/#\/?/, '');
  if (routes[route]) {
    app.currentRoute = route;
  } else {
    window.location.hash = '';
    app.currentRoute = 'all';
  }
}

window.addEventListener('hashchange', onHashChange);

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

var filters = {
  all: function (todos) {
    return todos;
  },
  active: function (todos) {
    return todos.filter(function (todo) {
      return !todo.completed;
    });
  },
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
    currentRoute: 'all',
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
    filteredTodos: function () {
      return filters[this.currentRoute](this.todos);
    },
    allDone: {
      get: function(){
          return this.remaining === 0;
        },
      set: function (value) {
        this.todos.forEach(function (todo) {
          todo.completed = value;
        });
      }
    },
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
        this.todos.splice(this.todos.indexOf(todo),1);
    },
    clearTodo: function(){
      this.newTodo = '';
    },
    removeCompleted: function () {
      this.todos = filters.active(this.todos);
    },
    editTodo: function (todo) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
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
    }
  }
});

app.$mount('#todoapp');
onHashChange();
