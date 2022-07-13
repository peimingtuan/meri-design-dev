<template>
    <div class="toggleView">
        <div class="component component-padding">
             <h1 class="components-title">Divider组件</h1>
            <Divider />
            <br><br><br><br>
            <Divider type="v" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'BadgeView'
};
</script>

<style lang="stylus" scoped>

    .avatar
        display inline-block
        vertical-align middle
        img
            width 28px
            height @width

</style>
