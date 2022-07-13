<template>
    <div class="p-select-search-component">
        <template v-if="choseArea">
            <TransferSelectTree
                    :title="title"
                    :unit="unit"
                    :placeholder="placeholder"
                    :tipPlace="tipPlace"
                    :disabled="disabled"
                    :lastStage="lastStage"
                    :linkage="linkage"
                    :notNull="notNull"
                    :isReadOnly="isReadOnly"
                    :returnParentNode="returnParentNode"
                    :height="calcHeight"
                    :selectedIds="selectedIds"
                    :isShowAllChoice="isShowAllChoice"
                    :width="width"
                    :childDisabled="childDisabled"
                    :overWidth="overWidth"
                    :transfer='transfer'
                    :data.sync="treeData"
                    :caption="caption"
                    :hideClear="hideClear"
                    :errorText="errorText"
                    :errorShow="errorShow"
                    @change="optionClickSelectArea"
                    @focusChange="focusChange"
                    @clickCallBack="clickCallBack"
            />
        </template>
        <template v-else>
            <SelectMultipleSearchTree
                    v-if="multiple"
                    :title="title"
                    :unit="unit"
                    :placeholder="placeholder"
                    :tipPlace="tipPlace"
                    :linkage="linkage"
                    :selectedIds="selectedIds"
                    :childDisabled="childDisabled"
                    :disabled="disabled"
                    :caption="caption"
                    :notNull="notNull"
                    @clickCallBack="clickCallBack"
                    :isReadOnly="isReadOnly"
                    :returnParentNode="returnParentNode"
                    :lastStage="lastStage"
                    :isShowAllChoice='isShowAllChoice'
                    :width="width"
                    :overWidth="overWidth"
                    :height="calcHeight"
                    :data.sync="treeData"
                    :transfer='transfer'
                    :hideClear="hideClear"
                    :errorText="errorText"
                    :errorShow="errorShow"
                    @change="optionClickMultiple"
                    @focusChange="focusChange"
            />
            <SelectSingleSearchTree
                    v-else
                    :selectedId="value"
                    :placeholder="placeholder"
                    :disabled="disabled"
                    :width="width"
                    :overWidth="overWidth"
                    :caption="caption"
                    :isReadOnly="isReadOnly"
                    :height="calcHeight"
                    :data.sync="treeData"
                    :transfer="transfer"
                    :lastStage="lastStage"
                    :hideClear="hideClear"
                    :errorText="errorText"
                    :errorShow="errorShow"
                    @change="optionClickSingle"
                    @focusChange="focusChange"
            />
        </template>
    </div>
</template>

<script>
import TransferSelectTree from './depend/TransferSelectTree';
import SelectMultipleSearchTree from './depend/selectMultipleSearchTree';
import SelectSingleSearchTree from './depend/selectSingleSearchTree';
import { initTreeData } from '../static/utils/TreeTool';

