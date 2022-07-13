### TableGrid 表格v2

::: tip
第二版Table<br>
:::

#### 合并单元格
<template>
    <TableGrid
            width="1000"
            :maxHeight="height"
            :checkbox="true"
            :border="true"
            :setting="true"
            :header="header1"
            :data="data1"
            :statistics="statistics"
            :rowTools="rowTools"
            @sortHandle="sortHandle"
            @select="selectHandle"
            @screenHandle="screenHandle"
            key="tableGrid"
    />
</template>

::: details 查看示例
```vue
<TableGrid
        width="1000"
        :maxHeight="height"
        :checkbox="true"
        :border="true"
        :setting="true"
        :header="header"
        :data="data"
        :statistics="statistics"
        :rowTools="rowTools"
        @sortHandle="sortHandle"
        @select="selectHandle"
        @screenHandle="screenHandle"
        key="tableGrid"
/>

const header = [
    {
        key: 'name',
        text: '项目名称',
        fixed: 'left'
    },
    {
        key: 'date',
        text: '日期',
        sort: { open: true, event: 'sortHandle' }
    },
    {
        key: 'strategyStatus',
        text: '策略状态',
        screen: {
            open: true,
            status: 'single', // 筛选4种状态【'single', 'multiple', 'singleSearch', 'multipleSearch'】
            data: [
                { id: 'all', name: '全部' },
                { id: 'executed', name: '已执行' },
                { id: 'non-execution', name: '未执行' },
                { id: 'audit', name: '审核中' },
                { id: 'has-approval', name: '已审批' }
            ],
            selectId: 'all',
            selectName: '全部',
            event: 'screenHandle'
        }
    },
    {
        key: 'strategyTime',
        text: '策略推送时间',
        rowMerge: true, // 开启合并列
        width: '180'
    },
    {
        key: 'executeTime',
        text: '应执行时间',
        checked: 'uncheck'
    },
    {
        key: 'dataStatus',
        text: '数据状态',
        rowSpan: [[4, 5]]
    },
    {
        key: 'viscosityTemperature',
        text: '室内最高温度(℃)'
    },
    {
        key: 'outdoorTemperature',
        text: '室外温度(℃)',
        align: 'right'
    }
];

const data = [
     {
         id: '001',
         name: { text: '青阳万达广场1' },
         date: { text: '2020.08.11' },
         strategyStatus: { text: '未执行', dot: '#f76b64' },
         strategyTime: { text: '06:31' },
         executeTime: { text: '01:11' },
         dataStatus: { text: '正常1' },
         viscosityTemperature: { text: 21 },
         outdoorTemperature: { text: 31 },
         tools: {
             data: [
                 { id: 'tjbm', name: '添加部门', disabled: true },
                 { id: 'tjgw', name: '添加岗位', disabled: true },
                 { id: 'bj', name: '编辑' },
                 { id: 'sc', name: '删除' }
             ],
             moreOpen: true,
             moreId: '',
             more: [
                 { id: 'm1', name: 'more1', disabled: true },
                 { id: 'm2', name: 'more2' },
                 { id: 'm3', name: 'more3' }
             ]
         }
     },
     {
         id: '000',
         name: { text: '青阳万达广场0青阳万达广场0青阳万达广场0青阳万达广场0青阳万达广场0' },
         date: { text: '2020.08.10' },
         strategyStatus: { text: '已执行', dot: '#4eb1fd' },
         strategyTime: { text: '06:30' },
         executeTime: { text: '01:10' },
         dataStatus: { text: '异常', color: '#f00' },
         viscosityTemperature: { text: 20 },
         outdoorTemperature: { text: 30 },
         tools: {
             data: [
                 { id: 'tjbm', name: '添加部门', disabled: true },
                 { id: 'tjgw', name: '添加岗位', disabled: true },
                 { id: 'bj', name: '编辑' },
                 { id: 'sc', name: '删除' }
             ],
             moreOpen: true,
             moreId: '',
             more: [
                 { id: 'm1', name: 'more1', disabled: true },
                 { id: 'm2', name: 'more2' },
                 { id: 'm3', name: 'more3' }
             ]
         }
     },
     {
         id: '002',
         name: { text: '青阳万达广场2' },
         date: { text: '2020.08.12' },
         strategyStatus: { text: '审核中', dot: '#14e1c6' },
         strategyTime: { text: '06:32' },
         executeTime: { text: '01:12' },
         dataStatus: { text: '正常2' },
         viscosityTemperature: { text: 22 },
         outdoorTemperature: { text: 32 },
         tools: {
             data: [
                 { id: 'tjbm', name: '添加部门', disabled: true },
                 { id: 'tjgw', name: '添加岗位', disabled: true },
                 { id: 'bj', name: '编辑' },
                 { id: 'sc', name: '删除' }
             ],
             moreOpen: true,
             moreId: '',
             more: [
                 { id: 'm1', name: 'more1', disabled: true },
                 { id: 'm2', name: 'more2' },
                 { id: 'm3', name: 'more3' }
             ]
         }
     },
     {
         id: '003',
         name: { text: '青阳万达广场3' },
         date: { text: '2020.08.13' },
         strategyStatus: { text: '已审批', dot: '#62d256' },
         strategyTime: { text: '06:33' },
         executeTime: { text: '01:13' },
         dataStatus: { text: '正常3' },
         viscosityTemperature: { text: 23 },
         outdoorTemperature: { text: 33 },
         tools: {
             data: [
                 { id: 'tjbm', name: '添加部门', disabled: true },
                 { id: 'tjgw', name: '添加岗位', disabled: true },
                 { id: 'bj', name: '编辑' },
                 { id: 'sc', name: '删除' }
             ],
             moreOpen: true,
             moreId: '',
             more: [
                 { id: 'm1', name: 'more1', disabled: true },
                 { id: 'm2', name: 'more2' },
                 { id: 'm3', name: 'more3' }
             ]
         }
     },
     {
         id: '004',
         name: { text: '青阳万达广场4' },
         date: { text: '2020.08.14' },
         strategyStatus: { text: '已执行', dot: '#4eb1fd' },
         strategyTime: { text: '06:34' },
         executeTime: { text: '01:14' },
         dataStatus: { text: '正常4' },
         viscosityTemperature: { text: 24 },
         outdoorTemperature: { text: 34 },
         tools: {
             data: [
                 { id: 'tjbm', name: '添加部门', disabled: true },
                 { id: 'tjgw', name: '添加岗位', disabled: true },
                 { id: 'bj', name: '编辑' },
                 { id: 'sc', name: '删除' }
             ],
             moreOpen: true,
             moreId: '',
             more: [
                 { id: 'm1', name: 'more1', disabled: true },
                 { id: 'm2', name: 'more2' },
                 { id: 'm3', name: 'more3' }
             ]
         }
     }
];
const dataSelect = [
    { id: 'test1', name: '选择项' },
    { id: 'test2', name: '单平米' },
    { id: 'test3', name: '下级分项' },
    { id: 'test4', name: '滑动平均滑动平均' }
];
const rowTools = {
    open: true, // 开启显示操作
    fixed: 'right', // 与header数据的fixed一样
    width: 380, // 与header数据的width一样
    align: '', // 与header数据的align一样
    text: '', // 头部显示的文字，默认是操作
    moreOpen: true,
    event: 'rowToolHandle'
};
const statistics = {
    open: true,
    id: 'statistics-id',
    name: { text: '50' },
    date: { text: '2020.08.11' },
    strategyStatus: { text: '未执行', dot: '#f76b64' },
    strategyTime: { text: '06:31' },
    executeTime: { text: '01:11' },
    dataStatus: { text: '正常1' },
    viscosityTemperature: { text: 21 },
    outdoorTemperature: { text: 31 }
};
```
:::

