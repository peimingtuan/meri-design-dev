<template>
    <table cellspacing="0" cellpadding="0" border="0"
           :class="['p-table-tree-main', border&&'p-table-tree-main-border', setting&&'p-table-tree-main-setting', 'p-table-tree-main-'+fixed]"
           :style="{ width: `${width}px` }"
    >
        <colgroup>
            <col v-for="(w, wi) in colWidth" :width="w" :key="`width-${w}-${wi}`">
        </colgroup>
        <thead v-if="statistics && statistics.open">
        <tr :class="['p-table-tree-tr', 'p-table-tree-head-tr',
             statistics&&statistics.link&&'p-table-tree-tr-link']"
            :data-link="statistics&&statistics.link"
            :key="`statistics-${statistics.id}`"
        >
            <template v-for="(th, thi) in header">
                <th :class="[
                            'p-table-tree-td',
                             border&&thi>0&&'p-table-tree-td-border',
                              (th.align === 'right')&&`p-table-tree-td-padding${setPaddingLevel(th)}`
                        ]"
                    :key="`${statistics.id}-td-${thi}`"
                >
                    <div class="p-table-tree-cell" :style="thi===0&&statistics.paddingLeft&&{paddingLeft: `${statistics.paddingLeft}px`}">
                        <section :class="[
                                        'p-table-tree-cell-item',
                                         (fixed!=='right'&&thi===0&&statistics.children&&statistics.children.length)&&'p-table-tree-cell-item-first',
                                         `p-table-tree-cell-item-${th.align}`, statistics[th.key].link&&'p-table-tree-cell-item-link'
                                     ]"
                        >
                            <span v-if="statistics[th.key].dot" class="p-table-cell-dot" :style="{backgroundColor: statistics[th.key].dot}"></span>
                            <span class="p-table-tree-cell-text p-table-tree-cell-bold"
                                  :style="{maxWidth: `${setSpanWidth(th, statistics[th.key], thi)}px`, color: statistics[th.key].color}"
                                  @mouseenter="TextEllipsis"
                            >{{statistics[th.key].text}}</span>
                            <span v-if="statistics[th.key].arrow && statistics[th.key].arrow.dir"
                                  :class="['p-table-cell-arrow', `p-table-cell-arrow-${statistics[th.key].arrow.dir}`]"
                            >
                                    <UpSvg />
                                </span>
                        </section>
                    </div>
                </th>
            </template>
            <th v-if="rowTools.open"
                :class="[
                            'p-table-tree-td',
                             border&&'p-table-tree-td-border',
                        ]"
                >
                <div class="p-table-tree-cell">
                    <section class="p-table-tree-cell-item">
                        <span class="p-table-tree-cell-text p-table-tree-cell-bold">--</span>
                    </section>
                </div>
            </th>
        </tr>
        </thead>
        <tbody>
        <template v-for="(item, i) in data">
            <tr :class="[
                        'p-table-tree-tr',
                        'p-table-tree-body-tr',
                        item.link&&'p-table-tree-tr-link',
                        !item.selected&&item.hover&&'p-table-tree-tr-hover',
                        openSelect&&item.selected&&'p-table-tree-tr-selected'
                    ]"
                :data-link="item.link" :key="`tr-${item.id}-${i}`"
                v-show="item.show"
                @mouseenter="rowEnter(i)"
                @mouseleave="rowLeave"
                @click="rowClick(item, i)"
                >
                <template v-for="(th, thi) in header">
                    <td :class="[
                                'p-table-tree-td',
                                'p-table-tree-body-td',
                                border&&thi>0&&'p-table-tree-td-border',
                                thi===0&&'p-table-tree-td-first-child',
                                (thi===(header.length-1) && !rowTools.open)&&'p-table-tree-td-last-child',
                                (th.align === 'right')&&`p-table-tree-td-padding${setPaddingLevel(th)}`
                             ]"
                        :key="`${item.id}-td-${thi}`"
                    >
                        <div class="p-table-tree-cell" :style="(fixed!=='right'&&thi===0&&item.paddingLeft)&&{paddingLeft: `${item.paddingLeft}px`}">
                            <section class="p-table-tree-triangle"
                                     v-if="fixed!=='right'&&thi===0&&item.children&&item.children.length"
                                     @click.stop="openChild(item)"
                            >
                                <span :class="['p-table-tree-triangle-span', item.open&&'p-table-tree-triangle-open']"><TriangleSvg /></span>
                            </section>
                            <section :class="[
                                            'p-table-tree-cell-item',
                                             (fixed!=='right'&&thi===0&&item.children&&item.children.length)&&'p-table-tree-cell-item-first',
                                             th.align&&`p-table-tree-cell-item-${th.align}`,
                                              item[th.key]&&item[th.key].link&&'p-table-tree-cell-item-link'
                                         ]"
                            >
                                <slot v-if="render === 'custom'" :name="th.key" :item="{headerKey :th.key,rowIndex: i, colIndex: thi, item}"/>
                                <template v-else>
                                    <span v-if="item[th.key]&&item[th.key].dot" class="p-table-cell-dot" :style="{backgroundColor: item[th.key].dot}"></span>
                                    <span class="p-table-tree-cell-text"
                                          :style="{maxWidth: `${setSpanWidth(th, item[th.key], thi)}px`, color: item[th.key]&&item[th.key].color}"
                                          @mouseenter="TextEllipsis"
                                    >{{item[th.key]&&item[th.key].text}}</span>
                                    <span v-if="item[th.key] && item[th.key].arrow && item[th.key].arrow.dir"
                                          :class="['p-table-cell-arrow', `p-table-cell-arrow-${item[th.key].arrow.dir}`]"
                                        >
                                            <UpSvg />
                                        </span>
                                </template>
                            </section>
                        </div>
                    </td>
                </template>
                <!-- 操作栏 -->
                <template v-if="rowTools.open">
                    <td :class="[
                                'p-table-tree-td',
                                'p-table-tree-body-td',
                                'p-table-tree-td-last-child',
                                border&&'p-table-tree-td-border'
                            ]"
                    >
                        <div class="p-table-tree-cell">
                            <section class="p-table-cell-handle">
                                <template v-if="item.tools.data && item.tools.data.length">
                                    <article class="p-table-cell-handle-item"
                                             v-for="(hd, hdi) in item.tools.data"
                                             :key="`${item.id}-${hd.id}-${hdi}`"
                                             @click.stop="tableCellHandle([hd.id, hd], item.tools)"
                                    >
                                        <span :class="[hd.disabled ? 'p-table-handle-text-disabled' : 'p-table-handle-text']">{{hd.name}}</span>
                                    </article>
                                </template>
                                <article v-if="item.tools.moreOpen" class="p-table-cell-handle-item p-table-more-point">
                                    <Dropdown
                                        :data="item.tools.more"
                                        v-model="item.tools.moreId"
                                        trigger="click"
                                        minWidth="120"
                                        maxHeight="190"
                                        :alignRight="true"
                                        :arrow="true"
                                        :triangle="false"
                                        translateX="10"
                                        :key="`${item.id}-${i}`"
                                        @change="tableCellHandle([...arguments], item.tools)"
                                        >
                                        <i class="p-table-more-point-box">
                                            <MorePointSvg
                                                :class="[
                                                    JSON.stringify(item.tools.more).length > 4
                                                    ? 'p-table-more-point-normal'
                                                    : 'p-table-more-point-disabled'
                                                ]"
                                            />
                                        </i>
                                    </Dropdown>
                                </article>
                            </section>
                        </div>
                    </td>
                </template>
            </tr>
        </template>
        </tbody>
    </table>
