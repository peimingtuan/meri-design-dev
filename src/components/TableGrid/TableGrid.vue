<template>
    <div class="p-table-grid p-table-layout"
         :class="{'p-table-layout-border': border}"
         :style="{width: percent ? width : `${width}px`}"
        >
        <div v-if="headerData.some(d => d.resizable) && lineLeft" class="p-table-layout-line" :style="{left: `${lineLeft}px`}"></div>
        <div class="p-table-layout-loading" v-show="loadingShow"><TableLoading width="36" height="36" /></div>
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
                    <div class="p-table-top-select-right" @click="clearSelected">取消选择</div>
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
                            :colWidth="colWidth"
                            :rowTools="rowTools"
                            :header="headerOriginalData"
                            :data="headerData"
                            :checkbox="checkbox"
                            :disabled="checkboxDisabled"
                            :checked="checkStatus"
                            :border="border"
                            :setting="setting"
                            :disableSort="disableSort"
                            :sortAjax="sortAjax"
                            :scrollBar="scrollBar"
                            :hasBar="hasBar"
                            :rowNumber="rowNumber"
                            :rowNumberName="rowNumberName"
                            :dimension="dimension"
                            :groupName="groupName"
                            @selectedAll="selectedAll"
                            @resizeDown="resizeDown"
                    />
                </div>
                <!-- 左侧-固定数据是否显示 -->
                <template v-if="tableData.length && fixedHeaderLeftData.length">
                    <div class="p-table-layout-header-fixed p-table-layout-header-fixed-left"
                         :class="[dimension ? 'p-table-layout-header-fixed-dimension' : 'p-table-layout-header-fixed-normal']"
                         v-show="headerScrollLeft">
                        <TableHeader
                                key="tableHeaderLeft"
                                :width="fixedLeftWidth"
                                :data="fixedHeaderLeftData"
                                :checkbox="checkbox"
                                :disabled="checkboxDisabled"
                                :checked="checkStatus"
                                :border="border"
                                :disableSort="disableSort"
                                :sortAjax="sortAjax"
                                :colWidth="colWidthLeft"
                                :rowNumber="rowNumber"
                                :rowNumberName="rowNumberName"
                                :dimension="dimension"
                                :groupName="groupName"
                                @selectedAll="selectedAll"
                                @resizeDown="resizeDown"
                        />
                    </div>
                </template>
                <!-- 右侧-固定数据是否显示 -->
                <template v-if="tableData.length && (fixedHeaderRightData.length || (rowTools && rowTools.open && rowTools.fixed === 'right'))">
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
                                :data="fixedHeaderRightData"
                                :border="border"
                                :colWidth="colWidthRight"
                                :rowTools="rowTools"
                                :dimension="dimension"
                                :groupName="groupName"
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
                         ref="settingTag"
                         @click="setHeaderSettingStatus"
                        >
                        <span class="p-table-header-setting-svg"><SettingSvg width="20" height="20" /></span>
                        <div class="p-header-setting-status" v-show="settingStatus"></div>
                    </div>
                </template>
            </div>
            <!--table头部 -e -->

            <!--table主体 -s -->
            <div class="p-table-layout-content">
                <div v-if="!tableData || !tableData.length" class="p-table-no-data">
                    <!--<img src="http://47.95.122.141:8200/persagy_ui_kit/empty/data.png" alt="暂无数据">-->
                    <section class="p-table-no-data-text">暂无数据</section>
                </div>
                <div class="p-table-layout-main"
                     ref="tableLayoutMain"
                     :style="{
                        height: height&&`${Number(height) + ((width <= tableWidth) ? scrollBar : 0)}px`,
                        maxHeight: maxHeight&&`${Number(maxHeight) + ((width <= tableWidth) ? scrollBar : 0)}px`
                     }"
                     @scroll="tableScroll"
                     v-else
                    >
                    <TableMain
                            v-if="tableData && tableData.length"
                            key="tableMain"
                            ref="tableMain"
                            :width="tableWidth"
                            :header="headerData"
                            :statistics="statistics"
                            :data="tableData"
                            :checkbox="checkbox"
                            :rowTools="rowTools"
                            :colWidth="colWidth"
                            :border="border"
                            :setting="setting"
                            :scrollLeft="headerScrollLeft"
                            :scrollBar="scrollBar"
                            :hasBar="hasBar"
                            :render="render"
                            :openSelect="openSelect"
                            :rowNumber="rowNumber"
                            :bodyBgColor="dimension && bodyBgColor"
                            :groupName="groupName"
                            @select="selectHandle"
                            @rowClick="rowClick"
                            @setStatus="setStatus"
                    >
                        <template v-for="th in headerData" #[th.key]="{item}">
                            <slot :name="th.key" :item="item"/>
                        </template>
                    </TableMain>
                    <template v-if="fixedHeaderLeftData.length && tableData.length">
                        <div class="p-table-layout-main-fixed p-table-layout-main-fixed-left"
                             :style="{width: `${fixedLeftWidth}px`, left: `${headerScrollLeft}px`}"
                             v-show="headerScrollLeft"
                        >
                            <TableMain
                                ref="tableLeft"
                                key="tableMainLeft"
                                :width="fixedLeftWidth"
                                :header="fixedHeaderLeftData"
                                :statistics="statistics"
                                :data="tableData"
                                :checkbox="checkbox"
                                :colWidth="colWidthLeft"
                                :border="border"
                                :render="render"
                                :openSelect="openSelect"
                                :rowNumber="rowNumber"
                                :bodyBgColor="dimension && bodyBgColor"
                                :groupName="groupName"
                                fixed="left"
                                @select="selectHandle"
                                @rowClick="rowClick"
                                @setStatus="setStatus"
                            >
                                <template v-for="th in headerData" #[th.key]="{item}">
                                    <slot :name="th.key" :item="item"/>
                                </template>
                            </TableMain>
                        </div>
                    </template>
                    <template v-if="(fixedHeaderRightData.length || rowTools && rowTools.open) && tableData.length">
                        <div class="p-table-layout-main-fixed p-table-layout-main-fixed-right"
                             :style="{width: `${fixedRightWidth}px`, right: `${-headerScrollLeft}px`}"
                             v-show="(headerScrollLeft+clientWidth+(hasBar ? scrollBar : 0)) < tableWidth"
                        >
                            <TableMain
                                ref="tableRight"
                                key="tableMainRight"
                                :width="fixedRightWidth"
                                :header="fixedHeaderRightData"
                                :statistics="statistics"
                                :data="tableData"
                                :colWidth="colWidthRight"
                                :border="border"
                                :setting="setting"
                                :render="render"
                                :openSelect="openSelect"
                                :rowTools="(rowTools && rowTools.fixed === 'right') ? rowTools : {}"
                                :bodyBgColor="dimension && bodyBgColor"
                                :groupName="groupName"
                                fixed="right"
                                @setStatus="setStatus"
                                @rowClick="rowClick"
                            >
                                <template v-for="th in headerData" #[th.key]="{item}">
                                    <slot :name="th.key" :item="item"/>
                                </template>
                            </TableMain>
                        </div>
                    </template>
                </div>
            </div>
            <!--table主体 -e -->
        </div>
    </div>
