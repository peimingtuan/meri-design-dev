<template>
    <div class="p-table-tree p-table-layout"
         :class="{'p-table-layout-border': border}"
         :style="{width: percent ? width : `${width}px`}"
        >
        <div v-if="headerData.some(d => d.resizable) && lineLeft" class="p-table-layout-line" :style="{left: `${lineLeft}px`}"></div>
        <div class="p-table-layout-loading" v-show="loadingShow"><TableLoading /></div>
        <div class="p-table-top-handle">
            <!--已选择工具栏 -s -->
            <template v-if="checkbox">
                <div :class="['p-table-top-select', $scopedSlots.selectTool&&'p-table-top-select-pos']" v-show="selectedIds.length">
                    <div class="p-table-top-select-left">
                        <section class="p-table-top-select-text">
                            <span class="p-table-top-select-text-normal">已选择</span>
                            <span class="p-table-top-select-text-num">{{selectedIds.length}}</span>
                            <span class="p-table-top-select-text-normal">项</span>
                        </section>
                        <template v-if="topButton&&topButton.length">
                            <Button
                                    v-for="(tb, tbi) in topButton"
                                    :type="tb.type||'default'"
                                    size="small"
                                    :disabled="tb.disabled || false"
                                    :key="`tb-${tbi}-${tb.id}`"
                                    @click="topButtonHandle(tb)"
                            >{{tb.text}}</Button>
                        </template>
                    </div>
                    <div class="p-table-top-select-right" @click="clearSelected">
                        <IconCloseSvg />
                    </div>
                </div>
            </template>
            <!--已选择工具栏 -e -->
        </div>
        <div v-if="headerData&&headerData.length"
             class="p-table-layout-wrapper"
             :style="{maxWidth: percent ? width : `${width}px`}"
             ref="tableGridRef"
            >
            <!--table头部 -s -->
            <div class="p-table-layout-header"
                 :class="[
                     `p-table-layout-header-${dimension ? 'dimension' : 'normal'}${border ? '-border' : '' }`,
                     hasBar&&'p-table-layout-header-has-bar',
                     (!tableData || !tableData.length) && 'p-table-layout-header-no-data'
                 ]"
                 @mousemove="resizeMove"
                 @mouseup="resizeUp"
                 @mouseleave="resizeUp"
                >
                <div class="p-table-layout-header-content"
                     :class="{'p-table-layout-header-content-events': lineLeft}"
                     ref="headerContent"
                     @wheel.stop.prevent
                     @scroll.stop.prevent
                     >
                    <TableHeader
                            key="tableHeader"
                            :width="tableWidth"
                            :isTree="true"
                            :colWidth="colWidth"
                            :data="headerData"
                            :checkbox="checkbox"
                            :checked="checkStatus"
                            :border="border"
                            :setting="setting"
                            :disableSort="disableSort"
                            :sortAjax="sortAjax"
                            :scrollBar="scrollBar"
                            :hasBar="hasBar"
                            :rowTools="rowTools"
                            :dimension="dimension"
                            @selectedAll="selectedAll"
                            @resizeDown="resizeDown"
                    />
                </div>
                <!-- 左侧-固定数据是否显示 -->
                <template v-if="tableData && tableData.length && fixedHeaderLeftData.length">
                    <div class="p-table-layout-header-fixed p-table-layout-header-fixed-left"
                         :class="[dimension ? 'p-table-layout-header-fixed-dimension' : 'p-table-layout-header-fixed-normal']"
                         v-show="headerScrollLeft"
                        >
                        <TableHeader
                                key="tableHeaderLeft"
                                :width="fixedLeftWidth"
                                :isTree="true"
                                :data="fixedHeaderLeftData"
                                :checkbox="checkbox"
                                :checked="checkStatus"
                                :border="border"
                                :disableSort="disableSort"
                                :sortAjax="sortAjax"
                                :colWidth="colWidthLeft"
                                :dimension="dimension"
                                @selectedAll="selectedAll"
                                @resizeDown="resizeDown"
                        />
                    </div>
                </template>
                <!-- 右侧-固定数据是否显示 -->
                <template v-if="tableData && tableData.length && (fixedHeaderRightData.length || (rowTools && rowTools.open && rowTools.fixed === 'right'))">
                    <div class="p-table-layout-header-fixed p-table-layout-header-fixed-right"
                        :class="[
                            dimension ? 'p-table-layout-header-fixed-dimension' : 'p-table-layout-header-fixed-normal',
                            setting&&'p-table-layout-header-fixed-right-padding',
                            hasBar&&`p-table-layout-header-fixed-right-${scrollBar}`
                        ]"
                         v-show="(headerScrollLeft+clientWidth+(hasBar ? scrollBar : 0)) < tableWidth"
                        >
                        <TableHeader
                                key="tableHeaderRight"
                                :width="fixedRightWidth"
                                :isTree="true"
                                :data="fixedHeaderRightData"
                                :border="border"
                                :rowTools="rowTools"
                                :colWidth="colWidthRight"
                                :dimension="dimension"
                                @resizeDown="resizeDown"
                        />
                    </div>
                </template>
                <!-- 设置 -->
                <template v-if="setting">
                    <div :class="[
                            'p-table-layout-header-setting',
                            dimension ? 'p-table-layout-header-setting-dimension' : 'p-table-layout-header-setting-normal',
                            (!fixedHeaderRightData.length)&&'p-table-layout-setting-shadow'
                        ]"
                         ref="settingTag">
                        <span class="p-table-header-setting-svg" @click="setHeaderSettingStatus"><SettingSvg /></span>
                        <div class="p-header-setting-status" v-show="settingStatus"></div>
                    </div>
                </template>
            </div>
            <!--table头部 -e -->

            <!--table主体 -s -->
            <div class="p-table-layout-content">
                <div v-if="!tableData || (tableData instanceof Array && JSON.stringify(tableData).length <= 4)" class="p-table-no-data">
                    <!-- <img src="http://47.95.122.141:8200/persagy_ui_kit/empty/data.png" alt="暂无数据">-->
                    <section class="p-table-no-data-text">暂无数据</section>
                </div>
                <template v-else>
                    <div class="p-table-layout-main"
                         ref="tableLayoutMain"
                         :style="{
                            height: height&&`${Number(height) + ((width <= tableWidth) ? scrollBar : 0)}px`,
                            maxHeight: maxHeight&&`${Number(maxHeight) + ((width <= tableWidth) ? scrollBar : 0)}px`
                         }"
                         @scroll="tableScroll"
                        >
                        <TableTreeMain
                            key="tableMain"
                            ref="tableMain"
                            :width="tableWidth"
                            :header="headerData"
                            :data="tableData"
                            :statistics="statistics"
                            :colWidth="colWidth"
                            :border="border"
                            :setting="setting"
                            :scrollLeft="headerScrollLeft"
                            :scrollBar="scrollBar"
                            :hasBar="hasBar"
                            :render="render"
                            :openSelect="openSelect"
                            :rowTools="rowTools"
                            @setStatus="setStatus"
                            @rowClick="rowClick"
                            @setBar="setBar"
                        >
                            <template v-for="th in headerData" #[th.key]="{item}">
                                <slot :name="th.key" :item="item"/>
                            </template>
                        </TableTreeMain>
                        <template v-if="tableData && tableData.length && fixedHeaderLeftData.length">
                            <div class="p-table-layout-main-fixed p-table-layout-main-fixed-left"
                                 v-show="headerScrollLeft"
                                 :style="{width: `${fixedLeftWidth}px`, left: `${headerScrollLeft}px`}"
                            >
                                <TableTreeMain
                                    ref="tableMainLeft"
                                    key="tableMainLeft"
                                    :width="fixedLeftWidth"
                                    :header="fixedHeaderLeftData"
                                    :data="tableData"
                                    :statistics="statistics"
                                    :colWidth="colWidthLeft"
                                    :border="border"
                                    :render="render"
                                    :openSelect="openSelect"
                                    fixed="left"
                                    @setStatus="setStatus"
                                    @rowClick="rowClick"
                                    @setBar="setBar"
                                >
                                    <template v-for="th in headerData" #[th.key]="{item}">
                                        <slot :name="th.key" :item="item"/>
                                    </template>
                                </TableTreeMain>
                            </div>
                        </template>
                        <template v-if="tableData && tableData.length && (fixedHeaderRightData.length || rowTools && rowTools.open)">
                            <div class="p-table-layout-main-fixed p-table-layout-main-fixed-right"
                                 :style="{width: `${fixedRightWidth}px`, right: `${-headerScrollLeft}px`}"
                                 v-show="(headerScrollLeft+clientWidth+(hasBar ? scrollBar : 0)) < tableWidth"
                            >
                                <TableTreeMain
                                    ref="tableMainRight"
                                    key="tableMainRight"
                                    :width="fixedRightWidth"
                                    :header="fixedHeaderRightData"
                                    :data="tableData"
                                    :statistics="statistics"
                                    :colWidth="colWidthRight"
                                    :border="border"
                                    :setting="setting"
                                    :render="render"
                                    :openSelect="openSelect"
                                    :rowTools="(rowTools && rowTools.fixed === 'right') ? rowTools : {}"
                                    fixed="right"
                                    @setStatus="setStatus"
                                    @rowClick="rowClick"
                                >
                                    <template v-for="th in headerData" #[th.key]="{item}">
                                        <slot :name="th.key" :item="item"/>
                                    </template>
                                </TableTreeMain>
                            </div>
                        </template>
                    </div>
                </template>
            </div>
            <!--table主体 -e -->
        </div>
    </div>