#### 普通列表
<template>
<TableGrid
        width="600"
        maxHeight="400"
        average="150"
        :header="header4"
        :data="data4"
        key="tableGrid4"
/>
</template>

::: details 查看示例
```vue
<TableGrid
        width="600"
        maxHeight="400"
        average="150"
        :header="header4"
        :data="data4"
        key="tableGrid4"
/>
const header4 = [
    {
        key: 'name',
        text: '姓名',
        align: 'center'
    },
    {
        key: 'sex',
        text: '性别',
        align: 'center'
    },
    {
        key: 'age',
        text: '年龄',
        align: 'center'
    },
    {
        key: 'job',
        text: '工作',
        align: 'center'
    }
];
const data4 = [
    {
        id: '0001-1',
        name: { text: '忠文' },
        sex: { text: '男' },
        age: { text: '18', color: '#f76b64' },
        job: { text: '大佬' }
    },
    {
        id: '0001-2',
        name: { text: '小斯' },
        sex: { text: '男' },
        age: { text: '17' },
        job: { text: '前端' }
    },
    {
        id: '0001-3',
        name: { text: '牟俊' },
        sex: { text: '女' },
        age: { text: '32' },
        job: { text: '后端' }
    },
    {
        id: '0001-4',
        name: { text: '蒙东' },
        sex: { text: '不详' },
        age: { text: '32' },
        job: { text: 'UX' }
    }
];
```
:::

#### 自定义渲染
<template>
<TableGrid
    render="custom"
    width="600"
    maxHeight="400"
    average="150"
    :header="header5"
    :data="data4"
    @sortHandle="sortHandle"
    key="tableGridCustom"
>
    <template v-for="th in header4" #[th.key]="{item}">
        <span :key="th.key" class="span-text">{{item.item[item.headerKey].text}}</span>
    </template>
</TableGrid>
</template>

::: details 查看示例
```vue
<TableGrid
    render="custom"
    width="600"
    maxHeight="400"
    average="150"
    :header="header5"
    :data="data4"
    @sortHandle="sortHandle"
    key="tableGridCustom"
>
    <template v-for="th in header4" #[th.key]="{item}">
        <span class="span-text">{{item.item[item.headerKey].text}}</span>
    </template>
</TableGrid>

const header5 = [
    {
        key: 'name',
        text: '姓名'
    },
    {
        key: 'sex',
        text: '性别'
    },
    {
        key: 'age',
        text: '年龄'
    },
    {
        key: 'job',
        text: '工作'
    }
];
const data4 = [
    {
        id: '0001-1',
        name: { text: '忠文' },
        sex: { text: '男' },
        age: { text: '18', color: '#f76b64' },
        job: { text: '大佬' }
    },
    {
        id: '0001-2',
        name: { text: '小斯' },
        sex: { text: '男' },
        age: { text: '17' },
        job: { text: '前端' }
    },
    {
        id: '0001-3',
        name: { text: '牟俊' },
        sex: { text: '女' },
        age: { text: '32' },
        job: { text: '后端' }
    },
    {
        id: '0001-4',
        name: { text: '蒙东' },
        sex: { text: '不详' },
        age: { text: '32' },
        job: { text: 'UX' }
    }
];

.span-text {
    font-size: 14px;
}
```
:::

#### 二级表头 + 二级数据
<TableGrid
    width="1200"
    maxHeight="200"
    :checkbox="true"
    :border="true"
    :resizable="true"
    :header="headerMul"
    :data.sync="dataMul"
    :rowNumber="true"
    :dimension="true"
    @monthHandle="monthHandle"
    key="tableGridMul"
/>

