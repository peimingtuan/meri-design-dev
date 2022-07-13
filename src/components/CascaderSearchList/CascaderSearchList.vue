<template>
<div>
    <div :class="['p-cascader-search-list']" ref="cascader" :style="widthStyle" v-clickoutside="handleClose">
        <div :class="[ 'p-cascader-search-list-header', isFocused && 'p-cascader-search-list-focused']"
            @click="handleOpen"
            @mouseenter="setTipStatus(true)"
            @mouseleave="mouseLeave(false)"
        >
            <Triangle :class="classes"></Triangle>
            <span class="p-cascader-search-list-caption" v-if="caption" ref="captionDom">{{caption}}</span>
            <div class="p-cascader-search-list-fake-input">
                <input
                    ref="cascaderInput"
                    class='p-cascader-search-list-input'
                    v-model="inputText"
                    :style="inputStyle"
                    @focus.stop="handleFocus"
                    @blur="handleBlur"
                    readonly
                    />
                <section class="p-cascader-search-list-placeholder" :style="inputStyle" >
                    <span v-if="storeSelectData.length" :class="[showCountNumber ? 'p-cascader-search-selected' : 'p-cascader-search-normal']">
                        <span v-show="selectAll">
                            全部
                        </span>
                        <span v-show="!selectAll">
                            已选择<span ref="countTag"
                                     :class="[showCountNumber ? 'p-cascader-search-number' : 'p-cascader-search-normal']"
                                     :style="{margin:'0 4px'}"
                            >{{storeSelectData.length}}</span>项
                        </span>
                    </span>
                    <span v-else>
                        {{placeholder}}
                    </span>
                </section>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import PopoverTip from '../PopoverTip';
import clickoutside from './clickoutside';
import Triangle from '../static/iconSvg/triangle.svg';
import Remove from '../static/iconSvg/clear2.svg';
import Options from './dropdown';
import Checkbox from '../Checkbox';
import { cloneDeep } from './utils';

