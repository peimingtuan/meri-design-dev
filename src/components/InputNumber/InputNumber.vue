<template>
  <div :class="['p-input-number', 'p-input-number-' + type, focus && 'p-input-number-focus', disabled && 'p-input-number-disabled', errorInfo && 'p-input-number-error']"
  :style="width > 0 ? 'width: ' + width + 'px' : ''"
  >
    <div class="p-in-left-button" onselectstart="return false;" :class="{'p-in-disabled-button': disabledType === 'left'}" v-if="type === 'both-button'" @click="addAndSubtract('sub')">
      <Icon name="reduce"/>
    </div>
    <div class="p-input-number-box" :class="[ type === 'both-button' && focus && 'p-input-number-focus' ]">
      <div class="p-placeholder" v-if="(!inputVal && inputVal !== 0) || disabled">{{disabled && (inputVal || inputVal === 0) ? inputVal : placeholder}}</div>
      <input ref="input" :maxlength="maxLength" :name="name" :autofocus="autofocus" type="text" :value="inputVal" v-if="!disabled" autocomplete="on"
             @focus="inputFocus" @input="searchInput" @blur="inputBlur" @keypress="inputComplete"/>
    </div>
    <div class="p-in-right-button" onselectstart="return false;" :class="{'p-in-disabled-button': disabledType === 'right'}" v-if="type === 'both-button'" @click="addAndSubtract('add')">
      <Icon name="plus"/>
    </div>
    <div class="p-in-right-arrow" v-else-if="type === 'right-arrow'">
      <div class="p-in-right-arrow-top" onselectstart="return false;" @click="addAndSubtract('add')" :class="{'p-in-disabled-button': disabledType === 'top'}">
        <TriangleSvg/>
      </div>
      <div class="p-in-right-arrow-btm" onselectstart="return false;" @click="addAndSubtract('sub')" :class="{'p-in-disabled-button': disabledType === 'bottom'}">
        <TriangleSvg/>
      </div>
    </div>
    <div class="p-input-number-error-info" v-if="errorInfo">{{errorInfo}}</div>
  </div>
</template>
<script>
import TriangleSvg from '../static/iconSvg/triangle.svg';

