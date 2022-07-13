<template>
    <div class="p-select-input" ref="refTrigger">
        <div
            :class="[
                'p-select-input-content', triangle&&'p-select-input-content-active', disabled&&'p-select-search-box-disabled',
                 errorShow && 'p-trigger-error'
            ]"
            @mouseenter="setTipStatus(true)"
            @mouseleave="setTipStatus(false)"
        >
            <div class="p-select-input-caption" @click="clickCaption" v-if="caption" ref="captionDom"
                >{{ caption }}</div>
            <section @mouseenter="enterTrigger" @mouseleave="leaveTrigger" class="p-select-input-section"
                     :style="{width: caption&&`calc(100% - ${captionWidth}px)`, paddingLeft: caption && '4px'}">
                <span v-show="fieldStatus"
                      :class="['p-select-input-place',(!triangle && data.length)&&'p-select-input-place-selected']">
                    <span
                        v-show="(
                            data.length !== 0
                            && !inputContent
                            && ((!isAllChoice && isShowAllChoice)
                            || (isAllChoice && !isShowAllChoice)
                            || (!isAllChoice && !isShowAllChoice))
                        )"
                    >已选择<span
                        ref="countTag">{{ data.length }}</span>项</span>
                    <span v-show="isShowAllChoice && isAllChoice && !inputContent">全部</span>
                    <span v-show="!data.length && !inputContent">{{ placeholder }}</span>
                </span>

                <input
                    ref="inputField"
                    class="p-select-input-input"
                    type="text"
                    :readonly='isReadOnly'
                    v-model="inputValue"
                    :disabled="disabled"
                    @click="clickFn"
                    @input="inputContentHandle"
                    @blur="inputBlur"
                />
                <!-- @input="searchInput" -->
                <i class="p-select-icon-svg" v-show="hideClear || !TriggerIn || (!inputValue && !tooltipText)"
                   @click.stop="clickCaption"
                >
                    <TriangleSvg
                        :class="['p-select-input-svg', !triangle&&'p-select-input-rotate']"
                    />
                </i>
                <i class="p-select-icon-svg" v-if="!hideClear" v-show="TriggerIn && (inputValue || tooltipText)"
                   @click.stop="clearChoseData"
                >
                    <DeleteIcon
                        class="p-select-clear-icon"
                    />
                </i>
            </section>
            <span class="p-trigger-error-text"
                  v-if="errorShow"
            >{{errorText}}</span>
        </div>
    </div>
</template>

<script>
import TriangleSvg from '../../static/iconSvg/triangle.svg';
import DeleteIcon from '../../static/iconSvg/delete_icon.svg';
import cloneDeep from '../../static/utils/CloneDeep';
import PopoverTip from '../../PopoverTip';

