<template>
    <section ref="popover" class="p-popover">
        <div
            class="p-popover-tag"
            @mouseenter="showPopover"
            @mouseleave="leavePopover"
            @click="clickShowPopover"
        >
            <slot />
        </div>
    </section>
</template>

<script>
import PopoverExtend from './modalPopover';

export default {
    name: 'Popover',
    props: {
        /**
         * 类型可选【base confirm】
         */
        type: {
            type: String,
            default: 'base'
        },
        /**
         * 类型可选【base confirm】
         */
        showConfirmButton: {
            type: Boolean,
            default: true
        },
        /**
         * 类型可选【base confirm】
         */
        removeDom: {
            type: Boolean,
            default: false
        },
        /**
         * popover框title文字
         */
        titleText: {
            type: String,
            default: ''
        },
        /**
         * 确认按钮提示文字
         */
        confirmText: {
            type: String,
            default: '确认'
        },
        /**
         * 取消按钮提示文字
         */
        cancelText: {
            type: String,
            default: '取消'
        },
        /**
         * popover框的对齐位置
         * 默认居中
         * 可选【top-center，top-left，top-right，bottom-left，bottom-center，bottom-right】
         */
        placement: {
            type: String,
            default: 'top-center'
        },

        onRight: {
            type: Boolean,
            default: true
        },
        // 是否可关闭弹窗
        activeClose: {
            type: Boolean,
            default: true
        },
        // 当前组件的id，具有唯一性
        componentId: {
            type: String,
            default: ''
        },
        // 自定义类名
        customClass: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            popoverStatus: false, // popover显示状态
            targetVm: null,
            timer: null
        };
    },
    mounted() {
        window.addEventListener('mousewheel', this.hidePopover, false);
    },
    beforeDestroy() {
        if (this.targetVm) PopoverExtend.remove(this.targetVm);
        window.removeEventListener('mousewheel', this.hidePopover);
    },
    watch: {
        activeClose(n) {
            if (this.targetVm) {
                this.targetVm.activeClose = n;
                // 改变popover的tabindex值
                // this.targetVm.changeTabindex(n ? -1 : null);
            }
        },
        popoverStatus(newVal, oldVal) {
            if (newVal) {
                if (this.targetVm) {
                    this.targetVm.selfVm = PopoverExtend;
                    this.targetVm.popoverStatus = true;
                } else {
                    this.targetVm = PopoverExtend({
                        tag: this.$el,
                        params: {
                            triggerDom: this.$el,
                            type: this.type,
                            showConfirmButton: this.showConfirmButton,
                            titleText: this.titleText,
                            confirmText: this.confirmText,
                            cancelText: this.cancelText,
                            placement: this.placement,
                            slot: this.$slots,
                            closePanel: false,
                            onRight: this.onRight,
                            activeClose: this.activeClose,
                            componentId: this.componentId,
                            removeDom: this.removeDom,
                            customClass: this.customClass
                        }
                    }).$on('cancelEvent', (data) => {
                        this.$emit('cancelEvent', data);
                        this.popoverStatus = false;
                    }).$on('confirmEvent', (data) => {
                        this.$emit('confirmEvent', data);
                        this.popoverStatus = false;
                    }).$on('popoverEnter', (data) => {
                        if (this.type === 'base') {
                            clearTimeout(this.timer);
                        }
                    })
                        .$on('popoverLeave', (data) => {
                            if (this.type === 'base') {
                                this.timer = setTimeout(() => {
                                    this.hidePopover();
                                }, 1000);
                            }
                        });
                    this.targetVm.$nextTick(() => {
                        this.targetVm.selfVm = PopoverExtend;
                        this.targetVm.popoverStatus = true;
                    });
                }
            } else {
                if (this.targetVm) {
                    this.targetVm.popoverStatus = false;
                    if (!this.removeDom) return;
                    setTimeout(() => {
                        PopoverExtend.remove(this.targetVm);
                        this.targetVm = null;
                    }, 300);
                }
            }
        }
    },
    methods: {
        hidePopover() {
            this.popoverStatus = false;
        },
        // 点击显示popover
        clickShowPopover() {
            if (this.type === 'base') return false;
            // this.popoverStatus = true;
            if (this.timer) clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.popoverStatus = true;
            }, 200);
        },
        // 触发器hover显示popover
        showPopover() {
            if (this.type === 'confirm') return false;
            if (this.popoverStatus) {
                clearTimeout(this.timer);
            } else {
                this.popoverStatus = true;
            }
        },
        // 离开触发器
        leavePopover() {
            if (this.type === 'confirm') return false;
            this.timer = setTimeout(() => {
                this.hidePopover();
            }, 200);
        }
    }
};
</script>

<style lang="stylus">
.p-popover
    display: inline-block
    vertical-align middle
    font-size 0

</style>
