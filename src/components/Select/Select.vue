<template>
    <div v-clickoutside="handleClose" :class="classes" ref='pSelect'>
        <div :disabled="disabled"
            :class="headerClass"
            @click="handleOpen"
            @mouseenter.stop="handleHideShowClearIcon(true)"
            @mouseleave.stop="mouseLeave"
            :style="headerStyle"
            @scroll.stop
            @wheel.stop>
            <span class="p-select-caption" ref="captionDom" v-if="caption" >{{caption}}</span>
            <span class="p-select-selected-box" :style="{paddingLeft: caption && '4px'}">
                <!--
                -->
                <input
                    :class="[this.prefixCls + '-input', disabled&&'p-select-disabled-input', hideClear&&'p-select-cursor-input']"
                    :style="placeholderStyle"
                    :disabled='disabled'
                    @blur="handleBlur"
                    @focus.stop="handleFocus"
                    :readonly="isReadOnly"
                    ref="input"
                    autocomplete="off"
                    v-model="selectedItem"
                    @input="divInput"
                />
                <!--
                <span :contenteditable="!isReadOnly && !disabled"
                     tabindex="-1"
                    :class="[this.prefixCls + '-input', disabled&&'p-select-disabled-input', hideClear&&'p-select-cursor-input']"
                    :style="placeholderStyle"
                    :disabled='disabled'
                    @focus.stop="handleFocus"
                      @blur="handleBlur"
                    :readonly="isReadOnly"
                    ref="input"
                    @input="divInput"
                ></span>
                -->
                <section v-if="multiple" class="p-select-fake-placeholder" :style="{paddingLeft: caption&&'0'}">
                    <span v-show="confirmedItems.length && !inputVal && !query" :class="[showCountNumber ? 'p-select-selected' : 'p-select-normal']">
                        <span>
                            已选择<span ref="countTag" :class="[showCountNumber ? 'p-select-number' : 'p-select-normal']" :style="{margin:'0 4px'}"
                        >{{ confirmedItems.length}}</span>项
                        </span>
                    </span>
                    <span v-show="!confirmedItems.length && !inputVal && !query">
                        {{placeholder}}
                    </span>
                </section>
                <section v-else class="p-select-fake-placeholder" :style="{paddingLeft: caption&&'0', left: caption && '4px'}">
                    <span v-show="currentSelectedItem && !inputVal && !query">
                        <span :class="[
                                (currentSelectedItem && currentSelectedItem.name && showCountNumber)
                                ? 'p-select-selected'
                                : 'p-select-normal'
                            ]"
                        >{{(currentSelectedItem && currentSelectedItem.name) && currentSelectedItem.name}}</span>
                    </span>
                    <span v-show="!currentSelectedItem && !inputVal && !query">
                        {{placeholder}}
                    </span>
                </section>
            </span>
            <Triangle v-show="!clearable" :class="triangleClass"></Triangle>
            <Remove class="p-select-clear" @click.native.stop="clearAll" v-show="!hideClear && clearable"></Remove>
            <span class="p-trigger-error-text"
                  v-if="errorShow"
            >{{errorText}}</span>
        </div>
    </div>
</template>
<script>
import PopoverTip from '../PopoverTip';
import Triangle from '../static/iconSvg/triangle.svg';
import Remove from '../static/iconSvg/clear2.svg';
import clickoutside from './clickoutside';
import Options from './dropdown';
import { zIndexIncrease, zIndex } from './dispatchZindex';

