
### 使用说明

::: tip
当前版本：1.5.2<br>
:::

::: warning
若在您使用过程中发现bug，请记录到Meri 组件开发公共看板/wiki/组件库/使用中的问题。<br>
在树形结构、列表超过200条数据后会有卡顿，也就是说咱们的组件不支持大量的数据同时渲染。<br>
谢谢合作。
:::

::: danger
为了使打包后的代码量更小，<br>
所以该文档不支持IE11及以下浏览器，请使用现代浏览器（如：Chrome）浏览该文档
:::

# meri-design-dev：
- 基于vue的ui库，gitlab地址 `ssh://git@101.254.183.198:5522/bi-web/persagy-ui-kit.git`

::: tip
meri-design-dev与antd、element有啥区别？<br>
1.规范UI<br>
2.针对公司业务开发，定制化高<br>
3.结构简单，开发员拿着源码能改<br>
:::

## 一、安装

- `npm install -S meri-design-dev`

## 二、全局引入

```
    import MeriD from 'meri-design-dev';
    import 'meri-design-dev/dist/index.css'
    Vue.use(MeriD);
```

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

## 三、按需引入
（不用配置主题色）

- 引入组件 `import { Button } from 'meri-design-dev''`
- 安装依赖包 `npm i -D babel-plugin-component`

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

## 四、在vue-cli中使用

- 首先安装依赖包 `npm i -D babel-plugin-component`

1.全局引入

- 配置babel.config.js

```js
module.exports = {
  plugins: [
    [
      "component",
      {
        "libraryName": "meri-design-dev",
        "camel2Dash": false,
        "libDir": "dist",
        "style": false
      }
    ]
  ]
};
```

-.在main.js中添加

```
import MeriD from "meri-design-dev";
import "meri-design-dev/dist/index.css";
Vue.use(MeriD);

```

2.按需引入

- 配置babel.config.js

```js
module.exports = {
  plugins: [
    [
      "component",
      {
        "libraryName": "meri-design-dev",
        "camel2Dash": false,
        "libDir": "dist",
        "styleLibrary": { "name": "theme", "base": true }
      }
    ]
  ]
};
```

- 在组建中引用

```
import { Button, Toggle } from 'meri-design-dev';
components: { Button, Toggle }

```

## 五、引用暗黑版主题
- 只需要把上述的`"libDir": "dist"`改成`"libDir": "dark"`即可

## 六、自定义主题色
（自定义主题色）

::: tip
源码样式使用stylus规范，在自定义主题色时需遵循stylus语法并按照以下说明配置
:::

---

