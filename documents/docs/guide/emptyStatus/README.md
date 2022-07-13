### EmptyStatus 空状态

<template>
    <div>
        <h2>空状态组件</h2>
        <div class="empty-display">
            <EmptyStatus type="404" />
        </div>
        <div class="empty-display">
            <EmptyStatus type="500">
                <template slot="title">
                    <div style="margin-bottom: 12px;font-size: 16px; color: #1f2429">这是500状态</div>
                </template>
                <template slot="text">
                    <div style="margin-bottom: 12px;font-size: 14px; color: #8d9399">500</div>
                </template>
                <template slot="button">
                    <div>
                        <Button type="default">按钮</Button>
                    </div>
                </template>
            </EmptyStatus>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EmptyStatusView'
    
}
</script>


### 代码演示

```vue

<template>
    <div>
        <h2>空状态组件</h2>
        <div class="empty">
            <EmptyStatus type="404" />
        </div>
        <div class="empty">
            <EmptyStatus type="500">
                <template slot="title">
                    <div style="margin-bottom: 12px;font-size: 16px; color: #1f2429">这是500状态</div>
                </template>
                <template slot="text">
                    <div style="margin-bottom: 12px;font-size: 14px; color: #8d9399">500</div>
                </template>
                <template slot="button">
                    <div>
                        <Button type="default">按钮</Button>
                    </div>
                </template>
            </EmptyStatus>
        </div>
        <div class="empty-display">
            <EmptyStatus type="administration">
                <template slot="text">
                    <div style="margin-bottom: 12px;font-size: 14px; color: #8d9399">administration</div>
                </template>
            </EmptyStatus>
            <EmptyStatus type="collect">
                <template slot="text">
                    <div style="margin-bottom: 12px;font-size: 14px; color: #8d9399">collect</div>
                </template>
            </EmptyStatus>
            <EmptyStatus type="completed">
                <template slot="text">
                    <div style="margin-bottom: 12px;font-size: 14px; color: #8d9399">completed</div>
                </template>
            </EmptyStatus>
            <EmptyStatus type="content">
                <template slot="text">
                    <div style="margin-bottom: 12px;font-size: 14px; color: #8d9399">content</div>
                </template>
            </EmptyStatus>
            <EmptyStatus type="data">
                <template slot="text">
                    <div style="margin-bottom: 12px;font-size: 14px; color: #8d9399">data</div>
                </template>
            </EmptyStatus>
            <EmptyStatus type="download">
                <template slot="text">
                    <div style="margin-bottom: 12px;font-size: 14px; color: #8d9399">download</div>
                </template>
            </EmptyStatus>
            <EmptyStatus type="graph">
                <template slot="text">
                    <div style="margin-bottom: 12px;font-size: 14px; color: #8d9399">graph</div>
                </template>
            </EmptyStatus>
            <EmptyStatus type="load">
                <template slot="text">
                    <div style="margin-bottom: 12px;font-size: 14px; color: #8d9399">load</div>
                </template>
            </EmptyStatus>
            <EmptyStatus type="login">
                <template slot="text">
                    <div style="margin-bottom: 12px;font-size: 14px; color: #8d9399">login</div>
                </template>
            </EmptyStatus>
            <EmptyStatus type="message">
                <template slot="text">
                    <div style="margin-bottom: 12px;font-size: 14px; color: #8d9399">message</div>
                </template>
            </EmptyStatus>
            <EmptyStatus type="network">
                <template slot="text">
                    <div style="margin-bottom: 12px;font-size: 14px; color: #8d9399">network</div>
                </template>
            </EmptyStatus>
            <EmptyStatus type="picture">
                <template slot="text">
                    <div style="margin-bottom: 12px;font-size: 14px; color: #8d9399">picture</div>
                </template>
            </EmptyStatus>
            <EmptyStatus type="remark">
                <template slot="text">
                    <div style="margin-bottom: 12px;font-size: 14px; color: #8d9399">remark</div>
                </template>
            </EmptyStatus>
            <EmptyStatus type="search">
                <template slot="text">
                    <div style="margin-bottom: 12px;font-size: 14px; color: #8d9399">search</div>
                </template>
            </EmptyStatus>
            <EmptyStatus type="statement">
                <template slot="text">
                    <div style="margin-bottom: 12px;font-size: 14px; color: #8d9399">statement</div>
                </template>
            </EmptyStatus>
            <EmptyStatus type="waiting">
                <template slot="text">
                    <div style="margin-bottom: 12px;font-size: 14px; color: #8d9399">waiting</div>
                </template>
            </EmptyStatus>
            <EmptyStatus type="table">
                <template slot="text">
                    <div style="margin-bottom: 12px;font-size: 14px; color: #8d9399">table</div>
                </template>
            </EmptyStatus>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EmptyStatusView'
};
</script>

<style lang="stylus">
    .empty-display
        padding 24px
        display flex
        flex-wrap wrap
        .p-empty
            width 200px

</style>

```

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| type    | 图片类型/自定义url  | String | '' | No |
| custom    | 是否自定义  | Boolean | false | No |
| slot    | 插槽内容【title、text、button】  | html | '' | No |


### type
| 可选值  | 
| ------- | 
| '404','500','administration','collect','completed','content','data','download','graph','load','login','message','network','picture','remark','search','statement','table','waiting' |
