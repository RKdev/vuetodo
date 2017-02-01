/*jshint esversion:6*/
import Vue from 'vue';
require('../index.html');

window.app1 = new Vue(
  {
    el: '#component-1',
    data:{
      message: "Hello, World!"
    }
  }
);
