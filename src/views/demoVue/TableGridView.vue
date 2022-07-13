<template>
    <div class="tableGridView">
        <!--render="custom"-->
        <!--:statistics="statistics"-->
<!--        :rowTools="rowTools"-->
<!--        :dimension="true"-->
<!--        groupName="groupName"-->

<!--        :statistics="statisticsDimension"-->
<!--        :dimension="true"-->
<!--        :checkbox="true"-->
<!--        render="custom"-->
<!--        <TableGrid
            width="100%"
            maxHeight="300"
            :sortAjax="true"
            :border="true"
            :header="header7"
            :data.sync="data7"
            :rowNumber="true"
            :dimension="true"
            rowNumberName="序号"
            @monthHandle="monthHandle"
            @screenHandle="screenHandle"
            @rowClick="rowClick"
            key="tableGrid1"
        >
            <template v-for="th in header4" #[th.key]="{item}">
                <span :key="th.key" class="span-text">{{item.item[item.headerKey].text}}</span>
            </template>
        </TableGrid>-->
        <br><br><br>
        <TableGrid
            width="100%"
            :maxHeight="height"
            :checkbox="true"
            :border="true"
            :setting="true"
            :header="header4"
            :data.sync="data4"
            :rowNumber="true"
            :dimension="false"
            @monthHandle="monthHandle"
            key="tableGrid12"
        />

        <!--
        <h3 class="components-title-h3">分组/展开行</h3>
        <TableGrid
                width="1200"
                maxHeight="500"
                :checkbox="true"
                :header="headerGroup"
                :data.sync="dataGroup"
                groupName="groupName"
                key="tableGridGroup"
            >
            <template v-for="th in header4" #[th.key]="{item}">
                <span :key="th.key" class="span-text">{{item.item[item.headerKey].text}}</span>
            </template>
        </TableGrid>
        <br><br><br><br>
        <br>        <br>        <br>
        <Button @click="changeDataCheck">修改data</Button>
        <br>        <br>        <br>

        <TableGrid
                width="1200"
                :maxHeight="300"
                :checkbox="true"
                :border="true"
                :setting="true"
                :openSelect="true"
                :topButton="topButton"
                :header="header"
                :data.sync="data"
                :rowNumber="true"
                :statistics="statistics"
                @sortHandle="sortHandle"
                @select="selectHandle"
                @screenHandle="screenHandle"
                @settingReset="settingReset"
                @rowToolHandle="rowToolHandle"
                @resizableHandle="resizableHandle"
                @topButtonHandle="topButtonHandle"
                @monthHandle="monthHandle"
                key="tableGrid"
                ref="tableGrid"
            >
            <template v-for="th in header4" #[th.key]="{item}">
                <span class="span-text">{{item.item[item.headerKey].text}}</span>
            </template>
        </TableGrid>
        -->

        <!--
        <Button @click="aaaFn()">aaaaaaaaaaaaaaa</Button>

        <TableGrid
                width="1200"
                maxHeight="400"
                :checkbox="true"
                :border="true"
                :sortAjax="false"
                :header="header2"
                :data="dataMarge"
                @sortHandle="sortHandle"
                @topButtonHandle="topButtonHandle"
                @rowToolHandle="rowToolHandle"
                key="tableGrid3"
        />
        <br><br><br><br>
        <TableGrid
                width="600"
                maxHeight="400"
                average="150"
                :header="header4"
                :data="data4"
                @sortHandle="sortHandle"
                key="tableGrid4"
        />
        <TableGrid
            render="custom"
            width="600"
            maxHeight="400"
            average="150"
            :header="header4"
            :data="data4"
            @sortHandle="sortHandle"
            key="tableGrid44"
        >
            <template v-for="th in header4" #[th.key]="{item}">
                <span class="span-text">{{item.item[item.headerKey].text}}</span>
            </template>
        </TableGrid>
        -->
    </div>
</template>

<script>
import CreateTableGridJson from 'createTableGridJson';
import CreateJson from 'tableGridJson';