</template>

<script>
import MorePointSvg from '../../static/iconSvg/morePoint.svg';
import TriangleSvg from '../../static/iconSvg/triangle.svg';
import UpSvg from '../../static/iconSvg/up.svg';
// import Checkbox from '../../Checkbox';
// import Icon from '../../Icon';
import Dropdown from '../../Dropdown/Dropdown';
import TextEllipsis from '../../static/utils/TextEllipsis';

export default {
    name: 'TableTreeMain',
    components: {
        MorePointSvg,
        TriangleSvg,
        UpSvg,
        // Checkbox,
        // Icon,
        Dropdown
    },
    props: {
        width: {
            type: [String, Number],
            default: ''
        },
        // 表头
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
        // 开启操作栏
        rowHandle: {
            type: Object,
            default: () => ({
                open: false, fixed: '', data: [], more: []
            })
        },
        // 开启checkbox
        checkbox: {
            type: Boolean,
            default: false
        },
        // 开启操作栏
        rowTools: {
            type: Object,
            default: () => ({})
        },
        // table每列宽度
        colWidth: {
            type: Array,
            default: () => []
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
        // 显示设置
        hasBar: {
            type: Boolean,
            default: false
        },
        // 是否是固定数据
        fixed: {
            type: String,
            default: ''
        },
        // 滚动的X距离
        scrollLeft: {
            type: [String, Number],
            default: 0
        },
        // 滚动的X距离
        scrollBar: {
            type: [String, Number],
            default: 0
        },
        // 自定义渲染 为custom表示自定义渲染
        render: {
            type: String,
            default: ''
        },
        // 开启选中状态
        openSelect: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            rowToolInd: null, // 当前是否显示
            toolTop: null // 距离顶部索引
        };
    },
    methods: {
        TextEllipsis,
        // 设置文字宽度
        setSpanWidth(th, obj, hi) {
            const { colWidth, border } = this,
                { dot, arrow } = obj;
            const num = th.align === 'right' ? this.setPaddingNum(th) : 0,
                dw = typeof dot === 'string' ? 10 : 0,
                aw = (arrow && arrow.dir) ? 16 : 0,
                thw = colWidth[hi]; // th的宽度
            return (thw - 40 - num - dw - aw - border);
        },
        // 展开子集
        openChild(item) {
            const { id, open } = item,
                status = !open;
            item.open = status;
            this.setChildOpen(id, status);
        },
        // 设置子项展开
        setChildOpen(parentId, status) {
            const { data } = this;
            data.forEach(d => {
                if (d.parentId === parentId) {
                    d.show = status;
                    if (!status) this.setChildClose(d.id);
                }
            });
            this.$emit('setBar');
        },
        // 设置子项关闭
        setChildClose(parentId) {
            const { data } = this;
            data.forEach(d => {
                if (d.id === parentId) d.open = false;
                if (d.parentId === parentId) {
                    d.show = false;
                    this.setChildClose(d.id);
                }
            });
            this.$emit('setBar');
        },
        rowEnter(i) {
            this.$emit('setStatus', 'hover', i);
        },
        rowLeave() {
            this.$emit('setStatus', 'hover', null);
        },
        // 点击每行
        rowClick(item, i) {
            if (item.link) this.$emit('rowClick', item);
            const { openSelect } = this;
            if (!openSelect) return;
            this.$emit('setStatus', 'selected', i);
        },
        // 查找上一个tr
        findPreRow(arrRow, ind) {
            for (let i = ind; i >= 0; i--) {
                if (window.getComputedStyle(arrRow[i]).display !== 'none') return arrRow[i];
            }
        },
        // 设置距离顶部距离
        setTop(arr, pre) {
            if (pre && pre.className.includes('p-table-tree-tr')) {
                if (window.getComputedStyle(pre).display !== 'none') arr.push(pre);
                this.setTop(arr, pre.previousSibling);
            }
        },
        // 设置td的右边内边距
        setPaddingLevel(th) {
            const { screen, sort, tip } = th;
            let str = '';
            if (screen && screen.open) str += '-screen';
            if (sort && sort.open) str += '-sort';
            if (tip && tip.open) str += '-tip';
            return str;
        },
        setPaddingNum(th) {
            const { screen, sort, tip } = th;
            let num = 0;
            if (screen && screen.open) num += 24;
            if (sort && sort.open) num += 16;
            if (tip && tip.open) num += 28;
            return num;
        },
        // 操作栏点击事件
        tableCellHandle([id, item], tools) {
            tools.event(id, item);
        }
    }
};
</script>

