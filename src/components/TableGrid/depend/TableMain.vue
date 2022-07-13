<template>
    <table :class="[
                'p-table-main', setting&&'p-table-main-setting', border&&'p-table-main-border', `p-table-main-${fixed}`
           ]"
           cellspacing="0" cellpadding="0" border="0"
           :style="{ width: `${width}px` }"
        >
        <colgroup>
            <col v-if="rowNumber" width="68">
            <col v-if="checkbox" width="48">
            <col v-for="(w, wi) in colWidth" :width="w" :key="`width-${w}-${wi}`">
        </colgroup>
        <!--统计-->
        <thead v-if="statistics && statistics.open">
        <tr class="p-table-row p-table-row-head">
            <td v-if="rowNumber" class="p-table-td p-table-td-first-child">
                <div class="p-table-main-row-number"></div>
            </td>
            <th v-if="checkbox" class="p-table-td">
                <div class="p-table-main-checkbox"></div>
            </th>
            <template v-for="(th, thi) in header">
                <th v-if="th.checked === 'checked'"
                    :class="[
                            'p-table-td',
                             (border&&thi>0)&&'p-table-td-has-bl',
                             th.align&&`p-table-td-${th.align}`,
                             (th.align !== 'center')&&`p-table-td-padding${setPaddingLevel(th)}`
                        ]"
                    :key="`${statistics.id}-td-${thi}`"
                >
                    <div class="p-table-cell p-table-cell-normal">
                        <section class="p-table-cell-wrapper">
                                <span v-if="statistics.hasOwnProperty(th.key) && statistics[th.key].dot"
                                      class="p-table-cell-dot"
                                      :style="{backgroundColor: statistics.hasOwnProperty(th.key) && statistics[th.key].dot}"
                                ></span>
                            <span class="p-table-cell-text p-table-cell-bold"
                                  :style="{
                                          maxWidth: `${setSpanWidth((statistics.hasOwnProperty(th.key) ? statistics[th.key].dot : null), thi)}px`,
                                          color: statistics.hasOwnProperty(th.key) && statistics[th.key].color
                                      }"
                                  @mouseenter="TextEllipsis"
                            >{{ statistics.hasOwnProperty(th.key) && statistics[th.key].text || '' }}</span>
                        </section>
                    </div>
                </th>
            </template>
            <th v-if="rowTools.open"
                :class="[
                            'p-table-td',
                             border&&'p-table-td-has-bl',
                        ]"
            >
                <div class="p-table-cell p-table-cell-normal">
                    <section class="p-table-cell-wrapper">
                        <span class="p-table-cell-text p-table-cell-bold">--</span>
                    </section>
                </div>
            </th>
        </tr>
        </thead>
        <tbody>
        <template>
            <template v-if="groupName">
                <template v-for="(item, i) in data">
                    <tr :key="`groupName-${item.id}-${i}`"
                        class="p-table-row p-table-row-body p-table-row-border-bottom-none"
                    >
                        <td class="p-table-td" :colspan="colWidth.length + rowNumber + checkbox">
                            <div class="p-table-cell p-table-cell-normal">
                                <section class="p-table-cell-wrapper">
                                    <!-- 展开收起箭头 -->
                                    <span class="p-table-cell-text p-table-cell-text-handle"
                                          @click="groupOpenHandle(item)"
                                    ><i class="p-table-cell-triangle"
                                        :class="{'p-table-cell-triangle-open': item.open}"
                                    ><TriangleSvg/></i>{{ item[groupName] }} ({{ item.children.length }})</span>
                                </section>
                            </div>
                        </td>
                    </tr>
                    <template v-if="item.open">
                        <template v-for="(child, ci) in item.children">
                            <tr :key="`child-${i}-${child.id}-${ci}`"
                                class="p-table-row p-table-row-body"
                                :class="[
                                     !child.selected&&child.hover&&'p-table-row-hover',
                                     openSelect&&child.selected&&'p-table-row-selected',
                                     child.bottomNone && 'p-table-row-border-bottom-none'
                                ]"
                                @mouseenter="rowEnter(`${i}-${ci}`)"
                                @mouseleave="rowLeave(`${i}-${ci}`)"
                                @click.stop.capture="rowClick(item, `${i}-${ci}`)"
                            >
                                <td v-if="rowNumber" class="p-table-td p-table-td-first-child">
                                    <div class="p-table-main-row-number">{{ i + 1 }}</div>
                                </td>
                                <td v-if="checkbox"
                                    class="p-table-td"
                                    :class="{'p-table-td-first-child': !rowNumber, 'p-table-td-has-bl': rowNumber}"
                                >
                                    <div class="p-table-main-checkbox">
                                        <Checkbox :checked="child.checked" :disabled="child.disabled" :stopPropagation="true"
                                                  :data-index="`${i}-${ci}`" @change="checkboxChange"/>
                                    </div>
                                </td>
                                <template v-for="(th, thi) in header">
                                    <td :key="`td-${i}-${th.key}-${thi}`"
                                        class="p-table-td"
                                        :class="[
                                            ((!checkbox&&!rowNumber)&&thi===0)&&'p-table-td-first-child',
                                            (thi===(header.length-1) && !rowTools.open)&&'p-table-td-last-child',
                                            (thi===0&&(checkbox || rowNumber) || border&&thi>0)&&'p-table-td-has-bl',
                                            th.align&&`p-table-td-${th.align}`,
                                            (th.align !== 'center')&&`p-table-td-padding${setPaddingLevel(th)}`,
                                        ]"
                                    >
                                        <div class="p-table-cell p-table-cell-normal">
                                            <section class="p-table-cell-wrapper">
                                                <span v-if="child[th.key]&&child[th.key].dot"
                                                      class="p-table-cell-dot"
                                                      :style="{backgroundColor: child[th.key].dot}"
                                                />
                                                <span class="p-table-cell-text"
                                                      :class="{'p-table-cell-text-hover': th.hover}"
                                                      :style="{
                                                          maxWidth: `${setSpanWidth(child[th.key]&&child[th.key].dot, thi)}px`,
                                                          color: child[th.key]&&child[th.key].color
                                                      }"
                                                      @mouseenter="TextEllipsis"
                                                >{{ child[th.key] && child[th.key].text }}</span>
                                            </section>
                                        </div>
                                    </td>
                                </template>
                            </tr>
                        </template>
                    </template>
                </template>
            </template>
            <template v-else>
                <template v-for="(item, i) in data">
