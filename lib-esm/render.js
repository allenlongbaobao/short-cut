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
import { getKeyLetter, detectOS } from "./utils";
var Render = /** @class */ (function () {
    function Render() {
        this.initThumb();
        this.initInstruction();
    }
    // 显示按键提示
    Render.prototype.show = function (contents) {
        var _this = this;
        // 立即清除定时器，并将状态重置为 hide
        this.timeout && clearTimeout(this.timeout);
        this.dom.classList.remove("show");
        setTimeout(function () {
            _this.dom.innerHTML = contents;
            _this.dom.classList.add("show");
        }, 100);
        this.timeout = setTimeout(function () {
            _this.dom.classList.remove("show");
        }, 2000);
    };
    /**
     * 初始化缩略提示
     */
    Render.prototype.initThumb = function () {
        this.dom = window.document.createElement("div");
        this.dom.innerHTML = "";
        window.document.body.appendChild(this.dom);
        this.dom.classList.add("short-cut");
    };
    /**
     * 初始化快捷键菜单
     */
    Render.prototype.initInstruction = function () {
        var _this = this;
        this.instructionDom = window.document.createElement("div");
        this.instructionDom.innerHTML = "<div class='sc-block'></div>";
        window.document.body.appendChild(this.instructionDom);
        this.instructionDom.classList.add("sc-instruction");
        this.instructionDom.addEventListener("click", function (event) {
            if (event.target.classList.contains("sc-instruction")) {
                _this.instructionDom.classList.remove("show");
            }
        });
    };
    Render.prototype.showIns = function (kvMap) {
        var data = this.genInstructorData(kvMap);
        var blockDom = document.querySelector(".sc-block");
        this.instructionDom.classList.add("show");
        var innerHtml = data
            .map(function (command) {
            var keys = command.keys, content = command.content;
            var keysStr = (Array.isArray(keys[0])
                ? keys
                    .map(function (item) { return item.join(" + "); })
                    .join(" | ")
                : keys.join(" + ")).trim();
            if (!keysStr)
                return "";
            return "<div class=\"sc-record\"><div class=\"sc-record-content\">" + content + "</div>: <div class=\"sc-record-keys\"> " + keysStr + " </div> </div>";
        })
            .join("");
        blockDom.innerHTML = innerHtml;
    };
    /**
     * 全量转化，后续考虑每增加一个，就生成一次说明
     * 将快捷键相关配置转为说明
     */
    Render.prototype.genInstructorData = function (kvMap) {
        var e_1, _a;
        var _this = this;
        var arr = [];
        var _loop_1 = function (keySet) {
            var content = keySet.content, assistArray = keySet.assistArray;
            var obj = { content: content, keys: [] };
            if (!content) {
                return "continue";
            }
            var keyStr = getKeyLetter(keySet).toUpperCase();
            if (assistArray) {
                if (assistArray.length > 1) {
                    obj.keys = assistArray.map(function (assist) {
                        return _this.genAssistKeys(assist).concat([keyStr]);
                    });
                }
                else if (assistArray.length === 0) {
                    obj.keys = this_1.genAssistKeys(assistArray[0]).concat([keyStr]);
                }
            }
            else {
                obj.keys = this_1.genAssistKeys(keySet).concat([keyStr]);
            }
            arr.push(obj);
        };
        var this_1 = this;
        try {
            for (var _b = __values(kvMap.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var keySet = _c.value;
                _loop_1(keySet);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return arr;
    };
    Render.prototype.genAssistKeys = function (config) {
        var ctrl = config.ctrl, meta = config.meta, shift = config.shift, alt = config.alt, caps = config.caps;
        var keys = [];
        if (ctrl) {
            keys.push("Ctrl");
        }
        if (meta) {
            keys.push(detectOS() === "Mac" ? "Command" : "Win");
        }
        if (shift) {
            keys.push("Shift");
        }
        if (alt) {
            keys.push("Alt");
        }
        if (caps) {
            keys.push("Caps");
        }
        return keys;
    };
    return Render;
}());
var render = new Render();
export default render;
