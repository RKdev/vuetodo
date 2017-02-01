/*jshint esversion:6*/
import Vue from 'vue';
require('../index.html');

window.component1 = new Vue(
  {
    el: '#component1',
    data:{
      message: "Hello, World!"
    }
  }
);