export default {
    name: 'CascaderSearchList',
    data() {
        return {
            inputText: '', // 输入框绑定值
            flatData: [], // 存储拍平后的数据
            query: '', // 用户输入值
            isFocused: false, // 判断触发器是否已获得焦点
            dropInstance: null, // 下拉框实例
            popoverInstance: null,
            fakePlaceholder: '请选择', // 模拟占位符
            showInputText: true, // 控制模拟输入框文字的显示隐藏
            selectIds: '', // 用户所选值对应的ID
            recursionData: [], // 存储对原始数据进行处理后的数据
            storeQueryData: [],
            showCountNumber: false,
            handleData: [], // 存储对原始数据进行深度克隆后的数据
            storeSelectData: [],
            popoverTip: null,
            selectedTipStyle: { bottom: 0, left: 0 },
            tDom: null,
            leftW: 0,
            timer: null,
            timer2: null,
            selectAll: '',
            captionWidth: 0// caption 宽度
        };
    },
    computed: {
        classes() {
            return ['p-cascader-search-list-triangle', this.dropInstance && this.dropInstance.showCascader ? 'p-cascader-search-list-triangle-up' : 'p-cascader-search-list-triangle-down'];
        },
        widthStyle() {
            return {
                width: `${this.width}px`
            };
        },
        inputStyle() {
            return {
                width: this.caption ? `${this.width - (this.caption.length * 14)}px` : `${this.width - 32}px`,
                left: this.caption ? '4px' : 0
            };
        },
        tipText: {
            get() {
                const data = JSON.parse(JSON.stringify(this.storeSelectData));
                if (Array.isArray(data) && data.length) {
                    const len = data.length - 1;
                    let text = '';
                    data.forEach((d, i) => {
                        if (i < len) {
                            text += `${d.title}、`;
                        } else {
                            text += d.title;
                        }
                    });
                    return text;
                }
            }
        }

    },
    components: { Triangle, Checkbox, Remove },
    props: {
        title: {
            type: String,
            default: ''
        },
        // 设置左侧caption
        caption: {
            type: String,
            default: ''
        },
        /**
         * 默认绑定值
         */
        value: {
            type: Array,
            default: () => []
        },
        /**
         * 数据源，格式参照示例说明
         */
        data: {
            type: Array,
            default: () => []
        },
        /**
         * 触发器宽度
         */
        width: {
            type: [String, Number],
            default: 200
        },
        /**
         * 动态获取数据，数据源需标识 loading
         */
        loadData: {
            type: Function
        },
        root: {
            type: Boolean,
            default: true
        },
        /*
        *输入框占位符
        */
        placeholder: {
            type: String,
            default: '请选择'
        },
        // 提示框位置
        tipPlace: {
            type: String,
            default: 'top'
        },

        /**
         * 次级菜单展开方式，可选值为 click 或 hover
         */
        trigger: {
            validator(value) {
                return ['click', 'hover'].indexOf(value) > -1;
            },
            default: 'click'
        },
        transfer: { // 需要监听滚动的dom元素的ID
            type: String,
            default: ''
        }
    },
    directives: {
        clickoutside
    },
    created() {
        if (Array.isArray(this.value) && this.value.length) {
            this.selectDefaultValues(this.value);
        }
        this.fakePlaceholder = this.placeholder;
    },
    mounted() {
        if (this.transfer) {
            let { transfer } = this;
            if (!transfer.startsWith('#')) {
                transfer = `#${transfer}`;
            }
            this.scrollDom = document.querySelector(transfer);
            if (this.scrollDom) {
                this.scrollDom.addEventListener('mousewheel', this.throttleWheel, false);
                this.scrollDom.addEventListener('scroll', this.throttleWheel, false);
            }
        }
        document.addEventListener('mousewheel', this.throttleWheel, false); // 监听滚轮事件关闭弹窗
    },
    watch: {
        data: {
            handler(n, o) {
                if (n !== o) {
                    this.handleData = cloneDeep(this.data); // 对原始数据进行克隆 后续所有操作均在克隆数据上操作  从而不影响用户提供的原始数据
                    this.createFlatData();
                    this.createRecursionData();
                }
            },
            deep: true,
            immediate: true
        },
        value: {
            handler(n, o) {
                // if (JSON.stringify(n) === JSON.stringify(o)) return;
                this.selectIds = n;
                this.selectDefaultValues(n);
                if (this.dropInstance) {
                    this.dropInstance.selectIds = n;
                }
            },
            immediate: true
        },
        'dropInstance.showCascader': {
            handler(n, o) {
                this.showCountNumber = !n;
                this.$emit('focusChange', !n);
                if (this.popoverTip && n) {
                    this.popoverTip.show = false;
                }
            }
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
        }
    },
    methods: {
        // 获取标题宽度
        getCaptionWidth() {
            if (!this.caption) return;
            setTimeout(() => {
                const { captionDom } = this.$refs;
                if (!captionDom) return;
                const scrollWidth = captionDom.textContent.length * 14 + 8;
                if (scrollWidth < 196) {
                    this.captionWidth = scrollWidth;
                } else {
                    this.captionWidth = 196;
                }
            });
        },
        selectDefaultValues(ids) { // 默认选中d
            if (!ids.length) return;
            let items = [];
            const modelIds = [];
            ids.forEach(id => {
                const find = this.flatData.find(item => item.id === id);
                if (find) {
                    items.push(find);
                    // modelIds.push(find.id);
                }
            });
            // 只选择一个父级目录下的数据
            const firstParentId = items[0].parentId,
                newItems = [];
            items.forEach((item, index) => {
                if (item.parentId === firstParentId) {
                    modelIds.push(item.id);
                    newItems.push(item);
                }
            });
            items = newItems;
            this.selectIds = modelIds;
            if (this.caption && this.root) {
                const curCaption = items[0]._title.split('/')[0]; // 显示父级名称
                this.$emit('changeCaption', curCaption);
                // this.$parent.caption = items[0]._title.split('/')[0]
            }
            if (items.length) {
                this.showCountNumber = true;
                this.selectAll = this.flatData.length === items.length;
            }
            this.storeSelectData = items.filter(d => !d.disabled);
            if (this.storeSelectData.length == 0) {
                if (this.popoverTip) {
                    PopoverTip.remove(this.popoverTip);
                    this.popoverTip = null;
                }
            }
        },
        throttleWheel() {
            if (this.timer2) clearTimeout(this.timer2);
            this.timer2 = setTimeout(() => {
                this.wheelListenter();
                this.timer2 = null;
            }, 300);
        },
        wheelListenter() {
            this.$refs.cascaderInput.blur();
            if (this.dropInstance) {
                this.dropInstance.showCascader = false;
            }
            if (this.popoverInstance) {
                this.popoverInstance.showTip = false;
            }
        },
        /**
         * 对数据进行递归处理  生成后续查询 回显所需要的数据结构
         */
        createRecursionData() {
            const selections = [];
            getSelections(this.handleData);
            function getSelections(arr, title, id) {
                for (let i = 0; i < arr.length; i++) {
                    const item = arr[i];
                    item._title = title ? `${title}/${item.title}` : item.title;
                    item._ids = id ? `${id}/${item.id}` : item.id;
                    item.display = item.title;
                    if (item.children && item.children.length) {
                        getSelections(item.children, item._title, item._ids);
                    } else {
                        selections.push({ ...item, query: true });
                    }
                }
            }
            this.recursionData = selections;
        },
        /**
         * 对原始数据进行处理  添加后续操作所需要的一系列属性  对数据进行拍平处理 从而在后续数据查找的操作过程中方便查询而不用每次都递归查询
         */
        createFlatData() {
            const vm = this;
            const flatData = [];
            let key = -1,
                getByFunction;
            this.loadData && typeof this.loadData === 'function' ? getByFunction = true : getByFunction = false;
            function flatDeepData(node, parent) {
                key++;
                node.nodekey = key;
                flatData[key] = node;
                if (parent) {
                    flatData[key].parentId = parent.nodekey;
                    node.parentId = parent.nodekey;
                }
                if (node.children && node.children.length) {
                    node.children.forEach(item => {
                        vm.$set(item, 'checked', 'uncheck');
                        flatDeepData(item, node);
                    });
                }
            }
            this.handleData.forEach(child => {
                child.parentId = -1;
                vm.$set(child, 'checked', 'uncheck');
                child.firstLevel = true;
                flatDeepData(child);
            });
            this.flatData = flatData;
        },

        /**
         * 设置提示框的显示位置
         */
        setTipStatus(bool) {
            if (!this.tipText || this.selectAll) return;
            if (this.popoverTip) {
                if (this.timer) {
                    this.clearTimer();
                } else {
                    this.timerEnter = setTimeout(() => {
                        if (!this.dropInstance || !this.dropInstance.showCascader) {
                            this.popoverTip.content = this.tipText;
                            PopoverTip.resetPosition(this.popoverTip);
                        }
                        clearTimeout(this.timerEnter);
                        this.timerEnter = null;
                    }, 300);
                }
            } else {
                this.timerEnter = setTimeout(() => {
                    const { $refs: { cascader, countTag } } = this;
                    this.popoverTip = PopoverTip({
                        tag: cascader, // 触发器
                        countTag, // 数字标签
                        propsData: {
                            content: this.tipText
                        }
                    }).$on('popoverTipHandle', (str) => {
                        // str 值可选范围 enter leave
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
        /**
         * 点击组件外部时执行关闭弹窗的操作
         */
        handleClose() {
            if (this.dropInstance) {
                this.dropInstance.showCascader = false;
                const data = this.dropInstance.confirmedData;
                if (!data.length) {
                    this.$emit('changeCaption', this.title);
                }
            }
        },
        /**
         * 执行触发器获取焦点时的操作
         */
        handleFocus() {
            this.isFocused = true;
            if (this.dropInstance) {
                if (this.dropInstance.query && this.dropInstance.confirmedData.length) {

                }
            }
        },
        /**
         * 执行触发器失去焦点时的操作
         */
        handleBlur() {
            this.isFocused = false;
        },
        /**
         * 重新设置下拉弹出框在页面上的位置
         */
        resetPanelPosition() {
            let add = 0;
            if (this.root) {
                add = this.dropInstance.showPanel ? 2 : 1;
            } else {
                add = 1;
            }
            let trueWidth = 0;
            if (this.width > 600) {
                trueWidth = 600;
            } else if (this.width < 180) {
                trueWidth = 180;
            } else {
                trueWidth = this.width;
            }
            this.$nextTick(() => {
                Options.resetPosition(this.dropInstance, this.$refs.cascader, document.body, add * Number(trueWidth));
            });
        },

        /**
         * 点击触发器时弹出下拉弹出框
         */
        handleOpen(event) {
            const vm = this;
            if (vm.dropInstance) {
                if (this.dropInstance.showCascader) {
                    this.handleClose();
                    this.$refs.cascaderInput.blur();
                    return false;
                }
                vm.dropInstance.showCascader = true;
                vm.resetPanelPosition();
                if (vm.popoverTip) {
                    vm.popoverTip.show = false;
                }
            } else {
                // 初始化实例
                vm.dropInstance = Options({
                    tag: vm.$refs.cascader,
                    props: {
                        query: vm.query,
                        data: vm.handleData,
                        loadData: vm.loadData,
                        selectIds: vm.selectIds,
                        flatData: vm.flatData,
                        trigger: vm.trigger,
                        recursionData: vm.recursionData,
                        root: vm.root
                    }
                }).$on('change', (option) => { // 处理用户点击某一项时触发的事件
                    if (!option.length) {
                        vm.query = '';
                        vm.inputText = '';
                    }
                }).$on('select', (item) => { // 处理用户点击筛选列表中某一项的触发的事件
                    if (item.parentId && item.parentId === -1) {
                        vm.$emit('change', item._ids && item._ids.split('/'));
                    }
                }).$on('confirm', (items) => { // 处理多选情况下用户点击确认按钮时触发的事件
                    let parentId = null;
                    vm.storeSelectData = items;
                    vm.storeSelectData = items.filter(d => !d.disabled);
                    const ids = [];
                    vm.selectAll = (items.length === vm.data.length) && !vm.root;
                    if (items.length) {
                        items.forEach(item => {
                            ids.push(item.id);
                        });
                        if (vm.root && vm.title) {
                            // vm.caption = items[0]._title.split('/')[0]; // 显示父级名称
                            this.$emit('changeCaption', items[0]._title.split('/')[0]);
                        }
                        parentId = items[0]._ids.split('/')[0];
                        const postData = cloneDeep(items);
                        postData.unshift(parentId);
                        vm.$emit('confirm', postData);
                    }

                    vm.selectIds = ids;
                    vm.$emit('input', ids);
                })
                    .$on('checkWidth', () => { // 下拉框宽度变化时重新设置下拉框的位置
                        vm.resetPanelPosition();
                    })
                    .$on('clearPopover', () => {
                        if (this.popoverTip) {
                            PopoverTip.remove(this.popoverTip);
                            this.popoverTip = null;
                        }
                    });
                vm.dropInstance.$nextTick(() => {
                    vm.dropInstance.showCascader = true;
                });
            }
        }
    },
    beforeDestroy() {
        Options.remove(this.dropInstance);
        if (this.popoverTip) PopoverTip.remove(this.popoverTip);
        document.removeEventListener('mousewheel', this.throttleWheel);
    }
};
</script>
<style lang="stylus">
.p-cascader-search-list
    height 32px
    width 400px
    cursor pointer
    .p-cascader-search-list-header
        width 100%
        height 32px
        position relative
        padding-left 12px
        z-index 10
        border 1px solid $grey-400
        border-radius 4px
        .p-cascader-search-list-caption
            display inline-block
            height 30px
            line-height 30px
            font-size 14px
            float left
            color $grey-500
            max-width: 80px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        .p-cascader-search-list-fake-input
            position absolute
            display inline-block
            float left
            height 30px
            .p-cascader-search-list-placeholder,
            .p-cascader-search-list-input
                position absolute
                left 0
                top 0
                height 30px
                line-height 30px
                font-size 14px
                white-space: nowrap
                overflow hidden
                text-overflow ellipsis
                text-align left
            .p-cascader-search-list-placeholder-input
                color $grey-900
            .p-cascader-search-list-placeholder
                pointer-events none
                color $grey-400
                .p-cascader-search-selected
                    color $grey-900
                .p-cascader-search-number
                    color $blue-500
                .p-cascader-search-normal
                    color $grey-400
            .p-cascader-search-list-input
                border none
                outline none
                color $grey-900
                background transparent
                cursor pointer
        .p-cascader-search-list-triangle
            position absolute
            top 8px
            right 8px
            width 16px
            height 16px
            transform-origin center center
            transform rotate(180deg)
            transition transform 0.3s
            will-change rotate
        .p-cascader-search-list-clear
            position absolute
            width 14px
            height 14px
            right 8px
            top 8px
            path
                fill $grey-300
            &:hover
                path
                    fill $blue-500
                    transition fill .3s
        .p-cascader-search-list-triangle-up
            transform rotate(0deg)
        .p-cascader-search-list-triangle-down
            transform rotate(180deg)
        &:hover
            border 1px solid $blue-500
            transition 0.3s
        .p-select-input-tip
            position: absolute
            padding: 16px 20px
            background-color: $white
            border-radius: 4px
            pointer-events: none
            max-width: 280px
            max-height: 104px
            z-index: 1000
            &:after
                position: absolute
                display: inline-block
                border-style: solid
                border-width: 4px
                width: 0
                height: 0
                transform: rotate(-45deg)
                z-index: 0
                content: ''
            .p-select-input-tip-item
                position: relative
                overflow: hidden
                max-height: 66px
                line-height: 22px
                font-size: 14px
                word-wrap: break-word
                word-break: break-all
            .p-select-input-tip-overflow
                &:after
                    position: absolute
                    right: 0
                    bottom: 0
                    display: inline-block
                    width: 20px
                    height: 22px
                    background-color: $white
                    content: '...'

        .p-select-input-tip-top
            box-shadow: $box-shadow-bottom
            &:after
                bottom: -4px
                left: 58px
                border-color: transparent transparent $white $white
                box-shadow: $box-shadow-min-top
                z-index: -1
        .p-select-input-tip-bottom
            box-shadow: $box-shadow-left
            &:after
                top: -4px
                left: 58px
                border-color: $white $white transparent transparent
                box-shadow: $box-shadow-min-bottom
        .p-select-input-tip-left
            box-shadow: $box-shadow-right
            &:after
                top: 49%
                right: -4px
                border-color: transparent $white $white transparent
                box-shadow: $box-shadow-min-right
        .p-select-input-tip-right
            box-shadow: $box-shadow-top
            &:after
                top: 49%
                left: -4px
                border-color: $white transparent transparent $white
                box-shadow: $box-shadow-min-left
    .p-cascader-search-list-focused
        border 1px solid $blue-500
        box-shadow $box-shadow-blue
        transition 0.3s
        path
            fill $grey-300

</style>
