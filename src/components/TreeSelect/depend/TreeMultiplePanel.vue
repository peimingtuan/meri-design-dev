<template>
    <transition :name="position?'selectDownUpExtend':'selectDownUpExtendTop'">
        <div
            class="p-tree-multiple-panel"
            v-show="dropDownShow"
            :style="{width: width + 'px',height: height + 'px'}"
            @mouseenter="boxEnter"
            @mouseleave="boxLeave"
            @wheel.stop
        >
            <div class="p-select-drop-down-not" v-if="notFound">没有找到任何内容</div>
            <div @click="handleHeight" ref="dropDown" class="p-select-drop-down-tree" v-else>
                <SelectOptionMultiple
                    v-show="inputValue"
                    ref="selectOption"
                    :data="optionData"
                    @change="optionClick"
                />
                <Tree
                    ref="treeBox"
                    v-show="!inputValue"
                    :multiple="true"
                    :linkage="linkage"
                    :notNull="notNull"
                    :lastStage="lastStage"
                    @clickCallBack="clickCallBack"
                    :childDisabled="childDisabled"
                    :data.sync="treeData"
                    @change="optionClickTree"
                    :style="{width: overWidth+'px'}"
                />
            </div>
            <div :class="['p-select-drop-handle', separate && 'p-select-drop-box-shadow']">
                <span class="p-select-cancel" @click="handleCancel">取消</span>
                <span
                    :class="['p-select-confirm', confirmStatus&&'p-select-confirm-disabled']"
                    @click="handleConfirm"
                >确定</span>
            </div>
        </div>
    </transition>
</template>
<script>
import SelectOptionMultiple from '../../SelectOptionMultiple/SelectOptionMultiple';
import Tree from '../../Tree';
import cloneDeep from '../../static/utils/CloneDeep';
import {
    FilterTool, PackageTool, TileTool, Unique, ChangeStatus
} from '../../static/utils/TreeTool';

