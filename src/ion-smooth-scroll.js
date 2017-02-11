(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name ionSmoothScroll.directive:ionSmoothScroll
     * @description
     * An alternate to {@link http://ionicframework.com/docs/api/service/$ionicScrollDelegate $ionicScrollDelegate.anchorScroll}
     * 
     * `anchorScroll` does not work well when ion-content has dynamic content. Part of content gets hidden on anchor scroll. {@link https://github.com/driftyco/ionic/issues/508 See the Github Issue}.
     * 
     * <div class="alert alert-info">
        Unlike hash based anchorScroll, this directive does not pollute the Url by adding hash fragment.
      </div>
     * # Demo    
     * {@link https://embed.plnkr.co/Y71E3q/ Plunker Demo}
     * @restrict A
     * @element ANY
     * @param {string} ionSmoothScroll id of DOM element where you want to scroll to.
     * @param {string} delegateHandle Value of `delegate-handle` attribute. 
     * Both scrollView container and element with `ion-smooth-scroll` must have this attribute even if you use css scrollView. 
     * <br>This is used for getting the DOM reference of scrollable container 
     * 
     * @param {number} [duration=400] Scroll transistion duration in millisecond. <br><strong>Applicable only If you are not using ionic inbuilt JS scrolling.</strong> You will be rarely passing this parameter :) 
     * @requires $ionicPosition
     * @requires $ionicScrollDelegate
     */

    /**
     * @ngdoc object
     * @name ionSmoothScroll
     * @description
     * ionSmoothScroll provider
     */

    /**
     * @ngdoc function
     * @name ionSmoothScroll#setScrollDuration
     * @methodOf ionSmoothScroll
     * @description
     * Provider method of ionSmoothScrollProvider - Sets the default scroll transistion duration.
     * @param {number} [duration=400] Scroll transistion duration in millisecond. <br><strong>Applicable only If you are not using ionic inbuilt JS scrolling.</strong> It will be ignored if new scroll position is less than `200px` distance from current postion.
     * @example
     * <doc:example module="app">
     * <doc:source>
     * <script>
     * angular.module('app', ['ionSmoothScroll'])
            .config(['ionSmoothScrollProvider', function(ionSmoothScrollProvider) {
                //uncomment below line and see it in action
                //it will not affect if the scrollable container is created by ionic (e.g ion-content or ion-scroll with no overflow-scroll="true")
                //ionSmoothScrollProvider.setScrollDuration(6000); //ion-smooth-scroll will now scroll for 6 seconds to reach the target
            }]);
            </script>             
                <div>
                    <a target="_blank" href="https://embed.plnkr.co/Y71E3q/"> See Demo in Plunker </a>
                </div>
     * </doc:source>
     * </doc:example>
     */

    angular.module('ionSmoothScroll', [])
        .provider('ionSmoothScroll', providerFunction)
        .directive('ionSmoothScroll', directiveDefinition);

    function providerFunction() {

        this.duration_ms = 400;

        this.setScrollDuration = function (ms) {
            this.duration_ms = ms;
        };

        this.$get = function () {
            return this;
        };

    }

    directiveDefinition.$inject = ['$ionicPosition', '$ionicScrollDelegate', 'ionSmoothScroll'];
    function directiveDefinition($ionicPosition, $ionicScrollDelegate, ionSmoothScroll) {
        return {
            restrict: "A",
            link: linkFunction
        };

        function linkFunction($scope, element, attrs) {

            element.on('click', function () {
                scrollTo(attrs.ionSmoothScroll, attrs.delegateHandle, attrs.duration);
            });
        }

        function scrollTo(id, delegateHandle, duration_ms) {
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
                scrollViewContainer = scrollView.options.el;
                isDelegated = true;
            }

            OffsetAdjust = $ionicPosition.offset([scrollViewContainer]).top;
            top -= OffsetAdjust;

            if (isDelegated) {
                delegateHandleRef.scrollTo(0, top, true);
            } else {
                _nativeScroll(scrollViewContainer, top, duration_ms);
            }
        }
        /** copied from http://jsfiddle.net/0uwg96sh/
         * 
         */
        function _nativeScroll(scrollViewContainer, top, duration_ms) {
            duration_ms = Math.round(duration_ms) || ionSmoothScroll.duration_ms;
            if (duration_ms < 0) {
                return;
            }
            if (duration_ms === 0) {
                scrollViewContainer.scrollTop = top;
                return;
            }

            if (Math.abs(scrollViewContainer.scrollTop - top) < 200) {
                duration_ms = 200;
            }

            var startTime = Date.now();
            var endTime = startTime + duration_ms;

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