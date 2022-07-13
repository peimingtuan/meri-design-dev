<template>
    <div class="p-transfer">
        <div class="p-transfer-main">
            <div v-if="isEnter" class="p-transfer-main-child p-transfer-left">
                <section class="p-transfer-left-input">
                    <Input iconType="search" :iconClose="iconClose" :placeholder="placeholder" @pressEnter="enterSearch" v-model="inputVal"
                           @close="iconCloseHandle"/>
                </section>
                <section class="p-transfer-left-content" v-show="!isSearchState">
                    <!--树形结构数据-->
                    <Tree
                            v-if="flat==='mt'"
                            :multiple="true"
                            :linkage="linkage"
                            :lastStage="lastStage"
                            :notNull="notNull"
                            :data="treeData"
                            :leftPosition="28"
                            @change="treeChange"
                    />
                    <!--一维多选列表-->
                    <SelectOptionMultiple
                            v-else
                            :data="treeData"
                            @change="optionChange"
                    />
                </section>
                <section class="p-transfer-left-content" v-show="isSearchState">
                    <!--搜索数据列表 -s-->
                    <SelectOptionMultiple
                            v-if="notFound"
                            :data="searchData"
                            @change="optionSearchChange"
                    />
                    <!--搜索数据列表 -e-->
                    <div class="p-transfer-left-content-none" v-else>没有找到任何内容</div>
                </section>
            </div>
            <div v-else class="p-transfer-main-child p-transfer-left">
                <section class="p-transfer-left-input">
                    <Input iconType="search" :iconClose="iconClose" :placeholder="placeholder" v-model="inputVal"
                           @close="iconCloseHandle"/>
                </section>
                <section class="p-transfer-left-content" v-show="!inputVal">
                    <!--树形结构数据-->
                    <Tree
                            v-if="flat==='mt'"
                            :multiple="true"
                            :linkage="linkage"
                            :lastStage="lastStage"
                            :notNull="notNull"
                            :data="treeData"
                            :leftPosition="28"
                            @change="treeChange"
                    />
                    <!--一维多选列表-->
                    <SelectOptionMultiple
                            v-else
                            :data="treeData"
                            @change="optionChange"
                    />
                </section>
                <section class="p-transfer-left-content" v-show="inputVal">
                    <!--搜索数据列表 -s-->
                    <SelectOptionMultiple
                            v-if="notFound"
                            :data="searchData"
                            @change="optionSearchChange"
                    />
                    <!--搜索数据列表 -e-->
                    <div class="p-transfer-left-content-none" v-else>没有找到任何内容</div>
                </section>
            </div>
            <div class="p-transfer-main-child p-transfer-right">
                <section :class="['p-transfer-right-title', 'p-transfer-right-title-border']">
                    <article class="p-transfer-right-title-text">已选
                        <span class="p-transfer-right-title-text-num" v-show="selectedData&&selectedData.length">{{selectedData.length}}</span>
                    </article>
                    <article
                            :class="['p-transfer-right-clear', (selectedData&&selectedData.length)&&'p-transfer-right-clear-active']"
                            @click="handleEmpty">清空
                    </article>
                </section>
                <section class="p-transfer-selected">
                    <article class="p-transfer-selected-item" v-for="(sd, i) in selectedData" :key="'sd-'+sd.id">
                        <span @mouseenter="itemEnter">{{sd.name}}</span>
                        <IconClear @click.native="removeItem(i, sd.id)"/>
                    </article>
                </section>
                <section :class="['p-transfer-btn', shadowShow&&'p-transfer-btn-shadow']">
                    <Button type="default" size="medium" @click="handleCancel">取消</Button>
                    <Button :type="confirmBtnType" size="medium" @click="handleConfirm">确定</Button>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import Input from '../Input';
import Tree from '../Tree';
import Button from '../Button';
import IconClear from '../static/iconSvg/clear2.svg';
import SelectOptionMultiple from '../SelectOptionMultiple/SelectOptionMultiple';
import cloneDeep from '../static/utils/CloneDeep';
import {
    TileTool,
    FilterTool,
    ChangeStatus,
    GetParentIdById,
    Unique,
    PackageTool,
    initTreeData, setSelectIdSTree
} from '../static/utils/TreeTool';

