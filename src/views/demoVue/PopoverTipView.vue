<template>
    <div>
         <h3 class="components-title-h3">1.完整示例</h3>
        <br>
        <div class="popoverTipView">
            <div
                    class="tip-test"
                    ref="refTrigger"
                    @mouseenter="popoverTipEnter"
                    @mouseleave="mouseLeave"
            >
                <template v-if="popoverTipContent">已选择<span ref="countTag">12</span>项</template>
            </div>
        </div>
        <br><br>
        <Button type="default" @click="clearTip">清除popoverTipContent</Button>
        <Button type="default" @click="setTip">设置popoverTipContent</Button>

        <br><br><br>
         <h3 class="components-title-h3">2.简易示例</h3>
        <div class="popoverTipView">
            <div
                    class="tip-test"
                    ref="refTrigger2"
                    @mouseenter="popoverTipEnter2"
                    @mouseleave="mouseLeave2"
            >
                <template v-if="popoverTipContent2">已选择<span ref="countTag2">3</span>项</template>
            </div>
        </div>
        <br>
    </div>
</template>

<script>
import PopoverTip from '../../components/PopoverTip';

export default {
    name: 'PopoverTipView',
    data() {
        return {
            // popoverTipContent: '顶级顶级、一级1一级1一级1一级1一级1一级啊、测试文字溢出、测试文字溢出、鼎折覆餗、水电费、第三方、第三方十多个、的施工队施工、速度赶到事故、的施工队施工、的施工队施工、的施工队施工、的施工队施工、的施工队施工、但是广东省、但是广东省'
            popoverTipContent: '顶级顶级、一级',
            popoverTipContent2: '四川、成都、高新区'
        };
    },
    methods: {
        popoverTipEnter() {
            const { popoverTipContent } = this;
            if (!popoverTipContent) return;
            if (this.popoverTip) {
                if (this.timer) this.clearTimer();
                else {
                    this.timerEnter = setTimeout(() => {
                        this.popoverTip.content = popoverTipContent;
                        PopoverTip.resetPosition(this.popoverTip);
                        clearTimeout(this.timerEnter);
                        this.timerEnter = null;
                    }, 300);
                }
            } else {
                this.timerEnter = setTimeout(() => {
                    const { $refs: { refTrigger, countTag } } = this;
                    this.popoverTip = PopoverTip({
                        tag: refTrigger, // 触发器
                        countTag, // 数字标签
                        propsData: {
                            content: popoverTipContent
                        }
                    }).$on('tipHandle', str => {
                        // str 值可选范围 enter leave
                        console.log('tipHandle', str);
                        if (str === 'enter') this.clearTimer();
                        else this.setTimer();
                    });

                    this.popoverTip.$nextTick(() => {
                        PopoverTip.resetPosition(this.popoverTip);
                    });
                    clearTimeout(this.timerEnter);
                    this.timerEnter = null;
                }, 300);
            }
        },
        setTimer() {
            this.timer = setTimeout(() => {
                this.popoverTip.show = false;
                this.clearTimer();
            }, 300);
        },
        clearTimer() {
            clearTimeout(this.timer);
            this.timer = null;
        },
        mouseLeave() {
            if (this.timerEnter) {
                clearTimeout(this.timerEnter);
                return;
            }
            if (this.popoverTip) this.setTimer();
        },

        clearTip() {
            this.popoverTipContent = '';
            if (this.popoverTip) {
                PopoverTip.remove(this.popoverTip);
                this.popoverTip = null;
            }
        },
        setTip() {
            this.popoverTipContent = '顶级顶级、测试文字溢出、测试文字溢出、测试文字溢出、测试文字溢出、测试文字溢出';
        },

        popoverTipEnter2() {
            const { popoverTipContent2 } = this;
            if (!popoverTipContent2) return;
            if (this.popoverTip2) {
                this.popoverTip2.content = popoverTipContent2;
                PopoverTip.resetPosition(this.popoverTip2);
            } else {
                const { $refs: { refTrigger2, countTag2 } } = this;
                this.popoverTip2 = PopoverTip({
                    tag: refTrigger2, // 触发器
                    countTag: countTag2, // 数字标签
                    propsData: {
                        split: false,
                        content: popoverTipContent2
                    }
                });

                this.popoverTip2.$nextTick(() => {
                    PopoverTip.resetPosition(this.popoverTip2);
                });
            }
        },
        mouseLeave2() {
            if (this.popoverTip2) this.popoverTip2.show = false;
        }
    },
    beforeDestroy() {
        if (this.popoverTip) PopoverTip.remove(this.popoverTip);
        if (this.popoverTip2) PopoverTip.remove(this.popoverTip2);
    }
};
</script>

<style lang="stylus" scoped>

    .popoverTipView
        padding 10px
    .tip-test
        padding-left 12px
        display inline-block
        border 1px solid $grey-300
        border-radius 4px
        width 180px
        height 32px
        line-height 32px
        font-size 14px
        color $grey-900
        span
            padding-left 4px
            padding-right 4px
            color $blue-500

</style>
