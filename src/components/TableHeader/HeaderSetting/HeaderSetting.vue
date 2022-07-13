<template>
    <transition :name="position?'selectDownUpExtendTop':'selectDownUpExtend'">
        <div v-show="settingStatus" class="p-header-setting" ref="headerSetting">
            <div class="p-header-setting-content"
                 ref="settingContent"
                 @dragstart="onDragStart"
                 @dragover="onDragOver"
                 @dragend="onDragEnd"
            >
                <template v-for="(h, hi) in currentData">
                    <section :class="[
                            'p-header-setting-item',
                            draggable&&'p-header-setting-item-draggable',
                            h.disabled?'p-header-setting-disabled':'p-header-setting-normal'
                        ]"
                        :key="`set-${h.key}-${hi}`"
                        :data-disabled="h.disabled&&'disabled'"
                        :data-key="h.key"
                        :draggable="draggable"
                    >
                        <article class="p-header-setting-checkbox">
                            <span class="p-header-setting-shit">
                                <DragSortSvg v-if="draggable" />
                            </span>
                            <Checkbox :checked="h.checked" :disabled="h.disabled" :data-index="hi" @change="checkboxChange" />
                        </article>
                        <article class="p-header-setting-words">
                            <span class="p-header-setting-text">{{h.text}}</span>
                        </article>
                    </section>
                </template>
            </div>
            <div :class="['p-header-setting-handle', (currentData && currentData.length > 7)&&'p-header-setting-handle-shadow']">
                <section class="p-header-setting-default" @click="recoverDefault">重置</section>
                <section class="p-header-setting-btn">
                    <Button type="default" size="small" @click="cancel">取消</Button>
                    <Button type="primary" size="small" @click="confirm">确定</Button>
                </section>
            </div>
        </div>
    </transition>
</template>

<script>
import DragSortSvg from '../../static/iconSvg/drag_sort.svg';

import Checkbox from '../../Checkbox/Checkbox';
import Button from '../../Button/Button';
import CloneDeep from '../../static/utils/CloneDeep';
import Message from '../../Message';

export default {
    name: 'HeaderSetting',
    components: { DragSortSvg, Checkbox, Button },
    props: {
        // 数据
        data: {
            type: Array,
            default: () => []
        },
        initData: {
            type: Array,
            default: () => []
        },
        // 显示状态
        parent: {
            type: Object,
            default: () => {}
        },
        // 设置可拖动排序
        draggable: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            position: false, // 弹出方向 - true向上弹窗
            settingStatus: false, // 显示状态
            historyData: [], // 保存的历史数据
            currentData: [], // 当前使用的数据
            dragging: null // 被拖拽的对象
        };
    },
    watch: {
        data: {
            handler(n = [], o = []) {
                const nData = JSON.parse(JSON.stringify(n)),
                    oData = JSON.parse(JSON.stringify(o));
                if (nData === oData) return;
                this.historyData = CloneDeep(n);
                this.currentData = CloneDeep(n);
            },
            immediate: true
        }
    },
    mounted() {
        window.addEventListener('click', this.clickOutSide, true);
        window.addEventListener('blur', this.cancel, false);
        this.$once(() => {
            window.removeEventListener('click', this.clickOutSide, true);
            window.removeEventListener('blur', this.cancel, false);
        });
    },
    methods: {
        clickOutSide(e) {
            if (this.$el.contains(e.target)) return;
            this.cancel();
        },
        // checkbox状态改变
        checkboxChange(status, obj) {
            const { currentData } = this,
                { index } = obj,
                that = this;
            const strategy = {
                checked() {
                    currentData[index].checked = status;
                },
                uncheck() {
                    const fData = currentData.filter(d => d.checked === 'checked');
                    if (fData && fData.length === 1) {
                        // eslint-disable-next-line no-underscore-dangle
                        if (that.msgInfo && !that.msgInfo._isDestroyed) {
                            Message.changeMessage(that.msgInfo, '至少应选择一项');
                        } else {
                            that.msgInfo = Message({
                                type: 'info',
                                message: '至少应选择一项'
                            });
                        }
                        currentData[index].checked = 'checked';
                    } else {
                        currentData[index].checked = status;
                    }
                }
            };
            strategy[status]();
        },

        /* 拖拽 - s */
        onDragStart(e) {
            const { target } = e;
            const { nodeName, dataset: { disabled } } = target;
            if (nodeName !== 'SECTION' || disabled === 'disabled') return;
            e.dataTransfer.dropEffect = 'move';
            target.className += ' p-header-setting-item-hover';
            this.dragging = target;
        },
        onDragOver(e) {
            e.preventDefault();
            const { dragging } = this;
            if (!dragging) return;
            const { target } = e,
                { dataset: { disabled = '' }, nodeName } = target;
            if (disabled || nodeName !== 'SECTION' || target === dragging) return;
            // e.dataTransfer.dropEffect = 'move';
            const { top: targetTop } = target.getBoundingClientRect(),
                { top: draggingTop } = dragging.getBoundingClientRect();

            if (target && target.animated) return;

            if (this.getIndex(dragging) < this.getIndex(target)) target.parentNode.insertBefore(dragging, target.nextSibling);
            else target.parentNode.insertBefore(dragging, target);

            this.setAnimate(targetTop, target);
            this.setAnimate(draggingTop, dragging);
        },
        onDragEnd() {
            const { dragging } = this;
            if (!dragging) return;
            const { currentData } = this,
                currentNodes = Array.from(this.$refs.settingContent.childNodes),
                arr = currentNodes.map(d => currentData.find(d2 => (d2.key === d.dataset.key)));
            dragging.className = dragging.className.replace(' p-header-setting-item-hover', '');
            this.dragging = null;
            this.currentData = arr;
        },
        getIndex(el) {
            const domData = Array.from(this.$refs.settingContent.childNodes);
            return domData.findIndex(d => d.innerText === el.innerText);
        },
        // 设置动画
        setAnimate(startPos, dom) {
            const offset = startPos - dom.getBoundingClientRect().top;
            dom.style.transition = 'none';
            dom.style.transform = `translateY(${offset}px)`;
            // 触发重绘
            const ow = dom.offsetWidth;
            dom.style.transition = 'transform .3s';
            dom.style.transform = '';

            clearTimeout(dom.animated);

            dom.animated = setTimeout(() => {
                dom.style.transition = '';
                dom.style.transform = '';
                dom.animated = false;
            }, 300);
        },
        /* 拖拽 - e */

        // 恢复默认
        recoverDefault() {
            const { initData } = this;
            this.currentData = CloneDeep(initData);
            this.$emit('settingReset', 'reset');
        },
        // 取消按钮
        cancel() {
            this.$emit('changeSettingStatus', false);
            this.settingStatus = false;
            setTimeout(() => {
                this.currentData = CloneDeep(this.historyData);
            }, 300);
            this.$emit('settingCancel', 'cancel');
        },
        // 确定按钮
        confirm() {
            this.$emit('changeSettingStatus', false);
            this.settingStatus = false;
            const { currentData } = this;
            this.historyData = CloneDeep(currentData);
            const checkedData = currentData.filter(d => d.checked === 'checked');
            this.$emit('checkedHandle', checkedData, currentData, 'confirm');
        }
    }
};
</script>

