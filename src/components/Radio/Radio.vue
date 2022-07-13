<template>
    <div :class="['p-radio', disabled&&'p-radio-disabled',]" @click="handleChange">
        <i :class="['p-radio-box', 'p-radio-'+checked]"/>
        <span class="p-radio-text" v-if="Object.keys($slots).length"><slot></slot></span>
    </div>
</template>

<script>
export default {
    name: 'Radio',
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
        }
    },
    // mounted() {
    //     console.log(this.$slots);
    // },
    methods: {
        handleChange() {
            if (this.disabled) return;
            if (this.checked === 'checked') {
                this.$emit('change', 'uncheck');
            } else {
                this.$emit('change', 'checked');
            }
        }
    }
};
</script>

<style lang="stylus">
    .p-radio
        display inline-block
        cursor pointer

        & + .p-radio
            margin-left 8px

        .p-radio-box
            position relative
            display inline-block
            vertical-align middle
            margin-right 4px
            border-width 1px
            border-style solid
            border-color transparent
            border-radius 8px
            width 16px
            height @width
            transition all .3s

            &:hover
                box-shadow 0 0 4px 0 rgba(78, 131, 253, .4)

            &::after
                position absolute
                background none
                transition all .2s ease-in-out
                transform scale(0)
                z-index 1
                content ''

        .p-radio-uncheck
            background-color $theme
            border-color $grey-400

            &:hover
                border-color $blue-500

        .p-radio-checked
            background-color $theme
            border-color $blue-500

            &::after
                top 3px
                left 3px
                background-color $blue-500
                border-radius 4px
                width 8px
                height @width
                transform scale(1)

        .p-radio-text
            vertical-align middle
            color $grey-900
            font-size 14px
            user-select none

    .p-radio-disabled
        cursor not-allowed

        > i
            pointer-events none

        .p-radio-uncheck
            background-color $grey-300

        .p-radio-checked
            border-color $grey-400

            &:after
                background-color $grey-400

</style>
