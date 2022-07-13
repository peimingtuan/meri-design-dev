<template>
    <div class="p-index-loading">
        <ul class="p-index-loading-box">
            <li class="p-index-loading-list" />
            <li class="p-index-loading-list" />
            <li class="p-index-loading-list" />
            <li class="p-index-loading-list" />
            <li class="p-index-loading-list" />
            <li class="p-index-loading-list" />
        </ul>
    </div>
</template>

<script>
export default {
    name: 'IndexLoading'
};
</script>

<style lang="stylus">
    .p-index-loading
        position fixed
        left 0
        top 0
        background-color $theme
        width 100%
        height 100%
        z-index 9000
        .p-index-loading-box
            position absolute
            top 50%
            left 50%
            display flex
            justify-content center
            align-items center
            width 200px
            height 50px
            transform translate(-100px, -60px)
            z-index 9000
            .p-index-loading-list
                border-radius 4px
                width 6px
                height 100%
                background-color $blue-500
                & + .p-index-loading-list
                    margin-left 4 px
                &:nth-of-type(1)
                    animation indexLoading .8s ease-in-out 200ms infinite alternate
                &:nth-of-type(2)
                    animation indexLoading .8s ease-in-out 400ms infinite alternate
                &:nth-of-type(3)
                    animation indexLoading .8s ease-in-out 600ms infinite alternate
                &:nth-of-type(4)
                    animation indexLoading .8s ease-in-out 800ms infinite alternate
                &:nth-of-type(5)
                    animation indexLoading .8s ease-in-out 1000ms infinite alternate
                &:nth-of-type(6)
                    animation indexLoading .8s ease-in-out 1200ms infinite alternate

    @keyframes indexLoading
        0%,
        100%
            transform scaleY(1)
        50%
            transform: scaleY(.4)

</style>
