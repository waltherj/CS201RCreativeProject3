angular.module('app', [])
    .controller('mainCtrl', mainCtrl)
    .directive('stopwatch', stopwatchDirective)
    .directive('timer', timerDirective);


function mainCtrl ($scope) {
    $scope.stopwatchTime = 0;
    $scope.timerTime = 0;

}

