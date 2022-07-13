<template>
    <div class="p-headers">
        <div class="p-headers-left">
            <!-- @slot-左侧内容 -->
            <slot name="left" />
        </div>
        <div class="p-headers-middle">
            <!-- @slot-居中内容 -->
            <slot name="middle" />
        </div>
        <div class="p-headers-right">
            <!-- @slot-右侧内容 -->
            <slot name="right" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'Headers'
};
</script>

<style lang="stylus">
    .p-headers
        position relative
        //background-color $grey-100
        border-bottom 1px solid $grey-300
        width 100%
        height 48px
        text-align center
        .p-headers-left
            position absolute
            left 16px
            top 0
            display inline-flex
            align-items center
            justify-content center
            height @height
        .p-headers-middle
            position relative
            top 0
            left 0
            display inline-flex
            align-items center
            justify-content center
            height @height
        .p-headers-right
            position absolute
            right 16px
            top 0
            display inline-flex
            align-items center
            justify-content center
            height @height

</style>
