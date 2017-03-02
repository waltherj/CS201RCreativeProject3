angular.module('app', [])
    .controller('mainCtrl', mainCtrl)
    .directive('stopwatch', stopwatchDirective)
    .directive('time', timeDirective)

function mainCtrl ($scope) {
    $scope.time = 0;
}

