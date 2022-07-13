<template>
  <div :class="`p-d-button p-d-button-${type} p-d-button-${size} p-d-button-${dropDownType}${disabled ? ' p-dd-button-disabled' : ''}`">
    <div class="p-d-button-text" @mouseenter="buttonEnter('left')" @click="handleClick" ref="buttonText" @mouseleave="buttonLeave">
      <template v-if="text">{{text}}</template>
      <template v-else><slot/></template>
    </div>
    <div class="p-d-button-split-line" v-if="dropDownType === 'split-drop'"></div>
    <div class="p-d-button-triangle"  @mouseenter="buttonEnter('right')" @click="handleRightClick" @mouseleave="buttonLeave">
      <TriangleSvg :class="[!triangle && 'p-d-button-rotate', 'p-d-button-triangle-svg']" />
    </div>
  </div>
</template>
<script>
import TriangleSvg from '../static/iconSvg/triangle.svg';
import DropListToggle from './drop';
// import CheckClassName from '../static/utils/CheckClassName';
// import CountPositionPlaceRight from '../static/utils/CountPositionPlaceRight';
import CalcTargetPositionRight from '../static/utils/CalcTargetPositionRight';
import RemoveDom from '../static/utils/RemoveDom';

export default {
    name: 'DropDownButton',
    components: { TriangleSvg },
    data() {
        return {
            mouseStatus: false,
            // 三角形方向
            triangle: false,
            // offsetTop: 0, // 按钮距离上边距离
            // offsetLeft: 0, // 按钮距离左边距离
            i: null, // 下拉列表定时器
            id: null, // 下拉列表选中id
            listI: null // 下拉列表blur定时器
        };
    },
    props: {
        /**
             * 按钮类型
             * 可选值 【default primary】
             */
        type: {
            type: String,
            default: 'default'
        },
        /**
             * 交互方式
             * 可选值 【tap, hover】
             */
        interactive: {
            type: String,
            default: 'hover'
        },
        /**
             * 下拉列表的选中id
             */
        value: {
            default: ''
        },
        /**
             * 按钮文本
             */
        text: {
            type: String,
            default: ''
        },
        /**
             * 是否禁用
             * 可选值 【true, false】
             */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
             * 按钮类型
             * 可选值 【drop split-drop, default-drop】
             */
        dropDownType: {
            type: String,
            default: 'default'
        },
        /**
             * 按钮类型
             */
        dropDownList: {
            type: Array,
            default: () => []
        },
        /**
             * 按钮大小
             * 可选值【large medium small】
             */
        size: {
            type: String,
            default: 'medium'
        },
        /**
             * 位于滚动元素内，值必须是它`id`
             */
        transfer: {
            type: String,
            default: ''
        },
        // 激活选中项高亮
        active: {
            type: Boolean,
            default: true
        }
    },
    mounted() {
        if (this.transfer) {
            const transfer = document.getElementById(this.transfer);
            transfer.addEventListener('scroll', this.listenScroll);
        }
        window.addEventListener('mousewheel', this.listenScroll, false);
        document.addEventListener('click', this.bodyClick);
    },
    /* watch: {
            transfer (n, o) {
                if (n !== o) {
                    if (this.dropList) this.dropList.dropDownListShow = false;
                    delete this.dropList;
                    this.initComponent();
                }
            }
        }, */
    destroyed() {
        window.removeEventListener('mousewheel', this.listenScroll);
        window.removeEventListener('click', this.bodyClick);
        /* if (this.dropList) this.dropList.dropDownListShow = false;
            delete this.dropList; */
        if (this.dropList) RemoveDom(this.dropList);
    },
    methods: {
        /**
             * 监听页面点击
             */
        bodyClick(e) {
            if (this.$el.contains(e.target)) { // 如果点击的是绑定元素则不执行绑定函数
                return;
            }
            if (this.dropList && this.dropList.$el.contains(e.target)) {
                return;
            }
            this.listI = setTimeout(() => {
                this.listI = null;
                this.triangle = false;
                if (this.dropList) this.dropList.dropDownShow = false;
            }, 180);
        },
        /**
             * 监听页面滚动
             */
        listenScroll() {
            if (this.dropList && this.dropList.dropDownShow && !this.mouseStatus) {
                this.dropList.dropDownShow = false;
            }
        },
        /**
             * 初始化 下拉组件
             */
        initComponent() {
            if ((this.type === 'primary' || this.type === 'default') && this.dropDownType && this.dropDownType !== 'default') {
                const tag = this.$el;
                // let transfer = this.transfer;
                // const dom = transfer === 'body' ? document.body : (transfer==='parent' ? tag : CheckClassName(tag, transfer));
                // const [top, right, height, place] = CountPositionPlaceRight(tag, dom, 240, transfer, 'right');
                // const { height: height } = tag.getBoundingClientRect(); // 根据当前点击的dom对象获取位置
                // const place = 'left';

                const dom = document.body;
                const h = this.dropDownList.length > 5 ? 197 : (this.dropDownList.length * 38 + 21);
                const {
                    X, Y, P, H, place
                } = CalcTargetPositionRight(tag, dom, h, 240);

                this.id = this.value;
                this.dropList = DropListToggle({
                    m: { // 下拉列表位置
                        offsetTop: Y,
                        offsetHeight: H
                    },
                    dom,
                    right: X,
                    place,
                    position: P,
                    active: this.active, // 激活选中项高亮
                    size: this.size, // 按钮尺寸
                    interactive: this.interactive, // 下拉方式 hover-鼠标移上去， click-鼠标点击
                    id: this.id, // 选中的列表id
                    type: this.type, // 按钮类型
                    dropDownList: this.dropDownList, // 下拉列表数据
                    dropDownType: this.dropDownType, // 下拉列表类型 drop, split-drop, default-drop
                    choose: this.choose, // 选择列表选项
                    buttonLeave: this.buttonLeave, // 鼠标离开button
                    // DropListBlur: this.DropListBlur, //列表失去焦点事件调用
                    // DropListFocus: this.DropListFocus, //列表聚焦事件调用
                    buttonEnter: this.buttonEnter // 鼠标进入button
                });
            }
        },
        /**
             * 重置下拉列表数据
             */
        resize() {
            this.$nextTick(() => {
                if (this.dropList) {
                    const tag = this.$el;
                    // let transfer = this.transfer;

                    // const dom = transfer === 'body' ? document.body : (transfer==='parent' ? tag : CheckClassName(tag, transfer));
                    // const [top, right, height, place] = CountPositionPlaceRight(tag, dom, 240, transfer, 'right');
                    // const { height: height } = tag.getBoundingClientRect(); // 根据当前点击的dom对象获取位置
                    // const place = 'left';

                    const dom = document.body;
                    const h = this.dropDownList.length > 5 ? 190 : (this.dropDownList.length * 38 + 19);
                    const {
                        X, Y, P, H, place
                    } = CalcTargetPositionRight(tag, dom, h, 240);

                    this.dropList.m.offsetTop = Y;
                    this.dropList.m.offsetHeight = H;
                    this.dropList.place = place;
                    this.dropList.right = X;
                    this.dropList.position = P;

                    this.dropList.winWidth = document.body.offsetWidth;
                }
            });
        },
        /**
             * 鼠标进入
             */
        buttonEnter(type) {
            this.mouseStatus = true;
            if (this.type === 'disabled' || this.disabled || (type === 'left' && this.dropDownType === 'split-drop') || this.interactive === 'tap') return;
            if (!this.dropList) {
                this.initComponent();
            } else {
                this.resize();
            }
            this.triangle = true;
            if (this.dropList) {
                if (this.i) clearTimeout(this.i);
                this.dropList.dropDownListShow = true;
                this.$nextTick(() => {
                    this.dropList.dropDownShow = true;
                });
            }
        },
        /**
             * 鼠标离开
             */
        buttonLeave() {
            this.mouseStatus = false;
            if (this.type === 'disabled' || this.disabled || this.interactive === 'tap' || !this.dropList || !this.dropList.dropDownShow) return;
            this.i = setTimeout(() => {
                this.triangle = false;
                if (this.dropList) {
                    this.dropList.dropDownShow = false;
                    // this.dropList.dropDownListShow = false;
                    if (this.i) clearTimeout(this.i);
                }
            }, 150);
        },
        /**
             * 选择选项
             */
        choose(item) {
            if (item.disabled) return;
            this.$emit('change', item);
            this.dropList.disabledItem = true;
            this.triangle = false;
            this.$emit('input', item.id);
            this.id = item.id;
            /* if (this.text) {
                    this.$emit('update:text', item.name);
                } else {
                    this.$refs.buttonText.innerHTML = item.name;
                } */
            this.dropList.dropDownShow = false;
            this.dropList.id = item.id;
            this.resize();
            setTimeout(() => {
                this.$nextTick(() => {
                    this.dropList.disabledItem = false;
                });
            }, 450);
        },
        /**
             * 点击按钮的回调
             */
        handleClick() {
            if (this.type === 'disabled' || this.disabled) return;
            this.$emit('click');

            if (this.interactive === 'tap' && (this.dropDownType === 'drop' || this.dropDownType === 'default-drop')) {
                this.handleRightClick();
            }
        },
        /**
             * 点击右边箭头，下拉菜单
             */
        handleRightClick() {
            if (this.type === 'disabled' || this.disabled || this.interactive !== 'tap') return;

            if (!this.dropList) {
                this.initComponent();
            } else {
                this.resize();
            }

            if (this.listI) {
                this.triangle = !this.triangle;
                this.dropList.dropDownShow = !this.dropList.dropDownShow;
                if (this.dropList.dropDownShow) {
                    this.$nextTick(() => {
                        if (this.dropList.dropDownShow) this.dropList.focus();
                    });
                }
                clearTimeout(this.listI);
                return;
            }

            if (!this.dropList.dropDownListShow) this.dropList.dropDownListShow = true;
            this.triangle = true;
            this.$nextTick(() => {
                this.dropList.dropDownShow = true;
                this.$nextTick(() => {
                    if (this.dropList.dropDownShow) this.dropList.focus();
                });
            });
        }
        /**
             * 列表失去焦点
             */
        /* DropListBlur () {
                this.listI = setTimeout(() => {
                    this.listI = null;
                    this.triangle = false;
                    if (this.dropList) this.dropList.dropDownShow = false;
                }, 180);
            }, */
        /**
             * 列表获取焦点
             */
        /* DropListFocus () {
            } */
    }
};
</script>
<style lang="stylus">
  .p-d-button
    position relative
    display inline-flex
    align-items center
    /*overflow hidden*/
    border-radius 4px
    font-size 0
    transition all 0.36s
    &:after
      content '1'
      color transparent
    &:before
      content '1'
      color transparent
    &+.p-d-button
      margin-left 12px
    .p-d-button-text
      border-top-left-radius 4px
      border-bottom-left-radius 4px
      transition background-color .36s
      /*flex 1*/
      flex-grow 1
      padding-left 8px
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      text-align center
    .p-d-button-split-line
      width 1px
    .p-d-button-triangle
      border-top-right-radius 4px
      border-bottom-right-radius 4px
      transition all 0.36s
      text-align center
      .p-d-button-rotate, .p-d-button-triangle-svg
        width 16px
        height 16px
        transition all 0.36s
        vertical-align middle
        path
          transition all .36s
      .p-d-button-rotate
        transform rotate(180deg)
  .p-d-button-default.p-d-button-drop, .p-d-button-default.p-d-button-split-drop
    background-color $theme
    border 1px solid $grey-400
  .p-d-button-default
    border-color $grey-400
    color $grey-900
    cursor pointer
    &:hover
      border-color $blue-500
    &:active
      border-color $blue-600
  .p-d-button-default.p-d-button-drop, .p-d-button-default-drop
    &:hover
      color $blue-500
      .p-d-button-triangle
        path
          fill $blue-500
    &:active
      color $blue-600
      .p-d-button-triangle
        path
          fill $blue-600
  .p-d-button-default.p-d-button-split-drop
    .p-d-button-split-line
      background-color $grey-400
    .p-d-button-text
      &:hover
        color $blue-500
      &:active
        color $blue-600
    .p-d-button-triangle
      &:hover
        path
          fill $blue-500
      &:active
        path
          fill $blue-600

  .p-d-button-primary.p-d-button-drop,.p-d-button-primary.p-d-button-split-drop
    background-color $blue-500
    color $white
    cursor pointer
    .p-d-button-triangle
      path
        fill $white
  .p-d-button-primary.p-d-button-drop
    &:hover
      background-color $blue-400
    &:active
      background-color $blue-600
    &::after
      background radial-gradient(circle, $blue-300 10%, transparent 10%)
  .p-d-button-primary.p-d-button-split-drop
    .p-d-button-split-line
      background-color $blue-100
    .p-d-button-text, .p-d-button-triangle
      &:hover
        background-color $blue-400
      &:active
        background-color $blue-600
      &::after
        background radial-gradient(circle, $blue-300 10%, transparent 10%)

  .p-d-button-large
    height 40px
    min-width 98px
    max-width 154px
    .p-d-button-text
      font-size 16px
    .p-d-button-triangle
      width 32px
  .p-d-button-drop.p-d-button-large
    line-height 38px
  .p-d-button-split-drop.p-d-button-large, .p-d-button-default-drop.p-d-button-large
    line-height 40px
  .p-d-button-split-drop.p-d-button-large.p-d-button-primary, .p-d-button-split-drop.p-d-button-large.p-d-button-default
    .p-d-button-split-line
      height 14px
  .p-d-button-split-drop.p-d-button-large
    .p-d-button-text
      padding-right 14px
  .p-d-button-medium
    height 32px
    min-width 86px
    max-width 126px
    .p-d-button-text
      font-size 14px
    .p-d-button-triangle
      width 28px
  .p-d-button-drop.p-d-button-medium
    line-height 30px
  .p-d-button-split-drop.p-d-button-medium, .p-d-button-default-drop.p-d-button-medium
    line-height 32px
  .p-d-button-split-drop.p-d-button-medium.p-d-button-primary, .p-d-button-split-drop.p-d-button-medium.p-d-button-default
    .p-d-button-split-line
      height 12px
  .p-d-button-split-drop.p-d-button-medium
    .p-d-button-text
      padding-right 12px
  .p-d-button-small
    height 28px
    max-width 126px
    .p-d-button-text
      font-size 14px
    .p-d-button-triangle
      width 24px
  .p-d-button-drop.p-d-button-small
    line-height 26px
  .p-d-button-split-drop.p-d-button-small, .p-d-button-default-drop.p-d-button-small
    line-height 28px
  .p-d-button-split-drop.p-d-button-small.p-d-button-primary, .p-d-button-split-drop.p-d-button-small.p-d-button-default
    .p-d-button-split-line
      height 10px
  .p-d-button-split-drop.p-d-button-small
    .p-d-button-text
      padding-right 10px
  .p-d-button.p-dd-button-disabled,
  .p-d-button-split-drop.p-dd-button-disabled
    border-style none
    background-color $grey-200
    color $grey-400
    cursor not-allowed
    .p-d-button-split-line
      background-color $grey-400
    &:hover, &:active
      background-color $grey-200
      color $grey-400
    .p-d-button-text,
    .p-d-button-triangle
      path
          fill $grey-500
      &:hover,
      &:active
        background-color $grey-200
        color $grey-400
        path
          fill $grey-500

</style>
