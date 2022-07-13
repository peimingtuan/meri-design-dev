<template>
  <transition :name="position ? 'selectDownUpExtend': 'selectDownUpExtendTop'" v-if="dropDownListShow"> <!--@blur="DropListBlur" @focus="DropListFocus"-->
    <div v-show="dropDownShow" @mouseleave="buttonLeave" @mouseenter="buttonEnter" :tabindex="-1"
         class="drop-list-surround"
         :class="`drop-list-${type} drop-list-${size} ${disabledItem ? 'disable-element' : ''} drop-list-padding-${position ? 'top' : 'btm'}`"
         :style="'top:'+ (position ? (m.offsetTop - 1) : (m.offsetTop + 1)) + 'px; ' + place + ': ' + right + 'px; '"> <!---->
      <div class="drop-list">
        <div class="drop-list-inner" @wheel.stop>
<!--            'active': item.id === id && !item.disabled,-->
          <div :class="{
              'active': active && item.id === id && !item.disabled,
              'disabled': item.disabled,
              'drop-item': item.id !== id && !item.disabled
          }"
               v-for="(item, index) in dropDownList" :key="item.id ? item.id : index" @click="choose(item)">{{item.name}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
    name: 'DropList',
    data() {
        return {
            position: true,
            place: 'right',
            disabledItem: false, // 是否阻止下拉列表事件
            right: 0, // 容器宽度
            type: 'default', // 按钮类型
            interactive: 'hover', // 下拉方式 hover-鼠标移上去， click-鼠标点击
            size: 'medium', // 按钮尺寸
            dropDownType: 'default', // 下拉列表类型
            dropDownList: [], // 下拉列表数据
            dropDownListShow: false, // 控制整个下拉列表的dom
            dropDownShow: false, // 下拉列表显示隐藏控制
            id: null, // 选中的列表id
            m: {} // 下拉列表位置信息
        };
    },
    methods: {
        /**
             * 组件聚焦
             */
        focus() {
            this.$el.focus();
        },
        /**
             * 组件失去焦点
             */
        blur() {
            this.$el.blur();
        }
    }
};
</script>

<style lang="stylus">
  @import "../static/stylus/animate/selectDownUpExtend.styl"
  .disable-element
    pointer-events none
  .drop-list-padding-top
    padding-top 7px
  .drop-list-padding-btm
    padding-bottom 7px

  .drop-list-surround
    outline 0
    position absolute
    min-width 180px
    max-width 240px
    z-index 7000
    .drop-list-input
      height 0
      width 0
      border none
      opacity 0
    .drop-list
      position relative
      z-index 7001
      .drop-list-inner
        max-height 190px
        overflow-y auto
        .active
          background-color $blue-100
          color $blue-500
        border 1px solid $grey-300
        padding-top 6px
        padding-bottom 6px
        box-shadow $box-shadow-bottom
        border-radius 4px
        background-color $theme
        .drop-item
          &:hover
            background-color $hover-color-grey
        div
          padding-left 12px
          padding-right 12px
          height 38px
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          font-size 14px
          line-height 38px
          color $grey-900
          cursor pointer
          &:active, &::after
            background-color $blue-100
        .disabled
          color $grey-400
          cursor not-allowed
          &:hover, &:active
            background-color $hover-color-grey

</style>