</template>

<script>
import TableLoading from '../static/iconSvg/tableLoading.svg';
import SettingSvg from '../static/iconSvg/setting.svg';

import Button from '../Button';

import TableHeader from '../TableHeader/TableHeader';
import TableMain from './depend/TableMain';

import GetScrollbarWidth from '../static/utils/GetScrollbarWidth';

import HSDrop from '../TableHeader/HeaderSetting';
import { SetHeaderData, CheckedHandle, SetColWidth } from '../TableHeader/utils/SetHeaderData';
import SetTableGridData from './utils/SetTableGridData';
import QuickSort from './utils/Utils';
import { ResizeDown, ResizeMove, ResizeUp } from '../TableHeader/utils/Resizable';
import SetStatus from './depend/SetStatus';
import GetCheckedData from './utils/GetCheckedData';
import SetRowToolsStatus from './utils/SetRowToolsStatus';

export default {
    name: 'TableGrid',
    components: {
        TableLoading, SettingSvg, Button, TableHeader, TableMain
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
            default: () => []
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
        checkboxDisabled: {
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
        // 每列平均宽度
        average: {
            type: [Number, String],
            default: 80
        },
        // 自定义渲染 为custom表示自定义渲染
        render: {
            type: String,
            default: ''
        },
        // 显示行号
        rowNumber: {
            type: Boolean,
            default: false
        },
        // 行号名字
        rowNumberName: {
            type: [Number, String],
            default: '#'
        },
        // header - 多维度数据
        dimension: {
            type: Boolean,
            default: false
        },
        // data - 多维度数据的背景颜色
        bodyBgColor: {
            type: Boolean,
            default: true
        },
        // 分组展示
        groupName: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            loadingShow: false, // 显示loading
            settingStatus: false, // HeaderSetting显示状态
            clientWidth: 0, // table 父级宽度
            tableWidth: 0, // table宽度
            lastIndex: 0, // 需要计算减去的最后一个索引
            headerData: [], // 表头数据
            headerHistoryData: [], // 表头历史数据
            headerOriginalData: [], // 表头原始数据
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
            handler(n, o = []) {
                const nData = JSON.stringify(n),
                    oData = JSON.stringify(o);
                this.setHeaderData(JSON.parse(nData), (!oData || oData.length <= 4));
            },
            deep: true
        },
        data: {
            handler(n) {
                const nData = JSON.stringify(n);
                // this.changeLoadingShow(true);
                this.initTableData(nData);
            },
            deep: true
        },
        // 设置loading
        loading(n, o) {
            if (n === o) return;
            this.changeLoadingShow(n);
        }
    },
    /* created() {
        this.changeLoadingShow(true);
    }, */
    mounted() {
        this.scrollBar = GetScrollbarWidth();
        const { header, data } = this;
        this.setHeaderData(JSON.parse(JSON.stringify(header)), res => {
            this.headerHistoryData = JSON.parse(JSON.stringify(res));
        });
        const strData = JSON.stringify(data);
        if (strData.length > 4) this.initTableData(strData);

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
        setHeaderData(data, history = false) {
            SetHeaderData(this, data, history);
        },
        // 初始化table数据
        initTableData(strData) {
            const { sortAjax, defaultSort, groupName } = this;
            let tData = JSON.parse(strData);
            if (!sortAjax && defaultSort && defaultSort.key) {
                const { key, sort: { status, type } } = defaultSort;
                if (status) {
                    if (groupName) {
                        tData.forEach(d => {
                            if (d.children && JSON.stringify(d.children).length > 4) {
                                d.children = QuickSort(d.children, key, status, type);
                            }
                        });
                    } else {
                        tData = QuickSort(tData, key, status, type);
                    }
                }
            }
            this.setTableData(tData, true, true);
        },
        /**
         * 设置table数据
         * history 表示设置历史数据
         * init 初始化
         * */
        setTableData(data, history = false, init) {
            SetTableGridData(this, data, history, init);
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
                        headerHistoryData: initData, headerSettingData, draggable, $refs: { settingTag }
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
        // 选中回调
        selectHandle(ids, data) {
            const { tableData, groupName } = this,
                idLen = ids.length;
            let tdLen = 0;
            if (groupName) {
                tableData.forEach(d => {
                    const { children } = d;
                    if (children && children.length) tdLen += children.length;
                });
            } else {
                tdLen = tableData.length;
            }
            SetRowToolsStatus(this, !!ids.length);
            this.selectedIds = ids;
            this.checkStatus = idLen ? (idLen === tdLen ? 'checked' : 'notNull') : 'uncheck';
            this.$emit('select', ids, JSON.parse(JSON.stringify(data)));
        },
        // 关闭顶栏
        closeTopBar() {
            this.checkStatus = 'uncheck';
            this.selectedIds = [];
            SetRowToolsStatus(this, false);
        },
        // 头部全部选中[取消]
        selectedAll(status) {
            this.checkStatus = status;
            const { tableData, groupName } = this;
            if (groupName) {
                this.tableData = tableData.map(d => {
                    const { children } = d;
                    if (children && children.length) {
                        d.children = children.map(cd => {
                            cd.checked = status;
                            return cd;
                        });
                    }
                    return d;
                });
            } else {
                this.tableData = tableData.map(d => {
                    d.checked = status;
                    return d;
                });
            }

            SetRowToolsStatus(this, true);
            // 提交选中的数据
            const { checkedIds = [], checkedData = [] } = GetCheckedData(this.tableData, groupName);
            this.selectedIds = checkedIds;
            SetRowToolsStatus(this, !!checkedIds.length);
            this.$emit('select', checkedIds, checkedData);
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
                if (status) tData = QuickSort(tData, key, status, type);
            }
            this.setTableData(tData, true);
        },
        // 设置鼠标hoer、设置selected选中、flag - enter/leave
        setStatus(status, i, flag) {
            SetStatus(this, status, i, flag);
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
        },
        // 点击每行 - 提交回调
        rowClick(item) {
            this.$emit('rowClick', JSON.parse(JSON.stringify(item)));
        }
    }
};
</script>

<style lang="stylus">
@import "../static/stylus/table/table.styl"

</style>
