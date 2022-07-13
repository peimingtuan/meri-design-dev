<template>
    <div
            :class="[
                type !=='textarea' && 'p-input',
                type === 'textarea' && 'p-textarea',
                disabled && 'p-input-disabled', errorInfo && 'p-input-error',
                focus && 'p-input-focus',
                inputFinish && 'p-input-finish',
                computeNumber && type === 'textarea' && value.length > maxLength && 'p-textarea-max'
            ]"
            :style=" width > 0 && type !=='textarea' ? 'width: ' + width + 'px' : ''"
            @mouseenter="inputMouseenter"
            @mouseleave="inputMouseleave"
    >
        <template v-if="type !== 'textarea'">
            <div class="left-button" v-if="leftButton.length > 0">
                <div class="left-button-text">{{leftButtonText}}</div>
            </div>
            <i class="p-input-icon-search" v-if="iconType === 'search'">
                <Icon name="search" />
            </i>
            <div class="p-input-box">
                <div
                        class="p-placeholder"
                        v-if="!value || disabled"
                >{{disabled && value ? value : placeholder}}</div>
                <input
                        :maxlength="maxLength"
                        :name="name"
                        :autofocus="autofocus"
                        ref="input"
                        v-if="!disabled"
                        :type="type"
                        :autocomplete="type==='password' ? 'new-password':'off'"
                        :value="value"
                        @focus="inputFocus"
                        @input="searchInput"
                        @blur="inputBlur"
                        @keypress="inputComplete"
                />
            </div>
            <i class="p-input-icon-clear" v-if="iconClose && !disabled && value" @click="clear">
                <Close />
            </i>
            <div class="right-button" v-if="rightButton.length > 0">
                <div class="right-button-text">{{rightButtonText}}</div>
            </div>
        </template>
        <template v-else>
            <div v-if="!value"
                 class="p-textarea-placeholder"
            >{{value ? value : placeholder}}</div>
            <textarea
                    class="p-textarea-box"
                    :class="[width && width > 0 && 'p-textarea-resize']"
                    :style=" width > 0 ? 'width: ' + width + 'px' : ''"
                    :value="value"
                    :maxlength="!computeNumber&&maxLength"
                    :disabled="disabled"
                    :name="name"
                    :autofocus="autofocus"
                    ref="input"
                    :rows="rows"
                    @focus="inputFocus"
                    @input="searchInput"
                    @blur="inputBlur"
                    @keypress="inputComplete"
            />
        </template>
        <div class="p-word-num" v-if="computeNumber">{{ value.length }}/{{ maxLength }}</div>
        <div class="p-textarea-max-error-info" v-if="computeNumber && type === 'textarea' && value.length > maxLength">最多可输入{{maxLength}}字</div>
        <div class="p-input-error-info" v-if="errorInfo">{{errorInfo}}</div>
    </div>
</template>
<script>
import Close from '../static/iconSvg/clear2.svg';
import Icon from '../Icon/Icon';

