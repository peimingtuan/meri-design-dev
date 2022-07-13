# meri-design-dev：

## config
- 开发预览 `dev.js`
- 打包 `prod.js`
- 所有组件打包 `components.js`
- 单组件打包 `single.js`


## 安装
- `npm install -S meri-design-dev`

## 全局引入
```
    import MeriD from 'meri-design-dev';
    import 'meri-design-dev/dist/index.css'；
    
    Vue.use(MeriD);
```
- 安装依赖包   `npm i -D babel-plugin-component`
- 在 .babelrc中的plugins里添加
```json
    [
          "component",
          {
            "libraryName": "meri-design-dev",
            "camel2Dash": false,
            "libDir": "dist",
            "style": false
          }
    ]
```

## 按需引入
- 引入组件 `import { Button } from 'meri-design-dev'`
- 安装依赖包   `npm i -D babel-plugin-component`
- 在 .babelrc中的plugins里添加
```json
    [
          "component",
          {
            "libraryName": "meri-design-dev",
            "camel2Dash": false,
            "libDir": "dist",
            "styleLibrary": { "name": "theme", "base": true }
          }
    ]
```

## 启动说明
- npm run dev ` 启动开发预览 `
- npm run prod ` 打包成静态 `
- npm run components ` 打包所有组件 `
- npm run single ` 打包单个组件 `
    
