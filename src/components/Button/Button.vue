<template>
    <div :class="`p-button p-button-${type} p-button-${size} ${minWidth ? 'min-size' : ''} ${disabled ? ('p-button-' + type + '-disabled') : ''} `"
         @click="handleClick"
        >
        <Icon v-if="type === 'icon' || type === 'icon-border' || type === 'icon-text'" type="action" :name='icon' />
        <template>
            <div v-if="text && type !== 'icon' && type !== 'icon-border'" ref="text" class="p-btn-text">{{text}}</div>
            <div v-else-if="type !== 'icon' && type !== 'icon-border'" ref="text" class="p-btn-text"><slot/></div>
        </template>
        <section class="p-button-loading"
                 v-if="
                    loading && type !== 'icon'
                     && type !== 'icon-border'
                     && type !== 'icon-text'
                     && type !== 'text'
                     && type !== 'text-red'
                     && type !== 'text-blue'
                 "
            >
            <Loading16px />
        </section>
    </div>
</template>

<script>
import Loading16px from '../Loading16px';
import Icon from '../Icon';

export default {
    name: 'Button',
    components: { Loading16px, Icon },
    props: {
        /**
             * 按钮文本
             */
        text: {
            type: String,
            default: ''
        },
        /**
             * 按钮类型
             * 可选值 【default primary error disabled text text-blue text-red icon icon-text icon-border】
             */
        type: {
            type: String,
            default: 'default'
        },
        /**
             * icon类型
             */
        icon: {
            type: String,
            default: ''
        },
        /**
             * 按钮loading状态
             */
        loading: {
            type: Boolean,
            default: false
        },
        /**
             * 按钮大小
             * 可选值【large medium small】
             */
        size: {
            type: String,
            default: 'medium'
        },
        /**
             * 是否禁用
             * 可选值 【true, false】
             */
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            minWidth: false // 小尺寸按钮内容宽度小于28px时，设置按钮最小宽度60px
        };
    },
    watch: {
        text() {
            this.minWidthAction();
        }
    },
    mounted() {
        this.minWidthAction();
    },
    methods: {
        minWidthAction() {
            if (this.type === 'icon' || this.type === 'icon-text') return;
            if (this.$refs.text) this.minWidth = this.$refs.text.innerHTML.length === 1;
        },
        /**
             * 点击按钮的回调
             */
        handleClick() {
            if (this.type === 'disabled' || this.disabled) return;
            this.$emit('click');
        }
    }
};
</script>

