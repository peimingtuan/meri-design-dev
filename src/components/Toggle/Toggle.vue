<template>
    <label
            :class="[
                'p-toggle',
                value?'p-toggle-on':'p-toggle-off',
                disable&&(value?'p-toggle-disable-on':'p-toggle-disable-off')
            ]"
            @click.self="handleToggle"
    >
        <input type="checkbox" :value="value"/>
    </label>
</template>

<script>
export default {
    name: 'Toggle',
    props: {
        /**
         * 绑定的值
         */
        value: {
            type: Boolean,
            default: false
        },
        /**
         * 是否禁用
         */
        disable: {
            type: Boolean,
            default: false
        }
    },
    model: {
        props: 'value',
        event: 'change'
    },
    methods: {
        handleToggle() {
            /**
             * 开关切换回调
             */
            if (!this.disable) this.$emit('change', !this.value);
        }
    }
};
</script>

<style lang="stylus">
.p-toggle
    position relative
    display inline-block
    vertical-align middle
    width 40px
    height 22px
    border-radius (@height/ 2)
    cursor pointer
    transition background-color .3s
    &:before
        content ''
        position absolute
        top 2px
        display block
        background-color $white
        width 18px
        height @width
        border-radius (@height/ 2)
        box-shadow $box-shadow-bottom
        transition right .2s
        z-index 2
    input
        display none
        width 0
        height 0
    & + .p-toggle
        margin-left 8px

.p-toggle-off
    background-color $grey-400
    &:before
        right 20px

.p-toggle-on
    background-color $blue-500
    &:before
        right 2px

.p-toggle-disable-on
    background-color $blue-200
    cursor not-allowed

.p-toggle-disable-off
    background-color $grey-300
    cursor not-allowed

</style>