<!--                    item.link&&'p-table-row-link',-->
                    <tr :class="[
                        'p-table-row', 'p-table-row-body',
                         !item.selected&&item.hover&&'p-table-row-hover',
                         openSelect&&item.selected&&'p-table-row-selected',
                         item.bottomNone && 'p-table-row-border-bottom-none'
                    ]"
                        :key="`tr-${item.id}-${i}`"
                        @mouseenter="rowEnter(i)"
                        @mouseleave="rowLeave(i)"
                        @click.prevent="rowClick(item, i)"
                    >
                        <td v-if="rowNumber" class="p-table-td p-table-td-first-child">
                            <div class="p-table-main-row-number">{{ i + 1 }}</div>
                        </td>
                        <td v-if="checkbox"
                            class="p-table-td"
                            :class="{'p-table-td-first-child': !rowNumber, 'p-table-td-has-bl': rowNumber}"
                        >
                            <div class="p-table-main-checkbox">
                                <Checkbox :checked="item.checked" :disabled="item.disabled" :data-index="i" :stopPropagation="true"
                                          @change="checkboxChange"/>
                            </div>
                        </td>
                        <template v-for="(th, thi) in header">
                            <td :class="[
                                    'p-table-td',
                                    ((!checkbox&&!rowNumber)&&thi===0)&&'p-table-td-first-child',
                                    (thi===(header.length-1) && !rowTools.open)&&'p-table-td-last-child',
                                    (thi===0&&(checkbox || rowNumber) || border&&thi>0)&&'p-table-td-has-bl',
                                    th.align&&`p-table-td-${th.align}`,
                                    (th.align !== 'center')&&`p-table-td-padding${setPaddingLevel(th)}`,
                                    (bodyBgColor && item[th.key].children && item[th.key].children.length)&&'p-table-td-has-children'
                                ]"
                                :key="`${item.id}-td-${thi}`"
                                v-if="th.checked === 'checked' && (item[th.key]&&!item[th.key].hide)"
                                :rowspan="item[th.key].rowspan"
                            >
                                <!--:ref="setRef(th, i, thi)"-->
                                <div class="p-table-cell"
                                     :class="[
                                         item[th.key] && item[th.key].children && item[th.key].children.length
                                         ? 'p-table-cell-h-children'
                                         : 'p-table-cell-normal'
                                     ]"
                                >
                                    <slot v-if="render === 'custom'" :name="th.key"
                                          :item="{headerKey :th.key,rowIndex: i, colIndex: thi, item}"/>
                                    <template v-else>
                                        <div
                                            v-if="item[th.key] && item[th.key].children && item[th.key].children.length && th.children && th.children.length"
                                            class="p-table-cell-children"
                                        >
                                            <template v-for="(cItem, ci) in item[th.key].children">
                                                <section
                                                    v-if="th.children && th.children.map(d => d.key).includes(cItem.headerKey)"
                                                    :key="`children-${i}-${ci}`"
                                                    class="p-table-cell-wrapper"
                                                    :class="{'p-table-cell-wrapper-pointer': item.childrenEvent}"
                                                    @click.stop="childrenHandle(item, th.key, cItem)"
                                                >
                                                    <span v-if="cItem && cItem.dot"
                                                          class="p-table-cell-dot"
                                                          :style="{backgroundColor: cItem.dot}"
                                                    />
                                                    <span class="p-table-cell-text"
                                                          :class="{'p-table-cell-text-hover': th.hover}"
                                                          :style="{
                                                              color: cItem&&cItem.color
                                                          }"
                                                          @mouseenter="TextEllipsis"
                                                    >{{ cItem && cItem.text }}</span>
                                                </section>
                                            </template>
                                        </div>
                                        <section v-else class="p-table-cell-wrapper">
                                            <span v-if="item[th.key]&&item[th.key].dot"
                                                  class="p-table-cell-dot"
                                                  :style="{backgroundColor: item[th.key].dot}"
                                            />
                                            <span class="p-table-cell-text"
                                                  :class="{'p-table-cell-text-hover': th.hover}"
                                                  :style="{
                                                      maxWidth: `${setSpanWidth(item[th.key]&&item[th.key].dot, thi)}px`,
                                                      color: item[th.key]&&item[th.key].color
                                                  }"
                                                  @mouseenter="TextEllipsis"
                                            >{{ item[th.key] && item[th.key].text }}</span>
                                        </section>
                                    </template>
                                </div>
                            </td>
                        </template>
                        <!-- 操作栏 -->
                        <template v-if="rowTools.open">
                            <td :class="[
                                'p-table-td',
                                'p-table-td-last-child',
                                border&&'p-table-td-has-bl',
                                rowTools.align&&`p-table-td-${rowTools.align}`,
                            ]"
                            >
                                <div class="p-table-cell p-table-cell-normal">
                                    <section class="p-table-cell-handle">
                                        <template v-if="item.tools.data && item.tools.data.length">
                                            <article class="p-table-cell-handle-item"
                                                     v-for="(hd, hdi) in item.tools.data"
                                                     :key="`${item.id}-${hd.id}-${hdi}`"
                                                     @click.stop="tableCellHandle([hd.id, hd], item.tools)"
                                                >
                                                <span :class="[hd.disabled ? 'p-table-handle-text-disabled' : 'p-table-handle-text']"
                                                >{{hd.name}}</span>
                                            </article>
                                        </template>
                                        <article v-if="item.tools.moreOpen"
                                                 class="p-table-cell-handle-item p-table-more-point"
                                        >
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
            </template>
        </template>
        </tbody>
    </table>
