<template>
    <div class="p-select-option" v-show="data&&data.length">
        <section
                :class="[
                'p-select-option-item',
                item.selected&&'p-select-option-item-selected-multiple',
                item.disabled&&'p-select-option-item-disabled'
                ]"
                v-for="item in selectData"
                :key="item.id"
                v-show="!item.isHide"
                @click="optionClick(item.id)"
                @mouseenter="TextEllipsis"
                v-html="item.name"
        />
    </div>
</template>

<script>
import TextEllipsis from '../static/utils/TextEllipsis';

export default {
    name: 'SelectOptionMultiple',
    props: {
        /**
         * 下拉列表数据
         */
        data: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        selectData: {
            get() {
                return this.data;
            },
            set(newData) {
                return newData;
            }
        }
    },
    methods: {
        TextEllipsis,
        // 移除某一个选中的
        removeOption(id) {
            this.selectData = this.selectData.map(d => {
                if (d.id === id) d.selected = false;
                return d;
            });
        },
        // 提交当前选择的值
        optionClick(id) {
            let selectedData = {},
                unselectData = {};
            this.selectData = this.selectData.map(d => {
                if (d.id === id && !d.disabled) {
                    d.selected = !d.selected;
                    if (d.selected) selectedData = d;
                    else unselectData = d;
                }
                return d;
            });
            this.$emit('change', selectedData, unselectData);
        }
    }
};
</script>

<style lang="stylus">

@import "../static/stylus/select/selectOption.styl"

.p-select-option
    .p-select-option-item
        position relative
        &::after
            position absolute
            top 16px
            right 16px
            display block
            border-left 2px solid $blue-500
            border-bottom 2px solid $blue-500
            width 10px
            height 5px
            content ''
            transition transform .3s
            transform rotate(0) scale(0)
        &.p-select-option-item-selected-multiple
            &::after
                transform rotate(-45deg) scale(1)
    .p-select-option-item-disabled
        color: $grey-400 !important
        &:hover
            cursor not-allowed
    .p-select-option-clear
        width 38px
        height @width
        svg
            width 16px
            height @width

</style>
