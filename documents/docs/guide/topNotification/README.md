### TopNotification 置顶条

<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1>TopNotification组件</h1>
            <TopNotification :data="stickData"/>
            <TopNotification :data="stickData1"/>
            <TopNotification :data="stickData2"/>
            <TopNotification :data="stickData3"/>
            <TopNotification :data="stickData4"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TopNotificationView",
        data() {
            return {
                stickData: [
                    {
                        type: 'default',
                        text: '当前无报警'
                    },
                    {
                        type: 'error',
                        text: '实时报警：10个（0个未处理）风险等级：低'
                    },
                    {
                        type: 'warning',
                        text: '实时报警：10个（0个未处理）风险等级：低'
                    },
                    {
                        type: 'info',
                        text: '今天有报告尚未查看：月能耗日志 年能耗日志'
                    }
                ],
                stickData1: [
                    {
                        type: 'default',
                        text: '当前无报警'
                    }
                ],
                stickData2: [
                    {
                        type: 'error',
                        text: '实时报警：10个（0个未处理）风险等级：低'
                    }
                ],
                stickData3: [
                    {
                        type: 'warning',
                        text: '实时报警：10个（0个未处理）风险等级：低'
                    }
                ],
                stickData4: [
                    {
                        type: 'info',
                        text: '今天有报告尚未查看：月能耗日志 年能耗日志'
                    }
                ]
            }
        }
    }
</script>
<style lang="stylus" scoped>
.p-stick
    margin-bottom 12px

</style>

```vue
<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1>TopNotification组件</h1>
            <TopNotification :data="stickData"/>
            <TopNotification :data="stickData1"/>
            <TopNotification :data="stickData2"/>
            <TopNotification :data="stickData3"/>
            <TopNotification :data="stickData4"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TopNotificationView",
        data() {
            return {
                stickData: [
                    {
                        type: 'default',
                        text: '当前无报警'
                    },
                    {
                        type: 'error',
                        text: '实时报警：10个（0个未处理）风险等级：低'
                    },
                    {
                        type: 'warning',
                        text: '实时报警：10个（0个未处理）风险等级：低'
                    },
                    {
                        type: 'info',
                        text: '今天有报告尚未查看：月能耗日志 年能耗日志'
                    }
                ],
                stickData1: [
                    {
                        type: 'default',
                        text: '当前无报警'
                    }
                ],
                stickData2: [
                    {
                        type: 'error',
                        text: '实时报警：10个（0个未处理）风险等级：低'
                    }
                ],
                stickData3: [
                    {
                        type: 'warning',
                        text: '实时报警：10个（0个未处理）风险等级：低'
                    }
                ],
                stickData4: [
                    {
                        type: 'info',
                        text: '今天有报告尚未查看：月能耗日志 年能耗日志'
                    }
                ]
            }
        }
    }
</script>

```

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| data    | 提示数据列表 | Array | [] | Yes     |

### data

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| type    | 类型（default/error/warning/info） | String | default | Yes     |
| text    | 显示的内容 | String | default | Yes     |