</template>

<script>
import MorePointSvg from '../../static/iconSvg/morePoint.svg';
import TriangleSvg from '../../static/iconSvg/triangle.svg';
import Checkbox from '../../Checkbox';
import Dropdown from '../../Dropdown/Dropdown';

import TextEllipsis from '../../static/utils/TextEllipsis';

// import { SetTdStatus, SetRowSpan, SetRef } from './SetRowParams';
import GetCheckedData from '../utils/GetCheckedData';

export default {
    name: 'TableMain',
    components: {
        MorePointSvg,
        TriangleSvg,
        Checkbox,
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
            default: () => {
            }
        },
        // 数据
        data: {
            type: Array,
            default: () => []
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
        },
        // 显示行号
        rowNumber: {
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
            rowToolInd: null, // 当前索引
            activeClick: false, // 激活选中
            selectedInd: null // 选中的索引
        };
    },
    computed: {
        // 操作栏对象
        handleObj() {
            const { header } = this;
            return header.find(d => d.key === 'handle') || null;
        }
    },
    methods: {
        TextEllipsis,
        // 设置文字宽度
        setSpanWidth(dot, hi) {
            const { colWidth, border } = this;
            const dw = typeof dot === 'string' ? 10 : 0,
                thw = colWidth[hi]; // th的宽度
            return (thw - 40 - dw - border);
        },
        // 设置td的显示状态
        // setTdStatus(th, ind) {
        //     return SetTdStatus(th, ind);
        // },
        // 设置（开始）合并列的列数
        // setRowSpan(th, ind) {
        //     return SetRowSpan(th, ind);
        // },
        // 设置（开始）合并列的ref
        // setRef(th, ind, thi) {
        //     return SetRef(th, ind, thi);
        // },
        // checkbox状态改变
        checkboxChange(status, obj) {
            const { data: tableData, groupName } = this,
                { index } = obj;
            if (groupName) {
                // 分组数据
                const [i = 0, ci = 0] = index.includes('-') ? index.split('-') : '0-0';
                tableData[i].children[ci].checked = status;
            } else {
                tableData[index].checked = status;
            }
            // 筛选出选中的数据
            const { checkedIds = [], checkedData = [] } = GetCheckedData(tableData, groupName);
            this.$emit('select', checkedIds, checkedData);
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

        // 鼠标操作
        rowEnter(i) {
            this.$emit('setStatus', 'hover', i, 'enter');
        },
        rowLeave(i) {
            this.$emit('setStatus', 'hover', i, 'leave');
        },
        // 点击每行 - 设置选中
        rowClick(item, i) {
            if (item.link) this.$emit('rowClick', item);
            if (!this.openSelect) return;
            this.$emit('setStatus', 'selected', i, 'enter');
        },
        // 点击子项
        childrenHandle(item, key, cItem) {
            const { childrenEvent, childrenFunc } = item,
                { headerKey } = cItem;
            if (childrenEvent && childrenFunc) {
                childrenFunc(key, headerKey);
            }
        },
        // 展开收起箭头
        groupOpenHandle(item) {
            item.open = !item.open;
        },
        // 操作栏点击事件
        tableCellHandle([id, item], tools) {
            tools.event(id, item);
        }
    }
};
</script>