<style lang="stylus">
@import "../../static/stylus/animate/selectDownUpExtend.styl"

.p-header-setting
    position absolute
    z-index 12
    background-color $theme
    border 1px solid $grey-200
    border-radius 4px
    box-shadow $box-shadow-bottom
    width 240px
    //line-height normal
    font-size 0
    outline none
    &:hover
        .p-header-setting-content
            overflow-y auto
.p-header-setting-content
    position relative
    padding-top 8px
    padding-bottom 8px
    border-bottom 1px solid $grey-200
    max-height 412px
    overflow hidden
.p-header-setting-item
    position relative
    display flex
    align-items center
    padding-left 8px
    padding-right 6px
    height 38px
    transition box-shadow .3s, background-color .3s
    &::before
        position absolute
        left 0
        top 0
        content ''
        background-color transparent
        width 100%
        height 2px
        transition background-color .3s
.p-header-setting-item-draggable
    cursor pointer
.p-header-setting-item-hover
    box-shadow $box-shadow-bottom
    cursor move
    &::before
        background-color $blue-500
.p-header-setting-normal
    &:hover
        background-color $hover-color-grey
        .p-header-setting-shit
            opacity 1
            pointer-events auto
.p-header-setting-disabled
    cursor not-allowed
    .p-header-setting-words
        .p-header-setting-text
            color $grey-400
        .p-header-setting-shit
            display none

.p-header-setting-checkbox
    position relative
    width 32px
.p-header-setting-shit
    position relative
    display inline-block
    width 16px
    height 16px
    opacity 0
    vertical-align middle
    pointer-events none
    transition opacity .3s
    &::after
        position absolute
        left 0
        top 0
        background none
        opacity 0
        content ''
        width 100%
        height 100%
    &:hover
        svg
            g
                fill $blue-500
    svg
        width 16px
        height @width
        g
            transition fill .3s
.p-header-setting-words
    flex 1
    display flex
    align-items center
    justify-content space-between
    padding-left 8px
    line-height 1
    white-space nowrap
    text-overflow ellipsis
    overflow hidden
    .p-header-setting-text
        color $grey-900
        font-size 14px
        user-select none

.p-header-setting-handle
    display flex
    align-items center
    justify-content space-between
    padding 20px 16px 20px 24px
.p-header-setting-handle-shadow
    box-shadow $box-shadow-top
.p-header-setting-default
    color $grey-600
    font-size 14px
    cursor pointer
    transition color .3s
    &:hover
        color $blue-500
    &:active
        color $blue-600

</style>
