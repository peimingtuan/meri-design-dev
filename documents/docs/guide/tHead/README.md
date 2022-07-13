### THead 表头 - 开发板

#### 示例
<template>
    <THead
        key="tHead"
        width="100%"
        :header="headerData"
        :checkbox="true"
        checked="uncheck"
        :border="true"
        :setting="true"
        :rowNumber="true"
        :hasBar="hasBar"
        @select="select"
        @sortHandle="sortHandle"
        @screenHandle="screenHandle"
        @getColWidth="getColWidth"
        @resizableHandle="resizableHandle"
        @settingChange="settingChange"
        @settingCancel="settingCancel"
        @settingReset="settingReset"
        >
        <div class="content">暂无数据</div>
    </THead>
</template>

::: details 查看示例
```vue
<THead
    key="tHead"
    width="100%"
    :header="headerData"
    :checkbox="true"
    checked="uncheck"
    :border="true"
    :setting="true"
    :rowNumber="true"
    :hasBar="hasBar"
    @select="select"
    @sortHandle="sortHandle"
    @screenHandle="screenHandle"
    @getColWidth="getColWidth"
    @resizableHandle="resizableHandle"
    @settingChange="settingChange"
    @settingCancel="settingCancel"
    @settingReset="settingReset"
    >
    <div class="content">暂无数据</div>
</THead>

const header1 = [
    {
        key: 'name',
        text: '项目名称',
        resizable: true,
        fixed: 'left',
        tip: { open: true, text: '项目名称项目名称' }
    },
    {
        key: 'date',
        text: '日期',
        sort: {
            open: true, type: 'date', status: 'ord', event: 'sortHandle'
        },
        resizable: true,
        minWidth: 80,
        tip: { open: true, text: '日期日期日期日期日期日期' },
        screen: {
            status: 'single',
            open: true,
            data: [
                { id: 'all', name: '全部' },
                { id: 'executed', name: '已 执行', checked: 'checked' },
                { id: 'non-execution', name: '未执行', checked: 'checked' },
                { id: 'audit', name: '审核中' },
                { id: 'has-approval', name: '已审批' }
            ],
            event: 'screenHandle'
        }
    },
    {
        key: 'strategyStatus',
        text: '策略状态',
        align: 'center'
    },
    {
        key: 'strategyTime',
        text: '策略推送时间'
    },
    {
        key: 'executeTime',
        text: '应执行时间'
    }
];
```
:::

#### methods
::: details 查看示例
```vue
methods: {
    select(status) {
        console.log('select::', status);
    },
    sortHandle(status, key) {
        console.log(status, key);
    },
    // 筛选
    screenHandle(key, id) {
        console.log('筛选::', key, id);
    },
    // 获取每列宽度
    getColWidth(colWidth) {
        console.log(colWidth);
    },
    // 当前拖动的宽度
    resizableHandle(w, colWidth) {
        console.log('当前拖动的宽度::', w);
        console.log('colWidth::', colWidth);
    },
    settingChange(item, type) {
        console.log('settingChange::', item, type);
    },
    settingCancel(type) {
        console.log('settingCancel::', type);
    },
    settingReset(type) {
        console.log('settingReset::', type);
    }
}
```

:::

<style lang="stylus">
.content
    padding 20px
    text-align center
    font-size 14px
    color $grey-600
</style>

<script>
const header1 = [
    {
        key: 'name',
        text: '项目名称',
        resizable: true,
        fixed: 'left',
        tip: { open: true, text: '项目名称项目名称' }
    },
    {
        key: 'date',
        text: '日期',
        sort: {
            open: true, type: 'date', status: 'ord', event: 'sortHandle'
        },
        resizable: true,
        minWidth: 80,
        tip: { open: true, text: '日期日期日期日期日期日期' },
        screen: {
            status: 'single',
            open: true,
            data: [
                { id: 'all', name: '全部' },
                { id: 'executed', name: '已 执行', checked: 'checked' },
                { id: 'non-execution', name: '未执行', checked: 'checked' },
                { id: 'audit', name: '审核中' },
                { id: 'has-approval', name: '已审批' }
            ],
            event: 'screenHandle'
        }
    },
    {
        key: 'strategyStatus',
        text: '策略状态',
        align: 'center'
    },
    {
        key: 'strategyTime',
        text: '策略推送时间'
    },
    {
        key: 'executeTime',
        text: '应执行时间'
    }
];

