<template>
    <div ref="TransferSelectTree" :style="{width: width+'px'}" class="p-transfer-select">
        <SelectInput
            ref="selectInput"
            v-model="searchValue"
            :title="title"
            :unit="unit"
            :placeholder="placeholder"
            :triangle="transferShow"
            :data.sync="choseData"
            :caption="caption"
            :tipPlace="tipPlace"
            :isReadOnly="isReadOnly"
            :activeClose="activeClose"
            :disabled='disabled'
            :hideClear='hideClear'
            :isShowAllChoice='isShowAllChoice'
            :isAllChoice="isAllChoice"
            :errorText="errorText"
            :errorShow="errorShow"
            @changeTriangle="changeTriangle"
            @clearChoseData='deleteChoseData'
        />
    </div>
</template>

<script>
import SelectInput from './SelectInput';
import AreaSelect from '../AreaSelect';
import cloneDeep from '../../static/utils/CloneDeep';
import { PackageTool, TileTool, setSelectIdSTree } from '../../static/utils/TreeTool';

export default {
    name: 'TransferSelectTree',
    components: { SelectInput },
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
        // 占位符
        placeholder: {
            type: String,
            default: '请选择'
        },
        // 提示框位置
        tipPlace: {
            type: String,
            default: 'bottom'
        },
        /* 穿梭框数据 */
        data: {
            type: Array,
            default: () => []
        },
        // 上下级联动
        linkage: {
            type: Boolean,
            default: true
        },
        // 只能选择末级
        lastStage: {
            type: Boolean,
            default: false
        },
        // 盒子宽度
        width: {
            type: [String, Number],
            default: 240
        },
        // 下拉面板宽度
        overWidth: {
            type: [String, Number],
            default: ''
        },
        /**
             * 是否返回半选状态的id
             */
        notNull: {
            type: Boolean,
            default: false
        },
        // 是否返回父对象数据
        returnParentNode: {
            type: Boolean,
            default: true
        },
        // 高度
        height: {
            type: [String, Number],
            default: 360
        },
        disabled: {
            type: Boolean,
            default: false
        },
        selectedIds: {
            type: Array,
            default: () => []
        },
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
        // input框是否为readonly状态
        isReadOnly: {
            type: Boolean,
            default: false
        },
        // 标题
        caption: {
            type: String,
            default: ''
        },
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
            searchValue: '', // 输入的值
            transferShow: false, // 穿梭框显示
            selectedData: [], // 选中的数据
            activeClose: true, // 是否可关闭弹窗
            targetVm: null,
            treeData: [],
            isAllChoice: false, // 是否为全选状态
            // 树形结构数据的总条数length
            allDataLength: 0,
            parentNodeLen: 0 // 平铺数据后得到的父对象数据长度
        };
    },
    watch: {
        // 监听数据改变
        data: {
            handler(n, o) {
                if (n === o) return;
                if (n && n.length) {
                    this.setData(this.selectedIds, n);
                }
            },
            deep: true
        },
        // 默认传入选择的ids
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
        selectedData: {
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
        // 监听文字输入
        searchValue(n, o) {
            if (n === o) return;
            this.targetVm.searchValue = n;
        },
        // 下拉面板是否显示
        transferShow(n, o) {
            this.$emit('focusChange', !n);
            if (n === o) return;
            if (n && this.targetVm) {
                this.targetVm.transferShow = n;
                this.targetVm.data = this.treeData;
                AreaSelect.renderPosition(this.targetVm);
                this.targetVm.showChoseData = cloneDeep(this.selectedData);
            }
            if (!n && this.targetVm) {
                this.targetVm.transferShow = n;
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
        } else {
            window.addEventListener('mousewheel', this.hidePanel, false);
            window.addEventListener('scroll', this.hidePanel, false);
        }

        this.$once('hook:beforeDestroy', () => {
            if (this.targetVm) AreaSelect.remove(this.targetVm);
            if (this.transfer) {
                if (this.scrollDom) {
                    this.scrollDom.removeEventListener('mousewheel', this.hidePanel);
                    this.scrollDom.removeEventListener('scroll', this.hidePanel);
                }
            } else {
                window.removeEventListener('mousewheel', this.hidePanel);
                window.removeEventListener('scroll', this.hidePanel);
            }
        });
    },
    computed: {
        calcWidth() {
            return this.width > 600 ? 600 : (this.width < 180 ? 180 : this.width);
        },
        choseData() {
            return this.selectedData.map(item => ({
                name: item.name.split('/').pop(),
                id: item.id
            }));
        }
    },
    methods: {
        // 清空触发器已选择的数据
        deleteChoseData() {
            this.selectedData = [];
            this.isAllChoice = false;
            this.setData([], this.data);
            if (this.targetVm) {
                this.targetVm.data = cloneDeep(this.treeData);
            }
            this.$emit('change', []);
        },
        // 获取上级名称
        getParentName(parentId) {
            const tilingTree = TileTool([], cloneDeep(this.data), '-1'),
                parent = tilingTree.find(item => item.id === parentId);
            if (parent) {
                return `${this.getParentName(parent.parentId)}${parent.name}/`;
            }
            return '';
        },
        // 根据默认绑定的数据设置树形数据
        setData(selectIds, data) {
            this.selectedData = [];
            if (selectIds.length) {
                const { resultData, selectedData } = setSelectIdSTree(selectIds, cloneDeep(data), this.linkage, this.notNull, this.lastStage, this.childDisabled);
                // 去除disabled状态的默认选中的selected数据，不计算在已选择数据中
                const noDisabledData = selectedData.filter(d => !d.disabled);
                const titData = TileTool([], cloneDeep(data), '-1'); // 获取平铺数据
                if (!this.childDisabled) {
                    if (this.returnParentNode) {
                        this.selectedData = noDisabledData.map(item => ({
                            name: `${this.getParentName(item.parentId)}${item.name}`,
                            id: item.id,
                            parentId: item.parentId
                        }));
                    } else {
                        const noParentArr = noDisabledData.filter(d => !d.children);
                        this.selectedData = noParentArr.map(item => ({
                            name: `${this.getParentName(item.parentId)}${item.name}`,
                            id: item.id,
                            parentId: item.parentId
                        }));
                    }
                } else {
                    const noChild = selectedData.filter(item => !item.disabled);
                    this.selectedData = noChild.map(item => ({
                        name: `${this.getParentName(item.parentId)}${item.name}`,
                        id: item.id,
                        parentId: item.parentId
                    }));
                }
                this.allDataLength = titData.length;
                this.parentNodeLen = titData.filter(d => (d.children && d.children.length > 0)).length || 0;
                this.treeData = resultData;
            } else {
                // this.treeData = cloneDeep(data);
                this.treeData = TileTool([], cloneDeep(data), '-1');
                this.parentNodeLen = this.treeData.filter(d => (d.children && d.children.length > 0)).length || 0;
                this.allDataLength = this.treeData.length;
                this.treeData = PackageTool(this.treeData);
            }
        },
        // 隐藏下拉选择面板
        hidePanel() {
            this.transferShow = false;
            if (this.$refs.selectInput) {
                this.$refs.selectInput.$refs.inputField.blur();
            }
        },
        // 点击改变 三角形方向/弹窗显示状态
        changeTriangle(status) {
            const _this = this;
            if (!this.targetVm) {
                this.targetVm = AreaSelect({
                    tag: this.$refs.TransferSelectTree,
                    params: {
                        transferShow: this.transferShow,
                        data: cloneDeep(this.treeData),
                        linkage: this.linkage,
                        lastStage: this.lastStage,
                        notNull: this.notNull,
                        returnParentNode: this.returnParentNode,
                        height: this.height,
                        childDisabled: this.childDisabled,
                        width: this.calcWidth,
                        overWidth: this.overWidth,
                        searchValue: this.searchValue,
                        showChoseData: cloneDeep(this.selectedData)
                    }
                }).$on('confirm', (data) => {
                    _this.transferShow = false;
                    const { ids, sd, len } = data;
                    _this.selectedData = sd;
                    _this.parentNodeLen = len || 0;
                    _this.$emit('change', ids, sd);
                }).$on('modalStatus', (flag) => {
                    _this.activeClose = flag;
                }).$on('cancelModal', (flag) => {
                    this.$emit('cancelModal');
                    _this.transferShow = flag;
                })
                    .$on('clickCallBack', obj => {
                        this.$emit('clickCallBack', obj);
                    });
            } else {
                _this.$refs.selectInput.$refs.inputField.blur();
            }
            this.transferShow = status;
            if (!status) _this.targetVm.$refs.transferMini.handleCancel();
        }
    }
};
</script>

<style lang="stylus">
.p-transfer-select
    position: relative
    display: inline-block
    outline: none
    width: 100%

</style>
