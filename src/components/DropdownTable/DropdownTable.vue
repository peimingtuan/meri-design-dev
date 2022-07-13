<template>
    <div :class="['p-drop', `p-drop-${theme}`, dropShow&&'p-drop-show']" ref="pDrop" @mouseenter="dropEnter" @mouseleave="dropLeave" @click="dropClick">
        <section class="p-drop-title">
            <article class="p-drop-title-content">
                <!-- @slot html内容 -->
                <slot />
            </article>
        </section>
    </div>
</template>

<script>
import DropOption from './depend/dropOption';

export default {
    name: 'Dropdown',
    props: {
        /**
         * 数据列表
         */
        data: {
            type: Array,
            default: () => [],
            required: true
        },
        /**
         * 绑定的v-model值
         */
        value: {
            type: [String, Number],
            default: ''
        },
        // 最小宽度
        minWidth: {
            type: [String, Number],
            default: ''
        },
        maxWidth: {
            type: [String, Number],
            default: ''
        },
        // 最小高度
        minHeight: {
            type: [String, Number],
            default: ''
        },
        maxHeight: {
            type: [String, Number],
            default: ''
        },
        // 是否显示右边三角形
        triangle: {
            type: Boolean,
            default: true
        },
        // 基于哪个父容器定位，可选值body、parent父级、p-modal-content当前触发器的某个class类名
        transfer: {
            type: String,
            default: 'parent'
        },
        // 主题
        theme: {
            type: String,
            default: 'light' // 可选值【light、dark】
        },
        // 通过点击或hover打开下拉列表
        trigger: {
            type: String,
            default: 'hover'
        },
        // 显示搜索
        openSearch: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: '请搜索'
        }
    },
    data() {
        return {
            // 三角形状态
            optionStatus: false,
            // 下拉弹窗显示
            dropShow: false
        };
    },
    watch: {
        value(n, o) {
            if (n === o) return;
            if (this.dOption) this.dOption.value = n;
        },
        data(n, o) {
            if (n === o) return;
            if (this.dOption) this.dOption.data = n;
        },
        optionStatus(n, o) {
            if (n === o) return;
            if (n) this.dropShow = true;
            else setTimeout(() => { this.dropShow = false; }, 300);
        }
    },
    methods: {
        // 打开下拉列表
        openDrop() {
            if (this.dOption) {
                this.setDropdownStatus(true);
            } else {
                const {
                    value, data, minWidth, maxWidth, minHeight, maxHeight, trigger, theme, openSearch, placeholder
                } = this;
                // 初始化实例
                this.dOption = DropOption({
                    tag: this.$refs.pDrop,
                    propsData: {
                        parent: this,
                        value,
                        data,
                        minWidth,
                        maxWidth,
                        minHeight,
                        maxHeight,
                        trigger,
                        theme,
                        openSearch,
                        placeholder
                    },
                    param: {
                        parent: this,
                        value: this.value,
                        data: this.data,
                        trigger: this.trigger,
                        theme: this.theme
                    }
                }).$on('change', (id, name) => {
                    this.optionClick(id, name);
                });

                this.dOption.$nextTick(() => {
                    this.setDropdownStatus(true);
                });
            }
        },
        // 通过click打开下拉列表
        dropClick() {
            const { trigger, optionStatus, dropShow } = this;
            if (dropShow) return;
            if (trigger === 'click' && !optionStatus) this.openDrop();
        },
        // 通过hover打开下拉列表
        dropEnter() {
            const { trigger, optionStatus } = this;
            if (trigger === 'hover' && !optionStatus) this.openDrop();
        },
        // 设置下拉状态
        setDropdownStatus(status) {
            this.optionStatus = status;
            if (this.dOption) {
                this.dOption.optionStatus = status;
                if (status) DropOption.resetPosition(this.dOption);
            }
        },
        /**
         * 提交当前选择的值
         * @param id 返回值
         * @param name 返回值name
         */
        optionClick(id, name) {
            this.$emit('input', id);
            this.$emit('change', id, name);
            this.setDropdownStatus(false);
        },
        dropLeave() {
            if (this.trigger === 'hover' && this.dOption) {
                this.dropTimer = setTimeout(this.dOption.dropClose, 300);
            }
        },
        // 监听页面滚动
        listenScroll() {
            this.setDropdownStatus(false);
        }
    },
    beforeDestroy() {
        // 组件销毁前重置状态表
        this.setDropdownStatus(false);
        if (this.dOption) DropOption.remove(this.dOption);
    }
};
</script>

<style lang="stylus">

@import "../static/stylus/animate/selectDownUpExtend.styl"

.p-drop
    display inline-block
    vertical-align middle
    font-size 0
    text-align left
    .p-drop-title
        display flex
        align-items center
        cursor pointer
.p-drop-show
    position relative
    &::after
        content ''
        position absolute
        left 0
        top 0
        z-index 10
        display inline-block
        opacity 0
        width 100%
        height 100%
        cursor pointer
.p-drop-light
    .p-drop-title
        color $grey-900
.p-drop-dark
    .p-drop-title
        color $white

.p-drop-content
    position absolute
    display inline-block
    outline none
    padding-top 8px
    padding-bottom 8px
    border-radius 4px
    box-shadow $box-shadow-bottom
    min-width 180px
    max-width 240px
    z-index 7000
    font-size 0
    overflow hidden
    pointer-events none
.p-drop-content-normal
    min-height 206px
    max-height 320px
.p-drop-content-search
    min-height 246px
    max-height 360px
.p-drop-option
    width 100%
    min-height 190px
    max-height 304px
    overflow-x hidden
    overflow-y auto
    .p-drop-option-item
        padding-left 12px
        padding-right 12px
        width 100%
        height 38px
        font-size 14px
        cursor pointer
        white-space nowrap
        text-overflow ellipsis
        overflow hidden
        transition background-color .3s
        .p-drop-option-svg
            margin-right 8px
            svg
                vertical-align middle
        span
            vertical-align middle
            line-height 38px
            .p-drop-option-svg
                svg
                    path
                        fill $blue-500
        &.p-drop-option-disable
            cursor not-allowed
.p-drop-search
    position relative
    display block
    padding-left 12px
    padding-right 12px
    padding-bottom 8px
    width 100%
    height 40px
    .p-drop-input
        outline none
        padding-left 12px
        padding-right 30px
        border 1px solid $grey-400
        border-radius 4px
        width 100%
        height 100%
        font-size 14px
        color $grey-900
    .p-drop-clear
        position absolute
        right 13px
        top 1px
        width 30px
        height @width
        line-height @width
        text-align center
        cursor pointer
        &:hover
            path
                fill $blue-500
        svg
            width 16px
            height @width
            font-size 0
            vertical-align middle
            path
                transition fill .3s
.p-drop-content-light
    background-color $white
    border 1px solid $grey-300
    .p-drop-option-item
        color $grey-900
        &:hover
            background-color $hover-color-grey
        &.p-drop-option-selected
            color $blue-500
            background-color $blue-100
        &.p-drop-option-disable
            color $grey-400
.p-drop-content-dark
    background-color $blue-900
    border 1px solid $blue-500
    .p-drop-option-item
        color $white
        &:hover
            background-color $blue-800
        &.p-drop-option-selected
            color $blue-50
            background-color $blue-700
        &.p-drop-option-disable
            color $blue-200

</style>
