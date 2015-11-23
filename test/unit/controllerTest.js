'use strict';

describe('sorting the list of users', function() {
  it('sorts in descending order by default', function() {
    var users = ['jack', 'igor', 'jeff'];
    //    var sorted = sortUsers(users);
    //    expect(sorted).toEqual(['jeff', 'jack', 'igor']);
  });
});

describe('TodoCtrl', function() {
  beforeEach(module('todomvc'));
  // variables for injection
  var controller;
  var scope;
  var location;
  var firebaseArray;
  var sce;
  var localStorage;
  var window;

  // Injecting variables
  // http://stackoverflow.com/questions/13664144/how-to-unit-test-angularjs-controller-with-location-service
  beforeEach(inject(function($location,
    $rootScope,
    $controller,
    $firebaseArray,
    $localStorage,
    $sce,
    $window){
      // The injector unwraps the underscores (_) from around the parameter names when matching

      scope = $rootScope.$new();

      location = $location;
      controller = $controller;
      firebaseArray = $firebaseArray;
      sce = $sce;
      localStorage = $localStorage;
      window = $window;
    }));

    describe('TodoCtrl Testing', function() {
      it('scopestorage = localStorage',function(){
        var ctrl = controller('TodoCtrl',{
          $scope: scope,
          $localStorage: localStorage
        });
        expect(scope.$storage).toBe(localStorage);
      });

      it('maxQuestion=scopedelta',function(){
        var ctrl = controller('TodoCtrl',{
          $scope: scope
        });
        expect(scope.maxQuestion).toEqual(10);
      });

      it('setFirstAndRestSentence', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope
        });

        var testInputs = [
          {str:"Hello? This is Sung", exp: "Hello?"},
          {str:"Hello.co? This is Sung", exp: "Hello.co?"},
          {str:"Hello.co This is Sung", exp: "Hello.co This is Sung"},
          {str:"Hello.co \nThis is Sung", exp: "Hello.co \n"},
          {str:"Hello?? \nThis is Sung", exp: "Hello??"},
        ];

        for (var i in testInputs) {
          var results = scope.getFirstAndRestSentence(testInputs[i].str);
          expect(results[0]).toEqual(testInputs[i].exp);
        }
        var results = scope.getFirstAndRestSentence("Hello.XD?");
        expect(results[0]).toEqual('Hello.');
        var results = scope.getFirstAndRestSentence("Hello\nXD.gg?");
        expect(results[0]).toEqual('Hello\n');
      });

      it('RoomId', function() {
        location.path('/new/path');

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location
        });

        expect(scope.roomId).toBe("new");
      });

      it('RoomIdnull', function() {
        location.path('');

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location
        });

        expect(scope.roomId).toBe("all");
      });

      it('watchcollection', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });

        var testTodos = [{
          wholeMsg: "newTodo",
          head: "head",
          headLastChar: "?",
          desc: "desc",
          linkedDesc: "linkedDesc",
          completed: false,
          timestamp: 0,
          tags: "...",
          echo: 1,
          order: 3
        },{
          wholeMsg: "newTodo",
          head: "head",
          headLastChar: "?",
          desc: "desc",
          linkedDesc: "linkedDesc",
          completed: true,
          timestamp: 0,
          tags: "...",
          echo: 3,
          order: 2
        },{},];

        scope.todos = testTodos;
        scope.$digest();
      });

      it('getYoutube Testing',function(){
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $localStorage:localStorage,
          $location:location,
          $sce:sce
        });

        var text1 = "https://www.youtube.com/watch?v=QSgFONImQw0";
        expect(scope.getYoutube(text1)).toEqual('QSgFONImQw0');
        var text2="gg";
        expect(scope.getYoutube(text2)).toBe(null);
      });



      it('addEcho Testing', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $localStorage:localStorage,
          $location:location,
          $sce:sce
        });

        
        scope.input = {wholeMsg: "hi"};
        scope.todo = {echo:0,order:1,todo.hasLiked:false};
        scope.addEcho(scope.todo);
        scope.todo = {echo:0,order:1,todo.hasLiked:true};
        scope.addEcho(scope.todo);

        expect(scope.input.wholeMsg).toEqual('');
      });


      it('DisLike Testing', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $localStorage:localStorage,
          $location:location,
          $sce:sce
        });

        
        scope.input = {wholeMsg: "hi"};
        scope.todo = {echo:0,order:1,todo.hasDisliked:false};
        scope.dislike(scope.todo);
        scope.todo = {echo:0,order:1,todo.hasDisliked:true};
        scope.dislike(scope.todo);

        expect(scope.input.wholeMsg).toEqual('');
      });

      it('Quote Message Testing',function(){
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $localStorage:localStorage,
          $location:location,
          $sce:sce
        });

        var quoteMsg;
        scope.todo = {wholeMsg:"xd"};
        scope.quote(scope.todo);
        scope.todo2 = {wholeMsg:"sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"};
        scope.qutoe(scope.todo2);
      });

      it('Add Reply Testing',function(){
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $localStorage:localStorage,
          $location:location,
          $sce:sce
        });
        scope.todo = {reply:[{msg:"xas"}]};
        scope.todo.input.wholeReply = "";
        scope.addReply(todo);
        scope.todo = {reply:[{msg:"xas"}]};
        scope.data0.user_id = "null";
        scope.todo.input.wholeReply = "hi";
        scope.addReply(todo);
        scope.todo = {reply:[{msg:"xas"}]};
        scope.data0.user_id = "sdsdq";
        scope.todo.input.wholeReply = "hi";
        scope.addReply(todo);
        scope.todo = {};
        scope.todo.input.wholeReply = "hi";
        scope.addReply(todo);

      });


      it('editTodo', function(){
        var ctrl = controller('TodoCtrl',{
          $scope: scope,
          $location: location,
          $firebaseArray : firebaseArray
        });
        scope.todo ={
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
                    }
        scope.originalTodo ={
                      wholeMsg: "editedTodo",
                      head: "head",
                      headLastChar: "?",
                      desc: "desc",
                      linkedDesc: "linkedDesc",
                      completed: false,
                      timestamp: 0,
                      tags: "...",
                      echo: 3,
                      order: 1
                    }
        scope.editTodo(scope.todo);
        expect(scope.originalTodo).toEqual(angular.extend({}, scope.todo)) ;
      });
      

      it('addTodo Testing', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });
        scope.input.wholeMsg = "";
        scope.addTodo();
        scope.input.wholeMsg = "hi!..";
        scope.imagelink = null;
        scope.data0.user_id = null;
        scope.addTodo();
        scope.input.wholeMsg = "hi!..";
        scope.imagelink = "sdsdsd";
        scope.data0.user_id = "sdwqer";
        scope.addTodo();
  
      });

      it('doneEditing Testing', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });

        var t1 = {wholeMsg: "Hello!"};
        scope.doneEditing(t1);

        var t2 = {wholeMsg: ""};
        scope.doneEditing(t2);
      });

      it('revertEditing Testing', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });

        var test = {wholeMsg: "test"};
        scope.originalTodo = {wholeMsg: "test"};
        scope.revertEditing(test);
        expect(scope.doneEditing(test)).toHaveBeenCalled();
      });

      it('RemoveTodo',function(){
          var ctrl = controller('TodoCtrl',{
          $scope:scope,
          $firebaseArray:firebaseArray,
          $location : location
        });

        var testTodos =[{wholeMsg:"1"},{wholeMsg:"2"}];
        scope.todos = testTodos;
        scope.$digest();  
      var todo = {wholeMsg:"1"};
      scope.removeTodo(todo);
      var todo = '';
      scope.removeTodo(todo);
      expect(scope.todos.length).toEqual(1);              
      });

      it('clearCompletedTodos Testing', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });
        var testTodos = [{
          wholeMsg: "newTodo",
          head: "head",
          headLastChar: "?",
          desc: "desc",
          linkedDesc: "linkedDesc",
          completed: false,
          timestamp: 0,
          tags: "...",
          echo: 1,
          order: 3
        },{
          wholeMsg: "newTodo",
          head: "head",
          headLastChar: "?",
          desc: "desc",
          linkedDesc: "linkedDesc",
          completed: true,
          timestamp: 0,
          tags: "...",
          echo: 3,
          order: 2
        }];
        scope.todos = testTodos;
        scope.clearCompletedTodos();

        expect(scope.remainingCount).toEqual(1);
      });

      it('toggleCompleted Testing', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });

        var test = {
          wholeMsg: "newTodo",
          head: "head",
          headLastChar: "?",
          desc: "desc",
          linkedDesc: "linkedDesc",
          completed: false,
          timestamp: 0,
          tags: "...",
          echo: 1,
          order: 3
        };
        scope.toggleCompleted(test);
        expect(test.completed).toBe(true);
      });

      it('markAll Testing', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });

        var testTodos = [{
          wholeMsg: "newTodo",
          head: "head",
          headLastChar: "?",
          desc: "desc",
          linkedDesc: "linkedDesc",
          completed: false,
          timestamp: 0,
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
          timestamp: 0,
          tags: "...",
          echo: 3,
          order: 2
        }];
        scope.todos = testTodos;
        scope.markAll();

        expect(scope.completedCount).toEqual(scope.totalCount);
      });

      it('FBLogin Testing', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });
        var error = false;
        var authTestData = false;
        
        scope.FBLogin();
        var authTestData = true;
        scope.FBLogin();
        expect(scope.isAdmin).toBe(true);
      });

      it('FBLogout Testing', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
        });

        scope.FBLogout();
        expect(scope.isAdmin).toBe(false);
      });

      it('increasemax',function(){
        var ctrl = controller('TodoCtrl',{
          $scope: scope,
          $firebaseArray :firebaseArray
        })
        scope.maxQuestion = 1;
        scope.totalCount = 2;
        scope.increaseMax();
        expect(scope.maxQuestion).toBeGreaterThan(1);
        scope.maxQuestion = 2;
        scope.totalCount = 1;
        scope.increaseMax();
        expect(scope.maxQuestion).toEqual(2);
        });

      it('toTop Testing', function() {
        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });

        scope.toTop();
        expect(window.scrollX).toBe(0);
        expect(window.scrollY).toBe(0);
      });

    });
  });