</template>

<script>
import IconCloseSvg from '../static/iconSvg/icon_close.svg';
import TableLoading from '../static/iconSvg/tableLoading.svg';
import SettingSvg from '../static/iconSvg/setting.svg';

import Button from '../Button';

import TableHeader from '../TableHeader/TableHeader';
import TableTreeMain from './depend/TableTreeMain';

import GetScrollbarWidth from '../static/utils/GetScrollbarWidth';

import HSDrop from '../TableHeader/HeaderSetting';
import { SetHeaderData, CheckedHandle, SetColWidth } from '../TableHeader/utils/SetHeaderData';
import SetTableTreeData from './utils/SetTableTreeData';
import TreeSort from './utils/TreeSort';
import { ResizeDown, ResizeMove, ResizeUp } from '../TableHeader/utils/Resizable';

export default {
    name: 'TableTree',
    components: {
        IconCloseSvg, TableLoading, SettingSvg, Button, TableHeader, TableTreeMain
    },
    props: {
        // table头部数据
        header: {
            type: Array,
            default: () => []
        },
        // 统计数据
        statistics: {
            type: Object,
            default: () => {}
        },
        // 数据
        data: {
            type: Array,
            default: () => {}
        },
        // 顶部的button按钮
        topButton: {
            type: Array,
            default: () => []
        },
        // 宽
        width: {
            type: [String, Number],
            default: '500'
        },
        // 高度
        height: {
            type: [String, Number],
            default: ''
        },
        // 最大高度 - 如果height和maxHeight同时设置，建议height必须大于或等maxHeight
        maxHeight: {
            type: [String, Number],
            default: ''
        },
        // 开启checkbox
        checkbox: {
            type: Boolean,
            default: false
        },
        // 开启操作栏
        rowTools: {
            type: Object,
            default: () => ({
                open: false, width: 0, fixed: '', event: ''
            })
        },
        // 开启loading
        loading: {
            type: Boolean,
            default: false
        },
        // 显示所有边框
        border: {
            type: Boolean,
            default: false
        },
        // 显示设置
        setting: {
            type: Boolean,
            default: false
        },
        // 设置可拖动排序
        draggable: {
            type: Boolean,
            default: false
        },
        // 后端排序
        sortAjax: {
            type: Boolean,
            default: false
        },
        // 开启选中状态
        openSelect: {
            type: Boolean,
            default: false
        },
        // 后端排序
        average: {
            type: [Number, String],
            default: 80
        },
        // 自定义渲染 为custom表示自定义渲染
        render: {
            type: String,
            default: ''
        },
        // header - 多维度数据
        dimension: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            loadingShow: false, // 显示loading
            settingStatus: false, // HeaderSetting显示状态
            clientWidth: 0, // table 父级宽度
            tableWidth: 500, // table宽度
            lastIndex: 0, // 需要计算减去的最后一个索引
            headerData: [], // 表头数据
            headerHistoryData: [], // 表头历史数据
            headerSettingData: [], // 表头设置数据
            checkStatus: 'uncheck', // 头部checkbox选中状态
            disableSort: false, // 是否禁用排序
            tableData: [], // table数据
            tableHistoryData: [], // table历史数据
            fixedHeaderLeftData: [], // 固定的数据 - left
            fixedHeaderRightData: [], // 固定的数据 - right
            fixedLeftWidth: 0, // 左侧-固定数据宽度
            fixedRightWidth: 0, // 右侧-固定数据宽度
            scrollBar: 6, // 滚动条宽度
            hasBar: false, // 页面是否有滚动条
            headerScrollLeft: 0, // 滚动的X距离
            colWidth: [], // table每列宽度
            colWidthLeft: [], // 左侧-table每列宽度
            colWidthRight: [], // 右侧-table每列宽度
            selectedIds: [], // 选中的数据
            screenArray: [], // 筛选列表
            defaultSort: {}, // 默认排序的项
            lineLeft: 0, // 拖动改变列宽的线条高度
            colIndex: 0, // 拖动 - 列索引
            startX: 0, // 拖动 - 开始X位置
            currentWidth: 0, // 拖动 - 当前改变的宽度
            oldWidth: 0 // 拖动 - 原始宽度
        };
    },
    provide() {
        return {
            tableLayoutMain: this
        };
    },
    computed: {
        // 传入的width是否包含百分号
        percent() {
            const { width } = this;
            return (typeof width === 'string' && width.includes('%'));
        }
    },
    watch: {
        header: {
            handler(n = [], o = []) {
                const nData = JSON.stringify(n),
                    oData = JSON.stringify(o);
                this.setHeaderData(JSON.parse(nData), (!oData || oData.length <= 4));
            },
            deep: true
        },
        data: {
            handler(n) {
                const { tableHistoryData } = this,
                    hStrData = JSON.stringify(tableHistoryData);
                const strData = JSON.stringify(n);
                if (strData === hStrData) return;
                // this.changeLoadingShow(true);
                const { sortAjax, defaultSort } = this;
                let tData = JSON.parse(strData);
                if (!sortAjax && defaultSort && defaultSort.key) {
                    const { key, sort: { status, type } } = defaultSort;
                    if (status) tData = TreeSort(tData, key, status, type);
                }
                this.setTableData(tData, true);
            },
            deep: true
        },
        // 设置loading
        loading(n, o) {
            if (n === o) return;
            this.changeLoadingShow(n);
        }
    },
    /*
    created() {
        this.changeLoadingShow(true);
    },
    */
    mounted() {
        this.scrollBar = GetScrollbarWidth();
        const { header, data } = this;
        this.setHeaderData(JSON.parse(JSON.stringify(header)), true);

        const strData = JSON.stringify(data);
        if (strData.length > 4) {
            setTimeout(() => {
                const { sortAjax, defaultSort } = this;
                let tData = JSON.parse(strData);
                if (!sortAjax && defaultSort && defaultSort.key) {
                    const { key, sort: { status, type } } = defaultSort;
                    if (status) tData = TreeSort(tData, key, status, type);
                }
                this.setTableData(tData, true);
            });
        }
        setTimeout(() => {
            if (this.percent) {
                window.addEventListener('resize', this.resizeTableWidth, false);
                this.$once('hook:beforeDestroy', () => {
                    window.removeEventListener('resize', this.resizeTableWidth);
                });
            }
        }, 1000);
    },
    methods: {
        // 监听页面宽度改变
        resizeTableWidth() {
            if (this.setColWidthTimer) clearTimeout(this.setColWidthTimer);
            this.setColWidthTimer = setTimeout(() => {
                SetColWidth(this, this.headerData);
            }, 300);
        },
        // 设置滚动条状态
        setBar() {
            this.$nextTick(() => {
                const {
                    height, maxHeight, $refs: { tableMain }, scrollBar
                } = this;
                if (!tableMain) return;
                let h;
                if (height && maxHeight) {
                    h = height < maxHeight ? height : maxHeight;
                } else if (height && !maxHeight) {
                    h = height;
                } else if (!height && maxHeight) {
                    h = maxHeight;
                } else {
                    h = 0;
                }
                if (!h) return;
                const tableMainH = tableMain.$el.clientHeight;
                const hasBar = (tableMainH + scrollBar) > h;
                this.setColWidthByHasBar(hasBar);
                this.hasBar = hasBar;
            });
        },
        // 当有滚动条时重新设置宽度
        setColWidthByHasBar(hasBar) {
            if (!hasBar) return;
            const {
                colWidth, tableWidth, lastIndex, scrollBar
            } = this;
            colWidth[lastIndex] -= scrollBar;
            this.tableWidth = tableWidth - scrollBar;
        },
        // 改变loading状态
        changeLoadingShow(status) {
            const { loadingShow } = this;
            if (status === loadingShow) return;
            this.loadingShow = status;
        },
        // 设置头部数据
        setHeaderData(data, history) {
            SetHeaderData(this, data, history);
        },
        /**
         * 设置table数据
         * history 表示设置历史数据
         * */
        setTableData(data, history) {
            SetTableTreeData(this, data, history);
        },

        // 监听滚动条滚动
        tableScroll(e) {
            const { target: { scrollLeft } } = e,
                { $refs: { headerContent } } = this;
            this.headerScrollLeft = scrollLeft;
            if (headerContent) headerContent.scrollLeft = scrollLeft;
        },
        // 设置HeaderSetting显示状态
        setHeaderSettingStatus() {
            const status = this.settingStatus;
            if (status) {
                this.changeSettingStatus(false);
                if (this.hsDrop) this.hsDrop.settingStatus = false;
            } else {
                if (this.hsDrop) {
                    HSDrop.resetPosition(this.hsDrop);
                    this.changeSettingStatus(true);
                } else {
                    const {
                        headerHistoryData: initData,
                        headerSettingData,
                        draggable,
                        $refs: { settingTag }
                    } = this;
                    this.hsDrop = HSDrop({
                        tag: settingTag,
                        propsData: {
                            parent: this,
                            initData,
                            draggable,
                            data: headerSettingData
                        }
                    }).$on('changeSettingStatus', settingStatus => {
                        this.changeSettingStatus(settingStatus);
                    }).$on('checkedHandle', (checkedData, currentData, type) => {
                        this.checkedHandle(checkedData);
                        this.$emit('settingChange', JSON.parse(JSON.stringify(currentData)), type);
                    }).$on('settingCancel', (type) => {
                        this.$emit('settingCancel', type);
                    })
                        .$on('settingReset', (type) => {
                            this.$emit('settingReset', type);
                        });

                    this.hsDrop.$nextTick(() => {
                        HSDrop.resetPosition(this.hsDrop);
                        this.changeSettingStatus(true);
                    });
                    this.$once('hook:beforeDestroy', () => {
                        if (this.hsDrop) HSDrop.remove(this.hsDrop);
                    });
                }
            }
        },
        // 改变设置显示状态
        changeSettingStatus(status) {
            this.settingStatus = status;
        },
        // 设置-选中的状态
        checkedHandle(checkedData) {
            CheckedHandle(this, checkedData);
        },
        // 头部全部选中[取消]
        selectedAll(status) {
            this.checkStatus = status;
            const { tableData, fixedTableLeftData } = this;
            this.tableData = tableData.map(d => {
                d.checked = status;
                return d;
            });
            this.fixedTableLeftData = fixedTableLeftData.map(d => {
                d.checked = status;
                return d;
            });

            // 提交选中的数据
            if (status === 'checked') {
                const checkedIds = [];
                tableData.forEach(d => {
                    checkedIds.push(d.id);
                });
                this.selectedIds = checkedIds;
                this.$emit('select', checkedIds, JSON.parse(JSON.stringify(tableData))); // 提交选中的数据
            } else {
                this.selectedIds = [];
                this.$emit('select', [], []);
            }
        },
        // 清除选中
        clearSelected() {
            this.selectedAll('uncheck');
        },
        // 顶部按钮回调
        topButtonHandle(obj) {
            const { disabled, event, id } = obj;
            if (disabled) return;
            this.$emit(event, id);
        },
        // 点击每行
        rowClick(item) {
            this.$emit('rowClick', JSON.parse(JSON.stringify(item)));
        },
        // 强制重置header数据
        resetHeaderData(data) {
            this.setHeaderData(JSON.parse(JSON.stringify(data)), true);
        },
        // 强制重置table数据
        resetTableData(data) {
            const { sortAjax, defaultSort } = this;
            let tData = JSON.parse(JSON.stringify(data));
            if (!sortAjax && defaultSort && defaultSort.key) {
                const { key, sort: { status, type } } = defaultSort;
                if (status) tData = TreeSort(tData, key, status, type);
            }
            this.setTableData(tData, true);
        },
        // 设置鼠标hoer、设置selected选中
        setStatus(status, i) {
            const { tableData } = this;
            this.tableData = tableData.map((d, di) => {
                d[status] = di === i;
                return d;
            });
        },
        // 改变线条位置
        changeLineLeft(val) {
            this.lineLeft = val;
        },
        // 改变列宽 ind-索引 val-对应索引的值 cv-改变的值
        changeColWidth(ind, val, cv) {
            const {
                tableWidth,
                colWidth,
                colWidthLeft, colWidthRight,
                fixedHeaderLeftData, fixedHeaderRightData
            } = this;
            this.tableWidth = Number(tableWidth) + cv;
            this.$set(this.colWidth, ind, val);
            if (fixedHeaderLeftData.length && colWidthLeft[ind]) {
                this.$set(this.colWidthLeft, ind, val);
                this.fixedLeftWidth += cv;
            }
            // 设置右侧固定数据
            if (fixedHeaderRightData.length) {
                const cwl = colWidth.length,
                    i = colWidthRight.length - (cwl - ind);
                if (colWidthRight[i]) {
                    this.$set(this.colWidthRight, i, val);
                    this.fixedRightWidth += cv;
                }
            }
        },
        resizeDown(startX, ind) {
            ResizeDown(this, startX, ind);
        },
        resizeMove(e) {
            ResizeMove(this, e);
        },
        resizeUp() {
            ResizeUp(this);
        }
    }
};
</script>

<style lang="stylus">
    @import "../static/stylus/table/table.styl"

</style>
