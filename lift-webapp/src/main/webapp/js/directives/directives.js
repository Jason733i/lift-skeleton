'use strict';
(function () {

    Skeleton.Directives.directive('flashRedWhen', highlightEffect("flashRedWhen", "#f2dede", 2000));
    Skeleton.Directives.directive('flashBlueWhen', highlightEffect("flashBlueWhen", "#74B4F2", 2000));

    function highlightEffect(directiveName, highlightColor, speed) {
        return function () {
            return function (scope, element, attributes) {
                var isLocked = false;
                scope.$watch(attributes[directiveName], function (successful) {
                    if (successful && !isLocked) {
                        isLocked = true;
                        element.effect("highlight", { color: highlightColor }, speed, function () {
                            isLocked = false;
                        });
                    }
                });
            };
        };
    }

    Skeleton.Directives.directive('slowlyDisappear', fadeEffect("slowlyDisappear", 10000));
    function fadeEffect(directiveName, delay) {
        return function () {
            return function (scope, element, attributes) {
                var isLocked = false;

                scope.$watch(attributes[directiveName], function (successful) {
                    if (successful && !isLocked) {
                        isLocked = true;
                        setTimeout(function () {
                            $(element).fadeOut(500, function () {
                                scope.showJustDeletedMessage = false;
                                isLocked = false;
                            });
                        }, delay);
                    }
                });
            }
        }
    }
})();