export default {
    name: 'TreeMultiplePanel',
    components: {
        SelectOptionMultiple,
        Tree
    },
    data() {
        return {
            separate: false,
            templateTreeData: null,
            prevSelectData: [],
            optionData: [],
            allChoiceLength: 0, // 全选时记录全选的长度
            curSelectedLength: 0, // 当前选择的长度
            parentNodeLength: 0 // 父节点对象
        };
    },
    watch: {
        dropDownShow: {
            handler(n, o) {
                if (n) {
                    this.prevSelectData = this.choiceData;
                    this.templateTreeData = cloneDeep(this.treeData);
                    this.handleHeight();
                }
            },
            immediate: true
        },
        inputValue(n, o) {
            if (n !== o) {
                const that = this;
                if (!this.notFound) {
                    that.handleHeight();
                    that.optionData = that.searchData.map(item => {
                        const index = that.choiceData.findIndex(selectItem => item.lId === selectItem.id && selectItem.checked === 'checked');
                        item.selected = index !== -1;
                        return item;
                    });
                }
            }
        }
    },
    computed: {
        confirmStatus() {
            let flag = false;
            flag = JSON.stringify(this.choiceData) === JSON.stringify(this.prevSelectData);
            return flag;
        }
    },
    methods: {
        // 通过监听面板的click事件处理分隔显示
        handleHeight() {
            this.$nextTick(() => {
                let height = this.$refs.dropDown.clientHeight;
                if (this.inputValue) {
                    height = this.$refs.selectOption.$el.clientHeight;
                } else {
                    height = this.$refs.treeBox.$el.clientHeight;
                }
                this.separate = height > this.height - 46;
            });
        },
        boxEnter() {
            this.$emit('close', false);
        },
        boxLeave() {
            this.$emit('close', true);
        },
        /** *
        * 设置树形结构被选中
        * @param tileData 树形结构数据
        * @param selIds 选中的id
        */
        setTreeDataChecked(tileData, selIds) {
            const { returnParentNode } = this;
            tileData.forEach(d => {
                if (selIds.includes(d.id)) {
                    d.checked = 'checked';
                } else {
                    d.checked = 'uncheck';
                }
            });

            // 树形结构上下级联动
            if (this.linkage) {
                const sel = []; // 查找父级id
                selIds.forEach(d => {
                    const arr = [d];
                    this.getParentItemById(arr, tileData, d);
                    sel.push(arr);
                });
                // 查找选中项的父级项，并设置父级项的选中状态
                for (let i = sel.length; i >= 0; i--) {
                    const seli = sel[i];
                    if (seli && seli.length) {
                        for (let j = seli.length; j >= 0; j--) {
                            const arr = tileData.filter(d => d.parentId === seli[j]); // 得到选中项
                            if (arr && arr.length) {
                                tileData.forEach(d => {
                                    if (d.id === arr[0].parentId) d.checked = ChangeStatus(arr);
                                });
                            }
                        }
                    }
                }
            }
            let choiceData;
            if (this.notNull) {
                choiceData = cloneDeep(tileData.filter(item => item.checked !== 'uncheck'));
            } else {
                choiceData = cloneDeep(tileData.filter(item => item.checked === 'checked'));
            }
            this.choiceData = returnParentNode ? choiceData : choiceData.filter(d => d.lastNode);
            this.treeData = PackageTool(tileData);
        },
        /**
        * 提交当前选择的值
        * @param selected 被选中的项
        * @param unselect 被取消的项
        */
        optionClick(selected, unselect) {
            let choiceData = [],
                cd = [],
                historyChoiceData = this.choiceData.filter(item => item.checked === 'checked');
            if (selected && selected.id) {
                // 选中的tag
                const d = cloneDeep(selected);
                const id = this.setAttr(d.id);
                const n = d.name.replace(/<[^<>]+>/g, '');
                const name = this.setAttr(n);
                const sd = { id, name, checked: 'checked' };
                cd = [sd];
                if (this.linkage) {
                    const result = [];
                    cd.forEach(item => {
                        this.getItemById(result, this.tileData, item.id);
                    });
                    choiceData = Unique([...cd, ...result, ...historyChoiceData]);
                } else {
                    choiceData = Unique([...cd, ...historyChoiceData]);
                }
            } else {
                const d = cloneDeep(unselect);
                const unId = this.setAttr(d.id);
                const result = [{ id: unId }];
                if (this.linkage) {
                    this.getItemById(result, this.tileData, unId);
                    result.forEach(item => {
                        const index = historyChoiceData.findIndex(ori => item.id === ori.id);
                        if (index !== -1) {
                            historyChoiceData.splice(index, 1);
                        }
                    });
                    choiceData = historyChoiceData;
                } else {
                    const index = historyChoiceData.findIndex(item => item.id === unId);
                    historyChoiceData.splice(index, 1);
                    choiceData = historyChoiceData;
                }
            }
            const ids = choiceData.map(d => d.id);
            const tileData = TileTool([], this.treeData, '-1');
            this.setTreeDataChecked(tileData, ids);
        },
        // 提交当前选择的值
        optionClickTree(selectedData) {
            // { 当前改变的id, 选择的id组, 选择的当前对象, 选择的对象组 }
            const {
                id, checkedIds, obj, checkedObj
            } = selectedData;
            let choiceData = [];
            if (checkedObj && checkedObj.length) {
                this.curSelectedLength = checkedObj.length;
                const data = cloneDeep(checkedObj);
                if (this.returnParentNode) {
                    let noDisabledArr = [];
                    if (!this.childDisabled) {
                        if (this.notNull) {
                            noDisabledArr = data.filter(item => !item.disabled && item.showCheckBox);
                        } else {
                            noDisabledArr = data.filter(item => !item.disabled && item.showCheckBox && item.checked === 'checked');
                        }
                    } else {
                        noDisabledArr = data.filter(item => !!item.showCheckBox);
                    }
                    choiceData = noDisabledArr.map(d => {
                        const id = this.setAttr(d.id);
                        const n = d.name.replace(/<[^<>]+>/g, '');
                        const name = this.setAttr(n);
                        return {
                            ...d, id, name, parentId: d.parentId, checked: d.checked
                        };
                    });
                } else {
                    let notParentNode = [];
                    if (this.childDisabled) {
                        notParentNode = data.filter(d => (!d.children && d.showCheckBox));
                    } else {
                        notParentNode = data.filter(d => (!d.children && !d.disabled && d.showCheckBox));
                    }
                    this.parentNodeLength = data.filter(i => i.children).length || 0;
                    choiceData = notParentNode.map(d => {
                        const id = this.setAttr(d.id);
                        const n = d.name.replace(/<[^<>]+>/g, '');
                        const name = this.setAttr(n);
                        return {
                            ...d, id, name, parentId: d.parentId, checked: d.checked
                        };
                    });
                }
            }
            this.choiceData = choiceData;
        },
        handleCancel() {
            this.cancelTreeData();
            this.$emit('cancel', false);
        },
        handleConfirm() {
            if (this.confirmStatus) return;
            this.$emit('change', this.choiceData, this.parentNodeLength);
        },
        // 取消已选择的数据
        cancelTreeData() {
            this.treeData = cloneDeep(this.templateTreeData);
        },
        /**
         * 通过子父项id查找子项id
         * @param result 结果id
         * @param tileData 平铺的数据
         * @param id 子项id
         */
        getParentIdById(result, tileData, id) {
            tileData.forEach(d => {
                if (d.parentId === id) {
                    result.push(d.id);
                    this.getParentIdById(result, tileData, d.id);
                }
            });
        },
        /**
         * 通过父项id查找子项id-筛选出子集id
         * @param result 结果数据
         * @param tileData 平铺的数据
         * @param id 父项id
         */
        getItemById(result, tileData, id) {
            tileData.forEach(d => {
                if (d.parentId === id) {
                    result.push({ id: d.id, name: d.name, checked: d.checked });
                    this.getItemById(result, tileData, d.id);
                }
            });
        },
        /**
         * 通过子项id查找父项数据
         * @param result 查找结果
         * @param tile 平铺的数据
         * @param id 当前子项id
         */
        getParentItemById(result, tile, id) {
            tile.forEach(d => {
                if (d.id === id) {
                    result.unshift(d.parentId);
                    this.getParentItemById(result, tile, d.parentId);
                }
            });
        },
        /**
         * 设置参数
         * @param str
         * @return {*}
         */
        setAttr(str) {
            const strArr = str.split('/');
            return strArr.pop();
        },
        // 点击某一项的回调函数
        clickCallBack(obj) {
            this.$emit('clickCallBack', obj);
        }
    }
};
</script>
<style lang="stylus">
.p-tree-multiple-panel
    position: absolute
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 8px
    background-color: $theme
    border: 1px solid $grey-300
    border-radius: 4px
    box-shadow: $box-shadow-bottom
    width: 100%
    min-width 180px
    max-width 600px
    min-height: 264px
    z-index: 7500
    .p-select-drop-down-tree
        height: calc(100% - 46px)
        overflow-y: auto
    .p-select-drop-box-shadow
        box-shadow: $box-shadow-top
    .p-select-drop-handle
        height: 46px
        padding-top: 12px
        padding-bottom: 12px
        display: flex
        justify-content: flex-end
        span
            font-size: 14px
            color: $grey-900
            line-height: 22px
            cursor: pointer
        .p-select-cancel
            margin-right: 16px
        .p-select-confirm
            color: $blue-500
            margin-right: 12px
        .p-select-confirm-disabled
            color: $grey-400
            cursor: not-allowed
.p-select-drop-down-not
    padding-left: 12px
    line-height 38px
    color: $grey-400
    font-size: 14px
</style>
