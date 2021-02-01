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
export declare const enum Keyboard {
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
    Y = 89
}
export declare type Duration = "fast" | "medium" | "slow";
export declare const durationMap: {
    fast: number;
    medium: number;
    slow: number;
};
export interface IOption {
    /**
     * 默认为 true
     */
    preventDefault?: boolean;
    duration?: Duration;
}
export declare type MapType = Map<KeyData, () => void>;
declare class ShortCut {
    static id: number;
    static instance: ShortCut;
    private render;
    private kvDownMap;
    private kvUpMap;
    private option;
    /**
     * 构造器传入参数
     * 1. container 提示所在的 container，默认是 fixed 布局，如果传入了 container，那么就会绝对布局，
     * 2. pos: topLeft | topRight | bottomLeft | bottomRight 默认左下角
     *
     * @param param0
     */
    constructor(o?: IOption);
    setDuration(duration: Duration): void;
    /**
     * 增加了监听事件
     * @param keyData
     * @param fn
     * @param preventDefault 是否阻止默认行为，默认不阻止
     */
    on(keyData: KeyData, keyDownFn: () => void, keyUpFn?: () => void): void;
    /**
     * 展示快捷键说明
     */
    showInstruction(): void;
    private handlerKeyUpOrDown;
    private getContent;
    /**
     * 判断 传入的 keyData 是否已经存在，如果存在，则返回已存在的 keyData
     * 不存在, 则返回传入的 keyData
     * @param keyData
     */
    private checkKeyExist;
    /**
     * 判断按键 和 约束的条件是否匹配，不包括辅助功能键, 支持 键盘字母和 code 两个约束
     */
    private checkKeyMatch;
    /**
     * 判断辅助键是否匹配
     * @param keySet
     */
    private checkAssistKeyMatch;
    /**
     * 判断辅助键是否匹配
     * @param key
     * @param event
     */
    private assistMatchMethod;
}
declare const shortCut: ShortCut;
export { shortCut };
export default ShortCut;
