<template>
    <transition :name="'slide'+tipPlace" >
        <div :class="popoverClass" ref="popover" :style="popoverStyle" v-show="showTip" >
            <span class="p-count-popover-text">{{innertext}}</span>
            <span class="p-count-popover-pointer" :style="tranigleStyle"></span>
        </div>
    </transition>
</template>
<script>
import { calcTipPosition } from '../static/utils/PopoverPositionCalc';

export default {
    data() {
        return {
            innertext: '',
            pos: {},
            popoverStyle: {
                left: 0
            },
            tranigleStyle: {
                left: 0
            },
            showTip: false
        };
    },
    props: {
        tipPlace: {
            type: String,
            default: 'top'
        }
    },
    watch: {
        innertext: {
            handler(n, o) {
                this.$nextTick(() => {
                    const tDom = this.getClientBoxWH();
                    const pos = calcTipPosition(this.pos, tDom, this.leftW, this.tipPlace, 8);
                    if (pos.finalBottom) {
                        this.popoverStyle = {
                            bottom: `${pos.finalBottom}px`
                        };
                    } else {
                        this.popoverStyle = {
                            top: `${pos.finalTop}px`
                        };
                    }
                    this.popoverStyle.left = `${pos.finalLeft}px`,
                    this.tranigleStyle.left = `${pos.tranigleLeft}px`;
                    if (pos.pointerPos === 'top') {
                        this.tranigleStyle.top = '-6px';
                    } else {
                        this.tranigleStyle.bottom = '-6px';
                    }
                    this.$emit('sotrePOs', tDom);
                });
            },
            immediate: true
        }
    },
    computed: {
        popoverClass() {
            return ['p-count-popover', `p-count-popover-${this.tipPlace}`];
        }
    },
    computed: {
        popoverClass() {
            return ['p-count-popover', `p-count-popover-${this.tipPlace}`];
        }
    },
    mounted() {
    },
    methods: {
        getClientBoxWH() {
            const { body } = document;
            const tag = document.createElement('div');
            tag.className = 'p-count-popover';
            tag.innerHTML = `<span>${this.innertext}</span>`;
            body.appendChild(tag);
            const { width, height } = tag.getBoundingClientRect();
            body.removeChild(tag);
            return { width, height };
        }
    }
};
</script>
<style lang="stylus">
.p-count-popover
    position absolute
    z-index 7600
    display inline-block
    padding 8px 12px
    background-color $theme
    border-radius 4px
    max-width 480px
    max-height 420px
    word-wrap break-word
    word-break:normal
    pointer-events none
    .p-count-popover-pointer
        display: inline-block;
        position: absolute;
        left: 50%;
        border-style: solid;
        border-width: 6px 6px 0 6px;
        width: 0;
        height: 0;
        bottom -6px
        border-color: #fff transparent transparent transparent;
        pointer-events: none;
    .p-count-popover-text
        display inline-block
        font-size 14px
        width 100%
        height 100%
        overflow hidden
.p-count-popover-top
    filter drop-shadow($box-shadow-triangle-bottom)
.p-count-popover-bottom
    filter drop-shadow($box-shadow-triangle-top)
    .p-count-popover-pointer
        transform rotate(180deg)
@keyframes slidetop
  from
    opacity: 0
    transform: translateY(32px)
  to
    opacity: 1
    transform: translateY(0)
.slidetop-enter-active
  animation: slidetop 0.3s
.slidetop-leave-active
  animation: slidetop 0.3s reverse

@keyframes slidebottom
  from
    opacity: 0
    transform: translateY(-32px)
  to
    opacity: 1
    transform: translateY(0)
.slidebottom-enter-active
  animation: slidebottom 0.3s
.slidebottom-leave-active
  animation: slidebottom 0.3s reverse
</style>
