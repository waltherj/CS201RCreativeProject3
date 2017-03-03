var timerTemplate = `
    <div class="card timer-card">
        <div class="card-block">
            <div class="time">
                <div class='time-section'>{{output.hours}}</div>
                : <div class='time-section'>{{output.minutes}}</div>
                : <div class='time-section'>{{output.seconds}}</div>
                : <div class="time-section">{{output.hundredths}}</div>
            </div>
	<input type="number" class="input-xs" ng-model="hour" placeholder="h" min="0"></input>
	<input type="number" class="input-xs" ng-model="minute" placeholder="m" min="0"></input>
	<input type="number" class="input-xs" ng-model="second" placeholder="s" min="0"></input>
           <button ng-click="setTime()" class="btn btn-success">Set Time</button>
<br>
<br>
            <button ng-click="startTime()" class="btn btn-primary">Start</button>
            <button ng-click="stopTime()" class="btn btn-warning">Stop</button>
            <button ng-click="clearTime()" class="btn btn-danger">Clear</button>
        </div>
    </div>
`

function timerDirective ($interval) {
    return {
        scope: {
            millis: '='
        },
        restrict: 'E',
        replace: 'true',
        template: (timerTemplate ),
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

                var newMillis = scope.millis - (delta * 1); // increase this 1 for debugging
                hundredths = Math.floor(scope.millis / 10 % 100);
                seconds = Math.floor(scope.millis / 1000 % 60);
                minutes = Math.floor(scope.millis / 1000 / 60 % 60);
                hours = Math.floor(scope.millis / 1000 / 60 / 60 % 24);

                scope.millis = newMillis;
                // ouput all new times to view, and format them with a leading 0 if needed
                
		if (scope.millis <= 0) {
		scope.clearTime();
		}
		
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

            scope.setTime = function() {

                var s = parseFloat(scope.second)|| 0;;
		var m = parseInt(scope.minute)|| 0;;
		var h = parseInt(scope.hour)|| 0;;
		var newMillis = s * 1000 + m * 1000 * 60 + h * 1000 * 60 * 60;
		
                hundredths = Math.floor(newMillis  / 10 % 100);
                seconds = Math.floor(newMillis  / 1000 % 60);
                minutes = Math.floor(newMillis  / 1000 / 60 % 60);
                hours = Math.floor(newMillis  / 1000 / 60 / 60 % 24);

                scope.millis = newMillis;
                // ouput all new times to view, and format them with a leading 0 if needed
                scope.output = {
                    hundredths: hundredths < 10 ? '0' + hundredths : hundredths,
                    seconds: seconds < 10 ? '0' + seconds : seconds,
                    minutes: minutes < 10 ? '0' + minutes : minutes,
                    hours: hours < 10 ? '0' + hours : hours
                }
            }

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
				scope.second = "";
		scope.minute = "";
		scope.hour = "";
            }

        }
    };
}