::: details 查看示例
```vue
<TableGrid
    width="1200"
    maxHeight="200"
    :checkbox="true"
    :border="true"
    :resizable="true"
    :header="headerMul"
    :data.sync="dataMul"
    :rowNumber="true"
    :dimension="true"
    @monthHandle="monthHandle"
    key="tableGridMul"
/>

monthHandle(obj) {
    console.log('点击月的自定义函数::', obj);
}
const headerMul = [
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
        fixed: 'left',
        sort: {
            open: true, type: 'date', status: 'ord', event: 'sortHandle'
        },
        resizable: true,
        minWidth: 80,
        tip: { open: true, text: '日期日期日期日期日期日期' }
    },
    {
        key: 'strategyStatus',
        text: '策略状态',
        fixed: 'left',
        align: 'center'
    },
    {
        key: 'strategyTime',
        text: '策略推送时间',
        width: 320,
        children: [
            {
                key: 'strategyTimeMonth1',
                text: '1月',
                screen: {
                    status: 'single',
                    open: true,
                    icon: 'triangle',
                    data: [
                        { id: 'bj', name: '编辑数据' },
                        { id: 'pz', name: '查看凭证' },
                        { id: 'sx', name: '升序' },
                        { id: 'jx', name: '降序' }
                    ],
                    event: 'screenHandle'
                },
                tip: { open: true, text: 'strategyTimeMonth1', iconColor: 'red-500' }
            },
            { key: 'strategyTimeMonth2', text: '2月' },
            { key: 'strategyTimeMonth3', text: '3月' },
            { key: 'strategyTimeMonth4', text: '4月' }
        ]
    },
    {
        key: 'executeTime',
        text: '应执行时间',
        width: 280,
        children: [
            { key: 'executeTimeMonth1', text: '1月' },
            { key: 'executeTimeMonth2', text: '2月' },
            { key: 'executeTimeMonth3', text: '3月' },
            { key: 'executeTimeMonth4', text: '4月' }
        ]
    }
];
const dataMul = [
    {
        id: '000000',
        name: { text: '青阳万达广场0青阳万达广场0青阳万达广场0青阳万达广场0青阳万达广场0' },
        date: { text: '2020.08.10' },
        strategyStatus: { text: '已执行', dot: '#4eb1fd' },
        childrenEvent: 'monthHandle',
        strategyTime: {
            text: '06:30',
            children: [
                { headerKey: 'strategyTimeMonth1', text: '1' },
                { headerKey: 'strategyTimeMonth2', text: '2' },
                { headerKey: 'strategyTimeMonth3', text: '3' },
                { headerKey: 'strategyTimeMonth4', text: '4' }
            ]
        },
        executeTime: {
            text: '01:10',
            children: [
                { headerKey: 'executeTimeMonth1', text: '1' },
                { headerKey: 'executeTimeMonth2', text: '2' },
                { headerKey: 'executeTimeMonth3', text: '3' },
                { headerKey: 'executeTimeMonth4', text: '4' }
            ]
        }
    },
    {
        id: '001111',
        name: { text: '青阳万达广场1' },
        date: { text: '2020.08.11' },
        strategyStatus: { text: '未执行', dot: '#f76b64' },
        strategyTime: {
            text: '06:30',
            children: [
                { headerKey: 'strategyTimeMonth1', text: '1' },
                { headerKey: 'strategyTimeMonth2', text: '2' },
                { headerKey: 'strategyTimeMonth3', text: '3' },
                { headerKey: 'strategyTimeMonth4', text: '4' }
            ]
        },
        executeTime: {
            text: '01:10',
            children: [
                { headerKey: 'executeTimeMonth1', text: '1' },
                { headerKey: 'executeTimeMonth2', text: '2' },
                { headerKey: 'executeTimeMonth3', text: '3' },
                { headerKey: 'executeTimeMonth4', text: '4' }
            ]
        }
    },
    {
        id: '002222',
        name: { text: '青阳万达广场2' },
        date: { text: '2020.08.12' },
        strategyStatus: { text: '审核中', dot: '#14e1c6' },
        strategyTime: {
            text: '06:30',
            children: [
                { headerKey: 'strategyTimeMonth1', text: '1' },
                { headerKey: 'strategyTimeMonth2', text: '2' },
                { headerKey: 'strategyTimeMonth3', text: '3' },
                { headerKey: 'strategyTimeMonth4', text: '4' }
            ]
        },
        executeTime: {
            text: '01:10',
            children: [
                { headerKey: 'executeTimeMonth1', text: '1' },
                { headerKey: 'executeTimeMonth2', text: '2' },
                { headerKey: 'executeTimeMonth3', text: '3' },
                { headerKey: 'executeTimeMonth4', text: '4' }
            ]
        }
    },
    {
        id: '003333',
        name: { text: '青阳万达广场3' },
        date: { text: '2020.08.13' },
        strategyStatus: { text: '已审批', dot: '#62d256' },
        strategyTime: {
            text: '06:30',
            children: [
                { headerKey: 'strategyTimeMonth1', text: '1' },
                { headerKey: 'strategyTimeMonth2', text: '2' },
                { headerKey: 'strategyTimeMonth3', text: '3' },
                { headerKey: 'strategyTimeMonth4', text: '4' }
            ]
        },
        executeTime: {
            text: '01:10',
            children: [
                { headerKey: 'executeTimeMonth1', text: '1' },
                { headerKey: 'executeTimeMonth2', text: '2' },
                { headerKey: 'executeTimeMonth3', text: '3' },
                { headerKey: 'executeTimeMonth4', text: '4' }
            ]
        }
    },
    {
        id: '00444',
        name: { text: '青阳万达广场4' },
        date: { text: '2020.08.14' },
        strategyStatus: { text: '已执行', dot: '#4eb1fd' },
        strategyTime: {
            text: '06:30',
            children: [
                { headerKey: 'strategyTimeMonth1', text: '1' },
                { headerKey: 'strategyTimeMonth2', text: '2' },
                { headerKey: 'strategyTimeMonth3', text: '3' },
                { headerKey: 'strategyTimeMonth4', text: '4' }
            ]
        },
        executeTime: {
            text: '01:10',
            children: [
                { headerKey: 'executeTimeMonth1', text: '1' },
                { headerKey: 'executeTimeMonth2', text: '2' },
                { headerKey: 'executeTimeMonth3', text: '3' },
                { headerKey: 'executeTimeMonth4', text: '4' }
            ]
        }
    }
];
```
:::

#### 分组
<TableGrid
    width="100%"
    maxHeight="500"
    :checkbox="true"
    :resizable="true"
    :header="headerGroup"
    :data.sync="dataGroup"
    groupName="groupName"
    key="tableGridGroup"
/>

