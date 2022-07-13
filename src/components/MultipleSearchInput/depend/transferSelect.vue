<template>
    <div class="p-transfer-mini" ref="transferSelect">
        <div class="p-transfer-main" :style="{height: height+'px',width: (2 * width - 2) + 'px'}">
            <div class="p-transfer-main-child p-transfer-left" :style="{width: width + 'px'}">
                <section class="p-transfer-left-bread">
                    <div class="p-transfer-left-bread-breadDiv" ref="breadParent">
                        <span class="p-transfer-left-bread-breadDiv-breadLeftDot" v-if="needTransfer">...</span>
                        <Breadcrumb class="p-transfer-left-bread-breadDiv-breadDom" ref="bread" :style="needTransfer&&{transform:`translate(${leftMoveWith}px)`}" :data="breadData" v-model="curBreadId" />
                    </div>
                </section>
                <section class="p-transfer-left-content"  :style="{height:`calc(100% - 65px)`}">
                    <section class="p-transfer-left-content-input">
                        <Input iconType="search" :iconClose="iconClose" :placeholder="placeholder" v-model="inputVal" />
                    </section>
                    <section class="p-transfer-left-content-list" :style="{maxHeight:`calc(100% - 42px)`}" v-show="!inputVal">
                        <div class="p-tree-node-check" style="padding-left: 24px">
                            <section @click="selectAllFn" style="display: inline-block">
                                <Checkbox :checked="allCheck"  />
                            </section>
                            <section class="p-tree-node-title">
                                <article class="p-tree-node-name"  v-html="'全部'"/>
                            </section>
                        </div>
                        <TreeNode
                                v-for="(item, ind) in dropData"
                                :key="item.id+'-'+ind"
                                :treeItem="item"
                                :linkage="linkage"
                                :showArrow="((item.children && item.children.length) ? true : false)"
                                :triangleShow="false"
                                :index="String(ind)"
                                @changeShowData="changeShowData"
                                @change="change"
                                ref="treeNode"
                        />
                    </section>
                    <section class="p-transfer-left-content-list" :style="{maxHeight:`calc(100% - 42px)`}" v-show="inputVal">
                        <!--搜索数据列表 -s-->
                        <SelectOptionMultiple
                                v-if="notFound"
                                :data="searchData"
                                @change="optionSearchChange"
                        />
                        <!--搜索数据列表 -e-->
                        <div class="p-transfer-left-content-none" v-else>没有找到任何内容</div>
                    </section>
                </section>
            </div>
            <div class="p-transfer-main-child p-transfer-right" :style="{width: width + 'px',overflow: 'hidden'}">
                <section :class="['p-transfer-right-title', 'p-transfer-right-title-border']">
                    <article class="p-transfer-right-title-text">已选择<span class="p-transfer-right-title-text-num" v-show="selectedData&&selectedData.length">{{selectedData.length}}</span></article>
                    <article :class="['p-transfer-right-clear', (selectedData&&selectedData.length)&&'p-transfer-right-clear-active']" @click="handleEmpty">清空</article>
                </section>
                <section class="p-transfer-selected" :style="{height: (height-143)+'px'}">
                    <article class="p-transfer-selected-item" v-for="(sd, i) in selectedData" :key="'sd-'+sd.id">
                        <div class="p-transfer-selected-item-confirmDiv" ref="confirmItemParent">
                            <span class="p-transfer-selected-item-confirmDiv-confirmDot" v-show="sd.confirmTransfer">...</span>
                            <span :title="sd.name" :style="{transform:`translate(${sd.leftMoveWith}px)`}" ref="confirmItemName">{{sd.name}}</span>
                        </div>
                        <!--                        <span @mouseenter="itemEnter">{{sd.name}}</span>-->
                        <IconClear @click.native="removeItem(i, sd.id)" />
                    </article>
                </section>
                <section :class="['p-transfer-btn', shadowShow&&'p-transfer-btn-shadow']">
                    <Button type="default" size="small" @click="handleCancel">取消</Button>
                    <Button :type="confirmBtnType" size="small" @click="handleConfirm">确定</Button>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import Input from '../../Input';
