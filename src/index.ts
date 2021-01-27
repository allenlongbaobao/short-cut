import { Keyboard, KeyData } from './type';
import render from './render';
import './style/index.scss';
class ShortCut {
  public static id = 0;
  public static instance: ShortCut = new ShortCut();

  private render = render;

  private kvMap: Map<KeyData, () => void> = new Map();
  private keyValueMap: { [key: string]: number } = {
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

  /**
   * 构造器传入参数
   * 1. container 提示所在的 container，默认是 fixed 布局，如果传入了 container，那么就会绝对布局，
   * 2. pos: topLeft | topRight | bottomLeft | bottomRight 默认左下角
   *
   * @param param0
   */
  constructor({} = {}) {
    // 确保全局唯一
    if (ShortCut.instance) {
      return ShortCut.instance;
    }
    document.addEventListener('keydown', (event) => {
      this.handler(event);
    });
    ShortCut.id++;
  }

  /**
   * 增加了监听事件
   * @param keyData
   * @param fn
   */
  public on(keyData: KeyData, fn: () => void) {
    // 做一次键重复性判断
    this.kvMap.set(this.checkKeyExist(keyData), fn);
    console.log('kvMap', this.kvMap);
  }

  private handler(event: KeyboardEvent) {
    const keySets = this.kvMap.keys();
    const { metaKey, ctrlKey, shiftKey } = event;

    for (let keySet of keySets) {
      const { key, ctrl, meta, shift } = keySet;
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
        const fn = this.kvMap.get(keySet);
        this.render.show(this.getContent(keySet));
        fn();
      }
    }
  }
  private getContent(keyData: KeyData): string {
    // TODO:
    const { key, meta, ctrl, shift } = keyData;
    return `${ctrl ? 'Ctrl + ' : ''}${meta ? 'command + ' : ''}${shift ? 'Shift + ' : ''}${key}`;
  }

  /**
   * 判断 传入的 keyData 是否已经存在，如果存在，则返回已存在的 keyData
   * 不存在, 则返回传入的 keyData
   * @param keyData
   */
  private checkKeyExist(keyData: KeyData): KeyData {
    // 每个属性对比是否一致
    for (let keySet of this.kvMap.keys()) {
      const { key, alt, ctrl, shift } = keySet;
      if (
        key !== keyData.key ||
        alt !== keyData.alt ||
        ctrl !== keyData.ctrl ||
        shift !== keyData.shift
      ) {
        continue;
      }
      return keySet;
    }
    return keyData;
  }
}
(window as any).shortCut = new ShortCut();

export default ShortCut;
