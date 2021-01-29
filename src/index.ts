import { getKeyLetter } from "./utils";
import render from "./render";
import "./style/index.scss";
export interface KeyData {
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
  win?: boolean;
  caps?: boolean;
  tab?: boolean;
  space?: boolean;
  /**
   * 键盘按键对应的 ASCII 码
   */
  code?: Keyboard;
  /**
   * 键盘按键名称
   */
  key?: string;
  /**
   * 事件名称
   */
  content: string;
  /**
   * 是否展示按键提醒，默认展示，如需关闭，请手动传入 false
   */
  showTip?: boolean;
  /**
   * 辅助键数组，当需要多个辅助键时推荐使用，比如 复制，需要支持 ctrl + c 或者 command + c
   * 需要注意的是，assistArray 的优先级最高，会覆盖其他的辅助键设置
   */
  assistArray?: AssistKey[];
}
export interface AssistKey {
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
  win?: boolean;
  caps?: boolean;
  tab?: boolean;
  space?: boolean;
}
export const enum Keyboard {
  DELETE = 127,
  ENTER = 13,
  BACKSPACE = 8,
  CTRL = 17,
  ALT = 18,
  SPACE = 32,
  a = 65,
  c = 67,
  s = 83,
  v = 86,
  Z = 90,
  Y = 89,
}

export interface IOption {
  /**
   * 默认为 true
   */
  preventDefault: boolean;
}

export type MapType = Map<KeyData, () => void>;

class ShortCut {
  public static id = 0;
  public static instance: ShortCut = new ShortCut();

  private render = render;

  private kvDownMap: MapType = new Map();
  private kvUpMap: MapType = new Map();
  private keyValueMap: { [key: string]: number } = {
    DELETE: 127,
    ENTER: 13,
    BACKSPACE: 8,
    CTRL: 17,
    ALT: 18,
    SPACE: 32,
  };
  private option: IOption = {
    preventDefault: true,
  };

  /**
   * 构造器传入参数
   * 1. container 提示所在的 container，默认是 fixed 布局，如果传入了 container，那么就会绝对布局，
   * 2. pos: topLeft | topRight | bottomLeft | bottomRight 默认左下角
   *
   * @param param0
   */
  constructor(o?: IOption) {
    // 设置会覆盖
    if (o) {
      this.option = o;
    }

    // 确保全局唯一
    if (ShortCut.instance) {
      return ShortCut.instance;
    }

    // 离开页面提示
    window.onbeforeunload = (event: BeforeUnloadEvent) => {
      event.preventDefault();

      event.returnValue = "";
    };

    document.addEventListener("keydown", (event) => {
      this.handlerKeyUpOrDown(event, this.kvDownMap);
    });
    document.addEventListener("keyup", (event) => {
      this.handlerKeyUpOrDown(event, this.kvUpMap, false);
    });
    ShortCut.id++;
  }

  /**
   * 增加了监听事件
   * @param keyData
   * @param fn
   * @param preventDefault 是否阻止默认行为，默认不阻止
   */
  public on(keyData: KeyData, keyDownFn: () => void, keyUpFn?: () => void) {
    // 做一次键重复性判断
    this.kvDownMap.set(this.checkKeyExist(keyData, this.kvDownMap), keyDownFn);
    if (keyUpFn) {
      this.kvUpMap.set(this.checkKeyExist(keyData, this.kvUpMap), keyUpFn);
    }
  }

  /**
   * 展示快捷键说明
   */
  public showInstruction() {
    this.render.showIns(this.kvDownMap);
  }

  private handlerKeyUpOrDown(
    event: KeyboardEvent,
    map: MapType,
    showContent: boolean = true
  ): void {
    const keySets = map.keys();
    const { preventDefault } = this.option;

    for (let keySet of keySets) {
      const { showTip = true } = keySet;

      if (this.checkKeyMatch(event.keyCode, keySet)) {
        if (!this.checkAssistKeyMatch(keySet, event)) {
          return;
        }

        if (preventDefault) {
          event.preventDefault();
        }
        const fn = map.get(keySet);
        if (showContent && showTip) {
          this.render.show(this.getContent(keySet, event));
        }
        fn && fn();
      }
    }
  }
  private getContent(keyData: KeyData, event: KeyboardEvent): string {
    const { content = "", assistArray } = keyData;
    let prefix = "";
    if (assistArray) {
      const assist = assistArray.find((a) => this.assistMatchMethod(a, event));
      prefix = this.render.genAssistKeys(assist).join(" + ");
    } else {
      prefix = this.render.genAssistKeys(keyData).join(" + ");
    }

    return `${!!prefix ? prefix + " + " : ""} ${getKeyLetter(
      keyData
    )} ${content}`;
  }

  /**
   * 判断 传入的 keyData 是否已经存在，如果存在，则返回已存在的 keyData
   * 不存在, 则返回传入的 keyData
   * @param keyData
   */
  private checkKeyExist(keyData: KeyData, map: MapType): KeyData {
    // 每个属性对比是否一致
    for (let keySet of map.keys()) {
      const { key, alt, ctrl, shift, code, content } = keySet;
      if (
        code !== keyData.code ||
        key !== keyData.key ||
        alt !== keyData.alt ||
        ctrl !== keyData.ctrl ||
        shift !== keyData.shift ||
        content !== keyData.content
      ) {
        continue;
      }
      return keySet;
    }
    return keyData;
  }
  /**
   * 判断按键 和 约束的条件是否匹配，不包括辅助功能键, 支持 键盘字母和 code 两个约束
   */
  private checkKeyMatch(keyCode: number, keySet: KeyData): boolean {
    const { key, code } = keySet;
    if (key) {
      return keyCode === key.toUpperCase().charCodeAt(0);
    }
    return keyCode === code;
  }
  /**
   * 判断辅助键是否匹配
   * @param keySet
   */
  private checkAssistKeyMatch(keySet: KeyData, event: KeyboardEvent): boolean {
    const { assistArray } = keySet;
    // 有辅助键的情况，会忽略其他的键的支持
    if (assistArray && assistArray.length) {
      // 数值中配置了多个方案，只要有一个方案匹配上就可以返回 true
      for (let optKeys of assistArray) {
        if (this.assistMatchMethod(optKeys, event)) {
          return true;
        }
      }
      return false;
    } else {
      return this.assistMatchMethod(keySet, event);
    }
  }
  /**
   * 判断辅助键是否匹配
   * @param key
   * @param event
   */
  private assistMatchMethod(key: AssistKey, event: KeyboardEvent) {
    const { ctrl, meta, shift, alt } = key;
    const { metaKey, ctrlKey, shiftKey, altKey } = event;
    return (
      !!ctrl === ctrlKey &&
      !!meta === metaKey &&
      !!shift === shiftKey &&
      !!alt === altKey
    );
  }
}

const shortCut = new ShortCut();
(window as any).shortCut = shortCut;
export { shortCut };

export default ShortCut;