import Tree from '../../Tree';
import TreeNode from './treeNode';
import Breadcrumb from '../../Breadcrumb';
import Button from '../../Button';
import Checkbox from '../../Checkbox';
import IconClear from '../../static/iconSvg/clear2.svg';
import SelectOptionMultiple from '../../SelectOptionMultiple/SelectOptionMultiple';
import {
    TileTool, FilterTool, ChangeStatus, GetParentIdById, Unique
} from '../../static/utils/TreeTool';
import { cloneDeep } from '../../CascaderSearchList/utils';
import CloneDeep from '../../static/utils/CloneDeep';

export default {
    name: 'transferSelect',
    components: {
        Input, Tree, Button, IconClear, SelectOptionMultiple, TreeNode, Checkbox, Breadcrumb
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
        /**
             * 是否返回半选状态的id
             */
        notNull: {
            type: Boolean,
            default: false
        },
        returnParentNode: {
            type: Boolean,
            default: true
        },
        width: {
            type: [String, Number],
            default: 300
        },
        height: {
            type: [String, Number],
            default: 280
        },
        placeholder: {
            type: String,
            default: '请输入'
        },
        // 项目名称
        project: {
            type: Object,
            default: () => {}
        },
        breadObj: {
            type: Object,
            default: () => {}
        },
        // 树形结构数据
        allTreeData: {
            type: Array,
            default: () => []
        },
        // 默认选中的数据
        selectedIds: {
            type: Array,
            default: () => {}
        }
    },
    data() {
        return {
            selectedData: [], // 选中的数据
            searchData: [], // 搜索出的数据
            isEmpty: false, // 是否点击了清空按钮
            confirmData: [], // 点击确定选择的数据
            confirmBtnType: 'disabled', // 确定按钮状态
            breadData: [], // 面包屑数据
            curBreadId: '',
            inputVal: '', // 输入的值
            allCheck: 'uncheck', // 全部勾选的状态
            treeData: [], // 树形结构的数据
            dropData: [], // 下拉面板的数据
            tileData: [], // 扁平化的数据
            selectItems: [], // 勾选上的数据
            clickType: 'item', // 点击的是全部还是具体的item
            needTransfer: false, // bread面包屑是否需要左移
            leftMoveWith: 0, // bread面包屑左移的距离
            confirmTransfer: false, // confrim是否需要左移
            confirmLeftMoveWith: 0 // comfirm左移的距离
        };
    },
    computed: {
        // 是否显示空状态
        notFound() {
            return this.searchData.length;
        },
        // 设置按钮区是否显示投影
        shadowShow() {
            const len = this.selectedData.length;
            const h = this.height - 127;
            if (len) return h / len < 40;
            return false;
        },
        // 清除按钮显示
        iconClose() {
            return !!this.inputVal;
        }
    },
    watch: {
        // 监听搜索框输入的内容
        inputVal(n, o) {
            if (n === o) return;
            if (n) {
                this.setSearchData(n);
            } else {
                this.searchData = [];
            }
        },
        data: {
            handler(n, o) {
                if (n !== o) {
                    this.dropData = n;
                }
            },
            deep: true,
            immediate: true
        },
        dropData: {
            handler(n, o = []) {
                if (n !== o) {
                    const isLastNode = n.every(d => (!!d.lastNode));
                    if (!isLastNode) {
                        n.forEach(items => {
                            if (items.lastNode) {
                                items.disabled = true;
                            }
                        });
                    } else {
                        n.forEach(items => {
                            items.showCheckBox = true;
                        });
                    }
                    this.$nextTick(() => {
                        this.allCheck = n.every(item => item.checked === 'checked') ? 'checked' : 'uncheck';
                    });
                }
            },
            deep: true,
            immediate: true
        },
        breadObj: {
            handler(n, o) {
                if (n !== o) {
                    this.breadData.push(n);
                    this.curBreadId = this.breadData[this.breadData.length - 1].id;
                }
            },
            deep: true,
            immediate: true
        },
        curBreadId: {
            handler(n, o) {
                if (n !== o) {
                    if (n === this.project.id) return;
                    // if(n === '-1') return
                    this.curBreadId = n;
                    const index = this.breadData.findIndex(d => d.id === n);
                    this.breadData = this.breadData.splice(0, index + 1);
                    const item = {};
                    item.flag = 'clickBread';
                    item.id = n;
                    // if(index === ''){
                    //     item.typeId = 'a1'
                    // }
                    this.changeShowData(item);
                }
            },
            deep: true,
            immediate: true
        },
        selectedIds: {
            handler(n, o) {
                if (n !== o) {
                    if (n && n.length) {
                        this.$nextTick(() => {
                            this.setDefultSelectedFn(n);
                        });
                    }
                }
            },
            immediate: true
        },
        breadData: {
            handler(n, o) {
                if (n !== o) {
                    this.$nextTick(() => {
                        this.getBreadDomWidth();
                    });
                }
            },
            immediate: true
        },
        // 监听选中数据改变-确定按钮状态
        selectedData: {
            handler(n, o) {
                if (n !== o) {
                    const cd = this.confirmData;
                    this.checkArrDiff(cd, n);
                    n.forEach(item => {
                        this.$nextTick(() => {
                            this.getConfirmItemWidth(item);
                        });
                    });
                }
            },
            immediate: true,
            deep: true
        },
        allTreeData: {
            handler(n, o) {
                if (n != o) {
                    this.tileData = TileTool([], n, '-1');
                }
            },
            immediate: true
        }
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
            const { clientWidth, scrollWidth, textContent } = target;
            if (!textContent && scrollWidth > clientWidth) target.title = target.textContent;
        },

        // 获取bread面包屑的宽度
        getBreadDomWidth() {
            let vm = this,
                breadParentDivWidth = 0,
                breadDomWidth = 0;
            breadParentDivWidth = vm.$refs.breadParent.getBoundingClientRect() || 0;
            breadDomWidth = vm.$refs.bread.$el.getBoundingClientRect() || 0;
            if (breadParentDivWidth.width < breadDomWidth.width) {
                vm.needTransfer = true;
                vm.leftMoveWith = breadParentDivWidth.width - breadDomWidth.width;
            } else {
                vm.needTransfer = false;
                vm.leftMoveWith = 0;
            }
        },

        // 获取confirmItem数据的宽度
        getConfirmItemWidth(item) {
            let vm = this,
                itemWidth = 0,
                parentObjWidth = 0,
                itemParentWidthArr = [];
            itemParentWidthArr = vm.$refs.confirmItemParent;
            itemParentWidthArr.forEach(d => {
                if (d.innerText === item.name) {
                    parentObjWidth = d.clientWidth;
                    itemWidth = d.children[1].clientWidth;
                }
            });
            if (parentObjWidth < itemWidth) {
                vm.$nextTick(() => {
                    item.leftMoveWith = parentObjWidth - itemWidth - 5;
                    item.confirmTransfer = true;
                    vm.$set(item, 0, item.leftMoveWith);
                    vm.$set(item, 0, item.confirmTransfer);
                });
            } else {
                item.leftMoveWith = 0;
                item.confirmTransfer = false;
                vm.$set(item, 0, item.leftMoveWith);
                vm.$set(item, 0, item.confirmTransfer);
            }
        },

        /** *
             * 勾选全部输入框
             */
        selectAllFn() {
            const vm = this;
            vm.clickType = 'all';
            if (vm.allCheck === 'checked') {
                vm.allCheck = 'uncheck';
            } else {
                vm.allCheck = 'checked';
            }
            vm.dropData.forEach((item, index) => {
                if (!item.disabled) {
                    item.checked = vm.allCheck == 'checked' ? 'uncheck' : 'checked';
                    vm.$refs.treeNode[index].handleCheck(item, index, vm.clickType);
                }
            });
        },

        resetData(project, bread) {
            const vm = this;
            vm.breadData = [];
            // vm.breadData.push(project)
            vm.breadData.push(bread);
            vm.curBreadId = vm.breadData[vm.breadData.length - 1].id;
            vm.selectedData = [];
            vm.confirmData = [];
            vm.inputVal = '';
            vm.searchData = [];
        },

        // 设置默认选中数据
        setDefultSelectedFn(n) {
            const tileData = TileTool([], this.allTreeData, '-1');
            for (let i = 0; i < n.length; i++) {
                for (let j = 0; j < tileData.length; j++) {
                    if (n[i] === tileData[j].id) {
                        const curItem = tileData[j];
                        if (!curItem.disabled) {
                            curItem.checked = 'checked';
                            this.change(curItem);
                        }
                    }
                }
            }
            this.confirmData = CloneDeep(this.selectedData);
        },

        // 设置checked状态
        setCheckedStatus(data, status) {
            return data.map(d => {
                if (!d.disabled) {
                    d.checked = status;
                }
                if (d.children && d.children.length) d.children = this.setCheckedStatus(d.children, status);
                return d;
            });
        },

        /**
             * 点击某项
             * @param obj 返回当前点击对象
             * @param index 索引串
             */
        change(obj) {
            const { id, parentId, checked } = obj;
            const data = TileTool([], this.allTreeData, '-1');
            data.forEach(d => {
                if (d.id === id) {
                    d.checked = checked;
                }
            });
            if (this.linkage) this.changeParentChecked(data, parentId);
            const checkedObjArr = this.filterIds(this.allTreeData);
            this.selectedData = this.setSelectedData([], this.allTreeData);
            const checkedIds = checkedObjArr.map(d => d.id);
            this.$emit('change', {
                id, checkedIds, obj, checkedObjArr
            });
            if (this.clickType === 'item') {
                if (this.dropData.every(item => item.checked == 'checked')) {
                    this.allCheck = 'checked';
                } else {
                    this.allCheck = 'uncheck';
                }
            }
        },

        /**
             * 改变被筛选到的数据的状态
             * @param data
             * @param id 当前操作数据的id
             */
        changeParentChecked(curData, parentId) {
            const parentNode = curData.filter(d => d.id == parentId);
            if (parentNode && parentNode.length != 0) {
                parentNode.forEach(d => {
                    d.checked = this.ChangeStatus(d.children);
                    this.$emit('changeParentNodeStatus', d);
                });
                const topParent = curData.filter(d => (d.id === parentNode[0].parentId && parentNode[0].parentId != '-1'));
                if (topParent.length) {
                    this.changeParentChecked(curData, parentNode[0].parentId);
                }
            }
        },

        /**
             * 改变tree的checked状态
             * @param data
             * @return {string}
             * @constructor
             */
        ChangeStatus(data) {
            let checked = '';
            // 去除所有disabled状态的数据
            data = data.filter(d => !d.disabled);
            if (data.every(d => d.checked === 'checked')) {
                checked = 'checked';
            } else if (data.every(d => d.checked === 'uncheck')) {
                checked = 'uncheck';
            } else {
                checked = 'notNull';
            }
            return checked;
        },

        /**
             *  筛选选中的id
             */
        filterIds(data) {
            const arr = [];
            this.recursionIds(data, arr);
            return arr;
        },

        /**
             * 筛选选中的id
             * @param data
             * @param arr
             */
        recursionIds(data, arr) {
            const { returnParentNode, notNull } = this;
            data.forEach(d => {
                const hasChildren = d.children && d.children.length;
                if (returnParentNode) {
                    if (d.checked === 'checked') arr.push(d);
                    if (notNull && d.checked === 'notNull') arr.push(d);
                } else {
                    if (d.checked === 'checked') arr.push(d);
                }
                if (hasChildren) this.recursionIds(d.children, arr);
            });
        },

        /**
             * 联动-设置选中的数据
             * @param data 接收的结果
             * @param tree 遍历列表
             */
        setSelectedData(data, tree) {
            tree.forEach(d => {
                const sameParentNode = tree.filter(item => item.parentId === d.parentId && d.parentId != '-1');
                let LN = false; // 同级情况下是否是末级节点
                if (sameParentNode.length != 0) {
                    LN = !!sameParentNode.every(sameItem => sameItem.lastNode);
                }
                if (!d.disabled && LN) {
                    if (this.notNull && this.returnParentNode) {
                        if (d.checked === 'checked' || d.checked === 'notNull') {
                            data.push({
                                id: d.id,
                                name: `${this.getParentName(d.parentId)}${d.name}`
                            });
                        }
                    } else {
                        if (d.checked === 'checked') {
                            data.push({
                                id: d.id,
                                name: `${this.getParentName(d.parentId)}${d.name}`
                            });
                        }
                    }
                }
                if (d.children && d.children.length) this.setSelectedData(data, d.children);
            });
            return data;
        },

        getParentName(parentId) {
            const tilingTree = TileTool([], cloneDeep(this.allTreeData), '-1'),
                parent = tilingTree.find(item => item.id === parentId);
            if (parent) {
                return `${this.getParentName(parent.parentId)}${parent.name}/`;
            }
            return '';
        },

        /**
             * 移除选中项
             * @param i 索引
             * @param id id
             */
        removeItem(i, id) {
            this.selectedData.splice(i, 1);
            this.$parent.allTreeData = this.removeChecked(id, this.allTreeData);
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
            const tileData = TileTool([], JSON.parse(JSON.stringify(mulData)), '-1');
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
                    if (d.children && d.children.length) d.children = this.removeChildChecked(d.children, cStatus);
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

        /**
             * 搜索列表
             * @param v 搜索框输入的值
             */
        setSearchData(v) {
            const md = JSON.parse(JSON.stringify(this.allTreeData));
            const re = new RegExp(v, 'g');
            // 得到平铺的数据
            const tileData = TileTool([], md, '-1');
            if (this.lastStage) {
                /* 只能选择末级 */
                // 筛选出包涵有搜索字符的数据
                const fData = tileData.filter(d => {
                    const hasChild = tileData.find(fd => fd.parentId === d.id); // 查看是否还有子级
                    if (!hasChild && d.name.includes(v) && d.disabled !== true) {
                        d.name = d.name.replace(re, `<span class="p-transfer-mini-search-highlight">${v}</span>`);
                        return d;
                    }
                    return null;
                });
                    // 得到筛选后的数据 一维数据列表
                this.searchData = FilterTool(tileData, fData);
            } else {
                /* 上下级联动/上下级不联动 */
                // 筛选出包涵有搜索字符的数据
                const fData = tileData.filter(d => {
                    if (d.name.includes(v) && d.disabled !== true) {
                        d.name = d.name.replace(re, `<span class="p-transfer-mini-search-highlight">${v}</span>`);
                        return d;
                    }
                    return null;
                });
                    // 得到筛选后的数据 一维数据列表
                this.searchData = FilterTool(tileData, fData);
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
                this.treeData = this.linkageSetUpperAndLowerStatus(this.allTreeData, id, cStatus);
            } else {
                /* 上下级不联动/只能选择末级 */
                const data = this.notLinkageSetUpperAndLowerStatus(this.allTreeData, id, cStatus);
                this.selectedData = this.setSelectedData([], data);
            }
        },

        // 清除数据
        clearObj() {
            this.$parent.allTreeData = this.setMulDataUncheck(this.allTreeData);
            this.selectedData = [];
            this.searchData = [];
            this.$emit('changeValue', '');
        },

        // 设置树形结构全部取消选中
        setMulDataUncheck(data) {
            return data.map(d => {
                d.checked = 'uncheck';
                this.$emit('changeParentNodeStatus', d);
                if (d.children && d.children.length) d.children = this.setMulDataUncheck(d.children);
                return d;
            });
        },

        // 切换下拉面板的数据 item.flag 判断点击的是 item 还是 面包屑触发的方法
        changeShowData(item) {
            this.$emit('changeShowData', item);
            if (item.flag === 'clickItem') {
                const obj = {};
                obj.name = item.name;
                obj.id = item.id;
                this.breadData.push(obj);
                this.curBreadId = item.id;
            }
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

        // 点击清空
        handleEmpty() {
            // 如果已经有选择的数据，设置isEmpty状态
            this.isEmpty = true;
            this.confirmBtnType = 'primary'; // 设置确定按钮状态
            this.allCheck = 'uncheck';
            this.clearObj();
        },
        // 点击取消
        handleCancel() {
            const cd = this.confirmData;
            if (cd && cd.length) {
                // 如果 confirmData 与 selectedData 不一样才执行以下操作
                if (this.checkArrDiff(cd, this.selectedData)) {
                    this.selectedData = JSON.parse(JSON.stringify(cd));
                    const ids = cd.map(d => d.id);
                    this.mulData = this.setTreeCheckedByIds(this.allTreeData, ids);
                }
                this.searchData = [];
                this.inputVal = '';
                this.$emit('changeValue', '');
            } else {
                this.clearObj();
            }
            this.$emit('cancel');
        },
        // 点击确定
        handleConfirm() {
            const sd = JSON.parse(JSON.stringify(this.selectedData));
            const ids = sd.map(d => d.id);
            this.confirmData = sd;
            this.$emit('confirm', ids, sd);
            this.confirmBtnType = 'disabled'; // 设置确定按钮状态
            setTimeout(() => {
                this.searchData = [];
                this.inputVal = '';
                this.$emit('changeValue', '');
            }, 200);
        }
    }
};
</script>

<style lang="stylus">
    @import "../../static/stylus/transfer/transfer.styl"
    .p-transfer-mini
        display inline-block
        width 100% !important
        .p-transfer-main
            .p-transfer-left
                padding-top 0
                .p-transfer-left-bread
                    display flex
                    justify-content flex-start
                    height 64px
                    border-bottom 1px solid $grey-200
                    align-items: center
                    padding-left: 16px
                    padding-right: 28px
                    .p-transfer-left-bread-breadDiv
                        text-overflow ellipsis
                        white-space nowrap
                        width 100%
                        overflow hidden
                        position: relative;
                        .p-transfer-left-bread-breadDiv-breadLeftDot
                            width 15px
                            height 100%
                            position absolute
                            left 0
                            background-color $white
                            z-index 5
                            color $grey-500
                        .p-transfer-left-bread-breadDiv-breadDom
                            width max-content
                .p-transfer-left-content
                    .p-transfer-left-content-input
                        padding-left 25px
                    .p-transfer-left-content-list
                        margin-top 8px
            .p-transfer-right
                .p-transfer-selected
                    .p-transfer-selected-item
                        width 99%
                        &:hover
                            .p-transfer-selected-item-confirmDiv-confirmDot
                                background-color $hover-color-grey !important
                        .p-transfer-selected-item-confirmDiv
                            display inline-block
                            width calc(100% - 16px)
                            overflow hidden
                            position relative
                            transition background-color .3s
                            .p-transfer-selected-item-confirmDiv-confirmDot
                                display block
                                line-height 22px
                                background-color $white
                                height 100%
                                position absolute
                                left 0
                                width 15px
                                z-index 5
                                transition background-color .3s
                            span
                                color $grey-900
                                width max-content
                                display inline-block
                                white-space nowrap
                                line-height 22px
        .p-transfer-mini-search-highlight
            font-size 14px
            color $blue-500

</style>
