/*! For license information please see bundle.js.LICENSE.txt */
(()=>{var e={766:(e,n,t)=>{var o;!function(){"use strict";var r=function(){this.init()};r.prototype={init:function(){var e=this||i;return e._counter=1e3,e._html5AudioPool=[],e.html5PoolSize=10,e._codecs={},e._howls=[],e._muted=!1,e._volume=1,e._canPlayEvent="canplaythrough",e._navigator="undefined"!=typeof window&&window.navigator?window.navigator:null,e.masterGain=null,e.noAudio=!1,e.usingWebAudio=!0,e.autoSuspend=!0,e.ctx=null,e.autoUnlock=!0,e._setup(),e},volume:function(e){var n=this||i;if(e=parseFloat(e),n.ctx||p(),void 0!==e&&e>=0&&e<=1){if(n._volume=e,n._muted)return n;n.usingWebAudio&&n.masterGain.gain.setValueAtTime(e,i.ctx.currentTime);for(var t=0;t<n._howls.length;t++)if(!n._howls[t]._webAudio)for(var o=n._howls[t]._getSoundIds(),r=0;r<o.length;r++){var a=n._howls[t]._soundById(o[r]);a&&a._node&&(a._node.volume=a._volume*e)}return n}return n._volume},mute:function(e){var n=this||i;n.ctx||p(),n._muted=e,n.usingWebAudio&&n.masterGain.gain.setValueAtTime(e?0:n._volume,i.ctx.currentTime);for(var t=0;t<n._howls.length;t++)if(!n._howls[t]._webAudio)for(var o=n._howls[t]._getSoundIds(),r=0;r<o.length;r++){var a=n._howls[t]._soundById(o[r]);a&&a._node&&(a._node.muted=!!e||a._muted)}return n},stop:function(){for(var e=this||i,n=0;n<e._howls.length;n++)e._howls[n].stop();return e},unload:function(){for(var e=this||i,n=e._howls.length-1;n>=0;n--)e._howls[n].unload();return e.usingWebAudio&&e.ctx&&void 0!==e.ctx.close&&(e.ctx.close(),e.ctx=null,p()),e},codecs:function(e){return(this||i)._codecs[e.replace(/^x-/,"")]},_setup:function(){var e=this||i;if(e.state=e.ctx&&e.ctx.state||"suspended",e._autoSuspend(),!e.usingWebAudio)if("undefined"!=typeof Audio)try{void 0===(new Audio).oncanplaythrough&&(e._canPlayEvent="canplay")}catch(n){e.noAudio=!0}else e.noAudio=!0;try{(new Audio).muted&&(e.noAudio=!0)}catch(e){}return e.noAudio||e._setupCodecs(),e},_setupCodecs:function(){var e=this||i,n=null;try{n="undefined"!=typeof Audio?new Audio:null}catch(n){return e}if(!n||"function"!=typeof n.canPlayType)return e;var t=n.canPlayType("audio/mpeg;").replace(/^no$/,""),o=e._navigator?e._navigator.userAgent:"",r=o.match(/OPR\/(\d+)/g),a=r&&parseInt(r[0].split("/")[1],10)<33,s=-1!==o.indexOf("Safari")&&-1===o.indexOf("Chrome"),u=o.match(/Version\/(.*?) /),d=s&&u&&parseInt(u[1],10)<15;return e._codecs={mp3:!(a||!t&&!n.canPlayType("audio/mp3;").replace(/^no$/,"")),mpeg:!!t,opus:!!n.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!n.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!n.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!(n.canPlayType('audio/wav; codecs="1"')||n.canPlayType("audio/wav")).replace(/^no$/,""),aac:!!n.canPlayType("audio/aac;").replace(/^no$/,""),caf:!!n.canPlayType("audio/x-caf;").replace(/^no$/,""),m4a:!!(n.canPlayType("audio/x-m4a;")||n.canPlayType("audio/m4a;")||n.canPlayType("audio/aac;")).replace(/^no$/,""),m4b:!!(n.canPlayType("audio/x-m4b;")||n.canPlayType("audio/m4b;")||n.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(n.canPlayType("audio/x-mp4;")||n.canPlayType("audio/mp4;")||n.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!(d||!n.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),webm:!(d||!n.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),dolby:!!n.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,""),flac:!!(n.canPlayType("audio/x-flac;")||n.canPlayType("audio/flac;")).replace(/^no$/,"")},e},_unlockAudio:function(){var e=this||i;if(!e._audioUnlocked&&e.ctx){e._audioUnlocked=!1,e.autoUnlock=!1,e._mobileUnloaded||44100===e.ctx.sampleRate||(e._mobileUnloaded=!0,e.unload()),e._scratchBuffer=e.ctx.createBuffer(1,1,22050);var n=function(t){for(;e._html5AudioPool.length<e.html5PoolSize;)try{var o=new Audio;o._unlocked=!0,e._releaseHtml5Audio(o)}catch(t){e.noAudio=!0;break}for(var r=0;r<e._howls.length;r++)if(!e._howls[r]._webAudio)for(var i=e._howls[r]._getSoundIds(),a=0;a<i.length;a++){var s=e._howls[r]._soundById(i[a]);s&&s._node&&!s._node._unlocked&&(s._node._unlocked=!0,s._node.load())}e._autoResume();var u=e.ctx.createBufferSource();u.buffer=e._scratchBuffer,u.connect(e.ctx.destination),void 0===u.start?u.noteOn(0):u.start(0),"function"==typeof e.ctx.resume&&e.ctx.resume(),u.onended=function(){u.disconnect(0),e._audioUnlocked=!0,document.removeEventListener("touchstart",n,!0),document.removeEventListener("touchend",n,!0),document.removeEventListener("click",n,!0),document.removeEventListener("keydown",n,!0);for(var t=0;t<e._howls.length;t++)e._howls[t]._emit("unlock")}};return document.addEventListener("touchstart",n,!0),document.addEventListener("touchend",n,!0),document.addEventListener("click",n,!0),document.addEventListener("keydown",n,!0),e}},_obtainHtml5Audio:function(){var e=this||i;if(e._html5AudioPool.length)return e._html5AudioPool.pop();var n=(new Audio).play();return n&&"undefined"!=typeof Promise&&(n instanceof Promise||"function"==typeof n.then)&&n.catch((function(){console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")})),new Audio},_releaseHtml5Audio:function(e){var n=this||i;return e._unlocked&&n._html5AudioPool.push(e),n},_autoSuspend:function(){var e=this;if(e.autoSuspend&&e.ctx&&void 0!==e.ctx.suspend&&i.usingWebAudio){for(var n=0;n<e._howls.length;n++)if(e._howls[n]._webAudio)for(var t=0;t<e._howls[n]._sounds.length;t++)if(!e._howls[n]._sounds[t]._paused)return e;return e._suspendTimer&&clearTimeout(e._suspendTimer),e._suspendTimer=setTimeout((function(){if(e.autoSuspend){e._suspendTimer=null,e.state="suspending";var n=function(){e.state="suspended",e._resumeAfterSuspend&&(delete e._resumeAfterSuspend,e._autoResume())};e.ctx.suspend().then(n,n)}}),3e4),e}},_autoResume:function(){var e=this;if(e.ctx&&void 0!==e.ctx.resume&&i.usingWebAudio)return"running"===e.state&&"interrupted"!==e.ctx.state&&e._suspendTimer?(clearTimeout(e._suspendTimer),e._suspendTimer=null):"suspended"===e.state||"running"===e.state&&"interrupted"===e.ctx.state?(e.ctx.resume().then((function(){e.state="running";for(var n=0;n<e._howls.length;n++)e._howls[n]._emit("resume")})),e._suspendTimer&&(clearTimeout(e._suspendTimer),e._suspendTimer=null)):"suspending"===e.state&&(e._resumeAfterSuspend=!0),e}};var i=new r,a=function(e){e.src&&0!==e.src.length?this.init(e):console.error("An array of source files must be passed with any new Howl.")};a.prototype={init:function(e){var n=this;return i.ctx||p(),n._autoplay=e.autoplay||!1,n._format="string"!=typeof e.format?e.format:[e.format],n._html5=e.html5||!1,n._muted=e.mute||!1,n._loop=e.loop||!1,n._pool=e.pool||5,n._preload="boolean"!=typeof e.preload&&"metadata"!==e.preload||e.preload,n._rate=e.rate||1,n._sprite=e.sprite||{},n._src="string"!=typeof e.src?e.src:[e.src],n._volume=void 0!==e.volume?e.volume:1,n._xhr={method:e.xhr&&e.xhr.method?e.xhr.method:"GET",headers:e.xhr&&e.xhr.headers?e.xhr.headers:null,withCredentials:!(!e.xhr||!e.xhr.withCredentials)&&e.xhr.withCredentials},n._duration=0,n._state="unloaded",n._sounds=[],n._endTimers={},n._queue=[],n._playLock=!1,n._onend=e.onend?[{fn:e.onend}]:[],n._onfade=e.onfade?[{fn:e.onfade}]:[],n._onload=e.onload?[{fn:e.onload}]:[],n._onloaderror=e.onloaderror?[{fn:e.onloaderror}]:[],n._onplayerror=e.onplayerror?[{fn:e.onplayerror}]:[],n._onpause=e.onpause?[{fn:e.onpause}]:[],n._onplay=e.onplay?[{fn:e.onplay}]:[],n._onstop=e.onstop?[{fn:e.onstop}]:[],n._onmute=e.onmute?[{fn:e.onmute}]:[],n._onvolume=e.onvolume?[{fn:e.onvolume}]:[],n._onrate=e.onrate?[{fn:e.onrate}]:[],n._onseek=e.onseek?[{fn:e.onseek}]:[],n._onunlock=e.onunlock?[{fn:e.onunlock}]:[],n._onresume=[],n._webAudio=i.usingWebAudio&&!n._html5,void 0!==i.ctx&&i.ctx&&i.autoUnlock&&i._unlockAudio(),i._howls.push(n),n._autoplay&&n._queue.push({event:"play",action:function(){n.play()}}),n._preload&&"none"!==n._preload&&n.load(),n},load:function(){var e=this,n=null;if(i.noAudio)e._emit("loaderror",null,"No audio support.");else{"string"==typeof e._src&&(e._src=[e._src]);for(var t=0;t<e._src.length;t++){var o,r;if(e._format&&e._format[t])o=e._format[t];else{if("string"!=typeof(r=e._src[t])){e._emit("loaderror",null,"Non-string found in selected audio sources - ignoring.");continue}(o=/^data:audio\/([^;,]+);/i.exec(r))||(o=/\.([^.]+)$/.exec(r.split("?",1)[0])),o&&(o=o[1].toLowerCase())}if(o||console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),o&&i.codecs(o)){n=e._src[t];break}}if(n)return e._src=n,e._state="loading","https:"===window.location.protocol&&"http:"===n.slice(0,5)&&(e._html5=!0,e._webAudio=!1),new s(e),e._webAudio&&d(e),e;e._emit("loaderror",null,"No codec support for selected audio sources.")}},play:function(e,n){var t=this,o=null;if("number"==typeof e)o=e,e=null;else{if("string"==typeof e&&"loaded"===t._state&&!t._sprite[e])return null;if(void 0===e&&(e="__default",!t._playLock)){for(var r=0,a=0;a<t._sounds.length;a++)t._sounds[a]._paused&&!t._sounds[a]._ended&&(r++,o=t._sounds[a]._id);1===r?e=null:o=null}}var s=o?t._soundById(o):t._inactiveSound();if(!s)return null;if(o&&!e&&(e=s._sprite||"__default"),"loaded"!==t._state){s._sprite=e,s._ended=!1;var u=s._id;return t._queue.push({event:"play",action:function(){t.play(u)}}),u}if(o&&!s._paused)return n||t._loadQueue("play"),s._id;t._webAudio&&i._autoResume();var d=Math.max(0,s._seek>0?s._seek:t._sprite[e][0]/1e3),_=Math.max(0,(t._sprite[e][0]+t._sprite[e][1])/1e3-d),l=1e3*_/Math.abs(s._rate),c=t._sprite[e][0]/1e3,p=(t._sprite[e][0]+t._sprite[e][1])/1e3;s._sprite=e,s._ended=!1;var f=function(){s._paused=!1,s._seek=d,s._start=c,s._stop=p,s._loop=!(!s._loop&&!t._sprite[e][2])};if(!(d>=p)){var m=s._node;if(t._webAudio){var h=function(){t._playLock=!1,f(),t._refreshBuffer(s);var e=s._muted||t._muted?0:s._volume;m.gain.setValueAtTime(e,i.ctx.currentTime),s._playStart=i.ctx.currentTime,void 0===m.bufferSource.start?s._loop?m.bufferSource.noteGrainOn(0,d,86400):m.bufferSource.noteGrainOn(0,d,_):s._loop?m.bufferSource.start(0,d,86400):m.bufferSource.start(0,d,_),l!==1/0&&(t._endTimers[s._id]=setTimeout(t._ended.bind(t,s),l)),n||setTimeout((function(){t._emit("play",s._id),t._loadQueue()}),0)};"running"===i.state&&"interrupted"!==i.ctx.state?h():(t._playLock=!0,t.once("resume",h),t._clearTimer(s._id))}else{var v=function(){m.currentTime=d,m.muted=s._muted||t._muted||i._muted||m.muted,m.volume=s._volume*i.volume(),m.playbackRate=s._rate;try{var o=m.play();if(o&&"undefined"!=typeof Promise&&(o instanceof Promise||"function"==typeof o.then)?(t._playLock=!0,f(),o.then((function(){t._playLock=!1,m._unlocked=!0,n?t._loadQueue():t._emit("play",s._id)})).catch((function(){t._playLock=!1,t._emit("playerror",s._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."),s._ended=!0,s._paused=!0}))):n||(t._playLock=!1,f(),t._emit("play",s._id)),m.playbackRate=s._rate,m.paused)return void t._emit("playerror",s._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");"__default"!==e||s._loop?t._endTimers[s._id]=setTimeout(t._ended.bind(t,s),l):(t._endTimers[s._id]=function(){t._ended(s),m.removeEventListener("ended",t._endTimers[s._id],!1)},m.addEventListener("ended",t._endTimers[s._id],!1))}catch(e){t._emit("playerror",s._id,e)}};"data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"===m.src&&(m.src=t._src,m.load());var y=window&&window.ejecta||!m.readyState&&i._navigator.isCocoonJS;if(m.readyState>=3||y)v();else{t._playLock=!0,t._state="loading";var g=function(){t._state="loaded",v(),m.removeEventListener(i._canPlayEvent,g,!1)};m.addEventListener(i._canPlayEvent,g,!1),t._clearTimer(s._id)}}return s._id}t._ended(s)},pause:function(e){var n=this;if("loaded"!==n._state||n._playLock)return n._queue.push({event:"pause",action:function(){n.pause(e)}}),n;for(var t=n._getSoundIds(e),o=0;o<t.length;o++){n._clearTimer(t[o]);var r=n._soundById(t[o]);if(r&&!r._paused&&(r._seek=n.seek(t[o]),r._rateSeek=0,r._paused=!0,n._stopFade(t[o]),r._node))if(n._webAudio){if(!r._node.bufferSource)continue;void 0===r._node.bufferSource.stop?r._node.bufferSource.noteOff(0):r._node.bufferSource.stop(0),n._cleanBuffer(r._node)}else isNaN(r._node.duration)&&r._node.duration!==1/0||r._node.pause();arguments[1]||n._emit("pause",r?r._id:null)}return n},stop:function(e,n){var t=this;if("loaded"!==t._state||t._playLock)return t._queue.push({event:"stop",action:function(){t.stop(e)}}),t;for(var o=t._getSoundIds(e),r=0;r<o.length;r++){t._clearTimer(o[r]);var i=t._soundById(o[r]);i&&(i._seek=i._start||0,i._rateSeek=0,i._paused=!0,i._ended=!0,t._stopFade(o[r]),i._node&&(t._webAudio?i._node.bufferSource&&(void 0===i._node.bufferSource.stop?i._node.bufferSource.noteOff(0):i._node.bufferSource.stop(0),t._cleanBuffer(i._node)):isNaN(i._node.duration)&&i._node.duration!==1/0||(i._node.currentTime=i._start||0,i._node.pause(),i._node.duration===1/0&&t._clearSound(i._node))),n||t._emit("stop",i._id))}return t},mute:function(e,n){var t=this;if("loaded"!==t._state||t._playLock)return t._queue.push({event:"mute",action:function(){t.mute(e,n)}}),t;if(void 0===n){if("boolean"!=typeof e)return t._muted;t._muted=e}for(var o=t._getSoundIds(n),r=0;r<o.length;r++){var a=t._soundById(o[r]);a&&(a._muted=e,a._interval&&t._stopFade(a._id),t._webAudio&&a._node?a._node.gain.setValueAtTime(e?0:a._volume,i.ctx.currentTime):a._node&&(a._node.muted=!!i._muted||e),t._emit("mute",a._id))}return t},volume:function(){var e,n,t,o=this,r=arguments;if(0===r.length)return o._volume;if(1===r.length||2===r.length&&void 0===r[1]?o._getSoundIds().indexOf(r[0])>=0?n=parseInt(r[0],10):e=parseFloat(r[0]):r.length>=2&&(e=parseFloat(r[0]),n=parseInt(r[1],10)),!(void 0!==e&&e>=0&&e<=1))return(t=n?o._soundById(n):o._sounds[0])?t._volume:0;if("loaded"!==o._state||o._playLock)return o._queue.push({event:"volume",action:function(){o.volume.apply(o,r)}}),o;void 0===n&&(o._volume=e),n=o._getSoundIds(n);for(var a=0;a<n.length;a++)(t=o._soundById(n[a]))&&(t._volume=e,r[2]||o._stopFade(n[a]),o._webAudio&&t._node&&!t._muted?t._node.gain.setValueAtTime(e,i.ctx.currentTime):t._node&&!t._muted&&(t._node.volume=e*i.volume()),o._emit("volume",t._id));return o},fade:function(e,n,t,o){var r=this;if("loaded"!==r._state||r._playLock)return r._queue.push({event:"fade",action:function(){r.fade(e,n,t,o)}}),r;e=Math.min(Math.max(0,parseFloat(e)),1),n=Math.min(Math.max(0,parseFloat(n)),1),t=parseFloat(t),r.volume(e,o);for(var a=r._getSoundIds(o),s=0;s<a.length;s++){var u=r._soundById(a[s]);if(u){if(o||r._stopFade(a[s]),r._webAudio&&!u._muted){var d=i.ctx.currentTime,_=d+t/1e3;u._volume=e,u._node.gain.setValueAtTime(e,d),u._node.gain.linearRampToValueAtTime(n,_)}r._startFadeInterval(u,e,n,t,a[s],void 0===o)}}return r},_startFadeInterval:function(e,n,t,o,r,i){var a=this,s=n,u=t-n,d=Math.abs(u/.01),_=Math.max(4,d>0?o/d:o),l=Date.now();e._fadeTo=t,e._interval=setInterval((function(){var r=(Date.now()-l)/o;l=Date.now(),s+=u*r,s=Math.round(100*s)/100,s=u<0?Math.max(t,s):Math.min(t,s),a._webAudio?e._volume=s:a.volume(s,e._id,!0),i&&(a._volume=s),(t<n&&s<=t||t>n&&s>=t)&&(clearInterval(e._interval),e._interval=null,e._fadeTo=null,a.volume(t,e._id),a._emit("fade",e._id))}),_)},_stopFade:function(e){var n=this,t=n._soundById(e);return t&&t._interval&&(n._webAudio&&t._node.gain.cancelScheduledValues(i.ctx.currentTime),clearInterval(t._interval),t._interval=null,n.volume(t._fadeTo,e),t._fadeTo=null,n._emit("fade",e)),n},loop:function(){var e,n,t,o=this,r=arguments;if(0===r.length)return o._loop;if(1===r.length){if("boolean"!=typeof r[0])return!!(t=o._soundById(parseInt(r[0],10)))&&t._loop;e=r[0],o._loop=e}else 2===r.length&&(e=r[0],n=parseInt(r[1],10));for(var i=o._getSoundIds(n),a=0;a<i.length;a++)(t=o._soundById(i[a]))&&(t._loop=e,o._webAudio&&t._node&&t._node.bufferSource&&(t._node.bufferSource.loop=e,e&&(t._node.bufferSource.loopStart=t._start||0,t._node.bufferSource.loopEnd=t._stop,o.playing(i[a])&&(o.pause(i[a],!0),o.play(i[a],!0)))));return o},rate:function(){var e,n,t,o=this,r=arguments;if(0===r.length?n=o._sounds[0]._id:1===r.length?o._getSoundIds().indexOf(r[0])>=0?n=parseInt(r[0],10):e=parseFloat(r[0]):2===r.length&&(e=parseFloat(r[0]),n=parseInt(r[1],10)),"number"!=typeof e)return(t=o._soundById(n))?t._rate:o._rate;if("loaded"!==o._state||o._playLock)return o._queue.push({event:"rate",action:function(){o.rate.apply(o,r)}}),o;void 0===n&&(o._rate=e),n=o._getSoundIds(n);for(var a=0;a<n.length;a++)if(t=o._soundById(n[a])){o.playing(n[a])&&(t._rateSeek=o.seek(n[a]),t._playStart=o._webAudio?i.ctx.currentTime:t._playStart),t._rate=e,o._webAudio&&t._node&&t._node.bufferSource?t._node.bufferSource.playbackRate.setValueAtTime(e,i.ctx.currentTime):t._node&&(t._node.playbackRate=e);var s=o.seek(n[a]),u=1e3*((o._sprite[t._sprite][0]+o._sprite[t._sprite][1])/1e3-s)/Math.abs(t._rate);!o._endTimers[n[a]]&&t._paused||(o._clearTimer(n[a]),o._endTimers[n[a]]=setTimeout(o._ended.bind(o,t),u)),o._emit("rate",t._id)}return o},seek:function(){var e,n,t=this,o=arguments;if(0===o.length?t._sounds.length&&(n=t._sounds[0]._id):1===o.length?t._getSoundIds().indexOf(o[0])>=0?n=parseInt(o[0],10):t._sounds.length&&(n=t._sounds[0]._id,e=parseFloat(o[0])):2===o.length&&(e=parseFloat(o[0]),n=parseInt(o[1],10)),void 0===n)return 0;if("number"==typeof e&&("loaded"!==t._state||t._playLock))return t._queue.push({event:"seek",action:function(){t.seek.apply(t,o)}}),t;var r=t._soundById(n);if(r){if(!("number"==typeof e&&e>=0)){if(t._webAudio){var a=t.playing(n)?i.ctx.currentTime-r._playStart:0,s=r._rateSeek?r._rateSeek-r._seek:0;return r._seek+(s+a*Math.abs(r._rate))}return r._node.currentTime}var u=t.playing(n);u&&t.pause(n,!0),r._seek=e,r._ended=!1,t._clearTimer(n),t._webAudio||!r._node||isNaN(r._node.duration)||(r._node.currentTime=e);var d=function(){u&&t.play(n,!0),t._emit("seek",n)};if(u&&!t._webAudio){var _=function(){t._playLock?setTimeout(_,0):d()};setTimeout(_,0)}else d()}return t},playing:function(e){var n=this;if("number"==typeof e){var t=n._soundById(e);return!!t&&!t._paused}for(var o=0;o<n._sounds.length;o++)if(!n._sounds[o]._paused)return!0;return!1},duration:function(e){var n=this,t=n._duration,o=n._soundById(e);return o&&(t=n._sprite[o._sprite][1]/1e3),t},state:function(){return this._state},unload:function(){for(var e=this,n=e._sounds,t=0;t<n.length;t++)n[t]._paused||e.stop(n[t]._id),e._webAudio||(e._clearSound(n[t]._node),n[t]._node.removeEventListener("error",n[t]._errorFn,!1),n[t]._node.removeEventListener(i._canPlayEvent,n[t]._loadFn,!1),n[t]._node.removeEventListener("ended",n[t]._endFn,!1),i._releaseHtml5Audio(n[t]._node)),delete n[t]._node,e._clearTimer(n[t]._id);var o=i._howls.indexOf(e);o>=0&&i._howls.splice(o,1);var r=!0;for(t=0;t<i._howls.length;t++)if(i._howls[t]._src===e._src||e._src.indexOf(i._howls[t]._src)>=0){r=!1;break}return u&&r&&delete u[e._src],i.noAudio=!1,e._state="unloaded",e._sounds=[],e=null,null},on:function(e,n,t,o){var r=this["_on"+e];return"function"==typeof n&&r.push(o?{id:t,fn:n,once:o}:{id:t,fn:n}),this},off:function(e,n,t){var o=this,r=o["_on"+e],i=0;if("number"==typeof n&&(t=n,n=null),n||t)for(i=0;i<r.length;i++){var a=t===r[i].id;if(n===r[i].fn&&a||!n&&a){r.splice(i,1);break}}else if(e)o["_on"+e]=[];else{var s=Object.keys(o);for(i=0;i<s.length;i++)0===s[i].indexOf("_on")&&Array.isArray(o[s[i]])&&(o[s[i]]=[])}return o},once:function(e,n,t){return this.on(e,n,t,1),this},_emit:function(e,n,t){for(var o=this,r=o["_on"+e],i=r.length-1;i>=0;i--)r[i].id&&r[i].id!==n&&"load"!==e||(setTimeout(function(e){e.call(this,n,t)}.bind(o,r[i].fn),0),r[i].once&&o.off(e,r[i].fn,r[i].id));return o._loadQueue(e),o},_loadQueue:function(e){var n=this;if(n._queue.length>0){var t=n._queue[0];t.event===e&&(n._queue.shift(),n._loadQueue()),e||t.action()}return n},_ended:function(e){var n=this,t=e._sprite;if(!n._webAudio&&e._node&&!e._node.paused&&!e._node.ended&&e._node.currentTime<e._stop)return setTimeout(n._ended.bind(n,e),100),n;var o=!(!e._loop&&!n._sprite[t][2]);if(n._emit("end",e._id),!n._webAudio&&o&&n.stop(e._id,!0).play(e._id),n._webAudio&&o){n._emit("play",e._id),e._seek=e._start||0,e._rateSeek=0,e._playStart=i.ctx.currentTime;var r=1e3*(e._stop-e._start)/Math.abs(e._rate);n._endTimers[e._id]=setTimeout(n._ended.bind(n,e),r)}return n._webAudio&&!o&&(e._paused=!0,e._ended=!0,e._seek=e._start||0,e._rateSeek=0,n._clearTimer(e._id),n._cleanBuffer(e._node),i._autoSuspend()),n._webAudio||o||n.stop(e._id,!0),n},_clearTimer:function(e){var n=this;if(n._endTimers[e]){if("function"!=typeof n._endTimers[e])clearTimeout(n._endTimers[e]);else{var t=n._soundById(e);t&&t._node&&t._node.removeEventListener("ended",n._endTimers[e],!1)}delete n._endTimers[e]}return n},_soundById:function(e){for(var n=this,t=0;t<n._sounds.length;t++)if(e===n._sounds[t]._id)return n._sounds[t];return null},_inactiveSound:function(){var e=this;e._drain();for(var n=0;n<e._sounds.length;n++)if(e._sounds[n]._ended)return e._sounds[n].reset();return new s(e)},_drain:function(){var e=this,n=e._pool,t=0,o=0;if(!(e._sounds.length<n)){for(o=0;o<e._sounds.length;o++)e._sounds[o]._ended&&t++;for(o=e._sounds.length-1;o>=0;o--){if(t<=n)return;e._sounds[o]._ended&&(e._webAudio&&e._sounds[o]._node&&e._sounds[o]._node.disconnect(0),e._sounds.splice(o,1),t--)}}},_getSoundIds:function(e){if(void 0===e){for(var n=[],t=0;t<this._sounds.length;t++)n.push(this._sounds[t]._id);return n}return[e]},_refreshBuffer:function(e){return e._node.bufferSource=i.ctx.createBufferSource(),e._node.bufferSource.buffer=u[this._src],e._panner?e._node.bufferSource.connect(e._panner):e._node.bufferSource.connect(e._node),e._node.bufferSource.loop=e._loop,e._loop&&(e._node.bufferSource.loopStart=e._start||0,e._node.bufferSource.loopEnd=e._stop||0),e._node.bufferSource.playbackRate.setValueAtTime(e._rate,i.ctx.currentTime),this},_cleanBuffer:function(e){var n=i._navigator&&i._navigator.vendor.indexOf("Apple")>=0;if(!e.bufferSource)return this;if(i._scratchBuffer&&e.bufferSource&&(e.bufferSource.onended=null,e.bufferSource.disconnect(0),n))try{e.bufferSource.buffer=i._scratchBuffer}catch(e){}return e.bufferSource=null,this},_clearSound:function(e){/MSIE |Trident\//.test(i._navigator&&i._navigator.userAgent)||(e.src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")}};var s=function(e){this._parent=e,this.init()};s.prototype={init:function(){var e=this,n=e._parent;return e._muted=n._muted,e._loop=n._loop,e._volume=n._volume,e._rate=n._rate,e._seek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=++i._counter,n._sounds.push(e),e.create(),e},create:function(){var e=this,n=e._parent,t=i._muted||e._muted||e._parent._muted?0:e._volume;return n._webAudio?(e._node=void 0===i.ctx.createGain?i.ctx.createGainNode():i.ctx.createGain(),e._node.gain.setValueAtTime(t,i.ctx.currentTime),e._node.paused=!0,e._node.connect(i.masterGain)):i.noAudio||(e._node=i._obtainHtml5Audio(),e._errorFn=e._errorListener.bind(e),e._node.addEventListener("error",e._errorFn,!1),e._loadFn=e._loadListener.bind(e),e._node.addEventListener(i._canPlayEvent,e._loadFn,!1),e._endFn=e._endListener.bind(e),e._node.addEventListener("ended",e._endFn,!1),e._node.src=n._src,e._node.preload=!0===n._preload?"auto":n._preload,e._node.volume=t*i.volume(),e._node.load()),e},reset:function(){var e=this,n=e._parent;return e._muted=n._muted,e._loop=n._loop,e._volume=n._volume,e._rate=n._rate,e._seek=0,e._rateSeek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=++i._counter,e},_errorListener:function(){var e=this;e._parent._emit("loaderror",e._id,e._node.error?e._node.error.code:0),e._node.removeEventListener("error",e._errorFn,!1)},_loadListener:function(){var e=this,n=e._parent;n._duration=Math.ceil(10*e._node.duration)/10,0===Object.keys(n._sprite).length&&(n._sprite={__default:[0,1e3*n._duration]}),"loaded"!==n._state&&(n._state="loaded",n._emit("load"),n._loadQueue()),e._node.removeEventListener(i._canPlayEvent,e._loadFn,!1)},_endListener:function(){var e=this,n=e._parent;n._duration===1/0&&(n._duration=Math.ceil(10*e._node.duration)/10,n._sprite.__default[1]===1/0&&(n._sprite.__default[1]=1e3*n._duration),n._ended(e)),e._node.removeEventListener("ended",e._endFn,!1)}};var u={},d=function(e){var n=e._src;if(u[n])return e._duration=u[n].duration,void c(e);if(/^data:[^;]+;base64,/.test(n)){for(var t=atob(n.split(",")[1]),o=new Uint8Array(t.length),r=0;r<t.length;++r)o[r]=t.charCodeAt(r);l(o.buffer,e)}else{var i=new XMLHttpRequest;i.open(e._xhr.method,n,!0),i.withCredentials=e._xhr.withCredentials,i.responseType="arraybuffer",e._xhr.headers&&Object.keys(e._xhr.headers).forEach((function(n){i.setRequestHeader(n,e._xhr.headers[n])})),i.onload=function(){var n=(i.status+"")[0];"0"===n||"2"===n||"3"===n?l(i.response,e):e._emit("loaderror",null,"Failed loading audio file with status: "+i.status+".")},i.onerror=function(){e._webAudio&&(e._html5=!0,e._webAudio=!1,e._sounds=[],delete u[n],e.load())},_(i)}},_=function(e){try{e.send()}catch(n){e.onerror()}},l=function(e,n){var t=function(){n._emit("loaderror",null,"Decoding audio data failed.")},o=function(e){e&&n._sounds.length>0?(u[n._src]=e,c(n,e)):t()};"undefined"!=typeof Promise&&1===i.ctx.decodeAudioData.length?i.ctx.decodeAudioData(e).then(o).catch(t):i.ctx.decodeAudioData(e,o,t)},c=function(e,n){n&&!e._duration&&(e._duration=n.duration),0===Object.keys(e._sprite).length&&(e._sprite={__default:[0,1e3*e._duration]}),"loaded"!==e._state&&(e._state="loaded",e._emit("load"),e._loadQueue())},p=function(){if(i.usingWebAudio){try{"undefined"!=typeof AudioContext?i.ctx=new AudioContext:"undefined"!=typeof webkitAudioContext?i.ctx=new webkitAudioContext:i.usingWebAudio=!1}catch(e){i.usingWebAudio=!1}i.ctx||(i.usingWebAudio=!1);var e=/iP(hone|od|ad)/.test(i._navigator&&i._navigator.platform),n=i._navigator&&i._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),t=n?parseInt(n[1],10):null;if(e&&t&&t<9){var o=/safari/.test(i._navigator&&i._navigator.userAgent.toLowerCase());i._navigator&&!o&&(i.usingWebAudio=!1)}i.usingWebAudio&&(i.masterGain=void 0===i.ctx.createGain?i.ctx.createGainNode():i.ctx.createGain(),i.masterGain.gain.setValueAtTime(i._muted?0:i._volume,i.ctx.currentTime),i.masterGain.connect(i.ctx.destination)),i._setup()}};void 0===(o=function(){return{Howler:i,Howl:a}}.apply(n,[]))||(e.exports=o),n.Howler=i,n.Howl=a,void 0!==t.g?(t.g.HowlerGlobal=r,t.g.Howler=i,t.g.Howl=a,t.g.Sound=s):"undefined"!=typeof window&&(window.HowlerGlobal=r,window.Howler=i,window.Howl=a,window.Sound=s)}(),function(){"use strict";var e;HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype.stereo=function(e){var n=this;if(!n.ctx||!n.ctx.listener)return n;for(var t=n._howls.length-1;t>=0;t--)n._howls[t].stereo(e);return n},HowlerGlobal.prototype.pos=function(e,n,t){var o=this;return o.ctx&&o.ctx.listener?(n="number"!=typeof n?o._pos[1]:n,t="number"!=typeof t?o._pos[2]:t,"number"!=typeof e?o._pos:(o._pos=[e,n,t],void 0!==o.ctx.listener.positionX?(o.ctx.listener.positionX.setTargetAtTime(o._pos[0],Howler.ctx.currentTime,.1),o.ctx.listener.positionY.setTargetAtTime(o._pos[1],Howler.ctx.currentTime,.1),o.ctx.listener.positionZ.setTargetAtTime(o._pos[2],Howler.ctx.currentTime,.1)):o.ctx.listener.setPosition(o._pos[0],o._pos[1],o._pos[2]),o)):o},HowlerGlobal.prototype.orientation=function(e,n,t,o,r,i){var a=this;if(!a.ctx||!a.ctx.listener)return a;var s=a._orientation;return n="number"!=typeof n?s[1]:n,t="number"!=typeof t?s[2]:t,o="number"!=typeof o?s[3]:o,r="number"!=typeof r?s[4]:r,i="number"!=typeof i?s[5]:i,"number"!=typeof e?s:(a._orientation=[e,n,t,o,r,i],void 0!==a.ctx.listener.forwardX?(a.ctx.listener.forwardX.setTargetAtTime(e,Howler.ctx.currentTime,.1),a.ctx.listener.forwardY.setTargetAtTime(n,Howler.ctx.currentTime,.1),a.ctx.listener.forwardZ.setTargetAtTime(t,Howler.ctx.currentTime,.1),a.ctx.listener.upX.setTargetAtTime(o,Howler.ctx.currentTime,.1),a.ctx.listener.upY.setTargetAtTime(r,Howler.ctx.currentTime,.1),a.ctx.listener.upZ.setTargetAtTime(i,Howler.ctx.currentTime,.1)):a.ctx.listener.setOrientation(e,n,t,o,r,i),a)},Howl.prototype.init=(e=Howl.prototype.init,function(n){var t=this;return t._orientation=n.orientation||[1,0,0],t._stereo=n.stereo||null,t._pos=n.pos||null,t._pannerAttr={coneInnerAngle:void 0!==n.coneInnerAngle?n.coneInnerAngle:360,coneOuterAngle:void 0!==n.coneOuterAngle?n.coneOuterAngle:360,coneOuterGain:void 0!==n.coneOuterGain?n.coneOuterGain:0,distanceModel:void 0!==n.distanceModel?n.distanceModel:"inverse",maxDistance:void 0!==n.maxDistance?n.maxDistance:1e4,panningModel:void 0!==n.panningModel?n.panningModel:"HRTF",refDistance:void 0!==n.refDistance?n.refDistance:1,rolloffFactor:void 0!==n.rolloffFactor?n.rolloffFactor:1},t._onstereo=n.onstereo?[{fn:n.onstereo}]:[],t._onpos=n.onpos?[{fn:n.onpos}]:[],t._onorientation=n.onorientation?[{fn:n.onorientation}]:[],e.call(this,n)}),Howl.prototype.stereo=function(e,t){var o=this;if(!o._webAudio)return o;if("loaded"!==o._state)return o._queue.push({event:"stereo",action:function(){o.stereo(e,t)}}),o;var r=void 0===Howler.ctx.createStereoPanner?"spatial":"stereo";if(void 0===t){if("number"!=typeof e)return o._stereo;o._stereo=e,o._pos=[e,0,0]}for(var i=o._getSoundIds(t),a=0;a<i.length;a++){var s=o._soundById(i[a]);if(s){if("number"!=typeof e)return s._stereo;s._stereo=e,s._pos=[e,0,0],s._node&&(s._pannerAttr.panningModel="equalpower",s._panner&&s._panner.pan||n(s,r),"spatial"===r?void 0!==s._panner.positionX?(s._panner.positionX.setValueAtTime(e,Howler.ctx.currentTime),s._panner.positionY.setValueAtTime(0,Howler.ctx.currentTime),s._panner.positionZ.setValueAtTime(0,Howler.ctx.currentTime)):s._panner.setPosition(e,0,0):s._panner.pan.setValueAtTime(e,Howler.ctx.currentTime)),o._emit("stereo",s._id)}}return o},Howl.prototype.pos=function(e,t,o,r){var i=this;if(!i._webAudio)return i;if("loaded"!==i._state)return i._queue.push({event:"pos",action:function(){i.pos(e,t,o,r)}}),i;if(t="number"!=typeof t?0:t,o="number"!=typeof o?-.5:o,void 0===r){if("number"!=typeof e)return i._pos;i._pos=[e,t,o]}for(var a=i._getSoundIds(r),s=0;s<a.length;s++){var u=i._soundById(a[s]);if(u){if("number"!=typeof e)return u._pos;u._pos=[e,t,o],u._node&&(u._panner&&!u._panner.pan||n(u,"spatial"),void 0!==u._panner.positionX?(u._panner.positionX.setValueAtTime(e,Howler.ctx.currentTime),u._panner.positionY.setValueAtTime(t,Howler.ctx.currentTime),u._panner.positionZ.setValueAtTime(o,Howler.ctx.currentTime)):u._panner.setPosition(e,t,o)),i._emit("pos",u._id)}}return i},Howl.prototype.orientation=function(e,t,o,r){var i=this;if(!i._webAudio)return i;if("loaded"!==i._state)return i._queue.push({event:"orientation",action:function(){i.orientation(e,t,o,r)}}),i;if(t="number"!=typeof t?i._orientation[1]:t,o="number"!=typeof o?i._orientation[2]:o,void 0===r){if("number"!=typeof e)return i._orientation;i._orientation=[e,t,o]}for(var a=i._getSoundIds(r),s=0;s<a.length;s++){var u=i._soundById(a[s]);if(u){if("number"!=typeof e)return u._orientation;u._orientation=[e,t,o],u._node&&(u._panner||(u._pos||(u._pos=i._pos||[0,0,-.5]),n(u,"spatial")),void 0!==u._panner.orientationX?(u._panner.orientationX.setValueAtTime(e,Howler.ctx.currentTime),u._panner.orientationY.setValueAtTime(t,Howler.ctx.currentTime),u._panner.orientationZ.setValueAtTime(o,Howler.ctx.currentTime)):u._panner.setOrientation(e,t,o)),i._emit("orientation",u._id)}}return i},Howl.prototype.pannerAttr=function(){var e,t,o,r=this,i=arguments;if(!r._webAudio)return r;if(0===i.length)return r._pannerAttr;if(1===i.length){if("object"!=typeof i[0])return(o=r._soundById(parseInt(i[0],10)))?o._pannerAttr:r._pannerAttr;e=i[0],void 0===t&&(e.pannerAttr||(e.pannerAttr={coneInnerAngle:e.coneInnerAngle,coneOuterAngle:e.coneOuterAngle,coneOuterGain:e.coneOuterGain,distanceModel:e.distanceModel,maxDistance:e.maxDistance,refDistance:e.refDistance,rolloffFactor:e.rolloffFactor,panningModel:e.panningModel}),r._pannerAttr={coneInnerAngle:void 0!==e.pannerAttr.coneInnerAngle?e.pannerAttr.coneInnerAngle:r._coneInnerAngle,coneOuterAngle:void 0!==e.pannerAttr.coneOuterAngle?e.pannerAttr.coneOuterAngle:r._coneOuterAngle,coneOuterGain:void 0!==e.pannerAttr.coneOuterGain?e.pannerAttr.coneOuterGain:r._coneOuterGain,distanceModel:void 0!==e.pannerAttr.distanceModel?e.pannerAttr.distanceModel:r._distanceModel,maxDistance:void 0!==e.pannerAttr.maxDistance?e.pannerAttr.maxDistance:r._maxDistance,refDistance:void 0!==e.pannerAttr.refDistance?e.pannerAttr.refDistance:r._refDistance,rolloffFactor:void 0!==e.pannerAttr.rolloffFactor?e.pannerAttr.rolloffFactor:r._rolloffFactor,panningModel:void 0!==e.pannerAttr.panningModel?e.pannerAttr.panningModel:r._panningModel})}else 2===i.length&&(e=i[0],t=parseInt(i[1],10));for(var a=r._getSoundIds(t),s=0;s<a.length;s++)if(o=r._soundById(a[s])){var u=o._pannerAttr;u={coneInnerAngle:void 0!==e.coneInnerAngle?e.coneInnerAngle:u.coneInnerAngle,coneOuterAngle:void 0!==e.coneOuterAngle?e.coneOuterAngle:u.coneOuterAngle,coneOuterGain:void 0!==e.coneOuterGain?e.coneOuterGain:u.coneOuterGain,distanceModel:void 0!==e.distanceModel?e.distanceModel:u.distanceModel,maxDistance:void 0!==e.maxDistance?e.maxDistance:u.maxDistance,refDistance:void 0!==e.refDistance?e.refDistance:u.refDistance,rolloffFactor:void 0!==e.rolloffFactor?e.rolloffFactor:u.rolloffFactor,panningModel:void 0!==e.panningModel?e.panningModel:u.panningModel};var d=o._panner;d||(o._pos||(o._pos=r._pos||[0,0,-.5]),n(o,"spatial"),d=o._panner),d.coneInnerAngle=u.coneInnerAngle,d.coneOuterAngle=u.coneOuterAngle,d.coneOuterGain=u.coneOuterGain,d.distanceModel=u.distanceModel,d.maxDistance=u.maxDistance,d.refDistance=u.refDistance,d.rolloffFactor=u.rolloffFactor,d.panningModel=u.panningModel}return r},Sound.prototype.init=function(e){return function(){var n=this,t=n._parent;n._orientation=t._orientation,n._stereo=t._stereo,n._pos=t._pos,n._pannerAttr=t._pannerAttr,e.call(this),n._stereo?t.stereo(n._stereo):n._pos&&t.pos(n._pos[0],n._pos[1],n._pos[2],n._id)}}(Sound.prototype.init),Sound.prototype.reset=function(e){return function(){var n=this,t=n._parent;return n._orientation=t._orientation,n._stereo=t._stereo,n._pos=t._pos,n._pannerAttr=t._pannerAttr,n._stereo?t.stereo(n._stereo):n._pos?t.pos(n._pos[0],n._pos[1],n._pos[2],n._id):n._panner&&(n._panner.disconnect(0),n._panner=void 0,t._refreshBuffer(n)),e.call(this)}}(Sound.prototype.reset);var n=function(e,n){"spatial"===(n=n||"spatial")?(e._panner=Howler.ctx.createPanner(),e._panner.coneInnerAngle=e._pannerAttr.coneInnerAngle,e._panner.coneOuterAngle=e._pannerAttr.coneOuterAngle,e._panner.coneOuterGain=e._pannerAttr.coneOuterGain,e._panner.distanceModel=e._pannerAttr.distanceModel,e._panner.maxDistance=e._pannerAttr.maxDistance,e._panner.refDistance=e._pannerAttr.refDistance,e._panner.rolloffFactor=e._pannerAttr.rolloffFactor,e._panner.panningModel=e._pannerAttr.panningModel,void 0!==e._panner.positionX?(e._panner.positionX.setValueAtTime(e._pos[0],Howler.ctx.currentTime),e._panner.positionY.setValueAtTime(e._pos[1],Howler.ctx.currentTime),e._panner.positionZ.setValueAtTime(e._pos[2],Howler.ctx.currentTime)):e._panner.setPosition(e._pos[0],e._pos[1],e._pos[2]),void 0!==e._panner.orientationX?(e._panner.orientationX.setValueAtTime(e._orientation[0],Howler.ctx.currentTime),e._panner.orientationY.setValueAtTime(e._orientation[1],Howler.ctx.currentTime),e._panner.orientationZ.setValueAtTime(e._orientation[2],Howler.ctx.currentTime)):e._panner.setOrientation(e._orientation[0],e._orientation[1],e._orientation[2])):(e._panner=Howler.ctx.createStereoPanner(),e._panner.pan.setValueAtTime(e._stereo,Howler.ctx.currentTime)),e._panner.connect(e._node),e._paused||e._parent.pause(e._id,!0).play(e._id,!0)}}()}},n={};function t(o){var r=n[o];if(void 0!==r)return r.exports;var i=n[o]={exports:{}};return e[o](i,i.exports,t),i.exports}t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{"use strict";var e=t(766);class n{constructor(...e){this.placeCounter=1,this.code=0;for(let n of e)this.addLine(n)}addLine(e){this.code+=this.placeCounter*e,this.placeCounter*=10}}const o={[new n(0).code]:1,[new n(1).code]:2,[new n(2).code]:3,[new n(6).code]:5,[new n(4).code]:9,[new n(1,2).code]:6,[new n(1,6).code]:8,[new n(4,2).code]:0,[new n(2,6).code]:4};class r{recognizeDigit(e){if(1==e.length)return 1;if(4==e.length)return 7;e.sort(((e,n)=>this.comporator(e,n)));const t=new n;for(let n=1;n<e.length;n++){const o=this.identifyLineType(e[0],e[n]);t.addLine(o)}return o[t.code]}identifyLineType(e,n){const t=this.calculateAngle(e,n);switch(!0){case this.isVertical(t):return 1;case this.isRightDiagonal(t):return 6;case this.isLeftDiagonal(t):return 4;case this.isHorizontal(t):return 2;default:return-1}}calculateAngle=(e,n)=>Math.atan2(n.y-e.y,n.x-e.x)*(180/Math.PI);isVertical=e=>Math.abs(e)>=70&&Math.abs(e)<=110;isHorizontal=e=>Math.abs(e)>=0&&Math.abs(e)<=20||Math.abs(e)>=160&&Math.abs(e)<=180;isRightDiagonal=(e,n=1)=>e>20&&e<70;isLeftDiagonal=e=>e>-70&&e<-20;comporator(e,n){const t=this.calculateAngle(e,n);return t<110&&t>-70?-1:1}}const i=document.getElementById("main"),a=document.getElementById("result"),s=new class{constructor(e,n){this.resultElement=n,this.player=e,this._errorMessage="Ошибка! Не удалось распознать комбинацию точек.",this._period=1e3,this._points=[]}Handle(e){e.preventDefault(),this.resetTimer(),this.player.PlayTouch();const n={x:e.touches[0].clientX,y:e.touches[0].clientY};this._points.push(n),this._timerId=this.startTimer()}startTimer=()=>setTimeout((()=>this.convertPoints()),this._period);resetTimer=()=>clearTimeout(this._timerId);convertPoints(){const e=(new r).recognizeDigit(this._points);e<0||void 0===e?(this.player.PlayError(),this.showResult(this._errorMessage)):(this.player.PlaySuccess(e),this.showResult(e)),this._points=[]}showResult(e){this.resultElement.innerText=e}}(new class{constructor(){this._soundOnly=!1,this.touch=new e.Howl({src:["sounds/touch.mp3"]}),this.success=new e.Howl({src:["sounds/success.mp3"]}),this.error=new e.Howl({src:["sounds/error.mp3"]}),this._synth=window.speechSynthesis,this.lang="ru-RU";const n=this._synth.getVoices();this.voice=n.find((e=>e.lang.startsWith("ru")))||n[0],this.voiceOn=!1}PlayTouch(){if(this.touch.play(),0==this.voiceOn){const e=new SpeechSynthesisUtterance(" hello");e.voice=this.voice,e.lang=this.lang,this._synth.speak(e),this.voiceOn=!0}}PlaySuccess(e){if(this._soundOnly||null==e)this.success.play();else{const n=new SpeechSynthesisUtterance(e);n.voice=this.voice,n.lang=this.lang,this._synth.speak(n)}}PlayError(){this.error.play()}},a);i.addEventListener("touchstart",(e=>s.Handle(e)))})()})();