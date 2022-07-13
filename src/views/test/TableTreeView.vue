<template>
    <div class="tableView">
         <h3 class="components-title-h3">1.width + border + setting + fixed </h3>
        <br>
        <Button type="primary" @click="setLoading">加载loading</Button>
        <br><br>
<!--        render="custom"-->
<!--        :statistics="statistics"-->
        <TableTree
                width="100%"
                :maxHeight="height"
                :border="true"
                :setting="true"
                :openSelect="true"
                :sortAjax="false"
                :loading="loading"
                :header="header777"
                :data="data777"
                @sortHandle="sortHandle"
                @select="selectHandle"
                @screenHandle="screenHandle"
                @rowClick="rowClick"
                @settingChange="settingChange"
                @rowToolHandle="rowToolHandle"
                @resizableHandle="resizableHandle"
                key="tableTree1"
                ref="tableTree1"
        >
            <template v-for="th in header1" #[th.key]="{item}">
                <section>
                    <Toggle v-if="item.headerKey === 'isJoinCalc'" v-model="item.item[item.headerKey].toggle" />
                    <span v-else class="span-text">{{item.item[item.headerKey].text}}</span>
                </section>
            </template>
        </TableTree>
        <Button @click="changeHeader1">changeHeader1</Button>
        <!--
        <br><br><br><br>
         <h3 class="components-title-h3">2.width + setting </h3>
        <br>
        <TableTree
                width="1200"
                :maxHeight="height"
                :setting="true"
                :header="header2"
                :rowTools="rowTools"
                :data="data2"
                @sortHandle="sortHandle"
                @select="selectHandle"
                @screenHandle="screenHandle"
                @rowToolHandle="rowToolHandle"
                @rowClick="rowClick"
                key="tableTree2"
        />
        <br><br><br><br>
        <br><br><br><br>
         <h3 class="components-title-h3">30真实业务数据 </h3>
        <br>
        <TableTree
                width="1200"
                maxHeight="400"
                :header="header4"
                :data="data4"
                @sortHandle="sortHandle"
                @select="selectHandle"
                @screenHandle="screenHandle"
                @rowClick="rowClick"
                key="tableTree3"
        />
        <br><br><br><br>
        -->
        <!--
         <h3 class="components-title-h3">4.demo </h3>
        <br>
        <TableTree
                width="1200"
                maxHeight="400"
                :header="header6"
                :data="data6"
                @sortHandle="sortHandle"
                @select="selectHandle"
                @screenHandle="screenHandle"
                @rowClick="rowClick"
                key="tableTree3"
                :sortAjax="true"
        />
        <TableTree
            ref="tableTree3"
            width="1200"
            maxHeight="400"
            :header="header7"
            :data="data7"
            @sortHandle="sortHandle"
            @select="selectHandle"
            @screenHandle="screenHandle"
            @rowClick="rowClick"
            key="tableTree3"
        />
        -->
    </div>
</template>

<script>
import {
    header,
    header2,
    header4,
    data4,
    data1,
    data0,
    data,
    rowTools,
    topButton,
    dataSelect,
    statistics,
    header5,
    data5,
    data52,
    header6,
    data6,
    header7,
    data7,
    data72,
    header8,
    data8
} from 'TableGridData';// 列操作数据

