<template>
    <div class="p-message-box"></div>
</template>

<script>
export default {
    name: 'MessageBox'
};
</script>

<style lang="stylus">

.p-message-box
    position fixed
    top 36px
    left 0
    text-align center
    display flex
    flex-flow column wrap
    justify-content center
    align-items center
    width 100%
    z-index 9000
    pointer-events none

</style>
