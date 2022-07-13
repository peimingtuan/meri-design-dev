<template>
    <div :class="['p-checkbox', disabled&&'p-checkbox-disabled']" @click="handleChange">
        <i :class="['p-checkbox-box', 'p-checkbox-'+checked]"/>
        <span class="p-checkbox-text" v-if="Object.keys($slots).length" @mouseenter="TextEllipsis"><slot/></span>
    </div>
</template>

<script>
import TextEllipsis from '../static/utils/TextEllipsis';

export default {
    name: 'Checkbox',
    props: {
        /**
         * checked-选中
         * uncheck-未选中
         * notNull-半选
         */
        checked: {
            type: String,
            default: 'uncheck'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        // 阻止冒泡
        stopPropagation: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        TextEllipsis,
        handleChange(e) {
            const { disabled, checked, stopPropagation } = this;
            if (stopPropagation) e.stopPropagation();
            if (disabled) return;
            const { dataset } = this.$el;
            let status = '';
            if (checked === 'checked') status = 'uncheck';
            else status = 'checked';

            if (this._events?.change) this.$emit('change', status, dataset);
            else this.$emit('update:checked', status);
        }
    }
};
</script>

<style lang="stylus">
    .p-checkbox
        display inline-flex
        align-items center
        min-width 16px
        min-height 16px
        vertical-align middle
        cursor pointer
        z-index 1
        & + .p-checkbox
            margin-left 8px
        .p-checkbox-box
            position relative
            vertical-align middle
            border-width 1px
            border-style solid
            border-color transparent
            border-radius 2px
            width 16px
            height @width
            transition all .3s
            &:hover
                box-shadow 0 0 4px 0 rgba(78, 131, 253, .4)
            &::after
                position absolute
                background none
                transition transform .2s ease-in-out
                transform rotate(0) scale(0)
                z-index 1
                content ''
                pointer-events none
        .p-checkbox-uncheck
            background-color $theme
            border-color $grey-400
            &:hover
                border-color $blue-500
        .p-checkbox-checked
            background-color $blue-500
            border-color $blue-500
            &::after
                top 2px
                left 5px
                border-right 2px solid $white
                border-bottom 2px solid $white
                width 4px
                height 8px
                transform rotate(45deg) scale(1)
        .p-checkbox-notNull
            background-color $blue-500
            border-color $blue-500
            &::after
                top 6px
                left 3px
                background-color $white
                width 8px
                height 2px
                transform scale(1)
        .p-checkbox-text
            padding-left 8px
            width calc(100% - 16px)
            color $grey-900
            font-size 14px
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            user-select none
    .p-checkbox-disabled
        cursor not-allowed
        > i
            pointer-events none
        .p-checkbox-uncheck
            background-color $grey-300
        .p-checkbox-checked
            background-color $grey-400
            border-color $grey-400
        .p-checkbox-notNull
            background-color $grey-400
            border-color $grey-400

</style>