const header999 = [
    {
        code: 0,
        name: '管理分区',
        checked: 'checked',
        paramName: 'name',
        key: 'name',
        text: '管理分区',
        disabled: true,
        screen: {
            open: true, status: 'multipleSearch', data: [{ id: '22bcdf80580f4fbfba7952722cb82311', name: '华北运营中心' }, { id: 'a97fc9025cc6494e8bf06f7830dc5004', name: '华东运营中心' }], event: 'manageListChange'
        },
        width: 200
    }, {
        code: 6, name: '空间数量', checked: 'checked', paramName: 'spaceNum', key: 'spaceNum', text: '空间数量(个)', sort: { open: true, event: 'sortHandle', type: 'string' }, width: 205
    }, {
        code: 7, name: '点位数量', checked: 'checked', paramName: 'ptNum', key: 'ptNum', text: '点位数量(个)', sort: { open: true, event: 'sortHandle', type: 'string' }, width: 205
    }, {
        code: 8,
        name: '环境达标率',
        checked: 'checked',
        paramName: 'envStandardRate',
        key: 'envStandardRate',
        text: '环境达标率(%)',
        sort: {
            open: true, event: 'sortHandle', status: 'ord', type: 'number'
        },
        width: 205
    }, {
        code: 9, name: '报警次数', checked: 'checked', paramName: 'alarmCount', key: 'alarmCount', text: '报警次数(次)', sort: { open: true, event: 'sortHandle', type: 'string' }, width: 205
    }, {
        code: 10, name: '报警时长', checked: 'checked', paramName: 'alarmHour', key: 'alarmHour', text: '报警时长(小时)', sort: { open: true, event: 'sortHandle', type: 'string' }, width: 205
    }, {
        code: 11, name: '转单次数', checked: 'checked', paramName: 'transferOrderCount', key: 'transferOrderCount', text: '转单次数(次)', sort: { open: true, event: 'sortHandle', type: 'string' }, width: 205
    }, {
        code: 12, name: '处理完成次数', checked: 'checked', paramName: 'handleCount', key: 'handleCount', text: '处理完成次数(次)', sort: { open: true, event: 'sortHandle', type: 'string' }, width: 205
    }, {
        code: 13, name: '忽略次数', checked: 'checked', paramName: 'ignoreCount', key: 'ignoreCount', text: '忽略次数(次)', sort: { open: true, event: 'sortHandle', type: 'string' }, width: 205
    }];
const data999 = [
    {
        pid: null,
        name: { text: '华北运营中心' },
        businessTime: { text: '--' },
        industrial: { text: '--' },
        ptNum: { text: '0' },
        spaceNum: { text: 87 },
        envStandardRate: { text: '--' },
        alarmCount: { text: '0' },
        alarmHour: { text: '0' },
        transferOrderCount: { text: '0' },
        handleCount: { text: '0' },
        ignoreCount: { text: '0' },
        open: false,
        id: '00',
        children: [{
            pid: null, name: { text: '北京区域' }, businessTime: { text: '--' }, industrial: { text: '--' }, ptNum: { text: '0' }, spaceNum: { text: 87 }, envStandardRate: { text: '--' }, alarmCount: { text: '0' }, alarmHour: { text: '0' }, transferOrderCount: { text: '0' }, handleCount: { text: '0' }, ignoreCount: { text: '0' }, id: '0-0'
        }]
    }, {
        pid: null,
        name: { text: '华东运营中心' },
        businessTime: { text: '--' },
        industrial: { text: '--' },
        ptNum: { text: '0' },
        spaceNum: { text: '0' },
        envStandardRate: { text: '--' },
        alarmCount: { text: '0' },
        alarmHour: { text: '0' },
        transferOrderCount: { text: '0' },
        handleCount: { text: '0' },
        ignoreCount: { text: '0' },
        open: false,
        id: '01',
        children: [{
            pid: null, name: { text: '上海区域' }, businessTime: { text: '--' }, industrial: { text: '--' }, ptNum: { text: '0' }, spaceNum: { text: '0' }, envStandardRate: { text: '--' }, alarmCount: { text: '0' }, alarmHour: { text: '0' }, transferOrderCount: { text: '0' }, handleCount: { text: '0' }, ignoreCount: { text: '0' }, id: '1-0'
        }]
    }];
const statistics2 = {
    pid: null,
    name: { text: '新城控股' },
    businessTime: { text: '--' },
    industrial: { text: '--' },
    ptNum: { text: '0' },
    spaceNum: { text: 15 },
    envStandardRate: { text: '--' },
    alarmCount: { text: '0' },
    alarmHour: { text: '0' },
    transferOrderCount: { text: '0' },
    handleCount: { text: '0' },
    ignoreCount: { text: '0' },
    open: true
};

