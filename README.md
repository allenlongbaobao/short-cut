<div align=center>
  <img  src="./logo.png" />
</div>

# Short-cutting 快捷键事件统一解决方案

## 安装
  `yarn add short-cutting`

  or

  `npm i short-cutting`

  内置了 Typescript 支持

## 使用
 
  ES6 引入
  ```js
    import { ShortCutting } from 'short-cutting/lib-esm'
    // 引入样式文件
    import 'short-cutting/index.css'

    // 最简使用
    const shortCutting = new ShortCutting()
    shortCutting.on({
      key: 'a',
    }, () => {
      console.log('a is clicked')
    })
  ```

  调起快捷键一览

  ```js
    shortCutting.showInstruction()
  ```

  当前支持的辅助键：
  
  * ctrl
  * meta (win | command)
  * shift
  * alt

@TODO 功能点:

- [x] 1. 支持可选键，比如复制，可以使用 ctrl + c，也可以支持 command + c   
- [x] 2. 支持快捷键一览表，暴露方法调用  
- [ ] 3. 支持多种主题  
- [ ] 4. 支持八个方向的位置自定义(默认左下)  
- [x] 5. 支持 onbeforeunload 事件劫持  
- [ ] 6. 支持自定义的闪烁时间  
- [ ] 7. 抽离单独的 type.d.ts 包
- [ ] 8. 支持 CDN 加载

