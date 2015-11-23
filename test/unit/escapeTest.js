
/*global todomvc */
'use strict';

describe('todoEscape directive', function () {
  var scope, compile, element;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    compile = $compile;
    var triggerKeyDown = function (element, keyCode) {
   var e = jQuery.Event("keydown");
   e.keyCode = keyCode;
   element.triggerHandler(esc);
 };
  }));



  it('should call callback function on escape', function() {
    var someValue = false,
    element = angular.element('<input todo-escape="doSomething()">');

     scope.doSomething = function () {
       someValue = !someValue;
     };

     compile(element)(scope);
    element.triggerHandler('keydown');
    scope.$digest();

      expect(scope.escape).toHaveBeenCalled();

  });

  it('should unbind keydown event when scope is destroyed', function() {
    var someValue = false,
    element = angular.element('<input todo-escape="doSomething()">');

     scope.doSomething = function () {
       someValue = !someValue;
     };

     compile(element)(scope);
    spyOn(element, 'unbind');
    scope.$destroy();

    expect(element.unbind).toHaveBeenCalledWith('keydown');
  });
});