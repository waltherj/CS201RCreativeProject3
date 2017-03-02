var timeTemplate = `
    <span class="time">
        <div class='time-section' ng-class="{muted: output.hours == '00'}">{{output.hours}}</div>:<!--
        --><div class='time-section' ng-class="{muted: output.minutes == '00'}">{{output.minutes}}</div>:<!--
        --><div class='time-section' ng-class="{muted: output.seconds == '00'}">{{output.seconds}}</div>:<!--
        --><div class="time-section" ng-class="{muted: output.hundredths == '00'}">{{output.hundredths}}</div>
    </span>
`

function timeDirective () {
    return {
        scope: {
            output: '='
        },
        restrict: 'E',
        replace: 'true',
        template: (timeTemplate),
        link: function(scope) {
        }
    };
}
