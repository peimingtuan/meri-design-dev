<template>
    <div class="p-select-panel">
        <section :class="['p-select-panel-list', item.disabled&&'p-select-panel-disabled']"
                 v-for="(item, i) in panelData" :key="`panel-${item.id}-${i}`"
            >
            <article class="p-select-panel-text"
                     :class="[
                         (ellipsis === 'start' && item.excess)
                         ? 'p-select-panel-text-ellipsis-start'
                         : 'p-select-panel-text-ellipsis-end'
                     ]"
                >
                <span :style="{
                            maxWidth: `calc(100% - ${(omit && item.tag) && (item.tag.width + 8)}px)`,
                            textIndent: `${item.excess - (item.excess && scrollBar)}px`
                        }"
                      @mouseenter="textEllipsis($event, item)"
                >{{jointParent ? item.biasName : item.name}}</span>
                <span v-if="omit && item.tag && item.tag.name"
                      class="p-select-panel-tag"
                      :style="{
                            width: `${item.tag.width}px`,
                            color: item.tag.color,
                            backgroundColor: item.tag.bgColor,
                        }"
                >{{item.tag.name}}</span>
            </article>
            <article class="p-select-panel-icon" @click="clearItem(item)">
                <IconLock v-if="item.disabled" />
                <IconClear v-else />
            </article>
        </section>
    </div>
</template>

<script>
import IconClear from '../static/iconSvg/clear2.svg';
import IconLock from '../static/iconSvg/action/lock.svg';
import TextEllipsis from '../static/utils/TextEllipsis';
import GetTextHideWidth from '../static/utils/GetTextHideWidth';
import GetScrollbarWidth from '../static/utils/GetScrollbarWidth';

export default {
    name: 'SelectPanel',
    components: { IconClear, IconLock },
    props: {
        // 宽
        width: {
            type: [String, Number],
            default: 280
        },
        ellipsis: {
            type: String,
            default: 'end' // start end
        },
        // 树形数据
        data: {
            type: Array,
            default: () => []
        },
        // 锁定图标显示
        lock: {
            type: Boolean,
            default: false
        },
        // 显示更多操作
        omit: {
            type: Boolean,
            default: true
        },
        // 可选面板是否拼接父级name
        jointParent: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            scrollBar: 0 // 滚动条宽度
        };
    },
    computed: {
        panelData: {
            get() {
                const { data } = this;
                return data.map(d => {
                    d.excess = -this.getTextWidth(d);
                    return d;
                });
            },
            set(nData) {
                return nData.map(d => {
                    d.excess = -this.getTextWidth(d);
                    return d;
                });
            }
        }
    },
    watch: {
        width(n, o) {
            if (n === o) return;
            this.panelData = this.data;
        }
    },
    mounted() {
        this.scrollBar = GetScrollbarWidth();
    },
    methods: {
        textEllipsis(e, { excess, name, biasName }) {
            const { jointParent } = this;
            if (excess) e.target.title = jointParent ? biasName : name;
            else TextEllipsis(e);
        },
        // 清除
        clearItem(item) {
            const { disabled, checked } = item;
            if (disabled) return;
            const curItem = JSON.parse(JSON.stringify(item));
            if (checked === 'notNull') curItem.checked = 'checked';
            this.$emit('clearItem', curItem);
        },
        getTextWidth({ name, biasName, tag }) {
            const { width, jointParent } = this,
                tagWidth = tag?.width || 0,
                maxWidth = width - 52 - (tagWidth ? (tagWidth + 20) : 0);
            return GetTextHideWidth(maxWidth, (jointParent ? biasName : name));
        }
    }
};
</script>

<style lang="stylus">
.p-select-panel
    width 100%
    font-size 0
.p-select-panel-list
    display flex
    justify-content space-between
    align-items center
    padding-left 16px
    padding-right @padding-left
    width 100%
    height 38px
    transition background-color .3s
    &:hover
        background-color $hover-color-grey
        .p-select-panel-text-ellipsis-start
            &:before
                background-color $hover-color-grey
    .p-select-panel-text
        display inline-flex
        align-items center
        background-color transparent
        width calc(100% - 20px)
        height 38px
        line-height @height
        font-size 14px
        color $grey-900
        overflow hidden
        .p-select-panel-tag
            margin-left 8px
            height 20px
            line-height @height
            text-align center
    .p-select-panel-text-ellipsis-start
        position relative
        &:before
            position absolute
            left -1px
            top -1px
            display inline-block
            background-color $theme
            width 12px
            height 38px
            content '...'
            font-size 14px
            color $grey-900
            text-align right
            transition background-color .3s
            pointer-events none
    .p-select-panel-text-ellipsis-end
        text-overflow ellipsis
        white-space nowrap
    .p-select-panel-icon
        width 20px
        height @width
        line-height @width
        text-align right
        cursor pointer
        font-size 0
        svg
            width 16px
            height @width
            vertical-align middle
            path
                transition fill .3s
        &:hover
            path
                fill $blue-500
.p-select-panel-disabled
    color $grey-400
    cursor not-allowed
    .p-select-panel-icon
        cursor not-allowed

</style>
