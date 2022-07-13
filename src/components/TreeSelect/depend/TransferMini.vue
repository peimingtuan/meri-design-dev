<template>
    <div class="p-select-area-box">
        <div class="p-select-area" :style="{height: height+'px',width: (2 * width - 2) + 'px'}">
            <div class="p-select-area-child p-transfer-left" :style="{width: width + 'px'}">
                <section
                        class="p-transfer-left-content"
                        :style="{width: overWidth+'px', height: (height - 8)+'px'}"
                        v-show="!searchValue"
                >
                    <!--树形结构数据-->
                    <Tree
                            :multiple="true"
                            :linkage="linkage"
                            :lastStage="lastStage"
                            :notNull="notNull"
                            :childDisabled="childDisabled"
                            :returnParentNode="returnParentNode"
                            @clickCallBack="clickCallBack"
                            :data.sync="mulData"
                            @change="treeChange"
                    />
                </section>
                <section class="p-transfer-left-content" :style="{height: (height)+'px'}" v-show="searchValue">
                    <SelectOptionMultiple v-if="notFound" :data="searchData" @change="optionSearchChange"/>
                    <div class="p-transfer-left-content-none" v-else>没有找到任何内容</div>
                </section>
            </div>
            <div class="p-select-area-child p-transfer-right" :style="{width: (width - 2) + 'px'}">
                <section :class="['p-transfer-right-title', 'p-transfer-right-title-border']">
                    <article class="p-transfer-right-title-text">
                        已选
                        <span
                                class="p-transfer-right-title-text-num"
                                v-show="selectedData&&selectedData.length"
                        >{{selectedData.length}}</span>
                    </article>
                    <article
                            :class="['p-transfer-right-clear', (selectedData&&selectedData.length)&&'p-transfer-right-clear-active']"
                            @click="handleEmpty"
                    >清空
                    </article>
                </section>
                <section class="p-transfer-selected" :style="{height: (height-100)+'px'}">
                    <article class="p-transfer-selected-item" v-for="(sd, i) in selectedData" :key="'sd-'+sd.id">
                        <span @mouseenter="itemEnter">{{sd.name}}</span>
                        <IconClear @click.native="removeItem(i, sd.id)"/>
                    </article>
                </section>
                <section :class="['p-transfer-handle', shadowShow&&'p-transfer-btn-shadow']">
                    <span class="p-select-cancel" @click="handleCancel">取消</span>
                    <span
                            :class="['p-select-confirm', confirmBtnType === 'disabled' ? 'p-select-confirm-disabled' : '']"
                            @click="handleConfirm"
                    >确定</span>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import Tree from '../../Tree';
import IconClear from '../../static/iconSvg/clear2.svg';
import SelectOptionMultiple from '../../SelectOptionMultiple/SelectOptionMultiple';
import cloneDeep from '../../static/utils/CloneDeep';
import {
    TileTool, FilterTool, ChangeStatus, GetParentIdById, Unique
} from '../../static/utils/TreeTool';