export default {
    name: 'SelectInput',
    components: {
        TriangleSvg,
        DeleteIcon
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        // 选择内容后的title
        title: {
            type: String,
            default: ''
        },
        // 占位符
        placeholder: {
            type: String,
            default: '请选择'
        },
        // 单位
        unit: {
            type: String,
            default: '个'
        },
        // 选中的数据
        data: {
            type: Array,
            default: () => []
        },
        // 三角形方向
        triangle: {
            type: Boolean,
            default: false
        },
        // 是否可关闭弹窗
        activeClose: {
            type: Boolean,
            default: false
        },
        // 提示框位置
        tipPlace: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        hideClear: {
            type: Boolean,
            default: false
        },
        // 配置显示全选状态
        isShowAllChoice: {
            type: Boolean,
            default: false
        },
        // 是否为全选
        isAllChoice: {
            type: Boolean,
            default: false
        },
        // input框是否为readOnly状态
        isReadOnly: {
            type: Boolean,
            default: false
        },
        // 标题
        caption: {
            type: String,
            default: ''
        },
        // 错误信息提示
        errorText: {
            type: String,
            default: ''
        },
        // 错误信息显示状态
        errorShow: {
            type: Boolean,
            default: false
        }
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    data() {
        return {
            tipHeight: 0, // 文字(高度)是否超出
            // tipStyle: '0-0', // 文字(宽-高度)是否超出
            selectedTipStyle: {
                bottom: 0,
                left: 0
            },
            tipShow: false, // 提示信息显示
            inputValue: '', // 输入框输入的值
            inputContent: '', // 输入框输入的内容
            fieldStatus: true, // 控制占位符是否显示
            TriggerIn: false,
            targetVm: null,
            isReadyOnly: true,
            captionWidth: 0, // 标题占用宽度
            popoverTip: null,
            tooltipText: '',
            timer: null
        };
    },
    computed: {
        curPaddingLeft() {
            let code = 0;
            if (this.caption) {
                code = this.caption.charCodeAt(this.caption.length - 1);
                if (code === 65306) { // 判断是中文的冒号还是英文的冒号 中文 65306 英文 58
                    return 2;
                }
                return 8;
            }
            return 0;
        }
    },
    beforeDestroy() {
        if (this.popoverTip) PopoverTip.remove(this.popoverTip);
    },
    watch: {
        // 监听value改变
        value(n, o) {
            if (n === o) return;
            this.inputValue = n;
        },
        // 监听文字输入
        inputValue(n, o) {
            if (n === o) return;
            this.fieldStatus = !n;
            this.$emit('change', n);
        },

        // 监听弹窗是否关闭
        triangle(n, o = false) {
            if (n === o) return;
            this.triangle = n;
            if (this.popoverTip && n) {
                this.popoverTip.show = false;
            } else {
                setTimeout(() => {
                    this.inputValue = '';
                    this.inputContent = '';
                }, 300);
            }
        },
        // 监听是否可关闭弹窗
        activeClose(n, o) {
            if (n === o) return;
            if (n && this.triangle) this.$refs.inputField.focus();
        },

        // 监听标题值改变
        caption: {
            handler(n, o) {
                if (n === o) return;
                if (n) {
                    this.$nextTick(() => this.getCaptionWidth());
                } else {
                    this.captionWidth = 0;
                }
            },
            immediate: true
        },
        data: {
            handler(n, o) {
                const data = cloneDeep(n);
                const len = data.length - 1;
                let text = '';
                data.forEach((d, i) => {
                    if (i < len) {
                        text += `${d.name}、`;
                    } else {
                        text += d.name;
                    }
                });
                this.tooltipText = text;
            },
            immediate: true
        }
    },
    methods: {
        // 获取标题宽度
        getCaptionWidth() {
            if (!this.caption) return;
            setTimeout(() => {
                const { captionDom } = this.$refs;
                if (!captionDom) return;
                const scrollWidth = captionDom.textContent.length * 14;
                if (scrollWidth < 196) {
                    this.captionWidth = scrollWidth;
                } else {
                    this.captionWidth = 196;
                }
            });
        },
        // 监听输入内容
        inputContentHandle(e) {
            this.inputContent = e.target.value || e.data || '';
        },

        // 鼠标移入触发器事件
        enterTrigger() {
            this.TriggerIn = true;
        },
        // 鼠标移出触发器事件
        leaveTrigger() {
            this.TriggerIn = false;
        },
        // 触发器删除按钮
        clearChoseData() {
            this.$parent.isAllChoice = false;
            if (this.popoverTip) this.popoverTip.show = false;
            setTimeout(() => {
                this.inputValue = '';
                this.inputContent = '';
            }, 300);
            this.$emit('clearChoseData');
            this.clickCaption();
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
        // 设置tip显示状态
        setTipStatus(status) {
            if (status) {
                if ((this.isShowAllChoice && this.isAllChoice) || !this.tooltipText) return;
                if (this.popoverTip) {
                    if (this.timer) {
                        clearTimeout(this.timer);
                    } else {
                        this.timerEnter = setTimeout(() => {
                            if (!this.triangle) {
                                this.popoverTip.content = this.tooltipText;
                                PopoverTip.resetPosition(this.popoverTip);
                                clearTimeout(this.timerEnter);
                                this.timerEnter = null;
                            }
                        }, 300);
                    }
                } else {
                    this.timerEnter = setTimeout(() => {
                        if (!this.triangle) {
                            const { $refs: { refTrigger, countTag } } = this;
                            this.popoverTip = PopoverTip({
                                tag: refTrigger, // 触发器
                                countTag, // 数字标签
                                propsData: {
                                    content: this.tooltipText
                                }
                            })
                                .$on('popoverTipHandle', (str) => {
                                    // str 值可选范围 enter leave
                                    if (str === 'enter') {
                                        this.clearTimer();
                                    } else {
                                        this.setTimer();
                                    }
                                });
                            this.popoverTip.$nextTick(() => {
                                PopoverTip.resetPosition(this.popoverTip);
                            });
                        }
                        clearTimeout(this.timerEnter);
                        this.timerEnter = null;
                    }, 300);
                }
            } else {
                if (this.timerEnter) {
                    clearTimeout(this.timerEnter);
                    return;
                }
                if (this.popoverTip) this.setTimer();
            }
        },

        // input框的点击事件
        clickFn() {
            if (this.isReadOnly) {
                if (this.triangle) {
                    this.inputBlur();
                } else {
                    this.inputFocus();
                }
            } else {
                if (!this.triangle) {
                    this.inputFocus();
                    this.$nextTick(() => {
                        this.captionStatus = true;
                        this.$refs.inputField.focus();
                    });
                }
            }
        },
        // 点击caption展开关闭下拉面板 captionStatus-用来判断点击caption是否壳关闭
        clickCaption() {
            if (this.captionStatus) {
                setTimeout(() => {
                    this.captionStatus = false;
                }, 300);
                return;
            }
            if (this.triangle) {
                this.inputBlur();
            } else {
                this.inputFocus();
                this.$nextTick(() => {
                    this.captionStatus = true;
                    this.$refs.inputField.focus();
                });
            }
        },

        // 输入框获取焦点-弹窗显示
        inputFocus() {
            this.$emit('changeTriangle', true);
        },
        // 关闭选择框
        inputBlur() {
            this.captionStatus = true;
            if (!this.activeClose) return;
            this.$emit('changeTriangle', false);
        }
    }
};
</script>

<style lang="stylus">
.p-select-input
    position: relative
    display: inline-block
    width: 100%

.p-select-input-content
    display: flex
    align-items: center
    justify-content: space-between
    // background-color: $white
    border: 1px solid $grey-400
    border-radius: 4px
    width: 100%
    height: 32px
    font-size: 14px
    cursor: pointer
    padding-left: 12px
    transition: border 0.3s, box-shadow 0.3s

    &:hover
        border-color: $blue-500

    &:active
        border-color: $blue-600

    svg
        transition: transform 0.3s

    &.p-select-input-content-active
        border-color: $blue-500
        box-shadow: 0 0 0 2px rgba(0, 145, 255, 0.2)

    .p-select-input-caption
        max-width: 196px;
        font-size: 14px;
        color: $grey-500;
        height: 30px
        line-height: 30px
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

.p-select-search-box-disabled
    background-color: $grey-200
    cursor: not-allowed

    .p-select-input-section
        font-size: 14px

        .p-select-input-input
            cursor: not-allowed

    .p-select-input-svg
        display: none

    .p-select-clear-icon
        display: none

    &:hover
        border-color: $grey-400

.p-select-input-section
    position: relative
    width: 100%
    height: 100%
    overflow: hidden

    .p-select-input-place
        padding-right: 8px
        line-height: 30px
        color: $grey-400
        //给placeholder定位 -- Danny
        position absolute
        left 0

        span
            span
                padding-left 4px
                padding-right 4px

        &.p-select-input-place-selected
            color: $grey-900

            span
                span
                    color $blue-500

    .p-select-input-input
        position: absolute
        left: 0
        top: 0
        border: 0
        outline: none
        background: none
        width: calc(100% - 24px)
        height: 100%
        font-size: 14px
        color: $grey-900
        cursor: pointer
        z-index: 11

    .p-select-icon-svg
        position: absolute
        right: 0
        top: 0
        display block
        width: 24px
        height: 30px
        line-height @height
        z-index: 10
        transition: all 0.3s
        font-size 0
    .p-select-input-svg
        width: 16px
        height: 16px
        vertical-align middle

    .p-select-clear-icon
        position: absolute
        right: 8px
        top: 7px
        width: 16px
        z-index: 1000
        transition: all 0.3s

        path
            transition: fill 0.3s

        &:hover
            path
                fill: #0091ff

    .p-select-input-rotate
        transform: rotate(180deg)

.p-trigger-error
    border-color $red-500
.p-trigger-error-text
    position absolute
    left 0
    top 36px
    line-height 14px
    font-size 14px
    color $red-500
</style>
