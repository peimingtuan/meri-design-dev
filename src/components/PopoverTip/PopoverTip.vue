<template>
    <transition :name="position?'selectDownUpExtend':'selectDownUpExtendTop'">
        <div v-show="show"
             :class="[
                 'p-popover-tip',
                 split ? 'p-popover-tip-split' : 'p-popover-tip-words',
                 position?'p-popover-tip-bottom':'p-popover-tip-top'
             ]"
             @wheel.stop
             @mouseenter="popoverTipHandle('enter')"
             @mouseleave="popoverTipHandle('leave')"
        >
            <section class="p-popover-tip-content" @mouseenter="contentEnter">
                <template v-if="split">
                    <article :class="['p-popover-tip-content-item', item.scroll && 'p-popover-tip-content-item-before']"
                             v-for="item in contentArr" :key="item.id"
                    >
                        <span class="p-popover-tip-item-text" :style="item.scroll&& {transform: `translateX(${-item.scroll}px)`}">{{item.text}}</span>
                    </article>
                </template>
                <template v-else>
                    <article class="p-popover-tip-content-words">{{content}}</article>
                </template>
            </section>
            <section class="p-popover-tip-triangle"/>
        </div>
    </transition>
</template>

<script>
import IsIE from '../static/utils/IsIE';

export default {
    name: 'PopoverTip',
    props: {
        parent: {
            type: Object,
            default: () => ({})
        },
        // 是否显示
        show: {
            type: Boolean,
            default: false
        },
        // 内容
        content: {
            type: String,
            default: ''
        },
        // 提示信息位置
        position: {
            type: Boolean,
            default: true
        },
        // 是否通过拆分渲染内容
        split: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        contentArr() {
            return this.content.split('、').map((d, i) => ({ id: `content-${i}`, text: d, scroll: d.length > 32 ? this.getScrollWidth(d) : 0 }));
        }
    },
    methods: {
        // 计算被遮挡的宽度
        getScrollWidth(text) {
            const maxWidth = 452,
                div = document.createElement('div');
            div.innerText = text;
            div.style.position = 'absolute';
            div.style.left = '0';
            div.style.bottom = '0';
            div.style.zIndex = '-100';
            div.style.display = 'inline-block';
            div.style.height = '0';
            div.style.opacity = '0';
            div.style.overflow = 'hidden';
            div.style.whiteSpace = 'nowrap';
            div.style.fontSize = '14px';
            document.body.appendChild(div);
            const { scrollWidth } = div;
            if (IsIE()) div.removeNode(true);
            else div.remove();
            return scrollWidth > maxWidth ? (scrollWidth - maxWidth) : 0;
        },
        // 出发鼠标事件
        popoverTipHandle(str) {
            this.$emit('tipHandle', str);
        },
        contentEnter() {
            if (this.split) return;
            this.show = false;
        }
    }
};
</script>

<style lang="stylus">
@import "../static/stylus/animate/selectDownUpExtend.styl"

.p-popover-tip
    position absolute
    display inline-block
    padding-top 8px
    border-radius 4px
    max-width 480px
    z-index 7000
    font-size 0
    .p-popover-tip-triangle
        position absolute
        left 50%
        border-style solid
        width 0
        height 0
.p-popover-tip-split
    background-color $theme
    &.p-popover-tip-top
        .p-popover-tip-triangle
            border-color $theme transparent transparent transparent
    &.p-popover-tip-bottom
        .p-popover-tip-triangle
            border-color transparent transparent $theme transparent
.p-popover-tip-words
    background-color $popover-tip-bg
    &.p-popover-tip-top
        .p-popover-tip-triangle
            border-color $popover-tip-bg transparent transparent transparent
    &.p-popover-tip-bottom
        .p-popover-tip-triangle
            border-color transparent transparent $popover-tip-bg transparent

.p-popover-tip-top
    filter drop-shadow($box-shadow-triangle-bottom)
    .p-popover-tip-triangle
        bottom -6px
        border-width 6px 6px 0 6px
.p-popover-tip-bottom
    filter drop-shadow($box-shadow-triangle-top)
    .p-popover-tip-triangle
        top -6px
        border-width 0 6px 6px 6px

.p-popover-tip-content
    display flex
    flex-wrap wrap
    padding-left 4px
    padding-right 8px
    max-width 480px
    max-height 184px
    overflow-x hidden
    overflow-y auto
    .p-popover-tip-content-item
        margin-left 4px
        margin-bottom 8px
        padding-left 4px
        padding-right @padding-left
        background-color $grey-100
        border-radius 2px
        max-width 100%
        overflow hidden
        white-space nowrap
        .p-popover-tip-item-text
            display inline-block
            width 100%
            line-height 24px
            color $grey-900
            font-size 14px
    .p-popover-tip-content-item-before
        position relative
        &::before
            position absolute
            top 0
            left 0
            display inline-block
            background-color $grey-100
            border-radius 2px
            width 20px
            height 24px
            content '...'
            color $grey-900
            font-size 14px
            text-align center
            z-index 1

.p-popover-tip-content-words
    display inline-block
    padding-left 4px
    padding-bottom 8px
    width 100%
    line-height 24px
    color $theme
    font-size 14px

</style>
