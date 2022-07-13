<template>
    <div class="p-select-search" ref="selectMultipleTree" :style="{width: width+'px'}">
        <SelectInput
            ref="selectInput"
            v-model="inputValue"
            :title="title"
            :unit="unit"
            :placeholder="placeholder"
            :tipPlace="tipPlace"
            :triangle="dropDownShow"
            :data.sync="choiceData"
            :caption="caption"
            :isReadOnly="isReadOnly"
            :activeClose="activeClose"
            :disabled="disabled"
            :isShowAllChoice='isShowAllChoice'
            :isAllChoice="isAllChoice"
            :hideClear="hideClear"
            :errorText="errorText"
            :errorShow="errorShow"
            @changeTriangle="changeTriangle"
            @clearChoseData="deleteChoseData"
        />
        <!-- @changeValue="changeValue" -->
    </div>
</template>

<script>
import SelectInput from './SelectInput';
import TreeMultiplePanel from '../TreeMultiplePanel';
import {
    FilterTool,
    PackageTool,
    TileTool,
    setSelectIdSTree
} from '../../static/utils/TreeTool';
import cloneDeep from '../../static/utils/CloneDeep';

export default {
    name: 'selectMultipleSearchTree',
    components: {
        SelectInput
    },
    props: {
        // 选择内容后的title
        title: {
            type: String,
            default: ''
        },
        // 单位
        unit: {
            type: String,
            default: ''
        },
        // 联动
        linkage: {
            type: Boolean,
            default: true
        },
        /**
         * 是否只能选择最后节点
         */
        lastStage: {
            type: Boolean,
            default: false
        },
        /**
         * 提示框位置
         */
        tipPlace: {
            type: String,
            default: 'top'
        },
        /**
         * 是否返回半选状态的id
         */
        notNull: {
            type: Boolean,
            default: false
        },
        /**
         * 是否返回半选状态的数据
         */
        returnParentNode: {
            type: Boolean,
            default: true
        },
        // 选中项的id
        selectedIds: {
            type: Array,
            default: () => []
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false
        },
        // 盒子宽度
        width: {
            type: [String, Number],
            default: 240
        },
        // 盒子宽度
        overWidth: {
            type: [String, Number],
            default: ''
        },
        // 盒子高度
        height: {
            type: [String, Number],
            default: 240
        },
        // 传入的数据
        data: {
            type: Array,
            default: () => []
        },
        // 默认提示文字
        placeholder: {
            type: String,
            default: '请选择'
        },
        // 触发器清空功能是否需要
        hideClear: {
            type: Boolean,
            default: false
        },
        transfer: {
            type: [String, Array],
            default: ''
        },
        // 配置显示全选状态
        isShowAllChoice: {
            type: Boolean,
            default: false
        },
        isReadOnly: {
            type: Boolean,
            default: false
        },
        // 标题
        caption: {
            type: String,
            default: ''
        },
        // 设置子级disabled状态
        childDisabled: {
            type: Boolean,
            default: false
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
            inputValue: '', // 输入框输入的值
            // 下拉框是否显示
            dropDownShow: false,
            // 平铺的数据
            tileData: [],
            // 树形结构数据的总条数length
            allDataLength: 0,
            // 树形结构数据
            treeData: [],
            // 搜索的数据
            searchData: [],
            // 选中的数据
            choiceData: [],
            // 搜索无内容
            notFound: false,
            // 新增popover类型的触发器所需要数据
            activeClose: true,
            // 下拉框实例
            targetVm: null,
            isAllChoice: false, // 是否为全选状态
            parentNodeLen: 0 // 为父节点对象的长度
        };
    },
    computed: {
        // 根据规范返回对应的宽度
        calcWidth() {
            return this.width > 600 ? 600 : this.width < 180 ? 180 : this.width;
        }
    },
    watch: {
        // 监听文字输入
        inputValue(n, o) {
            if (n === o) return;
            this.filterSelect(n);
            this.targetVm.inputValue = n;
        },
        // 监听原始树数据改变
        data: {
            handler(n, o) {
                if (JSON.stringify(n) === JSON.stringify(o)) return;
                if (n && n.length) {
                    this.setData(this.selectedIds, n);
                }
            },
            deep: true
        },
        // 默认选中数据变化监听
        selectedIds: {
            handler(n, o) {
                this.setData(n, this.data);
                if (this.selectedIds && this.selectedIds.length > 0) {
                    if (this.returnParentNode) {
                        this.isAllChoice = this.selectedIds.length === this.allDataLength;
                    } else {
                        this.isAllChoice = (this.selectedIds.length + this.parentNodeLen) === this.allDataLength;
                    }
                } else {
                    this.isAllChoice = false;
                }
            },
            deep: true
        },
        choiceData: {
            handler(n, o) {
                if (n && n.length > 0) {
                    if (this.returnParentNode) {
                        this.isAllChoice = n.length === this.allDataLength;
                    } else {
                        this.isAllChoice = (n.length + this.parentNodeLen) === this.allDataLength;
                    }
                } else {
                    this.isAllChoice = false;
                }
            },
            deep: true
        },
        // 下拉框是否显示
        dropDownShow(n, o) {
            this.$emit('focusChange', !n);
            if (n !== o) {
                if (n && this.targetVm) {
                    this.targetVm.dropDownShow = n;
                    this.targetVm.choiceData = this.choiceData;
                    TreeMultiplePanel.renderPosition(this.targetVm);
                }
                if (!n && this.targetVm) {
                    this.targetVm.dropDownShow = n;
                }
            }
        },
        // 搜索是否有结果
        notFound(n, o) {
            if (n !== o) {
                if (this.targetVm) {
                    this.targetVm.notFound = n;
                }
            }
        }
    },
    mounted() {
        if (this.data && this.data.length) {
            this.setData(this.selectedIds, this.data);
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
        window.addEventListener('mousewheel', this.hidePanel, false);
        window.addEventListener('scroll', this.hidePanel, false);
    },
    beforeDestroy() {
        if (this.targetVm) TreeMultiplePanel.remove(this.targetVm);
        window.removeEventListener('mousewheel', this.hidePanel);
        window.removeEventListener('scroll', this.hidePanel);
        if (this.scrollDom) {
            this.scrollDom.removeEventListener('mousewheel', this.hidePanel);
            this.scrollDom.removeEventListener('scroll', this.hidePanel);
        }
    },
    methods: {
        // 清除按钮点击清除回到初始化状态
        deleteChoseData() {
            this.choiceData = [];
            this.setData([], this.data);
            this.$emit('change', []);
        },
        // 隐藏下拉选择面板
        hidePanel() {
            this.dropDownShow = false;
            // 滚动事件触发收起面板使触发器失去焦点
            if (this.$refs.selectInput) {
                this.$refs.selectInput.$refs.inputField.blur();
                // this.$refs.selectMultipleTree.handleCancel();
            }
        },
        // 点击改变 三角形方向/弹窗显示状态
        changeTriangle(status) {
            const that = this;
            // if (this.popoverInstance.showCascader) {
            //     this.popoverInstance.showCascader = false;
            // }
            if (!this.targetVm) {
                this.targetVm = TreeMultiplePanel({
                    tag: this.$refs.selectMultipleTree,
                    params: {
                        dropDownShow: this.dropDownShow,
                        notFound: false,
                        inputValue: this.inputValue,
                        lastStage: this.lastStage,
                        searchData: this.searchData,
                        linkage: this.linkage,
                        notNull: this.notNull,
                        returnParentNode: this.returnParentNode,
                        childDisabled: this.childDisabled,
                        treeData: cloneDeep(this.treeData),
                        choiceData: this.choiceData,
                        tileData: this.tileData,
                        height: this.height,
                        width: this.calcWidth,
                        overWidth: this.overWidth
                    }
                })
                    .$on('close', flag => {
                        // 鼠标移入移出下拉面板事件，返回变量控制是否可以关闭面板
                        that.activeClose = flag;
                    })
                    .$on('change', (data, len) => {
                        // 面板选择数据确定
                        this.hidePanel();
                        that.choiceData = data;
                        that.parentNodeLen = len || 0;
                        const choseId = data.map(item => item.id);
                        that.$emit('change', choseId, that.choiceData);
                    })
                    .$on('cancel', flag => {
                        this.hidePanel();
                    })
                    .$on('clickCallBack', obj => {
                        this.$emit('clickCallBack', obj);
                    });
            } else {
                if (!status) {
                    that.targetVm.dropDownShow = false;
                    that.$refs.selectInput.$refs.inputField.blur();
                    this.targetVm.cancelTreeData();
                }
            }
            this.dropDownShow = status;
        },

        // 初始化数据
        setData(selectIds, data) {
            this.choiceData = [];
            if (selectIds.length) {
                const {
                    resultData,
                    selectedData
                } = setSelectIdSTree(selectIds, cloneDeep(data), this.linkage, this.notNull, this.lastStage);
                // 去除disabled状态的默认选中的selected数据，不计算在已选择数据中
                const noDisabledSelected = selectedData.filter(d => !d.disabled);
                if (this.returnParentNode) {
                    this.choiceData = noDisabledSelected.map(item => ({
                        name: item.name,
                        id: item.id,
                        parentId: item.parentId,
                        checked: item.checked
                    }));
                } else {
                    const noParentArr = noDisabledSelected.filter(d => !d.children);
                    this.choiceData = noParentArr.map(item => ({
                        name: item.name,
                        id: item.id,
                        parentId: item.parentId,
                        checked: item.checked
                    }));
                }
                this.tileData = TileTool([], cloneDeep(resultData), '-1');
                this.parentNodeLen = this.tileData.filter(d => (d.children && d.children.length > 0)).length || 0;
                this.allDataLength = this.tileData.length;
                this.treeData = resultData;
            } else {
                this.tileData = TileTool([], cloneDeep(data), '-1');
                this.parentNodeLen = this.tileData.filter(d => (d.children && d.children.length > 0)).length || 0;
                this.allDataLength = this.tileData.length;
                this.treeData = PackageTool(this.tileData);
            }
            if (this.targetVm) {
                this.targetVm.treeData = cloneDeep(this.treeData);
            }
        },
        /**
         * 筛选搜索的收据
         * @param v 搜索框输入的值
         */
        filterSelect(v) {
            const tileData = cloneDeep(this.tileData); // 平铺树形结构
            const re = new RegExp(v, 'g');
            let fData = null;
            // 筛选出包涵有搜索字符的数据
            if (this.lastStage) {
                fData = tileData.filter(d => {
                    const hasChild = tileData.find(fd => fd.parentId === d.id); // 查看是否还有子级
                    if (d.isleaf) {
                        if (!hasChild && d.name.includes(v) && !d.disabled) {
                            d.name = d.name.replace(re, `<span class="p-select-search-highlight">${v}</span>`);
                            return d;
                        }
                        return null;
                    }
                    return null;
                });
            } else {
                fData = tileData.filter(d => {
                    if (d.isleaf) {
                        if (d.name.includes(v) && !d.disabled) {
                            d.name = d.name.replace(re, `<span class="p-select-search-highlight">${v}</span>`);
                            return d;
                        }
                        return null;
                    }
                    return null;
                });
            }
            // 得到筛选后的数据 一维数据列表
            this.searchData = FilterTool(tileData, fData);
            this.notFound = this.searchData.length === 0;
            this.targetVm.searchData = this.searchData;
        }
    }
};
</script>
