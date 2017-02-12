(function() {
    'use strict';
    /**
     * @ngdoc overview
     * @name index
     * @title API Reference
     * @area api
     * @description Welcome to `ion-smooth-scroll`!
     */

    /**
     * @ngdoc module
     * @module ion-smooth-scroll
     * @name ion-smooth-scroll
     * @packageName ion-smooth-scroll
     * @area api
     * @description
     * An alternate to [$ionicScrollDelegate.anchorScroll](http://ionicframework.com/docs/api/service/$ionicScrollDelegate) for  smooth scrolling to given `id` without changing the [hash](https://en.wikipedia.org/wiki/Fragment_identifier) of url.
     * 
     * This library is intended to provide the lacking functionality of `anchorScroll`.
     * 
     *  `anchorScroll` does not work well when `ion-content` has dynamic content. Part of content gets hidden on anchor scroll. [See the Github Issue](https://github.com/driftyco/ionic/issues/508).
     * 
     * <div class="alert alert-info">
        Unlike hash based anchorScroll, this directive does not pollute the Url by adding hash fragment.
      </div>
      
     * # Demo    
     * [Plunker Demo](https://embed.plnkr.co/Y71E3q)
     */


    /**
     * @ngdoc provider
     * @module ion-smooth-scroll
     * @name ionSmoothScrollProvider
     * @description
     * Use `ionSmoothScrollProvider` to configure the scroll transistion duration
     * > it will not affect the scrollable container created by `ionic-content` or `ion-scroll`
     * 
     * You will be rarely using this feature as default value suffices in most of the cases.
     */

    /**
     * @ngdoc method
     * @module ion-smooth-scroll
     * @name ionSmoothScrollProvider#setScrollDuration
     * @description
     * Sets the default scroll transistion duration.
     * 
     *  ```js
     * angular.module('app', ['ion-smooth-scroll'])
            .config(['ionSmoothScrollProvider', function(ionSmoothScrollProvider) {
                //it will not affect if the scrollable container is created by ionic (e.g ion-content or ion-scroll with no overflow-scroll="true")
                ionSmoothScrollProvider.setScrollDuration(6000); //ion-smooth-scroll will now scroll for 6 seconds to reach the target
            }]);
     *``` 
     @param {number} [duration=400] Scroll transistion duration in millisecond.
     */

    /**
    * @ngdoc directive
    * @module ion-smooth-scroll
    * @name ionSmoothScroll
    * @description
    * Directive responsible for providing smooth scrolling feature.
    * @restrict A
    * @element ANY
    * @param {string} ionSmoothScroll id of DOM element where you want to scroll to.
    * @param {string} delegateHandle Value of `delegate-handle` attribute. 
    * Both scrollView container and element with `ion-smooth-scroll` must have this attribute even if you use css scrollView. 
    * <br>This is used for getting the DOM reference of scrollable container 
    * 
    * @param {number} [duration=400] Scroll transistion duration in millisecond. <br><strong>Applicable only for css driven scrollView container.</strong> 
    <div class="alert alert-info">
         duration is ignored if new scroll position is less than `200px` distance from current postion.
      </div> You will be rarely passing this parameter :)
    *
    * @requires https://ionicframework.com/docs/api/service/$ionicPosition $ionicPosition
    * @requires http://ionicframework.com/docs/api/service/$ionicScrollDelegate $ionicScrollDelegate
    * @example
    * See in action at [Plunker](https://embed.plnkr.co/Y71E3q)
    * ### 1. With ionic scrollView
    *
    *```html
    <!-- Only required attributes has been shown below -->
    <ion-content delegate-handle="main" id="top">
        ...
        <a ion-smooth-scroll="div1" delegate-handle="main">Go to Div 1</a>
        ...
        <div id="div1">
            ...
        </div>
        ...
    </ion-content>
    ```
    * ### 2. With css scrollView
    
   ```html

    <!--Note that ion-content with overflow-scroll="true" creates the css driven scrollable area.-->
    <!--<ion-content overflow-scroll="true" delegate-handle="main" id="top">
                            OR
    -->

    <!--This directive is not responsible for making the container scrollable. You need to write your own css.-->
    <div class="my-scrollable-div" delegate-handle="main" id="top">
        ...
        <a ion-smooth-scroll="div1" delegate-handle="main">Go to Div 1</a>

        <!--Below link will reach to target in 2 seconds-->
        <button ion-smooth-scroll="div1" delegate-handle="main" duration="2000">Go to Div 1 in 2 Seconds</button>
        <!-- We can use any element -->
        ...
        <div id="div1">
            ...
        </div>
        ...
    </div>
    ```
    */


    angular.module('ion-smooth-scroll', [])
        .provider('ionSmoothScroll', providerFunction)
        .directive('ionSmoothScroll', directiveDefinition);

    function providerFunction() {

        this.duration_ms = 400;

        this.setScrollDuration = function(ms) {
            this.duration_ms = ms;
        };

        this.$get = function() {
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

            element.on('click', function() {
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
            var smoothStep = function(start, end, point) {
                if (point <= start) {
                    return 0;
                }
                if (point >= end) {
                    return 1;
                }
                var x = (point - start) / (end - start); // interpolation
                return x * x * (3 - 2 * x);
            };
            // This is to keep track of where the scrollViewContainer's scrollTop is
            // supposed to be, based on what we're doing
            var previousTop = scrollViewContainer.scrollTop;

            // This is like a think function from a game loop
            var scrollFrame = function() {
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