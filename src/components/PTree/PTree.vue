<template>
    <div class="p-tree-com">
        <template v-for="(item, i) in tileList">
            <div
                    :key="`${item.id}-${i}`"
                    :class="['p-tree-com-item', (!multiple&&currentId===item.id)&&'p-tree-com-current', item.disabled&&'p-tree-com-disabled']"
                    :style="{paddingLeft: `${item.paddingLeft}px`}"
                    v-if="item.show"
            >
                <section class="p-tree-com-arrow" @click.stop="openNode(item)">
                    <ArrowTriangle
                            :class="[item.open&&'p-tree-com-triangle']"
                            v-if="!item.lastNode"
                    />
                </section>
                <div :class="['p-tree-com-main', multiple ? 'p-tree-com-multiple' : 'p-tree-com-single']"
                     @click.stop="itemClick(item)"
                >
                    <section class="p-tree-com-checkbox" v-if="item.showCheckbox">
                        <Checkbox
                                :disabled="item.disabled"
                                :checked="item.checked"
                        />
                    </section>
                    <section class="p-tree-com-content" :class="{'p-tree-com-omit': item.omit}">
                        <slot v-if="render==='custom'" :name="item.id" :item="item"/>
                        <template v-else>
                            <article class="p-tree-com-text" @mouseenter="TextEllipsis">{{item.name}}</article>
                            <span v-if="item.omit"
                                  class="p-tree-com-point-svg"
                                  :class="{'p-tree-com-point-svg-active': item.omitStatus}"
                                  @click.stop
                                >
                                <Dropdown
                                    trigger="click"
                                    :triangle="false"
                                    :data="dropDownData"
                                    @getStatus="getStatus([...arguments, item])"
                                    @change="dropdownChange([...arguments, item])"
                                >
                                    <MorePointSvg />
                                </Dropdown>
                            </span>
                        </template>
                    </section>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import ArrowTriangle from '../static/iconSvg/arrow_triangle.svg';
import MorePointSvg from '../static/iconSvg/morePoint.svg';
import Checkbox from '../Checkbox';
import Dropdown from '../Dropdown/Dropdown';

import {
    OpenNode,
    SetChecked,
    SetCheckedSortByTree,
    SetTileCheckedInit,
    SetTileListStatus,
    TileTool,
    StrategyChange
} from '../static/utils/treeUtil/TreeHandle';
import TextEllipsis from '../static/utils/TextEllipsis';

