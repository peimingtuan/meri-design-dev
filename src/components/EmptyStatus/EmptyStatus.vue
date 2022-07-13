<template>
    <div class="p-empty">
        <template v-if="!custom">
            <link ref="preload" as="image" :href="`http://47.95.122.141:8200/persagy_ui_kit/empty/${item}.png`" v-for="item in typeArr" :key="item" />
        </template>
        <img class="p-empty-img" :src="custom?type:`http://47.95.122.141:8200/persagy_ui_kit/empty/${type}.png`" />
        <section class="p-empty-text">
            <slot name="title" v-if="$slots.title" />
            <slot name="text" v-if="$slots.text" />
            <slot name="button" v-if="$slots.button" />
        </section>
    </div>
</template>

<script>
export default {
    name: 'EmptyStatus',
    props: {
        // 插画的名字
        type: {
            type: String,
            default: ''
        },
        // 自定义地址
        custom: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        typeArr() {
            return [
                '404', '500', 'administration',
                'collect', 'completed', 'content',
                'data', 'download', 'graph', 'load',
                'login', 'message', 'network', 'picture',
                'remark', 'search', 'statement', 'table', 'waiting'
            ];
        }
    }
};
</script>

<style lang='stylus'>
.p-empty
    display inline-block
    width 100%
    text-align center
    font-size 0
    .p-empty-img
        width 120px
        height @width
    .p-empty-text
        margin-top 12px
        text-align center

</style>
