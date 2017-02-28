var template = `
    <div class="card stopwatch-card">
        <div class="card-block">
            <div class="time">
                <div class='time-section'>{{output.hours}}</div>
                : <div class='time-section'>{{output.minutes}}</div>
                : <div class='time-section'>{{output.seconds}}</div>
                : <div class="time-section">{{output.hundredths}}</div>
            </div>
            <button ng-click="startTime()" class="btn btn-primary">Start</button>
            <button ng-click="stopTime()" class="btn btn-warning">Stop</button>
            <button ng-click="clearTime()" class="btn btn-danger">Clear</button>
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

            function tick() {
                var now = Date.now();
                var delta = now - lastUpdate;
                lastUpdate = now;

                var newMillis = scope.millis + (delta * 1); // increase this 1 for debugging

                hundredths = Math.floor(scope.millis / 10 % 100);
                seconds = Math.floor(scope.millis / 1000 % 60);
                minutes = Math.floor(scope.millis / 1000 / 60 % 60);
                hours = Math.floor(scope.millis / 1000 / 60 / 60 % 24);

                scope.millis = newMillis;
                // ouput all new times to view, and format them with a leading 0 if needed
                scope.output = {
                    hundredths: hundredths < 10 ? '0' + hundredths : hundredths,
                    seconds: seconds < 10 ? '0' + seconds : seconds,
                    minutes: minutes < 10 ? '0' + minutes : minutes,
                    hours: hours < 10 ? '0' + hours : hours
                }
            }

            scope.startTime = function() {
                if (!lastUpdate) {
                    lastUpdate = Date.now();
                }
                if (!interval) {
                    interval = $interval(tick, 0);
                }
            };

            scope.stopTime = function() {
                if (interval) {
                    $interval.cancel(interval);
                    interval = null;
                    lastUpdate = null;
                }
            };

            scope.clearTime = function() {
                if (interval) {
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
        }
    };
}
