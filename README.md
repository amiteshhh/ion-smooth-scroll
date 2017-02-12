# ion-smooth-scroll


An alternate to [$ionicScrollDelegate.anchorScroll](http://ionicframework.com/docs/api/service/$ionicScrollDelegate) for  smooth scrolling to given `id` without changing the [hash](https://en.wikipedia.org/wiki/Fragment_identifier) of url.

Ionic component `anchorScroll` works unreliably. Below are few issues/limitations with it:

1. **Content goes out of view** : Sometimes Ionic `anchorScroll` scrolls beyond the target element and therefore part of content area goes out of view and doesn't become visible even when user tries to scroll. 
[See this Github Issue](https://github.com/driftyco/ionic/issues/508) or [this issue](https://github.com/driftyco/ionic/issues/618). 
This scenario can be easily reproduced where dynamic data is rendered inside `ion-content`.
2. **No support for _css_ based scrollView** : anchorScroll requires that the scrollable content to use ionic JS scroll (i.e `ion-content` or `ion-scroll` with no `overflow-scroll = true`).

This library is intended to provide the lacking functionality of `anchorScroll`.


> `ion-smooth-scroll` uses Ionic [$ionicScrollDelegate.scrollTo](http://ionicframework.com/docs/api/service/$ionicScrollDelegate) when
scrollViews created by ionContent and ionScroll directives.

## Install

Script file is available from a variety of sources. Choose the one that fits you.

- Github Source Code https://github.com/amiteshhh/ion-smooth-scroll/blob/master/ion-smooth-scroll.min.js
- Bower `bower install ion-smooth-scroll --save`
- CDN `Raw Git`  https://rawgit.com/amiteshhh/ion-smooth-scroll/master/ion-smooth-scroll.min.js

## Getting started

Add `script` reference to  your application (normally `index.html`)

```html
<script src="path/to/ion-smooth-scroll.min.js"></script>
```

Add the `ion-smooth-scroll` as a dependency in your angular module

```javascript
angular.module('myApp', ['ion-smooth-scroll']);
```

### Usage

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

### Parameters
| Param        | Type           | Details  |
| ------------- |:-------------| -----|
| ionSmoothScroll | <a href="" class="label type-hint type-hint-string">string</a> | id of DOM element where you want to scroll to.|
| delegateHandle | <a href="">string</a> | Value of `delegate-handle` attribute. Both scrollView container and element with `ion-smooth-scroll` must have this attribute even if you use css scrollView. <br>This is used only for getting the DOM reference of scrollable container.| 
| duration | <a href="" class="label type-hint type-hint-number">number</a> | Scroll transistion duration in millisecond. <br>**Applicable only for css driven scrollView container.** It will also be ignored if new scroll position is less than _200px_ distance from current postion. You will be rarely passing this parameter :) <br>You can also configure it at app level during _angular_ [config Phase](#config) explained later.<br> _(default: 400)_ | 



## Examples

### 1. With ionic scrollView


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

### 2. With css scrollView


The only difference is you can pass additional parameter, **duration**, to specify _scroll transition duration_

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


## Config

> it will not affect the scrollable container created by `ionic-content` or `ion-scroll`.

Configure the scroll transistion duration using `ionSmoothScrollProvider.`__`setScrollDuration`__ method _(default: 400 ms)_.

You will be rarely using this feature as default value suffices in most of the cases.

```javascript
angular.module('myApp', ['ion-smooth-scroll'])
    .config(['ionSmoothScrollProvider', function(ionSmoothScrollProvider){
        /*uncomment below line and see it in action
        it will not affect if the scrollable container is created by ionic 
        (e.g ion-content or ion-scroll with no overflow-scroll="true")
        */
        
        ionSmoothScrollProvider.setScrollDuration(6000);        
        //ion-smooth-scroll will scroll for 6 seconds to reach the target
    }]);
```

## Demo

[Plunker Demo](https://embed.plnkr.co/Y71E3q/)
