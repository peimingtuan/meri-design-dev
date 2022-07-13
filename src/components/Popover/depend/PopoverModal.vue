<template>
    <transition :name="position === 'bottom' ? 'selectDownUpExtend' : 'selectDownUpExtendTop'">
        <div
                :class="['p-popover-wrap', `p-popover-wrap-${placement}`, customClass]"
                ref="popoverWrap"
                @mouseleave="popoverLeave"
                @mouseenter="popoverEnter"
                v-show="popoverStatus"
                @wheel.stop
        >
            <div :id="componentId" class="p-popover-content">
                <div v-if="titleText !== ''" class="p-popover-title">{{titleText}}</div>
                <div :class="['p-popover-arrow', `p-popover-arrow-${placement}`]"></div>
                <slot name="content" />
            </div>
            <div
                    :class="['p-popover-button', !onRight&&'p-popover-bottom-form']"
                    v-if="type === 'confirm' && showConfirmButton"
            >
                <Button
                        type="default"
                        v-if="onRight"
                        @click.native="cancelEvent"
                        size="small"
                >{{cancelText}}</Button>
                <Button type="primary" @click.native="confirmEvent" size="small">{{confirmText}}</Button>
                <Button
                        type="default"
                        v-if="!onRight"
                        @click.native="cancelEvent"
                        size="small"
                >{{cancelText}}</Button>
            </div>
        </div>
    </transition>
</template>
<script>
import Button from '../../Button';
import ClickOutside from '../../static/utils/ClickOutside';

export default {
    name: 'PopoverModal',
    components: { Button },
    data() {
        return {
            popoverStatus: false
        };
    },
    watch: {
        popoverStatus(n, o) {
            if (n) {
                this.$nextTick(() => {
                    this.selfVm.renderPosition(this);
                    setTimeout(() => {
                        window.addEventListener('click', this.clickOutside, true);
                        this.$once('hook:beforeDestroy', () => {
                            window.removeEventListener('click', this.clickOutside);
                        });
                    }, 300);
                });
            } else {
                window.removeEventListener('click', this.clickOutside);
            }
        }
    },
    computed: {
        position() {
            return this.placement.split('-')[0];
        }
    },
    mounted() {
        this.$slots = this.$data.slot;
    },
    methods: {
        clickOutside(e) {
            if (this.timer) clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                ClickOutside(e, this.$el, () => {
                    this.$emit('cancelEvent', false);
                });
            }, 200);
        },
        hidePopover() {
            if (this.type === 'base' || (this.type === 'confirm' && this.close)) {
                this.$emit('cancelEvent', false);
            }
        },
        popoverEnter() {
            this.close = false;
            if (this.popoverStatus) {
                this.$emit('popoverEnter', true);
            }
        },
        popoverLeave() {
            this.close = true;
            this.$emit('popoverLeave', true);
        },
        // 取消按钮点击
        cancelEvent(e) {
            this.$emit('cancelEvent', false);
        },
        // 确定按钮点击
        confirmEvent(e) {
            this.$emit('confirmEvent', true);
        }
    }
};
</script>
<style lang="stylus">
    @import "../../static/stylus/animate/selectDownUpExtend.styl"
    $bottomShadowPopover = $box-shadow-bottom
    $bottomBorderPopover = transparent $theme $theme transparent
    .p-popover-wrap
        position: absolute
        background: $theme
        box-shadow: $box-shadow-bottom
        padding: 20px 24px
        border-radius: 4px
        transition-property: top,bottom,opacity
        transition-duration: 0.3s
        z-index: 6001
        outline none
        &::after
            content: ''
            position: absolute
            bottom: -15px
            left: 0
            display: inline-block
            width: 100%
            height: 14px
            z-index: -1
        &::before
            content: ''
            position: absolute
            top: -15px
            left: 0
            display: inline-block
            width: 100%
            height: 14px
            z-index: -1
        .p-popover-content
            width: auto
            min-width: 230px
            max-width: 370px
            max-height: 394px
            overflow-y: auto
            overflow-x: hidden
            color: $grey-600
            font-size: 14px
            line-height: 22px
            .p-popover-title
                display: inline-block
                margin-bottom: 4px
                font-size: 16px
                font-weight: 600
                color: $grey-900
                line-height: 24px
            .p-popover-arrow
                position: absolute
                width: 8px
                height: @width
                box-shadow: -2px -2px 5px rgba(31,35,41,0.1)
                border-color: $theme transparent transparent $theme
                border-width: 4px
                background: $theme
                transform: rotate(45deg)
            .p-popover-arrow-bottom-center
                left: 50%
                top: -4px
            .p-popover-arrow-bottom-left
                left: 13%
                top: -4px
            .p-popover-arrow-bottom-right
                right: 13%
                top: -4px
            .p-popover-arrow-top-center
                left: 50%
                bottom: -4px
                box-shadow: $bottomShadowPopover
                border-color: $bottomBorderPopover
            .p-popover-arrow-top-left
                left: 13%
                bottom: -4px
                box-shadow: $bottomShadowPopover
                border-color: $bottomBorderPopover
            .p-popover-arrow-top-right
                right: 13%
                bottom: -4px
                box-shadow: $bottomShadowPopover
                border-color: $bottomBorderPopover
        .p-popover-button
            display: flex
            justify-content: flex-end
            margin-top: 16px
        .p-popover-bottom-form
            justify-content: flex-start
</style>
