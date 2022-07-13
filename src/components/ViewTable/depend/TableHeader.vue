<template>
    <div class="p-view-table-header">
        <div
                :class="[
                    'p-table-header-item',
                     (header.children && header.children.length) && 'p-table-header-item-hc',
                      `p-table-header-item-${header.align || radius}`
                ]"
                v-for="(header, hi) in data"
                :key="`header-${header.key}-${hi}`"
                :ref="`header${header.fixed&&'Fixed'}${hi}`"
                :style="header.width && {width: `${header.width}px`}"
        >
            <section :class="['p-table-header-text', (header.children && header.children.length) && 'p-table-header-text-lh']">
                <span class="p-table-header-child">{{header.text}}</span>
            </section>
            <section
                    class="p-table-header-item-children"
                    v-if="header.children && header.children.length"
            >
                <article
                        class="p-table-header-text p-table-header-text-lh p-table-header-children-text"
                        v-for="(hChild, hci) in header.children"
                        :key="`hChild-${hChild.key}-${hci}`"
                        :style="hChild.width && {width: `${hChild.width}px`}"
                >
                    <span class="p-table-header-child">{{hChild.text}}</span>
                </article>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TableHeader',
    props: {
        // 圆角方向 可选值[left, right]
        radius: {
            type: String,
            default: ''
        },
        // 数据
        data: {
            type: Array,
            default: () => []
        },
        // 固定的数据
        fixedData: {
            type: Array,
            default: () => []
        }
    },
    watch: {
        fixedData(n) {
            this.$nextTick(() => {
                this.fixedHandle(n);
            });
        }
    },
    mounted() {
        setTimeout(() => {
            this.fixedHandle(this.fixedData);
        });
    },
    methods: {
        // 粘性定位位置计算
        fixedHandle(data) {
            let w = 0;
            data.forEach((d, i) => {
                const dom = this.$refs[`headerFixed${i}`];
                w += dom[0].clientWidth;
            });
            this.$emit('setWidth', w);
        }
    }
};
</script>

<style lang="stylus">
.p-view-table-header
    display flex
    align-items center
    justify-content space-around
    background-color $grey-50
    border-bottom 1px solid $grey-200
    width 100%
    height 60px
    font-size 0
    overflow hidden
    .p-table-header-item
        flex 1
        .p-table-header-text
            padding-left 20px
            padding-right 20px
            color $grey-600
            font-size 12px
            text-align center
            .p-table-header-child
                display inline-block
                width 100%
                line-height 20px
        .p-table-header-text-lh
            line-height 30px
        .p-table-header-item-children
            display flex
            align-items center
            justify-content space-between
            border-top 1px solid $grey-200
            height 30px
            .p-table-header-children-text
                align-self flex-start
                width 50%
                &:nth-child(even)
                    border-left 1px solid $grey-200
    .p-table-header-item-hc
        flex-shrink .8
        border-left 1px solid $grey-200
    .p-table-header-item-center
        .p-table-header-text
            text-align center
    .p-table-header-item-left
        .p-table-header-text
            text-align left
        .p-table-header-text-lh
            text-align center
    .p-table-header-item-right
        .p-table-header-text
            text-align right
        .p-table-header-text-lh
            text-align center

</style>
