<template>
    <div class="p-divider">
        <section :class="['p-divider-line', 'p-divider-'+type]"><slot></slot></section>
    </div>
</template>

<script>
export default {
    name: 'Divider',
    props: {
        /**
             * 线条展示方向，可选值【h-水平 v-垂直】
             */
        type: {
            type: String,
            default: 'h'
        }
    }
};
</script>

<style lang="stylus">
    .p-divider
        .p-divider-line
            background-color $grey-400
        .p-divider-h
            width 100%
            height 1px
        .p-divider-v
            margin-left 12px
            margin-right 12px
            width 1px
            height 16px

</style>