export default {
    name: 'TreeSelect',
    components: {
        SelectMultipleSearchTree,
        SelectSingleSearchTree,
        TransferSelectTree
    },
    props: {
        // 选择内容后的title
        title: {
            type: String,
            default: '已选项'
        },
        // 单位
        unit: {
            type: String,
            default: '个'
        },
        // 占位符
        placeholder: {
            type: String,
            default: '请选择'
        },
        // 提示框位置
        tipPlace: {
            type: String,
            default: 'top'
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false
        },
        // 触发器宽度
        width: {
            type: [String, Number],
            default: 240
        },
        // 下拉面板宽度
        overWidth: {
            type: [String, Number],
            default: ''
        },
        // 高度
        height: {
            type: [String, Number],
            default: 360
        },
        // 传入的数据
        data: {
            type: Array,
            default: () => []
        },
        /* 单选模式相关数据 -s */
        // v-model绑定的值
        value: {
            type: [String, Number],
            default: ''
        },
        /**
             * 是否开启多选
             */
        multiple: {
            type: Boolean,
            default: false
        },
        // 联动
        linkage: {
            type: Boolean,
            default: true
        },
        /**
             * 是否返回半选状态的id
             */
        notNull: {
            type: Boolean,
            default: false
        },
        /**
             * 是否返回半选状态的数据
             */
        returnParentNode: {
            type: Boolean,
            default: true
        },
        // 选中的id组
        selectedIds: {
            type: Array,
            default: () => []
        },
        // 是否带选择区域
        choseArea: {
            type: Boolean,
            default: false
        },
        // 只可选最后一级
        lastStage: {
            type: Boolean,
            default: false
        },
        // 隐藏清空按钮
        hideClear: {
            type: Boolean,
            default: false
        },
        // 用于接收父组件传过来的父组件id
        transfer: {
            type: [String, Array],
            default: ''
        },
        // 配置显示全选状态
        isShowAllChoice: {
            type: Boolean,
            default: false
        },
        // input 框是否为readonly状态
        isReadOnly: {
            type: Boolean,
            default: false
        },
        // 标题
        caption: {
            type: String,
            default: ''
        },
        // 设置子级disabled状态
        childDisabled: {
            type: Boolean,
            default: false
        },
        // 错误信息提示
        errorText: {
            type: String,
            default: ''
        },
        // 错误信息显示状态
        errorShow: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            treeData: []
        };
    },
    computed: {
        calcHeight() {
            return Number(this.height) < 360 ? 360 : this.height;
        }
    },
    watch: {
        data: {
            handler(n, o) {
                this.treeData = initTreeData(n);
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        // 提交当前选择的值-多选
        optionClickMultiple(ids, dataObj) {
            this.$emit('change', ids, dataObj);
        },
        // 提交当前选择的值-单选
        optionClickSingle(id, dataObj) {
            this.$emit('change', id, dataObj);
            this.$emit('input', id);
        },
        // 带选择区域的树选择回调事件
        optionClickSelectArea(ids, dataObj) {
            this.$emit('change', ids, dataObj);
        },
        focusChange(status) {
            this.$emit('focusChange', status);
        },
        clickCallBack(obj) {
            this.$emit('clickCallBack', obj);
        }
    }
};
</script>

<style lang="stylus">
@import '../static/stylus/animate/selectDownUpExtend.styl'

.p-select-search-component
    display inline-block
    font-size 0
    vertical-align middle

.p-select-search
    position: relative
    display: inline-block

    .p-select-search-box
        padding-left: 12px
        padding-right: 24px
        // background-color $theme
        border: 1px solid $grey-400
        border-radius: 4px
        width: 100%
        min-height: 32px
        overflow: hidden
        cursor: pointer
        transition: all 0.3s

        &:hover
            border-color: $blue-500

        &.p-select-search-box-focus
            border-color: $blue-500
            box-shadow: $box-shadow-blue

        &.p-select-search-box-disabled
            z-index 10
            background-color: $grey-200
            cursor: not-allowed

            .p-select-choice-name
                color: $grey-400 !important

            .p-select-search-input
                cursor not-allowed !important

            .p-select-search-field-text
                font-size: 14px

            .p-select-search-triangle
                display: none

            &:hover
                border-color: $grey-400

        .p-select-search-field-text
            position: absolute
            left: 0
            top: 0
            //padding-left: 12px
            width: calc(100% - 26px)
            //width 100%
            height: 30px
            line-height: 30px
            color: $grey-400
            font-size: 14px
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap

            &.p-select-choice-name
                color: $grey-900

        .p-select-search-field
            &.p-select-search-field-accept
                max-width: 93%
                max-height: 96px
                overflow-y: auto

            .p-select-field-item
                position: absolute
                top 0
                left 0
                z-index 11
                width: calc(100% - 26px)
                display: inline-block
                vertical-align: top
                cursor pointer

                .p-select-choice
                    display: inline-block
                    margin-top: 3px
                    margin-right: 4px
                    padding-left: 8px
                    padding-right: 28px
                    background-color: $grey-200
                    border-radius: 2px
                    max-width: 120px
                    height: 24px
                    line-height: @height
                    font-size: 14px
                    color: $grey-900
                    white-space: nowrap
                    text-overflow: ellipsis
                    overflow: hidden

                    &.p-select-choice-more
                        padding-right: 8px

                .p-select-choice-name
                    padding-left: 0
                    padding-right: 0
                    background: none

                .p-select-choice-clear
                    position: absolute
                    top: 8px
                    right: 12px
                    z-index: 5
                    cursor: pointer

                    svg
                        &:hover
                            path
                                transition: fill 0.3s
                                fill: $blue-500

                .p-select-search-input
                    outline: none
                    border: 0
                    background: none
                    width: 100%
                    max-width: 100%
                    height: 30px
                    line-height: @height
                    font-size: 14px
                    cursor pointer

        .p-select-search-triangle
            position: absolute
            top: 0
            right: 0
            width: 26px
            height 30px
            line-height 30px
            text-align left
            .p-select-search-triangle-icon
                display block
                width 100%
                height 100%
            svg
                vertical-align middle
                width 16px
                height 16px
                transition: transform 0.3s
            .p-select-search-triangle-rotate
                transform: rotate(180deg)

            .p-select-clear-icon
                z-index 1000

                path
                    transition: fill 0.3s

                &:hover
                    path
                        fill: $blue-500
.p-select-search-highlight
    font-size 14px
    color $blue-500
.p-select-search
    .p-trigger-error
        border-color $red-500
    .p-trigger-error-text
        position absolute
        left 0
        top 36px
        line-height 14px
        font-size 14px
        color $red-500
</style>