<style lang="stylus">

.p-table-main
    display table
    table-layout fixed
    margin 0
    //overflow initial
    width 100%
    font-size 0

.p-table-row-group-text
    font-size 14px
    color $grey-900

.p-table-row
    background none
    border 0

.p-table-row-border-bottom-none
    .p-table-td
        border-bottom-color transparent
    .p-table-td-has-children
        border-bottom-color $grey-50

.p-table-main-
    .p-table-row-hover,
    .p-table-row-selected
        .p-table-td-first-child
            border-top-left-radius 24px
            border-bottom-left-radius 24px
        .p-table-td-last-child
            border-top-right-radius 24px
            border-bottom-right-radius 24px

.p-table-main-left
    .p-table-row-hover,
    .p-table-row-selected
        .p-table-td-first-child
            border-top-left-radius 24px
            border-bottom-left-radius 24px

.p-table-main-right
    .p-table-row-hover,
    .p-table-row-selected
        .p-table-td-last-child
            border-top-right-radius 24px
            border-bottom-right-radius 24px

.p-table-td
    border-top 0
    border-right 0
    border-bottom-width 1px
    border-bottom-style solid
    border-bottom-color $grey-200
    border-left 0
    //transition all .3s
    //transition background-color .3s
    vertical-align middle
    min-width 0
    height 48px
    text-overflow ellipsis