export default {
    name: 'Input',
    components: { Close, Icon },
    props: {

        /**
             * 类型 可选值（text, textarea, password）
             */
        type: {
            type: String,
            default: 'text'
        },
        /**
             * 是否计算数量
             */
        computeNumber: {
            type: Boolean,
            default: false
        },
        /**
             * 是否自动聚焦
             */
        autofocus: {
            default: false
        },
        /**
             * 最大字符长度
             */
        maxLength: {
            type: Number,
            default: 100
        },
        /**
             * 原生name属性
             */
        name: {
            type: String,
            default: ''
        },
        /**
             * 右按钮
             */
        rightButton: {
            type: Array,
            default: () => []
        },
        /**
             * 左按钮
             */
        leftButton: {
            type: Array,
            default: () => []
        },
        /**
             * 输入框值
             */
        value: {
            type: String,
            default: ''
        },
        /**
             * icon类型
             */
        iconType: {
            type: String,
            default: ''
        },
        /**
             * 是否显示清楚按钮
             */
        /*
                iconClose: {
                    type: Boolean,
                    default: false
                },
                */
        /**
             * 占位符
             */
        placeholder: {
            type: String,
            default: 'Please enter'
        },
        /**
             * 是否禁用状态
             */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
             * 错误信息提示
             */
        errorInfo: {
            type: String,
            default: ''
        },
        /**
             * 显示几行
             */
        rows: {
            type: [Number, String],
            default: 4
        },
        /**
             * 显示几行
             */
        width: {
            type: [Number, String],
            default: 240
        }
    },
    data() {
        return {
            // iconClose: false, // 是否显示清理按钮
            mouseOver: false, // 鼠标是否在input上
            inputFinish: true, // 输入完成
            focus: false, // 输入框获取焦点
            leftButtonText: '', // 左边按钮文本内容
            rightButtonText: '' // 右边按钮文本内容
        };
    },
    // watch: {
    //     value(n, o) {
    //         if (n === o) return;
    //         if (!n) {
    //             this.iconClose = false;
    //         } else if (!this.iconClose) {
    //             this.iconClose = true;
    //         }
    //     }
    // },
    created() {
        // if (this.value && !this.iconClose) {
        //     this.iconClose = true;
        // } else if (!this.value && this.iconClose) {
        //     this.iconClose = false;
        // }
        if (this.leftButton.length > 0) {
            this.leftButtonText = this.leftButton.find(
                (v) => v.checked === 'checked'
            ).name;
        } else if (this.rightButton.length > 0) {
            this.rightButtonText = this.rightButton.find(
                (v) => v.checked === 'checked'
            ).name;
        }
    },
    mounted() {
        if (this.autofocus) {
            setTimeout(() => {
                this.focusM();
            }, 100);
        }
    },
    computed: {
        iconClose() {
            return this.mouseOver || this.focus
        }
    },
    methods: {
        focusM() {
            if (this.$refs.input) {
              this.$refs.input.focus();
              this.focus = true;
            }
        },
        // 清楚输入框内容
        clear() {
            this.$emit('input', '');
            this.$emit('clear');
        },
        inputMouseenter() {
            console.log('inputMouseenter');
            this.mouseOver = true;
        },
        inputMouseleave() {
            console.log('inputMouseleave');
            this.mouseOver = false;
        },
        // 输入框获取焦点
        inputFocus(e) {
            this.focus = true;
            if (this.inputFinish) this.inputFinish = false;
            this.$emit('focus', e.target.value);
            this.$emit('focusChange', true);
        },
        // 输入框失去焦点
        inputBlur(e) {
            this.focus = false;
            if (!this.inputFinish) this.inputFinish = true;
            if (this.leftButton.length > 0) {
                this.$emit('blur', {
                    value: e.target.value,
                    leftButtonText: this.leftButtonText
                });
            } else if (this.rightButton.length > 0) {
                this.$emit('blur', {
                    value: e.target.value,
                    rightButtonText: this.rightButtonText
                });
            } else {
                this.$emit('blur', e.target.value);
            }
            this.$emit('focusChange', false);
        },
        // 输入框有值关闭占位符
        searchInput(e) {
            this.$emit('input', e.target.value);
            // if (this.type === 'text') {
            //     if (e.target.value && !this.iconClose) {
            //         this.iconClose = true;
            //     } else if (!e.target.value && this.iconClose) {
            //         this.iconClose = false;
            //     }
            // }
        },
        // 输入完成点击enter
        inputComplete(e) {
            if (e.key === 'Enter') {
                if (this.$refs.input) this.$refs.input.blur();
                // this.inputFinish = true;
                if (this.leftButton.length > 0) {
                    this.$emit('pressEnter', {
                        value: e.target.value,
                        leftButtonText: this.leftButtonText
                    });
                } else if (this.rightButton.length > 0) {
                    this.$emit('pressEnter', {
                        value: e.target.value,
                        rightButtonText: this.rightButtonText
                    });
                } else {
                    this.$emit('pressEnter', e.target.value);
                }
            }
        }
    }
};
</script>