<style lang="stylus">

.p-table-tree-main
    display table
    margin 0
    table-layout fixed
    width 100%
    font-size 0
.p-table-tree-main-setting
    .p-table-tree-tr
        .p-table-tree-td-last-child
            padding-right 48px
    .p-table-tree-head-tr
        .p-table-tree-td:last-child
            padding-right 48px
.p-table-tree-main-border
    .p-table-tree-tr
        .p-table-tree-td-border
            border-left 1px solid $grey-200
.p-table-tree-main-
    .p-table-tree-td-first-child
        border-top-left-radius 24px
        border-bottom-left-radius 24px
    .p-table-tree-td-last-child
        border-top-right-radius 24px
        border-bottom-right-radius 24px
.p-table-tree-main-left
    .p-table-tree-td-first-child
        border-top-left-radius 24px
        border-bottom-left-radius 24px
.p-table-tree-main-right
    .p-table-tree-td-last-child
        border-top-right-radius 24px
        border-bottom-right-radius 24px

.p-table-tree-tr
    border 0
.p-table-tree-body-tr
    position relative
.p-table-tree-tr-link
    cursor pointer
.p-table-tree-tr-hover
    .p-table-tree-body-td
        position relative
        border-bottom-color $theme
        background-color $grey-100
        border-left-color $grey-100 !important
        &:before
            position absolute
            left 0
            top -1px
            background-color $theme
            width 100%
            height 1px
            content ''
