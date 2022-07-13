<template>
    <div class="tableHeader">
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
    </div>
</template>

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
        // fixed: 'left',
        sort: {
            open: true, type: 'date', status: 'ord', event: 'sortHandle'
        },
        resizable: true,
        minWidth: 80,
        tip: { open: true, text: '日期日期日期日期日期日期' },
        screen: {
            status: 'single', // 筛选4种状态【'single', 'multiple', 'singleSearch', 'multipleSearch'】
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
        // fixed: 'left',
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
            hasBar: false // 表体是否有竖向滚动条
        };
    },
    mounted() {
    },
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
};
</script>

<style lang="stylus">
.tableHeader
    padding 40px
.content
    padding 20px
    text-align center
    font-size 14px
    color $grey-600
</style>
