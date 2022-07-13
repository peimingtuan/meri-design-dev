import './index.styl';
import DropTrigger from '../DropTrigger/DropTrigger';
import ClickOutside from '../static/utils/ClickOutside';
import AddClassNameForText, { GetSameItem,newGetSameItem } from './depend/AddClassNameForText';

import Drop from './depend/Drop';

export default {
    name: 'MSelect',
    props: {
        width: {
            type: [String, Number],
            default: '120'
        },
        // 下拉弹窗宽
        dropWidth: {
            type: [String, Number],
            default: '120'
        },
        // 触发器标题
        caption: {
            type: String,
            default: ''
        },
        // 占位内容
        placeholder: {
            type: String,
            default: '请选择'
        },
        // 禁用状态
        disabled: {
            type: Boolean,
            default: false
        },
        // 是否隐藏清除按钮
        clearHide: {
            type: Boolean,
            default: false
        },
        // 开启搜索 - 默认可搜索
        openSearch: {
            type: Boolean,
            default: true
        },
        //是否开启精准搜索 默认为false
        accurate:{
            type: Boolean,
            default: false
        },
        // 默认为false 居左对齐
        alignRight: {
            type: Boolean,
            default: false
        },
        // 单选还是多选
        multiple: {
            type: Boolean,
            default: false
        },
        value: {
            type: [Number, String, Array]
        },
        data: {
            type: Array,
            default: () => []
        },
        // 容纳最大数量
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
            activeClose: true, // 激活关闭
            dropShow: false, // 下拉列表显示
            dropData: [], // 下拉列表数据
            selectedData: [], // 选中的数据
            searchData: [] // 搜索的数据
        };
    },
    watch: {
        // 监听下拉列表显示
        // dropShow(n, o) {
        //     if (n === o) return;
        //     if (n) this.addWindowEvent();
        //     else this.remWindowEvent();
        // },
        value: {
            handler(n, o) {
                const { multiple, data } = this;
                let selectedData, dropData;
                if (multiple) {
                    const nVal = String(n),
                        oVal = String(o);
                    if (nVal === oVal) return;
                    selectedData = data.filter(d => n.includes(d.id));
                    dropData = data.map(d => {
                        if (n.includes(d.id)) d.checked = 'checked';
                        else d.checked = 'uncheck';
                        return d;
                    });
                    this.dropData = dropData;
                } else {
                    if (n === o) return;
                    selectedData = data.find(d => d.id === n) || {};
                }
                this.selectedData = selectedData;
                if (this.dropBox) {
                    this.dropBox.selectedId = n;
                    if (multiple) this.dropBox.data = dropData;
                }
            },
            deep: true,
            immediate: true
        },
        data: {
            handler(n, o) {
                const { multiple, value } = this,
                    nData = JSON.stringify(n);
                    // oData = JSON.stringify(o);
                // if (nData === oData) return;
                let selectedData;
                const dropData = JSON.parse(nData);
                if (multiple) {
                    selectedData = n.filter(d => value.includes(d.id));
                    dropData.forEach(d => {
                        if (value.includes(d.id)) d.checked = 'checked';
                        else d.checked = 'uncheck';
                    });
                } else {
                    selectedData = n.find(d => d.id === value) || {};
                }
                this.selectedData = selectedData;
                this.dropData = dropData;
                if (this.dropBox) this.dropBox.data = dropData;
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        // 展开下拉列表
        openDropHandle(flag) {
            const { disabled, dropShow } = this;
            if (disabled) return;
            if (flag === 'triangle' && dropShow) {
                this.changeDropShow(false);
                return;
            }
            if (this.dropBox) {
                this.changeDropShow(true);
            } else {
                const {
                    $refs: { dropTrigger },
                    width, dropWidth, multiple, alignRight, dropData: data, value: selectedId, maxCount
                } = this;
                this.dropBox = Drop({
                    tag: dropTrigger.$el,
                    propsData: {
                        width: (dropWidth < width ? width : dropWidth),
                        multiple,
                        alignRight,
                        data,
                        selectedId,
                        maxCount
                    }
                }).$on('change', item => {
                    this.selectedData = item;
                    if (item instanceof Array) {
                        const ids = item.map(d => d.id);
                        this.$emit('input', ids);
                        this.$emit('change', ids, item);
                    } else {
                        this.$emit('input', item.id);
                        this.$emit('change', item.id, item);
                    }
                    this.changeDropShow(false);
                }).$on('cancel', () => {
                    this.$emit('cancel');
                    this.changeDropShow(false);
                });
                this.dropBox.$nextTick(() => {
                    this.changeDropShow(true);

                    window.addEventListener('click', this.clickOutSide, false);
                    this.$once('hook:beforeDestroy', () => {
                        window.removeEventListener('click', this.clickOutSide);
                    });
                });
                this.$once('hook:beforeDestroy', () => {
                    if (this.dropBox) Drop.remove(this.dropBox);
                });
            }
        },
        // 改变下拉列表显示状态
        changeDropShow(status) {
            this.dropShow = status;
            if (status) Drop.resetPosition(this.dropBox);
            else this.dropBox.dropShow = false;
        },
        // 鼠标移入
        triggerEnter() {
            if (this.disabled) return;
            this.activeClose = false;
        },
        // 鼠标移出
        triggerLeave() {
            this.activeClose = true;
        },
        // 获取input输入的值
        getInputText(val) {
            if (val) {
                const { dropData } = this;
                if (!dropData || !dropData.length) return;
                const searchData = JSON.parse(JSON.stringify(dropData)).filter(d => {
                    if(this.accurate){
                        if (!d.disabled && newGetSameItem(d.name, val)) {
                            d.name = AddClassNameForText(d.name, val, 'm-drop-option-text-highlight');
                            return d;
                        }
                    }else{
                        if (!d.disabled && GetSameItem(d.name, val)) {
                            d.name = AddClassNameForText(d.name, val, 'm-drop-option-text-highlight');
                            return d;
                        }
                    }
                    return null;
                });
                this.searchData = searchData;
                if (this.dropBox) this.dropBox.data = searchData;
            } else {
                this.searchData = [];
                this.dropBox.data = this.dropData;
            }
        },
        // 触发器清除按钮
        delHandle() {
            this.selectedData = [];
            this.$emit('input', '');
            this.$emit('change', '', {});
            if (this.dropBox) {
                this.dropBox.selectedData = [];
                this.dropBox.selectedDataHistory = [];
            }
        },
        // 点击下拉弹窗意外区域
        clickOutSide(e) {
            const { activeClose, dropShow } = this,
                dom = this.dropBox.$el;
            if (!activeClose || !dropShow) return;
            ClickOutside(e, dom, () => {
                if (this.dropBox) this.changeDropShow(false);
            });
        }
    },
    render(h) {
        const {
            openDropHandle, triggerEnter, triggerLeave,
            caption, width, placeholder, disabled, clearHide, openSearch, accurate, multiple, dropShow, errorText, errorShow, selectedData,
            getInputText, delHandle
        } = this;
        return (
            <div class="m-select"
                onMouseenter={triggerEnter}
                onMouseleave={triggerLeave}
            >
                <DropTrigger
                    ref="dropTrigger"
                    caption={caption}
                    width={width}
                    placeholder={placeholder}
                    disabled={disabled}
                    clearHide={clearHide}
                    openSearch={openSearch}
                    accurate={accurate}
                    multiple={multiple}
                    dropShow={dropShow}
                    errorText={errorText}
                    errorShow={errorShow}
                    selectedData={selectedData}
                    onGetInputText={getInputText}
                    onClick={openDropHandle}
                    onDelHandle={delHandle}
                />
            </div>
        );
    }
};