export default {
    name: 'TransferMini',
    components: {
        Tree,
        IconClear,
        SelectOptionMultiple
    },
    props: {
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
        // 是否返回半选状态的id
        notNull: {
            type: Boolean,
            default: false
        },
        // 是否返回半选状态的父对象数据
        returnParentNode: {
            type: Boolean,
            default: true
        },
        height: {
            type: [String, Number],
            default: 244
        },
        // 搜索值
        searchValue: {
            type: String,
            default: ''
        },
        width: {
            type: [String, Number],
            default: 240
        },
        overWidth: {
            type: [String, Number],
            default: ''
        },
        // 默认已选择的数据
        showChoseData: {
            type: Array,
            default: () => []
        },
        childDisabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            selectedData: [], // 选中的数据
            searchData: [], // 搜索出的数据
            confirmData: [], // 点击确定选择的数据
            confirmBtnType: 'disabled', // 确定按钮状态
            parentObjArr: [],
            parentNodeLen: 0 // 父节点对象的长度
        };
    },
    computed: {
        // 是否显示空状态
        notFound() {
            return this.searchData.length;
        },
        // 树形结构数据
        mulData: {
            get() {
                return this.data;
            },
            set(newData) {
                return newData;
            }
        },
        // 设置按钮区是否显示投影
        shadowShow() {
            const len = this.selectedData.length;
            const h = this.height - 100;
            if (len) return h / len < 40;
            return false;
        }
    },
    watch: {
        // 监听搜索框输入的内容
        searchValue(n, o) {
            if (n === o) return;
            if (n) {
                this.setSearchData(n);
            } else {
                this.searchData = [];
            }
        },
        // 监听选中数据改变-确定按钮状态
        selectedData(n) {
            const cd = this.confirmData;
            this.checkArrDiff(cd, n);
        },
        showChoseData: {
            handler(n, o) {
                if (n !== o) {
                    this.selectedData = cloneDeep(n);
                    this.confirmData = cloneDeep(n);
                }
            },
            deep: true
        }
    },
    mounted() {
        this.selectedData = cloneDeep(this.showChoseData);
        this.confirmData = cloneDeep(this.showChoseData);
    },
    methods: {
        /**
         * 检查两个数组是否一样
         * @param cd - confirmData 数组1
         * @param sd - selectedData 数组2
         * @return {boolean} 返回值
         */
        checkArrDiff(cd, sd) {
            if (cd.length) {
                if (sd.length) {
                    const assign = Unique([...sd, ...cd]);
                    if (assign.length !== cd.length || assign.length !== sd.length) {
                        this.confirmBtnType = 'primary';
                        return true;
                    }
                    this.confirmBtnType = 'disabled';
                    return false;
                }
                this.confirmBtnType = 'primary';
                return true;
            }
            if (sd.length) {
                this.confirmBtnType = 'primary';
                return true;
            }
            this.confirmBtnType = 'disabled';
            return false;
        },
        // 鼠标hover
        itemEnter(e) {
            const { target } = e;
            const { clientWidth, scrollWidth, title } = target;
            if (!title && scrollWidth > clientWidth) target.title = target.innerText;
        },

        getParentName(parentId) {
            const tilingTree = TileTool([], cloneDeep(this.mulData), '-1'),
                parent = tilingTree.find(item => item.id === parentId);
            if (parent) {
                return `${this.getParentName(parent.parentId)}${parent.name}/`;
            }
            return '';
        },
        // 选择的项
        treeChange({ id, checkedIds, obj }) {
            if (this.linkage) {
                // 联动
                this.selectedData = this.setSelectedData([], this.mulData);
            } else {
                // 不联动
                /**
                 * lastStage为true表示只能选择末级，处理方式与不联动一样
                 */
                const { checked, name, parentId } = obj;
                if (checked === 'checked') {
                    this.selectedData.push({ id, name: `${this.getParentName(parentId)}${name}` });
                } else {
                    this.selectedData = this.selectedData.filter(d => d.id !== id);
                }
            }
        },
        /**
         * 联动-设置选中的数据
         * @param data 接收的结果
         * @param tree 遍历列表
         * @constructor
         */
        setSelectedData(data, tree) {
            tree.forEach(d => {
                if (!this.childDisabled) {
                    if (!d.disabled) {
                        if (this.returnParentNode && this.notNull) {
                            if ((d.checked === 'checked' || d.checked === 'notNull') && d.showCheckBox) {
                                data.push({
                                    id: d.id,
                                    name: `${this.getParentName(d.parentId)}${d.name}`
                                });
                            }
                        } else {
                            if (d.checked === 'checked' && d.showCheckBox) {
                                data.push({
                                    id: d.id,
                                    name: `${this.getParentName(d.parentId)}${d.name}`
                                });
                            }
                        }
                    }
                } else {
                    if (this.returnParentNode) {
                        if ((d.checked === 'checked' || d.checked === 'notNull') && d.showCheckBox) {
                            data.push({
                                id: d.id,
                                name: `${this.getParentName(d.parentId)}${d.name}`
                            });
                            return false;
                        }
                    } else {
                        if (d.checked === 'checked' && d.showCheckBox) {
                            data.push({
                                id: d.id,
                                name: `${this.getParentName(d.parentId)}${d.name}`
                            });
                            return false;
                        }
                    }
                }
                if (d.children && d.children.length) this.setSelectedData(data, d.children);
            });
            return data;
        },
        /**
         * 移除选中项
         * @param i 索引
         * @param id id
         */
        removeItem(i, id) {
            const curItem = this.selectedData[i];
            this.selectedData.splice(i, 1);
            this.mulData = this.removeChecked(id, this.mulData);
            // 取消搜索的数据被选中
            const sd = this.searchData;
            if (sd && sd.length) {
                this.searchData = this.removeSearchDataChecked(id, 'lId', sd);
            }
        },
        /**
         * 取消树形结构选中的项
         * @param id 需要取消选中的id
         * @param mulData 数据
         * @return {*}
         */
        removeChecked(id, mulData) {
            if (this.linkage) {
                /* 上下级联动 */
                return this.linkageSetUpperAndLowerStatus(mulData, id, 'uncheck');
            }
            // 上下级不联动
            return mulData.map(d => {
                if (d.id === id) {
                    d.checked = 'uncheck';
                } else {
                    if (d.children && d.children.length) this.removeChecked(id, d.children);
                }
                return d;
            });
        },
        /**
         * 联动-设置上下级状态
         * @param mulData 需要遍历的数据
         * @param id 当前被移除选中的id
         * @param cStatus 需要设置的子集状态
         */
        linkageSetUpperAndLowerStatus(mulData, id, cStatus) {
            const tileData = TileTool([], cloneDeep(mulData), '-1');
            // 通过子级id查找父级数据
            const parentIds = GetParentIdById([], id, tileData);

            // 设置子项取消选中
            const data = this.recursionMulData(mulData, id, cStatus);
            // 接收父级数据
            const pArr = this.getParentData([], data, parentIds);
            // 设置父级checked状态
            pArr.forEach(d => {
                if (d.children && d.children.length) {
                    d.checked = ChangeStatus(d.children);
                }
            });
            // 设置选中的数据
            this.selectedData = this.setSelectedData([], data);
            return data;
        },
        /**
         * 不联动-设置上下级状态
         * @param mulData 需要遍历的数据
         * @param id 当前被移除选中的id
         * @param cStatus 需要设置的子集状态
         */
        notLinkageSetUpperAndLowerStatus(mulData, id, cStatus) {
            return mulData.map(d => {
                if (d.id === id) {
                    d.checked = cStatus;
                } else {
                    if (d.children && d.children.length) d.children = this.notLinkageSetUpperAndLowerStatus(d.children, id, cStatus);
                }
                return d;
            });
        },
        /**
         * 联动-设置子项取消选中
         * @param data 需要遍历的数据
         * @param id 当前被移除选中的id
         * @param cStatus 需要设置的子集状态
         */
        recursionMulData(data, id, cStatus) {
            return data.map(d => {
                if (d.id === id) {
                    // 设置当前id的子级选中状态
                    d.checked = cStatus;
                    if (d.children && d.children.length) {
                        d.children = this.removeChildChecked(d.children, cStatus);
                        if (this.childDisabled) {
                            d.children.forEach(item => {
                                item.disabled = false;
                            });
                        }
                    }
                } else {
                    if (d.children && d.children.length) d.children = this.recursionMulData(d.children, id, cStatus);
                }
                return d;
            });
        },
        /**
         * 联动-查找父级数据
         * @param pArr 接收找到的数据
         * @param data 需要遍历的数据
         * @param pIds 父级id组
         */
        getParentData(pArr, data, pIds) {
            data.forEach(d => {
                if (pIds.includes(d.id)) {
                    pArr.unshift(d);
                    if (d.children && d.children.length) this.getParentData(pArr, d.children, pIds);
                }
            });

            return pArr;
        },
        /**
         * 联动-设置子项取消选中
         * @param data 需要遍历的数据
         * @param cStatus 需要设置的子集状态
         */
        removeChildChecked(data, cStatus) {
            return data.map(d => {
                d.checked = cStatus;
                if (d.children && d.children.length) this.removeChildChecked(d.children, cStatus);
                return d;
            });
        },
        /**
         * 设置搜索数据取消选中
         * @param id 需要取消选中的id
         * @param flag 需要取消选中的id的key
         * @param data 需要遍历的数据
         */
        removeSearchDataChecked(id, flag, data) {
            return data.map(d => {
                if (d[flag] === id) d.selected = false;
                return d;
            });
        },
        // 设置树形结构全部取消选中
        setMulDataUncheck(data) {
            return data.map(d => {
                if (!this.childDisabled) {
                    if (!d.disabled) {
                        d.checked = 'uncheck';
                    }
                } else {
                    d.checked = 'uncheck';
                    d.disabled = false;
                }
                if (d.children && d.children.length) d.children = this.setMulDataUncheck(d.children);
                return d;
            });
        },
        // 设置一维结构全部取消选中
        setMulDataUnSelected(data) {
            return data.map(d => {
                d.selected = false;
                return d;
            });
        },
        /**
         * 设置一维结构根据条件选中
         * @param data 一维结构数据
         * @param ids 需要选中的ids
         */
        setMulDataSelectedByIds(data, ids) {
            return data.map(d => {
                d.selected = ids.includes(d.id);
                return d;
            });
        },
        /**
         * 设置树形结构根据条件选中
         * @param data 树形结构数据
         * @param ids 需要选中的ids
         */
        setTreeCheckedByIds(data, ids) {
            if (this.linkage) {
                /* 上下级联动 */
                return this.linkageSetStatusByIds(data, ids);
            }
            // 上下级不联动
            return this.notLinkageSetStatusByIds(data, ids);
        },
        /**
         * 联动-根据选中的ids设置树形结构状态
         * @param data 树形结构数据
         * @param ids 需要选中的ids
         */
        linkageSetStatusByIds(data, ids) {
            return data.map(d => {
                if (!this.childDisabled) {
                    if (ids.includes(d.id)) {
                        d.checked = 'checked';
                    } else {
                        d.checked = 'uncheck';
                    }
                    if (d.children && d.children.length) {
                        d.children = this.linkageSetStatusByIds(d.children, ids);
                    }
                    setTimeout(() => {
                        if (!ids.includes(d.id) && d.children && d.children.length) d.checked = ChangeStatus(d.children);
                    }, 0);
                } else {
                    if (ids.includes(d.id) || ids.includes(d.parentId)) {
                        d.checked = 'checked';
                        if (ids.includes(d.parentId)) {
                            d.disabled = true;
                        }
                    } else {
                        d.checked = 'uncheck';
                    }

                    if (d.children && d.children.length) {
                        d.children = this.linkageSetStatusByIds(d.children, ids);
                    }

                    if (!ids.includes(d.id) && d.children && d.children.length) {
                        d.checked = 'uncheck';
                        d.children.forEach(item => {
                            item.disabled = false;
                        });
                    }
                }
                return d;
            });
        },
        /**
         * 不联动-根据选中的ids设置树形结构状态
         * @param data 树形结构数据
         * @param ids 需要选中的ids
         */
        notLinkageSetStatusByIds(data, ids) {
            return data.map(d => {
                if (ids.includes(d.id)) d.checked = 'checked';
                else d.checked = 'uncheck';
                if (d.children && d.children.length) d.children = this.notLinkageSetStatusByIds(d.children, ids);
                return d;
            });
        },
        /**
         * 一维多选列表
         * @param selected 被选中的项
         * @param unselect 被取消的项
         * @param cb 当取新增/消选中时，执行的回调
         */
        optionChange(selected, unselect, cb) {
            if (selected && selected.selected) {
                // 增加选中项
                const { id, name } = selected;
                const n = name.replace(/<[^<>]+>/g, '');
                this.selectedData.push({ id, name: n });
                if (cb) cb(id, true);
            } else {
                // 减少选中项
                const { id } = unselect;
                this.selectedData = this.selectedData.filter(d => d.id !== id);
                if (cb) cb(id, false);
            }
        },
        /**
         * 搜索列表
         * @param selected 被选中的项
         * @param unselect 被取消的项
         */
        optionSearchChange(selected, unselect) {
            let cStatus = '',
                id = '';
            if (selected && selected.selected) {
                cStatus = 'checked';
                id = selected.lId;
            } else {
                cStatus = 'uncheck';
                id = unselect.lId;
            }
            if (this.linkage) {
                /* 上下级联动 */
                this.mulData = this.linkageSetUpperAndLowerStatus(this.mulData, id, cStatus);
            } else {
                /* 上下级不联动/只能选择末级 */
                const data = this.notLinkageSetUpperAndLowerStatus(this.mulData, id, cStatus);
                this.selectedData = this.setSelectedData([], data);
            }
        },
        /**
         * 搜索列表
         * @param v 搜索框输入的值
         */
        setSearchData(v) {
            const md = cloneDeep(this.mulData);
            const re = new RegExp(v, 'g');
            // 得到平铺的数据
            const tileData = TileTool([], md, '-1');
            if (this.lastStage) {
                /* 只能选择末级 */
                // 筛选出包涵有搜索字符的数据
                const fData = tileData.filter(d => {
                    const hasChild = tileData.find(fd => fd.parentId === d.id); // 查看是否还有子级
                    if (d.isleaf) {
                        if (!hasChild && d.name && d.name.includes(v) && !d.disabled) {
                            d.name = d.name.replace(re, `<span class="p-select-area-search-highlight">${v}</span>`);
                            return d;
                        }
                    }
                    return null;
                });
                // 得到筛选后的数据 一维数据列表
                this.searchData = FilterTool(tileData, fData);
            } else {
                /* 上下级联动/上下级不联动 */
                // 筛选出包涵有搜索字符的数据
                const fData = tileData.filter(d => {
                    if (d.isleaf) {
                        if (d.name && d.name.includes(v) && !d.disabled) {
                            d.name = d.name.replace(re, `<span class="p-select-area-search-highlight">${v}</span>`);
                            return d;
                        }
                    }
                    return null;
                });
                // 得到筛选后的数据 一维数据列表
                this.searchData = FilterTool(tileData, fData);
            }
        },
        // 清除数据
        clearObj() {
            this.mulData = this.setMulDataUncheck(this.mulData);
            this.selectedData = [];
            setTimeout(() => {
                if (this.searchData && this.searchData.length) {
                    this.searchData.forEach(item => {
                        item.selected = false;
                    });
                }
            }, 300);
            // this.$emit('changeValue', '');
        },
        // 点击清空
        handleEmpty() {
            // 如果已经有选择的数据，设置isEmpty状态
            // this.isEmpty=true;
            this.confirmBtnType = 'primary'; // 设置确定按钮状态
            this.clearObj();
        },
        // 点击取消
        handleCancel() {
            const cd = this.confirmData;
            if (cd && cd.length) {
                // 如果 confirmData与selectedData不一样才执行以下操作
                if (this.checkArrDiff(cd, this.selectedData)) {
                    this.selectedData = cloneDeep(cd);
                    const ids = cd.map(d => d.id);
                    this.mulData = this.setTreeCheckedByIds(this.mulData, ids);
                }
                this.searchData = [];
                this.$emit('changeValue', '');
            } else {
                this.clearObj();
            }
            this.$emit('cancel');
        },
        // 点击确定
        handleConfirm() {
            if (this.confirmBtnType === 'disabled') return;
            const sd = cloneDeep(this.selectedData);
            const ids = sd.map(d => d.id);
            this.confirmData = sd;
            if (!this.returnParentNode) {
                const titData = TileTool([], cloneDeep(this.data), '-1'); // 获取平铺数据
                this.parentNodeLen = titData.filter(d => d.children).length;
            } else {
                this.parentNodeLen = 0;
            }
            this.$emit('confirm', ids, sd, this.parentNodeLen);
            this.confirmBtnType = 'disabled'; // 设置确定按钮状态
            this.parentObjArr = [];
            setTimeout(() => {
                this.searchData = [];
                this.$emit('changeValue', '');
            }, 200);
        },

        // 点击某一项的回调函数
        clickCallBack(obj) {
            this.$emit('clickCallBack', obj);
        }
    }
};
</script>

