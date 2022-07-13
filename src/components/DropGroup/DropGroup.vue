<template>
    <div :class="['p-drop-group', `p-drop-group-${theme}`, dropShow&&'p-drop-group-show']"
         ref="pDropGroup"
         @mouseenter="groupEnter" @mouseleave="groupLeave"
         @click="groupClick"
        >
        <section class="p-drop-group-title">
            <article class="p-drop-group-title-content">
                <!-- @slot html内容 -->
                <slot />
            </article>
            <article :class="['p-drop-group-triangle', !optionStatus && 'p-drop-group-triangle-rotate']"><Triangle /></article>
        </section>
    </div>
</template>

<script>
import Triangle from '../static/iconSvg/triangle.svg';
import GroupOption from './depend/groupOption';

export default {
    name: 'DropGroup',
    components: { Triangle },
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
        }
    },
    data() {
        return {
            // 下拉菜单状态
            optionStatus: false,
            // 下拉弹窗显示
            dropShow: false
        };
    },
    watch: {
        value(n, o) {
            if (n === o) return;
            if (this.gOption) this.gOption.value = n;
        },
        data(n, o) {
            if (n === o) return;
            if (this.gOption) this.dOption.data = n;
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
            if (this.gOption) {
                this.setDropdownStatus(true);
            } else {
                const {
                    value, data, theme, trigger
                } = this;
                // 初始化实例
                this.gOption = GroupOption({
                    tag: this.$refs.pDropGroup,
                    propsData: {
                        parent: this,
                        value,
                        data,
                        theme,
                        trigger
                    }
                }).$on('change', (obj) => {
                    this.optionClick(obj);
                });

                this.gOption.$nextTick(() => {
                    this.setDropdownStatus(true);
                });
            }
        },
        groupEnter() {
            const { trigger, optionStatus } = this;
            if (trigger === 'hover' && !optionStatus) this.openDrop();
        },
        // 通过click打开下拉列表
        groupClick() {
            const { trigger, optionStatus, dropShow } = this;
            if (dropShow) return;
            if (trigger === 'click' && !optionStatus) this.openDrop();
        },
        // 设置下拉状态
        setDropdownStatus(status) {
            this.optionStatus = status;
            if (this.gOption) {
                if (status) GroupOption.resetPosition(this.gOption);
                this.gOption.optionStatus = status;
            }
        },
        /**
         * 提交当前选择的值
         * @param obj
         *        pId parentId
         *        cId childId
         *        cName childName
         */
        optionClick(obj) {
            this.$emit('change', obj);
            this.setDropdownStatus(false);
        },
        groupLeave() {
            const { trigger } = this;
            if (trigger === 'hover' && this.gOption) {
                this.timer = setTimeout(this.gOption.dropOptionBlur, 300);
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
        if (this.gOption) GroupOption.remove(this.gOption);
    }
};
</script>

<style lang="stylus">
@import "../static/stylus/animate/selectDownUpExtend.styl"

.p-drop-group
    display inline-block
    vertical-align middle
    font-size 0
    text-align left
.p-drop-group-title
    display flex
    align-items center
    cursor pointer
.p-drop-group-title-content
    font-size 14px
.p-drop-group-triangle
    width 16px
    height 16px
    line-height 1
    svg
        transition transform .3s
.p-drop-group-triangle-rotate
    svg
        transform rotate(180deg)
.p-drop-group-show
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
.p-drop-group-light
    .p-drop-group-title-content
        color $grey-900
.p-drop-group-dark
    .p-drop-group-title-content
        color $white
    .p-drop-group-triangle
        svg
            path
                fill $blue-500

.p-drop-group-box
    position absolute
    top 100%
    outline none
    padding-top 8px
    padding-bottom 8px
    border-radius 4px
    box-shadow $box-shadow-bottom
    min-width 120px
    max-width 240px
    max-height 246px
    overflow-y auto
    z-index 7000
    pointer-events none
    .p-drop-item-title
        padding-left 12px
        padding-right 12px
        height 38px
        line-height @height
        font-size 14px
        white-space nowrap
        text-overflow ellipsis
        overflow hidden
    .p-drop-group-option
        padding-left 20px
        padding-right 12px
        width 100%
        height 38px
        line-height 38px
        font-size 14px
        cursor pointer
        white-space nowrap
        text-overflow ellipsis
        overflow hidden
        &.p-drop-group-option-disable
            cursor not-allowed
    .p-drop-option-left
        left 0
    .p-drop-option-right
        right 0
.p-drop-group-box-light
    background-color $theme
    border 1px solid $grey-300
    .p-drop-item-title
        color $grey-500
    .p-drop-group-option
        color $grey-900
        &:hover
            background-color $hover-color-grey
        &.p-drop-group-option-selected
            color $blue-500
            background-color $blue-100
        &.p-drop-group-option-disable
            color $grey-400
.p-drop-group-box-dark
    background-color $blue-900
    border 1px solid $blue-500
    .p-drop-item-title
        color $white
    .p-drop-group-option
        color $white
        &:hover
            background-color $blue-800
        &.p-drop-group-option-selected
            color $blue-50
            background-color $blue-700
        &.p-drop-group-option-disable
            color $blue-200

</style>