.p-table-td-has-bl
    border-left 1px solid $theme

.p-table-main-row-number
    width 100%
    line-height 48px
    text-align center
    font-size 14px
    color $grey-900

.p-table-main-checkbox
    text-align center
    .p-checkbox
        pointer-events auto

.p-table-td-left
    .p-table-cell-normal
        justify-content flex-start
    .p-table-cell-children
        .p-table-cell-wrapper
            justify-content flex-start

.p-table-td-right
    .p-table-cell-normal
        justify-content flex-end
    .p-table-cell-children
        .p-table-cell-wrapper
            justify-content flex-end

.p-table-td-center
    .p-table-cell-normal
        justify-content center
    .p-table-cell-children
        .p-table-cell-wrapper
            justify-content center

.p-table-td-padding-screen
    .p-table-cell
        .p-table-cell-wrapper
            padding-right 24px

.p-table-td-padding-sort
    .p-table-cell
        .p-table-cell-wrapper
            padding-right 16px

.p-table-td-padding-tip
    .p-table-cell
        .p-table-cell-wrapper
            padding-right 28px

.p-table-td-padding-screen-sort
    .p-table-cell
        .p-table-cell-wrapper
            padding-right 40px

.p-table-td-padding-screen-tip
    .p-table-cell
        .p-table-cell-wrapper
            padding-right 52px

.p-table-td-padding-screen-sort-tip
    .p-table-cell
        .p-table-cell-wrapper
            padding-right 68px

.p-table-td-padding-sort-tip
    .p-table-cell
        .p-table-cell-wrapper
            padding-right 44px

.p-table-td-has-children
    background-color $grey-50

.p-table-row-head
    .p-table-td
        background-color $grey-50

.p-table-row-hover
    .p-table-td
        position relative
        background-color $grey-100 !important
        border-top-color transparent
        border-bottom-color transparent
        border-left-color $grey-100 !important
        border-right-color $grey-100 !important
.p-table-row-selected
    .p-table-td
        position relative
        background-color $blue-100 !important
        border-bottom-color transparent
        border-left-color $blue-100 !important
        border-right-color $blue-100 !important
//.p-table-row-link
//    cursor pointer
.p-table-cell-normal
    display flex
    align-items center
    padding-left 20px
    padding-right @padding-left

.p-table-cell
    width 100%
    height 100%
    max-height 48px
    line-height @height
    overflow hidden
    font-size 14px
.p-table-cell-wrapper
    display flex
    align-items center
    .p-table-cell-dot
        margin-right 4px
        border-radius 3px
        width 6px
        height 6px
    .p-table-cell-text
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        color $grey-900
        transition color .3s
    .p-table-cell-text-hover
        cursor pointer
        &:hover
            color $blue-500 !important
    .p-table-cell-bold
        font-weight 600
.p-table-cell-wrapper-pointer
    cursor pointer
.p-table-cell-children
    display flex
    height 100%
    > .p-table-cell-wrapper
        flex 1
        overflow hidden
        padding-left 4px
        padding-right 4px
        & + .p-table-cell-wrapper
            border-left 1px solid $grey-200

.p-table-cell-text-handle
    cursor pointer
    user-select none
    font-weight 550

.p-table-cell-triangle
    margin-right 8px
    display inline-block
    vertical-align middle
    width 20px
    height @width
    line-height @width
    text-align center
    font-size 0
    svg
        vertical-align middle
        width 16px
        height @width
        font-size 0
        transition transform .3s

.p-table-cell-triangle-open
    svg
        transform rotate(180deg)

.p-table-main-setting
    .p-table-row
        .p-table-td
            &:last-child
                padding-right 48px

.p-table-main-border
    .p-table-row
        .p-table-td-has-bl
            border-left 1px solid $grey-200

</style>