::: details 查看示例
```vue
<TableGrid
    width="1200"
    maxHeight="500"
    :checkbox="true"
    :resizable="true"
    :header="headerGroup"
    :data.sync="dataGroup"
    groupName="groupName"
    key="tableGridGroup"
/>

const headerGroup = [
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
        fixed: 'left',
        sort: {
            open: true, type: 'date', status: 'ord', event: 'sortHandle'
        },
        resizable: true,
        minWidth: 80,
        tip: { open: true, text: '日期日期日期日期日期日期' }
    },
    {
        key: 'strategyStatus',
        text: '策略状态',
        fixed: 'left',
        align: 'center'
    },
    {
        key: 'strategyTime',
        text: '策略推送时间',
        width: 320
    },
    {
        key: 'executeTime',
        text: '应执行时间',
        width: 280
    }
];
const dataGroup = [
    {
        id: 'xz',
        groupName: '闲置',
        open: true,
        children: [
            {
                id: '000000',
                name: { text: '青阳万达广场0闲置闲置闲置闲置闲置闲置闲置闲置闲置' },
                date: { text: '2020.08.10' },
                strategyStatus: { text: '已执行', dot: '#4eb1fd' },
                strategyTime: { text: '06:30' },
                executeTime: { text: '01:10' },
                checked: 'checked'
            },
            {
                id: '001111',
                name: { text: '青阳万达广场1' },
                date: { text: '2020.08.11' },
                strategyStatus: { text: '未执行', dot: '#f76b64' },
                strategyTime: { text: '06:30' },
                executeTime: { text: '01:10' }
            },
            {
                id: '002222',
                name: { text: '青阳万达广场2' },
                date: { text: '2020.08.12' },
                strategyStatus: { text: '审核中', dot: '#14e1c6' },
                strategyTime: { text: '06:30' },
                executeTime: { text: '01:10' }
            }
        ]
    },
    {
        id: 'jcz',
        groupName: '检测中',
        children: [
            {
                id: '000000',
                name: { text: '青阳万达广场0检测中' },
                date: { text: '2020.08.10' },
                strategyStatus: { text: '已执行', dot: '#4eb1fd' },
                strategyTime: { text: '06:30' },
                executeTime: { text: '01:10' }
            },
            {
                id: '001111',
                name: { text: '青阳万达广场1' },
                date: { text: '2020.08.11' },
                strategyStatus: { text: '未执行', dot: '#f76b64' },
                strategyTime: { text: '06:30' },
                executeTime: { text: '01:10' }
            },
            {
                id: '002222',
                name: { text: '青阳万达广场2' },
                date: { text: '2020.08.12' },
                strategyStatus: { text: '审核中', dot: '#14e1c6' },
                strategyTime: { text: '06:30' },
                executeTime: { text: '01:10' }
            }
        ]
    },
    {
        id: 'syz',
        groupName: '使用中',
        children: [
            {
                id: '000000',
                name: { text: '青阳万达广场0使用中' },
                date: { text: '2020.08.10' },
                strategyStatus: { text: '已执行', dot: '#4eb1fd' },
                strategyTime: { text: '06:30' },
                executeTime: { text: '01:10' }
            },
            {
                id: '001111',
                name: { text: '青阳万达广场1' },
                date: { text: '2020.08.11' },
                strategyStatus: { text: '未执行', dot: '#f76b64' },
                strategyTime: { text: '06:30' },
                executeTime: { text: '01:10' }
            },
            {
                id: '002222',
                name: { text: '青阳万达广场2' },
                date: { text: '2020.08.12' },
                strategyStatus: { text: '审核中', dot: '#14e1c6' },
                strategyTime: { text: '06:30' },
                executeTime: { text: '01:10' }
            }
        ]
    }
];
```

:::

#### methods
::: details 查看示例
```vue
methods: {
    // 筛选
    screenHandle(key, id, parentKey) {
        console.log('筛选::', key, id, parentKey);
    },
    // 排序回调
    sortHandle(status, key) {
        console.log('status::', status, '  ', 'key::', key);
    },
    // 选中的数据
    selectHandle(ids, data) {
        console.log(ids, data);
    },
    // 顶部按钮回调
    topButtonHandle(id) {
        console.log('顶部按钮回调::', id);
    },
    // 每列操作回调
    rowToolHandle({ itemId, toolId }) {
        console.log('每列操作回调::', itemId, toolId);
    },
    // 点击月的自定义函数
    monthHandle(obj) {
        console.log('点击月的自定义函数::', obj);
    }
}
```

:::

<script>

