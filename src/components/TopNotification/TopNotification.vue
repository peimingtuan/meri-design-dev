<template>
    <div class="p-stick">
        <div
                :class="['p-stick-item', 'p-stick-item-'+item.type]"
                v-for="(item, i) in data"
                :key="item.type+'-'+i"
        >{{item.text}}</div>
    </div>
</template>

<script>
    export default {
        name: "TopNotification",
        props: {
            /**
             * 显示数据
             * @params type[default-默认颜色 error-错误警告 warning-警告 info-显示信息]
             */
            data: {
                type: Array,
                default: () => []
            }
        }
    }
</script>

<style lang="stylus">
    .p-stick
        display flex
        width 100%
        height 32px
        line-height @height
        font-size 0
        .p-stick-item
            flex 1
            display flex
            align-items center
            justify-content center
            font-size 12px
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            &.p-stick-item-none
                display none
            &.p-stick-item-default
                background-color $grey-50
                color $grey-600
            &.p-stick-item-error
                background-color $red-50
                color $red-600
            &.p-stick-item-warning
                background-color $orange-50
                color $orange-600
            &.p-stick-item-info
                background-color $blue-50
                color $blue-600

</style>