(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name ionSmoothScroll.directive:ionSmoothScroll
     * @description
     * An alternate to {@link http://ionicframework.com/docs/api/service/$ionicScrollDelegate $ionicScrollDelegate.anchorScroll}
     * 
     * `anchorScroll` does not work smoothly in all scenario especially in modal window where some content gets hidden on hash scroll. {@link https://github.com/driftyco/ionic/issues/508 See the Github Issue}.
     * 
     * <div class="alert alert-info">
        Unlike hash based anchorScroll, this directive does not pollute the Url by adding hash fragment.
      </div>
     * # Demo    
     * {@link https://embed.plnkr.co/PT6NfRL5fEn28kUmDwra/ Plunker Demo}
     * @restrict A
     * @element ANY
     * @param {string} ionSmoothScroll id of DOM element where you want to scroll to.
     * @param {string} delegateHandle value of `delegate-handle` attribute of scrollable container. Scrollable container DOM reference is calculated by matching this attribute. 
     * 
     * Therefore even if you use css based scroll, scrollable container should have this attribute.
     * @param {number} [duration=400] Duration in millisecond. If you are not using the ionic inbuilt JS scrolling, then you may specify the animation duration.
     * @requires $ionicPosition
     * @requires $ionicScrollDelegate
     */

    angular.module('ion-smooth-scroll', [])
        .directive('ionSmoothScroll', directiveDefinition);

    directiveDefinition.$inject = ['$ionicPosition', '$ionicScrollDelegate'];
    function directiveDefinition($ionicPosition, $ionicScrollDelegate) {
        return {
            restrict: "A",
            link: linkFunction
        };

        function linkFunction($scope, element, attrs) {

            element.on('click', function () {
                scrollTo(attrs.ionSmoothScroll, attrs.delegateHandle, attrs.duration);
            });
        }

        function scrollTo(id, delegateHandle, duration) {
            var scrollView, scrollViewContainer, top, OffsetAdjust, delegateHandleRef, isDelegated, targetElement = document.getElementById(id);
            if (!targetElement) {
                return;
            }

            top = $ionicPosition.offset([targetElement]).top;
            delegateHandleRef = $ionicScrollDelegate.$getByHandle(delegateHandle);

            scrollView = delegateHandleRef.getScrollView();

            if (!scrollView) {
                scrollViewContainer = document.querySelector('[delegate-handle=' + delegateHandle + ']');
            } else if (scrollView.isNative) {
                scrollViewContainer = scrollView.el;
            } else {
                scrollViewContainer = delegateHandleRef.getScrollView().options.el;
                isDelegated = true;
            }

            OffsetAdjust = $ionicPosition.offset([scrollViewContainer]).top;
            top -= OffsetAdjust;

            if (isDelegated) {
                delegateHandleRef.scrollTo(0, top, true);
            } else {
                _nativeScroll(scrollViewContainer, top, duration);
            }
        }
        /** copied from http://jsfiddle.net/0uwg96sh/
         * 
         */
        function _nativeScroll(scrollViewContainer, top, duration) {
            duration = Math.round(duration) || 400;
            if (duration < 0) {
                return;
            }
            if (duration === 0) {
                scrollViewContainer.scrollTop = top;
                return;
            }

            if (Math.abs(scrollViewContainer.scrollTop - top) < 200) {
                duration = 200;
            }

            var startTime = Date.now();
            var endTime = startTime + duration;

            var startTop = scrollViewContainer.scrollTop;
            var distance = top - startTop;

            // based on http://en.wikipedia.org/wiki/Smoothstep
            var smoothStep = function (start, end, point) {
                if (point <= start) { return 0; }
                if (point >= end) { return 1; }
                var x = (point - start) / (end - start); // interpolation
                return x * x * (3 - 2 * x);
            };
            // This is to keep track of where the scrollViewContainer's scrollTop is
            // supposed to be, based on what we're doing
            var previousTop = scrollViewContainer.scrollTop;

            // This is like a think function from a game loop
            var scrollFrame = function () {
                if (scrollViewContainer.scrollTop != previousTop) {
                    return;
                }

                // set the scrollTop for this frame
                var now = Date.now();
                var point = smoothStep(startTime, endTime, now);
                var frameTop = Math.round(startTop + (distance * point));
                scrollViewContainer.scrollTop = frameTop;

                // check if we're done!
                if (now >= endTime) {
                    return;
                }

                // If we were supposed to scroll but didn't, then we
                // probably hit the limit, so consider it done; not interrupted.
                if (scrollViewContainer.scrollTop === previousTop && scrollViewContainer.scrollTop !== frameTop) {
                    return;
                }
                previousTop = scrollViewContainer.scrollTop;

                // schedule next frame for execution
                setTimeout(scrollFrame, 0);
            };

            // boostrap the animation process
            setTimeout(scrollFrame, 0);

        }
    }

})();