import { KeyData } from "./type";
/**
 * 获取按键字母（声明时有可能传 code）
 */
export declare function getKeyLetter(keySet: KeyData): string;
/**
 * 检测 OS
 */
export declare function detectOS(): "Mac" | "Unix" | "Linux" | "Win2000" | "WinXP" | "Win2003" | "WinVista" | "Win7" | "other";
