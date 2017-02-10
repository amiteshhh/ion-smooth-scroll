# ion-smooth-scroll


An alternate to [$ionicScrollDelegate.anchorScroll](http://ionicframework.com/docs/api/service/$ionicScrollDelegate) for  smooth scrolling to given `id` without changing the [hash](https://en.wikipedia.org/wiki/Fragment_identifier) of url.

Ionic component `anchorScroll` works unreliably. Here are few limitations.

1. **Content goes out of view** : Sometimes Ionic `anchorScroll` scrolls beyond the target element and therefore part of content area goes out of view and doesn't become visible even when user tries to scroll. 
[See this Github Issue](https://github.com/driftyco/ionic/issues/508) or [this issue](https://github.com/driftyco/ionic/issues/618). 
This scenario can be easily reproduced where dynamic data is rendered inside `ion-content`.
2. **No support for _css_ based scrollView** : anchorScroll requires that the scrollable content to use ionic JS scroll (i.e `ion-content` or `ion-scroll` with no `overflow-scroll = true`).


> `ion-smooth-scroll` uses Ionic [$ionicScrollDelegate.scrollTo](http://ionicframework.com/docs/api/service/$ionicScrollDelegate) when
scrollViews created by ionContent and ionScroll directives.

## Install

Script file is available from a variety of sources. Choose the one that fits you.

- Direct download (https://raw.githubusercontent.com/amiteshhh/ion-smooth-scroll/master/src/ion-smooth-scroll.min.js)
- Bower (`bower install ion-smooth-scroll --save`)
- CDN `Raw Git`  (https://rawgit.com/amiteshhh/ion-smooth-scroll/master/ion-smooth-scroll.min.js)

## Getting started

Add `script` reference to  your application (normally `index.html`)

```html
<script src="path/to/ion-smooth-scroll.min.js"></script>
```

Add the `ionSmoothScroll` as a dependency in your angular module

```javascript
angular.module('myApp', ['ionSmoothScroll']);
```

## Usage

Directive is used as an attribute. When clicked it will scroll to the target.

```html
<ANY delegate-handle="{string}"><!-- scroll view container-->
        <ANY ion-smooth-scroll="{string}"
        delegate-handle="{string}"
        duration="{number}">
        ...
        </ANY>
</ANY>
```

#### Parameters

<table class="variables-matrix table table-bordered table-striped">

<thead>

<tr>

<th>Param</th>

<th>Type</th>

<th>Details</th>

</tr>

</thead>

<tbody>

<tr>

<td>ionSmoothScroll</td>

<td><a href="" class="label type-hint type-hint-string">string</a></td>

<td>

<div class="ionsmoothscroll-directive-page ionsmoothscroll-directive-ionsmoothscroll-page">

id of DOM element where you want to scroll to.

</div>

</td>

</tr>

<tr>

<td>delegateHandle</td>

<td><a href="" class="label type-hint type-hint-string">string</a></td>

<td>

<div class="ionsmoothscroll-directive-page ionsmoothscroll-directive-ionsmoothscroll-page">

Value of `delegate-handle` attribute. Both scrollView container and element with ion-smooth-scroll must have this attribute.

Therefore even if you use css scrollView, scrollable container should have this attribute.

</div>

</td>

</tr>

<tr>

<td>duration</td>

<td><a href="" class="label type-hint type-hint-number">number</a></td>

<td>

<div class="ionsmoothscroll-directive-page ionsmoothscroll-directive-ionsmoothscroll-page">

Scroll transistion duration in millisecond. Applicable only If you are not using the ionic inbuilt JS scrolling. Its rare to use this parameter :)

You can also configure it at app level in the config Phase [Explained Later](#config).

</div>

_(default: 400)_

</td>

</tr>

</tbody>

</table>

</div>

### Examples

1. Using `ion-smooth-scroll` inside ionicScrollView

```html
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


2. Using `ion-smooth-scroll` inside css scrollView


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

Using `ion-smooth-scroll` for **ionicScrollView**

## Config

> This section is applicable only for the css scrollView.

You can alter the default scroll transistion duration, 400 ms, for your app during config phase.

```javascript
angular.module('myApp', ['ionSmoothScroll'])
    .config(['ionSmoothScrollProvider', function(ionSmoothScrollProvider){
        //uncomment below line and see it in action
        //it will not affect if the scrollable container is created by ionic (e.g ion-content or ion-scroll with no overflow-scroll="true")
        //ionSmoothScrollProvider.setScrollDuration(6000); //ion-smooth-scroll will now scroll for 6 seconds to reach the target
    }]);
```

## Demo

[Plunker Demo](https://embed.plnkr.co/Y71E3q/ )
