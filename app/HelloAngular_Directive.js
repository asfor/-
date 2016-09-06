var myModule = angular.module("MyModule", []);
myModule.directive("karma", function() {
    return {
        restrict: 'E',
        template: '<div>Hi everyone!</div>',
        replace: true
    }
});