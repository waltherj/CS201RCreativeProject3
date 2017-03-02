var template = `
    <div class="card stopwatch-card">
        <div class="card-block">
            <time output="output"></time><br/>
            <button ng-hide='running' ng-click="startTime()" class="btn btn-success">Start</button>
            <button ng-show='running' ng-click="stopTime()" class="btn btn-warning">Stop</button>
            <button ng-click="clearTime()" class="btn btn-danger">Clear</button>
            <button ng-click="lap()" class="btn btn-primary">Lap</button>
            <br/>
            <div class="lap" ng-show="laps.length">
                <table>
                    <tr>
                        <td>Current : </td>
                        <td><time output="lapTime"></time></td>
                    </tr>
                    <tr ng-repeat="(i, lap) in laps">
                        <td>Lap {{i}} : </td> <td><time output="lap.output"></time></td>
                    </tr> 
                </table>
            </div>
        </div>
    </div>
`

function stopwatchDirective ($interval) {
    return {
        scope: {
            millis: '='
        },
        restrict: 'E',
        replace: 'true',
        template: (template),
        link: function(scope) {
            var interval;
            var lastUpdate;
            scope.output = {
                hundredths: '00',
                seconds: '00',
                minutes: '00',
                hours: '00'
            };
            scope.running = false;
            scope.laps = [];

            function formatTime(millis) {
                hundredths = Math.floor(millis / 10 % 100);
                seconds = Math.floor(millis / 1000 % 60);
                minutes = Math.floor(millis / 1000 / 60 % 60);
                hours = Math.floor(millis / 1000 / 60 / 60 % 24);

                return {
                    hundredths: hundredths < 10 ? '0' + hundredths : hundredths,
                    seconds: seconds < 10 ? '0' + seconds : seconds,
                    minutes: minutes < 10 ? '0' + minutes : minutes,
                    hours: hours < 10 ? '0' + hours : hours
                }
            }

            function tick() {
                var now = Date.now();
                var delta = now - lastUpdate;
                lastUpdate = now;

                var newMillis = scope.millis + (delta * 1); // increase this 1 for debugging


                scope.millis = newMillis;
                // ouput all new times to view, and format them with a leading 0 if needed
                scope.output = formatTime(scope.millis);
                var lapMillis = scope.laps.length === 0 ? scope.millis : scope.millis - scope.laps[scope.laps.length - 1].millis;
                scope.lapTime = formatTime (lapMillis);
            }

            scope.startTime = function() {
                if (!lastUpdate) {
                    lastUpdate = Date.now();
                }
                if (!interval) {
                    scope.running = true;
                    interval = $interval(tick, 0);
                }
            };

            scope.stopTime = function() {
                if (interval) {
                    scope.running = false;
                    $interval.cancel(interval);
                    interval = null;
                    lastUpdate = null;
                }
            };

            scope.clearTime = function() {
                if (interval) {
                    scope.running = false;
                    $interval.cancel(interval);
                    interval = null;
                    lastUpdate = null;
                }
                scope.millis = 0;
                scope.output = {
                    hundredths: '00',
                    seconds: '00',
                    minutes: '00',
                    hours: '00'
                }
            }

            scope.lap = function() {
                var milliseconds = scope.laps.length === 0 ? scope.millis : scope.millis - scope.laps[scope.laps.length - 1].millis;
                scope.laps.push({
                    output: formatTime(milliseconds),
                    millis: scope.millis
                });
            }
        }
    };
}