export default {
    name: 'THeadView',
    data() {
        return {
            headerData: header1,
            hasBar: false
        };
    },
    methods: {
        select(status) {
            console.log('select::', status);
        },
        sortHandle(status, key) {
            console.log(status, key);
        },
        screenHandle(key, id) {
            console.log('筛选::', key, id);
        },
        getColWidth(colWidth) {
            console.log(colWidth);
        },
        resizableHandle(w, colWidth) {
            console.log('当前拖动的宽度::', w);
            console.log('colWidth::', colWidth);
        },
        settingChange(item, type) {
            console.log('settingChange::', item, type);
        },
        settingCancel(type) {
            console.log('settingCancel::', type);
        },
        settingReset(type) {
            console.log('settingReset::', type);
        }
    }
};
</script>

### Attributes

| 参数     | 说明    | 类型    | 默认值   | 必须  |
| ------- | ----    | ------  | ------- | ------|
| width    | 宽度(如果设置为`100%`，组件会基于父级标签撑满并自动分配没有设置固定宽度的列的宽度) | String/Number | 500    | no     |
| checkbox    | 是否多选 | Boolean | false    | no     |
| checked    | 是否选中(`uncheck/checked`) | String | uncheck    | no     |
| border    | 是否显示竖向边框 | Boolean | false     | no     |
| setting    | 开启设置 | Boolean | false     | no     |
| draggable    | 开启设置列表可多动排序 | Boolean | false     | no     |
| header    | table头部数据 | Array | []     | yes     |
| average    | 每列的默认宽度 | Number, String | 80     | no     |
| rowNumber    | 开启显示行号 | Boolean | false     | no     |
| dimension    | 开启双行表头 | Boolean | false     | no     |
| @select    | checkbox状态改变回调 | Function | (status) => {}     | no     |
| @getColWidth    | 获取每列宽度 | Function | (colWidth) => {}     | no     |
| @resizableHandle    | 当前拖动的宽度 | Function | (w, colWidth) => {}     | no     |
| @settingChange    | 点击设置确定的回调，type返回confirm | Function | (item, type) => {}     | no     |
| @settingCancel    | 点击设置底部按钮的回调，type返回cancel | Function | (type) => {}     | no     |
| @settingReset    | 点击设置底部按钮的回调，type返回reset | Function | (type) => {}     | no     |
| key    | 唯一标识符，当一个标签下使用多个THead时，建议加上该属性 | String | ''     | no     |

### 提示说明
::: tip 若需强制重置数据，请调用以下方法，以下方法会重新初始化并覆盖TableGrid组件数据
    1.重置header数据：this.$refs.xxx.resetHeaderData(headerData);
    2.其他说明：
        由于此组件初始化的时候会在mounted保存一次历史数据，后续操作会依赖保存的历史数据进行计算，
        如需修改、重置数据可调用此方法
:::

::: tip header数据说明
     1.item中的key属性值对应data中的key
     2.item中的sort设置排序规则，其中demo中所使用的[event: 'sortHandle']是组件提交给父级的自定义函数名称，
        用户可自行定义event名称，status 取值['', 'seq', 'ord']，默认为空、seq-正序、ord-倒序，设置closeDefault为true不支持回到默认;
        如果初始化传入的有多个排序，默认排序高亮状态以header数据中的第一个排序规则为准;
        默认是按照字符串排序，若是数值请设置type为'number'
     3.item中的rowSpan设置合并，是一个二维数组，【rowSpan: [[1, 4], [7, 9]]】表示合并索引为1到索引为4、合并索引为7到索引为9的列，如果设置了rowSpan不支持排序
     4.item中的checked设置列显示隐藏，可选值['checked', 'uncheck']
     5.item中的align设置列对齐方式，可选值['left', 'right', 'center']
     6.item中的width设置宽度
     6.item中设置resizable: true开启拖动表头改变宽度
:::

::: tip header.screen数据说明
     1.open设置打开关闭状态，
     2.status设置筛选4种状态【'single', 'multiple', 'singleSearch', 'multipleSearch'】
     3.data设置列表
        data数据示例 [{ id: 'xxx', name: 'xxx', checked: 'xxx' }]
        checked设置选中，设置默认选中时-如果是单选条件下设置多个checked会以第一个选中的checked进行筛选
        在单选条件下如果有name='全部'，需设置id为'all'或者空字符串
     4.event设置回调
:::

::: tip header.children数据说明
     1.不支持排序，
     2.其他参数与header主体数据一样
:::

::: tip 配合SidebarCustom使用
     当手动拖动SidebarCustom改变侧边栏宽度时，SidebarCustom会出发change事件，
     此时页面宽度改变需要手动调用TableGrid的重新计算列宽函数`this.$refs.xxx.resizeTableWidth()`
:::