export default {
    name: 'Transfer',
    components: {
        Input,
        Tree,
        Button,
        IconClear,
        SelectOptionMultiple
    },
    props: {
        isEnter:{
            type:Boolean,
            default:false
        },
        isShow:{
            type:Boolean,
            default:false
        },
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
        // 是否返回半选状态父对象数据
        returnParentNode: {
            type: Boolean,
            default: true
        },
        // 占位符
        placeholder: {
            type: String,
            default: '请选择'
        },
        // 设置默认选中数据
        selectedIds: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            isSearchState:false,
            inputVal: '', // 输入的值
            selectedData: [], // 选中的数据
            searchData: [], // 搜索出的数据
            isEmpty: false, // 是否点击了清空按钮
            confirmData: [], // 点击确定选择的数据
            confirmBtnType: 'disabled', // 确定按钮状态
            treeData: []
        };
    },
    computed: {
        /*
        *   mt-多选树形结构
        *   mn-多选一维结构
        */
        flat() {
            const tree = this.data.some(item => item.children && item.children.length); // 判断数组是一维还是多维 返回true表示多维
            if (tree) return 'mt';
            return 'mn';
        },
        // 是否显示空状态
        notFound() {
            return this.searchData.length;
        },
        // 树形结构数据
        mulData: {
            get() {
                return initTreeData(PackageTool(TileTool([], this.treeData, '-1')));
            },
            set(newData) {
                return newData;
            }
        },
        // 设置按钮区是否显示投影
        shadowShow() {
            const len = this.selectedData.length;
            const h = 480 - 127;
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
                if(!this.isEnter)this.setSearchData(n);
            } else {
                this.isSearchState=false
                this.searchData = [];
            }
        },
        // 监听选中数据改变-确定按钮状态
        selectedData(n) {
            const cd = this.confirmData;
            this.checkArrDiff(cd, n);
        },
        data: {
            handler(newVal, oldVal) {
                if(this.isShow){
                    if (this.flat === 'mt') this.setData(this.selectedIds, newVal);
                    else {
                        this.treeData = newVal;
                        //this.selectedData=[]
                        if (this.selectedIds && this.selectedIds.length) {
                            for (let i = 0; i < this.selectedIds.length; i++) {
                                for (let j = 0; j < this.treeData.length; j++) {
                                    if ((this.selectedIds[i] === this.treeData[j].id) && !this.treeData[j].disabled) {
                                        this.selectedData.push(this.treeData[j]);
                                    }
                                }
                            }
                        }
                        this.confirmData = JSON.parse(JSON.stringify(this.selectedData));
                    }
                }else{
                    if (newVal !== oldVal) {
                        if (this.flat === 'mt') this.setData(this.selectedIds, newVal);
                        else {
                            this.treeData = newVal;
                            if (this.selectedIds && this.selectedIds.length) {
                                for (let i = 0; i < this.selectedIds.length; i++) {
                                    for (let j = 0; j < this.treeData.length; j++) {
                                        if ((this.selectedIds[i] === this.treeData[j].id) && !this.treeData[j].disabled) {
                                            this.selectedData.push(this.treeData[j]);
                                        }
                                    }
                                }
                            }
                            this.confirmData = JSON.parse(JSON.stringify(this.selectedData));
                        }
                    }
                }
                // this.treeData = this.flat === 'mt' ? initTreeData(PackageTool(TileTool([], newVal, '-1'))) : newVal
            },
            deep: true,
            immediate: true
        }
    },
    // mounted() {
    // this.treeData = this.flat === 'mt' ? initTreeData(PackageTool(TileTool([], this.data, '-1'))) : this.data
    // },
    methods: {
        //enter搜索 Evan-Pei add
        enterSearch(inputVal){
            if(this.isEnter){
                this.isSearchState=true
                if (inputVal) {
                    this.setSearchData(inputVal);
                } else {
                    this.isSearchState=false
                    this.searchData = [];
                }
            }
        },
        // 根据默认绑定的数据设置树形数据
        setData(selectIds, data) {
            this.selectedData = [];
            if (selectIds.length) {
                const { resultData, selectedData } = setSelectIdSTree(selectIds, cloneDeep(data), this.linkage, this.notNull, this.lastStage);
                this.treeData = resultData;
                if (this.linkage) {
                    this.selectedData = this.setSelectedData([], this.treeData);
                } else {
                    selectedData.forEach(item => {
                        if (!item.disabled) {
                            this.selectedData.push({
                                id: item.id,
                                name: `${this.getParentName(item.parentId)}${item.name}`
                            });
                        }
                    });
                }

                this.confirmData = JSON.parse(JSON.stringify(this.selectedData));
            } else {
                this.treeData = initTreeData(PackageTool(TileTool([], data, '-1')));
            }
        },
        // 清除按钮
        iconCloseHandle() {
            this.inputVal = '';
        },
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
            const tilingTree = TileTool([], cloneDeep(this.treeData), '-1'),
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
                this.selectedData = this.setSelectedData([], this.treeData);
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
             */
        setSelectedData(data, tree) {
            tree.forEach(d => {
                if (!d.disabled) {
                    if (this.notNull && this.returnParentNode) {
                        if (d.checked === 'checked' || d.checked === 'notNull') {
                            data.push({
                                id: d.id,
                                name: `${this.getParentName(d.parentId)}${d.name}`
                            });
                        }
                    } else {
                        if (!d.children) {
                            if (d.checked === 'checked') {
                                data.push({
                                    id: d.id,
                                    name: `${this.getParentName(d.parentId)}${d.name}`
                                });
                            }
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
            this.selectedData.splice(i, 1);
            this.treeData = this.removeChecked(id, this.treeData);
            // 取消搜索的数据被选中
            const sd = this.searchData;
            if (sd && sd.length) {
                if (this.flat === 'mt') {
                    this.searchData = this.removeSearchDataChecked(id, 'lId', sd);
                } else {
                    this.searchData = this.removeSearchDataChecked(id, 'id', sd);
                }
            }
        },
        /**
             * 取消树形结构选中的项
             * @param id 需要取消选中的id
             * @param mulData 数据
             * @return {*}
             */
        removeChecked(id, mulData) {
            if (this.flat === 'mt') {
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
            }
            return mulData.map(d => {
                if (d.id === id) d.selected = false;
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
        // 设置树形结构全部取消选中
        setMulDataUncheck(data) {
            return data.map(d => {
                d.checked = 'uncheck';
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
            if (this.flat === 'mt') {
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
                    this.treeData = this.linkageSetUpperAndLowerStatus(this.treeData, id, cStatus);
                } else {
                    /* 上下级不联动/只能选择末级 */
                    const data = this.notLinkageSetUpperAndLowerStatus(this.treeData, id, cStatus);
                    this.selectedData = this.setSelectedData([], data);
                }
            } else {
                this.optionChange(selected, unselect, (id, status) => {
                    this.treeData = this.treeData.map(d => {
                        if (d.id === id) d.selected = status;
                        return d;
                    });
                });
            }
        },
        /**
             * 搜索列表
             * @param v 搜索框输入的值
             */
        setSearchData(v) {
            const md = JSON.parse(JSON.stringify(this.treeData));
            const re = new RegExp(v, 'g');
            if (this.flat === 'mt') {
                // 得到平铺的数据
                const tileData = TileTool([], md, '-1');
                if (this.lastStage) {
                    /* 只能选择末级 */
                    // 筛选出包涵有搜索字符的数据
                    const fData = tileData.filter(d => {
                        const hasChild = tileData.find(fd => fd.parentId === d.id); // 查看是否还有子级
                        if (!hasChild && d.name.includes(v) && d.disabled !== true) {
                            d.name = d.name.replace(re, `<span class="p-transfer-search-highlight">${v}</span>`);
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
                            d.name = d.name.replace(re, `<span class="p-transfer-search-highlight">${v}</span>`);
                            return d;
                        }
                        return null;
                    });
                        // 得到筛选后的数据 一维数据列表
                    this.searchData = FilterTool(tileData, fData);
                }
            } else {
                this.searchData = md.filter(d => {
                    if (d.name.includes(v) && d.disabled !== true) {
                        d.name = d.name.replace(re, `<span class="p-transfer-search-highlight">${v}</span>`);
                        return d;
                    }
                    return null;
                });
            }
        },
        // 清除数据
        clearObj() {
            if (this.flat === 'mt') this.treeData = this.setMulDataUncheck(this.treeData);
            else this.treeData = this.setMulDataUnSelected(this.treeData);

            this.selectedData = [];
            this.searchData = [];
            this.inputVal = '';
        },
        // 点击清空
        handleEmpty() {
            // 如果已经有选择的数据，设置isEmpty状态
            this.isEmpty = true;
            this.confirmBtnType = 'primary'; // 设置确定按钮状态
            this.clearObj();
        },
        // 点击取消
        handleCancel() {
            const sd = JSON.parse(JSON.stringify(this.selectedData));
            if(sd.length===0)this.confirmData = sd;//Evan-Pei edit
            const cd = this.confirmData;
            if (cd && cd.length) {
                // 如果 confirmData与selectedData不一样才执行以下操作
                if (this.checkArrDiff(cd, this.selectedData)) {
                    this.selectedData = JSON.parse(JSON.stringify(cd));
                    const ids = cd.map(d => d.id);
                    if (this.flat === 'mt') {
                        this.treeData = this.setTreeCheckedByIds(this.treeData, ids);
                    } else {
                        this.treeData = this.setMulDataSelectedByIds(this.treeData, ids);
                    }
                }
                this.searchData = [];
                this.inputVal = '';
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
            }, 200);
        }
    }
};
</script>

<style lang="stylus">

    @import "../static/stylus/transfer/transfer.styl"

    .p-transfer
        display inline-block
        width 600px
        font-size 0

        .p-transfer-left-content
            height calc(100% - 44px)

        .p-transfer-selected
            height calc(100% - 144px)
    .p-transfer-search-highlight
        color $blue-500
        font-size 14px

</style>
