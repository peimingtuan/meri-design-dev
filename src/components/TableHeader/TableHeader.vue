<template>
    <table
            :class="['p-table-header', setting&&'p-table-header-setting', border&&'p-table-header-border']"
            cellspacing="0" cellpadding="0" border="0"
            :style="{ width: `${width}px` }"
        >
        <colgroup>
            <col v-if="rowNumber" width="68">
            <col v-if="checkbox" width="48">
            <col v-for="(W, wi) in colWidth" :width="W" :key="`width-${W}-${wi}`">
        </colgroup>
        <thead>
        <tr class="p-table-header-content">
            <th class="p-table-header-th" v-if="rowNumber">
                <div class="p-table-header-item-row-number">{{rowNumberName}}</div>
            </th>
            <th class="p-table-header-th"
                :class="{'p-table-header-th-bl': rowNumber}"
                v-if="checkbox&&data.length"
                >
                <div class="p-table-header-item-checkbox">
                    <Checkbox :checked="checked" :disabled="disabled" @change="checkHandle" />
                </div>
            </th>
            <template v-for="(header, hi) in data">
                <th :class="['p-table-header-th', (hi===0&&(checkbox || rowNumber) || border&&hi>0)&&'p-table-header-th-bl']"
                    :key="`header-${hi}`"
                    >
                    <div class="p-table-header-item"
                         :class="[
                             dimension ? 'p-table-header-item-dimension' : 'p-table-header-item-normal',
                             header.align&&`p-table-header-item-${header.align}`
                         ]"
                         :key="`header-${header.key}-${hi}`"
                         :ref="`header${header.fixed&&'Fixed'}${hi}`"
                        >
                        <div class="p-table-header-item-content"
                             :class="[
                                 dimension&&header.children&&JSON.stringify(header.children).length>4
                                 ? 'p-table-header-item-content-h-child'
                                 : 'p-table-header-item-content-n-child'
                             ]"
                            >
                            <HeaderItemContent
                                :index="hi"
                                :header="header"
                                :colWidth="colWidth"
                                :border="border"
                                :disableSort="disableSort"
                            />
                            <div v-if="dimension&&header.children&&JSON.stringify(header.children).length>4"
                                 class="p-table-header-item-children"
                                >
                                <template v-for="(cHeader, cHi) in header.children">
                                    <HeaderItemContent
                                        :key="`child-${hi}-${cHi}`"
                                        :isChild="true"
                                        :index="cHi"
                                        :header="cHeader"
                                        :colWidth="colWidth"
                                        :border="border"
                                        :disableSort="disableSort"
                                    />
                                </template>
                            </div>
                        </div>
                        <!-- 拖动改变宽度 -->
                        <section v-if="header.resizable"
                                 class="p-table-resize-width"
                                 :data-ind="hi"
                                 @mousedown="resizeDown"
                        ></section>
                    </div>
                </th>
            </template>
            <th :class="['p-table-header-th', border&&'p-table-header-th-bl']" v-if="rowTools.open">
                <div :class="[
                        'p-table-header-item',
                        dimension ? 'p-table-header-item-dimension' : 'p-table-header-item-normal',
                        rowTools.align&&`p-table-header-item-${rowTools.align}`
                    ]"
                    >
                    <div class="p-table-header-item-content p-table-header-item-content-n-child">
                        <section class="p-table-header-text">
                            <span class="p-table-header-span">{{rowTools.text || '操作'}}</span>
                        </section>
                    </div>
                </div>
            </th>
        </tr>
        </thead>
    </table>
</template>

<script>
import Checkbox from '../Checkbox';
import HeaderItemContent from './depend/HeaderItemContent';

