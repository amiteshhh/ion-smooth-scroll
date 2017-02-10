# ion-smooth-scroll


An alternate to [$ionicScrollDelegate.anchorScroll](http://ionicframework.com/docs/api/service/$ionicScrollDelegate)

Ionic `anchorScroll` works unreliably and doeasnt work in all scenario. Here are few problems or limitations with it

1. **Content goes out of view** : Some time Ionic `anchorScroll` scrolls beyond the target element which makes the part of content area goes out of view permanently.
[See this Github Issue](https://github.com/driftyco/ionic/issues/508) or [this issue](https://github.com/driftyco/ionic/issues/618). 
This scenario can be easily reproduced where dynamic data is rendered inside `ion-content`.
2. **No support for non ionic scrollable area** : anchorScroll requires that the scrollable content to use ionic JS scroll like `ion-content` or `ion-scroll`.

Also *anchorScroll* requires you to set the hash of Url with id where we want to scroll to.

This directive solve these problems.

## How It works
In a nutshell, it works as follow

1. Calculate the [`top offset`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop) of target element
2. Set [`scrollTop`](https://developer.mozilla.org/en/docs/Web/API/Element/scrollTop) of scrollable container to the above specified value

> Directive automatically decides whether It can use Ionic [$ionicScrollDelegate.scrollTo](http://ionicframework.com/docs/api/service/$ionicScrollDelegate)
> or It has to fallback on custom JavaScript.

## Getting started


Add 'script' reference of `ion-smooth-scroll.js` or minified version `ion-smooth-scroll.min.js` to  your `index.html`:

See the [Install](#Install) section to download/link the JS file

```html
<script src="path/to/ion-smooth-scroll.min.js"></script> <!-- You can use unminified JS file as well -->
```


Then add `ion-smooth-scroll` as a dependency in your angular module:

```javascript
angular.module('myApp', ['ion-smooth-scroll']);
```

**Sample Usage**
```html
<ion-content delegate-handle="main" id="top">
        ... 
       <div class="button-bar button-stable">
            <button class="button button-balanced icon icon-left ion-chevron-down" ion-smooth-scroll="div1" delegate-handle="main">Go to Div 1</button>
            <a class="button button-royal icon icon-left ion-chevron-down" href="javascript:;" ion-smooth-scroll="div2" delegate-handle="main">Go to Div 2</a>
        </div>
        <div id="div1">
                ...
        </div>
        <div id="div2">
                ...
        </div>
        ...
</ion-content>
```
**Advance Usage**
This directive supports some advance configuration as well. See the Documentation.

## Demo

[Plunker Demo](https://embed.plnkr.co/Y71E3q/ )

## Documentation

Documentation is available on the
[AngularJS docs site](http://docs.angularjs.org/).


## Install

You can get JS library in three ways

### CDN

`Raw Git` CDN :  https://rawgit.com/amiteshhh/ion-smooth-scroll/master/ion-smooth-scroll.min.js

### Github

Download the library file `ion-smooth-scroll.min.js` directly from
[Git Hub Source code](https://github.com/amiteshhh/ion-smooth-scroll)

### bower

```shell
bower install ion-smooth-scroll
```
