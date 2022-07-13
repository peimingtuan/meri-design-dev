<template>
    <div class="p-breadcrumb">
        <section class="p-breadcrumb-item" v-for="(item, i) in data" :key="i+'-'+item.id">
            <article
                    :class="[
                        'p-breadcrumb-item-text',
                        (value?value===item.id:i===data.length-1)&&'p-breadcrumb-item-active',
                        (i>0&&i<data.length-1)&&'p-breadcrumb-item-width',
                        ellipsis ? 'p-breadcrumb-item-max-width' : ((i===data.length-1)&&'p-breadcrumb-item-max-width')
                    ]"
                    v-ptitle:isText:true="item.name"
                    @click="breadcrumbClick(item.id)"
            >{{item.name}}</article>
            <article class="p-breadcrumb-arrow" v-if="i<data.length-1">
                <ArrowRight />
            </article>
        </section>
    </div>
</template>

<script>
import ArrowRight from '../static/iconSvg/arrow_right.svg';
import Tooltip from '../Tooltip';

export default {
    name: 'Breadcrumb',
    components: { ArrowRight },
    directives: {
        ptitle: {
            // 指令的定义
            inserted: Tooltip,
            unbind: Tooltip.remove
        }
    },
    props: {
        /**
         * 数据列表
         */
        data: {
            type: Array,
            default: () => []
        },
        /**
         * 当前高亮显示的id
         */
        value: {
            type: String,
            default: ''
        },
        // 每个item都显示省略号
        ellipsis: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            titleShow: false // 是否显示title
        };
    },
    methods: {
        /**
         * 点击某项执行的钩子
         * @param id
         */
        breadcrumbClick(id) {
            if (this.value) this.$emit('input', id);
            this.$emit('change', id);
        }
    }
};
</script>

<style lang="stylus">
    .p-breadcrumb
        display flex
        align-items center
        font-size 0
        .p-breadcrumb-item
            .p-breadcrumb-item-text
                display inline-block
                vertical-align middle
                height 24px
                line-height @height
                color $grey-500
                font-size 14px
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                cursor pointer
                transition color .3s
                &:hover
                    color $blue-500
            .p-breadcrumb-item-active
                color $grey-900
            .p-breadcrumb-item-width
                max-width 44px
            .p-breadcrumb-item-max-width
                max-width 100px
            .p-breadcrumb-arrow
                display inline-block
                vertical-align middle
                margin-left 4px
                margin-right 4px
                width 8px
                height 24px
                line-height @height
                svg
                    vertical-align middle
                    width 8px
                    height 14px

</style>
