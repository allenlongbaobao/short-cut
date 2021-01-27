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
  preventDefault: boolean
}
