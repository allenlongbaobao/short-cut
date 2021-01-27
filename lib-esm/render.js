var Render = /** @class */ (function () {
    function Render() {
        this.dom = window.document.createElement('div');
        this.dom.innerHTML = '';
        window.document.body.appendChild(this.dom);
        this.init();
    }
    // 显示按键提示
    Render.prototype.show = function (contents) {
        var _this = this;
        // 立即清除定时器，并将状态重置为 hide
        this.timeout && clearTimeout(this.timeout);
        this.dom.classList.remove('show');
        setTimeout(function () {
            _this.dom.innerHTML = contents;
            _this.dom.classList.add('show');
        }, 100);
        this.timeout = setTimeout(function () {
            _this.dom.classList.remove('show');
        }, 2000);
    };
    Render.prototype.init = function () {
        this.dom.classList.add('short-cut');
    };
    return Render;
}());
var render = new Render();
export default render;
