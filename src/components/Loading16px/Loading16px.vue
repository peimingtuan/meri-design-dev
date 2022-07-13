<template>
    <div class="p-loading16px">
        <svg class="p-loading16px-line" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <path d="M9,1 A7,7 0 0,1 15,7" fill="none" stroke-width="1" :stroke="color" />
        </svg>
    </div>
</template>

<script>
export default {
    name: 'Loading16px',
    props: {
        color: {
            type: String,
            default: '#fff'
        }
    }
};
</script>

<style lang="stylus">
    .p-loading16px
        display inline-block
        width 100%
        height 100%
        line-height 100%
        text-align center
        .p-loading16px-line
            width @width
            height @width
            min-width 12px
            min-height 12px
            animation loading16px .5s linear infinite

    @keyframes loading16px
        0%
            transform rotate(0)
        100%
            transform rotate(360deg)

</style>