const { header, data } = CreateTableGridJson(15);

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
        // fixed: 'left',
        align: 'center',
        screen: {
            status: 'multiple', // 筛选4种状态【'single', 'multiple', 'singleSearch', 'multipleSearch'】
            open: true,
            data: [
                // { id: 'all', name: '全部' },
                { id: 'executed', name: '已执行', checked: 'checked' },
                { id: 'non-execution', name: '未执行' },
                { id: 'audit', name: '审核中' },
                { id: 'has-approval', name: '已审批' }
            ],
            event: 'screenHandle'
        }
    },
    {
        key: 'strategyTime',
        text: '策略推送时间',
        // width: 272,
        children: [
            {
                key: 'strategyTimeMonth1',
                text: '1月',
                color: 'red',
                screen: {
                    status: 'single', // 筛选4种状态【'single', 'multiple', 'singleSearch', 'multipleSearch'】
                    open: true,
                    icon: 'triangle', // screen triangle
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
            {
                key: 'strategyTimeMonth2',
                text: '2月',
                sort: {
                    open: true, type: 'number', status: 'ord', event: 'sortHandle'
                }
            },
            { key: 'strategyTimeMonth3', text: '3月' },
            { key: 'strategyTimeMonth4', text: '4月' }
        ]
    },
    {
        key: 'executeTime',
        text: '应执行时间',
        // width: 320,
        children: [
            { key: 'executeTimeMonth1', text: '1月' },
            { key: 'executeTimeMonth2', text: '2月' },
            { key: 'executeTimeMonth3', text: '3月' },
            { key: 'executeTimeMonth4', text: '4月' }
        ]
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
        // fixed: 'left',
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
const header2 = [
    {
        key: 'name',
        text: '项目名称',
        fixed: 'left',
        sort: { open: true, event: 'sortHandle' }
    },
    {
        key: 'date',
        text: '日期',
        sort: { open: true, event: 'sortHandle', type: 'date' }
    },
    {
        key: 'strategyStatus',
        text: '策略状态'
    },
    {
        key: 'strategyTime',
        text: '策略推送时间',
        sort: { open: true, event: 'sortHandle' }
    },
    {
        key: 'executeTime',
        text: '应执行时间'
    },
    {
        key: 'dataStatus',
        text: '数据状态'
    },
    {
        key: 'viscosityTemperature',
        text: '室内最高温度(℃)',
        sort: { open: true, event: 'sortHandle' }
    },
    {
        key: 'outdoorTemperature',
        text: '室外温度(℃)'
    }
];
const header4 = [
    {
        key: 'name',
        text: '姓名',
        align: 'center',
        fixed: 'left'
    },
    {
        key: 'sex',
        text: '性别',
        align: 'center',
        sort: { open: true, event: 'sortHandle' }
    },
    {
        key: 'age',
        text: '年龄',
        align: 'center',
        sort: { open: true, event: 'sortHandle', type: 'number' }
    },
    {
        key: 'job',
        text: '工作',
        // align: 'center',
        fixed: 'right'
    }
];
const data1 = [
    {
        id: '000000',
        name: { text: '青阳万达广场0青阳万达广场0青阳万达广场0青阳万达广场0青阳万达广场0' },
        date: { text: '2020.08.10' },
        strategyStatus: { text: '已执行', dot: '#4eb1fd' },
        childrenEvent: 'monthHandle',
        strategyTime: {
            text: '06:30',
            children: [
                { headerKey: 'strategyTimeMonth1', text: '1', color: 'red' },
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
        },
        tools: {
            data: [
                { id: 'tjbm', name: '添加部门' },
                { id: 'tjgw', name: '添加岗位' },
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
        },
        tools: {
            data: [
                { id: 'tjbm', name: '添加部门' },
                { id: 'tjgw', name: '添加岗位' },
                { id: 'bj', name: '编辑' },
                { id: 'sc', name: '删除' }
            ],
            moreOpen: true,
            moreId: '',
            more: [
                { id: 'm1', name: 'more1' },
                { id: 'm2', name: 'more2' },
                { id: 'm3', name: 'more3' }
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
        },
        tools: {
            data: [
                { id: 'tjbm', name: '添加部门' },
                { id: 'tjgw', name: '添加岗位' },
                { id: 'bj', name: '编辑' },
                { id: 'sc', name: '删除' }
            ],
            moreOpen: true,
            moreId: '',
            more: [
                { id: 'm1', name: 'more1' },
                { id: 'm2', name: 'more2' },
                { id: 'm3', name: 'more3' }
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
        },
        tools: {
            data: [
                { id: 'tjbm', name: '添加部门' },
                { id: 'tjgw', name: '添加岗位' },
                { id: 'bj', name: '编辑' },
                { id: 'sc', name: '删除' }
            ],
            moreOpen: true,
            moreId: '',
            more: [
                { id: 'm1', name: 'more1' },
                { id: 'm2', name: 'more2' },
                { id: 'm3', name: 'more3' }
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
        },
        tools: {
            data: [
                { id: 'tjbm', name: '添加部门' },
                { id: 'tjgw', name: '添加岗位' },
                { id: 'bj', name: '编辑' },
                { id: 'sc', name: '删除' }
            ],
            moreOpen: true,
            moreId: '',
            more: [
                { id: 'm1', name: 'more1' },
                { id: 'm2', name: 'more2' },
                { id: 'm3', name: 'more3' }
            ]
        }
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
        sex: { text: '--' },
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
const data5 = [
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
const topButton = [
    {
        id: 'btn0', text: '删除', type: 'default', event: 'topButtonHandle'
    },
    {
        id: 'btn1', text: '下载', type: 'primary', event: 'topButtonHandle'
    }
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
const statisticsDimension = {
    open: true,
    id: 'statistics-id',
    name: { text: '50' },
    serverData: { text: '2020.08.11' },
    collectorData: { text: '未执行', dot: '#f76b64' },
    sensorData: { text: '06:31' }
};

// 列操作数据
const rowTools = {
    open: true, // 开启显示操作
    openSelectedDisable: true, // 开启选中后禁用操作栏item
    fixed: 'right', // 与header数据的fixed一样
    width: 380, // 与header数据的width一样
    align: '', // 与header数据的align一样
    text: '', // 头部显示的文字，默认是操作
    moreOpen: true,
    event: 'rowToolHandle'
};

const header666 = [
    {
        key: 'meterId',
        text: '仪表ID',
        fixed: 'left',
        sort: {
            open: true, type: 'date', status: 'ord', event: 'sortHandle'
        },
        resizable: true,
        width: 120
    }, { key: 'meterName', text: '仪表名称', fixed: 'left' }, {
        key: 'fillDataType', text: '填报数据类型', fixed: 'left', width: 120
    }, {
        key: 'ratio', text: '变比', fixed: 'left', width: 120
    }, {
        key: 'dateKey',
        text: '2020-01-01 00:00:00',
        children: [{
            key: '2020-01-01 00:00:00',
            text: '2020-01-01 00:00:00',
            screen: {
                status: 'single', open: true, icon: 'triangle', data: [{ id: 'bj', name: '编辑数据' }, { id: 'pz', name: '查看凭证' }, { id: 'sx', name: '升序' }, { id: 'jx', name: '降序' }], event: 'screenHandle'
            },
            tip: { open: false, text: '未提交数据', iconColor: 'red-500' },
            voucherList: []
        }, {
            key: '2020-02-01 00:00:00',
            text: '2020-02-01 00:00:00',
            screen: {
                status: 'single', open: true, icon: 'triangle', data: [{ id: 'bj', name: '编辑数据' }, { id: 'pz', name: '查看凭证' }, { id: 'sx', name: '升序' }, { id: 'jx', name: '降序' }], event: 'screenHandle'
            },
            tip: { open: false, text: '未提交数据', iconColor: 'red-500' },
            voucherList: []
        }, {
            key: '2020-03-01 00:00:00',
            text: '2020-03-01 00:00:00',
            screen: {
                status: 'single', open: true, icon: 'triangle', data: [{ id: 'bj', name: '编辑数据' }, { id: 'pz', name: '查看凭证' }, { id: 'sx', name: '升序' }, { id: 'jx', name: '降序' }], event: 'screenHandle'
            },
            tip: { open: false, text: '未提交数据', iconColor: 'red-500' },
            voucherList: []
        }, {
            key: '2020-04-01 00:00:00',
            text: '2020-04-01 00:00:00',
            screen: {
                status: 'single', open: true, icon: 'triangle', data: [{ id: 'bj', name: '编辑数据' }, { id: 'pz', name: '查看凭证' }, { id: 'sx', name: '升序' }, { id: 'jx', name: '降序' }], event: 'screenHandle'
            },
            tip: { open: false, text: '未提交数据', iconColor: 'red-500' },
            voucherList: []
        }, {
            key: '2020-05-01 00:00:00',
            text: '2020-05-01 00:00:00',
            screen: {
                status: 'single', open: true, icon: 'triangle', data: [{ id: 'bj', name: '编辑数据' }, { id: 'pz', name: '查看凭证' }, { id: 'sx', name: '升序' }, { id: 'jx', name: '降序' }], event: 'screenHandle'
            },
            tip: { open: false, text: '未提交数据', iconColor: 'red-500' },
            voucherList: []
        }, {
            key: '2020-06-01 00:00:00',
            text: '2020-06-01 00:00:00',
            screen: {
                status: 'single', open: true, icon: 'triangle', data: [{ id: 'bj', name: '编辑数据' }, { id: 'pz', name: '查看凭证' }, { id: 'sx', name: '升序' }, { id: 'jx', name: '降序' }], event: 'screenHandle'
            },
            tip: { open: false, text: '未提交数据', iconColor: 'red-500' },
            voucherList: []
        }, {
            key: '2020-07-01 00:00:00',
            text: '2020-07-01 00:00:00',
            screen: {
                status: 'single', open: true, icon: 'triangle', data: [{ id: 'bj', name: '编辑数据' }, { id: 'pz', name: '查看凭证' }, { id: 'sx', name: '升序' }, { id: 'jx', name: '降序' }], event: 'screenHandle'
            },
            tip: { open: false, text: '未提交数据', iconColor: 'red-500' },
            voucherList: []
        }, {
            key: '2020-08-01 00:00:00',
            text: '2020-08-01 00:00:00',
            screen: {
                status: 'single', open: true, icon: 'triangle', data: [{ id: 'bj', name: '编辑数据' }, { id: 'pz', name: '查看凭证' }, { id: 'sx', name: '升序' }, { id: 'jx', name: '降序' }], event: 'screenHandle'
            },
            tip: { open: false, text: '未提交数据', iconColor: 'red-500' },
            voucherList: []
        }, {
            key: '2020-09-01 00:00:00',
            text: '2020-09-01 00:00:00',
            screen: {
                status: 'single', open: true, icon: 'triangle', data: [{ id: 'bj', name: '编辑数据' }, { id: 'pz', name: '查看凭证' }, { id: 'sx', name: '升序' }, { id: 'jx', name: '降序' }], event: 'screenHandle'
            },
            tip: { open: false, text: '未提交数据', iconColor: 'red-500' },
            voucherList: []
        }, {
            key: '2020-10-01 00:00:00',
            text: '2020-10-01 00:00:00',
            screen: {
                status: 'single', open: true, icon: 'triangle', data: [{ id: 'bj', name: '编辑数据' }, { id: 'pz', name: '查看凭证' }, { id: 'sx', name: '升序' }, { id: 'jx', name: '降序' }], event: 'screenHandle'
            },
            tip: { open: false, text: '未提交数据', iconColor: 'red-500' },
            voucherList: []
        }, {
            key: '2020-11-01 00:00:00',
            text: '2020-11-01 00:00:00',
            screen: {
                status: 'single', open: true, icon: 'triangle', data: [{ id: 'bj', name: '编辑数据' }, { id: 'pz', name: '查看凭证' }, { id: 'sx', name: '升序' }, { id: 'jx', name: '降序' }], event: 'screenHandle'
            },
            tip: { open: false, text: '未提交数据', iconColor: 'red-500' },
            voucherList: [{
                fileName: '龙湖人工填报-后台程序设计-20201014.doc', createTime: '2020-11-11 16:58:34', fileId: '1605085914678龙湖人工填报-后台程序设计-20201014.doc', uploadUser: 'app1'
            }, {
                fileName: '龙湖人工填报-后台程序设计-20201014.doc', createTime: '2020-11-11 04:47:28', fileId: '/upload/meos/1605084693243龙湖人工填报-后台程序设计-20201014.doc', uploadUser: 'app1'
            }]
        }]
    }
];
const data666 = [
    {
        id: '45643543',
        meterId: { text: '45643543' },
        meterName: { text: '电表3' },
        energyType: { text: '电' },
        fillDataType: { text: '表底数' },
        ratio: { text: 1 },
        childrenEvent: 'monthHandle',
        dateKey: {
            text: '06:30',
            children: [{
                headerKey: '2020-01-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-02-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-03-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-04-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-05-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-06-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-07-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-08-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-09-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-10-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-11-01 00:00:00',
                text: 123,
                color: 'red',
                fileList: [{
                    fileName: 'defaultImage.png', createTime: '2020-11-11 04:47:17', fileId: '/upload/meos/1605085087971defaultImage.png', uploadUser: 'app1'
                }, {
                    fileName: 'defaultImage.png', createTime: '2020-11-11 04:47:17', fileId: '1605085087971defaultImage.png', uploadUser: 'app1'
                }]
            }]
        }
    }, {
        id: '432424',
        meterId: { text: '432424' },
        meterName: { text: '23424' },
        energyType: { text: '电' },
        fillDataType: { text: '表底数' },
        ratio: { text: 1 },
        childrenEvent: 'monthHandle',
        dateKey: {
            text: '06:30',
            children: [{
                headerKey: '2020-01-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-02-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-03-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-04-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-05-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-06-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-07-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-08-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-09-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-10-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-11-01 00:00:00', text: null, color: 'red', fileList: []
            }]
        }
    }, {
        id: '44444',
        meterId: { text: '44444' },
        meterName: { text: '水表' },
        energyType: { text: '电' },
        fillDataType: { text: '表底数' },
        ratio: { text: 1 },
        childrenEvent: 'monthHandle',
        dateKey: {
            text: '06:30',
            children: [{
                headerKey: '2020-01-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-02-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-03-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-04-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-05-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-06-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-07-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-08-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-09-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-10-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-11-01 00:00:00', text: null, color: 'red', fileList: []
            }]
        }
    }, {
        id: '4534539',
        meterId: { text: '4534539' },
        meterName: { text: '45435' },
        energyType: { text: '电' },
        fillDataType: { text: '表底数' },
        ratio: { text: 1 },
        childrenEvent: 'monthHandle',
        dateKey: {
            text: '06:30',
            children: [{
                headerKey: '2020-01-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-02-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-03-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-04-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-05-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-06-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-07-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-08-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-09-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-10-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-11-01 00:00:00', text: null, color: 'red', fileList: []
            }]
        }
    }, {
        id: '343242',
        meterId: { text: '343242' },
        meterName: { text: '432423' },
        energyType: { text: '电' },
        fillDataType: { text: '表底数' },
        ratio: { text: 1 },
        childrenEvent: 'monthHandle',
        dateKey: {
            text: '06:30',
            children: [{
                headerKey: '2020-01-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-02-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-03-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-04-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-05-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-06-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-07-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-08-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-09-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-10-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-11-01 00:00:00', text: null, color: 'red', fileList: []
            }]
        }
    }, {
        id: '121213333333333',
        meterId: { text: '121213333333333' },
        meterName: { text: 'eqwewq' },
        energyType: { text: '电' },
        fillDataType: { text: '表底数' },
        ratio: { text: 1 },
        childrenEvent: 'monthHandle',
        dateKey: {
            text: '06:30',
            children: [{
                headerKey: '2020-01-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-02-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-03-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-04-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-05-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-06-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-07-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-08-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-09-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-10-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-11-01 00:00:00', text: null, color: 'red', fileList: []
            }]
        }
    }, {
        id: '4534534',
        meterId: { text: '4534534' },
        meterName: { text: '543534' },
        energyType: { text: '电' },
        fillDataType: { text: '表底数' },
        ratio: { text: 1 },
        childrenEvent: 'monthHandle',
        dateKey: {
            text: '06:30',
            children: [{
                headerKey: '2020-01-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-02-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-03-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-04-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-05-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-06-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-07-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-08-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-09-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-10-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-11-01 00:00:00', text: null, color: 'red', fileList: []
            }]
        }
    }, {
        id: '3452454',
        meterId: { text: '3452454' },
        meterName: { text: '电表1' },
        energyType: { text: '电' },
        fillDataType: { text: '表底数' },
        ratio: { text: 1 },
        childrenEvent: 'monthHandle',
        dateKey: {
            text: '06:30',
            children: [{
                headerKey: '2020-01-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-02-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-03-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-04-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-05-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-06-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-07-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-08-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-09-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-10-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-11-01 00:00:00', text: null, color: 'red', fileList: []
            }]
        }
    }, {
        id: '4534536',
        meterId: { text: '4534536' },
        meterName: { text: '435435' },
        energyType: { text: '电' },
        fillDataType: { text: '表底数' },
        ratio: { text: 1 },
        childrenEvent: 'monthHandle',
        dateKey: {
            text: '06:30',
            children: [{
                headerKey: '2020-01-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-02-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-03-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-04-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-05-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-06-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-07-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-08-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-09-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-10-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-11-01 00:00:00', text: null, color: 'red', fileList: []
            }]
        }
    }, {
        id: '3452456',
        meterId: { text: '3452456' },
        meterName: { text: '电表2' },
        energyType: { text: '电' },
        fillDataType: { text: '表底数' },
        ratio: { text: 4 },
        childrenEvent: 'monthHandle',
        dateKey: {
            text: '06:30',
            children: [{
                headerKey: '2020-01-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-02-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-03-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-04-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-05-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-06-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-07-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-08-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-09-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-10-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-11-01 00:00:00', text: null, color: 'red', fileList: []
            }]
        }
    }, {
        id: '4324248',
        meterId: { text: '4324248' },
        meterName: { text: '345435' },
        energyType: { text: '电' },
        fillDataType: { text: '表底数' },
        ratio: { text: 1 },
        childrenEvent: 'monthHandle',
        dateKey: {
            text: '06:30',
            children: [{
                headerKey: '2020-01-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-02-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-03-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-04-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-05-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-06-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-07-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-08-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-09-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-10-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-11-01 00:00:00', text: null, color: 'red', fileList: []
            }]
        }
    }, {
        id: '1',
        meterId: { text: '1' },
        meterName: { text: '水表' },
        energyType: { text: '电' },
        fillDataType: { text: '表底数' },
        ratio: { text: 1 },
        childrenEvent: 'monthHandle',
        dateKey: {
            text: '06:30',
            children: [{
                headerKey: '2020-01-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-02-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-03-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-04-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-05-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-06-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-07-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-08-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-09-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-10-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-11-01 00:00:00', text: null, color: 'red', fileList: []
            }]
        }
    }, {
        id: '4564435',
        meterId: { text: '4564435' },
        meterName: { text: '电表4' },
        energyType: { text: '电' },
        fillDataType: { text: '表底数' },
        ratio: { text: 2 },
        childrenEvent: 'monthHandle',
        dateKey: {
            text: '06:30',
            children: [{
                headerKey: '2020-01-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-02-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-03-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-04-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-05-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-06-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-07-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-08-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-09-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-10-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-11-01 00:00:00', text: null, color: 'red', fileList: []
            }]
        }
    }, {
        id: '34324',
        meterId: { text: '34324' },
        meterName: { text: '水表' },
        energyType: { text: '电' },
        fillDataType: { text: '表底数' },
        ratio: { text: 1 },
        childrenEvent: 'monthHandle',
        dateKey: {
            text: '06:30',
            children: [{
                headerKey: '2020-01-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-02-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-03-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-04-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-05-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-06-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-07-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-08-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-09-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-10-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-11-01 00:00:00', text: null, color: 'red', fileList: []
            }]
        }
    }, {
        id: '555555',
        meterId: { text: '555555' },
        meterName: { text: 'fghfd' },
        energyType: { text: '电' },
        fillDataType: { text: '表底数' },
        ratio: { text: 1 },
        childrenEvent: 'monthHandle',
        dateKey: {
            text: '06:30',
            children: [{
                headerKey: '2020-01-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-02-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-03-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-04-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-05-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-06-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-07-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-08-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-09-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-10-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-11-01 00:00:00', text: null, color: 'red', fileList: []
            }]
        }
    }, {
        id: '4532',
        meterId: { text: '4532' },
        meterName: { text: 'ce' },
        energyType: { text: '电' },
        fillDataType: { text: '表底数' },
        ratio: { text: 1 },
        childrenEvent: 'monthHandle',
        dateKey: {
            text: '06:30',
            children: [{
                headerKey: '2020-01-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-02-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-03-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-04-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-05-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-06-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-07-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-08-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-09-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-10-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-11-01 00:00:00', text: null, color: 'red', fileList: []
            }]
        }
    }, {
        id: '2424324',
        meterId: { text: '2424324' },
        meterName: { text: '234234' },
        energyType: { text: '电' },
        fillDataType: { text: '表底数' },
        ratio: { text: 1 },
        childrenEvent: 'monthHandle',
        dateKey: {
            text: '06:30',
            children: [{
                headerKey: '2020-01-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-02-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-03-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-04-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-05-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-06-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-07-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-08-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-09-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-10-01 00:00:00', text: null, color: 'red', fileList: []
            }, {
                headerKey: '2020-11-01 00:00:00', text: 1231, color: 'red', fileList: []
            }]
        }
    }
];

const header7 = [
    {
        key: 'name',
        text: '项目名称',
        // fixed: "left",
        align: 'center'
    },
    {
        width: '334',
        key: 'serverData',
        text: '服务器',
        align: 'center',
        // sort: {
        //     open: true,
        //     type: 'serverDatarate',
        //     status: '',
        //     event: 'serverSortHandle'
        // },
        children: [
            { key: 'serverDatatotal', text: '监控数' },
            { key: 'serverDataoffline', text: '离线数' },
            {
                key: 'serverDatarate',
                text: '离线率',
                sort: {
                    open: true,
                    type: 'number',
                    status: '',
                    event: 'serverSortHandle'
                }
            }
        ]
    },
    {
        width: '334',
        key: 'collectorData',
        text: '采集器',
        align: 'center',
        sort: {
            open: true,
            type: 'collectorDatarate',
            status: '',
            event: 'collectorSortHandle'
        },
        children: [
            { key: 'collectorDatatotal', text: '监控数' },
            { key: 'collectorDataoffline', text: '离线数' },
            { key: 'collectorDatarate', text: '离线率' }
        ]
    },
    {
        width: '334',
        key: 'sensorData',
        text: '传感器',
        align: 'center',
        sort: {
            open: true,
            type: 'sensorDatarate',
            status: '',
            event: 'sensorSortHandle'
        },
        children: [
            { key: 'sensorDatatotal', text: '监控数' },
            { key: 'sensorDataoffline', text: '离线数' },
            { key: 'sensorDatarate', text: '离线率' }
        ]
    }
];

const data7 = [
    {
        id: 0,
        name: { text: '总部工程部' },
        link: true,
        serverData: {
            text: '06:30',
            children: [{
                headerKey: 'serverDatatotal',
                text: '--'
            }, {
                headerKey: 'serverDataoffline',
                text: '--'
            }, {
                headerKey: 'serverDatarate',
                text: '--',
                rate: null
            }]
        },
        collectorData: {
            text: '06:30',
            children: [{
                headerKey: 'collectorDatatotal',
                text: '--'
            }, {
                headerKey: 'collectorDataoffline',
                text: '--'
            }, {
                headerKey: 'collectorDatarate',
                text: '--',
                rate: null
            }]
        },
        sensorData: {
            text: '06:30',
            children: [{
                headerKey: 'sensorDatatotal',
                text: '--'
            }, {
                headerKey: 'sensorDataoffline',
                text: '--'
            }, {
                headerKey: 'sensorDatarate',
                text: '1',
                rate: null
            }]
        }
    },
    {
        id: 1, name: { text: '总部综管部' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 2, name: { text: '32132132131' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 3, name: { text: '总部物业部' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 4, name: { text: '总部安品部' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 5, name: { text: '呼市回民区万达广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 6, name: { text: '总部联合检查项目' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 7, name: { text: '我是存神2' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 8, name: { text: '延安吾悦广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 9, name: { text: '惠州大亚湾万达广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 10, name: { text: '青岛CBD万达广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 11, name: { text: '荆州万达广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 12, name: { text: '人工填报测试1' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 13, name: { text: '长春绿园吾悦广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 14, name: { text: '常州吾悦国际广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 15, name: { text: '测试项目2' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 16, name: { text: '南昌八一万达广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 17, name: { text: '上海松江万达广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 18, name: { text: '榆林万达广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 19, name: { text: '通辽万达广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 20, name: { text: '博锐尚格北京总部' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 21, name: { text: 'leoText' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 22, name: { text: '北京万达' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 23, name: { text: '新建项目广场01' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 24, name: { text: '连云港海州吾悦广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 25, name: { text: '包头东河吾悦广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 26, name: { text: '南通如皋吾悦广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 27, name: { text: '淮安生态新城吾悦广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 28, name: { text: '苏州吴江吾悦广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 29, name: { text: '长春北湖吾悦广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 30, name: { text: '唐山吾悦广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 31, name: { text: '上海华泾天街' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 32, name: { text: '南京建邺吾悦广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 33, name: { text: '包头昆区吾悦广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 34, name: { text: '人工填报测试2' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 35, name: { text: '冷站测试项目UB馆' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 36, name: { text: '镇江丹阳吴悦广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 37, name: { text: '重庆源著' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 38, name: { text: '重庆AB馆' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 39, name: { text: '南通启东吾悦广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 40, name: { text: '桂林高新万达广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 41, name: { text: '金华义乌吾悦广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 42, name: { text: '义乌万达广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 43, name: { text: '新城集中测试专用' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 44, name: { text: '南京鼓楼吾悦广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 45, name: { text: '金隅智慧工厂' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 46, name: { text: '哈尔滨融创茂商业' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 47, name: { text: '成都金牛万达广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 48, name: { text: '测试项目' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 49, name: { text: '苏州狮山天街' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 50, name: { text: '张家港万达广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 51, name: { text: '租户测试项目4' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 52, name: { text: '承接查验验收项目' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 53, name: { text: '上海闵行天街' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 54, name: { text: '西安民乐园万达广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 55, name: { text: '上海五角场万达广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 56, name: { text: '西安高新万达广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 57, name: { text: '昆明雪世界' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 58, name: { text: '咸阳丽彩万达广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 59, name: { text: '昆明融创茂商业街' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 60, name: { text: '昆明海世界' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 61, name: { text: '新项目广场01' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 62, name: { text: '成都龙泉吾悦广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 63, name: { text: '新项目广场1' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 64, name: { text: '测试环境万达-租户' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 65, name: { text: '冷站测试项目AB馆' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 66, name: { text: 'abc' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 67, name: { text: '租户测试项目2' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 68, name: { text: '新项目广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 69, name: { text: '租户测试项目' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 70, name: { text: '我是存神' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 71, name: { text: '上海青浦吾悦广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 72, name: { text: '哈尔滨哈西吾悦广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 73, name: { text: '商洛万达广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 74, name: { text: '华润生命科学园' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 75, name: { text: '常州金坛吾悦广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 76, name: { text: '常州万博时尚广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 77, name: { text: '人工填报测试3' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 78, name: { text: '陕西渭南万达广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 79, name: { text: '西双版纳傣秀剧场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 80, name: { text: '项目2' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 81, name: { text: '评分数据' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 82, name: { text: '天津津南吾悦广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }, {
        id: 83, name: { text: '连云港赣榆吾悦广场' }, serverData: { text: '06:30', children: [{ headerKey: 'serverDatatotal', text: '--' }, { headerKey: 'serverDataoffline', text: '--' }, { headerKey: 'serverDatarate', text: '--', rate: null }] }, collectorData: { text: '06:30', children: [{ headerKey: 'collectorDatatotal', text: '--' }, { headerKey: 'collectorDataoffline', text: '--' }, { headerKey: 'collectorDatarate', text: '--', rate: null }] }, sensorData: { text: '06:30', children: [{ headerKey: 'sensorDatatotal', text: '--' }, { headerKey: 'sensorDataoffline', text: '--' }, { headerKey: 'sensorDatarate', text: '1', rate: null }] }
    }];

export default {
    name: 'TableGridView',
    data() {
        return {
            header, // 表头
            header1, // 表头
            header2, // 表头
            header4, // 表头
            statistics, // 统计
            statisticsDimension, // 统计
            data,
            data1,
            data2: [],
            data4,
            topButton, // 顶部的button按钮
            height: 150,
            dataSelect1: JSON.parse(JSON.stringify(dataSelect)),
            dataMarge: [],
            rowTools,
            headerGroup,
            dataGroup,
            header666,
            data666,
            header7,
            data7
        };
    },
    mounted() {
        // this.header1 = header;
        setTimeout(() => {
            // this.data1 = JSON.parse(JSON.stringify(data));
            this.data2 = JSON.parse(JSON.stringify(data1));
        }, 0);
        const dataJson = CreateJson(20);
        this.dataMarge = dataJson;
    },
    methods: {
        // 筛选
        screenHandle(key, id, parentKey) {
            console.log('筛选::', key, id, parentKey);
        },
        // 排序回调
        sortHandle(status, key) {
            console.log('status::', status, '  ', 'key::', key);
            this.data2 = this.data2.reverse();
        },
        // 选中的数据
        selectHandle(ids, data) {
            console.log('选中的数据:::', ids, data);
        },
        // 顶部按钮回调
        topButtonHandle(id) {
            console.log('顶部按钮回调::', id);
        },
        // 每列操作回调
        rowToolHandle({ itemId, toolId }) {
            const { data1 } = this;
            console.log('每列操作回调::', itemId, toolId);
            const dataFilter = data1.filter(d => d.id !== itemId);
            console.log(dataFilter);
            this.data1 = dataFilter;
        },

        dataSelectChange(data) {
            console.log(data);
        },
        noteHandle(item) {
            console.log('noteHandle', item);
        },
        settingReset(type) {
            console.log('settingReset', type);
        },
        // 当前拖动的宽度
        resizableHandle(w) {
            console.log('当前拖动的宽度::', w);
        },
        // 点击月的自定义函数
        monthHandle(obj) {
            console.log('点击月的自定义函数::', obj);
        },
        aaaFn() {
            this.$refs.tableGrid.closeTopBar();
        },
        changeDataCheck() {
            this.data = [
                {
                    id: '000000',
                    name: { text: '青阳万达广场0青阳万达广场0青阳万达广场0青阳万达广场0青阳万达广场0' },
                    date: { text: '2020.08.10' },
                    strategyStatus: { text: '已执行', dot: '#4eb1fd' },
                    strategyTime: { text: '06:30' },
                    executeTime: { text: '01:10' },
                    dataStatus: { text: '异常', color: '#f00' },
                    viscosityTemperature: { text: 20 },
                    outdoorTemperature: { text: 30 },
                    checked: 'checked',
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
                    id: '001111',
                    name: { text: '青阳万达广场1' },
                    date: { text: '2020.08.11' },
                    strategyStatus: { text: '未执行', dot: '#f76b64' },
                    strategyTime: { text: '06:31' },
                    executeTime: { text: '01:11' },
                    dataStatus: { text: '正常1' },
                    viscosityTemperature: { text: 21 },
                    outdoorTemperature: { text: 31 },
                    checked: 'checked',
                    tools: {
                        data: [
                            { id: 'tjbm', name: '添加部门' },
                            { id: 'tjgw', name: '添加岗位' },
                            { id: 'bj', name: '编辑' },
                            { id: 'sc', name: '删除' }
                        ]
                    }
                },
                {
                    id: '002222',
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
                            { id: 'tjbm', name: '添加部门' },
                            { id: 'tjgw', name: '添加岗位' },
                            { id: 'bj', name: '编辑' },
                            { id: 'sc', name: '删除' }
                        ]
                    }
                },
                {
                    id: '003333',
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
                            { id: 'bj', name: '编辑' },
                            { id: 'sc', name: '删除' }
                        ]
                    }
                },
                {
                    id: '00444',
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
                            { id: 'bj', name: '编辑' },
                            { id: 'sc', name: '删除' }
                        ]
                    }
                }
            ];
        },
        rowClick(item) {
            console.log('rowClick:::', item);
        }
    }
};
</script>

<style lang="stylus">
.tableGridView
    padding 20px
.row-tool,
.span-text
    font-size 14px

</style>