<style lang="stylus">
    .p-button
        position relative
        display inline-flex
        align-items center
        justify-content center
        padding-left 8px
        padding-right 8px
        background-color $theme
        border-width 1px
        border-style solid
        border-radius 4px
        transition all .36s
        font-size 0
        text-align center
        &:after
            content ''
            color transparent
        &:before
            content ''
            color transparent
        &+.p-button
            margin-left 12px
        .p-btn-text
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
            position relative
            z-index 1
            user-select none
        .p-button-loading
            display inline-block
            margin-left 4px
            vertical-align middle
    .p-button-large
        max-width 128px
        min-width 80px
        height 40px
        line-height @height - 2
        .p-btn-text
            font-size 16px
        .p-button-loading
            width 20px
            height 20px
    .p-button-medium
        max-width 116px
        min-width 80px
        height 32px
        line-height @height - 2
        .p-btn-text
            font-size 14px
        .p-button-loading
            width 16px
            height 16px
    .p-button-small
        max-width 108px
        min-width 60px
        height 28px
        line-height @height - 2
        .p-btn-text
            font-size 14px
        .p-button-loading
            width 12px
            height 12px
    .p-button-default, .p-button-icon-text
        background-color $theme
        border-color $grey-400
        color $grey-900
        cursor pointer
        .p-button-loading
            path
                fill $grey-900
        &:hover
            border-color $blue-500
            color $blue-500
        &:active
            border-color $blue-600
            color $blue-600
        &::after
            background radial-gradient(circle, $grey-200 10%, transparent 10%)
        .loading
            path
                stroke $grey-400
    .p-button-primary
        background-color $blue-500
        border-color $blue-500
        color $white
        cursor pointer
        &:hover
            background-color $blue-400
            border-color $blue-400
        &:active
            background-color $blue-600
            border-color $blue-600
        &::after
            background radial-gradient(circle, $blue-300 10%, transparent 10%)
    .p-button-error
        background-color $red-500
        border-color $red-500
        color $white
        cursor pointer
        &:hover
            background-color $red-400
            border-color $red-400
        &:active
            background-color $red-600
            border-color $red-600
        &::after
            background radial-gradient(circle, $red-300 10%, transparent 10%)
    .p-button-disabled,
    .p-button-default-disabled,
    .p-button-primary-disabled,
    .p-button-error-disabled
        background-color $grey-200
        color $grey-400
        cursor not-allowed
        border-color $grey-200
        &:hover
            background-color $grey-200
            border-color $grey-200
            color $grey-400
        &:active
            background-color $grey-200
            border-color $grey-200
            color $grey-400
    .p-button-text-blue
        border-style none
        color $blue-500
        cursor pointer
        &:hover
            color $blue-500
        &:active
            color $blue-600
    .p-button-text-red
        border-style none
        color $red-500
        cursor pointer
        &:hover
            color $red-400
        &:active
            color $red-600
    .min-size
        min-width 0
    .p-button-icon,.p-button-icon-border
        border-color $grey-400
        padding 0
        cursor pointer
        path
            fill $grey-900
            transition all .36s
        .p-icon
            svg
                width 100%!important
                height 100%!important
    .p-button-icon
        border-color transparent
        &:hover
            color $blue-500
            path
                fill $blue-500
        &:active
            color $blue-600
            path
                fill $blue-600
        &::after
            color $blue-500
            path
                fill $blue-500
    .p-button-icon-border
        &:hover
            border-color $blue-500
            color $blue-500
            path
                fill $blue-500
        &:active
            border-color $blue-600
            color $blue-600
            path
                fill $blue-600
        &::after
            border-color $blue-500
            color $blue-500
            path
                fill $blue-500
    .p-button-icon.p-button-large,.p-button-icon-border.p-button-large
        width 40px
        min-width 40px
        .p-icon
            width 24px
            height 24px
            line-height 24px
    .p-button-icon.p-button-medium,.p-button-icon-border.p-button-medium
        width 32px
        min-width 32px
        .p-icon
            width 16px
            height 16px
            line-height 16px
    .p-button-icon.p-button-small,.p-button-icon-border.p-button-small
        width 28px
        min-width 28px
        .p-icon
            width 12px
            height 12px
            line-height 12px
    .p-button-icon-text
        border-color transparent
        &:hover
            border-color transparent
        path
            fill $grey-900
            transition all .36s
        &:hover
            color $blue-500
            path
                fill $blue-500
        &:active
            color $blue-600
            path
                fill $blue-600
        &::after
            color $blue-500
            path
                fill $blue-500
        .p-icon
            margin-right 4px
            svg
                width 100%!important
                height 100%!important
    .p-button-icon-text.p-button-large
        .p-icon
            width 20px
            height 20px
            line-height 20px
    .p-button-icon-text.p-button-medium
        .p-icon
            width 16px
            height 16px
            line-height 16px
    .p-button-icon-text.p-button-small
        .p-icon
            width 12px
            height 12px
            line-height 12px
    .p-button-icon-border-disabled
        background-color $grey-200
        color $grey-400
        cursor not-allowed
        border-color $grey-200
        svg
            cursor not-allowed
            path
                fill $grey-400
        &:hover
            border-color $grey-200
            path
                fill $grey-400
    .p-button-icon-disabled
        color $grey-400
        cursor not-allowed
        svg
            cursor not-allowed
            path
                fill $grey-400
        &:hover
            path
                fill $grey-400
    .p-button-icon-text-disabled
        color $grey-400
        cursor not-allowed
        svg
            cursor not-allowed
            path
                fill $grey-400
        &:hover
            color $grey-400
            path
                fill $grey-400
    .p-button-text
        border-color transparent
        cursor pointer
        color $grey-900
        &:hover
            color $blue-500
            border-color transparent
        &:active
            color $blue-600
    .p-button-text-disabled, .p-button-text-blue-disabled, .p-button-text-red-disabled
        cursor not-allowed
        color $grey-400
        &:hover
            color $grey-400

</style>