<style lang="stylus">
    .p-select-area
        display: inline-flex
        background-color: $theme
        border-radius: 4px
        box-shadow: $box-shadow-bottom
        width: 100%
        height: 480px

        .p-select-area-child
            height: 100%

        .p-transfer-left
            border-right: 1px solid $grey-200
            overflow-x auto

            .p-transfer-left-input
                margin-bottom: 8px
                width: 100%

            .p-transfer-left-content
                width: 100%
                overflow-y: auto
                padding-top: 8px

                .p-transfer-left-content-none
                    width: 100%
                    padding-left: 12px
                    line-height: 38px
                    color: #c3c7cb
                    font-size: 14px
                    user-select: none

        .p-transfer-right
            .p-transfer-right-title
                display: flex
                justify-content: space-between
                align-items: center
                padding: 12px 12px 12px 16px
                border-bottom: 1px solid transparent
                line-height: 22px

                &.p-transfer-right-title-border
                    border-bottom-color: $grey-200

                > article
                    font-size: 14px

                .p-transfer-right-title-text
                    color: $grey-500

                .p-transfer-right-title-text-num
                    margin-left: 4px
                    color: $grey-900
                    font-weight: 600

                .p-transfer-right-clear
                    color: $grey-400
                    transition: color 0.3s
                    cursor: not-allowed

                .p-transfer-right-clear-active
                    color: $blue-500
                    cursor: pointer

                    &:active
                        color: $blue-600

            .p-transfer-selected
                margin-top: 8px
                width: 100%
                overflow-y: auto
                color: $grey-500
                font-size: 14px

                .p-transfer-selected-item
                    display: inline-flex
                    justify-content: space-between
                    align-items: center
                    padding: 5px 16px
                    width: 100%
                    height: 40px

                    &:hover
                        background-color $hover-color-grey

                    > span
                        display: inline-block
                        width: calc(100% - 16px)
                        color: $grey-900
                        line-height: 22px
                        white-space: nowrap
                        overflow: hidden
                        text-overflow: ellipsis

                    > svg
                        width: 14px
                        cursor: pointer

                        path
                            fill: $grey-300
                            transition: fill 0.3s

                        &:hover
                            path
                                fill: $blue-500

            .p-transfer-handle
                height: 46px
                padding: 12px 12px 12px 0
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

                .p-select-confirm-disabled
                    color: $grey-400
                    cursor: not-allowed

            .p-transfer-btn-shadow
                box-shadow: $box-shadow-top
    .p-select-area-search-highlight
        font-size 14px
        color $blue-500
</style>