const header = [
    {
        key: 'name',
        text: '项目名称',
        fixed: 'left'
    },
    {
        key: 'date',
        text: '日期',
        sort: { open: true, event: 'sortHandle' }
    },
    {
        key: 'strategyStatus',
        text: '策略状态',
        screen: {
            open: true,
            status: 'single',
            data: [
                { id: 'all', name: '全部' },
                { id: 'executed', name: '已执行' },
                { id: 'non-execution', name: '未执行' },
                { id: 'audit', name: '审核中' },
                { id: 'has-approval', name: '已审批' }
            ],
            selectId: 'all',
            selectName: '全部',
            event: 'screenHandle'
        }
    },
    {
        key: 'strategyTime',
        text: '策略推送时间',
        rowSpan: [[1, 4], [7, 9]],
        width: '180'
    },
    {
        key: 'executeTime',
        text: '应执行时间',
        checked: 'uncheck'
    },
    {
        key: 'dataStatus',
        text: '数据状态',
        rowSpan: [[4, 5]]
    },
    {
        key: 'viscosityTemperature',
        text: '室内最高温度(℃)'
    },
    {
        key: 'outdoorTemperature',
        text: '室外温度(℃)',
        align: 'right'
    }
];
const header4 = [
    {
        key: 'name',
        text: '姓名',
        align: 'center'
    },
    {
        key: 'sex',
        text: '性别',
        align: 'center'
    },
    {
        key: 'age',
        text: '年龄',
        align: 'center'
    },
    {
        key: 'job',
        text: '工作',
        align: 'center'
    }
];
const header5 = [
    {
        key: 'name',
        text: '姓名'
    },
    {
        key: 'sex',
        text: '性别'
    },
    {
        key: 'age',
        text: '年龄'
    },
    {
        key: 'job',
        text: '工作'
    }
];
const data = [
    {
        id: '001',
        name: { text: '青阳万达广场1' },
        date: { text: '2020.08.11' },
        strategyStatus: { text: '未执行', dot: '#f76b64' },
        strategyTime: { text: '06:31' },
        executeTime: { text: '01:11' },
        dataStatus: { text: '正常1' },
        viscosityTemperature: { text: 21 },
        outdoorTemperature: { text: 31 },
        tools: {
            data: [
                { id: 'tjbm', name: '添加部门', disabled: true },
                { id: 'tjgw', name: '添加岗位', disabled: true },
                { id: 'bj', name: '编辑' },
                { id: 'sc', name: '删除' }
            ],
            moreOpen: true,
            moreId: '',
            more: [
                { id: 'm1', name: 'more1', disabled: true },
                { id: 'm2', name: 'more2' },
                { id: 'm3', name: 'more3' }
            ]
        }
    },
    {
        id: '000',
        name: { text: '青阳万达广场0青阳万达广场0青阳万达广场0青阳万达广场0青阳万达广场0' },
        date: { text: '2020.08.10' },
        strategyStatus: { text: '已执行', dot: '#4eb1fd' },
        strategyTime: { text: '06:30' },
        executeTime: { text: '01:10' },
        dataStatus: { text: '异常', color: '#f00' },
        viscosityTemperature: { text: 20 },
        outdoorTemperature: { text: 30 },
        tools: {
            data: [
                { id: 'tjbm', name: '添加部门', disabled: true },
                { id: 'tjgw', name: '添加岗位', disabled: true },
                { id: 'bj', name: '编辑' },
                { id: 'sc', name: '删除' }
            ],
            moreOpen: true,
            moreId: '',
            more: [
                { id: 'm1', name: 'more1', disabled: true },
                { id: 'm2', name: 'more2' },
                { id: 'm3', name: 'more3' }
            ]
        }
    },
    {
        id: '002',
        name: { text: '青阳万达广场2' },
        date: { text: '2020.08.12' },
        strategyStatus: { text: '审核中', dot: '#14e1c6' },
        strategyTime: { text: '06:32' },
        executeTime: { text: '01:12' },
        dataStatus: { text: '正常2' },
        viscosityTemperature: { text: 22 },
        outdoorTemperature: { text: 32 },
        tools: {
            data: [
                { id: 'tjbm', name: '添加部门', disabled: true },
                { id: 'tjgw', name: '添加岗位', disabled: true },
                { id: 'bj', name: '编辑' },
                { id: 'sc', name: '删除' }
            ],
            moreOpen: true,
            moreId: '',
            more: [
                { id: 'm1', name: 'more1', disabled: true },
                { id: 'm2', name: 'more2' },
                { id: 'm3', name: 'more3' }
            ]
        }
    },
    {
        id: '003',
        name: { text: '青阳万达广场3' },
        date: { text: '2020.08.13' },
        strategyStatus: { text: '已审批', dot: '#62d256' },
        strategyTime: { text: '06:33' },
        executeTime: { text: '01:13' },
        dataStatus: { text: '正常3' },
        viscosityTemperature: { text: 23 },
        outdoorTemperature: { text: 33 },
        tools: {
            data: [
                { id: 'tjbm', name: '添加部门', disabled: true },
                { id: 'tjgw', name: '添加岗位', disabled: true },
                { id: 'bj', name: '编辑' },
                { id: 'sc', name: '删除' }
            ],
            moreOpen: true,
            moreId: '',
            more: [
                { id: 'm1', name: 'more1', disabled: true },
                { id: 'm2', name: 'more2' },
                { id: 'm3', name: 'more3' }
            ]
        }
    },
    {
        id: '004',
        name: { text: '青阳万达广场4' },
        date: { text: '2020.08.14' },
        strategyStatus: { text: '已执行', dot: '#4eb1fd' },
        strategyTime: { text: '06:34' },
        executeTime: { text: '01:14' },
        dataStatus: { text: '正常4' },
        viscosityTemperature: { text: 24 },
        outdoorTemperature: { text: 34 },
        tools: {
            data: [
                { id: 'tjbm', name: '添加部门', disabled: true },
                { id: 'tjgw', name: '添加岗位', disabled: true },
                { id: 'bj', name: '编辑' },
                { id: 'sc', name: '删除' }
            ],
            moreOpen: true,
            moreId: '',
            more: [
                { id: 'm1', name: 'more1', disabled: true },
                { id: 'm2', name: 'more2' },
                { id: 'm3', name: 'more3' }
            ]
        }
    }
];
const data4 = [
    {
        id: '0001-1',
        name: { text: '忠文' },
        sex: { text: '男' },
        age: { text: '18', color: '#f76b64' },
        job: { text: '大佬' }
    },
    {
        id: '0001-2',
        name: { text: '小斯' },
        sex: { text: '男' },
        age: { text: '17' },
        job: { text: '前端' }
    },
    {
        id: '0001-3',
        name: { text: '牟俊' },
        sex: { text: '女' },
        age: { text: '32' },
        job: { text: '后端' }
    },
    {
        id: '0001-4',
        name: { text: '蒙东' },
        sex: { text: '不详' },
        age: { text: '32' },
        job: { text: 'UX' }
    }
];

const rowTools = {
    open: true,
    fixed: 'right',
    width: 380,
    align: '',
    text: '',
    moreOpen: true,
    event: 'rowToolHandle'
};
const topButton = [
    { id: 'btn0', text: '删除', type: 'default', event: 'topButtonHandle' },
    { id: 'btn1', text: '下载', type: 'primary', event: 'topButtonHandle' }
];

const dataSelect = [
    { id: 'test1', name: '选择项' },
    { id: 'test2', name: '单平米' },
    { id: 'test3', name: '下级分项' },
    { id: 'test4', name: '滑动平均滑动平均' }
];
const statistics = {
    open: true,
    id: 'statistics-id',
    name: { text: '50' },
    date: { text: '2020.08.11' },
    strategyStatus: { text: '未执行', dot: '#f76b64' },
    strategyTime: { text: '06:31' },
    executeTime: { text: '01:11' },
    dataStatus: { text: '正常1' },
    viscosityTemperature: { text: 21 },
    outdoorTemperature: { text: 31 }
};

