'use strict';

var questionList=[{
  wholeMsg: "newTodo",
  head: "head",
  headLastChar: "?",
  desc: "desc",
  linkedDesc: "linkedDesc",
  completed: false,
  timestamp: 0,
  tags: "...",
  echo: 3,
  order: 3
},{
  wholeMsg: "newTodo",
  head: "head",
  headLastChar: "?",
  desc: "desc",
  linkedDesc: "linkedDesc",
  completed: false,
  timestamp: 0,
  tags: "...",
  echo: 2,
  order: 4
},{
  wholeMsg: "newTodo",
  head: "head",
  headLastChar: "?",
  desc: "desc",
  linkedDesc: "linkedDesc",
  completed: false,
  timestamp: 0,
  tags: "...",
  echo: 2,
  order: 5
},{
  wholeMsg: "newTodo",
  head: "head",
  headLastChar: "?",
  desc: "desc",
  linkedDesc: "linkedDesc",
  completed: false,
  timestamp: 0,
  tags: "...",
  echo: 2,
  order: 6
},{
  wholeMsg: "newTodo",
  head: "head",
  headLastChar: "?",
  desc: "desc",
  linkedDesc: "linkedDesc",
  completed: false,
  timestamp: new Date().getTime(), //new
  tags: "...",
  echo: 2,
  order: 0
},{
  wholeMsg: "newTodo",
  head: "head",
  headLastChar: "?",
  desc: "desc",
  linkedDesc: "linkedDesc",
  completed: false,
  timestamp: new Date().getTime()-1, //new
  tags: "...",
  echo: 0,
  order: 2
},{
  wholeMsg: "newTodo",
  head: "head",
  headLastChar: "?",
  desc: "desc",
  linkedDesc: "linkedDesc",
  completed: false,
  timestamp: new Date().getTime(), // latest
  tags: "...",
  echo: 0,
  order: 1
}];

var timeList=[{
                  wholeMsg: "newTodo",
                  head: "head",
                  headLastChar: "?",
                  desc: "desc",
                  linkedDesc: "linkedDesc",
                  completed: false,
                  timestamp: 0,
                  tags: "...",
                  echo: 3,
                  order: 1
                  },{
                  wholeMsg: "newTodo",
                  head: "head",
                  headLastChar: "?",
                  desc: "desc",
                  linkedDesc: "linkedDesc",
                  completed: false,
                  timestamp: 1,
                  tags: "...",
                  echo: 2,
                  order: 2
                  },{
                  wholeMsg: "newTodo",
                  head: "head",
                  headLastChar: "?",
                  desc: "desc",
                  linkedDesc: "linkedDesc",
                  completed: false,
                  timestamp: 1,
                  tags: "...",
                  echo: 1,
                  order: 3
                  },{
                  wholeMsg: "newTodo",
                  head: "head",
                  headLastChar: "?",
                  desc: "desc",
                  linkedDesc: "linkedDesc",
                  completed: false,
                  timestamp: 3,
                  tags: "...",
                  echo: 2,
                  order: 4
                  },{
                  wholeMsg: "newTodo",
                  head: "head",
                  headLastChar: "?",
                  desc: "desc",
                  linkedDesc: "linkedDesc",
                  completed: false,
                  timestamp: 4,
                  tags: "...",
                  echo: 2,
                  order: 5
                  },{
                  wholeMsg: "newTodo",
                  head: "head",
                  headLastChar: "?",
                  desc: "desc",
                  linkedDesc: "linkedDesc",
                  completed: false,
                  timestamp: 5,
                  tags: "...",
                  echo: 0,
                  order: 6
                  },{
                  wholeMsg: "newTodo",
                  head: "head",
                  headLastChar: "?",
                  desc: "desc",
                  linkedDesc: "linkedDesc",
                  completed: false,
                  timestamp: 6,
                  tags: "...",
                  echo: 0,
                  order: 7
                  }];

describe('TodoCtrl', function() {
  beforeEach(module('todomvc'));

  describe('questionFilter Testing', function() {
    beforeEach(module(function($provide) {
      $provide.value('version', 'TEST_VER'); //TODO: what is this provide?
      console.log("provide.value: " + $provide.value);
    }));

    it('has a question filter', inject(function($filter) {
      expect($filter('questionFilter')).not.toBeNull();
    }));

    it('Filter order test', inject(function(questionFilterFilter) { // need to put Filter suffix
      var filteredList = questionFilterFilter(questionList, 100,0);
      for (var i in filteredList) {
        expect(""+filteredList[i].order).toEqual(i);
      }
    }));

    it('Filter max test', inject(function(questionFilterFilter) { // need to put Filter suffix
      var filteredList = questionFilterFilter(questionList, 1,0);
      expect(filteredList.length).toEqual(5);

      for (var i in filteredList) {
        expect(""+filteredList[i].order).toEqual(i);
      }
    }));
    
    it('Filter time test',inject(function(questionFilterFilter){
      var filteredList = questionFilterFilter(timeList,1,1);
      expect(filteredList.length).toEqual(5);
      for(var i in filteredList){
        expect(""+filteredList[i].order).toEqual(i);
      }
    }));
  });
 describe('momentFilter Testing',function(){
    beforeEach(module(function($provide) {
      $provide.value('version', 'TEST_VER'); //TODO: what is this provide?
      console.log("provide.value: " + $provide.value);
      }));
          
      it('has a moment filter', inject(function($filter) {
            expect($filter('momentFilter')).not.toBeNull();
        }));
    });
});
