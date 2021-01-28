import { AssistKey, KeyData, MapType } from "./type";
import { getKeyLetter, detectOS } from "./utils";

class Render {
  private dom: HTMLDivElement;
  private instructionDom: HTMLDivElement;
  private timeout: any;
  constructor() {
    this.initThumb();
    this.initInstruction();
  }

  // 显示按键提示
  public show(contents: string) {
    // 立即清除定时器，并将状态重置为 hide
    this.timeout && clearTimeout(this.timeout);
    this.dom.classList.remove("show");

    setTimeout(() => {
      this.dom.innerHTML = contents;
      this.dom.classList.add("show");
    }, 100);

    this.timeout = setTimeout(() => {
      this.dom.classList.remove("show");
    }, 2000);
  }

  /**
   * 初始化缩略提示
   */
  private initThumb() {
    this.dom = window.document.createElement("div");
    this.dom.innerHTML = "";
    window.document.body.appendChild(this.dom);
    this.dom.classList.add("short-cut");
  }

  /**
   * 初始化快捷键菜单
   */
  private initInstruction() {
    this.instructionDom = window.document.createElement("div");
    this.instructionDom.innerHTML = "<div class='sc-block'></div>";
    window.document.body.appendChild(this.instructionDom);
    this.instructionDom.classList.add("sc-instruction");
    this.instructionDom.addEventListener("click", () => {
      this.instructionDom.classList.remove("show");
    });
  }

  public showIns(kvMap: MapType) {
    const data = this.genInstructorData(kvMap);
    const blockDom = document.querySelector(".sc-block");
    this.instructionDom.classList.add("show");
    const innerHtml = data
      .map((command) => {
        const { keys, content } = command;
        return `<div class="sc-record"><div class="sc-record-content">${content}</div>: <div class="sc-record-keys"> ${
          Array.isArray(keys[0])
            ? (keys as string[][])
                .map((item: string[]) => item.join(" + "))
                .join(" | ")
            : keys.join(" + ")
        } </div> </div>`;
      })
      .join("");

    blockDom.innerHTML = innerHtml;
  }

  /**
   * 全量转化，后续考虑每增加一个，就生成一次说明
   * 将快捷键相关配置转为说明
   */
  public genInstructorData(kvMap: MapType) {
    const arr = [];
    for (let keySet of kvMap.keys()) {
      const { content = "未命名", assistArray } = keySet;
      const obj: {
        content: string;
        keys: string[] | string[][];
      } = { content, keys: [] };
      const keyStr = getKeyLetter(keySet).toUpperCase();
      if (assistArray) {
        if (assistArray.length > 1) {
          obj.keys = assistArray.map((assist) =>
            this.genAssistKeys(assist).concat([keyStr])
          );
        } else if (assistArray.length === 0) {
          obj.keys = this.genAssistKeys(assistArray[0]).concat([keyStr]);
        }
      } else {
        obj.keys = this.genAssistKeys(keySet).concat([keyStr]);
      }
      arr.push(obj);
    }
    console.log(arr);
    return arr;
  }
  private genAssistKeys(config: AssistKey) {
    const { ctrl, meta, shift, alt, caps } = config;
    const keys = [];
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
  }
}

const render = new Render();
export default render;
