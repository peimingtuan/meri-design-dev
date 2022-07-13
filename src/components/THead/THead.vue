<template>
    <div class="p-table-grid p-table-layout"
         :class="{'p-table-layout-border': border}"
         :style="{width: percent ? width : `${width}px`}"
        >
        <div v-if="headerData.some(d => d.resizable) && lineLeft" class="p-table-layout-line" :style="{left: `${lineLeft}px`}"></div>
        <div v-if="headerData&&headerData.length"
             class="p-table-layout-wrapper"
             :style="{maxWidth: percent ? width : `${width}px`}"
             ref="tableGridRef"
            >
            <!--table头部 -s -->
            <div class="p-table-layout-header"
                 :class="[
                     `p-table-layout-header-${dimension ? 'dimension' : 'normal'}${border ? '-border' : '' }`,
                     hasBar&&'p-table-layout-header-has-bar'
                 ]"
                 @mousemove="resizeMove"
                 @mouseup="resizeUp"
                >
                <div class="p-table-layout-header-content"
                     :class="{'p-table-layout-header-content-events': lineLeft}"
                     ref="headerContent"
                     >
                    <TableHeader
                            key="tableHeader"
                            :width="tableWidth"
                            :colWidth="colWidth"
                            :header="headerOriginalData"
                            :data="headerData"
                            :checkbox="checkbox"
                            :checked="checkStatus"
                            :border="border"
                            :setting="setting"
                            :disableSort="disableSort"
                            :sortAjax="sortAjax"
                            :scrollBar="scrollBar"
                            :hasBar="hasBar"
                            :rowNumber="rowNumber"
                            :dimension="dimension"
                            @selectedAll="selectedAll"
                            @resizeDown="resizeDown"
                    />
                </div>
                <!-- 左侧-固定数据是否显示 -->
                <template v-if="fixedHeaderLeftData.length">
                    <div class="p-table-layout-header-fixed p-table-layout-header-fixed-left"
                         :class="[dimension ? 'p-table-layout-header-fixed-dimension' : 'p-table-layout-header-fixed-normal']"
                         v-show="headerScrollLeft">
                        <TableHeader
                                key="tableHeaderLeft"
                                :width="fixedLeftWidth"
                                :data="fixedHeaderLeftData"
                                :checkbox="checkbox"
                                :checked="checkStatus"
                                :border="border"
                                :disableSort="disableSort"
                                :sortAjax="sortAjax"
                                :colWidth="colWidthLeft"
                                :rowNumber="rowNumber"
                                :dimension="dimension"
                                @selectedAll="selectedAll"
                                @resizeDown="resizeDown"
                        />
                    </div>
                </template>
                <!-- 右侧-固定数据是否显示 -->
                <template v-if="fixedHeaderRightData.length">
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
                         ref="settingTag"
                        >
                        <span class="p-table-header-setting-svg"><SettingSvg width="20" height="20" @click.native="setHeaderSettingStatus" /></span>
                        <div class="p-header-setting-status" v-show="settingStatus"></div>
                    </div>
                </template>
            </div>
            <!--table头部 -e -->
            <slot/>
        </div>
    </div>
</template>

<script>
import SettingSvg from '../static/iconSvg/setting.svg';

import TableHeader from '../TableHeader/TableHeader';

import GetScrollbarWidth from '../static/utils/GetScrollbarWidth';
import HSDrop from '../TableHeader/HeaderSetting';
import { SetHeaderData, CheckedHandle, SetColWidth } from '../TableHeader/utils/SetHeaderData';
import { ResizeDown, ResizeMove, ResizeUp } from '../TableHeader/utils/Resizable';

export default {
    name: 'THead',
    components: {
        SettingSvg, TableHeader
    },
    props: {
        // table头部数据
        header: {
            type: Array,
            default: () => []
        },
        // 宽
        width: {
            type: [String, Number],
            default: '500'
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
        // 表头checkbox选中状态
        checked: {
            type: String,
            default: 'uncheck'
        },
        // 开启操作栏
        rowTools: {
            type: Object,
            default: () => ({
                open: false, width: 0, fixed: '', event: ''
            })
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
        // 设置 可拖动排序
        draggable: {
            type: Boolean,
            default: false
        },
        // 后端排序
        sortAjax: {
            type: Boolean,
            default: false
        },
        // 每列平均宽度
        average: {
            type: [Number, String],
            default: 80
        },
        // 显示行号
        rowNumber: {
            type: Boolean,
            default: false
        },
        // header - 多维度数据
        dimension: {
            type: Boolean,
            default: false
        },
        // 表体-是否有滚动条
        hasBar: {
            type: Boolean,
            default: false
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
            // hasBar: false, // 页面是否有滚动条
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
        colWidth: {
            handler(n, o) {
                const nData = JSON.stringify(n),
                    oData = JSON.stringify(o);
                if (nData === oData) return;
                this.$emit('getColWidth', JSON.parse(nData));
            },
            deep: true
        },
        checked(n, o) {
            if (n === o) return;
            this.checkStatus = n;
        }
    },
    mounted() {
        this.scrollBar = GetScrollbarWidth();
        const { header } = this;
        this.setHeaderData(JSON.parse(JSON.stringify(header)), res => {
            this.headerHistoryData = JSON.parse(JSON.stringify(res));
        });

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
        // 当有滚动条时重新设置宽度
        setColWidthByHasBar(hasBar) {
            if (!hasBar) return;
            const {
                colWidth, tableWidth, lastIndex, scrollBar
            } = this;
            colWidth[lastIndex] -= scrollBar;
            this.tableWidth = tableWidth - scrollBar;
        },
        // 设置头部数据
        setHeaderData(data, history = false) {
            SetHeaderData(this, data, history);
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
                    }).$on('settingCancel', type => {
                        this.$emit('settingCancel', type);
                    })
                        .$on('settingReset', type => {
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
            this.$emit('select', status);
        },
        // 强制重置header数据
        resetHeaderData(data) {
            this.setHeaderData(JSON.parse(JSON.stringify(data)), true);
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
