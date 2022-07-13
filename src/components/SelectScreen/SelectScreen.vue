<template>
    <div :class="['p-select-screen', dropBoxStatus&&'p-select-screen-none']" @click.stop="openDropBox" ref="selectScreen">
        <!--
        <section class="p-select-screen-title" v-if="status.includes('single')">：{{singleName}}</section>
        <section
                v-else
                class="p-select-screen-title"
                ref="refTrigger"
                @mouseenter="popoverTipEnter"
                @mouseleave="mouseLeave"
        >：已选择<span class="p-select-screen-num" ref="countTag">{{selectedData.length}}</span>项</section>
        -->
        <template>
            <i v-if="icon === 'triangle'"
               :class="[
                   'p-select-screen-svg',
                   !dropBoxStatus&&'p-select-triangle-open',
                   activeSvg&&'p-select-screen-svg-active'
               ]"
               ref="refTrigger"
               @mouseenter="popoverTipEnter"
               @mouseleave="mouseLeave"
            ><TriangleSvg /></i>
            <i v-else
               :class="['p-select-screen-svg', activeSvg&&'p-select-screen-svg-active']"
               ref="refTrigger"
               @mouseenter="popoverTipEnter"
               @mouseleave="mouseLeave"
            ><FilterSvg /></i>
        </template>
        <div class="p-select-screen-shade" @click.stop v-if="dropBoxStatus"></div>
    </div>
</template>

<script>
import FilterSvg from '../static/iconSvg/filter.svg';
import TriangleSvg from '../static/iconSvg/triangle.svg';

import DropPanel from './depend/dropPanel';
import PopoverTip from '../PopoverTip';

