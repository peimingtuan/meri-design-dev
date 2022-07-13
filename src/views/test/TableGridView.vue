<template>
    <div class="tableGridView">
        <TableGrid
            width="1000"
            :maxHeight="height"
            :checkbox="true"
            :checkboxDisabled="true"
            :border="true"
            :setting="true"
            :openSelect="true"
            :header="header"
            :data="data"
            :statistics="statistics"
            :rowTools="rowTools"
            @sortHandle="sortHandle"
            @select="selectHandle"
            @screenHandle="screenHandle"
            @rowToolHandle="rowToolHandle"
            @rowClick="rowClick"
            key="tableGrid"
        />
    </div>
</template>

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
        sort: {
            open: true,
            type: 'date',
            event: 'sortHandle'
        },
        width: '180'
    },
    {
        key: 'strategyStatus',
        text: '策略状态',
        screen: {
            open: true,
            status: 'single', // 筛选4种状态【'single', 'multiple', 'singleSearch', 'multipleSearch'】
            data: [
                {
                    id: 'all',
                    name: '全部'
                },
                {
                    id: 'executed',
                    name: '已执行'
                },
                {
                    id: 'non-execution',
                    name: '未执行'
                },
                {
                    id: 'audit',
                    name: '审核中'
                },
                {
                    id: 'has-approval',
                    name: '已审批'
                }
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
        text: '数据状态'
        // rowSpan: [[4, 5]]
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
        strategyStatus: {
            text: '未执行',
            dot: '#f76b64'
        },
        strategyTime: { text: '06:31' },
        executeTime: { text: '01:11' },
        dataStatus: { text: '正常1' },
        viscosityTemperature: { text: 21 },
        outdoorTemperature: { text: 31 },
        link: true,
        tools: {
            data: [
                {
                    id: 'tjbm',
                    name: '添加部门',
                    disabled: true
                },
                {
                    id: 'tjgw',
                    name: '添加岗位',
                    disabled: true
                },
                {
                    id: 'bj',
                    name: '编辑'
                },
                {
                    id: 'sc',
                    name: '删除'
                }
            ],
            moreOpen: true,
            moreId: '',
            more: [
                {
                    id: 'm1',
                    name: 'more1',
                    disabled: true
                },
                {
                    id: 'm2',
                    name: 'more2'
                },
                {
                    id: 'm3',
                    name: 'more3'
                }
            ]
        }
    },
    {
        id: '000',
        name: { text: '青阳万达广场0青阳万达广场0青阳万达广场0青阳万达广场0青阳万达广场0' },
        date: { text: '2020.08.10' },
        strategyStatus: {
            text: '已执行',
            dot: '#4eb1fd'
        },
        strategyTime: { text: '06:30' },
        executeTime: { text: '01:10' },
        dataStatus: {
            text: '异常',
            color: '#f00'
        },
        viscosityTemperature: { text: 20 },
        outdoorTemperature: { text: 30 },
        tools: {
            data: [
                {
                    id: 'tjbm',
                    name: '添加部门',
                    disabled: true
                },
                {
                    id: 'tjgw',
                    name: '添加岗位',
                    disabled: true
                },
                {
                    id: 'bj',
                    name: '编辑'
                },
                {
                    id: 'sc',
                    name: '删除'
                }
            ],
            moreOpen: true,
            moreId: '',
            more: [
                {
                    id: 'm1',
                    name: 'more1',
                    disabled: true
                },
                {
                    id: 'm2',
                    name: 'more2'
                },
                {
                    id: 'm3',
                    name: 'more3'
                }
            ]
        }
    },
    {
        id: '002',
        name: { text: '青阳万达广场2' },
        date: { text: '2020.08.12' },
        strategyStatus: {
            text: '审核中',
            dot: '#14e1c6'
        },
        strategyTime: { text: '06:32' },
        executeTime: { text: '01:12' },
        dataStatus: { text: '正常2' },
        viscosityTemperature: { text: 22 },
        outdoorTemperature: { text: 32 },
        tools: {
            data: [
                {
                    id: 'tjbm',
                    name: '添加部门',
                    disabled: true
                },
                {
                    id: 'tjgw',
                    name: '添加岗位',
                    disabled: true
                },
                {
                    id: 'bj',
                    name: '编辑'
                },
                {
                    id: 'sc',
                    name: '删除'
                }
            ],
            moreOpen: true,
            moreId: '',
            more: [
                {
                    id: 'm1',
                    name: 'more1',
                    disabled: true
                },
                {
                    id: 'm2',
                    name: 'more2'
                },
                {
                    id: 'm3',
                    name: 'more3'
                }
            ]
        }
    },
    {
        id: '003',
        name: { text: '青阳万达广场3' },
        date: { text: '2020.08.13' },
        strategyStatus: {
            text: '已审批',
            dot: '#62d256'
        },
        strategyTime: { text: '06:33' },
        executeTime: { text: '01:13' },
        dataStatus: { text: '正常3' },
        viscosityTemperature: { text: 23 },
        outdoorTemperature: { text: 33 },
        tools: {
            data: [
                {
                    id: 'tjbm',
                    name: '添加部门',
                    disabled: true
                },
                {
                    id: 'tjgw',
                    name: '添加岗位',
                    disabled: true
                },
                {
                    id: 'bj',
                    name: '编辑'
                },
                {
                    id: 'sc',
                    name: '删除'
                }
            ],
            moreOpen: true,
            moreId: '',
            more: [
                {
                    id: 'm1',
                    name: 'more1',
                    disabled: true
                },
                {
                    id: 'm2',
                    name: 'more2'
                },
                {
                    id: 'm3',
                    name: 'more3'
                }
            ]
        }
    },
    {
        id: '004',
        name: { text: '青阳万达广场4' },
        date: { text: '2020.08.14' },
        strategyStatus: {
            text: '已执行',
            dot: '#4eb1fd'
        },
        strategyTime: { text: '06:34' },
        executeTime: { text: '01:14' },
        dataStatus: { text: '正常4' },
        viscosityTemperature: { text: 24 },
        outdoorTemperature: { text: 34 },
        tools: {
            data: [
                {
                    id: 'tjbm',
                    name: '添加部门',
                    disabled: true
                },
                {
                    id: 'tjgw',
                    name: '添加岗位',
                    disabled: true
                },
                {
                    id: 'bj',
                    name: '编辑'
                },
                {
                    id: 'sc',
                    name: '删除'
                }
            ],
            moreOpen: true,
            moreId: '',
            more: [
                {
                    id: 'm1',
                    name: 'more1',
                    disabled: true
                },
                {
                    id: 'm2',
                    name: 'more2'
                },
                {
                    id: 'm3',
                    name: 'more3'
                }
            ]
        }
    }
];
const dataSelect = [
    {
        id: 'test1',
        name: '选择项'
    },
    {
        id: 'test2',
        name: '单平米'
    },
    {
        id: 'test3',
        name: '下级分项'
    },
    {
        id: 'test4',
        name: '滑动平均滑动平均'
    }
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
    id: '003',
    name: { text: '青阳万达广场3' },
    date: { text: '2020.08.13' },
    strategyStatus: {
        text: '已审批',
        dot: '#62d256'
    },
    strategyTime: { text: '06:33' },
    executeTime: { text: '01:13' },
    dataStatus: { text: '正常3' },
    viscosityTemperature: { text: 23 },
    outdoorTemperature: { text: 33 },
    tools: {
        data: [
            {
                id: 'tjbm',
                name: '添加部门',
                disabled: true
            },
            {
                id: 'tjgw',
                name: '添加岗位',
                disabled: true
            },
            {
                id: 'bj',
                name: '编辑'
            },
            {
                id: 'sc',
                name: '删除'
            }
        ],
        moreOpen: true,
        moreId: '',
        more: [
            {
                id: 'm1',
                name: 'more1',
                disabled: true
            },
            {
                id: 'm2',
                name: 'more2'
            },
            {
                id: 'm3',
                name: 'more3'
            }
        ]
    }
    // id: 'statistics-id',
    // name: { text: '50' },
    // date: { text: '2020.08.11' },
    // strategyStatus: {
    //     text: '未执行',
    //     dot: '#f76b64'
    // },
    // strategyTime: { text: '06:31' },
    // executeTime: { text: '01:11' },
    // dataStatus: { text: '正常1' },
    // viscosityTemperature: { text: 21 },
    // outdoorTemperature: { text: 31 }
};

export default {
    name: 'TableGridView',
    data() {
        return {
            header, // 表头
            statistics, // 统计
            data,
            data2: [],
            height: 150,
            dataSelect1: JSON.parse(JSON.stringify(dataSelect)),
            dataMarge: [],
            rowTools
        };
    },
    mounted() {
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
        rowToolHandle({
            itemId,
            toolId
        }) {
            const { data } = this;
            console.log('每列操作回调::', itemId, toolId);
            const dataFilter = data.filter(d => d.id !== itemId);
            console.log('dataFilter===', dataFilter);
            // this.data1 = dataFilter;
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
                    strategyStatus: {
                        text: '已执行',
                        dot: '#4eb1fd'
                    },
                    strategyTime: { text: '06:30' },
                    executeTime: { text: '01:10' },
                    dataStatus: {
                        text: '异常',
                        color: '#f00'
                    },
                    viscosityTemperature: { text: 20 },
                    outdoorTemperature: { text: 30 },
                    checked: 'checked',
                    tools: {
                        data: [
                            {
                                id: 'tjbm',
                                name: '添加部门',
                                disabled: true
                            },
                            {
                                id: 'tjgw',
                                name: '添加岗位',
                                disabled: true
                            },
                            {
                                id: 'bj',
                                name: '编辑'
                            },
                            {
                                id: 'sc',
                                name: '删除'
                            }
                        ],
                        moreOpen: true,
                        moreId: '',
                        more: [
                            {
                                id: 'm1',
                                name: 'more1',
                                disabled: true
                            },
                            {
                                id: 'm2',
                                name: 'more2'
                            },
                            {
                                id: 'm3',
                                name: 'more3'
                            }
                        ]
                    }
                },
                {
                    id: '001111',
                    name: { text: '青阳万达广场1' },
                    date: { text: '2020.08.11' },
                    strategyStatus: {
                        text: '未执行',
                        dot: '#f76b64'
                    },
                    strategyTime: { text: '06:31' },
                    executeTime: { text: '01:11' },
                    dataStatus: { text: '正常1' },
                    viscosityTemperature: { text: 21 },
                    outdoorTemperature: { text: 31 },
                    checked: 'checked',
                    tools: {
                        data: [
                            {
                                id: 'tjbm',
                                name: '添加部门'
                            },
                            {
                                id: 'tjgw',
                                name: '添加岗位'
                            },
                            {
                                id: 'bj',
                                name: '编辑'
                            },
                            {
                                id: 'sc',
                                name: '删除'
                            }
                        ]
                    }
                },
                {
                    id: '002222',
                    name: { text: '青阳万达广场2' },
                    date: { text: '2020.08.12' },
                    strategyStatus: {
                        text: '审核中',
                        dot: '#14e1c6'
                    },
                    strategyTime: { text: '06:32' },
                    executeTime: { text: '01:12' },
                    dataStatus: { text: '正常2' },
                    viscosityTemperature: { text: 22 },
                    outdoorTemperature: { text: 32 },
                    tools: {
                        data: [
                            {
                                id: 'tjbm',
                                name: '添加部门'
                            },
                            {
                                id: 'tjgw',
                                name: '添加岗位'
                            },
                            {
                                id: 'bj',
                                name: '编辑'
                            },
                            {
                                id: 'sc',
                                name: '删除'
                            }
                        ]
                    }
                },
                {
                    id: '003333',
                    name: { text: '青阳万达广场3' },
                    date: { text: '2020.08.13' },
                    strategyStatus: {
                        text: '已审批',
                        dot: '#62d256'
                    },
                    strategyTime: { text: '06:33' },
                    executeTime: { text: '01:13' },
                    dataStatus: { text: '正常3' },
                    viscosityTemperature: { text: 23 },
                    outdoorTemperature: { text: 33 },
                    tools: {
                        data: [
                            {
                                id: 'bj',
                                name: '编辑'
                            },
                            {
                                id: 'sc',
                                name: '删除'
                            }
                        ]
                    }
                },
                {
                    id: '00444',
                    name: { text: '青阳万达广场4' },
                    date: { text: '2020.08.14' },
                    strategyStatus: {
                        text: '已执行',
                        dot: '#4eb1fd'
                    },
                    strategyTime: { text: '06:34' },
                    executeTime: { text: '01:14' },
                    dataStatus: { text: '正常4' },
                    viscosityTemperature: { text: 24 },
                    outdoorTemperature: { text: 34 },
                    tools: {
                        data: [
                            {
                                id: 'bj',
                                name: '编辑'
                            },
                            {
                                id: 'sc',
                                name: '删除'
                            }
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
