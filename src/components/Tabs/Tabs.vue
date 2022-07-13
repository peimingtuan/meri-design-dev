<template>
    <div :class="classes">
        <div :class="[prefixCls + '-nav-container']">
            <div ref="navWrap"
                 :class="[
                     prefixCls + '-nav-wrap',
                     type === 'first-nav' || type === 'second-nav' ? 'p-tabs-nav-level' : 'p-tabs-nav-level-none'
                 ]"
                 :style="navWrapStyle"
                 @mouseover="handleHeaderOver"
                 @mouseleave="handleMouseLeave"
            >
                <div :class="[prefixCls + '-navbar']" :style="barStyle"></div>
                <div :class="[prefixCls + '-navbar']" v-show="showMoveBar" :style="moveBarStyle"></div>
                <div :class="tabItemCls(item)"
                     v-for="(item, index) in data"
                     :key="index"
                     @click="handleClick(item)"
                     @mouseenter="handleMouseOver(item)"
                     :style="itemStyle(item)">
                    {{ item.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IsIE from '../static/utils/IsIE';

export default {
    name: 'Tabs',
    computed: {
        classes() { // 设置组件最外层的class
            return [
                `${this.prefixCls}`,
                {
                    [`${this.prefixCls}-first-nav`]: this.type === 'first-nav',
                    [`${this.prefixCls}-second-nav`]: this.type === 'second-nav',
                    [`${this.prefixCls}-card-nav`]: this.type === 'card'
                }
            ];
        },
        navWrapStyle() { // 设置页签包裹层的样式
            return {
                height: this.type === 'first-nav' || this.type === 'second-nav' ? '48px' : '32px'
            };
        },
        barStyle() { // 设置页签指示条的样式
            const style = {
                display: 'block',
                width: `${this.barWidth}px`
            };
            if (this.type === 'card') style.display = 'none';
            style.left = `${this.barOffset}px`;
            return style;
        },
        moveBarStyle() {
            const style = {
                display: 'block',
                width: `${this.moveBarWidth}px`
            };
            if (this.type === 'card') style.display = 'none';
            style.left = `${this.moveBarOffset}px`;
            return style;
        }
    },
    props: {
        value: { // 设置默认选中项
            type: [Number, String],
            default: ''
        },
        type: { // 设置页签类型  first-nav：一级页签，  second-nav：二级页签， card：卡片式页签
            validator(value) {
                return ['first-nav', 'second-nav', 'card'].findIndex(item => item === value) > -1;
            }
        },
        data: { // 用户传递的数据
            type: Array,
            default: () => []
        }

    },
    data() {
        return {
            prefixCls: 'p-tabs', // 类名称前缀
            activeKey: 0, // 记录用户点击项
            moveKey: 0,
            barOffset: 0, // 页签指示条距离左边的值
            barWidth: 0, // 指示条的宽度
            moveBarWidth: 0,
            moveBarOffset: 0,
            showMoveBar: false,
            storeWidth: null,
            storeOLeft: null
        };
    },
    watch: {
        type(curVal, oldVal) { // 监听到类型改变时触发
            if (curVal !== oldVal) this.updateBarPos();
        },
        value: { // 监听到默认选中项改变时触发
            handler(curVal) {
                this.activeKey = curVal;
                this.moveKey = curVal;
            },
            immediate: true
        },
        activeKey: {
            handler(curVal, oldVal) { // 监听到当前选中项改变时触发
                if ((this.type !== 'card') && (curVal !== oldVal)) {
                    this.updateBarPos();
                }
            }
        },
        moveKey: {
            handler(curVal, oldVal) { // 监听到当前选中项改变时触发
                if ((this.type !== 'card') && (curVal !== oldVal)) {
                    this.updateMoveBar();
                }
            }
        }
    },
    mounted() {
        if (this.type !== 'card') {
            const ind = this.data.findIndex(item => item.id === this.activeKey),
                index = ind > -1 ? ind : 0,
                div = document.createElement('div');
            let html = '',
                offset = 0;
            div.className = 'p-tabs-nav-container';
            div.style.position = 'absolute';
            div.style.zIndex = '-1000';
            div.style.opacity = '0';

            this.data.forEach(d => {
                html += `<div class="p-tabs-nav-item p-tabs-first-nav-item">${d.name}</div>`;
            });
            html = `<div class=p-tabs-nav-wrap>${html}</div>`;

            div.innerHTML = html;
            document.body.appendChild(div);
            const tabs = div.querySelectorAll('.p-tabs-nav-item'),
                obj = tabs[index];
            const { width } = obj.getBoundingClientRect();
            for (let i = 0; i < index; i++) {
                offset += parseFloat(tabs[i].offsetWidth) + 16;
            }

            if (this.type === 'second-nav') {
                offset = offset + ((width - 40) / 2);
            }
            if (IsIE()) div.removeNode(true);
            else div.remove();
            this.storeWidth = width;
            this.storeOLeft = offset;

            this.updateBarPos();
            this.updateMoveBar();
        }
    },
    methods: {
        /**
         * @description: 一级页签和二级页签点击页签的情况下改变指示条的位置
         * @param：
         * @return:
         * @author: XXD
         * @Date: 2020-02-24 14:31:36
         */
        updateBarPos() {
            this.setBarPosition('click', this.activeKey);
        },
        updateMoveBar() {
            this.setBarPosition('hover', this.moveKey);
        },
        setBarPosition(type, key) {
            let barWidth = 0,
                offsetVal = 0;
            this.$nextTick(() => {
                let offset = 0;
                const gutter = 16;
                const index = this.data.findIndex(item => item.id === key);
                if (index === -1) return;
                if (!this.$refs.navWrap) return;
                const tabs = this.$refs.navWrap.querySelectorAll(`.${this.prefixCls}-nav-item`);

                if (!tabs) return;
                const tab = tabs[index];

                if (this.type === 'first-nav') {
                    if (this.storeWidth) {
                        barWidth = this.storeWidth;
                    } else {
                        barWidth = tab ? parseFloat(tab.offsetWidth) : 0;
                    }
                    this.storeWidth = null;
                } else {
                    barWidth = 40;
                }
                const centerDis = (tab.offsetWidth - barWidth) / 2;
                if (index > 0) {
                    for (let i = 0; i < index; i++) {
                        offset += parseFloat(tabs[i].offsetWidth) + gutter;
                    }
                    if (this.type === 'first-nav') {
                        if (this.storeOLeft) {
                            offsetVal = this.storeOLeft;
                            this.storeOLeft = null;
                        } else {
                            offsetVal = offset;
                        }
                    }
                    if (this.type === 'second-nav') {
                        if (this.storeOLeft) {
                            offsetVal = this.storeOLeft;
                            this.storeOLeft = null;
                        } else {
                            offsetVal = centerDis + offset;
                        }
                    }
                } else {
                    if (this.type === 'first-nav') {
                        offsetVal = 0;
                    } else {
                        offsetVal = centerDis;
                    }
                }

                if (type === 'click') {
                    this.barWidth = barWidth;
                    this.barOffset = offsetVal;
                } else {
                    this.moveBarWidth = barWidth;
                    this.moveBarOffset = offsetVal;
                }
            });
        },

        /**
         * @description: 点击页签时触发事件
         * @param item:点击项
         * @return:
         * @author: XXD
         * @Date: 2020-02-24 14:34:39
         */
        handleClick(item) {
            if (item.disabled) return;
            this.activeKey = item.id;
            this.$emit('change', item);
            this.$emit('input', item.id);
        },
        handleHeaderOver() {
            this.showMoveBar = true;
        },
        handleMouseOver(item) {
            if (item.disabled) return;
            this.moveKey = item.id;
        },
        handleMouseLeave() {
            this.showMoveBar = false;
        },
        // 根据用户选择的类型取class名称
        tabItemCls(item) {
            return [
                `${this.prefixCls}-nav-item`,
                {
                    [`${this.prefixCls}-first-nav-item`]: this.type === 'first-nav',
                    [`${this.prefixCls}-second-nav-item`]: this.type === 'second-nav',
                    [`${this.prefixCls}-card-nav-item`]: this.type === 'card',
                    [`${this.prefixCls}-line-item-active`]: (this.type === 'second-nav' || this.type === 'first-nav') && this.activeKey === item.id,
                    [`${this.prefixCls}-card-item-active`]: this.type === 'card' && this.activeKey === item.id,
                    [`${this.prefixCls}-line-item-disabled`]: (this.type === 'second-nav' || this.type === 'first-nav') && item.disabled,
                    [`${this.prefixCls}-card-item-disabled`]: this.type === 'card' && item.disabled
                }
            ];
        },

        /**
         * @description: 选择卡片式时根据字数设置padding值
         * @param item:每个页签
         * @return:
         * @author: XXD
         * @Date: 2020-02-24 14:37:28
         */
        itemStyle(item) {
            if (this.type === 'card') {
                return {
                    padding: item.name.length > 1 ? '5px 16px' : '5px 8px'
                };
            }
        }
    }
};
</script>

<style lang="stylus">
.p-tabs
    font-size 24px

.p-tabs-nav-container
    .p-tabs-nav-wrap
        position relative

    .p-tabs-nav-level
        border-bottom 1px solid $grey-200

    .p-tabs-nav-level-none
        border 0

    .p-tabs-navbar
        position absolute
        height 2px
        bottom 0
        background $blue-500
        transition left .3s ease-in-out

    .p-tabs-nav-item
        display inline-block
        height 100%
        padding 12px 16px
        margin-right 16px
        line-height 24px
        font-size 16px
        color $grey-900
        cursor pointer
        text-align center
        transition color .3s

    .p-tabs-card-nav-item
        height 32px
        min-width 30px
        line-height 21px
        padding 5px 16px
        margin-right 0
        box-sizing border-box
        border 1px solid $grey-400
        border-right none
        font-size 14px
        color $grey-900
        overflow hidden
        white-space: nowrap
        text-align center
        background $theme
        &:hover
            color $blue-500

    div.p-tabs-card-nav-item:nth-child(3)
        border-top-left-radius 4px
        border-bottom-left-radius 4px

    div.p-tabs-card-nav-item:last-child
        border-top-right-radius 4px
        border-bottom-right-radius 4px
        border-right 1px solid $grey-400

    .p-tabs-line-item-active
        color $blue-500

    .p-tabs-line-item-disabled
        color $grey-400
        cursor not-allowed

    .p-tabs-card-item-active
        color $blue-500
        border 1px solid $blue-500!important
        border-right 1px solid $blue-500
        background $blue-100

    .p-tabs-card-item-disabled
        color $grey-400
        background $grey-200
        cursor not-allowed
        &:hover
            color $grey-400

    .p-tabs-card-item-active + div
        border-left none

</style>
