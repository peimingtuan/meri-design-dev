<template>
    <div class="tableGridView">
        <TableGrid width="100%" :maxHeight="600" :resizable="true" :border="true" :header="header" :data="data" :dimension="true" />
    </div>
</template>

<script>
import CreateJson from 'tableGridJson';

const header = [
    {
        key: 'tenantParentId', text: '合同编号', resizable: true, fixed: 'left', minWidth: 80
    }, {
        width: '213', key: 'tenantLocalName', text: '租户名称', resizable: true, fixed: 'left', minWidth: 80
    }, {
        key: 'payTypeName', text: '付费方式', resizable: true, fixed: 'left', minWidth: 80
    }, {
        width: '241', key: '2020-12-01 00:00:00', text: '2020.12', children: [{ key: '2020-12-01 00:00:00energy', text: '能耗(kWh)' }, { key: '2020-12-01 00:00:00money', text: '费用(元)' }]
    }, {
        width: '241', key: '2021-01-01 00:00:00', text: '2021.01', children: [{ key: '2021-01-01 00:00:00energy', text: '能耗(kWh)' }, { key: '2021-01-01 00:00:00money', text: '费用(元)' }]
    }
];

const data = [
    {
        open: true, id: 'statistics-id', tenantLocalName: { text: '' }, tenantParentId: { text: '合计：' }, payTypeName: { text: '' }, '2020-12-01 00:00:00': { text: '', children: [{ headerKey: '2020-12-01 00:00:00energy', text: '--' }, { headerKey: '2020-12-01 00:00:00money', text: '--' }] }, '2021-01-01 00:00:00': { text: '', children: [{ headerKey: '2021-01-01 00:00:00energy', text: '0.00' }, { headerKey: '2021-01-01 00:00:00money', text: '0.00' }] }
    }, {
        tenantParentId: { text: '901-1230' }, tenantLocalName: { text: '测试单充预付费表充表扣' }, payTypeName: { text: '预付费' }, '2020-12-01 00:00:00': { text: '06:30', children: [{ headerKey: '2020-12-01 00:00:00energy', text: '--' }, { headerKey: '2020-12-01 00:00:00money', text: '--' }] }, '2021-01-01 00:00:00': { text: '06:30', children: [{ headerKey: '2021-01-01 00:00:00energy', text: '0.00' }, { headerKey: '2021-01-01 00:00:00money', text: '0.00' }] }
    }, {
        tenantParentId: { text: '901-1231' }, tenantLocalName: { text: '测试单充预付费软充表扣' }, payTypeName: { text: '预付费' }, '2020-12-01 00:00:00': { text: '06:30', children: [{ headerKey: '2020-12-01 00:00:00energy', text: '--' }, { headerKey: '2020-12-01 00:00:00money', text: '--' }] }, '2021-01-01 00:00:00': { text: '06:30', children: [{ headerKey: '2021-01-01 00:00:00energy', text: '0.00' }, { headerKey: '2021-01-01 00:00:00money', text: '0.00' }] }
    }, {
        tenantParentId: { text: '901-1232' }, tenantLocalName: { text: '测试单充预付费软充表扣1' }, payTypeName: { text: '预付费' }, '2020-12-01 00:00:00': { text: '06:30', children: [{ headerKey: '2020-12-01 00:00:00energy', text: '--' }, { headerKey: '2020-12-01 00:00:00money', text: '--' }] }, '2021-01-01 00:00:00': { text: '06:30', children: [{ headerKey: '2021-01-01 00:00:00energy', text: '0.00' }, { headerKey: '2021-01-01 00:00:00money', text: '0.00' }] }
    }, {
        tenantParentId: { text: '901-1233' }, tenantLocalName: { text: '测试单充预付费软充表扣2' }, payTypeName: { text: '预付费' }, '2020-12-01 00:00:00': { text: '06:30', children: [{ headerKey: '2020-12-01 00:00:00energy', text: '--' }, { headerKey: '2020-12-01 00:00:00money', text: '--' }] }, '2021-01-01 00:00:00': { text: '06:30', children: [{ headerKey: '2021-01-01 00:00:00energy', text: '0.00' }, { headerKey: '2021-01-01 00:00:00money', text: '0.00' }] }
    }, {
        tenantParentId: { text: '901-1234' }, tenantLocalName: { text: '测试单充预付费软充表扣3' }, payTypeName: { text: '预付费' }, '2020-12-01 00:00:00': { text: '06:30', children: [{ headerKey: '2020-12-01 00:00:00energy', text: '--' }, { headerKey: '2020-12-01 00:00:00money', text: '--' }] }, '2021-01-01 00:00:00': { text: '06:30', children: [{ headerKey: '2021-01-01 00:00:00energy', text: '0.00' }, { headerKey: '2021-01-01 00:00:00money', text: '0.00' }] }
    }, {
        tenantParentId: { text: '901-1235' }, tenantLocalName: { text: '测试单充预付费软充表扣4' }, payTypeName: { text: '预付费' }, '2020-12-01 00:00:00': { text: '06:30', children: [{ headerKey: '2020-12-01 00:00:00energy', text: '--' }, { headerKey: '2020-12-01 00:00:00money', text: '--' }] }, '2021-01-01 00:00:00': { text: '06:30', children: [{ headerKey: '2021-01-01 00:00:00energy', text: '0.00' }, { headerKey: '2021-01-01 00:00:00money', text: '0.00' }] }
    }, {
        tenantParentId: { text: '901-1236' }, tenantLocalName: { text: '测试单充后付费只有电' }, payTypeName: { text: '预付费' }, '2020-12-01 00:00:00': { text: '06:30', children: [{ headerKey: '2020-12-01 00:00:00energy', text: '--' }, { headerKey: '2020-12-01 00:00:00money', text: '--' }] }, '2021-01-01 00:00:00': { text: '06:30', children: [{ headerKey: '2021-01-01 00:00:00energy', text: '0.00' }, { headerKey: '2021-01-01 00:00:00money', text: '0.00' }] }
    }, {
        tenantParentId: { text: '901-1237' }, tenantLocalName: { text: '测试预付费电02' }, payTypeName: { text: '预付费' }, '2020-12-01 00:00:00': { text: '06:30', children: [{ headerKey: '2020-12-01 00:00:00energy', text: '--' }, { headerKey: '2020-12-01 00:00:00money', text: '--' }] }, '2021-01-01 00:00:00': { text: '06:30', children: [{ headerKey: '2021-01-01 00:00:00energy', text: '--' }, { headerKey: '2021-01-01 00:00:00money', text: '--' }] }
    }, {
        tenantParentId: { text: '901-1238' }, tenantLocalName: { text: '测试预付费电03' }, payTypeName: { text: '预付费' }, '2020-12-01 00:00:00': { text: '06:30', children: [{ headerKey: '2020-12-01 00:00:00energy', text: '--' }, { headerKey: '2020-12-01 00:00:00money', text: '--' }] }, '2021-01-01 00:00:00': { text: '06:30', children: [{ headerKey: '2021-01-01 00:00:00energy', text: '--' }, { headerKey: '2021-01-01 00:00:00money', text: '--' }] }
    }, {
        tenantParentId: { text: '901-1239' }, tenantLocalName: { text: '测试预付费水01' }, payTypeName: { text: '预付费' }, '2020-12-01 00:00:00': { text: '06:30', children: [{ headerKey: '2020-12-01 00:00:00energy', text: '--' }, { headerKey: '2020-12-01 00:00:00money', text: '--' }] }, '2021-01-01 00:00:00': { text: '06:30', children: [{ headerKey: '2021-01-01 00:00:00energy', text: '--' }, { headerKey: '2021-01-01 00:00:00money', text: '--' }] }
    }, {
        tenantParentId: { text: '901-1240' }, tenantLocalName: { text: '测试多充后付费水' }, payTypeName: { text: '预付费' }, '2020-12-01 00:00:00': { text: '06:30', children: [{ headerKey: '2020-12-01 00:00:00energy', text: '--' }, { headerKey: '2020-12-01 00:00:00money', text: '--' }] }, '2021-01-01 00:00:00': { text: '06:30', children: [{ headerKey: '2021-01-01 00:00:00energy', text: '--' }, { headerKey: '2021-01-01 00:00:00money', text: '--' }] }
    }, {
        tenantParentId: { text: '901-1241' }, tenantLocalName: { text: '测试单充预付费表充表扣' }, payTypeName: { text: '预付费' }, '2020-12-01 00:00:00': { text: '06:30', children: [{ headerKey: '2020-12-01 00:00:00energy', text: '--' }, { headerKey: '2020-12-01 00:00:00money', text: '--' }] }, '2021-01-01 00:00:00': { text: '06:30', children: [{ headerKey: '2021-01-01 00:00:00energy', text: '0.00' }, { headerKey: '2021-01-01 00:00:00money', text: '0.00' }] }
    }
];
export default {
    name: 'TableGridView',
    data() {
        return {
            header, // 表头
            data
        };
    },
    methods: {
        // 筛选
        screenHandle(key, id, parentKey) {
            console.log('筛选::', key, id, parentKey);
        },
        // 排序回调
        sortHandle(status, key) {
            console.log('status::', status, 'key::', key);
            // this.data2 = this.data2.reverse();
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
            // const dataFilter = data1.filter(d => d.id !== itemId);
            // console.log(dataFilter);
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
            console.log('item::::', item);
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