.p-table-tree-tr-selected
    .p-table-tree-body-td
        position relative
        border-bottom-color $theme
        background-color $blue-100
        border-left-color $blue-100 !important
        &:before
            position absolute
            left 0
            top -1px
            background-color $theme
            width 100%
            height 1px
            content ''
.p-table-tree-tr-clear-bl
    .p-table-tree-td
        border-bottom-color $theme
.p-table-tree-tr-bg
    .p-table-tree-td
        background-color $grey-100
.p-table-tree-td
    background-color $theme
    border-top 0
    border-left 0
    border-right 0
    border-bottom 1px solid $grey-200
    transition background-color .3s
.p-table-tree-td-padding-screen
    .p-table-tree-cell
        .p-table-tree-cell-item
            padding-right 24px
.p-table-tree-td-padding-sort
    .p-table-tree-cell
        .p-table-tree-cell-item
            padding-right 16px
.p-table-tree-td-padding-tip
    .p-table-tree-cell
        .p-table-tree-cell-item
            padding-right 28px
.p-table-tree-td-padding-screen-sort
    .p-table-tree-cell
        .p-table-tree-cell-item
            padding-right 40px
.p-table-tree-td-padding-screen-tip
    .p-table-tree-cell
        .p-table-tree-cell-item
            padding-right 52px
.p-table-tree-td-padding-screen-sort-tip
    .p-table-tree-cell
        .p-table-tree-cell-item
            padding-right 68px
.p-table-tree-td-padding-sort-tip
    .p-table-tree-cell
        .p-table-tree-cell-item
            padding-right 44px
.p-table-tree-cell
    display flex
    align-items center
    padding 14px 20px
    width 100%
    height 100%
    max-height 48px
    overflow hidden
.p-table-tree-cell-item
    display flex
    align-items center
    width 100%
    .p-table-cell-dot
        margin-right 4px
        border-radius 3px
        width 6px
        height 6px
    .p-table-tree-cell-text
        line-height 20px
        font-size 14px
        color $grey-900
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
    .p-table-tree-cell-bold
        font-weight 600
    .p-table-cell-arrow
        margin-top -1px
        width 16px
        height 16px
        svg
            width 16px
            height 16px
    .p-table-cell-arrow-up
        svg
            path
                fill $red-500
    .p-table-cell-arrow-down
        transform rotate(180deg)
        svg
            path
                fill $turquoise-500
.p-table-tree-cell-item-first
    width calc(100% - 24px)
.p-table-tree-cell-item-left
    justify-content flex-start
.p-table-tree-cell-item-right
    justify-content flex-end
.p-table-tree-cell-item-center
    justify-content center
.p-table-tree-cell-item-link
    cursor pointer
.p-table-tree-triangle
    display flex
    align-items center
    justify-content flex-end
    width 20px
    pointer-events auto
    .p-table-tree-triangle-span
        width 20px
        line-height 20px
        transform rotate(90deg)
        text-align center
        transition transform .3s
        cursor pointer
        svg
            width 16px
            height @width
            vertical-align middle
    .p-table-tree-triangle-open
        transform rotate(180deg)
.p-table-tree-head-tr
    .p-table-tree-td
        background-color $grey-50

</style>
