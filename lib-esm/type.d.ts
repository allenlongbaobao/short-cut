export interface KeyData {
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
  win?: boolean;
  caps?: boolean;
  tab?: boolean;
  space?: boolean;
  key: string;
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