1.新建variables.styl文件，放在src目录下
::: details 查看自定义配置主题变量
```stylus
/* base-color -start */

/* base */
$white=#fff
$black=#000
$theme=$white

/* 透明背景色 */
//$theme-transparency=#646c73
$theme-transparency=rgba(100, 108, 115, .5)

/* 蓝色 */
/* input、触发器、按钮在focus时的投影 */
$box-shadow-blue=(0 0 0 2px rgba(0, 145, 255, .2))

/* 灰色 */
/* 下拉选择器、按钮盒子相关投影 */
/* 向上 */
$box-shadow-top=(0 -2px 10px rgba(31, 35, 41, .1))
/* 向下 */
$box-shadow-bottom=(0 2px 10px rgba(31, 35, 41, .1))
/* 向左 */
$box-shadow-left=(-2px 0 10px rgba(31, 35, 41, .1))
/* 向右 */
$box-shadow-right=(2px 0 10px rgba(31, 35, 41, .1))

/* 箭头相关投影 */
/* 向左 */
$box-shadow-min-top=(-2px 2px 4px rgba(31, 35, 41, .1))
/* 向下 */
$box-shadow-min-bottom=(2px -2px 4px rgba(31, 35, 41, .1))
/* 向左 */
$box-shadow-min-left=(-2px -2px 4px rgba(31, 35, 41, .1))
/* 向左 */
$box-shadow-min-right=(2px 2px 4px rgba(31, 35, 41, .1))

/* 向下 */
$box-shadow-max-bottom=(0 8px 16px 0px rgba(0, 65, 115, .15))

/* 带三角形的盒子投影 */
/* 向上 */
$box-shadow-triangle-top=(0 -2px 4px rgba(31, 35, 41, .1))
/* 向下 */
$box-shadow-triangle-bottom=(0 2px 4px rgba(31, 35, 41, .1))
/* 向左 */
$box-shadow-triangle-left=(-2px 0 4px rgba(31, 35, 41, .1))
/* 向右 */
$box-shadow-triangle-right=(2px 0 4px rgba(31, 35, 41, .1))

/* 弹窗投影 */
$modal-shadow-bottom=(0 20px 30px rgba(31, 35, 41, .15))

/* popover-tip-bg=$grey-900 opacity=0.8 */
$popover-tip-bg=rgba(31, 36, 41, .8)

/* blue */
$blue-900=#004275
$blue-800=#00518f
$blue-700=#0065b3
$blue-600=#007cdb
$blue-500=#0091ff
$blue-400=#4eb1fd
$blue-300=#82c7fc
$blue-200=#bae0fd
$blue-100=#e1f2ff
$blue-50=#f0f9ff

/* cyan */
$cyan-900=#00647a
$cyan-800=#00758f
$cyan-700=#0088a7
$cyan-600=#009ec1
$cyan-500=#00add4
$cyan-400=#26b9da
$cyan-300=#4dc6e1
$cyan-200=#80d7ea
$cyan-100=#b2e6f2
$cyan-50=#e0f5fa

/* turquoise */
$turquoise-900=#024b41
$turquoise-800=#036356
$turquoise-700=#078372
$turquoise-600=#04b49c
$turquoise-500=#00d6b9
$turquoise-400=#14e1c6
$turquoise-300=#64e8d6
$turquoise-200=#a9efe6
$turquoise-100=#d5f6f2
$turquoise-50=#eafaf8

/* green */
$green-900=#124b0c
$green-800=#186010
$green-700=#237b19
$green-600=#2ea121
$green-500=#34c724
$green-400=#62d256
$green-300=#8ee085
$green-200=#b7edb1
$green-100=#d9f5d6
$green-50=#f0fbef

/* lime */
$lime-900=#374200
$lime-800=#495700
$lime-700=#667901
$lime-600=#8fac02
$lime-500=#b3d600
$lime-400=#c3dd40
$lime-300=#d2e76a
$lime-200=#dfee96
$lime-100=#eef6c6
$lime-50=#f6fae5

/* yellow */
$yellow-900=#5c4700
$yellow-800=#795d01
$yellow-700=#aa8303
$yellow-600=#dcaa04
$yellow-500=#ffc60a
$yellow-400=#fad355
$yellow-300=#f7dc82
$yellow-200=#f8e6ab
$yellow-100=#faf0d1
$yellow-50=#fdf9ed

/* orange */
$orange-900=#6b3900
$orange-800=#8f4f04
$orange-700=#b26206
$orange-600=#de7802
$orange-500=#f58300
$orange-400=#ffa53d
$orange-300=#ffba6b
$orange-200=#fed4a4
$orange-100=#feead2
$orange-50=#fff6eb

/* red */
$red-900=#621c18
$red-800=#812520
$red-700=#ac2f28
$red-600=#d83931
$red-500=#f54e45
$red-400=#f76b64
$red-300=#f9908b
$red-200=#eff0f1
$red-100=#fde3e2
$red-50=#fef2f1

/* carmine */
$carmine-900=#520a33
$carmine-800=#7a0f4b
$carmine-700=#9e1361
$carmine-600=#c71077
$carmine-500=#f01d94
$carmine-400=#f14ba9
$carmine-300=#f57ac0
$carmine-200=#f9aed9
$carmine-100=#fdddef
$carmine-50=#fef1f8

/* purple */
$purple-900=#460b46
$purple-800=#681268
$purple-700=#8c218c
$purple-600=#b320b3
$purple-500=#d136d1
$purple-400=#db66db
$purple-300=#e58fe5
$purple-200=#efb9ef
$purple-100=#f8def8
$purple-50=#fceefc

/* grey */
$grey-900=#1f2429
$grey-800=#333940
$grey-700=#454d54
$grey-600=#646c73
$grey-500=#8d9399
$grey-400=#c3c7cb
$grey-300=#e4e5e7
$grey-200=#eff0f1
$grey-100=#f5f6f7
$grey-50=#f8f9fa

/* hover-color */
$hover-color-blue=$blue-100
$hover-color-grey=$grey-100

/* base-color -end */
```
:::

2.在config里配置引入色值变量，如下

 - 安装style-resources-loader `npm i -D style-resources-loader`

```
    {
        test: /\.styl(us)?$/,
        use: [
            {
                loader: 'stylus-loader'
            },{
                loader: 'style-resources-loader',
                options: {
                    injector: 'prepend',
                    patterns: path.resolve(__dirname, 'src/assets/stylus/variables.styl')
                }
            }
        ]
    }
```