const header777 = [
    {
        code: 0,
        name: '管理分区',
        checked: 'checked',
        paramName: 'name',
        key: 'name',
        text: '管理分区',
        disabled: true,
        fixed: 'left',
        screen: {
            open: true, status: 'multipleSearch', data: [{ id: 'd42603790dc64d45afc61971a76e36bf', name: '北京区域' }, { id: 'c0149a7c164341d9bb9587202d02b025', name: '上海区域' }], event: 'manageListChange'
        },
        width: 200
    }, {
        code: 6, name: '空间数量', checked: 'checked', paramName: 'spaceNum', key: 'spaceNum', text: '空间数量(个)', sort: { open: true, event: 'sortHandle', type: 'number' }, width: 234
    }, {
        code: 7, name: '点位数量', checked: 'checked', paramName: 'ptNum', key: 'ptNum', text: '点位数量(个)', sort: { open: true, event: 'sortHandle', type: 'number' }, width: 234
    }, {
        code: 8,
        name: '环境达标率',
        checked: 'checked',
        paramName: 'envStandardRate',
        key: 'envStandardRate',
        text: '环境达标率(%)',
        sort: {
            open: true, event: 'sortHandle', status: 'ord', type: 'number'
        },
        width: 234
    }, {
        code: 9, name: '报警次数', checked: 'checked', paramName: 'alarmCount', key: 'alarmCount', text: '报警次数(次)', sort: { open: true, event: 'sortHandle', type: 'number' }, width: 234
    }, {
        code: 10,
        name: '报警时长',
        checked: 'checked',
        paramName: 'alarmHour',
        key: 'alarmHour',
        text: '报警时长(小时)',
        sort: {
            open: true,
            event: 'sortHandle',
            type: 'number'
        },
        width: 234
    }, {
        code: 11, name: '转单次数', checked: 'checked', paramName: 'transferOrderCount', key: 'transferOrderCount', text: '转单次数(次)', sort: { open: true, event: 'sortHandle', type: 'number' }, width: 234
    }, {
        code: 12, name: '处理完成次数', checked: 'checked', paramName: 'handleCount', key: 'handleCount', text: '处理完成次数(次)', sort: { open: true, event: 'sortHandle', type: 'number' }, width: 234
    }, {
        code: 13, name: '忽略次数', checked: 'uncheck', paramName: 'ignoreCount', key: 'ignoreCount', text: '忽略次数(次)', sort: { open: true, event: 'sortHandle', type: 'number' }, width: 234
    }
];
const data777 = [
    {
        pid: null,
        name: { text: '上海区域' },
        businessTime: { text: '--' },
        industrial: { text: '--' },
        ptNum: { text: '0' },
        spaceNum: { text: '0' },
        envStandardRate: { text: '--' },
        alarmCount: { text: '0' },
        alarmHour: { text: 0 },
        transferOrderCount: { text: '0' },
        handleCount: { text: '0' },
        ignoreCount: { text: '0' },
        open: false,
        id: '00',
        children: [{
            pid: 'Pj3101010001', name: { text: '上海五角场万达广场' }, businessTime: { text: '20081223' }, industrial: { text: '商场' }, ptNum: { text: '0' }, spaceNum: { text: '0' }, envStandardRate: { text: '--' }, alarmCount: { text: '0' }, alarmHour: { text: 0 }, transferOrderCount: { text: '0' }, handleCount: { text: '0' }, ignoreCount: { text: '0' }, id: '0-0', link: true
        }, {
            pid: 'Pj3101170001', name: { text: '上海松江万达广场' }, businessTime: { text: '20140530' }, industrial: { text: '商场' }, ptNum: { text: '0' }, spaceNum: { text: '0' }, envStandardRate: { text: '--' }, alarmCount: { text: '0' }, alarmHour: { text: 0 }, transferOrderCount: { text: '0' }, handleCount: { text: '0' }, ignoreCount: { text: '0' }, id: '0-1', link: true
        }]
    }, {
        pid: null,
        name: { text: '北京区域' },
        businessTime: { text: '--' },
        industrial: { text: '--' },
        ptNum: { text: '0' },
        spaceNum: { text: 48.6 },
        envStandardRate: { text: 20 },
        alarmCount: { text: 14 },
        alarmHour: { text: 6.3 },
        transferOrderCount: { text: '0' },
        handleCount: { text: '0' },
        ignoreCount: { text: '0' },
        open: false,
        id: '01',
        children: [{
            pid: 'Pj3205050001', name: { text: '苏州狮山天街' }, businessTime: { text: '20200101' }, industrial: { text: '商场' }, ptNum: { text: '0' }, spaceNum: { text: '0' }, envStandardRate: { text: '--' }, alarmCount: { text: '0' }, alarmHour: { text: 0 }, transferOrderCount: { text: '0' }, handleCount: { text: '0' }, ignoreCount: { text: '0' }, id: '1-0', link: true
        }, {
            pid: 'Pj1101080253', name: { text: '博锐尚格北京总部' }, businessTime: { text: '--' }, industrial: { text: '商场' }, ptNum: { text: '0' }, spaceNum: { text: 48 }, envStandardRate: { text: 20 }, alarmCount: { text: 14 }, alarmHour: { text: 6.3 }, transferOrderCount: { text: '0' }, handleCount: { text: '0' }, ignoreCount: { text: '0' }, id: '1-1', link: true
        }]
    }
];

