/*jshint esversion:6*/
import Vue from 'vue';
require('../index.html');

window.helloworld = new Vue(
  {
    el: '#helloworld',
    data:{
      helloworld: "Hello, World!"
    }
  }
);
