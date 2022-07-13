<template>
    <div :class="['p-loading', `p-loading-${type}`]">
        <section class="p-loading-bg"/>
        <div class="p-loading-item" :style="{width: `${size}px`, height: `${size}px`}">
            <img v-if="type==='global'" src="http://47.95.122.141:8200/persagy_ui_kit/loading-static/global-60.gif" alt="">
            <img v-else src="http://47.95.122.141:8200/persagy_ui_kit/loading-static/local.gif" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: 'Loading',
    props: {
        // type 取值【global-全局、local-局部】
        type: {
            type: String,
            default: 'global'
        },
        // 尺寸大小
        size: {
            type: [Number, String],
            default: 60
        }
    }
};
</script>

<style lang="stylus">
.p-loading
    display flex
    align-items center
    justify-content center
    font-size 0
    z-index 8000

.p-loading-bg
    position absolute
    left 0
    top 0
    z-index 1
    width 100%
    height 100%

// 全局
.p-loading-global
    position fixed
    left 0
    top 0
    background-color $theme
    width 100%
    height 100%

.p-loading-item
    z-index 2

    img
        width 100%
        height 100%

// 局部
.p-loading-local
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    .p-loading-bg
        background-color $grey-50

</style>
