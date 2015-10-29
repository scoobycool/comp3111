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
                  it('setFirstAndRestSentence', function() {
                     var ctrl = controller('TodoCtrl', {
                                           $scope: scope
                                           });
                     
                     var testInputs = [
                                       {str:"Hello? This is Sung", exp: "Hello?"},
                                       {str:"Hello.co? This is Sung", exp: "Hello.co?"},
                                       {str:"Hello.co This is Sung", exp: "Hello.co This is Sung"},
                                       {str:"Hello.co \nThis is Sung", exp: "Hello.co \n"},
                                       
                                       {str:"Hello?? This is Sung", exp: "Hello??"},
                                    
                                       {str:"adsd", exp: "adsd"},
                                       ];
                     
                     for (var i in testInputs) {
                     var results = scope.getFirstAndRestSentence(testInputs[i].str);
                     expect(results[0]).toEqual(testInputs[i].exp);
                     }
                     });
                  
                  
                  it('RoomId', function() {
                     location.path('/new/path');
                     
                     var ctrl = controller('TodoCtrl', {
                                           $scope: scope,
                                           $location: location
                                           });
                     
                     expect(scope.roomId).toBe("new");
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
                  
                  it('Add echo & edit todo', function() {
                     var ctrl = controller('TodoCtrl', {
                                           $scope: scope,
                                           $location: location,
                                           $firebaseArray: firebaseArray,
                                           $sce: sce,
                                           $localStorage: localStorage,
                                           $window: window
                                           });
                     
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
                                       }];
                                          scope.addEcho(questionList[0]);
                     scope.editTodo(questionList[0]);
                                          expect(questionList[0].echo).toBe(4);
                     
                     
                     });
                  
                  it('complete', function() {
                     var ctrl = controller('TodoCtrl', {
                                           $scope: scope,
                                           $location: location,
                                           $firebaseArray: firebaseArray,
                                           $sce: sce,
                                           $localStorage: localStorage,
                                           $window: window
                                           });
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
                                       }];
                     scope.toggleCompleted(questionList[0]);
                     expect(questionList[0].completed).toEqual(true);
                     
                     });
                  
                  it('Quote', function() {
                     var ctrl = controller('TodoCtrl', {
                                           $scope: scope,
                                           $location: location,
                                           $firebaseArray: firebaseArray,
                                           $sce: sce,
                                           $localStorage: localStorage,
                                           $window: window
                                           });
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
                                       wholeMsg: "12345678901234567890fqtwybeduwyqbdywqbdubduqwbduqwbduewbduyweqbdyuwebduewdvuywedvwuebdweudbweudbweudbewqudbeqwudbewkdbweqdhbewidubwediubwediybewidybweidybweiqdybwqeidybwqeidybwqeidubweiudbeqwudbequwiybdwqueiydbiwquedbwqieudybeiqwudbweqiubdyewyudbweqiudybeqwiuydbwqeiudbwqeuydbwqeudybwqeubdyiwqeduiybwqeidyuqwbedubeqwydeiquwyweubdhwediuyqwdybqwiuydbwqediybdbbb",
                                       head: "head",
                                       headLastChar: "?",
                                       desc: "desc",
                                       linkedDesc: "linkedDesc",
                                       completed: false,
                                       timestamp: 0,
                                       tags: "...",
                                       echo: 2,
                                       order: 4
                                       }];
                     scope.quote(questionList[0]);
                     scope.input = {};
                     scope.input.wholeMsg="hello";
                     scope.addTodo();
                     scope.quote(questionList[1]);
                     scope.input = {};
                     scope.input.wholeMsg="hello";
                     scope.addTodo();
                     
                     });
                  
                  it('Add todo', function() {
                     var ctrl = controller('TodoCtrl', {
                                           $scope: scope,
                                           $location: location,
                                           $firebaseArray: firebaseArray,
                                           $sce: sce,
                                           $localStorage: localStorage,
                                           $window: window
                                           });
                     scope.input = {};
                     scope.input.wholeMsg="hello";
                     scope.addTodo();
                     scope.input.wholeMsg="";
                     scope.addTodo();
                     });
                  
                  it('done ed', function() {
                     var ctrl = controller('TodoCtrl', {
                                           $scope: scope,
                                           $location: location,
                                           $firebaseArray: firebaseArray,
                                           $sce: sce,
                                           $localStorage: localStorage,
                                           $window: window
                                           });
                     
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
                                       wholeMsg: "",
                                       head: "head",
                                       headLastChar: "?",
                                       desc: "desc",
                                       linkedDesc: "linkedDesc",
                                       completed: false,
                                       timestamp: 0,
                                       tags: "...",
                                       echo: 2,
                                       order: 4
                                       }];
                     scope.doneEditing(questionList[0]);
                     scope.doneEditing(questionList[1]);
                     });
                  
                  it('clearCom', function() {
                     var ctrl = controller('TodoCtrl', {
                                           $scope: scope,
                                           $location: location,
                                           $firebaseArray: firebaseArray,
                                           $sce: sce,
                                           $localStorage: localStorage,
                                           $window: window
                                           });
                     
                     scope.clearCompletedTodos();
                     scope.todos=[{
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
                                  wholeMsg: "",
                                  head: "head",
                                  headLastChar: "?",
                                  desc: "desc",
                                  linkedDesc: "linkedDesc",
                                  completed: true,
                                  timestamp: 0,
                                  tags: "...",
                                  echo: 2,
                                  order: 4
                                  }];
                     scope.clearCompletedTodos();
                     });
                  
                  it('FBlogout',function(){
                     var ctrl = controller('TodoCtrl', {
                                           $scope: scope,
                                           });
                     scope.FBLogout();
                     expect(scope.isAdmin).toBeFalsy();
                     
                     });
                  
                  it('increasemax',function(){
                     var ctrl = controller('TodoCtrl', {
                                           $scope: scope,
                                           $location: location,
                                           $firebaseArray: firebaseArray,
                                           $sce: sce,
                                           $localStorage: localStorage,
                                           $window: window
                                           });
                     scope.maxQuestion=5;
                     scope.totalCount=7;
                     var temp=scope.maxQuestion;
                     scope.increaseMax();
                     expect(scope.maxQuestion).toEqual(temp+10);
                     scope.maxQuestion=5;
                     scope.totalCount=3;
                     scope.increaseMax();
                     });
                  
                  var authData=function(){};
                  
                  it('FBlogin',function(){
                     var ctrl = controller('TodoCtrl', {
                                           $scope: scope,
                                           $location: location,
                                           $firebaseArray: firebaseArray,
                                           $sce: sce,
                                           $localStorage: localStorage,
                                           $window: window
                                           });
                     scope.FBLogin();
                     });
                  
                  it('watch',function(){
                     var ctrl = controller('TodoCtrl', {
                                           $scope: scope,
                                           $location: location,
                                           $firebaseArray: firebaseArray,
                                           $sce: sce,
                                           $localStorage: localStorage,
                                           $window: window
                                           });
                     scope.todos=[{
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
                                  wholeMsg: "",
                                  head: "head",
                                  headLastChar: "?",
                                  desc: "desc",
                                  linkedDesc: "linkedDesc",
                                  completed: true,
                                  timestamp: 0,
                                  tags: "...",
                                  echo: 2,
                                  order: 4
                                  },{
                                  nottodo:1
                                  }];
                     scope.$digest();
                     });
                  });
         });


