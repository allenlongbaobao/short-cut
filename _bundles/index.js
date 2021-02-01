/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("short-cut", [], factory);
	else if(typeof exports === 'object')
		exports["short-cut"] = factory();
	else
		root["short-cut"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __values = (this && this.__values) || function(o) {\n    var s = typeof Symbol === \"function\" && Symbol.iterator, m = s && o[s], i = 0;\n    if (m) return m.call(o);\n    if (o && typeof o.length === \"number\") return {\n        next: function () {\n            if (o && i >= o.length) o = void 0;\n            return { value: o && o[i++], done: !o };\n        }\n    };\n    throw new TypeError(s ? \"Object is not iterable.\" : \"Symbol.iterator is not defined.\");\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.shortCut = exports.durationMap = void 0;\nvar utils_1 = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\nvar render_1 = __webpack_require__(/*! ./render */ \"./src/render.ts\");\n__webpack_require__(/*! ./style/index.scss */ \"./src/style/index.scss\");\nexports.durationMap = {\n    fast: 300,\n    medium: 1000,\n    slow: 2000,\n};\nvar ShortCut = /** @class */ (function () {\n    /**\n     * 构造器传入参数\n     * 1. container 提示所在的 container，默认是 fixed 布局，如果传入了 container，那么就会绝对布局，\n     * 2. pos: topLeft | topRight | bottomLeft | bottomRight 默认左下角\n     *\n     * @param param0\n     */\n    function ShortCut(o) {\n        var _this = this;\n        this.render = render_1.default;\n        this.kvDownMap = new Map();\n        this.kvUpMap = new Map();\n        this.option = {\n            preventDefault: true,\n            duration: \"slow\",\n        };\n        // 确保全局唯一\n        if (ShortCut.instance) {\n            // 设置会覆盖\n            if (o) {\n                ShortCut.instance.option = __assign(__assign({}, this.option), o);\n            }\n            return ShortCut.instance;\n        }\n        // 离开页面提示\n        window.onbeforeunload = function (event) {\n            event.preventDefault();\n            event.returnValue = \"\";\n        };\n        document.addEventListener(\"keydown\", function (event) {\n            _this.handlerKeyUpOrDown(event, _this.kvDownMap);\n        });\n        document.addEventListener(\"keyup\", function (event) {\n            _this.handlerKeyUpOrDown(event, _this.kvUpMap, false);\n        });\n        ShortCut.id++;\n    }\n    ShortCut.prototype.setDuration = function (duration) {\n        this.option.duration = duration;\n    };\n    /**\n     * 增加了监听事件\n     * @param keyData\n     * @param fn\n     * @param preventDefault 是否阻止默认行为，默认不阻止\n     */\n    ShortCut.prototype.on = function (keyData, keyDownFn, keyUpFn) {\n        // 做一次键重复性判断\n        this.kvDownMap.set(this.checkKeyExist(keyData, this.kvDownMap), keyDownFn);\n        if (keyUpFn) {\n            this.kvUpMap.set(this.checkKeyExist(keyData, this.kvUpMap), keyUpFn);\n        }\n    };\n    /**\n     * 展示快捷键说明\n     */\n    ShortCut.prototype.showInstruction = function () {\n        this.render.showIns(this.kvDownMap);\n    };\n    ShortCut.prototype.handlerKeyUpOrDown = function (event, map, showContent) {\n        var e_1, _a;\n        if (showContent === void 0) { showContent = true; }\n        var keySets = map.keys();\n        var _b = this.option, preventDefault = _b.preventDefault, duration = _b.duration;\n        try {\n            for (var keySets_1 = __values(keySets), keySets_1_1 = keySets_1.next(); !keySets_1_1.done; keySets_1_1 = keySets_1.next()) {\n                var keySet = keySets_1_1.value;\n                var _c = keySet.showTip, showTip = _c === void 0 ? true : _c;\n                if (this.checkKeyMatch(event.keyCode, keySet)) {\n                    if (!this.checkAssistKeyMatch(keySet, event)) {\n                        return;\n                    }\n                    if (preventDefault) {\n                        event.preventDefault();\n                    }\n                    var fn = map.get(keySet);\n                    if (showContent && showTip) {\n                        console.log(\"duration\", this);\n                        this.render.show(this.getContent(keySet, event), duration);\n                    }\n                    fn && fn();\n                }\n            }\n        }\n        catch (e_1_1) { e_1 = { error: e_1_1 }; }\n        finally {\n            try {\n                if (keySets_1_1 && !keySets_1_1.done && (_a = keySets_1.return)) _a.call(keySets_1);\n            }\n            finally { if (e_1) throw e_1.error; }\n        }\n    };\n    ShortCut.prototype.getContent = function (keyData, event) {\n        var _this = this;\n        var _a = keyData.content, content = _a === void 0 ? \"\" : _a, assistArray = keyData.assistArray;\n        var prefix = \"\";\n        if (assistArray) {\n            var assist = assistArray.find(function (a) { return _this.assistMatchMethod(a, event); });\n            prefix = this.render.genAssistKeys(assist).join(\" + \");\n        }\n        else {\n            prefix = this.render.genAssistKeys(keyData).join(\" + \");\n        }\n        return (!!prefix ? prefix + \" + \" : \"\") + \" \" + utils_1.getKeyLetter(keyData) + \" \" + content;\n    };\n    /**\n     * 判断 传入的 keyData 是否已经存在，如果存在，则返回已存在的 keyData\n     * 不存在, 则返回传入的 keyData\n     * @param keyData\n     */\n    ShortCut.prototype.checkKeyExist = function (keyData, map) {\n        var e_2, _a;\n        try {\n            // 每个属性对比是否一致\n            for (var _b = __values(map.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {\n                var keySet = _c.value;\n                var key = keySet.key, alt = keySet.alt, ctrl = keySet.ctrl, shift = keySet.shift, code = keySet.code, content = keySet.content;\n                if (code !== keyData.code ||\n                    key !== keyData.key ||\n                    alt !== keyData.alt ||\n                    ctrl !== keyData.ctrl ||\n                    shift !== keyData.shift ||\n                    content !== keyData.content) {\n                    continue;\n                }\n                return keySet;\n            }\n        }\n        catch (e_2_1) { e_2 = { error: e_2_1 }; }\n        finally {\n            try {\n                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);\n            }\n            finally { if (e_2) throw e_2.error; }\n        }\n        return keyData;\n    };\n    /**\n     * 判断按键 和 约束的条件是否匹配，不包括辅助功能键, 支持 键盘字母和 code 两个约束\n     */\n    ShortCut.prototype.checkKeyMatch = function (keyCode, keySet) {\n        var key = keySet.key, code = keySet.code;\n        if (key) {\n            return keyCode === key.toUpperCase().charCodeAt(0);\n        }\n        return keyCode === code;\n    };\n    /**\n     * 判断辅助键是否匹配\n     * @param keySet\n     */\n    ShortCut.prototype.checkAssistKeyMatch = function (keySet, event) {\n        var e_3, _a;\n        var assistArray = keySet.assistArray;\n        // 有辅助键的情况，会忽略其他的键的支持\n        if (assistArray && assistArray.length) {\n            try {\n                // 数值中配置了多个方案，只要有一个方案匹配上就可以返回 true\n                for (var assistArray_1 = __values(assistArray), assistArray_1_1 = assistArray_1.next(); !assistArray_1_1.done; assistArray_1_1 = assistArray_1.next()) {\n                    var optKeys = assistArray_1_1.value;\n                    if (this.assistMatchMethod(optKeys, event)) {\n                        return true;\n                    }\n                }\n            }\n            catch (e_3_1) { e_3 = { error: e_3_1 }; }\n            finally {\n                try {\n                    if (assistArray_1_1 && !assistArray_1_1.done && (_a = assistArray_1.return)) _a.call(assistArray_1);\n                }\n                finally { if (e_3) throw e_3.error; }\n            }\n            return false;\n        }\n        else {\n            return this.assistMatchMethod(keySet, event);\n        }\n    };\n    /**\n     * 判断辅助键是否匹配\n     * @param key\n     * @param event\n     */\n    ShortCut.prototype.assistMatchMethod = function (key, event) {\n        var ctrl = key.ctrl, meta = key.meta, shift = key.shift, alt = key.alt;\n        var metaKey = event.metaKey, ctrlKey = event.ctrlKey, shiftKey = event.shiftKey, altKey = event.altKey;\n        return (!!ctrl === ctrlKey &&\n            !!meta === metaKey &&\n            !!shift === shiftKey &&\n            !!alt === altKey);\n    };\n    ShortCut.id = 0;\n    // 单例\n    ShortCut.instance = new ShortCut();\n    return ShortCut;\n}());\nvar shortCut = new ShortCut({ duration: \"fast\" });\nexports.shortCut = shortCut;\nwindow.shortCut = shortCut;\nexports.default = ShortCut;\n\n\n//# sourceURL=webpack://short-cut/./src/index.ts?");

/***/ }),

