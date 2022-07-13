<template>
    <div class="p-view-table">
        <div class="p-view-table-main">
            <div class="p-view-table-header">
                <div class="p-view-table-header-content" :style="{width: `${Number(width)+scrollBar}px`, transform: `translateX(${-scrollLeft}px)`}">
                    <TableHeader
                            radius="right"
                            :data="tableHeader"
                            :fixedData="fixedHeaderData"
                            @setWidth="setWidth"
                    />
                </div>
                <div
                        v-if="data && data.length"
                        class="p-view-table-header-fixed p-view-table-content-fixed-shadow"
                        :style="{width: `${fixedWidth}px`}"
                >
                    <TableHeader
                            radius="left"
                            :data="fixedHeaderData"
                    />
                </div>
            </div>
            <div class="p-view-table-content-wrapper" :style="{height: `${height}px`}" @scroll="tableScrollX">
                <div class="p-view-table-content" :style="{width: `${width}px`}">
                    <template>
                        <TableMain
                                v-if="data && data.length"
                                radius="right"
                                :tableHeader="tableHeader"
                                :data="data"
                                :hoverIndex="tableIndex"
                                :height="height"
                                @setIndex="setFixedIndex"
                                @clearIndex="clearFixedIndex"
                        />
                        <div v-else class="p-table-no-data">
                            <img src="http://47.95.122.141:8200/persagy_ui_kit/empty/data.png" alt="暂无数据">
                            <section class="p-table-no-data-text">暂无数据</section>
                        </div>
                    </template>
                    <div class="p-view-table-header-fixed p-view-table-content-fixed-shadow"
                         :style="{width: `${fixedWidth}px`, left: `${scrollLeft}px`}"
                    >
                        <TableMain
                                radius="left"
                                :tableHeader="fixedHeaderData"
                                :data="fixedTableData"
                                :hoverIndex="fixedIndex"
                                :height="height"
                                :hideBar="true"
                                @setIndex="setTableIndex"
                                @clearIndex="clearTableIndex"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TableHeader from './depend/TableHeader';
import TableMain from './depend/TableMain';

import GetScrollbarWidth from '../static/utils/GetScrollbarWidth';

export default {
    name: 'ViewTable',
    props: {
        // 表头
        tableHeader: {
            type: Array,
            default: () => []
        },
        // 数据
        data: {
            type: Array,
            default: () => []
        },
        // 宽
        width: {
            type: [String, Number],
            default: '100%'
        },
        // 高度
        height: {
            type: [String, Number],
            default: ''
        }
    },
    components: {
        TableHeader,
        TableMain
    },
    data() {
        return {
            // 固定的数据
            fixedHeaderData: [],
            fixedTableData: [],
            fixedWidth: 0, // 固定数据的宽度
            scrollLeft: 0, // 滚动的X距离
            scrollTop: 60, // 滚动的Y距离
            tableIndex: null, // 主table的index
            fixedIndex: null, // 固定的table的index
            scrollBar: 4 // 滚动条宽度
        };
    },
    watch: {
        tableHeader: {
            handler(n) {
                this.setFixedData(n, this.data);
            },
            deep: true,
            immediate: true
        },
        data(n) {
            this.setFixedData(this.tableHeader, n);
        }
    },
    mounted() {
        // 获取滚动条宽度
        this.scrollBar = GetScrollbarWidth();
    },
    methods: {
        /**
         * 设置table数据
         * @param hd 表头数据
         * @param td table数据
         */
        setFixedData(hd, td) {
            // 过滤固定的数据
            const fixedHeaderData = hd.filter(d => d.fixed);
            this.fixedHeaderData = fixedHeaderData;
            this.fixedTableData = td.filter(d => {
                const obj = {};
                fixedHeaderData.forEach(fd => {
                    obj[fd.key] = d[fd.key];
                });
                return obj;
            });
        },
        // 设置宽度
        setWidth(w) {
            this.fixedWidth = w;
        },
        // 监听滚动条滚动
        tableScrollX(e) {
            const { target: { scrollLeft } } = e;
            this.scrollLeft = scrollLeft;
        },
        // 鼠标进入-固定的table
        setFixedIndex(ind) {
            this.fixedIndex = ind;
        },
        // 鼠标离开-固定的table
        clearFixedIndex() {
            this.fixedIndex = null;
        },
        // 鼠标进入-主table
        setTableIndex(ind) {
            this.tableIndex = ind;
        },
        // 鼠标离开-主table
        clearTableIndex() {
            this.tableIndex = null;
        }
    }
};
</script>

<style lang="stylus">
.p-view-table
    background-color $white
    width 100%
    overflow hidden
    font-size 0
    .p-view-table-header
        position relative
        height 60px
        overflow hidden
    .p-view-table-header-fixed
        position absolute
        left 0
        top 0
        z-index 10
    .p-view-table-content-wrapper
        width 100%
        overflow auto
    .p-view-table-content
        position relative
        width 100%
    .p-view-table-content-fixed
        position absolute
        left 0
        top 0
        background-color $white
    .p-view-table-content-fixed-shadow
        box-shadow $box-shadow-right

    .p-table-no-data
        padding-top 24px
        padding-bottom @padding-top
        width 100%
        text-align center
        > img
            width 120px
            height @width
        .p-table-no-data-text
            color $grey-600
            font-size 14px

</style>
