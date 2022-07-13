<template>
     <div class="p-tooltip-box" />
</template>
<script>
export default {
    name: 'Tooltip'
};
</script>
<style lang="stylus">
    @import "../static/stylus/animate/fadeDownUpUi.styl"
    .p-tooltip-box
        position absolute
        padding 8px 12px
        border 1px solid $grey-300
        border-radius 4px
        box-shadow $box-shadow-bottom
        background-color $theme
        color $grey-900
        font-size 12px
        pointer-events none

</style>
