angular.module('app', [])
    .controller('mainCtrl', mainCtrl)
    .directive('stopwatch', stopwatchDirective);

function mainCtrl ($scope) {
    $scope.time = 0;
}