export default {
    name: 'TableHeader',
    components: {
        Checkbox, HeaderItemContent
    },
    props: {
        width: {
            type: [String, Number],
            default: ''
        },
        header: {
            type: Array,
            default: () => []
        },
        data: {
            type: Array,
            default: () => []
        },
        colWidth: {
            type: Array,
            default: () => []
        },
        // 开启操作栏
        rowTools: {
            type: Object,
            default: () => ({
                open: false, width: 0, fixed: '', event: ''
            })
        },
        // 开启checkbox
        checkbox: {
            type: Boolean,
            default: false
        },
        // 选中状态
        checked: {
            type: String,
            default: 'uncheck'
        },
        // 禁用状态
        disabled: {
            type: Boolean,
            default: false
        },
        // 设置
        setting: {
            type: Boolean,
            default: false
        },
        // 显示所有边框
        border: {
            type: Boolean,
            default: false
        },
        // 是否禁用排序
        disableSort: {
            type: Boolean,
            default: false
        },
        // 后端排序
        sortAjax: {
            type: Boolean,
            default: false
        },
        // 表体是否是树形结构
        isTree: {
            type: Boolean,
            default: false
        },
        // 固定条宽
        scrollBar: {
            type: [String, Number],
            default: 4
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
        // 分组展示
        groupName: {
            type: String,
            default: ''
        }
    },
    methods: {
        // 选中
        checkHandle(status) {
            this.$emit('selectedAll', status);
        },
        // 拖动改变宽度-鼠标按下
        resizeDown(e) {
            const { x, target: { dataset: { ind } } } = e;
            this.$emit('resizeDown', x, ind);
        }
    }
};
</script>

<style lang="stylus">
@import "../static/stylus/animate/selectDownUpExtend.styl"

.p-table-header
    position relative
    display table
    table-layout fixed
    width 100%
    margin 0
    font-size 0
    &:hover
        .p-table-resize-width
            display block
.p-table-layout-line
    position absolute
    top 0
    z-index 12
    background-color $blue-500
    width 1px
    height 100%
    pointer-events none
    &:before
        position absolute
        top 12px
        left -2px
        display inline-block
        width 5px
        height 16px
        background-color $grey-50
        border 1px solid $blue-500
        border-radius 3px
        content ''
.p-table-header-item
    position relative
    width 100%
    overflow hidden
    user-select none
    .p-table-header-text
        display flex
        align-items center
        padding-left 20px
        padding-right 20px
.p-table-header-item-content
    width 100%
    height 100%
.p-table-header-item-content-n-child
    .p-table-header-text
        height 100%
.p-table-header-item-content-h-child
    > .p-table-header-text
        border-bottom 1px solid $grey-200
        height 50%
        justify-content center
.p-table-resize-width
    position absolute
    top 0
    right 0
    display none
    border-right 1px solid $grey-200
    width 5px
    height 100%
    cursor col-resize
.p-table-header-item-children
    display flex
    height 50%
    .p-table-header-text
        flex 1
        overflow hidden
        padding-left 4px
        padding-right 4px
        &:not(:first-child)
            border-left 1px solid $grey-200
.p-table-header-item-normal
    height 40px
.p-table-header-item-dimension
    height 60px
.p-table-header-content
    background-color $grey-50
    border 0
    overflow hidden
.p-table-header-th
    border-top 0
    border-right 0
    border-bottom 1px solid $grey-200
    border-left 0
    min-width 0
    font-weight normal
.p-table-header-th-bl
    border-left 1px solid $grey-50
.p-table-header-item-row-number
    width 100%
    line-height 40px
    text-align center
    font-size 14px
    color $grey-900
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
.p-table-header-item-checkbox
    display flex
    align-items center
    justify-content center
    height 40px
    text-align center
.p-table-header-item-center
    .p-table-header-text
        justify-content center
.p-table-header-item-left
    .p-table-header-text
        justify-content flex-start
.p-table-header-item-right
    .p-table-header-text
        justify-content flex-end
.p-table-header-span
    color $grey-600
    font-size 12px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
.p-table-header-sort-disabled
    cursor not-allowed
    svg
        font-size 0
        path
            fill $grey-400
        &:hover
            path
                fill $grey-400
.p-table-header-sort-active
    path
        fill $blue-500
.p-table-header-sort-triangle
    transform rotate(180deg)
.p-table-header-setting
    .p-table-header-content
        .p-table-header-th
            &:last-child
                padding-right 48px
.p-table-header-border
    .p-table-header-content
        .p-table-header-th-bl
            border-left 1px solid $grey-200
.p-table-header-has-bar
    padding-right 17px

.p-table-header-note
    margin-top 2px
    margin-left 8px
    width 16px
    cursor pointer
    svg
        vertical-align middle
        width 16px
        height @width
        font-size 0
    .p-table-header-note-blue-500
        path
            fill $blue-500
    .p-table-header-note-cyan-500
        path
            fill $cyan-500
    .p-table-header-note-turquoise-500
        path
            fill $turquoise-500
    .p-table-header-note-green-500
        path
            fill $green-500
    .p-table-header-note-red-500
        path
            fill $red-500
.p-table-header-sort
    padding-left 8px
    width 16px
    line-height 8px
    cursor pointer
    svg
        vertical-align middle
        width 8px
        height @width
        font-size 0
        path
            transition fill .3s
        &:hover
            path
                fill $blue-600

//@media screen and (-webkit-min-device-pixel-ratio:0)
//    .p-table-header
//        &:after
//            width 4px
//    .p-table-header-has-bar
//        padding-right 4px
//
</style>
