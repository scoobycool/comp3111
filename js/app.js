/*global angular */
/*jshint unused:false */
'use strict';

/**
* The main TodoMVC app module
*
* @type {angular.Module}
*/
var myapp = angular.module('myapp', ['angularMoment']);

var todomvc = angular.module('todomvc', ['firebase', 'ngStorage','ngSanitize','ui.bootstrap','angular-smilies']);

var emoji = angular.module("myApp", ['ngSanitize', 'emojiApp']);