/**
 * skylark-blueimp-gallery2 - The skylark blueimp  gallery plugin library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
!function(t,i){var e=i.define,require=i.require,s="function"==typeof e&&e.amd,o=!s&&"undefined"!=typeof exports;if(!s&&!e){var n={};e=i.define=function(t,i,e){"function"==typeof e?(n[t]={factory:e,deps:i.map(function(i){return function(t,i){if("."!==t[0])return t;var e=i.split("/"),s=t.split("/");e.pop();for(var o=0;o<s.length;o++)"."!=s[o]&&(".."==s[o]?e.pop():e.push(s[o]));return e.join("/")}(i,t)}),resolved:!1,exports:null},require(t)):n[t]={factory:null,resolved:!0,exports:e}},require=i.require=function(t){if(!n.hasOwnProperty(t))throw new Error("Module "+t+" has not been defined");var module=n[t];if(!module.resolved){var e=[];module.deps.forEach(function(t){e.push(require(t))}),module.exports=module.factory.apply(i,e)||null,module.resolved=!0}return module.exports}}if(!e)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(t,require){t("skylark-blueimp-gallery2/Gallery",["skylark-langx/skylark","skylark-langx/langx","skylark-domx-noder","skylark-domx-plugins-base"],function(t,i,e,s){var o={views:[],items:[]},n=s.Plugin.inherit({klassName:"Gallery",pluginName:"blueimp.gallery",options:{typeProperty:"type",titleProperty:"title",altTextProperty:"alt",urlProperty:"href",srcsetProperty:"urlset"},_construct:function(t,i){this.overrided(t,i),this.$el=this.$(),this.el=this._elm,this._itemFactories={},this.items=this.options.items,this.setViewMode(this.options.view.mode,this.options.view.options)},setViewMode:function(t,i){this.viewMode=t;for(var e=0;e<o.views.length;e++)if(o.views[e].name===t){this.view=new o.views[e].ctor(this,i);break}},getItemUrl:function(t){return n.getItemProperty(t,this.options.urlProperty)},getItemTitle:function(t){return n.getItemProperty(t,this.options.titleProperty)},addItems:function(t){t.concat||(t=Array.prototype.slice.call(t)),this.items.concat||(this.items=Array.prototype.slice.call(this.items)),this.items=this.items.concat(t),this.num=this.items.length,this.trigger("itemsChanged")},renderItem:function(t,i){var e=t&&n.getItemProperty(t,this.options.typeProperty);e&&(e=e.split("/")[0]),e||(e="image");var s=this._itemFactories[e];if(!s)for(var r=0;r<o.items.length;r++)if(o.items[r].mimeType===e){s=this._itemFactories[e]=new o.items[r].ctor(this);break}if(!s)throw new Error("invalid type:"+e);var a=s.render(t,i),l=n.getItemProperty(t,this.options.srcsetProperty);return l&&a.setAttribute("srcset",l),a},isRunnable:function(t){},playItem:function(t){}});i.mixin(n,{getNestedProperty:function(t,i){return i.replace(/\[(?:'([^']+)'|"([^"]+)"|(\d+))\]|(?:(?:^|\.)([^\.\[]+))/g,function(i,e,s,o,n){var r=n||e||s||o&&parseInt(o,10);i&&t&&(t=t[r])}),t},getDataProperty:function(t,i){var e,s;if(t.dataset?(e=i.replace(/-([a-z])/g,function(t,i){return i.toUpperCase()}),s=t.dataset[e]):t.getAttribute&&(s=t.getAttribute("data-"+i.replace(/([A-Z])/g,"-$1").toLowerCase())),"string"==typeof s){if(/^(true|false|null|-?\d+(\.\d+)?|\{[\s\S]*\}|\[[\s\S]*\])$/.test(s))try{return $.parseJSON(s)}catch(t){}return s}},getItemProperty:function(t,i){var e=this.getDataProperty(t,i);return void 0===e&&(e=t[i]),void 0===e&&(e=this.getNestedProperty(t,i)),e}});var r=n.ViewBase=i.Evented.inherit({klassName:"ViewBase",options:{controlsClass:"skylark-blueimp-gallery-controls",fullScreen:!1},init:function(t,i){var s,o=this;this.gallery=t,this.initOptions(i),this.options.fullScreen&&e.fullScreen(this.container[0]),this.gallery.on("item.running",function(t){o.container.hasClass(o.options.controlsClass)?(s=!0,o.container.removeClass(o.options.controlsClass)):s=!1}),this.gallery.on("item.running",function(t){s&&o.container.addClass(o.options.controlsClass)})},initOptions:function(t){this.options=i.mixin({},r.prototype.options,t)},close:function(){e.fullScreen()===this.container[0]&&e.fullScreen(!1)}});s.register(n);var a=n.ItemFactoryBase=i.Evented.inherit({klassName:"ItemFactoryBase",options:{typeProperty:"type",titleProperty:"title",altTextProperty:"alt",urlProperty:"href",srcsetProperty:"urlset"},init:function(t,i){this.gallery=t,this.initOptions(i)},initOptions:function(t){this.options=i.mixin({},a.prototype.options,t)},setTimeout:function(t,i,e){var s=this;return t&&window.setTimeout(function(){t.apply(s,i||[])},e||0)},getNestedProperty:n.getNestedProperty,getDataProperty:n.getDataProperty,getItemProperty:n.getItemProperty});return n.installAddon=function(t,i){var e=o[t];if(!e)throw new Error("Invalid paramerter!");e.push(i)},t.attach("domx.plugins.Gallery",n)}),t("skylark-blueimp-gallery2/helper",["skylark-langx/langx","skylark-domx-query"],function(t,i){"use strict";return i.extend=t.mixin,i}),t("skylark-blueimp-gallery2/items/image",["skylark-langx/langx","skylark-domx-noder","skylark-domx-query","../Gallery"],function(t,i,e,s){var o=s.ItemFactoryBase.inherit({klassName:"ImageItemFactory",options:{stretchImages:!1},initOptions:function(i){this.overrided(),this.options=t.mixin(this.options,o.prototype.options,i)},render:function(t,s){var o,n,r,a,l=i.createElement("img"),h=(this.gallery,t),d=this.options.stretchImages;return"string"!=typeof h&&(h=this.getItemProperty(t,this.options.urlProperty),r=this.getItemProperty(t,this.options.titleProperty),a=this.getItemProperty(t,this.options.altTextProperty)||r),!0===d&&(d="contain"),d?n=i.createElement("div"):(n=l,l.draggable=!1),r&&(n.title=r),a&&(n.alt=a),e(l).on("load error",function t(i){o||(i={type:i.type,target:n},o=!0,e(l).off("load error",t),d&&"load"===i.type&&(n.style.background='url("'+h+'") center no-repeat',n.style.backgroundSize=d),s(i))}),l.src=h,n}}),n={name:"image",mimeType:"image",ctor:o};return s.installAddon("items",n),n}),t("skylark-blueimp-gallery2/items/video",["skylark-langx/langx","skylark-domx-noder","skylark-domx-eventer","skylark-domx-query","../Gallery"],function(t,i,e,s,o){"use strict";var n=o.ItemFactoryBase.inherit({klassName:"VideoItemFactory",options:{videoContentClass:"video-content",videoLoadingClass:"video-loading",videoPlayingClass:"video-playing",videoPosterProperty:"poster",videoSourcesProperty:"sources"},initOptions:function(i){this.overrided(),this.options=t.mixin(this.options,n.prototype.options,i)},handleSlide:function(t){handleSlide.call(this,t),this.playingVideo&&this.playingVideo.pause()},render:function(t,o,n){var r,a,l,h,d=this,c=this.options,p=i.createElement("div"),u=s(p),m=[{type:"error",target:p}],y=n||document.createElement("video"),g=this.getItemProperty(t,c.urlProperty),v=this.getItemProperty(t,c.typeProperty),f=this.getItemProperty(t,c.titleProperty),C=this.getItemProperty(t,this.options.altTextProperty)||f,k=this.getItemProperty(t,c.videoPosterProperty),w=this.getItemProperty(t,c.videoSourcesProperty);if(u.addClass(c.videoContentClass),f&&(p.title=f),y.canPlayType)if(g&&v&&y.canPlayType(v))y.src=g;else if(w)for(;w.length;)if(a=w.shift(),g=this.getItemProperty(a,c.urlProperty),v=this.getItemProperty(a,c.typeProperty),g&&v&&y.canPlayType(v)){y.src=g;break}return k&&(y.poster=k,r=i.createElement("img"),s(r).addClass(c.toggleClass),r.src=k,r.draggable=!1,r.alt=C,p.appendChild(r)),(l=document.createElement("a")).setAttribute("target","_blank"),n||l.setAttribute("download",f),l.href=g,y.src&&(y.controls=!0,(n||s(y)).on("error",function(){d.setTimeout(o,m)}).on("pause",function(){y.seeking||(h=!1,u.removeClass(d.options.videoLoadingClass).removeClass(d.options.videoPlayingClass),d.gallery.trigger("item.pause",{item:d}),delete d.playingVideo,d.interval&&d.play())}).on("playing",function(){h=!1,u.removeClass(d.options.videoLoadingClass).addClass(d.options.videoPlayingClass),d.gallery.trigger("item.running",{item:d})}).on("play",function(){window.clearTimeout(d.timeout),h=!0,u.addClass(d.options.videoLoadingClass),d.playingVideo=y,d.gallery.trigger("item.run",{item:d})}),s(l).on("click",function(t){e.stop(t),h?y.pause():y.play()}),p.appendChild(n&&n.elm()||y)),p.appendChild(l),this.setTimeout(o,[{type:"load",target:p}]),p}}),r={name:"video",mimeType:"video",ctor:n};return o.installAddon("items",r),r}),t("skylark-blueimp-gallery2/items/vimeo",["skylark-langx/langx","skylark-domx-noder","skylark-domx-query","skylark-domx-plugins-embeds/embed-vimeo","../Gallery","./video"],function(t,i,e,s,o,n){"use strict";var r=0,a=n.ctor.inherit({klassName:"VimeoItemFactory",options:{vimeoVideoIdProperty:"vimeo",vimeoPlayerUrl:"//player.vimeo.com/video/VIDEO_ID?api=1&player_id=PLAYER_ID",vimeoPlayerIdPrefix:"vimeo-player-",vimeoClickToPlay:!0},initOptions:function(i){this.overrided(),this.options=t.mixin(this.options,a.prototype.options,i)},render:function(t,e){var o=this.options,n=this.getItemProperty(t,o.vimeoVideoIdProperty);if(n)return void 0===this.getItemProperty(t,o.urlProperty)&&(t[o.urlProperty]="//vimeo.com/"+n),r+=1,this.overrided(t,e,new s(i.createElement("div"),{url:o.vimeoPlayerUrl,videoId:n,playerId:o.vimeoPlayerIdPrefix+r,clickToPlay:o.vimeoClickToPlay}))}}),l={name:"vimeo",mimeType:"vimeo",ctor:a};return o.installAddon("items",l),l}),t("skylark-blueimp-gallery2/items/youtube",["skylark-langx/langx","skylark-domx-noder","skylark-domx-query","skylark-domx-plugins-embeds/embed-youtube","../Gallery","./video"],function(t,i,e,s,o,n){"use strict";var r=n.ctor.inherit({klassName:"YouTubeItemFactory",options:{youTubeVideoIdProperty:"youtube",youTubePlayerVars:{wmode:"transparent"},youTubeClickToPlay:!0},initOptions:function(i){this.overrided(),this.options=t.mixin(this.options,r.prototype.options,i)},render:function(t,e){var o=this.options,n=this.getItemProperty(t,o.youTubeVideoIdProperty);if(n)return void 0===this.getItemProperty(t,o.urlProperty)&&(t[o.urlProperty]="//www.youtube.com/watch?v="+n),void 0===this.getItemProperty(t,o.videoPosterProperty)&&(t[o.videoPosterProperty]="//img.youtube.com/vi/"+n+"/maxresdefault.jpg"),this.overrided(t,e,new s(i.createElement("div"),{videoId:n,playerVars:o.youTubePlayerVars,clickToPlay:o.youTubeClickToPlay}))}}),a={name:"youtube",mimeType:"youtube",ctor:r};return o.installAddon("items",a),a}),t("skylark-blueimp-gallery2/views/SliderView",["skylark-langx/langx","skylark-domx-noder","skylark-domx-query","../Gallery"],function(t,i,e,s){"use strict";var o=s.ViewBase.inherit({klassName:"SliderView",options:{container:null,slidesContainer:"div",titleElement:"h3",displayClass:"skylark-blueimp-gallery-display",singleClass:"skylark-blueimp-gallery-single",leftEdgeClass:"skylark-blueimp-gallery-left",rightEdgeClass:"skylark-blueimp-gallery-right",playingClass:"skylark-blueimp-gallery-playing",slideClass:"slide",slideLoadingClass:"slide-loading",slideErrorClass:"slide-error",slideContentClass:"slide-content",toggleClass:"toggle",prevClass:"prev",nextClass:"next",closeClass:"close",playPauseClass:"play-pause",displayTransition:!0,clearSlides:!0,toggleControlsOnReturn:!0,toggleControlsOnSlideClick:!0,toggleSlideshowOnSpace:!0,enableKeyboardNavigation:!0,closeOnEscape:!0,closeOnSlideClick:!0,closeOnSwipeUpOrDown:!0,emulateTouchEvents:!0,stopTouchEventsPropagation:!1,hidePageScrollbars:!1,disableScroll:!0,carousel:!1,continuous:!0,unloadElements:!0,startSlideshow:!1,slideshowInterval:5e3,index:0,preloadRange:2,transitionSpeed:400,slideshowTransitionSpeed:void 0,event:void 0,onopen:void 0,onopened:void 0,onslide:void 0,onslideend:void 0,onslidecomplete:void 0,onclose:void 0,onclosed:void 0},console:window.console&&"function"==typeof window.console.log?window.console:{log:function(){}},support:function(t){var i,s={touch:void 0!==window.ontouchstart||window.DocumentTouch&&document instanceof DocumentTouch},o={webkitTransition:{end:"webkitTransitionEnd",prefix:"-webkit-"},MozTransition:{end:"transitionend",prefix:"-moz-"},OTransition:{end:"otransitionend",prefix:"-o-"},transition:{end:"transitionend",prefix:""}};for(i in o)if(o.hasOwnProperty(i)&&void 0!==t.style[i]){s.transition=o[i],s.transition.name=i;break}function n(){var i,e,o=s.transition;document.body.appendChild(t),o&&(i=o.name.slice(0,-9)+"ransform",void 0!==t.style[i]&&(t.style[i]="translateZ(0)",e=window.getComputedStyle(t).getPropertyValue(o.prefix+"transform"),s.transform={prefix:o.prefix,name:i,translate:!0,translateZ:!!e&&"none"!==e})),void 0!==t.style.backgroundSize&&(s.backgroundSize={},t.style.backgroundSize="contain",s.backgroundSize.contain="contain"===window.getComputedStyle(t).getPropertyValue("background-size"),t.style.backgroundSize="cover",s.backgroundSize.cover="cover"===window.getComputedStyle(t).getPropertyValue("background-size")),document.body.removeChild(t)}return document.body?n():e(document).on("DOMContentLoaded",n),s}(document.createElement("div")),requestAnimationFrame:window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame,cancelAnimationFrame:window.cancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame,init:function(t,i){if(this.overrided(t,i),this.list=this.gallery.items,this.options.container=this.gallery.elm(),this.num=this.list.length,this.initStartIndex(),!1===this.initWidget())return!1;this.initEventListeners(),this.onslide(this.index),this.ontransitionend(),this.options.startSlideshow&&this.play()},slide:function(t,i){window.clearTimeout(this.timeout);var e,s,o,n=this.index;if(n!==t&&1!==this.num){if(i||(i=this.options.transitionSpeed),this.support.transform){for(this.options.continuous||(t=this.circle(t)),e=Math.abs(n-t)/(n-t),this.options.continuous&&(s=e,(e=-this.positions[this.circle(t)]/this.slideWidth)!==s&&(t=-e*this.num+t)),o=Math.abs(n-t)-1;o;)o-=1,this.move(this.circle((t>n?t:n)-o-1),this.slideWidth*e,0);t=this.circle(t),this.move(n,this.slideWidth*e,i),this.move(t,0,i),this.options.continuous&&this.move(this.circle(t-e),-this.slideWidth*e,0)}else t=this.circle(t),this.animate(n*-this.slideWidth,t*-this.slideWidth,i);this.onslide(t)}},getIndex:function(){return this.index},getNumber:function(){return this.num},prev:function(){(this.options.continuous||this.index)&&this.slide(this.index-1)},next:function(){(this.options.continuous||this.index<this.num-1)&&this.slide(this.index+1)},play:function(t){var i=this;window.clearTimeout(this.timeout),this.interval=t||this.options.slideshowInterval,this.elements[this.index]>1&&(this.timeout=this.setTimeout(!this.requestAnimationFrame&&this.slide||function(t,e){i.animationFrameId=i.requestAnimationFrame.call(window,function(){i.slide(t,e)})},[this.index+1,this.options.slideshowTransitionSpeed],this.interval)),this.container.addClass(this.options.playingClass)},pause:function(){window.clearTimeout(this.timeout),this.interval=null,this.cancelAnimationFrame&&(this.cancelAnimationFrame.call(window,this.animationFrameId),this.animationFrameId=null),this.container.removeClass(this.options.playingClass)},add:function(t){var i;for(t.concat||(t=Array.prototype.slice.call(t)),this.list.concat||(this.list=Array.prototype.slice.call(this.list)),this.list=this.list.concat(t),this.num=this.list.length,this.num>2&&null===this.options.continuous&&(this.options.continuous=!0,this.container.removeClass(this.options.leftEdgeClass)),this.container.removeClass(this.options.rightEdgeClass).removeClass(this.options.singleClass),i=this.num-t.length;i<this.num;i+=1)this.addSlide(i),this.positionSlide(i);this.positions.length=this.num,this.initSlides(!0)},resetSlides:function(){this.slidesContainer.empty(),this.unloadAllSlides(),this.slides=[]},handleClose:function(){var t=this.options;this.destroyEventListeners(),this.pause(),this.container[0].style.display="none",this.container.removeClass(t.displayClass).removeClass(t.singleClass).removeClass(t.leftEdgeClass).removeClass(t.rightEdgeClass),t.hidePageScrollbars&&(document.body.style.overflow=this.bodyOverflowStyle),this.options.clearSlides&&this.resetSlides(),this.options.onclosed&&this.options.onclosed.call(this)},close:function(){var t=this;this.options.onclose&&this.options.onclose.call(this),this.support.transition&&this.options.displayTransition?(this.container.on(this.support.transition.end,function i(e){e.target===t.container[0]&&(t.container.off(t.support.transition.end,i),t.handleClose())}),this.container.removeClass(this.options.displayClass)):this.handleClose()},circle:function(t){return(this.num+t%this.num)%this.num},move:function(t,i,e){this.translateX(t,i,e),this.positions[t]=i},translate:function(t,i,e,s){var o=this.slides[t].style,n=this.support.transition,r=this.support.transform;o[n.name+"Duration"]=s+"ms",o[r.name]="translate("+i+"px, "+e+"px)"+(r.translateZ?" translateZ(0)":"")},translateX:function(t,i,e){this.translate(t,i,0,e)},translateY:function(t,i,e){this.translate(t,0,i,e)},animate:function(t,i,e){if(e)var s=this,o=(new Date).getTime(),n=window.setInterval(function(){var r=(new Date).getTime()-o;if(r>e)return s.slidesContainer[0].style.left=i+"px",s.ontransitionend(),void window.clearInterval(n);s.slidesContainer[0].style.left=(i-t)*(Math.floor(r/e*100)/100)+t+"px"},4);else this.slidesContainer[0].style.left=i+"px"},preventDefault:function(t){t.preventDefault?t.preventDefault():t.returnValue=!1},stopPropagation:function(t){t.stopPropagation?t.stopPropagation():t.cancelBubble=!0},onresize:function(){this.initSlides(!0)},onmousedown:function(t){t.which&&1===t.which&&"VIDEO"!==t.target.nodeName&&"AUDIO"!==t.target.nodeName&&(t.preventDefault(),(t.originalEvent||t).touches=[{pageX:t.pageX,pageY:t.pageY}],this.ontouchstart(t))},onmousemove:function(t){this.touchStart&&((t.originalEvent||t).touches=[{pageX:t.pageX,pageY:t.pageY}],this.ontouchmove(t))},onmouseup:function(t){this.touchStart&&(this.ontouchend(t),delete this.touchStart)},onmouseout:function(t){if(this.touchStart){var e=t.target,s=t.relatedTarget;s&&(s===e||i.contains(e,s))||this.onmouseup(t)}},ontouchstart:function(t){this.options.stopTouchEventsPropagation&&this.stopPropagation(t);var i=(t.originalEvent||t).touches[0];this.touchStart={x:i.pageX,y:i.pageY,time:Date.now()},this.isScrolling=void 0,this.touchDelta={}},ontouchmove:function(t){this.options.stopTouchEventsPropagation&&this.stopPropagation(t);var i,e,s=(t.originalEvent||t).touches[0],o=(t.originalEvent||t).scale,n=this.index;if(!(s.length>1||o&&1!==o))if(this.options.disableScroll&&t.preventDefault(),this.touchDelta={x:s.pageX-this.touchStart.x,y:s.pageY-this.touchStart.y},i=this.touchDelta.x,void 0===this.isScrolling&&(this.isScrolling=this.isScrolling||Math.abs(i)<Math.abs(this.touchDelta.y)),this.isScrolling)this.translateY(n,this.touchDelta.y+this.positions[n],0);else for(t.preventDefault(),window.clearTimeout(this.timeout),this.options.continuous?e=[this.circle(n+1),n,this.circle(n-1)]:(this.touchDelta.x=i/=!n&&i>0||n===this.num-1&&i<0?Math.abs(i)/this.slideWidth+1:1,e=[n],n&&e.push(n-1),n<this.num-1&&e.unshift(n+1));e.length;)n=e.pop(),this.translateX(n,i+this.positions[n],0)},ontouchend:function(t){this.options.stopTouchEventsPropagation&&this.stopPropagation(t);var i,e,s,o,n,r=this.index,a=this.options.transitionSpeed,l=this.slideWidth,h=Number(Date.now()-this.touchStart.time)<250,d=h&&Math.abs(this.touchDelta.x)>20||Math.abs(this.touchDelta.x)>l/2,c=!r&&this.touchDelta.x>0||r===this.num-1&&this.touchDelta.x<0,p=!d&&this.options.closeOnSwipeUpOrDown&&(h&&Math.abs(this.touchDelta.y)>20||Math.abs(this.touchDelta.y)>this.slideHeight/2);this.options.continuous&&(c=!1),i=this.touchDelta.x<0?-1:1,this.isScrolling?p?this.close():this.translateY(r,0,a):d&&!c?(e=r+i,s=r-i,o=l*i,n=-l*i,this.options.continuous?(this.move(this.circle(e),o,0),this.move(this.circle(r-2*i),n,0)):e>=0&&e<this.num&&this.move(e,o,0),this.move(r,this.positions[r]+o,a),this.move(this.circle(s),this.positions[this.circle(s)]+o,a),r=this.circle(s),this.onslide(r)):this.options.continuous?(this.move(this.circle(r-1),-l,a),this.move(r,0,a),this.move(this.circle(r+1),l,a)):(r&&this.move(r-1,-l,a),this.move(r,0,a),r<this.num-1&&this.move(r+1,l,a))},ontouchcancel:function(t){this.touchStart&&(this.ontouchend(t),delete this.touchStart)},ontransitionend:function(t){var i=this.slides[this.index];t&&i!==t.target||(this.interval&&this.play(),this.setTimeout(this.options.onslideend,[this.index,i]))},oncomplete:function(t){var i,s=t.target||t.srcElement,o=s&&s.parentNode;s&&o&&(i=this.getNodeIndex(o),e(o).removeClass(this.options.slideLoadingClass),"error"===t.type?(e(o).addClass(this.options.slideErrorClass),this.elements[i]=3):this.elements[i]=2,s.clientHeight>this.container[0].clientHeight&&(s.style.maxHeight=this.container[0].clientHeight),this.interval&&this.slides[this.index]===o&&this.play(),this.setTimeout(this.options.onslidecomplete,[i,o]))},onload:function(t){this.oncomplete(t)},onerror:function(t){this.oncomplete(t)},onkeydown:function(t){switch(t.which||t.keyCode){case 13:this.options.toggleControlsOnReturn&&(this.preventDefault(t),this.toggleControls());break;case 27:this.options.closeOnEscape&&(this.close(),t.stopImmediatePropagation());break;case 32:this.options.toggleSlideshowOnSpace&&(this.preventDefault(t),this.toggleSlideshow());break;case 37:this.options.enableKeyboardNavigation&&(this.preventDefault(t),this.prev());break;case 39:this.options.enableKeyboardNavigation&&(this.preventDefault(t),this.next())}},handleClick:function(t){var i=this.options,s=t.target||t.srcElement,o=s.parentNode;function n(t){return e(s).hasClass(t)||e(o).hasClass(t)}n(i.toggleClass)?(this.preventDefault(t),this.toggleControls()):n(i.prevClass)?(this.preventDefault(t),this.prev()):n(i.nextClass)?(this.preventDefault(t),this.next()):n(i.closeClass)?(this.preventDefault(t),this.close()):n(i.playPauseClass)?(this.preventDefault(t),this.toggleSlideshow()):o===this.slidesContainer[0]?i.closeOnSlideClick?(this.preventDefault(t),this.close()):i.toggleControlsOnSlideClick&&(this.preventDefault(t),this.toggleControls()):o.parentNode&&o.parentNode===this.slidesContainer[0]&&i.toggleControlsOnSlideClick&&(this.preventDefault(t),this.toggleControls())},onclick:function(t){if(!(this.options.emulateTouchEvents&&this.touchDelta&&(Math.abs(this.touchDelta.x)>20||Math.abs(this.touchDelta.y)>20)))return this.handleClick(t);delete this.touchDelta},updateEdgeClasses:function(t){t?this.container.removeClass(this.options.leftEdgeClass):this.container.addClass(this.options.leftEdgeClass),t===this.num-1?this.container.addClass(this.options.rightEdgeClass):this.container.removeClass(this.options.rightEdgeClass)},handleSlide:function(t){this.options.continuous||this.updateEdgeClasses(t),this.loadElements(t),this.options.unloadElements&&this.unloadElements(t),this.setTitle(t)},onslide:function(t){this.index=t,this.handleSlide(t),this.setTimeout(this.options.onslide,[t,this.slides[t]])},setTitle:function(t){var i=this.slides[t].firstChild,e=i.title||i.alt,s=this.titleElement;s.length&&(this.titleElement.empty(),e&&s[0].appendChild(document.createTextNode(e)))},setTimeout:function(t,i,e){var s=this;return t&&window.setTimeout(function(){t.apply(s,i||[])},e||0)},createElement:function(t,i){var s=this.gallery.renderItem(t,i);return e(s).addClass(this.options.slideContentClass),s},loadElement:function(t){this.elements[t]||(this.slides[t].firstChild?this.elements[t]=e(this.slides[t]).hasClass(this.options.slideErrorClass)?3:2:(this.elements[t]=1,e(this.slides[t]).addClass(this.options.slideLoadingClass),this.slides[t].appendChild(this.createElement(this.list[t],this.proxyListener))))},loadElements:function(t){var i,e=Math.min(this.num,2*this.options.preloadRange+1),s=t;for(i=0;i<e;i+=1)s+=i*(i%2==0?-1:1),s=this.circle(s),this.loadElement(s)},unloadElements:function(t){var i,e;for(i in this.elements)this.elements.hasOwnProperty(i)&&(e=Math.abs(t-i))>this.options.preloadRange&&e+this.options.preloadRange<this.num&&(this.unloadSlide(i),delete this.elements[i])},addSlide:function(t){var i=this.slidePrototype.cloneNode(!1);i.setAttribute("data-index",t),this.slidesContainer[0].appendChild(i),this.slides.push(i)},positionSlide:function(t){var i=this.slides[t];i.style.width=this.slideWidth+"px",this.support.transform&&(i.style.left=t*-this.slideWidth+"px",this.move(t,this.index>t?-this.slideWidth:this.index<t?this.slideWidth:0,0))},initSlides:function(t){var i,s;for(t||(this.positions=[],this.positions.length=this.num,this.elements={},this.imagePrototype=document.createElement("img"),this.elementPrototype=document.createElement("div"),this.slidePrototype=document.createElement("div"),e(this.slidePrototype).addClass(this.options.slideClass),this.slides=this.slidesContainer[0].children,i=this.options.clearSlides||this.slides.length!==this.num),this.slideWidth=this.container[0].clientWidth,this.slideHeight=this.container[0].clientHeight,this.slidesContainer[0].style.width=this.num*this.slideWidth+"px",i&&this.resetSlides(),s=0;s<this.num;s+=1)i&&this.addSlide(s),this.positionSlide(s);this.options.continuous&&this.support.transform&&(this.move(this.circle(this.index-1),-this.slideWidth,0),this.move(this.circle(this.index+1),this.slideWidth,0)),this.support.transform||(this.slidesContainer[0].style.left=this.index*-this.slideWidth+"px")},unloadSlide:function(t){var i,e;i=this.slides[t],null!==(e=i.firstChild)&&i.removeChild(e)},unloadAllSlides:function(){var t,i;for(t=0,i=this.slides.length;t<i;t++)this.unloadSlide(t)},toggleControls:function(){var t=this.options.controlsClass;this.container.hasClass(t)?this.container.removeClass(t):this.container.addClass(t)},toggleSlideshow:function(){this.interval?this.pause():this.play()},getNodeIndex:function(t){return parseInt(t.getAttribute("data-index"),10)},initStartIndex:function(){var t,i=this.gallery,e=this.options.index;if(e&&"number"!=typeof e)for(t=0;t<this.num;t+=1)if(this.list[t]===e||i.getItemUrl(this.list[t])===i.getItemUrl(e)){e=t;break}this.index=this.circle(parseInt(e,10)||0)},initEventListeners:function(){var t=this,i=this.slidesContainer;function s(i){var e=t.support.transition&&t.support.transition.end===i.type?"transitionend":i.type;t["on"+e](i)}e(window).on("resize",s),e(document.body).on("keydown",s),this.container.on("click",s),this.support.touch?i.on("touchstart touchmove touchend touchcancel",s):this.options.emulateTouchEvents&&this.support.transition&&i.on("mousedown mousemove mouseup mouseout",s),this.support.transition&&i.on(this.support.transition.end,s),this.proxyListener=s},destroyEventListeners:function(){var t=this.slidesContainer,i=this.proxyListener;e(window).off("resize",i),e(document.body).off("keydown",i),this.container.off("click",i),this.support.touch?t.off("touchstart touchmove touchend touchcancel",i):this.options.emulateTouchEvents&&this.support.transition&&t.off("mousedown mousemove mouseup mouseout",i),this.support.transition&&t.off(this.support.transition.end,i)},handleOpen:function(){this.options.onopened&&this.options.onopened.call(this)},initWidget:function(){var t=this;return this.container=e(this.options.container),this.container.length?(this.slidesContainer=this.container.find(this.options.slidesContainer).first(),this.slidesContainer.length?(this.titleElement=this.container.find(this.options.titleElement).first(),1===this.num&&this.container.addClass(this.options.singleClass),this.options.onopen&&this.options.onopen.call(this),this.support.transition&&this.options.displayTransition?this.container.on(this.support.transition.end,function i(e){e.target===t.container[0]&&(t.container.off(t.support.transition.end,i),t.handleOpen())}):this.handleOpen(),this.options.hidePageScrollbars&&(this.bodyOverflowStyle=document.body.style.overflow,document.body.style.overflow="hidden"),this.container[0].style.display="block",this.initSlides(),void this.container.addClass(this.options.displayClass)):(this.console.log("blueimp Gallery: Slides container not found.",this.options.slidesContainer),!1)):(this.console.log("blueimp Gallery: Widget container not found.",this.options.container),!1)},initOptions:function(i){this.overrided(t.mixin({},o.prototype.options,i)),this.num<3&&(this.options.continuous=!!this.options.continuous&&null),this.support.transition||(this.options.emulateTouchEvents=!1),this.options.event&&this.preventDefault(this.options.event)}});return s.installAddon("views",{name:"slider",ctor:o,templates:{default:'<div class="slides"></div><h3 class="title"></h3><a class="prev">‹</a><a class="next">›</a><a class="close">×</a><a class="play-pause"></a><ol class="indicator"></ol>'}}),s.SliderView=o}),t("skylark-blueimp-gallery2/views/CarouselView",["../Gallery","./SliderView"],function(t,i){var e=i.inherit({klassName:"CarouselView",options:{hidePageScrollbars:!1,toggleControlsOnReturn:!1,toggleSlideshowOnSpace:!1,enableKeyboardNavigation:!1,closeOnEscape:!1,closeOnSlideClick:!1,closeOnSwipeUpOrDown:!1,disableScroll:!1,startSlideshow:!0},initOptions:function(t){var t=langx.mixin({},e.prototype.options,t);this.overrided(t)}});return t.installAddon("views",{name:"carousel",ctor:e,templates:{default:'<div class="slides"></div><h3 class="title"></h3><a class="prev">‹</a><a class="next">›</a><a class="close">×</a><a class="play-pause"></a><ol class="indicator"></ol>'}}),e}),t("skylark-blueimp-gallery2/views/LightBoxView",["skylark-langx/langx","skylark-domx-query","../Gallery","./SliderView"],function(t,i,e,s){var o=s.inherit({klassName:"LightBoxView",options:{hidePageScrollbars:!1,indicatorContainer:"ol",activeIndicatorClass:"active",thumbnailProperty:"thumbnail",thumbnailIndicators:!0},initOptions:function(i){var i=t.mixin({},o.prototype.options,i);this.overrided(i)},createIndicator:function(t){var s,o,n=this.gallery,r=this.indicatorPrototype.cloneNode(!1),a=n.getItemTitle(t),l=this.options.thumbnailProperty;return this.options.thumbnailIndicators&&(l&&(s=e.getItemProperty(t,l)),void 0===s&&(o=t.getElementsByTagName&&i(t).find("img")[0])&&(s=o.src),s&&(r.style.backgroundImage='url("'+s+'")')),a&&(r.title=a),r},addIndicator:function(t){if(this.indicatorContainer.length){var i=this.createIndicator(this.list[t]);i.setAttribute("data-index",t),this.indicatorContainer[0].appendChild(i),this.indicators.push(i)}},setActiveIndicator:function(t){this.indicators&&(this.activeIndicator&&this.activeIndicator.removeClass(this.options.activeIndicatorClass),this.activeIndicator=i(this.indicators[t]),this.activeIndicator.addClass(this.options.activeIndicatorClass))},initSlides:function(t){t||(this.indicatorContainer=this.container.find(this.options.indicatorContainer),this.indicatorContainer.length&&(this.indicatorPrototype=document.createElement("li"),this.indicators=this.indicatorContainer[0].children)),this.overrided(t)},addSlide:function(t){this.overrided(t),this.addIndicator(t)},resetSlides:function(){this.overrided(),this.indicatorContainer.empty(),this.indicators=[]},handleClick:function(t){var i=t.target||t.srcElement,e=i.parentNode;if(e===this.indicatorContainer[0])this.preventDefault(t),this.slide(this.getNodeIndex(i));else{if(e.parentNode!==this.indicatorContainer[0])return this.overrided(t);this.preventDefault(t),this.slide(this.getNodeIndex(e))}},handleSlide:function(t){this.overrided(t),this.setActiveIndicator(t)},handleClose:function(){this.activeIndicator&&this.activeIndicator.removeClass(this.options.activeIndicatorClass),this.overrided()}});return e.installAddon("views",{name:"lightbox",ctor:o,templates:{default:'<div class="slides"></div><h3 class="title"></h3><a class="prev">‹</a><a class="next">›</a><a class="close">×</a><ol class="indicator"></ol>'}}),o}),t("skylark-blueimp-gallery2/main",["./Gallery","./helper","./items/image","./items/video","./items/vimeo","./items/youtube","./views/SliderView","./views/CarouselView","./views/LightBoxView"],function(t){return t}),t("skylark-blueimp-gallery2",["skylark-blueimp-gallery2/main"],function(t){return t})}(e),!s){var r=require("skylark-langx-ns");o?module.exports=r:i.skylarkjs=r}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-blueimp-gallery2.js.map
