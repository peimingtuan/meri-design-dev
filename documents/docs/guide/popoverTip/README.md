### PopoverTip 提示列表

#### 1.完整示例
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

::: details 查看示例
```vue
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

<script>
export default {
    name: 'PopoverTipView',
    data() {
        return {
            popoverTipContent: '顶级顶级、一级1一级1一级1一级1一级1一级1一级1一级1一级1一级1一级1一级1一级1一级1啊、测试文字溢出、测试文字溢出、测试文字溢出、测试文字溢出、测试文字溢出、测试文字溢出、测试文字溢出、测试文字溢出、水电费第三方、鼎折覆餗、水电费、第三方、第三方十多个、的施工队施工、速度赶到事故、的施工队施工、的施工队施工、的施工队施工、的施工队施工、的施工队施工、但是广东省、但是广东省'
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
                        this.$popoverTip.resetPosition(this.popoverTip);
                        clearTimeout(this.timerEnter);
                        this.timerEnter = null;
                    }, 300);
                }
            } else {
                this.timerEnter = setTimeout(() => {
                    const { $refs: { refTrigger, countTag } } = this;
                    this.popoverTip = this.$popoverTip({
                        tag: refTrigger, // 触发器
                        countTag, // 数字标签
                        propsData: {
                            content: popoverTipContent
                        }
                    }).$on('tipHandle', str => {
                        // str 值可选范围 enter leave
                        if (str === 'enter') this.clearTimer();
                        else this.setTimer();
                    });

                    this.popoverTip.$nextTick(() => {
                        this.$popoverTip.resetPosition(this.popoverTip);
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
        }
    },
    beforeDestroy() {
        if (this.popoverTip) this.$popoverTip.remove(this.popoverTip);
    }
};

</script>

<style lang="stylus" scoped>
    .popoverTipView
        padding 10px
    .tip-test
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

```
:::

#### 2.简易示例 - 根据UX要求，该类只在提示性条件下使用
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

::: details 查看示例
```vue
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

popoverTipContent2: '四川、成都、高新区'

popoverTipEnter2() {
    const { popoverTipContent2 } = this;
    if (!popoverTipContent2) return;
    if (this.popoverTip2) {
        this.popoverTip2.content = popoverTipContent2;
        this.$popoverTip.resetPosition(this.popoverTip2);
    } else {
        const { $refs: { refTrigger2, countTag2 } } = this;
        this.popoverTip2 = this.$popoverTip({
            tag: refTrigger2, // 触发器
            countTag: countTag2, // 数字标签
            propsData: {
                split: false,
                theme: 'dark',
                content: popoverTipContent2
            }
        });

        this.popoverTip2.$nextTick(() => {
            this.$popoverTip.resetPosition(this.popoverTip2);
        });
    }
},
mouseLeave2() {
    if (this.popoverTip2) this.popoverTip2.show = false;
}
```
:::

<script>
export default {
    name: 'PopoverTipView',
    data() {
        return {
            popoverTipContent: '顶级顶级、一级1一级1一级1一级1一级1一级1一级1一级1一级1一级1一级1一级1一级1一级1啊、测试文字溢出、测试文字溢出、测试文字溢出、测试文字溢出、测试文字溢出、测试文字溢出、测试文字溢出、测试文字溢出、水电费第三方、鼎折覆餗、水电费、第三方、第三方十多个、的施工队施工、速度赶到事故、的施工队施工、的施工队施工、的施工队施工、的施工队施工、的施工队施工、但是广东省、但是广东省',
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
                        this.$popoverTip.resetPosition(this.popoverTip);
                        clearTimeout(this.timerEnter);
                        this.timerEnter = null;
                    }, 300);
                }
            } else {
                this.timerEnter = setTimeout(() => {
                    const { $refs: { refTrigger, countTag } } = this;
                    this.popoverTip = this.$popoverTip({
                        tag: refTrigger, // 触发器
                        countTag, // 数字标签
                        propsData: {
                            content: popoverTipContent
                        }
                    }).$on('tipHandle', str => {
                        // str 值可选范围 enter leave
                        if (str === 'enter') this.clearTimer();
                        else this.setTimer();
                    });

                    this.popoverTip.$nextTick(() => {
                        this.$popoverTip.resetPosition(this.popoverTip);
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
        popoverTipEnter2() {
            const { popoverTipContent2 } = this;
            if (!popoverTipContent2) return;
            if (this.popoverTip2) {
                this.popoverTip2.content = popoverTipContent2;
                this.$popoverTip.resetPosition(this.popoverTip2);
            } else {
                const { $refs: { refTrigger2, countTag2 } } = this;
                this.popoverTip2 = this.$popoverTip({
                    tag: refTrigger2, // 触发器
                    countTag: countTag2, // 数字标签
                    propsData: {
                        split: false,
                        theme: 'dark',
                        content: popoverTipContent2
                    }
                });

                this.popoverTip2.$nextTick(() => {
                    this.$popoverTip.resetPosition(this.popoverTip2);
                });
            }
        },
        mouseLeave2() {
            if (this.popoverTip2) this.popoverTip2.show = false;
        }
    },
    beforeDestroy() {
        if (this.popoverTip) this.$popoverTip.remove(this.popoverTip);
        if (this.popoverTip2) this.$popoverTip.remove(this.popoverTip2);
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

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| tag    | 触发器 | ref | '' | yes     |
| countTag    | 数字标签 | ref | '' | yes     |
| content    | tip内容 | String | '' | yes     |
| split    | 是否拆分为 | Boolean | true | no     |
| theme    | 主题色，可选值['light', 'dark'] | String | light | no     |
| @tipHandle    | 鼠标移入tipBox上的回调 | (str) => {} | -- | no     |

::: warning 注意
    1.如果设置split为true，需content字符串用中文顿号‘、’隔开;
    2.组件销毁时需顶用this.$popoverTip.remove(this.popoverTip);
    3.按需加载：
        import { PopoverTip } from 'meri-design-dev';
        PopoverTip({
            tag: 'xxx',
            countTag: 'xxx',
            propsData: {
                content: 'xxx、xxx'
            }
        });
:::