export default {
    name: 'Select',
    inheritAttrs: false,
    directives: {
        clickoutside
    },
    components: {
        Triangle,
        Remove
    },
    computed: {
        classes() {
            return [
                `${this.prefixCls}`,
                {
                    [`${this.prefixCls}-multiple`]: this.multiple
                }
            ];
        },
        headerClass() {
            return [
                'p-select-header',
                {
                    'p-select-header-radius': this.radius,
                    'p-select-header-focused': this.focused && !this.disabled,
                    'p-select-header-disabled': this.disabled,
                    'p-trigger-error': this.errorShow
                }
            ];
        },
        headerStyle() {
            return {
                width: `${this.width}px`
            };
        },
        triangleClass() {
            return ['p-select-triangle', this.dropInstance && this.dropInstance.dropVisible ? 'p-select-triangle-up' : 'p-select-triangle-down'];
        },
        placeholderStyle() {
            if (this.caption) {
                const code = this.caption.charCodeAt(this.caption.length - 1);
                if (code === 65306) {
                    return {
                        paddingLeft: '0px',
                        // transform: 'translateX(-2px)',
                        cursor: this.disabled ? 'not-allowed' : 'pointer'
                    };
                }
                return {
                    paddingLeft: code === 58 ? '0px' : '0px', // 中文冒号还是英文冒号
                    cursor: this.disabled ? 'not-allowed' : 'pointer'
                };
            }
            return {};
        },
        tipText: {
            get() {
                const data = JSON.parse(JSON.stringify(this.confirmedItems));
                const len = data.length - 1;
                let text = '';
                data.forEach((d, i) => {
                    if (i < len) {
                        text += `${d.name}、`;
                    } else {
                        text += d.name;
                    }
                });
                return text;
            }
        },
        fakePlaceholder: {
            get() {
                if (this.multiple) {
                    const len = this.confirmedItems.length;
                    if (len) {
                        if (this.dropInstance && this.dropInstance.dropVisible) {
                            return `已选择<span style="margin:0 4px">${len}</span>项`;
                        }
                        return `<span class="p-select-normal">已选择<span class="p-select-highlight p-select-highlight-margin">${len}</span>项</span>`;
                    }
                    return this.placeholder;
                }
                if (this.currentSelectedItem) {
                    const { name } = this.currentSelectedItem;
                    if (this.dropInstance && this.dropInstance.dropVisible) {
                        return name;
                    }
                    return `<span class="p-select-normal">${name}</span>`;
                }
                return this.placeholder;
            },
            set(val) {
                return val;
            }
        }
    },
    watch: {
        query(n, o) {
            if (n === o) return;
            if (!n && this.dropInstance) {
                this.selectedItem = '';
                // this.$refs.input.innerText = '';
                this.inputVal = null;
            }
        },
        selectedItem(n, o) {
            if (n === o) return;
            if (n.trim() !== '') {
                this.inputVal = true;
            } else {
                this.inputVal = false;
            }
            this.handleInput(n);
        },
        /**
         * 下拉列表数据
         */
        selectdata: {
            handler(n, o) {
                if (n !== o) {
                    this.dropData = this.cloneDeep(n);
                    this.dropData.forEach(item => {
                        this.$set(item, 'selected', false);
                    });
                    this.defaultSelect();
                    if (this.dropInstance) {
                        this.dropInstance.data = this.dropData;
                        this.resetDropPanelPos();
                    }
                }
            },
            deep: true,
            immediate: true
        },

        'dropInstance.dropVisible': {
            handler(n, o = false) {
                if (n !== o) {
                    this.showCountNumber = !n;
                    this.$emit('focusChange', !n);
                    if (this.popoverTip && n) {
                        this.popoverTip.show = false;
                    }
                }
            }
        },
        /**
         * 默认选中项
         */
        value: {
            handler(n, o) {
                if (n !== o) {
                    this.defaultSelect();
                    if (this.dropInstance) {
                        this.dropInstance.value = n;
                    }
                }
            },
            immediate: true
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
    props: {
        placeholder: {
            type: String,
            default: '请选择'
        },
        /**
         * 是否多选
         */
        multiple: {
            type: Boolean,
            default: false
        },
        count: {
            type: Boolean,
            default: false
        },
        /**
         * 绑定的v-model值
         */
        value: {
            type: [String, Number, Array],
            default: ''
        },
        /**
         * 下拉列表数据
         */
        selectdata: {
            type: Array,
            default: () => []
        },
        /**
         * 宽度
         */
        width: {
            type: [String, Number],
            default: '180'
        },
        /**
         * 是否设置圆角
         */
        radius: {
            type: Boolean,
            default: false
        },
        /** 是否设置标题 */
        caption: {
            type: String,
            default: ''
        },
        /** 是否是禁止选中 * */
        disabled: {
            type: Boolean,
            default: false
        },
        // 提示框位置
        tipPlace: {
            type: String,
            default: 'top'
        },
        // 是否显示触发器上的清空图标
        hideClear: {
            type: Boolean,
            default: false
        },
        transfer: { // 需要监听滚动的dom元素的ID
            type: String,
            default: ''
        },
        isReadOnly: {
            type: Boolean,
            default: false
        },
        // 下拉列表容纳最大条数
        maxCount: {
            type: [String, Number],
            default: 5
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
    data() {
        return {
            prefixCls: 'p-select',
            selectedItems: [], // 多选条件下被选项集合
            selectedItem: '', // 单选条件下被选选
            selectedItemsText: '', // 多选条件下已选项提示框
            dropVisible: false, // 控制下拉列表的显示隐藏,
            getScroll: null,
            queryItems: [], // 搜索下拉框
            query: '', // 搜索项
            showInputText: false, // 控制输入文字的显示隐藏
            showCount: false, // 控制显示隐藏已选项的提示文本
            dropData: [], // 下拉框绑定数据
            dropInstance: null, // 下拉框实例
            popoverTip: null,
            showCountNumber: true,
            currentSelectedItem: null,
            confirmedItems: [], // 点击确认所提交的数据
            focused: false, // 判断当前是否处于获取焦点的状态
            storeInput: '',
            storePlaceholder: '',
            selectedTipStyle: {
                bottom: 0,
                left: 0
            },
            clearable: false,
            timer: null,
            timer2: null,
            scrollDom: null,
            inputVal: null, // 输入框是否有内容
            captionWidth: 0 // caption 的长度
        };
    },
    mounted() {
        if (this.transfer) {
            let { transfer } = this;
            if (!transfer.startsWith('#')) {
                transfer = `#${transfer}`;
            }
            this.scrollDom = document.querySelector(transfer);
            if (this.scrollDom) {
                this.scrollDom.addEventListener('mousewheel', this.listenDomScroll, false);
                this.scrollDom.addEventListener('scroll', this.listenDomScroll, false);
            }
        }
        window.addEventListener('mousewheel', this.listenDomScroll, false);
        window.addEventListener('scroll', this.listenDomScroll, false);
    },
    methods: {
        divInput(e) {
            // this.selectedItem = e.target.innerText;
            const { data, target: { value } } = e;
            this.inputVal = data || value;
        },
        /// 获取标题宽度
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
        listenDomScroll() {
            this.query = '';
            this.inputVal = false;
            this.queryItems = [];
            if (this.$refs.input) this.$refs.input.blur();
            if (this.dropInstance) {
                this.dropInstance.dropVisible = false;
                setTimeout(() => {
                    this.selectedItems = [];
                    this.selectConfirmData(this.confirmedItems);
                }, 300);
            }
            setTimeout(() => {
                // if (this.$refs.input) this.$refs.input.innerText = '';
                this.inputVal = null;
            }, 300);
        },
        handleHideShowClearIcon(bool) {
            if (this.hideClear) return;
            this.handleTipShow(bool);
            if (this.multiple) {
                if (this.confirmedItems.length) {
                    this.clearable = bool;
                }
            } else {
                if (this.currentSelectedItem) {
                    this.clearable = bool;
                }
            }
        },
        clearAll() {
            if (this.multiple) {
                if (this.popoverTip) {
                    // this.popoverTip.show = false;
                    PopoverTip.remove(this.popoverTip);
                    this.popoverTip = null;
                }
                // if (this.popoverTip) PopoverTip.remove(this.popoverTip);
                this.confirmedItems = [];
                this.selectedItems = [];
                this.clearable = false;
                this.selectConfirmData(this.selectedItems);
                if (this.dropInstance) {
                    if (this.dropInstance.dropVisible) {
                        this.dropInstance.dropVisible = false;
                    }
                }
                this.$emit('input', []);
                this.$emit('change', []);
            } else {
                this.clearable = false;
                this.currentSelectedItem = null;
                this.selectedItem = '';
                // this.$refs.input.innerText = '';
                this.inputVal = null;
                this.selectSingleItem();
                if (this.dropInstance) {
                    if (this.dropInstance.dropVisible) {
                        this.dropInstance.dropVisible = false;
                    }
                }
                this.$emit('input', '');
                this.$emit('change', []);
            }
        },
        handleTipShow(bool) {
            if (!this.confirmedItems.length) return;
            if (this.dropInstance) {
                if (this.dropInstance.dropVisible) return;
            }
            if (!bool) {
                if (this.popoverTip) this.setTimer();
            } else {
                if (this.tipText && this.tipPlace) {
                    if (this.popoverTip) {
                        if (this.timer) clearTimeout(this.timer);
                        else {
                            this.timerEnter = setTimeout(() => {
                                this.popoverTip.content = this.tipText;
                                PopoverTip.resetPosition(this.popoverTip);
                                clearTimeout(this.timerEnter);
                                this.timerEnter = null;
                            }, 300);
                        }
                    } else {
                        this.timerEnter = setTimeout(() => {
                            const { $refs: { pSelect, countTag } } = this;
                            this.popoverTip = PopoverTip({
                                tag: pSelect, // 触发器
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
                }
            }
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
        defaultSelect() {
            const { multiple, value, dropData } = this;
            if (multiple) {
                if (value === undefined || value === null) return;
                if (Array.isArray(value)) {
                    this.confirmedItems = [];
                    this.selectedItems = [];
                    value.forEach(val => {
                        const index = dropData.findIndex(item => item.id === val);
                        if (index > -1) {
                            this.confirmedItems.push(dropData[index]);
                            this.selectedItems.push(dropData[index]);
                        }
                    });
                    const len = this.confirmedItems.length;
                    if (len) {
                        if (this.selectdata.length === len) {
                            this.selectAll = true;
                        }
                        this.showCountNumber = true;
                    }
                }
            } else {
                if (String(value)) {
                    this.dropData.forEach(item => {
                        if (item.id === value) this.currentSelectedItem = item;
                    });
                    this.selectSingleItem();
                } else {
                    this.currentSelectedItem = null;
                    this.fakePlaceholder = '';
                }
            }
        },

        /**
         * description 深度克隆对象
         * params obj 需要克隆的对象
         */
        cloneDeep(obj) {
            if (typeof obj !== 'object' || obj === null) {
                return obj;
            }
            return JSON.parse(JSON.stringify(obj));
        },
        /**
         * description 处理用户输入事件
         * params event事件对象
         */
        handleInput(txt) {
            this.query = txt;
            if (!this.dropInstance) return;
            if (this.query) {
                this.dropInstance.query = this.query;
                this.dropInstance.data = this.findSelectedItem();
                // this.dropData = this.findSelectedItem();
                this.resetDropPanelPos();
            } else {
                if (!this.multiple) {
                    this.selectSingleItem();
                } else {
                    this.dropData.forEach(item => {
                        delete item.display;
                    });
                    this.dropInstance.query = this.query;
                    this.dropInstance.data = this.findSelectedItem();
                    this.resetDropPanelPos();
                }
            }
        },
        selectSingleItem() {
            if (this.currentSelectedItem) {
                this.dropData.forEach(item => {
                    delete item.display;
                    item.selected = item.id === this.currentSelectedItem.id;
                });
            } else {
                this.dropData.forEach(item => {
                    delete item.display;
                    item.selected = false;
                });
            }
            if (this.dropInstance) {
                this.dropInstance.data = this.dropData;
                this.resetDropPanelPos();
            }
        },
        /**
         * description 处理点击事件
         * params option 选中项
         */
        optionClick(option) {
            if (option.disabled) return;
            if (this.multiple) {
                if (option.selected) {
                    this.selectedItems.push(option);
                    this.$emit('change', option);
                } else {
                    const index = this.selectedItems.findIndex((item) => item.id === option.id);
                    if (index > -1) {
                        this.selectedItems.splice(index, 1);
                    }
                }
                this.disableConfirmBtn();
            } else {
                if (!this.dropInstance) return;
                this.currentSelectedItem = option;
                this.query = '';
                this.selectSingleItem();
                this.dropInstance.data = this.dropData;
                this.dropInstance.dropVisible = false;
                const emitData = this.cloneDeep(option);
                delete emitData.index;
                delete emitData.selected;
                this.$emit('input', emitData.id);
                this.$emit('change', emitData);
            }
        },

        /**
         * description 根据输入内容筛选匹配项
         */
        findSelectedItem() {
            const selections = [];
            this.dropData.forEach(item => {
                item.display = item.name;
                selections.push(item);
            });
            const foundItems = selections.filter(item => (item.name ? item.name.indexOf(this.query) > -1 : false))
                .map(item => {
                    item.display = item.display.replace(new RegExp(this.query, 'g'), `<span class="p-select-highlight">${this.query}</span>`);
                    return item;
                });
            if (foundItems.length) {
                foundItems.forEach(item => {
                    const index = this.selectedItems.findIndex(option => item.id === option.id);
                    if (index > -1) {
                        item.selected = true;
                    }
                });
            }
            return foundItems;
        },
        resetDropPanelPos() {
            const props = {
                data: this.dropInstance.data,
                multiple: this.multiple,
                maxCount: this.maxCount
            };
            Options.resetPos(this.dropInstance, this.$refs.pSelect, document.body, props);
        },
        /**
         * description 下拉框在打开和合上之间切换状态
         */
        handleOpen() {
            if (this.disabled) return;
            if (this.dropInstance) {
                if (this.dropInstance.dropVisible && this.isReadOnly) {
                    this.handleClose();
                    this.$refs.input.blur();
                    this.handleBlur();
                    this.dropInstance = null;
                    this.inputVal = '';
                    return;
                }
                if (this.multiple && this.confirmedItems.length) {
                    this.disableConfirmBtn();
                }
                this.dropInstance.dropVisible = true;
                if (this.popoverTip) {
                    this.popoverTip.show = false;
                }
                this.resetDropPanelPos();
            } else {
                zIndexIncrease();
                this.showCountNumber = false;

                const data = this.dropData,
                    { value, multiple, maxCount } = this;

                // 初始化实例
                this.dropInstance = Options({
                    tag: this.$refs.pSelect,
                    data: {
                        value,
                        zIndex
                    },
                    props: {
                        multiple,
                        query: this.query,
                        value,
                        data,
                        maxCount
                    }
                })
                    .$on('change', (option) => {
                        this.optionClick(option);
                    })
                    .$on('cancel', () => {
                        this.emitCancel();
                    })
                    .$on('confirm', () => {
                        this.emitConfirm();
                    })
                    .$on('clearPopover', () => {
                        if (this.popoverTip) {
                            PopoverTip.remove(this.popoverTip);
                            this.popoverTip = null;
                        }
                    });
                if (this.multiple && this.confirmedItems.length) {
                    this.selectConfirmData(this.confirmedItems);
                } else {
                    this.selectSingleItem();
                }
                this.dropInstance.$nextTick(() => {
                    this.dropInstance.dropVisible = true;
                    if (this.popoverTip) {
                        this.popoverTip.show = false;
                    }
                });
            }
        },
        /**
         * description 处理获取焦点的事件
         */
        handleFocus() {
            this.focused = true;
        },
        /**
         *description 输入框失去焦点的事件
         */
        handleBlur() {
            // if(this.dropInstance.dropVisible) return
            this.focused = false;
            // if (this.$refs.input) this.$refs.input.innerText = '';
            this.inputVal = null;
        },
        /**
         * description 向父组件传递取消并关闭下拉框
         */
        emitCancel() {
            if (this.dropInstance) {
                this.query = '';
                this.selectedItems = [];
                this.dropInstance.dropVisible = false;
                this.handleBlur();
                this.selectConfirmData(this.confirmedItems);
                this.disableConfirmBtn();
                this.$emit('cancel');
            }
        },
        /**
         * description 向父组件传递确认事件并关闭下拉框
         */
        emitConfirm() {
            if (this.dropInstance) {
                this.dropInstance.dropVisible = false;
                this.handleBlur();
                this.confirmedItems = this.cloneDeep(this.selectedItems);
                setTimeout(() => {
                    if (this.dropInstance.query !== '') {
                        this.dropInstance.data = this.dropData;
                    }
                }, 300);
                this.query = '';
                const emitData = this.cloneDeep(this.selectedItems);
                const ids = [];
                emitData.forEach(item => {
                    delete item.index;
                    delete item.selected;
                    ids.push(item.id);
                });
                this.$emit('input', ids);
                this.$emit('confirm', emitData);
            }
        },
        /**
         * description 关闭下拉列表
         */
        handleClose() {
            if (this.dropInstance) {
                this.dropInstance.dropVisible = false;
                this.query = '';
                if (this.multiple) {
                    this.selectedItems = [];
                    setTimeout(() => {
                        this.selectConfirmData(this.confirmedItems);
                    }, 300);
                } else {
                    setTimeout(() => {
                        this.selectSingleItem();
                    }, 300);
                }
            }
        },
        /**
         *
         */
        selectConfirmData(data) {
            if (!this.dropInstance) return;
            this.dropData.forEach(option => {
                const index = data.findIndex((item) => item.id === option.id);
                option.selected = index > -1;
                delete option.display;
            });
            if (this.confirmedItems.length) {
                this.selectedItems = this.cloneDeep(this.confirmedItems);
            }
            this.selectedItem = '';
            this.dropInstance.data = this.dropData;
        },
        disableConfirmBtn() {
            if (!this.dropInstance) return;
            if ((this.confirmedItems.length !== this.selectedItems.length)) {
                this.dropInstance.disableConfirm = false;
            } else {
                let flag = this.confirmedItems.every((item) => this.selectedItems.findIndex(option => option.id === item.id) > -1);
                if (!this.confirmedItems.length && this.selectedItems.length) {
                    flag = false;
                }
                if (!this.confirmedItems.length && !this.selectedItems.length) {
                    flag = true;
                }
                if (flag) {
                    this.dropInstance.disableConfirm = true;
                } else {
                    this.dropInstance.disableConfirm = false;
                }
            }
        }
    },
    /**
     * description 组件销毁
     */
    beforeDestroy() {
        if (this.dropInstance) {
            this.dropInstance.dropVisible = false;
            Options.remove(this.dropInstance);
        }
        if (this.popoverTip) PopoverTip.remove(this.popoverTip);
        window.removeEventListener('mousewheel', this.listenDomScroll);
        window.removeEventListener('scroll', this.listenDomScroll);
        if (this.transfer && this.scrollDom) {
            this.scrollDom.removeEventListener('mousewheel', this.listenDomScroll);
        }
    }
};
</script>
<style lang="stylus">
.p-select
    position relative
    display inline-block
    vertical-align middle
    cursor pointer
    outline none
    &+.p-select
        margin-left 12px
.p-select-drop-down
    position fixed
    .p-select-not-found
        height 54px
        padding 16px 0 16px 12px
        border 1px solid $grey-300
        border-radius 4px
        line-height 22px
        font-size 14px
        color $grey-400
        background $theme
        box-shadow $box-shadow-bottom
        box-sizing border-box
.p-select-header
    position relative
    display flex
    min-height 32px
    height 32px
    width 100%
    box-sizing border-box
    background-color $theme
    border 1px solid $grey-400
    border-radius 4px
    cursor pointer
    text-align left
    .p-select-count
        color $grey-900
        font-size 14px
        line-height 30px
        padding-left 12px
        .p-select-count-active
            color $blue-500
            margin 0 4px
    .p-select-caption
        display inline-block
        padding 0 0 0 12px
        height 30px
        line-height 30px
        font-size 14px
        flex-shrink 0
        color $grey-500
        pointer-events none
        max-width: 196px
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
    .p-select-selected-box
        position relative
        z-index 10
        flex-shrink 1
        display inline-block
        width 100%
        height 30px
        overflow-x hidden
        overflow-y auto
        box-sizing border-box
        color $grey-900
        font-size 14px
        .p-select-disabled-input
            cursor not-allowed
        .p-select-input, .p-select-fake-placeholder
            display inline-block
            position absolute
            left 0
            top 0
            padding-left 12px
            line-height 30px
            width 100%
            font-size 14px
            border none
            outline none
        .p-select-fake-placeholder
            pointer-events none
            color $grey-400
            line-height 30px
            padding-right 32px
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
        .p-select-number
            color $blue-500
        .p-select-input
            line-height 30px
            padding-left 12px
            height 30px
            padding-right 32px
            background none
        .p-select-cursor-input
            cursor pointer
        .p-select-input-fakePlaceholder
            color $grey-900
    .p-select-triangle
        position absolute
        top 7px
        right 10px
        width 16px
        height 16px
        transform-origin center center
        transform rotate(180deg)
        transition transform 0.3s
        will-change rotate
    .p-select-clear
        position absolute
        top 8px
        right 10px
        z-index 11
        width 14px
        height 14px
        path
            fill $grey-300
            transition fill 0.5s
        &:hover
            path
                fill $blue-500
    .p-select-triangle-up
        transform rotate(0)
    .p-select-triangle-down
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
.p-select-header-radius
    border 1px solid $grey-400
    border-radius 16px
.p-select-header-focused
    border 1px solid $blue-500
    box-shadow $box-shadow-blue
    transition 0.3s
    .p-select-normal
        color $grey-400
.p-select-header-disabled
    background $grey-200
    cursor not-allowed
    &:hover
       border 1px solid $grey-400
    span
        color $grey-400 !important
    .p-select-triangle
        path
            fill $grey-400
.p-select-normal
    color $grey-900
.p-select-selected
    color $grey-900
.p-select-highlight
    color $blue-500
.p-select-highlight-margin
    margin-left 4px
    margin-right 4px

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