export default {
    name: 'TableGridView',
    data() {
        return {
            header1: [], // 表头
            header2, // 表头
            header4, // 表头
            header5, // 表头
            data1: [],
            data2: [],
            data4,
            data5: [],
            header6,
            data6,
            statistics,
            statistics2,
            topButton, // 顶部的button按钮
            rowTools, // 每列操作工具类
            height: 300,
            dataSelect1: JSON.parse(JSON.stringify(dataSelect)),
            dataMarge: [],
            loading: false,
            selectData: [
                { id: 'test1', name: '选择项' },
                { id: 'test2', name: '单平米' },
                { id: 'test3', name: '下级分项' },
                { id: 'test4', name: '滑动平均滑动平均' }
            ],
            header7,
            data7,
            header8,
            data8,
            header999,
            data999,
            header777,
            data777
        };
    },
    mounted() {
        this.header1 = header;
        setTimeout(() => {
            this.data1 = JSON.parse(JSON.stringify(data));
            this.data2 = JSON.parse(JSON.stringify(data));
        }, 0);
        // setTimeout(() => {
        //     this.handleSetColumn(123, 789);
        // }, 3000);
        setTimeout(() => {
            this.data5 = data5;
        }, 300);
        setTimeout(() => {
            // this.data5[0].realEnergy.text = '123456789';
        }, 10000);
    },
    methods: {
        changeHeader1() {
            const { header1, data1 } = this;
            /*
            const h = header1.map(d => {
                if (d.key === 'outdoorTemperature') {
                    d.checked = 'checked';
                }
                return d;
            });
            this.$refs.tableTree1.resetHeaderData(h);
            */
            this.$refs.tableTree1.resetTableData(data0);
        },
        // 筛选
        screenHandle(key, id) {
            console.log('筛选::', key, id);
        },
        // 排序回调
        sortHandle(status, key) {
            console.log('status::', status, '  ', 'key::', key);
            // console.table(data72);
            // this.data7 = [];
            this.data7 = data72;
            // this.$refs.tableTree3.resetTableData(data72);
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

        dataSelectChange(data) {
            console.log(data);
        },
        // 点击每行
        rowClick(item) {
            console.log('点击每行::', item);
        },
        // 点击设置确定的回调
        settingChange(item) {
            console.log('点击设置确定的回调::', item);
        },
        noteHandle(item) {
            console.log('item:', item);
        },

        setLoading() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 3000);
        },
        settingReset(type) {
            console.log('settingReset', type);
        },

        handleSetColumn(start, end) {
            // 管控值日期
            /*
            const item = this.header5.find(item => item.key === 'gwData');
            const i = this.header5.findIndex(item => item.key === 'gwData');
            item.text = `管控值(${start}-${end}) (kWh)`;
            this.$set(this.header5, i, item);
            */
            this.header5 = this.header5.map(item => {
                if (item.key === 'gwData') {
                    item.text = `管控值(${start}-${end}) (kWh)`;
                }
                return item;
            });
            console.log(this.header5);
        },
        // 当前拖动的宽度
        resizableHandle(w) {
            console.log('当前拖动的宽度::', w);
        }
    }
};
</script>

<style lang="stylus">
    .tableView
        padding 20px
    .row-tool
        font-size 14px
    .span-text
        color $grey-900
        font-size 14px

</style>