export default {
    name: 'SelectScreen',
    components: { FilterSvg, TriangleSvg },
    inject: ['tableLayoutMain'],
    props: {
        data: {
            type: Array,
            default: () => []
        },
        // 筛选4种状态 【'single', 'multiple', 'singleSearch', 'multipleSearch'】
        status: {
            type: String,
            default: 'single'
        },
        // 选中的id
        selectedId: {
            type: String,
            default: ''
        },
        // 选中的name
        selectName: {
            type: String,
            default: ''
        },
        // screen triangle
        icon: {
            type: String,
            default: 'screen'
        }
    },
    data() {
        return {
            dropBoxStatus: false, // 下拉列表展开状态
            dropData: [], // 数据列表
            singleName: '全部',
            choiceId: '', // 选中的id
            selectedData: [] // 多选——选中的数据
        };
    },
    computed: {
        // 选中的name
        selectedName() {
            const { status, singleName, selectedData } = this;
            if (status.includes('single')) return singleName;
            const selectedNameArr = [];
            selectedData.forEach(d => {
                selectedNameArr.push(d.name);
            });
            return selectedNameArr.toString().replace(/,/g, '、');
        },
        activeSvg() {
            const {
                data, status, selectedId, selectedData,
                icon
            } = this;
            if (icon === 'triangle') return;
            if (status.includes('single')) {
                const { id = '' } = data[0];
                return selectedId && selectedId !== id;
            }
            if (status.includes('multiple')) {
                return selectedData.length > 0;
            }
            return false;
        }
    },
    watch: {
        data: {
            handler(n) {
                this.setInit(this.selectedId, JSON.parse(JSON.stringify(n)));
            },
            deep: true
        },
        // 监听选中的id改变
        selectedId(n, o) {
            if (n === o || n === this.choiceId) return;
            this.setInit(n, JSON.parse(JSON.stringify(this.data)));
        }
    },
    mounted() {
        this.setInit(this.selectedId, JSON.parse(JSON.stringify(this.data)));
    },
    methods: {
        // 初始化设置数据
        setInit(id = '', data = []) {
            const { status } = this;
            this.choiceId = id;
            if (status.includes('single')) {
                const { name = '' } = data.find(d => d.id === id) || {};
                this.singleName = name;
            } else {
                this.selectedData = data.filter(d => {
                    if (d.checked === 'checked') return d;
                    return null;
                });
            }
            this.dropData = data;
        },
        // 监听滚动条滚动
        listenScroll() {
            const { dropBoxStatus } = this;
            // if (dropBoxStatus) DropPanel.resetPosition(this.dropPanel);
            if (dropBoxStatus) this.setDropdownStatus(false);
        },
        // 展开下拉列表
        openDropBox() {
            if (this.popoverTip) this.popoverTip.show = false;
            const { dropBoxStatus } = this;
            if (dropBoxStatus) {
                this.setDropdownStatus(false);
                return;
            }
            if (this.dropPanel) {
                this.setDropdownStatus(true);
            } else {
                const {
                    dropData: data, status, selectedId, selectName,
                    $refs: { selectScreen },
                    icon
                } = this;
                this.dropPanel = DropPanel({
                    tag: selectScreen,
                    propsData: {
                        parent: this,
                        data,
                        status,
                        selectedId,
                        selectName,
                        icon
                    }
                }).$on('change', (id, selectedData) => {
                    this.dropChange(id, selectedData);
                    this.setDropdownStatus(false);
                }).$on('cancel', dropdownStatus => {
                    this.setDropdownStatus(dropdownStatus);
                });

                this.dropPanel.$nextTick(() => {
                    this.setDropdownStatus(true);
                    if (this.popoverTip) this.popoverTip.show = false;
                });

                // 监听滚动条滚动
                const parentScroll = this.tableLayoutMain.$refs.tableLayoutMain;
                if (parentScroll) parentScroll.addEventListener('scroll', this.listenScroll, false);
                window.addEventListener('scroll', this.listenScroll, false);
                this.$once('hook:beforeDestroy', () => {
                    this.setDropdownStatus(false);
                    DropPanel.remove(this.dropPanel);
                    if (parentScroll) parentScroll.removeEventListener('scroll', this.listenScroll);
                    window.removeEventListener('scroll', this.listenScroll);
                });
            }
        },
        // 单选选中的值改变
        dropChange(id, selectedData) {
            const { status, icon } = this;
            this.choiceId = id;
            if (this.dropPanel) this.dropPanel.selectedId = id;
            if (status.includes('single')) this.singleName = selectedData.name;
            else this.selectedData = selectedData;
            this.$emit('change', icon, id, selectedData);
        },

        // 设置下拉状态
        setDropdownStatus(status) {
            this.dropBoxStatus = status;
            if (this.dropPanel) {
                this.dropPanel.dropBoxStatus = status;
                if (status) DropPanel.resetPosition(this.dropPanel);
            }
        },

        // 设置popover相关
        popoverTipEnter() {
            const { dropBoxStatus, selectedName } = this;
            if (dropBoxStatus || !selectedName) return;
            if (this.popoverTip) {
                if (this.timer) this.clearTimer();
                else {
                    this.timerEnter = setTimeout(() => {
                        if (this.dropBoxStatus) return;
                        this.popoverTip.content = selectedName;
                        PopoverTip.resetPosition(this.popoverTip);
                        clearTimeout(this.timerEnter);
                        this.timerEnter = null;
                    }, 300);
                }
            } else {
                this.timerEnter = setTimeout(() => {
                    const { $refs: { refTrigger } } = this;
                    this.popoverTip = PopoverTip({
                        tag: refTrigger, // 触发器
                        countTag: refTrigger, // 数字标签
                        propsData: {
                            content: selectedName
                        }
                    }).$on('popoverTipHandle', (str) => {
                        // str 值可选范围 enter leave
                        if (str === 'enter') this.clearTimer();
                        else this.setTimer();
                    });

                    this.popoverTip.$nextTick(() => {
                        if (this.dropBoxStatus) return;
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
        }
    },
    beforeDestroy() {
        // 组件销毁前重置状态表
        if (this.popoverTip) PopoverTip.remove(this.popoverTip);
    }
};
</script>

<style lang="stylus">
.p-select-screen
    position relative
    display inline-flex
    align-items center
    height 20px
    line-height @height
    font-size 0
    cursor pointer
.p-select-screen-none
    pointer-events none
.p-select-screen-title
    font-size 12px
    color $grey-900
.p-select-screen-num
    padding-left 4px
    padding-right 4px
    color $blue-500
.p-select-screen-svg
    margin-left 8px
    height 20px
    svg
        vertical-align middle
        width 16px
        height 16px
        transition transform .3s
        path
            transition fill .3s
    &:hover
        svg
            path
                fill $blue-500
.p-select-triangle-open
    svg
        transform rotate(180deg)
.p-select-screen-svg-active
    svg
        path
            fill $blue-500
.p-select-screen-shade
    position absolute
    width 100%
    height 100%
    pointer-events auto
    opacity 0
    cursor pointer

</style>
