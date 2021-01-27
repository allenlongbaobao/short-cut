import { IOption, KeyData } from './type';
import './style/index.scss';
declare class ShortCut {
    static id: number;
    static instance: ShortCut;
    private render;
    private kvMap;
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
    on(keyData: KeyData, fn: () => void, preventDefault?: boolean): void;
    private handler;
    private getContent;
    /**
     * 判断 传入的 keyData 是否已经存在，如果存在，则返回已存在的 keyData
     * 不存在, 则返回传入的 keyData
     * @param keyData
     */
    private checkKeyExist;
}
export default ShortCut;
//# sourceMappingURL=index.d.ts.map