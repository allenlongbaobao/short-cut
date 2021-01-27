"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var render_1 = require("./render");
require("./style/index.scss");
var ShortCut = /** @class */ (function () {
    /**
     * 构造器传入参数
     * 1. container 提示所在的 container，默认是 fixed 布局，如果传入了 container，那么就会绝对布局，
     * 2. pos: topLeft | topRight | bottomLeft | bottomRight 默认左下角
     *
     * @param param0
     */
    function ShortCut(_a) {
        var _this = this;
        _a = {};
        this.render = render_1.default;
        this.kvMap = new Map();
        this.keyValueMap = {
            DELETE: 127,
            ENTER: 13,
            BACKSPACE: 8,
            CTRL: 17,
            ALT: 18,
            SPACE: 32,
            a: 65,
            c: 67,
            s: 83,
            v: 86,
            y: 89,
            z: 90,
        };
        // 确保全局唯一
        if (ShortCut.instance) {
            return ShortCut.instance;
        }
        document.addEventListener('keydown', function (event) {
            _this.handler(event);
        });
        ShortCut.id++;
    }
    /**
     * 增加了监听事件
     * @param keyData
     * @param fn
     */
    ShortCut.prototype.on = function (keyData, fn) {
        // 做一次键重复性判断
        this.kvMap.set(this.checkKeyExist(keyData), fn);
        console.log('kvMap', this.kvMap);
    };
    ShortCut.prototype.handler = function (event) {
        var e_1, _a;
        var keySets = this.kvMap.keys();
        var metaKey = event.metaKey, ctrlKey = event.ctrlKey, shiftKey = event.shiftKey;
        try {
            for (var keySets_1 = __values(keySets), keySets_1_1 = keySets_1.next(); !keySets_1_1.done; keySets_1_1 = keySets_1.next()) {
                var keySet = keySets_1_1.value;
                var key = keySet.key, ctrl = keySet.ctrl, meta = keySet.meta, shift = keySet.shift;
                if (event.keyCode === this.keyValueMap[key]) {
                    // 辅助键严格相等
                    if (!!ctrl !== ctrlKey) {
                        return;
                    }
                    if (!!meta !== metaKey) {
                        return;
                    }
                    if (!!shift !== shiftKey) {
                        return;
                    }
                    event.preventDefault();
                    var fn = this.kvMap.get(keySet);
                    this.render.show(this.getContent(keySet));
                    fn();
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
    ShortCut.prototype.getContent = function (keyData) {
        // TODO:
        var key = keyData.key, meta = keyData.meta, ctrl = keyData.ctrl, shift = keyData.shift;
        return "" + (ctrl ? 'Ctrl + ' : '') + (meta ? 'command + ' : '') + (shift ? 'Shift + ' : '') + key;
    };
    /**
     * 判断 传入的 keyData 是否已经存在，如果存在，则返回已存在的 keyData
     * 不存在, 则返回传入的 keyData
     * @param keyData
     */
    ShortCut.prototype.checkKeyExist = function (keyData) {
        var e_2, _a;
        try {
            // 每个属性对比是否一致
            for (var _b = __values(this.kvMap.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var keySet = _c.value;
                var key = keySet.key, alt = keySet.alt, ctrl = keySet.ctrl, shift = keySet.shift;
                if (key !== keyData.key ||
                    alt !== keyData.alt ||
                    ctrl !== keyData.ctrl ||
                    shift !== keyData.shift) {
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
    ShortCut.id = 0;
    ShortCut.instance = new ShortCut();
    return ShortCut;
}());
window.shortCut = new ShortCut();
exports.default = ShortCut;
