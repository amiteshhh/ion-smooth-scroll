# ion-smooth-scroll


An alternate to [$ionicScrollDelegate.anchorScroll](http://ionicframework.com/docs/api/service/$ionicScrollDelegate)

Ionic `anchorScroll` works unreliably and doeasnt work in all scenario. Here are few problemw with it
1. **Content goes out of view** : Some time Ionic `anchorScroll` scrolls beyond the target element which makes the part of content area goes out of view permanently.
[See this Github Issue](https://github.com/driftyco/ionic/issues/508) or [this issue](https://github.com/driftyco/ionic/issues/618). 
This scenario can be easily reproduced where dynamic data is rendered inside `ion-content`.
2. **No support for non ionic scrollable area** : anchorScroll requires that the scrollable content to use ionic JS scroll like `ion-content` or `ion-scroll`.
3. **Url Pollution** : anchorScroll requires to set the hash of Url with id where we want to scroll to.

This directive solve these problems.

## How It works


## Install

### CDN

You can download the JS file directly from [Git Hub](https://github.com/amiteshhh/ion-smooth-scroll/blob/master/ion-smooth-scroll.min.js)

or alternatively from `Raw Git` CDN https://rawgit.com/amiteshhh/ion-smooth-scroll/master/ion-smooth-scroll.min.js

or instead of downloading the file to your source code, you may use above Git Raw in `index.html` file

```html
<script src="//rawgit.com/amiteshhh/ion-smooth-scroll/master/ion-smooth-scroll.min.js"></script>
```

### bower

```shell
bower install ion-smooth-scroll
```
## Getting started

Add  `<script>` to your `index.html`:

```html
<script src="path/to/ion-smooth-scroll.min.js"></script> <!-- You can use unminified JS file as well -->
```

Then add `ion-smooth-scroll` as a dependency for your app:

```javascript
angular.module('myApp', ['ion-smooth-scroll']);
```

## Demo

[Plunker Demo](https://embed.plnkr.co/Y71E3q/ )