3.配置.babelrc
```json
  [
    "component",
    {
      "libraryName": "meri-design-dev",
      "camel2Dash": false,
      "libDir": "custom",
      "styleLibrary": { "name": "theme", "path": "[module].styl" }
    }
  ]
```

4.若使用到了图标，全局引入以下文件base.styl
::: details 查看svg fill/stroke的样式
```stylus
/* svg fill/stroke的颜色 */
.svg-fill-grey-800
  fill $grey-800
.svg-stroke-grey-800
  stroke $grey-800
.svg-fill-grey-500
  fill $grey-500
.svg-stroke-grey-500
  stroke $grey-500
.svg-fill-grey-400
  fill $grey-400
.svg-stroke-grey-400
  stroke $grey-400
.svg-stroke-grey-50
  stroke $grey-50

.svg-fill-blue-500
  fill $blue-500

.svg-fill-green-500
  fill $green-500
.svg-fill-green-300
  fill $green-300
.svg-fill-green-100
  fill $green-100

.svg-fill-red-500
  fill $red-500
.svg-fill-red-400
  fill $red-400

.svg-fill-white
  fill $white
.svg-stroke-white
  stroke $white
```
:::

5.若需要重置css样式，在base.styl头部加上以下重置样式，或在入口文件引入
::: details 查看重置样式
```stylus
*,
:after,
:before
  box-sizing border-box

@-ms-viewport
  width device-width

body, html
  width 100%
  height 100%


body, figure, h1, h2, h3, h4, h5, h6, p, pre
  margin 0

dl, ol, ul
  margin 0
  padding-left 0

li
  list-style none

dd
  margin-left 0

a
  text-decoration none
  color $blue-500

table
  border-collapse collapse

button, fieldset, input, legend, optgroup, select, td, textarea
  padding 0

fieldset
  margin 0
  border 0

button
  outline 0


input::-ms-clear,
input::-ms-reveal
  display none
input::-webkit-inner-spin-button,
input::-webkit-outer-spin-button
  appearance none

::-webkit-scrollbar
  width 6px
  height @width

::-webkit-scrollbar-track
  border-radius 0

::-webkit-scrollbar-thumb
  background-color $grey-400
  border-radius 3px
  &:hover
    background-color $grey-500
```
:::

## 七、使用babel-plugin-imports

1.全局引入，在入口文件中添加
```
   import MeriD from 'meri-design-dev/dist/index';
   import 'meri-design-dev/dist/index.css';
   Vue.use(MeriD);
```

2.按需引入，注意这里需要在webpack.config.js中配置，另外需要自己处理盒模型，组件使用的是IE盒模型
```
{
    test: /\.js$/,
    use: [
        {
            loader: 'babel-loader',
            options: {
                plugins: [
                    ['import', {
                        libraryName: 'meri-design-dev',
                        libraryDirectory: 'dist',
                        camel2DashComponentName: false,
                        style: (name, file) => {
                            const arr = name.split('/'),
                                filename = arr[arr.length - 1];
                            return `meri-design-dev/dist/theme/${filename}.css`;
                        }
                    }]
                ]
            }
        }
    ]
}
```

## 八、关于z-index

| 模块     | 层级  |
| ------- | ---- |
| Message | 9000～9499 |
| Loading | 8000～8499 |
| 下拉列表 | 7000～7499 |
| 模态弹窗 | 6000～6499 |
| 遮罩层/Popover | 5500～5999 |
| 全局菜单 | 5000～5499 |
| 顶栏 | 4000～4499 |
| 侧边栏（侧拉窗）| 3000～3499 |

## 九、UI蓝湖链接地址

- [UI规范](https://lanhuapp.com/web/#/item/project/board?pid=88b110df-5ae3-412d-88ea-cbf1c9c3b5b4)

- `https://lanhuapp.com/web/#/item/project/board?pid=88b110df-5ae3-412d-88ea-cbf1c9c3b5b4`

## 十、配置IE兼容

1.babel6:
 - 方式一：使用`babel-polyfill` 和 `babel-plugin-transform-runtime` [babel-polyfill](https://babeljs.io/docs/en/6.26.3/babel-polyfill)
 - 方式二：使用`core-js/stable` 和 `regenerator-runtime/runtime` [core-js](https://github.com/zloirock/core-js)

2.babel7:
 - 使用`@babel/preset-env` + `@babel/plugin-transform-runtime` + `core-js@3`
