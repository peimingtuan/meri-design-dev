<template>
    <div :class="['p-drop-frame', `p-drop-frame-${theme}`, dropShow&&'p-drop-frame-show']"
         ref="groupFrame"
         @mouseenter="groupEnter" @mouseleave="groupLeave"
         @click="groupClick"
        >
        <section class="p-drop-frame-title">
            <article class="p-drop-frame-title-content">{{ selectedText }}</article>
            <article :class="['p-drop-frame-triangle', !optionStatus && 'p-drop-frame-triangle-rotate']"><Triangle /></article>
        </section>
    </div>
</template>

<script>
import Triangle from '../static/iconSvg/triangle.svg';
import GroupOption from './depend/groupOption';

export default {
    name: 'DropGroupFrame',
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
        },
        // 分割线
        divider: {
            type: Boolean,
            default: false
        },
        // 搜索
        search: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: '搜索'
        }
    },
    data() {
        return {
            // 下拉菜单状态
            optionStatus: false,
            // 下拉弹窗显示
            dropShow: false,
            selectedId: '',
            selectedText: ''
        };
    },
    watch: {
        value: {
            handler(n, o) {
                if (n === o) return;
                if (n) {
                    this.selectedId = n;
                    if (this.gOption) this.gOption.selectedId = n;
                    this.setInit(this.data, n);
                }
            },
            immediate: true
        },
        data: {
            handler(n) {
                if (this.gOption) this.dOption.data = n;
                this.setInit(n, this.value);
            },
            deep: true,
            immediate: true
        },
        optionStatus(n, o) {
            if (n === o) return;
            if (n) this.dropShow = true;
            else setTimeout(() => { this.dropShow = false; }, 300);
        }
    },
    methods: {
        setInit(data, value) {
            if (!data || !data.length) return;
            if (value) {
                data.forEach(d => {
                    const { children } = d;
                    if (d.id === value) {
                        this.selectedText = d.name;
                    } else {
                        if (children && children.length) {
                            children.forEach(d2 => {
                                if (d2.id === value) {
                                    this.selectedText = d2.name;
                                }
                            });
                        }
                    }
                });
            } else {
                const { id, name } = data?.[0];
                if (id === value) {
                    this.selectedId = id;
                    this.selectedText = name;
                    this.$emit('change', { id, name });
                } else {
                    this.selectedId = '';
                    this.selectedText = '';
                }
            }
        },
        // 打开下拉列表
        openDrop() {
            if (this.gOption) {
                this.setDropdownStatus(true);
            } else {
                const {
                    selectedId, data, theme, trigger, divider, search, placeholder
                } = this;
                // 初始化实例
                this.gOption = GroupOption({
                    tag: this.$refs.groupFrame,
                    propsData: {
                        parent: this,
                        selectedId,
                        data,
                        theme,
                        trigger,
                        divider,
                        search,
                        placeholder
                    }
                }).$on('change', (obj) => {
                    const { id, name } = obj;
                    this.selectedId = id;
                    this.selectedText = name;
                    this.optionClick(obj);
                    this.gOption.selectedId = id;
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

.p-drop-frame
    display inline-block
    vertical-align middle
    font-size 0
    text-align left
.p-drop-frame-title
    display flex
    align-items center
    padding-left 8px
    padding-right 8px
    height 28px
    cursor pointer
    transition background-color.3s
.p-drop-frame-title-content
    font-size 14px
.p-drop-frame-triangle
    width 16px
    height 16px
    line-height 1
    svg
        transition transform .3s
.p-drop-frame-triangle-rotate
    svg
        transform rotate(180deg)
.p-drop-frame-show
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
    .p-drop-frame-title
        background-color $grey-200
        border-radius 4px
.p-drop-frame-light
    .p-drop-frame-title-content
        color $grey-900
.p-drop-frame-dark
    .p-drop-frame-title-content
        color $white
    .p-drop-frame-triangle
        svg
            path
                fill $blue-500

.p-drop-frame-box
    position absolute
    top 100%
    outline none
    padding-top 8px
    padding-bottom 8px
    border-radius 4px
    box-shadow $box-shadow-bottom
    min-width 120px
    width 262px
    height 312px
    overflow-y auto
    z-index 7000
    pointer-events none
.p-drop-frame-search
    display inline-flex
    align-items center
    margin-left 12px
    margin-bottom 12px
    border 1px solid $grey-300
    border-radius 4px
    width calc(100% - 24px)
    height 32px
    overflow hidden
    //.p-drop-frame-search-svg
    .p-drop-frame-svg
        width 30px
        height @width
        line-height @width
        text-align center
        font-size 0
        svg
            width 16px
            height @width
            vertical-align middle
    .p-drop-frame-close-svg
        cursor pointer
        &:hover
            svg
                path
                    fill $blue-500
    input
        outline none
        border 0
        width calc(100% - 60px)
        height 30px
        font-size 14px
        color $grey-900
.p-drop-frame-item-title
    margin-bottom 8px
    padding-left 12px
    padding-right 12px
    height 38px
    line-height @height
    font-size 14px
    white-space nowrap
    text-overflow ellipsis
    overflow hidden
    color $grey-900
.p-drop-frame-option
    padding-left 20px
    padding-right 12px
    width 100%
    height 44px
    line-height @height
    font-size 14px
    cursor pointer
    white-space nowrap
    text-overflow ellipsis
    overflow hidden
    &.p-drop-frame-option-disable
        cursor not-allowed
.p-drop-option-left
    left 0
.p-drop-option-right
    right 0
.p-drop-frame-box-divider
    .p-drop-frame-item-title
        margin-left 12px
        margin-right 12px
        border-bottom 1px solid $grey-300
        color $grey-500

.p-drop-frame-box-light
    background-color $theme
    border 1px solid $grey-300
.p-drop-frame-option
    color $grey-900
    transition background-color .3s
    &:hover
        background-color $hover-color-grey
    &.p-drop-frame-option-selected
        color $blue-500
        background-color $blue-100
    &.p-drop-frame-option-disable
        color $grey-400
    .p-drop-frame-box-dark
        background-color $blue-900
        border 1px solid $blue-500
    .p-drop-frame-item-title
        color $white
    .p-drop-frame-option
        color $white
        &:hover
            background-color $blue-800
        &.p-drop-frame-option-selected
            color $blue-50
            background-color $blue-700
        &.p-drop-frame-option-disable
            color $blue-200
.p-drop-frame-option-text-highlight
    color $blue-500
    font-size 14px
.p-drop-frame-item-title-can
    transition background-color .3s
    cursor pointer
    &:hover
        background-color $hover-color-grey
.p-drop-frame-item-title-selected
    color $blue-500
    background-color $blue-100

</style>
