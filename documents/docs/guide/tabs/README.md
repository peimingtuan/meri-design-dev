### Tabs 标签页

<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1 class="main-title">Tabs组件</h1>
            <div class="display-box">
                <div class="display-panel">
                    <h5>一级页签</h5>
                    <Tabs type="first-nav" :data="tabData" v-model="model1" />
                </div>
                <div class="display-panel">
                    <h5>二级页签</h5>
                    <Tabs type="second-nav" :data="tabData" v-model="model2"/>
                </div>            
                <div class="display-panel">
                    <h5>卡片页签</h5>
                    <Tabs type="card" :data="tabData" v-model="model3"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TabsView",
        data() {
            return {
                model1: 'id1',
                model2: 'id2',
                model3: 'id5',
                tabData:[
                    {name: '一', id:'id1'},
                    {name: '弟二', id:'id2' },
                    {name: '第三个' , id:'id3'},
                    {name: '第四个字', id:'id4' },
                    {name: '五个字字字' , id:'id5'},
                    {name: '六个字的情况', id:'id6' },
                ]
            }
        }
    }
</script>

<style lang="stylus" scoped>
.component 
    .main-title
        margin-bottom 30px
        border-bottom 1px solid #ddd
        padding-bottom 12px
    .display-box 
        padding 20px
        .display-panel
            margin-bottom 60px
            h5 
                margin-bottom 10px

</style>


```vue
<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1 class="main-title">Tabs组件</h1>
            <div class="display-box">
                <div class="display-panel">
                    <h5>一级页签</h5>
                    <Tabs type="first-nav" :data="tabData" v-model="model1" />
                </div>
            
                <div class="display-panel">
                    <h5>二级页签</h5>
                    <Tabs type="second-nav" :data="tabData" v-model="model2"/>
                </div>
            
                <div class="display-panel">
                    <h5>卡片页签</h5>
                    <Tabs type="card" :data="tabData" v-model="model3"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "TabsView",
        data() {
            return {
                model1: 'id1',
                model2: 'id2',
                model3: 'id5',
                tabData:[
                    {name: '一', id:'id1'},
                    {name: '弟二', id:'id2' },
                    {name: '第三个' , id:'id3'},
                    {name: '第四个字', id:'id4' },
                    {name: '五个字字字' , id:'id5'},
                    {name: '六个字的情况', id:'id6' },
                ]
            }
        }
    }
</script>

```

### Attributes

| 参数     |    说明     | 类型    | 默认值    | 必须    |
| -------  |   ----     | ------  | -------   | ------ |
| data     |  数据列表   | Array   | []        | Yes     |
| model    |  默认选中项 | String  |  ''       | Yes     |
| type    |  类型【可选值：first-nav second-nav card】 | String  |  ''       | Yes     |
