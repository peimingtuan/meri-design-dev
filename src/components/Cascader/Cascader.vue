<template>
<div>
    <div :class="['p-cascader']" ref="cascader"  :style="widthStyle"  v-clickoutside="handleClose">
        <div :class="[ 'p-cascader-header', isFocused && 'p-cascader-focused']"
            @click="handleOpen"
            @mouseenter="handleMouseEnter(true)"
            @mouseleave="mouseLeave"
            >
            <Triangle :class="classes" v-show="!clearable"></Triangle>
            <Remove class="p-cascader-clear" @click.native.stop="clearAll" v-show="!hideClear && clearable"></Remove>
            <span class="p-cascader-caption" v-if="caption" ref="captionDom">{{caption}}</span>
            <div class="p-cascader-fake-input" :style="inputStyle">
                <input
                    ref="cascaderInput"
                    class='p-cascader-input'
                    v-model="inputText"
                    :readonly="!filterable"
                    :style="{left: caption && '4px', paddingLeft: caption ? 0 : '12px'}"
                    @blur="handleBlur"
                    @input="handleInput" />
                <section  v-if="multiple" class="p-cascader-placeholder" :style="{left: caption && '4px', paddingLeft: caption ? 0 : '12px'}">
                    <span v-show="storeSelectData.length && !query" :class="[showCountNumber ? 'p-cascader-selected' : 'p-cascader-normal']">
                        <span v-show="selectAll">
                            {{allText}}
                        </span>
                        <span v-show="!selectAll">
                            已选择<span ref="countTag" :class="[showCountNumber ? 'p-cascader-number' : 'p-cascader-normal']" :style="{margin:'0 4px'}"
                            >{{selectedLens}}</span>项
                        </span>
                    </span>
                    <span v-show="!storeSelectData.length && !query">
                        {{placeholder}}
                    </span>
                </section>
                <section v-else class="p-cascader-placeholder" :style="{left: caption && '4px', paddingLeft: caption ? 0 : '12px'}">
                    <span v-show="singleSelectedItem && !query" :class="[showCountNumber ? 'p-cascader-selected' : 'p-cascader-normal']">
                        {{
                            (singleSelectedItem && singleSelectedItem.item && singleSelectedItem.item._title)
                                ? singleSelectedItem.item._title
                                : (singleSelectedItem && singleSelectedItem._title)
                                ? singleSelectedItem._title
                                : ''
                        }}
                    </span>
                    <span v-show="!singleSelectedItem && !query">
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
import { cloneDeep } from './utils';
import handleRecursive from './handleRecursive';