export default {
    name: 'PTree',
    components: {
        ArrowTriangle, MorePointSvg, Checkbox, Dropdown
    },
    props: {
        value: {
            type: [String, Number, Array],
            default: ''
        },
        // 静态数据
        data: {
            type: Array,
            default: () => []
        },
        // 是否开启多选
        multiple: {
            type: Boolean,
            default: false
        },
        // 所有checkbox是否显示
        allCheckboxShow: {
            type: Boolean,
            default: true
        },
        // 是否返回半选
        notNull: {
            type: Boolean,
            default: false
        },
        // 是否上下级联动
        linkage: {
            type: Boolean,
            default: true
        },
        // 只能选择末级
        lastStage: {
            type: Boolean,
            default: false
        },
        // 父级选中子级禁用，子级选中不影响父级 (当此值为true时，returnParentNode为false不生效)
        childDisable: {
            type: Boolean,
            default: false
        },
        // 是否返回父对象数据
        includeParent: {
            type: Boolean,
            default: true
        },
        // 可选面板是否拼接父级name
        jointParent: {
            type: Boolean,
            default: false
        },
        // 是否存在相同的参数
        sameParams: {
            type: Boolean,
            default: false
        },
        // 自定义渲染内容
        render: {
            type: String,
            default: ''
        },
        // 显示更多操作
        omit: {
            type: Boolean,
            default: false
        },
        // 按照树形结构排序选中的数据
        sortByTree: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            // 平铺列表
            tileList: [],
            // 平铺列表历史数据
            tileListHistory: [],
            // 当前选中的id
            currentId: null,
            // 选中的数据
            checkedData: [],
            dropDownData: [
                { id: 'allChild', name: '选择所有子级' },
                { id: 'nextChild', name: '选择下一级' },
                { id: 'cancelAll', name: '取消所有子级' }
            ]
        };
    },
    watch: {
        data: {
            handler(n) {
                this.setTileList(n, this.value);
            },
            deep: true,
            immediate: true
        },
        value: {
            handler(n) {
                this.currentId = n;
                this.setTileList(this.data, n);
            },
            deep: true
        }
    },
    methods: {
        TextEllipsis,
        // 设置数据
        async setTileList(data, value = null) {
            this.currentId = value;
            const strData = JSON.stringify(data);
            if (strData.length <= 4) {
                this.tileList = [];
            } else {
                // const { multiple } = this,
                const nData = JSON.parse(strData);
                const tile = await TileTool([], nData, '-1', null, false, this),
                    // { tileData, checkedIds, checkedData } = await SetTileCheckedInit(tile, this);
                    { tileData, checkedData } = await SetTileCheckedInit(tile, this);
                this.tileList = tileData;
                this.checkedData = checkedData;
                this.treeShowHandle(tileData);
                this.resetTileList('setHistory');
                // 初始化返回平铺数据列表
                this.$emit('changeTileData', tileData, true);
            }
        },
        // 点击每项 status=true表示需要向父级提交数据并带确定操作
        itemClick(item, status) {
            const that = this,
                {
                    multiple, tileList, sameParams, sortByTree, render
                } = this,
                curItem = JSON.parse(JSON.stringify(item)),
                {
                    id, sameId, disabled, showCheckbox, checked
                } = curItem;
            if (disabled || (multiple && !showCheckbox && !render)) return;
            const strategy = {
                // 多选
                true() {
                    const lists = sameParams ? tileList.map(d => {
                        const {
                            sameId: dSameId, defaultDisabled, disabled: dDisabled, id: dId
                        } = d;
                        if (sameId && dSameId && !defaultDisabled && !dDisabled && dId !== id && dSameId === sameId) {
                            d.disabled = checked !== 'checked';
                        }
                        return d;
                    }) : tileList;
                    const { tileData, checkedIds, checkedData } = sortByTree
                        ? SetCheckedSortByTree(curItem, lists, that)
                        : SetChecked(curItem, lists, that);
                    // const curItem = JSON.parse(JSON.stringify(item));
                    that.tileList = tileData;
                    that.checkedData = checkedData;
                    that.$emit('change', {
                        item: curItem, checkedIds, checkedData
                    }, status); // 触发选中改变
                },
                // 单选
                false() {
                    that.currentId = id;
                    that.$emit('change', curItem); // 点击的当前项
                }
            };
            strategy[`${multiple}`]();
        },
        // 展开子项
        openNode(item) {
            const { tileList } = this,
                { id, open, lastNode } = item,
                status = !open;
            if (lastNode) return;
            item.open = status;
            const tile = OpenNode(id, status, tileList);
            this.tileList = tile;
            this.$emit('openNode', JSON.parse(JSON.stringify(item)));
            this.treeShowHandle(tile);
        },
        // 获取列表显示的数量
        treeShowHandle(data) {
            const num = data?.filter(d => d.show).length;
            this.$emit('treeShowHandle', num);
        },
        // 设置数据的checked状态
        async setTileListStatus(status) {
            const { tileList, linkage, childDisable } = this;
            const tileData = await SetTileListStatus(status, tileList, { linkage, childDisable });
            this.tileList = tileData;
            if (status === 'uncheck') this.checkedData = [];

            this.$emit('changeTileData', tileData);
        },
        // 通过id改变选中状态 status=true表示需要向父级提交数据并带确定操作
        changeTileList(item, status) {
            // this.itemClick(this.tileList.find(d => d.id === item.id), status);
            this.itemClick(item, status);
        },
        // 设置为历史数据 status取值[setHistory, 'recoverHistory']
        resetTileList(status) {
            const that = this,
                { tileList, tileListHistory } = this;
            const strategy = {
                // 设置历史数据
                setHistory() {
                    that.tileListHistory = JSON.parse(JSON.stringify(tileList));
                },
                // 恢复为历史数据
                recoverHistory() {
                    const tile = JSON.parse(JSON.stringify(tileListHistory));
                    that.tileList = tile;
                    that.$emit('changeTileData', tile);
                }
            };
            strategy[status]();
        },
        // 获取状态
        getStatus([status, item]) {
            const { tileList } = this;
            this.tileList = tileList.map(d => {
                if (d.id === item.id) d.omitStatus = status;
                return d;
            });
        },
        // Dropdown选中状态改变回调
        dropdownChange([id, name, item]) {
            this.strategyChange(id, item);
        },
        // 通过类型设置选中状态
        strategyChange(id, item) {
            const { tileData, checkedIds, checkedData } = StrategyChange(id, item, this);
            this.checkedData = checkedData;
            this.tileList = tileData;
            this.$emit('changeTileData', tileData);
            this.$emit('change', {
                item, checkedIds, checkedData
            }, true);
        }
    }
};
</script>

<style lang="stylus">
.p-tree-com
    display inline-block
    vertical-align middle
    width 100%
    font-size 0
.p-tree-com-item
    display flex
    align-items center
    padding-left 12px
    width 100%
    height 38px
    line-height @height
    cursor pointer
    transition background-color .3s
    &:hover
        background-color $hover-color-grey
.p-tree-com-current
    background-color $blue-100
    &:hover
        background-color $hover-color-blue
    .p-tree-com-text
        color $blue-500
.p-tree-com-disabled
    cursor not-allowed
    .p-tree-com-content
        color $grey-400
.p-tree-com-arrow
    padding-right 8px
    width 24px
    height 38px
    cursor pointer
    svg
        vertical-align middle
        width 16px
        height @width
        transform rotate(90deg)
    .p-tree-com-triangle
        transform rotate(180deg)
.p-tree-com-main
    display flex
    align-items center
    width calc(100% - 24px)
.p-tree-com-single
    .p-tree-com-content
        width 100%
.p-tree-com-multiple
    .p-tree-com-content
        width calc(100% - 20px)
.p-tree-com-checkbox
    padding-right 4px
    width 20px
    height 38px
.p-tree-com-content
    height 38px
    overflow hidden
    color $grey-900
.p-tree-com-omit
    position relative
    padding-right 20px
.p-tree-com-text
    width 100%
    font-size 14px
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
.p-tree-com-point-svg
    position absolute
    right 0
    top 9px
    width 20px
    height 20px
    line-height @height
    text-align center
    font-size 0
    cursor pointer
    &:hover
        path
            fill $blue-500
    svg
        vertical-align middle
        width 16px
        height 16px
        path
            transition fill .3s
.p-tree-com-point-svg-active
    svg
        path
            fill $blue-500

</style>