/***/ "./src/render.ts":
/*!***********************!*\
  !*** ./src/render.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __values = (this && this.__values) || function(o) {\n    var s = typeof Symbol === \"function\" && Symbol.iterator, m = s && o[s], i = 0;\n    if (m) return m.call(o);\n    if (o && typeof o.length === \"number\") return {\n        next: function () {\n            if (o && i >= o.length) o = void 0;\n            return { value: o && o[i++], done: !o };\n        }\n    };\n    throw new TypeError(s ? \"Object is not iterable.\" : \"Symbol.iterator is not defined.\");\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar index_1 = __webpack_require__(/*! ./index */ \"./src/index.ts\");\nvar utils_1 = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\nvar Render = /** @class */ (function () {\n    function Render() {\n        this.initThumb();\n        this.initInstruction();\n    }\n    // 显示按键提示\n    Render.prototype.show = function (contents, duration) {\n        var _this = this;\n        // 立即清除定时器，并将状态重置为 hide\n        this.timeout && clearTimeout(this.timeout);\n        this.dom.classList.remove(\"show\");\n        setTimeout(function () {\n            _this.dom.innerHTML = contents;\n            _this.dom.classList.add(\"show\");\n        }, 100);\n        this.timeout = setTimeout(function () {\n            _this.dom.classList.remove(\"show\");\n        }, index_1.durationMap[duration]);\n    };\n    /**\n     * 初始化缩略提示\n     */\n    Render.prototype.initThumb = function () {\n        this.dom = window.document.createElement(\"div\");\n        this.dom.innerHTML = \"\";\n        window.document.body.appendChild(this.dom);\n        this.dom.classList.add(\"short-cut\");\n    };\n    /**\n     * 初始化快捷键菜单\n     */\n    Render.prototype.initInstruction = function () {\n        var _this = this;\n        this.instructionDom = window.document.createElement(\"div\");\n        this.instructionDom.innerHTML = \"<div class='sc-block'></div>\";\n        window.document.body.appendChild(this.instructionDom);\n        this.instructionDom.classList.add(\"sc-instruction\");\n        this.instructionDom.addEventListener(\"click\", function (event) {\n            if (event.target.classList.contains(\"sc-instruction\")) {\n                _this.instructionDom.classList.remove(\"show\");\n            }\n        });\n    };\n    Render.prototype.showIns = function (kvMap) {\n        var data = this.genInstructorData(kvMap);\n        var blockDom = document.querySelector(\".sc-block\");\n        this.instructionDom.classList.add(\"show\");\n        var innerHtml = data\n            .map(function (command) {\n            var keys = command.keys, content = command.content;\n            var keysStr = (Array.isArray(keys[0])\n                ? keys\n                    .map(function (item) { return item.join(\" + \"); })\n                    .join(\" | \")\n                : keys.join(\" + \")).trim();\n            if (!keysStr)\n                return \"\";\n            return \"<div class=\\\"sc-record\\\"><div class=\\\"sc-record-content\\\">\" + content + \"</div>: <div class=\\\"sc-record-keys\\\"> \" + keysStr + \" </div> </div>\";\n        })\n            .join(\"\");\n        blockDom.innerHTML = innerHtml;\n    };\n    /**\n     * 全量转化，后续考虑每增加一个，就生成一次说明\n     * 将快捷键相关配置转为说明\n     */\n    Render.prototype.genInstructorData = function (kvMap) {\n        var e_1, _a;\n        var _this = this;\n        var arr = [];\n        var _loop_1 = function (keySet) {\n            var content = keySet.content, assistArray = keySet.assistArray;\n            var obj = { content: content, keys: [] };\n            if (!content) {\n                return \"continue\";\n            }\n            var keyStr = utils_1.getKeyLetter(keySet).toUpperCase();\n            if (assistArray) {\n                if (assistArray.length > 1) {\n                    obj.keys = assistArray.map(function (assist) {\n                        return _this.genAssistKeys(assist).concat([keyStr]);\n                    });\n                }\n                else if (assistArray.length === 0) {\n                    obj.keys = this_1.genAssistKeys(assistArray[0]).concat([keyStr]);\n                }\n            }\n            else {\n                obj.keys = this_1.genAssistKeys(keySet).concat([keyStr]);\n            }\n            arr.push(obj);\n        };\n        var this_1 = this;\n        try {\n            for (var _b = __values(kvMap.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {\n                var keySet = _c.value;\n                _loop_1(keySet);\n            }\n        }\n        catch (e_1_1) { e_1 = { error: e_1_1 }; }\n        finally {\n            try {\n                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);\n            }\n            finally { if (e_1) throw e_1.error; }\n        }\n        return arr;\n    };\n    Render.prototype.genAssistKeys = function (config) {\n        var ctrl = config.ctrl, meta = config.meta, shift = config.shift, alt = config.alt, caps = config.caps;\n        var keys = [];\n        if (ctrl) {\n            keys.push(\"Ctrl\");\n        }\n        if (meta) {\n            keys.push(utils_1.detectOS() === \"Mac\" ? \"Command\" : \"Win\");\n        }\n        if (shift) {\n            keys.push(\"Shift\");\n        }\n        if (alt) {\n            keys.push(\"Alt\");\n        }\n        if (caps) {\n            keys.push(\"Caps\");\n        }\n        return keys;\n    };\n    return Render;\n}());\nvar render = new Render();\nexports.default = render;\n\n\n//# sourceURL=webpack://short-cut/./src/render.ts?");

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.detectOS = exports.getKeyLetter = void 0;\n/**\n * 获取按键字母（声明时有可能传 code）\n */\nfunction getKeyLetter(keySet) {\n    var key = keySet.key, code = keySet.code;\n    if (key) {\n        return key;\n    }\n    if (code) {\n        if (code === 127 /* DELETE */ || code === 8 /* BACKSPACE */) {\n            return \"Delete\";\n        }\n        return String.fromCharCode(code);\n    }\n    return \"\";\n}\nexports.getKeyLetter = getKeyLetter;\n/**\n * 检测 OS\n */\nfunction detectOS() {\n    var sUserAgent = navigator.userAgent;\n    var isWin = navigator.platform == \"Win32\" || navigator.platform == \"Windows\";\n    var isMac = navigator.platform == \"Mac68K\" ||\n        navigator.platform == \"MacPPC\" ||\n        navigator.platform == \"Macintosh\" ||\n        navigator.platform == \"MacIntel\";\n    if (isMac)\n        return \"Mac\";\n    var isUnix = navigator.platform == \"X11\" && !isWin && !isMac;\n    if (isUnix)\n        return \"Unix\";\n    var isLinux = String(navigator.platform).indexOf(\"Linux\") > -1;\n    if (isLinux)\n        return \"Linux\";\n    if (isWin) {\n        var isWin2K = sUserAgent.indexOf(\"Windows NT 5.0\") > -1 ||\n            sUserAgent.indexOf(\"Windows 2000\") > -1;\n        if (isWin2K)\n            return \"Win2000\";\n        var isWinXP = sUserAgent.indexOf(\"Windows NT 5.1\") > -1 ||\n            sUserAgent.indexOf(\"Windows XP\") > -1;\n        if (isWinXP)\n            return \"WinXP\";\n        var isWin2003 = sUserAgent.indexOf(\"Windows NT 5.2\") > -1 ||\n            sUserAgent.indexOf(\"Windows 2003\") > -1;\n        if (isWin2003)\n            return \"Win2003\";\n        var isWinVista = sUserAgent.indexOf(\"Windows NT 6.0\") > -1 ||\n            sUserAgent.indexOf(\"Windows Vista\") > -1;\n        if (isWinVista)\n            return \"WinVista\";\n        var isWin7 = sUserAgent.indexOf(\"Windows NT 6.1\") > -1 ||\n            sUserAgent.indexOf(\"Windows 7\") > -1;\n        if (isWin7)\n            return \"Win7\";\n    }\n    return \"other\";\n}\nexports.detectOS = detectOS;\n\n\n//# sourceURL=webpack://short-cut/./src/utils.ts?");

/***/ }),

/***/ "./src/style/index.scss":
/*!******************************!*\
  !*** ./src/style/index.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://short-cut/./src/style/index.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/index.ts");
/******/ })()
;
});