class Render {
  private dom: HTMLDivElement;
  private timeout: any;
  constructor() {
    this.dom = window.document.createElement('div');
    this.dom.innerHTML = '';
    window.document.body.appendChild(this.dom);
    this.init();
  }

  // 显示按键提示
  public show(contents: string) {
    // 立即清除定时器，并将状态重置为 hide
    this.timeout && clearTimeout(this.timeout);
    this.dom.classList.remove('show');

    setTimeout(() => {
      this.dom.innerHTML = contents;
      this.dom.classList.add('show');
    }, 100);

    this.timeout = setTimeout(() => {
      this.dom.classList.remove('show');
    }, 2000);
  }

  private init() {
    this.dom.classList.add('short-cut');
  }
}

const render = new Render();
export default render;
