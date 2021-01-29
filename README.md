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
 
  ## ES6 项目中使用
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

  * 主键 支持 key 和 code 两种键声明方式

  ```js
    shortCutting.on({
      key: 'a',
    }, () => {
      console.log('a is clicked')
    })

    shortCutting.on({
      code: 65
    }, () => {
      console.log('a is clicked')
    })
  ```

  * 支持 >=1 个辅助键，当前支持 `ctrl`, `command/win`, `alt`, `shift`

  ```js
    shortCut.on({
      code: 65,
      content: '全选',
      ctrl: true,
      shift: true,
    }, () => {
      console.log('a')
    } )
  ```

  * 支持多种组合键，如果你想使用多套快捷键对应一种行为，比如 ctrl + c, command + c 都表示复制当前内容，那么可以使用 assistArray 数组来表示

  ```js
    shortCut.on({
      content: '复制',
      assistArray: [{ctrl: true}, { meta: true}],
      showTip: true,
    }, () => {
      console.log('c')
    })
  ```
  注意：assistArray 的优先级高于 key 和 code

  * 支持 keyUp 事件
    第三个可选参数表示 keyUp 的回调函数


  调起快捷键一览，用于展示所有支持的快捷键


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