<style lang="stylus">
    .p-textarea.p-textarea-max
        .p-textarea-max-error-info
            position absolute
            left 12px
            bottom -20px
            color $red-500
            font-size 14px
            line-height 18px
            height 18px
        .p-word-num
            color #F54E45
        .p-textarea-box
            border 1px solid $red-500
            &:hover
                border 1px solid $red-500
    .p-textarea
        & + .p-textarea
            margin-left 28px
        background-color $theme
        display inline-flex
        position relative
        .p-word-num
            height 20px
            font-size 12px
            color #8D9399
            line-height 20px
            position absolute
            right 8px
            bottom 2px
        .p-textarea-placeholder
            position absolute
            left 8px
            top 8px
            color $grey-400
            z-index 1
            font-size 14px
            pointer-events none
        .p-textarea-box
            transition all 0.3s
            padding 8px
            border 1px solid $grey-400
            border-radius 4px
            /*min-width 240px*/
            width 600px
            max-width 600px
            margin 0
            outline none
            caret-color $blue-500
            color $grey-900
            background none
            overflow-y auto
            &.p-textarea-resize
                resize: none;
            &:hover
                border-color $blue-500
            &:active
                border-color $blue-600
        &.p-input-focus
            box-shadow none !important
            .p-textarea-box
                border-color $blue-500
    .p-input
        //background-color $theme
        display inline-flex
        align-items center
        padding-left 8px
        padding-right 8px
        border 1px solid $grey-400
        border-radius 4px
        width 240px
        max-width 600px
        height 32px
        font-size 0
        transition border 0.3s , box-shadow 0.3s
        & + .p-input
            margin-left 28px
        .left-button
            margin-left -8px
            margin-right 8px
            border-top-left-radius 4px
            border-bottom-left-radius 4px
            border-right: 1px solid $grey-400
        .right-button
            margin-left 8px
            margin-right -8px
            border-top-right-radius 4px
            border-bottom-right-radius 4px
            border-left: 1px solid $grey-400
        .left-button,.right-button
            width 76px
            height 30px
            line-height @height
            // background-color $grey-200
            cursor pointer
            .left-button-text,.right-button-text
                color $grey-900
                font-size 14px
                text-align center
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
        &:hover
            border-color $blue-500
        &:active
            border-color $blue-600
        &:after
            content ' '
            color transparent
        &:before
            content ' '
            color transparent
        .p-input-box
            flex 1
            font-size 14px
            position relative
            height: 30px
            input, .p-placeholder
                height 30px
                line-height @height
            input
                margin 0
                padding 0
                outline none
                background none
                border 0
                color $grey-900
                width 100%
                position relative
                z-index 2
                caret-color $blue-500
            .p-placeholder
                position absolute
                left 0
                top 0
                color $grey-400
                z-index 1
                width 100%
                overflow hidden
        .p-input-icon-clear
            padding-left 8px
            cursor pointer
            height 30px
            line-height @height
            svg
                width 14px
                height 14px
                transition all 0.3s
                vertical-align middle
                path
                    transition all 0.3s
            &:hover
                path

                    fill $blue-500
            &:active
                path
                    fill $blue-600
        .p-input-icon-search
            padding-right 8px
            text-align center
            .p-icon
                width 16px
                height 30px
                line-height @height
                svg
                    vertical-align middle
    .p-input-focus
        border-color $blue-500
    //box-shadow $box-shadow-blue
    .p-input.p-input-disabled,
    .p-textarea.p-input-disabled
        background-color $grey-200
        border-color $grey-400
        cursor not-allowed
        textarea.p-textarea-box
            color $grey-400
            cursor not-allowed
            &:hover
                border-color $grey-400
        &:hover
            border-color $grey-400
    .p-input.p-input-error,
    .p-textarea.p-input-error
        position relative
        border-color $red-500
        .p-input-box
            input
                caret-color $red-500
        textarea.p-textarea-box
            caret-color $red-500
            border-color $red-400
            &:hover
                border-color $red-400
        .p-input-error-info
            position absolute
            left 0
            bottom -20px
            color $red-500
            font-size 14px
            line-height 18px
            height 18px
        &:hover
            border-color $red-500
    .p-input-finish
        input, textarea
            cursor pointer
</style>
