### Tag 标签

<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1>Tag组件</h1>
            <div class="display-panel">
                <h3>1.big</h3>
                <Tag v-for="(color, i1) in tagBgColors" :key="'big'+color+i1" size='big' :color="color">大标签</Tag>
            </div>
            <div class="display-panel">
                <h3>2.small</h3>
                <Tag v-for="(color, i2) in tagBgColors" :key="'small'+color+i2" size='small' :color="color">小标签</Tag>
            </div>
            <div class="display-panel">
                <h3>3.status</h3>
                <Tag  v-for="(color, index)  in statusBgColors" :key="index" type="circular" :name="iconNames[index]"  :color="color">{{iconNames[index]}}</Tag>
            </div>
            <div class="display-panel">
                <h3>4.dot</h3>
                <Tag  type="dot" name='copy'  color="#0091FF">标签1</Tag>
                <Tag  type="dot" name='cost'  color="#F54E45">标签二</Tag>
                <Tag  type="dot" name='start' color="#34C724">标签三</Tag>
                <Tag  type="dot" name='link'  color="#F58300">标签四</Tag>
                <Tag  type="dot" name='copy'  color="#8D9399">标签五</Tag>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TagView",
        data () {
            return {
                tagBgColors: ['#E1F2FF' , '#D5F6F2', '#D9F5D6', '#FAF1D1', '#FEEAD2', '#FDE3E2', '#FDDDEF', '#ECE2FE' ,'#B2E6F2', '#EFF0F1'],
                dotBgColors :['#0091FF','#F54E45','#34C724','#F58300','#8D9399'],
                iconNames:["tagProcessing" , "tagError" , "tagCompleted", "tagRejected", "tagRejected"],
                statusBgColors:['#0091FF','#F54E45','#34C724','#F58300','#8D9399']
            }
        },
    }
</script>

<style lang="stylus" scoped>
    .component
        .display-panel
            margin-bottom 40px
        h3
            padding 8px
            font-size 16px
</style>

 

```vue

<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1>Tag组件</h1>
            <div class="display-panel">
                <h3>1.big</h3>
                <Tag v-for="(color, i1) in tagBgColors" :key="'big'+color+i1" size='big' :color="color">大标签</Tag>
            </div>
            <div class="display-panel">
                <h3>2.small</h3>
                <Tag v-for="(color, i2) in tagBgColors" :key="'small'+color+i2" size='small' :color="color">小标签</Tag>
            </div>
            <div class="display-panel">
                <h3>3.status</h3>
                <Tag  v-for="(color, index)  in statusBgColors" :key="index" type="circular" :name="iconNames[index]"  :color="color">{{iconNames[index]}}</Tag>
            </div>
            <div class="display-panel">
                <h3>4.dot</h3>
                <Tag  type="dot" name='copy'  color="#0091FF">标签1</Tag>
                <Tag  type="dot" name='cost'  color="#F54E45">标签二</Tag>
                <Tag  type="dot" name='start' color="#34C724">标签三</Tag>
                <Tag  type="dot" name='link'  color="#F58300">标签四</Tag>
                <Tag  type="dot" name='copy'  color="#8D9399">标签五</Tag>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TagView",
        data () {
            return {
                tagBgColors: ['#E1F2FF' , '#D5F6F2', '#D9F5D6', '#FAF1D1', '#FEEAD2', '#FDE3E2', '#FDDDEF', '#ECE2FE' ,'#B2E6F2', '#EFF0F1'],
                dotBgColors :['#0091FF','#F54E45','#34C724','#F58300','#8D9399'],
                iconNames:["tagProcessing" , "tagError" , "tagCompleted", "tagRejected", "tagRejected"],
                statusBgColors:['#0091FF','#F54E45','#34C724','#F58300','#8D9399']
            }
        },
    }
</script>

<style lang="stylus" scoped>
    .component
        .display-panel
            margin-bottom 40px
        h3
            padding 8px
            font-size 16px
</style>


```


### Attributes

| 参数     | 说明    | 类型    | 默认值   | 必须  |  
| ------- | ----    | ------  | ------- | ------|
| size    | 标签大小 （size和type不能同时传） | String | big     | no     |
| type    | 标签类型 （size和type不能同时传）| String | null    | no     |
| color   | 标签颜色 | String | #E1F2FF | no     |
| name    | 图标类型 | String |    ''   | no     |

### 说明
|   说明     |
| size和type两个参数不能同时传|
| 传size表明该标签为属性标签，有大小两种尺寸可选, 大图标size传 big, 小图标size传small|
| 传type表明该标签为状态标签， 有圆角和点两种样式可选， 圆角type传circular， 点类型type传dot|
| 颜色只能从提供的颜色里面选|
| 图标可以自定义，只能从图标库中选择|

### color

| 可选值 | 说明 | 类型    | 默认值  | 必须    |
|   ---- | ----|------ | ------- | ------ |
| #E1F2FF #D5F6F2 #D9F5D6 #FAF1D1 #FEEAD2 #FDE3E2 #FDDDEF #ECE2FE #B2E6F2 #EFF0F1| 属性标签可选颜色 | String | - | no |
| #0091FF #F54E45 #34C724 #F58300 #8D9399 | 状态标签可选颜色 | String | - | no |


### size

| 可选值  | 类型    | 默认值  | 必须    |
| ---- | ------ | ------- | ------ |
| big/small | String | big | no     |

### name    

|说明|  可选值    | 类型    | 默认值  | 必须    |
|----| ----------  | ------  | ------- | ------ |
|icon的名称| 所有icon可选 | 'String'| ''|    yes    |


### type   

| 可选值  | 类型    | 默认值  | 必须    |
| ----    | ------ | ------- | ------ |
| circular/dot| String | ''  |   no   |






