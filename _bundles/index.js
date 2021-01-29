!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("short-cut",[],e):"object"==typeof exports?exports["short-cut"]=e():t["short-cut"]=e()}(self,(function(){return(()=>{var t={22:function(t,e,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(t,e,n,r){void 0===r&&(r=n),Object.defineProperty(t,r,{enumerable:!0,get:function(){return e[n]}})}:function(t,e,n,r){void 0===r&&(r=n),t[r]=e[n]}),i=this&&this.__exportStar||function(t,e){for(var n in t)"default"===n||Object.prototype.hasOwnProperty.call(e,n)||r(e,t,n)},o=this&&this.__values||function(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};Object.defineProperty(e,"__esModule",{value:!0}),e.shortCut=void 0;var s=n(743),a=n(541);n(188);var c=function(){function t(e){var n=this;if(this.render=a.default,this.kvDownMap=new Map,this.kvUpMap=new Map,this.keyValueMap={DELETE:127,ENTER:13,BACKSPACE:8,CTRL:17,ALT:18,SPACE:32},this.option={preventDefault:!0},e&&(this.option=e),t.instance)return t.instance;window.onbeforeunload=function(t){t.preventDefault(),t.returnValue=""},document.addEventListener("keydown",(function(t){n.handlerKeyUpOrDown(t,n.kvDownMap)})),document.addEventListener("keyup",(function(t){n.handlerKeyUpOrDown(t,n.kvUpMap,!1)})),t.id++}return t.prototype.on=function(t,e,n){this.kvDownMap.set(this.checkKeyExist(t,this.kvDownMap),e),n&&this.kvUpMap.set(this.checkKeyExist(t,this.kvUpMap),n)},t.prototype.showInstruction=function(){this.render.showIns(this.kvDownMap)},t.prototype.handlerKeyUpOrDown=function(t,e,n){var r,i;void 0===n&&(n=!0);var s=e.keys(),a=this.option.preventDefault;try{for(var c=o(s),u=c.next();!u.done;u=c.next()){var d=u.value,f=d.showTip,h=void 0===f||f;if(this.checkKeyMatch(t.keyCode,d)){if(!this.checkAssistKeyMatch(d,t))return;a&&t.preventDefault();var l=e.get(d);n&&h&&this.render.show(this.getContent(d,t)),l&&l()}}}catch(t){r={error:t}}finally{try{u&&!u.done&&(i=c.return)&&i.call(c)}finally{if(r)throw r.error}}},t.prototype.getContent=function(t,e){var n=this,r=t.content,i=void 0===r?"":r,o=t.assistArray,a="";if(o){var c=o.find((function(t){return n.assistMatchMethod(t,e)}));a=this.render.genAssistKeys(c).join(" + ")}else a=this.render.genAssistKeys(t).join(" + ");return(a?a+" + ":"")+" "+s.getKeyLetter(t)+" "+i},t.prototype.checkKeyExist=function(t,e){var n,r;try{for(var i=o(e.keys()),s=i.next();!s.done;s=i.next()){var a=s.value,c=a.key,u=a.alt,d=a.ctrl,f=a.shift,h=a.code,l=a.content;if(h===t.code&&c===t.key&&u===t.alt&&d===t.ctrl&&f===t.shift&&l===t.content)return a}}catch(t){n={error:t}}finally{try{s&&!s.done&&(r=i.return)&&r.call(i)}finally{if(n)throw n.error}}return t},t.prototype.checkKeyMatch=function(t,e){var n=e.key,r=e.code;return n?t===n.toUpperCase().charCodeAt(0):t===r},t.prototype.checkAssistKeyMatch=function(t,e){var n,r,i=t.assistArray;if(i&&i.length){try{for(var s=o(i),a=s.next();!a.done;a=s.next()){var c=a.value;if(this.assistMatchMethod(c,e))return!0}}catch(t){n={error:t}}finally{try{a&&!a.done&&(r=s.return)&&r.call(s)}finally{if(n)throw n.error}}return!1}return this.assistMatchMethod(t,e)},t.prototype.assistMatchMethod=function(t,e){var n=t.ctrl,r=t.meta,i=t.shift,o=t.alt,s=e.metaKey,a=e.ctrlKey,c=e.shiftKey,u=e.altKey;return!!n===a&&!!r===s&&!!i===c&&!!o===u},t.id=0,t.instance=new t,t}(),u=new c;e.shortCut=u,window.shortCut=u,e.default=c,i(n(906),e)},541:function(t,e,n){"use strict";var r=this&&this.__values||function(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};Object.defineProperty(e,"__esModule",{value:!0});var i=n(743),o=new(function(){function t(){this.initThumb(),this.initInstruction()}return t.prototype.show=function(t){var e=this;this.timeout&&clearTimeout(this.timeout),this.dom.classList.remove("show"),setTimeout((function(){e.dom.innerHTML=t,e.dom.classList.add("show")}),100),this.timeout=setTimeout((function(){e.dom.classList.remove("show")}),2e3)},t.prototype.initThumb=function(){this.dom=window.document.createElement("div"),this.dom.innerHTML="",window.document.body.appendChild(this.dom),this.dom.classList.add("short-cut")},t.prototype.initInstruction=function(){var t=this;this.instructionDom=window.document.createElement("div"),this.instructionDom.innerHTML="<div class='sc-block'></div>",window.document.body.appendChild(this.instructionDom),this.instructionDom.classList.add("sc-instruction"),this.instructionDom.addEventListener("click",(function(e){e.target.classList.contains("sc-instruction")&&t.instructionDom.classList.remove("show")}))},t.prototype.showIns=function(t){var e=this.genInstructorData(t),n=document.querySelector(".sc-block");this.instructionDom.classList.add("show");var r=e.map((function(t){var e=t.keys;return'<div class="sc-record"><div class="sc-record-content">'+t.content+'</div>: <div class="sc-record-keys"> '+(Array.isArray(e[0])?e.map((function(t){return t.join(" + ")})).join(" | "):e.join(" + "))+" </div> </div>"})).join("");n.innerHTML=r},t.prototype.genInstructorData=function(t){var e,n,o=this,s=[],a=function(t){var e=t.content,n=t.assistArray,r={content:e,keys:[]};if(!e)return"continue";var a=i.getKeyLetter(t).toUpperCase();n?n.length>1?r.keys=n.map((function(t){return o.genAssistKeys(t).concat([a])})):0===n.length&&(r.keys=c.genAssistKeys(n[0]).concat([a])):r.keys=c.genAssistKeys(t).concat([a]),s.push(r)},c=this;try{for(var u=r(t.keys()),d=u.next();!d.done;d=u.next()){a(d.value)}}catch(t){e={error:t}}finally{try{d&&!d.done&&(n=u.return)&&n.call(u)}finally{if(e)throw e.error}}return s},t.prototype.genAssistKeys=function(t){var e=t.ctrl,n=t.meta,r=t.shift,o=t.alt,s=t.caps,a=[];return e&&a.push("Ctrl"),n&&a.push("Mac"===i.detectOS()?"Command":"Win"),r&&a.push("Shift"),o&&a.push("Alt"),s&&a.push("Caps"),a},t}());e.default=o},906:()=>{},743:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.detectOS=e.getKeyLetter=void 0,e.getKeyLetter=function(t){var e=t.key,n=t.code;return e||(n?String.fromCharCode(n):"")},e.detectOS=function(){var t=navigator.userAgent,e="Win32"==navigator.platform||"Windows"==navigator.platform,n="Mac68K"==navigator.platform||"MacPPC"==navigator.platform||"Macintosh"==navigator.platform||"MacIntel"==navigator.platform;if(n)return"Mac";if("X11"==navigator.platform&&!e&&!n)return"Unix";if(String(navigator.platform).indexOf("Linux")>-1)return"Linux";if(e){if(t.indexOf("Windows NT 5.0")>-1||t.indexOf("Windows 2000")>-1)return"Win2000";if(t.indexOf("Windows NT 5.1")>-1||t.indexOf("Windows XP")>-1)return"WinXP";if(t.indexOf("Windows NT 5.2")>-1||t.indexOf("Windows 2003")>-1)return"Win2003";if(t.indexOf("Windows NT 6.0")>-1||t.indexOf("Windows Vista")>-1)return"WinVista";if(t.indexOf("Windows NT 6.1")>-1||t.indexOf("Windows 7")>-1)return"Win7"}return"other"}},188:(t,e,n)=>{"use strict";n.r(e)}},e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={exports:{}};return t[r].call(i.exports,i,i.exports,n),i.exports}return n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n(22)})()}));