const headerMul = [
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
        fixed: 'left',
        sort: {
            open: true, type: 'date', status: 'ord', event: 'sortHandle'
        },
        resizable: true,
        minWidth: 80,
        tip: { open: true, text: '日期日期日期日期日期日期' }
    },
    {
        key: 'strategyStatus',
        text: '策略状态',
        fixed: 'left',
        align: 'center'
    },
    {
        key: 'strategyTime',
        text: '策略推送时间',
        width: 320,
        children: [
            {
                key: 'strategyTimeMonth1',
                text: '1月',
                screen: {
                    status: 'single',
                    open: true,
                    icon: 'triangle',
                    data: [
                        { id: 'bj', name: '编辑数据' },
                        { id: 'pz', name: '查看凭证' },
                        { id: 'sx', name: '升序' },
                        { id: 'jx', name: '降序' }
                    ],
                    event: 'screenHandle'
                },
                tip: { open: true, text: 'strategyTimeMonth1', iconColor: 'red-500' }
            },
            { key: 'strategyTimeMonth2', text: '2月' },
            { key: 'strategyTimeMonth3', text: '3月' },
            { key: 'strategyTimeMonth4', text: '4月' }
        ]
    },
    {
        key: 'executeTime',
        text: '应执行时间',
        width: 280,
        children: [
            { key: 'executeTimeMonth1', text: '1月' },
            { key: 'executeTimeMonth2', text: '2月' },
            { key: 'executeTimeMonth3', text: '3月' },
            { key: 'executeTimeMonth4', text: '4月' }
        ]
    }
];
const dataMul = [
    {
        id: '000000',
        name: { text: '青阳万达广场0青阳万达广场0青阳万达广场0青阳万达广场0青阳万达广场0' },
        date: { text: '2020.08.10' },
        strategyStatus: { text: '已执行', dot: '#4eb1fd' },
        childrenEvent: 'monthHandle',
        strategyTime: {
            text: '06:30',
            children: [
                { headerKey: 'strategyTimeMonth1', text: '1' },
                { headerKey: 'strategyTimeMonth2', text: '2' },
                { headerKey: 'strategyTimeMonth3', text: '3' },
                { headerKey: 'strategyTimeMonth4', text: '4' }
            ]
        },
        executeTime: {
            text: '01:10',
            children: [
                { headerKey: 'executeTimeMonth1', text: '1' },
                { headerKey: 'executeTimeMonth2', text: '2' },
                { headerKey: 'executeTimeMonth3', text: '3' },
                { headerKey: 'executeTimeMonth4', text: '4' }
            ]
        }
    },
    {
        id: '001111',
        name: { text: '青阳万达广场1' },
        date: { text: '2020.08.11' },
        strategyStatus: { text: '未执行', dot: '#f76b64' },
        strategyTime: {
            text: '06:30',
            children: [
                { headerKey: 'strategyTimeMonth1', text: '1' },
                { headerKey: 'strategyTimeMonth2', text: '2' },
                { headerKey: 'strategyTimeMonth3', text: '3' },
                { headerKey: 'strategyTimeMonth4', text: '4' }
            ]
        },
        executeTime: {
            text: '01:10',
            children: [
                { headerKey: 'executeTimeMonth1', text: '1' },
                { headerKey: 'executeTimeMonth2', text: '2' },
                { headerKey: 'executeTimeMonth3', text: '3' },
                { headerKey: 'executeTimeMonth4', text: '4' }
            ]
        }
    },
    {
        id: '002222',
        name: { text: '青阳万达广场2' },
        date: { text: '2020.08.12' },
        strategyStatus: { text: '审核中', dot: '#14e1c6' },
        strategyTime: {
            text: '06:30',
            children: [
                { headerKey: 'strategyTimeMonth1', text: '1' },
                { headerKey: 'strategyTimeMonth2', text: '2' },
                { headerKey: 'strategyTimeMonth3', text: '3' },
                { headerKey: 'strategyTimeMonth4', text: '4' }
            ]
        },
        executeTime: {
            text: '01:10',
            children: [
                { headerKey: 'executeTimeMonth1', text: '1' },
                { headerKey: 'executeTimeMonth2', text: '2' },
                { headerKey: 'executeTimeMonth3', text: '3' },
                { headerKey: 'executeTimeMonth4', text: '4' }
            ]
        }
    },
    {
        id: '003333',
        name: { text: '青阳万达广场3' },
        date: { text: '2020.08.13' },
        strategyStatus: { text: '已审批', dot: '#62d256' },
        strategyTime: {
            text: '06:30',
            children: [
                { headerKey: 'strategyTimeMonth1', text: '1' },
                { headerKey: 'strategyTimeMonth2', text: '2' },
                { headerKey: 'strategyTimeMonth3', text: '3' },
                { headerKey: 'strategyTimeMonth4', text: '4' }
            ]
        },
        executeTime: {
            text: '01:10',
            children: [
                { headerKey: 'executeTimeMonth1', text: '1' },
                { headerKey: 'executeTimeMonth2', text: '2' },
                { headerKey: 'executeTimeMonth3', text: '3' },
                { headerKey: 'executeTimeMonth4', text: '4' }
            ]
        }
    },
    {
        id: '00444',
        name: { text: '青阳万达广场4' },
        date: { text: '2020.08.14' },
        strategyStatus: { text: '已执行', dot: '#4eb1fd' },
        strategyTime: {
            text: '06:30',
            children: [
                { headerKey: 'strategyTimeMonth1', text: '1' },
                { headerKey: 'strategyTimeMonth2', text: '2' },
                { headerKey: 'strategyTimeMonth3', text: '3' },
                { headerKey: 'strategyTimeMonth4', text: '4' }
            ]
        },
        executeTime: {
            text: '01:10',
            children: [
                { headerKey: 'executeTimeMonth1', text: '1' },
                { headerKey: 'executeTimeMonth2', text: '2' },
                { headerKey: 'executeTimeMonth3', text: '3' },
                { headerKey: 'executeTimeMonth4', text: '4' }
            ]
        }
    }
];

