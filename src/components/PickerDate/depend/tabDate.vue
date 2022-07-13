<template>
    <section :class="['p-picker-tab', disabled&&'p-picker-tab-disabled']">
        <article
                :class="['p-picker-tab-item', value===tab.key&&'p-picker-tab-active']"
                v-for="tab in tabData"
                :key="tab.key"
                @click="tabHandle(tab.key)"
        >{{tab.name}}
        </article>
    </section>
</template>

<script>
export default {
    name: 'TabDate',
    props: {
        value: {
            type: String,
            default: 'day'
        },
        data: {
            type: Array,
            default: () => []
        },
        // 禁用切换
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        // 日周月年tab
        tabData() {
            const { data } = this,
                arr = [];
            for (let i = 0; i < data.length; i++) {
                switch (data[i]) {
                case 'day':
                    arr.push({ key: 'day', name: '日' });
                    break;
                case 'week':
                    arr.push({ key: 'week', name: '周' });
                    break;
                case 'month':
                    arr.push({ key: 'month', name: '月' });
                    break;
                case 'year':
                    arr.push({ key: 'year', name: '年' });
                    break;
                default:
                    break;
                }
            }
            return arr;
        }
    },
    methods: {
        tabHandle(key) {
            if (this.disabled) return;
            this.$emit('input', key);
        }
    }
};
</script>

<style lang="stylus">
.p-picker-tab
    display flex
    user-select none
    .p-picker-tab-item
        margin-left -1px
        border 1px solid $grey-400
        width 38px
        height 32px
        line-height 30px
        text-align center
        color $grey-900
        font-size 14px
        cursor pointer
        transition color .3s, border .3s
        &:first-child
            border-top-left-radius 4px
            border-bottom-left-radius 4px
        &:last-child
            border-top-right-radius 4px
            border-bottom-right-radius 4px
        &:hover
            color $blue-500
    .p-picker-tab-active
        background-color $blue-100
        border-color $blue-500
        color $blue-500
        z-index 1
.p-picker-tab-disabled
    .p-picker-tab-item
        color $grey-300
        cursor not-allowed
        &:hover
            color $grey-300

</style>
