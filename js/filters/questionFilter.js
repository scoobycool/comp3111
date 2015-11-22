/*global todomvc, angular, Firebase */
'use strict';

/**
* The questionFilter
* Show the new questions on the top and show only max questions 
*
*/
todomvc.filter('questionFilter', function () {
  return function (input, max,filterSelection) {
    var sorted = [];
    var newQuestions = [];
    var sortedCount = 0;

    angular.forEach(input, function (todo) {
      if (todo.timestamp > new Date().getTime() - 180000) { // 3min
        todo.new = true;
        newQuestions.push(todo);
      } else if (sortedCount++<=max){  // show top n only.
        todo.new = false;
        sorted.push(todo);
      }

      // sorting new questions based on the time if echo is the same.
      // Newer ones are on the top
	  if(filterSelection==0){
      newQuestions.sort(function(a, b) {
        if (a.echo == b.echo) {
          return b.timestamp - a.timestamp;
        }
        return b.echo - a.echo;
      });
	   sorted.sort(function(a, b) {
       if (a.echo == b.echo) {
          return b.timestamp - a.timestamp;
        }
        return b.echo - a.echo;
      });
	  }
	  
	  else if(filterSelection==1){
		sorted.sort(function(a, b) {
        if (a.timestamp == b.timestamp) {
          return b.echo - a.echo;
        }
        return b.timestamp - a.timestamp;
      });
	  }
	  
	});
    // Combined list
	sorted[0].mostLiked = true;
    return newQuestions.concat(sorted);
  };
});