const headerGroup = [
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
        fixed: 'left',
        sort: {
            open: true, type: 'date', status: 'ord', event: 'sortHandle'
        },
        resizable: true,
        minWidth: 80,
        tip: { open: true, text: '日期日期日期日期日期日期' }
    },
    {
        key: 'strategyStatus',
        text: '策略状态',
        fixed: 'left',
        align: 'center'
    },
    {
        key: 'strategyTime',
        text: '策略推送时间',
        width: 320
    },
    {
        key: 'executeTime',
        text: '应执行时间',
        width: 280
    }
];
const dataGroup = [
    {
        id: 'xz',
        groupName: '闲置',
        open: true,
        children: [
            {
                id: '000000',
                name: { text: '青阳万达广场0闲置闲置闲置闲置闲置闲置闲置闲置闲置' },
                date: { text: '2020.08.10' },
                strategyStatus: { text: '已执行', dot: '#4eb1fd' },
                strategyTime: { text: '06:30' },
                executeTime: { text: '01:10' },
                checked: 'checked'
            },
            {
                id: '001111',
                name: { text: '青阳万达广场1' },
                date: { text: '2020.08.11' },
                strategyStatus: { text: '未执行', dot: '#f76b64' },
                strategyTime: { text: '06:30' },
                executeTime: { text: '01:10' }
            },
            {
                id: '002222',
                name: { text: '青阳万达广场2' },
                date: { text: '2020.08.12' },
                strategyStatus: { text: '审核中', dot: '#14e1c6' },
                strategyTime: { text: '06:30' },
                executeTime: { text: '01:10' }
            }
        ]
    },
    {
        id: 'jcz',
        groupName: '检测中',
        children: [
            {
                id: '000000',
                name: { text: '青阳万达广场0检测中' },
                date: { text: '2020.08.10' },
                strategyStatus: { text: '已执行', dot: '#4eb1fd' },
                strategyTime: { text: '06:30' },
                executeTime: { text: '01:10' }
            },
            {
                id: '001111',
                name: { text: '青阳万达广场1' },
                date: { text: '2020.08.11' },
                strategyStatus: { text: '未执行', dot: '#f76b64' },
                strategyTime: { text: '06:30' },
                executeTime: { text: '01:10' }
            },
            {
                id: '002222',
                name: { text: '青阳万达广场2' },
                date: { text: '2020.08.12' },
                strategyStatus: { text: '审核中', dot: '#14e1c6' },
                strategyTime: { text: '06:30' },
                executeTime: { text: '01:10' }
            }
        ]
    },
    {
        id: 'syz',
        groupName: '使用中',
        children: [
            {
                id: '000000',
                name: { text: '青阳万达广场0使用中' },
                date: { text: '2020.08.10' },
                strategyStatus: { text: '已执行', dot: '#4eb1fd' },
                strategyTime: { text: '06:30' },
                executeTime: { text: '01:10' }
            },
            {
                id: '001111',
                name: { text: '青阳万达广场1' },
                date: { text: '2020.08.11' },
                strategyStatus: { text: '未执行', dot: '#f76b64' },
                strategyTime: { text: '06:30' },
                executeTime: { text: '01:10' }
            },
            {
                id: '002222',
                name: { text: '青阳万达广场2' },
                date: { text: '2020.08.12' },
                strategyStatus: { text: '审核中', dot: '#14e1c6' },
                strategyTime: { text: '06:30' },
                executeTime: { text: '01:10' }
            }
        ]
    }
];

export default {
    name: 'TableGridView',
    data() {
        return {
            header1: [],
            header4,
            header5,
            statistics,
            data1: [],
            data4,
            topButton,
            rowTools,
            height: 500,
            dataSelect1: JSON.parse(JSON.stringify(dataSelect)),
            headerMul,
            dataMul,
            headerGroup,
            dataGroup
        };
    },
    mounted() {
        this.header1 = header;
        setTimeout(() => {
            this.data1 = data;
        }, 0);
    },
    methods: {
        screenHandle(key, id, parentKey) {
            console.log('筛选::', key, id, parentKey);
        },
        sortHandle(status, key) {
            console.log('status::', status, '  ', 'key::', key);
        },
        selectHandle(ids, data) {
            console.log(ids, data);
        },
        topButtonHandle(id) {
            console.log('顶部按钮回调::', id);
        },
        rowToolHandle({ itemId, toolId }) {
            console.log('每列操作回调::', itemId, toolId);
        },
        noteHandle(item) {
            console.log('noteHandle', item);
        },
        monthHandle(obj) {
            console.log('点击月的自定义函数::', obj);
        }
    }
};
</script>

### Attributes

| 参数     | 说明    | 类型    | 默认值   | 必须  |
| ------- | ----    | ------  | ------- | ------|
| width    | 宽度(如果设置为`100%`，组件会基于父级标签撑满并自动分配没有设置固定宽度的列的宽度) | String/Number | 500    | no     |
| height    | 高度 | String | auto     | no     |
| maxHeight    | 最大高度 | String | ''     | no     |
| loading    | 设置loading | Boolean | false    | no     |
| checkbox    | 是否多选 | Boolean | false    | no     |
| checkboxDisabled    | 是否禁用头部checkbox | Boolean | false    | no     |
| border    | 是否显示竖向边框 | Boolean | false     | no     |
| setting    | 开启设置 | Boolean | false     | no     |
| draggable    | 开启设置列表可多动排序 | Boolean | false     | no     |
| sortAjax    | 是否后端排序 | Boolean | false     | no     |
| header    | table头部数据 | Array | []     | yes     |
| statistics    | 行头数据，详见以下statistics说明 | Object | {}     | no     |
| data    | table主体数据 | Array | []     | no     |
| topButton    | 头部选中数据的操作按钮组 | Array | []     | no     |
| rowTools    | 每行的回调工具 | Object | []     | no     |
| average    | 每列的默认宽度 | Number, String | 80     | no     |
| render    | 设置用户渲染数据，设置为custom表示自定义渲染 | String | ''     | no     |
| openSelect    | 开启选中单行效果 | Boolean | false     | no     |
| rowNumber    | 开启显示行号 | Boolean | false     | no     |
| rowNumberName    | 行号名字 | Number, String | '#'     | no     |
| dimension    | 开启双行表头 | Boolean | false     | no     |
| bodyBgColor    | 开启双行表头后表体数据背景颜色和表头一样| Boolean | true     | no     |
| groupName    | 表体分组名称| String | ''     | no     |
| @select    | checkbox状态改变回调 | Function | (status) => {}     | no     |
| @resizableHandle    | 当前拖动的宽度 | Function | (w, colWidth) => {}     | no     |
| @rowClick    | 点击行的回调，注意 需要设置data中的link为true | Function | (item) => {}     | no     |
| @settingChange    | 点击设置确定的回调，type返回confirm | Function | (item, type) => {}     | no     |
| @settingCancel    | 点击设置底部按钮的回调，type返回cancel | Function | (type) => {}     | no     |
| @settingReset    | 点击设置底部按钮的回调，type返回reset | Function | (type) => {}     | no     |
| key    | 唯一标识符，当一个标签下使用多个TableGrid时，建议加上该属性 | String | ''     | no     |