export default {
    name: 'InputNumber',
    props: {
        /**
             * 输入框类型
             */
        type: {
            type: String,
            default: 'normal'
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
             * 输入框值
             */
        value: {
            type: [Number, String],
            default: 0
        },
        /**
             * 占位符
             */
        placeholder: {
            type: String,
            default: 'Enter the number'
        },
        /**
             * 是否禁用状态
             */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
             * 最小值
             */
        min: {
            type: Number
        },
        /**
             * 最大值
             */
        max: {
            type: Number
        },
        /**
             * 错误信息提示
             */
        errorInfo: {
            type: String,
            default: ''
        },
        /**
             * 步长（支持小数）
             */
        step: {
            type: Number,
            default: 1
        },
        /**
             * 数值精度
             */
        precision: {
            type: [Number, String],
            default: -1
        },
        /**
             * 宽度
             */
        width: {
            type: Number,
            default: 0
        }
    },
    components: { TriangleSvg },
    data() {
        return {
            disabledType: '', // 禁用 （可选值： top, right, bottom, left）
            inputFinish: false, // 输入完成
            inputVal: '', // 输入完成
            lineStatus: '',
            focus: false // 输入框获取焦点
        };
    },
    created() {
        if (this.value === '') return; // 空字符不做校验
        if (this.value > this.max) {
            this.inputVal = this.max;
            this.$emit('input', this.inputVal);
        } else if (this.value < this.min) {
            this.inputVal = this.min;
            this.$emit('input', this.inputVal);
        } else {
            this.inputVal = this.value;
        }
        const precision = parseInt(this.precision);
        const numStr = this.value ? String(this.value) : '';
        const index = numStr.indexOf('.');
        if (precision >= 0 && index > -1) {
            this.inputVal = numStr.slice(0, index + precision + 1);
        }
        this.validButton(this.value);
    },
    mounted() {
        if (this.autofocus) {
            setTimeout(() => { this.focusM(); }, 100);
        }
    },
    watch: {
        value(n, o) {
            if (n !== o && n !== this.inputVal) {
                const ne = Number(this.precision) > 0 ? n : Number(n);
                if (ne > this.max) {
                    this.inputVal = this.max;
                    this.$emit('input', this.inputVal);
                } else if (ne < this.min) {
                    this.inputVal = this.min;
                    this.$emit('input', this.inputVal);
                } else {
                    // if (n === '') {
                    //     console.log('nnnnnnnn');
                    //     this.$nextTick(() => {
                    //         this.inputVal = ''
                    //     })
                    //     return;
                    // }
                    if (Number(ne) === Number(this.inputVal)) return;
                    this.inputVal = ne;
                }
                this.validButton(Number(this.inputVal));
            }
        },
        inputVal(n, o) {
            if (n !== o) {
                // eslint-disable-next-line no-restricted-globals
                if (isNaN(n) && n !== '-') {
                    this.inputVal = o;
                }
            }
        }
    },
    methods: {
        validButton(v) {
            if (v >= this.max) {
                if (this.type === 'both-button') {
                    this.disabledType = 'right';
                } else if (this.type === 'right-arrow') {
                    this.disabledType = 'top';
                }
            } else if (v <= this.min) {
                if (this.type === 'both-button') {
                    this.disabledType = 'left';
                } else if (this.type === 'right-arrow') {
                    this.disabledType = 'bottom';
                }
            } else {
                this.disabledType = '';
            }
        },
        focusM() {
            if (this.$refs.input) this.$refs.input.focus();
        },
        addAndSubtract(type) {
            if (this.disabled) return;
            if ((type === 'add' && this.disabledType === 'top') || (type === 'sub' && this.disabledType === 'bottom')) return;
            if ((type === 'add' && this.disabledType === 'right') || (type === 'sub' && this.disabledType === 'left')) return;
            let m = 0,
                v = Number(this.inputVal),
                s = this.step ? String(this.step) : '',
                i = this.inputVal ? String(this.inputVal) : '',
                si = s.indexOf('.'),
                ii = i.indexOf('.');
            // debugger;
            if (si === -1 && ii === -1) {
                if (type === 'add') {
                    m = v + this.step;
                } else if (type === 'sub') {
                    m = v - this.step;
                }
                if (this.validVal(m, type)) this.$emit('input', m);
                this.validButton(m);
            } else if (this.inputVal === '') {
                if (type === 'add') {
                    m = this.step;
                } else if (type === 'sub') {
                    let st = this.step ? String(this.step) : '';
                    st = `-${st}`;
                    m = Number(st);
                }
                if (this.validVal(m, type)) this.$emit('input', m);
                this.validButton(m);
            } else {
                const SLen = si === -1 ? 0 : s.length - si - 1,
                    ILen = ii === -1 ? 0 : i.length - ii - 1,
                    max = Math.max(SLen, ILen);
                s = s.replace('.', '');
                i = i.replace('.', '');
                if (SLen > ILen) {
                    let zeroL = SLen - ILen,
                        zeroStr = '';
                    for (let a = 0; a < zeroL; a++) {
                        zeroStr += '0';
                    }
                    i += zeroStr;
                } else if (SLen < ILen) {
                    let zeroL = ILen - SLen,
                        zeroStr = '';
                    for (let a = 0; a < zeroL; a++) {
                        zeroStr += '0';
                    }
                    s += zeroStr;
                }
                let total = 0;
                if (type === 'add') {
                    total = Number(s) + Number(i);
                } else if (type === 'sub') {
                    total = Number(i) - Number(s);
                }
                const totalStr = total ? String(total) : '',
                    res = `${totalStr.substr(0, totalStr.length - max)}.${totalStr.substr(totalStr.length - max, max)}`;
                if (this.validVal(res, type)) {
                    // console.log(Number(res));
                    this.$emit('input', parseInt(this.precision) > 0 ? Number(res).toFixed(parseInt(this.precision)) : Number(res));
                }
                this.validButton(Number(res));
            }
        },
        // 输入框获取焦点
        inputFocus(e) {
            this.focus = true;
            const v = e.target.value;
            if (e.target.value === '') {
                this.$emit('focus', v);
            } else {
                this.$emit('focus', Number(v));
            }
        },
        // 输入框失去焦点
        inputBlur(e) {
            this.focus = false;
            const v = e.target.value;
            if (e.target.value === '') {
                this.$emit('blur', v);
            } else {
                let res = Number(v);
                if (res > this.max) {
                    res = this.max;
                } else if (res < this.min) {
                    res = this.min;
                }
                const precision = parseInt(this.precision);
                const numStr = v ? String(v) : '';
                const index = numStr.indexOf('.');
                if (precision >= 0 && index > -1) {
                    let inputVal = numStr.slice(0, index + precision + 1);
                    if (/\.$/.test(inputVal)) inputVal = Number(inputVal);
                    this.inputVal = inputVal;
                    res = Number(this.inputVal);
                } else {
                    this.inputVal = res;
                }
                this.$emit('blur', res);
            }
        },
        // 输入完成点击enter
        inputComplete(e) {
            if (e.key === 'Enter') {
                if (this.$refs.input) this.$refs.input.blur();
                this.focus = false;
                const v = e.target.value;
                if (e.target.value === '') {
                    this.$emit('pressEnter', v);
                } else {
                    let res = Number(v);
                    if (res > this.max) {
                        res = this.max;
                    } else if (res < this.min) {
                        res = this.min;
                    }
                    this.inputVal = res;
                    this.$emit('pressEnter', res);
                }
            }
        },
        // 输入框有值关闭占位符
        searchInput(e) {
            let val = e.target.value.replace(/\s+/g, ''),
                v = Number(val);
            if (val === '-' && this.min === 0) {
                this.inputVal = val;
                this.$nextTick(() => {
                    this.inputVal = '';
                });
                this.$emit('input', '');
            } else if (val === '-') {
                this.inputVal = '-';
            } else if (val === '') {
                this.inputVal = '';
                this.$emit('input', '');
            } else if (isNaN(v)) {
                this.inputVal = val;
            } else if (val === '0') {
                this.inputVal = '0';
                this.$emit('input', '0');
                this.validButton(0);
            } else {
                this.inputVal = val;
                const precision = parseInt(this.precision);
                const numStr = val ? String(val) : '';
                const index = numStr.indexOf('.');
                if (precision === 0) {
                  v = this.inputVal = parseInt(numStr);
                  this.validButton(v);
                  if (v === Number(this.value)) return;
                  this.$emit('input', v);
                } else if (precision > 0 && index > -1) {
                    this.$nextTick(() => {
                        this.inputVal = numStr.slice(0, index + precision + 1);
                        v = Number(this.inputVal);
                        this.validButton(v);
                        if (v === Number(this.value)) return;
                        this.$emit('input', v);
                    });
                } else {
                    this.validButton(v);
                    if (v === Number(this.value)) return;
                    this.$emit('input', v);
                }
            }
        },
        validVal(val, type) {
            if (val < this.min && type === 'sub') {
                return !(this.type === 'both-button' || this.type === 'right-arrow');
            } if (val > this.max && type === 'add') {
                return !(this.type === 'both-button' || this.type === 'right-arrow');
            }
            return true;
        }
    }
};
</script>
<style lang="stylus">
  .p-input-number.p-input-number-both-button
    width 162px
    input, .p-placeholder
      text-align center
    .p-in-left-button
      margin-left -8px
      margin-right -1px
      border-top-left-radius 4px
      border-bottom-left-radius 4px
    .p-in-right-button
      margin-right -8px
      margin-left -1px
      border-top-right-radius 4px
      border-bottom-right-radius 4px
    .p-in-left-button, .p-in-right-button
      display flex
      align-items center
      justify-content center
      width 32px
      path
        fill $grey-500
      &.p-in-disabled-button
        background-color $grey-200
        cursor not-allowed
        .p-icon
          cursor not-allowed
        &:hover
          border-color $grey-400
          path
            fill $grey-500
        &:hover
          background-color $grey-200
      &:hover
        z-index 5
        path
          fill $blue-500
      &:active
        background-color $blue-100
      .p-icon
        width 16px
        height 16px
    .p-in-left-button, .p-in-right-button, .p-input-number-box
      transition all .3s
      height 32px
      border 1px solid $grey-400
      &:hover
        border-color $blue-500
    .p-input-number-box
      z-index 3
      &.p-input-number-focus
        border-color $blue-500

  .p-input-number.p-input-number-normal
    border 1px solid $grey-400
    width 240px
    &.p-input-number-focus, &:hover
      border-color $blue-500
    &.p-input-number-error
      position relative
      border-color $red-500
      input
        caret-color $red-500
      .p-input-number-error-info
        position absolute
        left 0
        bottom -20px
        color $red-500
        font-size 14px
      &:hover
        border-color $red-500
  .p-input-number.p-input-number-right-arrow
    border 1px solid $grey-400
    width 240px
    .p-in-right-arrow
      width 32px
      height 30px
      margin-right -8px
      &-top
        border-bottom 1px solid $grey-400
        border-top-right-radius 4px
        &:hover
          border-bottom-color $blue-500
          z-index 10
      &-btm
        border-top 1px solid $grey-400
        border-bottom-right-radius 4px
        margin-top -1px
        &:hover
          border-top-color $blue-500
          z-index 5
        svg
          transform rotate(180deg)
      &-top, &-btm
        position relative
        svg
          width 16px
          height 16px
        path
          fill $grey-500
        &.p-in-disabled-button
          background-color $grey-200
          cursor not-allowed
          &:active
            background-color $grey-200
          &:hover
            path
              fill $grey-500
            border-left-color $grey-400
            border-top-color $grey-400
            border-bottom-color $grey-400
        border-left 1px solid $grey-400
        height 15.5px
        line-height @height
        transition all 0.3s
        display flex
        align-items center
        justify-content center
        &:hover
          border-left-color $blue-500
          path
            fill $blue-500
        &:active
          background-color $blue-100
    &:hover
      border-color $blue-500
    &.p-input-number-focus
      border-color $blue-500

  .p-input-number
    display inline-flex
    align-items center
    padding-left 8px
    padding-right 8px
    border-radius 4px
    min-width 180px
    max-width 600px
    height 32px
    font-size 0
    transition border 0.3s
    & + .p-input-number
      margin-left 28px
    &:after
      content '1'
      color transparent
    &:before
      content '1'
      color transparent
    &-box
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
  .p-input-number-disabled.p-input-number.p-input-number-both-button,
  .p-input-number-disabled.p-input-number
    background-color $grey-200
    border-color $grey-400
    cursor not-allowed
    .p-input-number-box
      border-color $grey-400
    &:hover
      border-color $grey-400
    .p-icon
      cursor not-allowed
    .p-in-left-button,.p-in-right-button, .p-in-right-arrow-top, .p-in-right-arrow-btm
      &:hover
        border-color $grey-400
        path
          fill $grey-500
      &:hover
        background-color $grey-200

</style>
