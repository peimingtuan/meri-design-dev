<template>
    <div class="p-table-main">
        <div
                :class="['p-table-box-item', `p-table-box-item-radius-${radius}`]"
                v-for="(table, ti) in data"
                :key="`table-${table.id}-${ti}`"
                :ref="`table${ti}`"
                @mouseenter="tableItemEnter(ti)"
                @mouseleave="tableItemLeave(ti)"
        >
            <div
                    :class="['p-table-box-item-list', `p-table-box-item-list-${header.align}`]"
                    v-for="(header, hi) in tableHeader"
                    :key="`${table.id}-header-${header.key}-${hi}`"
            >
                <section
                        class="p-table-box-text"
                        v-if="String(table[header.key]) === '[object Object]'"
                        :style="{width: `${table[header.key].width || 'auto'}px`, color: (table[header.key].color || '')}"
                >{{table[header.key].text}}</section>
                <div v-else
                        :class="[(String(table[header.key]) === '建议,实际') ? 'p-table-box-children-str' : 'p-table-box-children']"
                >
                    <div
                            :class="['p-table-box-text-item']"
                            v-for="(tChild, tci) in table[header.key]"
                            :key="`${hi}-tChild-${tci}`"
                    >
                        <section
                                v-if="typeof(tChild) === 'string'"
                                class="p-table-box-text p-table-box-text-str"
                        >{{tChild}}</section>
                        <section v-else
                                 class="p-table-box-item-words"
                        >
                            <article
                                    v-for="(tHeaderC, tHci) in header.children"
                                    :key="`${tci}-tHeaderC-${tHeaderC.key}-${tHci}`"
                            >
                                <p
                                        class="p-table-box-text p-table-box-text-str p-table-box-item-words-p"
                                        v-for="(tcTh, tcThI) in tChild[tHeaderC.key]"
                                        :key="`${tci}-tcTh-${tcThI}`"
                                        :style="tChild.width&&{width: `${tChild.width}px`}"
                                >{{tcTh}}</p>
                            </article>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TableMain',
    props: {
        // 表头
        tableHeader: {
            type: Array,
            default: () => []
        },
        // 数据
        data: {
            type: Array,
            default: () => []
        },
        // 圆角方向 可选值[left, right]
        radius: {
            type: String,
            default: ''
        },
        // 鼠标hover时的索引
        hoverIndex: {
            type: [Number, Object],
            default: null
        }
    },
    watch: {
        // 鼠标hover时的索引改变，设置圆角
        hoverIndex(n, o) {
            const { radius } = this;
            const str = radius.replace(radius[0], radius[0].toUpperCase());
            if (typeof n === 'number') {
                const tableDom = this.$refs[`table${n}`];
                if (tableDom) {
                    const dom = tableDom[0] || tableDom;
                    dom.style.backgroundColor = '#e4e5e7';
                    // dom.style[`borderTop${str}Radius`] = '40px';
                    // dom.style[`borderBottom${str}Radius`] = '40px';
                    const domNext = this.$refs[`table${n + 1}`];
                    if (domNext && domNext.length) {
                        domNext[0].style.borderTopColor = '#fff';
                    }
                }
            } else {
                const tableDom = this.$refs[`table${o}`];
                if (tableDom) {
                    const dom = tableDom[0] || tableDom;
                    dom.style.backgroundColor = '';
                    // dom.style[`borderTop${str}Radius`] = '';
                    // dom.style[`borderBottom${str}Radius`] = '';
                    const domNext = this.$refs[`table${o + 1}`];
                    if (domNext && domNext.length) {
                        domNext[0].style.borderTopColor = '';
                    }
                }
            }
        }
    },
    methods: {
        // 鼠标进入
        tableItemEnter(ind) {
            this.$emit('setIndex', ind);
        },
        // 鼠标离开
        tableItemLeave(ind) {
            this.$emit('clearIndex', ind);
        }
    }
};
</script>

<style lang="stylus">
.p-table-main
    font-size 0
    .p-table-box-item
        display flex
        align-items center
        justify-content space-around
        background-color $theme
        border-top 1px solid $grey-200
        height 80px
        transition background-color .3s
        overflow hidden
        &:first-child
            border-top 0
        &:last-child
            border-bottom 1px solid $grey-200
        &:hover
            background-color $grey-300
        .p-table-box-text
            padding-left 20px
            padding-right 20px
            text-align center
            color $grey-900
            font-size 14px
        .p-table-box-item-list
            flex 1
        .p-table-box-children
            display flex
        .p-table-box-text-str
            height 32px
            line-height @height
        .p-table-box-children-str
            .p-table-box-text-item
                &:nth-child(odd)
                    .p-table-box-text
                        font-size 12px
        .p-table-box-item-words
            .p-table-box-text
                &:nth-child(odd)
                    font-size 12px
    .p-table-box-item-radius-left
        .p-table-box-text
            text-align left
    .p-table-box-item-radius-right
        .p-table-box-text
            text-align right
    .p-table-box-item-list-center
        .p-table-box-text
            text-align center

</style>
