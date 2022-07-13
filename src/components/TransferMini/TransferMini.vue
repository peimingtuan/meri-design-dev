<template>
    <div class="p-transfer-mini">
        <div class="p-transfer-main" :style="{height: height+'px'}">
            <div class="p-transfer-main-child p-transfer-left">
                <section class="p-transfer-left-content" :style="{height: (height-48)+'px'}" v-show="!searchValue">
                    <!--树形结构数据-->
                    <Tree
                            v-if="flat==='mt'"
                            :multiple="true"
                            :linkage="linkage"
                            :lastStage="lastStage"
                            :notNull="notNull"
                            :data="mulData"
                            @change="treeChange"
                    />
                    <!--一维多选列表-->
                    <SelectOptionMultiple
                            v-else
                            :data="mulData"
                            @change="optionChange"
                    />
                </section>
                <section class="p-transfer-left-content" :style="{height: (height-48)+'px'}" v-show="searchValue">
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
                    <article class="p-transfer-right-title-text"
                    >已选择<span class="p-transfer-right-title-text-num" v-show="selectedData&&selectedData.length"
                    >{{selectedData.length}}</span></article>
                    <article :class="['p-transfer-right-clear', (selectedData&&selectedData.length)&&'p-transfer-right-clear-active']" @click="handleEmpty"
                    >清空</article>
                </section>
                <section class="p-transfer-selected" :style="{height: (height-127)+'px'}">
                    <article class="p-transfer-selected-item" v-for="(sd, i) in selectedData" :key="'sd-'+sd.id">
                        <span @mouseenter="itemEnter">{{sd.name}}</span>
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
import Tree from '../Tree';
import Button from '../Button';
import IconClear from '../static/iconSvg/clear2.svg';
import SelectOptionMultiple from '../SelectOptionMultiple/SelectOptionMultiple';
import {
    TileTool, FilterTool, ChangeStatus, GetParentIdById, Unique
} from '../static/utils/TreeTool';

export default {
    name: 'TransferMini',
    components: {
        Tree,
        Button,
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
        /**
             * 是否返回半选状态的id
             */
        notNull: {
            type: Boolean,
            default: false
        },
        height: {
            type: [String, Number],
            default: 244
        },
        // 输入的值改变
        searchValue: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            selectedData: [], // 选中的数据
            searchData: [], // 搜索出的数据
            isEmpty: false, // 是否点击了清空按钮
            confirmData: [], // 点击确定选择的数据
            confirmBtnType: 'disabled' // 确定按钮状态
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
                return this.data;
            },
            set(newData) {
                return newData;
            }
        },
        // 设置按钮区是否显示投影
        shadowShow() {
            const len = this.selectedData.length;
            const h = this.height - 127;
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
            const { clientWidth, scrollWidth, title } = target;
            if (!title && scrollWidth > clientWidth) target.title = target.innerText;
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
                const { checked, name } = obj;
                if (checked === 'checked') {
                    this.selectedData.push({ id, name });
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
                if (this.notNull) {
                    if (d.checked === 'checked' || d.checked === 'notNull') data.push({ id: d.id, name: d.name });
                } else {
                    if (d.checked === 'checked') data.push({ id: d.id, name: d.name });
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
            this.mulData = this.removeChecked(id, this.mulData);
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
                    this.mulData = this.linkageSetUpperAndLowerStatus(this.mulData, id, cStatus);
                } else {
                    /* 上下级不联动/只能选择末级 */
                    const data = this.notLinkageSetUpperAndLowerStatus(this.mulData, id, cStatus);
                    this.selectedData = this.setSelectedData([], data);
                }
            } else {
                this.optionChange(selected, unselect, (id, status) => {
                    this.mulData = this.mulData.map(d => {
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
            const md = JSON.parse(JSON.stringify(this.mulData));
            const re = new RegExp(v, 'g');
            if (this.flat === 'mt') {
                // 得到平铺的数据
                const tileData = TileTool([], md, '-1');
                if (this.lastStage) {
                    /* 只能选择末级 */
                    // 筛选出包涵有搜索字符的数据
                    const fData = tileData.filter(d => {
                        const hasChild = tileData.find(fd => fd.parentId === d.id); // 查看是否还有子级
                        if (!hasChild && d.name.includes(v)) {
                            d.name = d.name.replace(re, `<span class="p-transfer-mini-highlight">${v}</span>`);
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
                        if (d.name.includes(v)) {
                            d.name = d.name.replace(re, `<span class="p-transfer-mini-highlight">${v}</span>`);
                            return d;
                        }
                        return null;
                    });
                        // 得到筛选后的数据 一维数据列表
                    this.searchData = FilterTool(tileData, fData);
                }
            } else {
                this.searchData = md.filter(d => {
                    if (d.name.includes(v)) {
                        d.name = d.name.replace(re, `<span class="p-transfer-mini-highlight">${v}</span>`);
                        return d;
                    }
                    return null;
                });
            }
        },
        // 清除数据
        clearObj() {
            if (this.flat === 'mt') this.mulData = this.setMulDataUncheck(this.mulData);
            else this.mulData = this.setMulDataUnSelected(this.mulData);

            this.selectedData = [];
            this.searchData = [];
            this.$emit('changeValue', '');
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
            const cd = this.confirmData;
            if (cd && cd.length) {
                // 如果 confirmData与selectedData不一样才执行以下操作
                if (this.checkArrDiff(cd, this.selectedData)) {
                    this.selectedData = JSON.parse(JSON.stringify(cd));
                    const ids = cd.map(d => d.id);
                    if (this.flat === 'mt') {
                        this.mulData = this.setTreeCheckedByIds(this.mulData, ids);
                    } else {
                        this.mulData = this.setMulDataSelectedByIds(this.mulData, ids);
                    }
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
            const sd = JSON.parse(JSON.stringify(this.selectedData));
            const ids = sd.map(d => d.id);
            this.confirmData = sd;
            this.$emit('confirm', ids, sd);
            this.confirmBtnType = 'disabled'; // 设置确定按钮状态

            setTimeout(() => {
                this.searchData = [];
                this.$emit('changeValue', '');
            }, 200);
        }
    }
};
</script>

<style lang="stylus">

    @import "../static/stylus/transfer/transfer.styl"

    .p-transfer-mini
        display inline-block
        width 480px
    .p-transfer-mini-highlight
        font-size 14px
        color $blue-500

</style>
