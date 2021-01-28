import { IOption, KeyData } from "./type";
import "./style/index.scss";
declare class ShortCut {
    static id: number;
    static instance: ShortCut;
    private render;
    private kvDownMap;
    private kvUpMap;
    private keyValueMap;
    private option;
    /**
     * 构造器传入参数
     * 1. container 提示所在的 container，默认是 fixed 布局，如果传入了 container，那么就会绝对布局，
     * 2. pos: topLeft | topRight | bottomLeft | bottomRight 默认左下角
     *
     * @param param0
     */
    constructor(o?: IOption);
    /**
     * 增加了监听事件
     * @param keyData
     * @param fn
     * @param preventDefault 是否阻止默认行为，默认不阻止
     */
    on(keyData: KeyData, keyDownFn: () => void, keyUpFn?: () => void): void;
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
     * 获取按键字母（声明时有可能传 code）
     */
    private getKeyLetter;
}
export default ShortCut;
//# sourceMappingURL=index.d.ts.map