### 提示说明

::: danger 警告
    该组件单页在理论情况(即页面只存在TableGrid) header数据为8条，data数据为400条渲染没毛病，当前情况下data数据达到500条会有明显卡顿
:::

::: tip 建议
    为了更好的视觉效果：
    height和maxHeight只需设置一个即可
    建议不要把合并列的项放到首列或尾列
:::

::: tip 若需强制重置数据，请调用以下方法，以下方法会重新初始化并覆盖TableGrid组件数据
    1.重置header数据：this.$refs.xxx.resetHeaderData(headerData);
    2.重置data数据：this.$refs.xxx.resetTableData(tableData);
    3.其他说明：
        由于此组件初始化的时候会在mounted保存一次历史数据，后续操作会依赖保存的历史数据进行计算，
        如需修改、重置数据可调用此方法
:::

::: warning 注意
    1.设置了合并列时不支持排序
    2.合并列的数据在data中必须跟随
    3.event为自定义事件名称
    4.disabled设置禁用
    5.text为显示的字符串（内容）
    6.自定义事件返回的是传入的id值或状态
    7.若有自定义事件必须将事件传递给组件
    8.header数据中建议保留最后一项不设置固定宽度
:::

::: tip header数据说明
     1.item中的key属性值对应data中的key
     2.item中的sort设置排序规则，其中demo中所使用的[event: 'sortHandle']是组件提交给父级的自定义函数名称，
        (1)用户可自行定义event名称，status 取值['', 'seq', 'ord']，默认为空、seq-正序、ord-倒序，设置closeDefault为true不支持回到默认;
        (2)如果初始化传入的有多个排序，默认排序高亮状态以header数据中的第一个排序规则为准;
        (3)默认是按照字符串排序，type取值范围`string/number/date`
        (4)open-开启dom显示
        (5)event-开启注册排序函数
        (6)若需要默认排序，请设置一个status的值，如果组件在遍历的时候没有找到设置的status，默认不会进行排序
     3.item中的rowSpan设置合并，是一个二维数组，【rowSpan: [[1, 4], [7, 9]]】表示合并索引为1到索引为4、合并索引为7到索引为9的列，如果设置了rowSpan不支持排序
     4.item中的checked设置列显示隐藏，可选值['checked', 'uncheck']
     5.item中的align设置列对齐方式，可选值['left', 'right', 'center']
     6.item中的width设置宽度
     6.item中设置resizable: true开启拖动表头改变宽度
     6.item中设置hover: true开启鼠标hover到文字上标称blue-500
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

::: tip statistics数据说明
    1.数据中的key对应header中key属性值，同以下data
    2.open设置显示统计数据
:::

::: tip data数据说明
     1.item中的key对应header中的key属性值
     2.item中key的text属性为table中显示的值，dot设置text左边显示点的颜色，color设置text的颜色
     3.item中link设置鼠标指针为手型，并开启点击行回调
     4.item中tools设置每列操作的数据
     5.item中childrenEvent设置表体children每项的点击事件
     6.item中对应key的children：
        (1)子项item的属性headerKey对应header数据children的key
:::

::: tip data: tools数据格式
     1.data: [ // 操作数据
         { id: 'tjbm', name: '添加部门', disabled: true },
         { id: 'tjgw', name: '添加岗位', disabled: true },
         { id: 'bj', name: '编辑' },
         { id: 'sc', name: '删除' }
     ],
     2.moreOpen: true, // 开启更多
     3.moreId: '',
     4.more: [ // 更多数据
         { id: 'm1', name: 'more1', disabled: true },
         { id: 'm2', name: 'more2' },
         { id: 'm3', name: 'more3' }
     ]
:::

::: tip rowTools数据说明
     1.open: true, // 开启显示操作
     2.fixed: 'right', // 与header数据的fixed一样
     3.width: 380, // 与header数据的width一样
     4.align: '', // 与header数据的align一样
     5.text: '', // 头部显示的文字，默认是操作
     6.moreOpen: true,
     7.event: 'rowToolHandle'     
     rowToolHandle({ itemId, toolId }) {
         console.log('每列操作回调::', itemId, toolId);
     }
:::

::: tip topButton数据说明
     1.type为Button组件的type属性
     2.text为当前icon显示的名称
     3.event为自定义事件的名称
     4.this.$refs.xxx.closeTopBar(); 关闭顶栏bar
:::

::: danger 自定义内容（插槽）
     请对照示例查看
     返回参数
     headerKey：header数据中的key
     rowIndex：行索引
     colIndex：列索引
     item：当前项
:::

::: tip 配合SidebarCustom使用
     当手动拖动SidebarCustom改变侧边栏宽度时，SidebarCustom会出发change事件，
     此时页面宽度改变需要手动调用TableGrid的重新计算列宽函数`this.$refs.xxx.resizeTableWidth()`
:::
