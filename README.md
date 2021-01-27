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