export default {
    name: 'Cascader',
    data() {
        return {
            inputText: '', // 输入框绑定值
            flatData: [], // 存储拍平后的数据
            query: '', // 用户输入值
            isFocused: false, // 判断触发器是否已获得焦点
            dropInstance: null, // 下拉框实例
            popoverTip: null,
            recursionData: [], // 存储对原始数据进行处理后的数据
            storeQueryData: [],
            showCountNumber: false,
            handleData: [], // 存储对原始数据进行深度克隆后的数据
            storeSelectData: [],
            selectedTipStyle: { bottom: 0, left: 0 },
            clearable: false, // 控制清除按钮的显示隐藏
            initSelectNum: [],
            singleSelectedItem: null, // 单选时的选中项
            selectAll: false, // 判断是否是全部选中
            showFakePlaceholder: true,
            tDom: null,
            captionW: null,
            leftW: 0,
            timer: null,
            timer2: null,
            captionWidth: 0 // caption 宽度
        };
    },
    mixins: [handleRecursive],
    computed: {
        classes() {
            return ['p-cascader-triangle', this.dropInstance && this.dropInstance.showCascader ? 'p-cascader-triangle-up' : 'p-cascader-triangle-down'];
        },
        widthStyle() {
            return {
                width: `${this.width}px`
            };
        },
        inputStyle() {
            return {
                width: this.caption ? `${this.width - (this.caption.length * 14 + 16 + 28)}px` : `${this.width - 32}px`,
                paddingLeft: this.caption ? 0 : '12px'
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
                return '';
            },
            set(n) {
                return n;
            }
        },
        selectedLens() {
            const {
                storeSelectData, isShowAllChoice, flatData, excludeTop, type, allText
            } = this;
            const len = storeSelectData.length;
            if (len && isShowAllChoice) {
                let items = flatData.filter(item => !item.disabled);
                if (excludeTop && type === 'normal') {
                    items = items.filter(item => item.parentId !== -1);
                }
                this.selectAll = (len === items.length);
                return (len === items.length) ? allText : len;
            }
            return len;
        }

    },
    components: { Triangle, Remove },
    props: {
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
        /**
         * 是否支持多选功能
         */
        multiple: {
            type: Boolean,
            default: false
        },
        /**
         * 是否显示右侧操作面板
         */
        showPanel: {
            type: Boolean,
            default: false
        },
        /**
         * 输入框标题
         */
        caption: {
            type: String,
            default: ''
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
         * 多选情况下的交互类型
         * normal: 常规 子父级联动 父级有半选状态
         * independent: 父级和子级都可以选择，且互不干
         * final:只有子级节点可以选择，此时的父级节不能选择
         * forbidden: 选择了父级，子级勾选，且不可操作
         */
        type: {
            type: String,
            default: 'normal',
            validator: (val) => ['normal', 'independent', 'final', 'forbidden']
        },
        /**
         * 半选状态的被选项是否计入已选择
         */
        all: {
            type: Boolean,
            default: true
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
        // 是否显示触发器上的清空图标
        hideClear: {
            type: Boolean,
            default: false
        },
        // 配置是否显示全选状态
        isShowAllChoice: {
            type: Boolean,
            default: false
        },
        /** *
         * 配置全部选中时输入框的文字
         */
        allText: {
            type: String,
            default: '全部'
        },
        /**
         * 选择结果是否要去除掉最顶级父级
         */
        excludeTop: {
            type: Boolean,
            default: false
        },
        /**
         * 配置是否可以搜索
         */
        filterable: {
            type: Boolean,
            default: true
        },
        transfer: { // 需要监听滚动的dom元素的ID
            type: String,
            default: ''
        }
    },
    directives: {
        clickoutside
    },
    mounted() {
        /**
         * 如果有默认选项 则进行回显
         */
        if (this.value.length && this.value) {
            if (this.multiple) {
                this.calcAllCheckStatusByValue(this.value, 'init');
            } else {
                this.createPath();
            }
        }
        if (this.transfer) {
            let { transfer } = this;
            if (!transfer.startsWith('#')) {
                transfer = `#${transfer}`;
            }
            this.scrollDom = document.querySelector(transfer);
            if (this.scrollDom) {
                this.scrollDom.addEventListener('mousewheel', this.hidePanel, false);
                this.scrollDom.addEventListener('scroll', this.hidePanel, false);
            }
        }
        document.addEventListener('mousewheel', this.hidePanel, false);
        const vm = this;
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
                if (JSON.stringify(n) !== JSON.stringify(o)) {
                    this.calcAllCheckStatusByValue(n);
                    if (this.dropInstance) {
                        this.dropInstance.selectIds = n;
                    }
                }
            }
        },
        query(n, o) {
            if (n === o) return;
            this.showFakePlaceholder = !n;
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
                if (scrollWidth < 80) {
                    this.captionWidth = scrollWidth;
                } else {
                    this.captionWidth = 80;
                }
            });
        },
        hidePanel() {
            if (this.dropInstance) {
                this.dropInstance.showCascader = false;
                this.dropInstance.query = '';
                // 滚动事件触发收起面板使触发器失去焦点
                if (this.$refs.cascaderInput) {
                    this.$refs.cascaderInput.blur();
                    this.query = '';
                    this.inputText = '';
                }
            }
        },
        calcAllCheckStatusByValue(ids, type) {
            if (!ids.length) { // 清空操作
                this.flatData.forEach(option => {
                    option.checked = 'uncheck';
                });
                return;
            }
            let selectedItems = [];

            if (type === 'init') {
                ids.forEach(id => {
                    const findItem = this.flatData.find(option => option.id === id);
                    if (findItem) {
                        this.handleItemStatus(this, findItem);
                        if (this.type === 'forbidden') {
                            if (!findItem.forbidden) selectedItems.push(findItem);
                        }
                    }
                });
                this.flatData.forEach(option => {
                    if (option.checked === 'checked') {
                        selectedItems.push(option);
                    }
                });
            } else {
                ids.forEach(id => {
                    const findItem = this.flatData.find(option => option.id === id);
                    if (findItem) {
                        if (this.type === 'forbidden') {
                            if (!findItem.forbidden) selectedItems.push(findItem);
                        } else {
                            selectedItems.push(findItem);
                        }
                    }
                });
            }

            if (this.type === 'normal' && this.excludeTop) {
                selectedItems = selectedItems.filter(item => item.parentId !== -1);
            }
            this.inputText = '';
            this.query = '';
            this.initSelectNum = selectedItems;
            this.storeSelectData = selectedItems;
            if (selectedItems.length) {
                this.showCountNumber = true;
                if (this.isShowAllChoice) {
                    this.checkAllSelectStatus(selectedItems);
                }
            }
        },
        /**
         * 对数据进行递归处理  生成后续查询 回显所需要的数据结构
         */
        createRecursionData() {
            const selections = [];
            function getSelections(arr, title, id) {
                for (let i = 0; i < arr.length; i++) {
                    const item = arr[i];
                    item._title = title ? `${title}/${item.title}` : item.title;
                    item._ids = id ? `${id}/${item.id}` : item.id;
                    item.display = item._title;
                    if (item.children && item.children.length) {
                        getSelections(item.children, item._title, item._ids);
                    } else {
                        selections.push({ ...item, query: true });
                    }
                }
            }
            getSelections(this.handleData);
            this.recursionData = selections;
        },
        /**
         * 对原始数据进行处理  添加后续操作所需要的一系列属性  对数据进行拍平处理 从而在后续数据查找的操作过程中方便查询而不用每次都递归查询
         */
        createFlatData() {
            const vm = this;
            const flatData = [];
            let key = -1;
            // this.loadData && typeof this.loadData === 'function' ? getByFunction = true : getByFunction = false;
            const getByFunction = !!(this.loadData && typeof this.loadData === 'function');
            function flatDeepData(node, parent) {
                key++;
                node.nodekey = key;
                flatData[key] = node;
                if (parent) {
                    flatData[key].parentId = parent.nodekey;
                    node.parentId = parent.nodekey;
                }
                if (vm.type) {
                    vm.$set(node, 'checked', 'uncheck');
                    vm.$set(node, 'active', false);
                }
                if (getByFunction) {
                    vm.$set(node, 'loading', false);
                }
                if (vm.type === 'forbidden') {
                    vm.$set(node, 'forbidden', false);
                }
                if (node.children && node.children.length) {
                    if (vm.type === 'final') {
                        vm.$set(node, 'selectCheckbox', false);
                    }
                    node.children.forEach(item => {
                        flatDeepData(item, node);
                    });
                } else {
                    if (vm.type === 'final') {
                        vm.$set(node, 'selectCheckbox', true);
                    }
                }
            }
            this.handleData.forEach(child => {
                child.parentId = -1;
                if (this.type) {
                    vm.$set(child, 'checked', 'uncheck');
                    vm.$set(child, 'active', false);
                }
                if (vm.type === 'forbidden') {
                    vm.$set(child, 'forbidden', false);
                }
                if (getByFunction) {
                    vm.$set(child, 'loading', false);
                }
                if (vm.type === 'final') {
                    if (child.children && child.children.length) {
                        vm.$set(child, 'selectCheckbox', false);
                    } else {
                        vm.$set(child, 'selectCheckbox', true);
                    }
                }
                flatDeepData(child);
            });
            this.flatData = flatData;
        },
        /**
         * 根据用户所传入的默认值来生成格式名称用于回显
         */
        createPath() {
            let index = -1;
            const path = [];
            this.query = '';
            const _this= this;
            function createPath(data, arr) {
                index++;
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    console.log(item.id,arr[index],123)
                    if (item.id === arr[i]) {
                        path.push(item.title);
                        _this.singleSelectedItem = item;
                        _this.showCountNumber = true;
                    }
                    if (item.children) {
                        createPath(item.children, arr);
                    }
                }
            }
            createPath(this.handleData, this.value);
        },
        /**
         * 控制触发器中清除按钮的显示隐藏
         */
        handleMouseLeave(bool) {
            if (this.selectAll) return; // 全部选中则不弹出提示框
            this.clearable = false;
            if (this.popoverTip) this.popoverTip.show = false;
        },
        /**
         * 控制触发器中清除按钮的显示隐藏
         */
        handleMouseEnter(bool) {
            if (this.selectAll) return; // 全部选中则不弹出提示框
            if (!this.hideClear) {
                if (this.multiple) {
                    if (this.storeSelectData.length) {
                        this.clearable = true;
                    }
                } else {
                    if (this.singleSelectedItem) this.clearable = true;
                }
                // if (this.dropInstance && this.dropInstance.showCascader) {
                //     this.clearable = false;
                // }
            }
            this.setTipStatus(bool);
        },
        /**
         * 设置提示框的显示位置
         */
        setTipStatus(bool) {
            if (!this.tipText || !this.multiple) return;
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
                    if (!this.dropInstance || !this.dropInstance.showCascader) {
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
                    }
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
                this.clearable = false;
                return;
            }
            this.clearable = false;
            if (this.popoverTip) this.setTimer();
        },

        /**
         * 点击清除按钮时触发的清除所有的操作
         */
        clearAll() {
            if (this.multiple) { // 多选
                if (this.popoverTip) {
                    this.popoverTip.show = false;
                    PopoverTip.remove(this.popoverTip);
                }
                setTimeout(() => {
                    if (this.multiple) {
                        if (this.dropInstance) {
                            this.dropInstance.selectIds = [];
                        } else {
                            this.calcAllCheckStatusByValue([]);
                        }
                        this.storeSelectData = [];
                    } else {
                        if (this.dropInstance) {
                            this.dropInstance.clearData();
                        }
                    }
                }, 0);
                this.clearable = false;
                this.tipText = '';
                this.query = '';
                this.inputText = '';
                if (this.popoverTip) {
                    PopoverTip.remove(this.popoverTip);
                    this.popoverTip = null;
                }
                this.$emit('input', []);
                if (this.dropInstance) {
                    this.dropInstance.showCascader = false;
                }
            } else {
                this.singleSelectedItem = null;
                if (this.dropInstance) {
                    this.dropInstance.selectIds = [];
                    this.dropInstance.clearData();
                    this.dropInstance.showCascader = false;
                }
                // this.dropInstance && this.dropInstance.clearData()
                this.inputText = '';
                this.query = '';
                this.clearable = false;
            }
        },

        /**
         * 点击组件外部时执行关闭弹窗的操作
         */
        handleClose() {
            if (this.dropInstance) {
                this.dropInstance.showCascader = false;
                if (!this.multiple) {
                    if (this.query) {
                        this.dropInstance.query = '';
                        this.inputText = '';
                        this.query = '';
                        this.dropInstance.queryItems = [];
                        this.dropInstance.selectIds = [];
                    }
                } else {
                    this.query = '';
                    this.inputText = '';
                    this.dropInstance.query = '';
                }
            }
        },
        /**
         * 执行触发器获取焦点时的操作
         */
        // handleFocus() {
        //     this.isFocused = true;
        //     if (this.dropInstance) {
        //         if (this.dropInstance.query && this.dropInstance.confirmedData.length) {
        //
        //         }
        //     }
        // },
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
            const add = this.showPanel ? 1 : 0;
            let trueWidth = 0;
            if (this.width > 600) {
                trueWidth = 600;
            } else if (this.width < 180) {
                trueWidth = 180;
            } else {
                trueWidth = this.width;
            }
            this.$nextTick(() => {
                Options.resetPosition(this.dropInstance, this.$refs.cascader, document.body, (this.depth + add) * trueWidth);
            });
        },
        /**
         * 点击触发器时弹出下拉弹出框
         */
        handleOpen(event) {
            if (this.dropInstance) {
                if (this.dropInstance.showCascader) {
                    this.handleClose();
                    this.handleBlur();
                    this.$refs.cascaderInput.blur();
                    return;
                }
                this.dropInstance.showCascader = true;
                this.resetPanelPosition();
                if (this.popoverTip) {
                    this.popoverTip.show = false;
                }
            } else {
                // 初始化实例
                this.dropInstance = Options({
                    tag: this.$refs.cascader,
                    props: {
                        query: this.query,
                        data: this.handleData,
                        loadData: this.loadData,
                        selectIds: this.value,
                        flatData: this.flatData,
                        type: this.type,
                        multiple: this.multiple,
                        showPanel: this.showPanel,
                        trigger: this.trigger,
                        recursionData: this.recursionData,
                        all: this.all,
                        excludeTop: this.excludeTop
                    }
                }).$on('change', (option) => { // 处理用户点击某一项时触发的事件
                    if (this.multiple) {
                        if (!option.length) {
                            this.query = '';
                            this.inputText = '';
                        }
                    } else {
                        this.change(option);
                    }
                }).$on('select', (item) => { // 处理用户点击筛选列表中某一项的触发的事件
                    if (typeof this.loadData === 'function') {
                        this.dropInstance.activeKey = item.id;
                        this.dropInstance.refillCasscader(this.handleData, this.dropInstance, [item.id]);
                    } else {
                        if (!this.multiple) {
                            this.$emit('input', item._ids && item._ids.split('/'));
                            this.dropInstance.showCascader = false;
                        }
                    }
                    this.$emit('change', item._ids && item._ids.split('/'));
                }).$on('confirm', (items) => { // 处理多选情况下用户点击确认按钮时触发的事件
                    this.query = '';
                    this.inputText = '';
                    this.storeSelectData = items;
                    if (this.isShowAllChoice) {
                        this.checkAllSelectStatus(items);
                    }
                    const ids = [];
                    items.forEach(item => {
                        ids.push(item.id);
                    });
                    this.$emit('confirm', items);
                    this.$emit('input', ids);
                })
                    .$on('checkWidth', (depth) => { // 下拉框宽度变化时重新设置下拉框的位置
                        this.depth = depth;
                        this.resetPanelPosition();
                    })
                    .$on('clearPopover', () => {
                        if (this.popoverTip) {
                            PopoverTip.remove(this.popoverTip);
                            this.popoverTip = null;
                        }
                    });
                if (this.initSelectNum.length && this.value.length) {
                    this.dropInstance.confirmedData = cloneDeep(this.initSelectNum);
                    this.dropInstance.selectedItems = cloneDeep(this.initSelectNum);
                }
                setTimeout(() => {
                    this.checkWidth();
                }, 2000);
                this.$nextTick(() => {
                    this.dropInstance.$nextTick(() => {
                        // this.checkWidth()
                        this.resetPanelPosition();
                        this.dropInstance.showCascader = true;
                        this.clearTimer();
                    });
                });
            }
        },
        checkWidth() {
            let depth = 0;
            function findChildComponent(parent) {
                parent.forEach(comp => {
                    if (comp.$options.name === 'cascaPanel') {
                        depth++;
                        if (comp.$children) {
                            findChildComponent(comp.$children);
                        }
                    }
                });
            }
            findChildComponent(this.$children);
            this.depth = depth;
        },
        checkAllSelectStatus(options) {
            const len = options.length;
            if (len) {
                let items = this.flatData.filter(item => !item.disabled);
                if (this.excludeTop && this.type === 'normal') {
                    items = items.filter(item => item.parentId !== -1);
                }
                if (len === items.length) { // 全部选中的情况
                    this.selectAll = true;
                } else { // 部分选中的情况
                    this.selectAll = false;
                }
            }
        },
        /**
         * 用户点击下拉框中某一项进行的操纵
         */
        change(option) {
            const item = option.flag ? option.item : option;
            const ids = item._ids.split('/');
            this.query = '';
            this.singleSelectedItem = option;
            this.$emit('change', ids);
            this.$emit('input', ids);
            this.dropInstance.selectIds = ids;
            if (option.flag) {
                this.dropInstance.showCascader = false;
            } else {
                if (!item.children || !item.children.length) {
                    this.dropInstance.showCascader = false;
                }
            }
        },
        /**
         * 处理用户输入
         */
        handleInput(event) {
            this.query = event.target.value || event.data || '';
            if (this.dropInstance) {
                this.dropInstance.query = this.query;
                if (this.query) {
                    this.searchContent();
                } else {
                    this.dropInstance.queryItems = [];
                    this.dropInstance.data = this.handleData;
                }
            }
        },
        /**
         * 根据用户输入从原始数据中筛选出匹配项
         */
        searchContent() {
            this.createRecursionData();
            const findItems = this.recursionData.filter(item => (item._title ? item._title.indexOf(this.query) > -1 : false)).map(item => {
                item.display = item.display.replace(new RegExp(this.query, 'g'), `<span class="p-cascader-highlight">${this.query}</span>`);
                return item;
            });
            this.dropInstance.selectedItems.forEach(item => {
                findItems.forEach(option => {
                    if (option.id === item.id) {
                        option.checked = item.checked;
                    }
                });
            });
            this.dropInstance.queryItems = findItems;
        }
    },
    beforeDestroy() {
        Options.remove(this.dropInstance);
        if (this.popoverTip) PopoverTip.remove(this.popoverTip);
        document.removeEventListener('mousewheel', this.hidePanel);
    }
};
</script>
<style lang="stylus">
.p-cascader
    height 32px
    width 400px
    cursor pointer
    .p-cascader-header
        width 100%
        height 32px
        position relative
        z-index 10
        border 1px solid $grey-400
        border-radius 4px
        .p-cascader-caption
            display inline-block
            height 30px
            line-height 30px
            font-size 14px
            padding-left 12px
            float left
            color $grey-500
            max-width: 196px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        .p-cascader-fake-input
            position relative
            display inline-block
            float left
            height 30px
            text-overflow ellipsis
            white-space nowrap
            overflow hidden
            .p-cascader-placeholder, .p-cascader-input
                position absolute
                left 0
                top 0
                height 30px
                line-height 30px
                color $grey-400
                padding-left 12px
                font-size 14px
                white-space: nowrap
                overflow hidden
                text-overflow ellipsis
            .p-cascader-placeholder-input
                color $grey-900
            .p-cascader-placeholder
                pointer-events none
                .p-cascader-selected
                    color $grey-900
                .p-cascader-number
                    color $blue-500
                .p-cascader-normal
                    color $grey-400
            .p-cascader-input
                border none
                outline none
                color $grey-900
                background transparent
                cursor pointer
        .p-cascader-triangle
            position absolute
            top 8px
            right 8px
            width 16px
            height 16px
            transform-origin center center
            transform rotate(180deg)
            transition transform 0.3s
            will-change rotate
        .p-cascader-clear
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
        .p-cascader-triangle-up
            transform rotate(0deg)
        .p-cascader-triangle-down
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
            z-index: 100
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
    .p-cascader-focused
        border 1px solid $blue-500
        box-shadow $box-shadow-blue
        transition 0.3s
        path
            fill $grey-300
    .p-cascader-highlight
        color $blue-500
</style>
