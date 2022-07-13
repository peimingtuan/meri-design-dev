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
                maxHeight="300"
                :border="true"
                :setting="true"
                :openSelect="true"
                :sortAjax="false"
                :loading="loading"
                :header="header1"
                :data.sync="data1"
                :rowTools.sync="rowTools"
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
            data8
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
            const { header1 } = this;
            const h = header1.map(d => {
                if (d.key === 'outdoorTemperature') {
                    d.checked = 'checked';
                }
                return d;
            });
            this.$refs.tableTree1.resetHeaderData(h);
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
