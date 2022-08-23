<template>
    <div class="tableGridView">
        <TableGrid
                width="1600"
                :maxHeight="height"
                :border="true"
                :header="header"
                :data="data"
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
        key: 'viscosityTemperature',
        text: '室内最高温度(℃)'
    },
    {
        key: 'executeTime',
        text: '策略推送时间',
        width: 280,
        children: [
            { key: 'executeTimeMonth1', text: '1月' },
            { key: 'executeTimeMonth2', text: '2月' },
            { key: 'executeTimeMonth3', text: '3月' },
            { key: 'executeTimeMonth4', text: '4月' }
        ]
    }
];

const data = [
    {
        id: '001',
        name: { text: '青阳万达广场1' },
        viscosityTemperature: {
           text:{
               children:[
                    0,1,2,3
               ]
           }
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
        id: '000',
        name: { text: '青阳万达广场0青阳万达广场0青阳万达广场0青阳万达广场0青阳万达广场0' },
        viscosityTemperature: { text: 20 },
        executeTime: {
            text: '01:10',
            children: [
                { headerKey: 'executeTimeMonth1', text: '5' },
                { headerKey: 'executeTimeMonth2', text: '6' },
                { headerKey: 'executeTimeMonth3', text: '7' },
                { headerKey: 'executeTimeMonth4', text: '8' }
            ]
        }
    },
];

export default {
    name: 'TableGridView',
    data() {
        return {
            header, // 表头
            data,
            height: 200,
        };
    },
    mounted() {
    },
    methods: {
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
