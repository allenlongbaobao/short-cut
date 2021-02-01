import { AssistKey, Duration, MapType } from "./index";
declare class Render {
    private dom;
    private instructionDom;
    private timeout;
    constructor();
    show(contents: string, duration: Duration): void;
    /**
     * 初始化缩略提示
     */
    private initThumb;
    /**
     * 初始化快捷键菜单
     */
    private initInstruction;
    showIns(kvMap: MapType): void;
    /**
     * 全量转化，后续考虑每增加一个，就生成一次说明
     * 将快捷键相关配置转为说明
     */
    genInstructorData(kvMap: MapType): {
        content: string;
        keys: string[] | string[][];
    }[];
    genAssistKeys(config: AssistKey): string[];
}
declare const render: Render;
export default render;
//# sourceMappingURL=render.d.ts.map