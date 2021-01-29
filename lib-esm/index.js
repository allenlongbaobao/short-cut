var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { getKeyLetter } from "./utils";
import render from "./render";
import "./style/index.scss";
var ShortCut = /** @class */ (function () {
    /**
     * 构造器传入参数
     * 1. container 提示所在的 container，默认是 fixed 布局，如果传入了 container，那么就会绝对布局，
     * 2. pos: topLeft | topRight | bottomLeft | bottomRight 默认左下角
     *
     * @param param0
     */
    function ShortCut(o) {
        var _this = this;
        this.render = render;
        this.kvDownMap = new Map();
        this.kvUpMap = new Map();
        this.keyValueMap = {
            DELETE: 127,
            ENTER: 13,
            BACKSPACE: 8,
            CTRL: 17,
            ALT: 18,
            SPACE: 32,
        };
        this.option = {
            preventDefault: true,
        };
        // 设置会覆盖
        if (o) {
            this.option = o;
        }
        // 确保全局唯一
        if (ShortCut.instance) {
            return ShortCut.instance;
        }
        // 离开页面提示
        window.onbeforeunload = function (event) {
            event.preventDefault();
            event.returnValue = "";
        };
        document.addEventListener("keydown", function (event) {
            _this.handlerKeyUpOrDown(event, _this.kvDownMap);
        });
        document.addEventListener("keyup", function (event) {
            _this.handlerKeyUpOrDown(event, _this.kvUpMap, false);
        });
        ShortCut.id++;
    }
    /**
     * 增加了监听事件
     * @param keyData
     * @param fn
     * @param preventDefault 是否阻止默认行为，默认不阻止
     */
    ShortCut.prototype.on = function (keyData, keyDownFn, keyUpFn) {
        // 做一次键重复性判断
        this.kvDownMap.set(this.checkKeyExist(keyData, this.kvDownMap), keyDownFn);
        if (keyUpFn) {
            this.kvUpMap.set(this.checkKeyExist(keyData, this.kvUpMap), keyUpFn);
        }
    };
    /**
     * 展示快捷键说明
     */
    ShortCut.prototype.showInstruction = function () {
        this.render.showIns(this.kvDownMap);
    };
    ShortCut.prototype.handlerKeyUpOrDown = function (event, map, showContent) {
        var e_1, _a;
        if (showContent === void 0) { showContent = true; }
        var keySets = map.keys();
        var preventDefault = this.option.preventDefault;
        try {
            for (var keySets_1 = __values(keySets), keySets_1_1 = keySets_1.next(); !keySets_1_1.done; keySets_1_1 = keySets_1.next()) {
                var keySet = keySets_1_1.value;
                var _b = keySet.showTip, showTip = _b === void 0 ? true : _b;
                if (this.checkKeyMatch(event.keyCode, keySet)) {
                    if (!this.checkAssistKeyMatch(keySet, event)) {
                        return;
                    }
                    if (preventDefault) {
                        event.preventDefault();
                    }
                    var fn = map.get(keySet);
                    if (showContent && showTip) {
                        this.render.show(this.getContent(keySet, event));
                    }
                    fn && fn();
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (keySets_1_1 && !keySets_1_1.done && (_a = keySets_1.return)) _a.call(keySets_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    ShortCut.prototype.getContent = function (keyData, event) {
        var _this = this;
        var _a = keyData.content, content = _a === void 0 ? "" : _a, assistArray = keyData.assistArray;
        var prefix = "";
        if (assistArray) {
            var assist = assistArray.find(function (a) { return _this.assistMatchMethod(a, event); });
            prefix = this.render.genAssistKeys(assist).join(" + ");
        }
        else {
            prefix = this.render.genAssistKeys(keyData).join(" + ");
        }
        return (!!prefix ? prefix + " + " : "") + " " + getKeyLetter(keyData) + " " + content;
    };
    /**
     * 判断 传入的 keyData 是否已经存在，如果存在，则返回已存在的 keyData
     * 不存在, 则返回传入的 keyData
     * @param keyData
     */
    ShortCut.prototype.checkKeyExist = function (keyData, map) {
        var e_2, _a;
        try {
            // 每个属性对比是否一致
            for (var _b = __values(map.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var keySet = _c.value;
                var key = keySet.key, alt = keySet.alt, ctrl = keySet.ctrl, shift = keySet.shift, code = keySet.code, content = keySet.content;
                if (code !== keyData.code ||
                    key !== keyData.key ||
                    alt !== keyData.alt ||
                    ctrl !== keyData.ctrl ||
                    shift !== keyData.shift ||
                    content !== keyData.content) {
                    continue;
                }
                return keySet;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return keyData;
    };
    /**
     * 判断按键 和 约束的条件是否匹配，不包括辅助功能键, 支持 键盘字母和 code 两个约束
     */
    ShortCut.prototype.checkKeyMatch = function (keyCode, keySet) {
        var key = keySet.key, code = keySet.code;
        if (key) {
            return keyCode === key.toUpperCase().charCodeAt(0);
        }
        return keyCode === code;
    };
    /**
     * 判断辅助键是否匹配
     * @param keySet
     */
    ShortCut.prototype.checkAssistKeyMatch = function (keySet, event) {
        var e_3, _a;
        var assistArray = keySet.assistArray;
        // 有辅助键的情况，会忽略其他的键的支持
        if (assistArray && assistArray.length) {
            try {
                // 数值中配置了多个方案，只要有一个方案匹配上就可以返回 true
                for (var assistArray_1 = __values(assistArray), assistArray_1_1 = assistArray_1.next(); !assistArray_1_1.done; assistArray_1_1 = assistArray_1.next()) {
                    var optKeys = assistArray_1_1.value;
                    if (this.assistMatchMethod(optKeys, event)) {
                        return true;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (assistArray_1_1 && !assistArray_1_1.done && (_a = assistArray_1.return)) _a.call(assistArray_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return false;
        }
        else {
            return this.assistMatchMethod(keySet, event);
        }
    };
    /**
     * 判断辅助键是否匹配
     * @param key
     * @param event
     */
    ShortCut.prototype.assistMatchMethod = function (key, event) {
        var ctrl = key.ctrl, meta = key.meta, shift = key.shift, alt = key.alt;
        var metaKey = event.metaKey, ctrlKey = event.ctrlKey, shiftKey = event.shiftKey, altKey = event.altKey;
        return (!!ctrl === ctrlKey &&
            !!meta === metaKey &&
            !!shift === shiftKey &&
            !!alt === altKey);
    };
    ShortCut.id = 0;
    ShortCut.instance = new ShortCut();
    return ShortCut;
}());
var shortCut = new ShortCut();
window.shortCut = shortCut;
export { shortCut };
export default ShortCut;
export * from "./type.d";
