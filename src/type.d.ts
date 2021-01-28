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
  assistArray?: [];
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
