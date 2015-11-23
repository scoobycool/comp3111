beforeEach(module('todomvc'));

describe('Testing todo focus', function() {
  var scope, compile;

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();
    compile = $compile
  }));

  it('should place focus on the element it is applied to when the expression it binds to evaluates to true', function() {
    var elem = angular.element('<input todo-focus="focus">');
    scope.focus = false;

    compile(elem)(scope);
    
    scope.$apply(function () {
      scope.focus = true;
    });

    expect(scope.focus).toBe(true);
  });

});