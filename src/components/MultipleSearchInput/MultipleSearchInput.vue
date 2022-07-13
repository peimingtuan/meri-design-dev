<template>
    <div :class="['p-multiple-search-input-component']" :style="{width:`${width}px`}" ref="msiTag">
        <!--    <div :class="['p-multiple-search-input-component',transferShow&&'p-multiple-search-input-component-active']" ref="msiTag">-->
        <div :class="['p-multiple-search-input-content']">
            <!-- input框左边 start-->
            <section class="p-multiple-search-input-content-left">
                <!--                <DropDownButton @click="dropDownFn" @triangleStatus="triangleStatus" style="width: 100%" type="default" v-model="treeId" interactive="tap" drop-down-type="default-drop" :drop-down-list="firstTypeData">{{typeName}}</DropDownButton>-->
                <Select :width="selectWidth" style="max-width: 100%" :transfer="transfer" v-model="treeId" @triangleStatus.native="triangleStatus" @focusChange="focusChange"  :isReadOnly="true"  :hideClear='true' :selectdata="firstTypeData" />
            </section>
            <!-- input框左边 end-->
            <!-- input框右边 start-->
            <section class="p-multiple-search-input-content-right" :style="{width: `calc(100% - ${selectWidth}px)`}" @click="changeTriangle(true)"  @mouseenter="popoverTipEnter" @mouseleave="mouseLeave">
                <span :class="['p-select-input-place',(!showDropPine && selectedData.length)&&'p-select-input-place-selected']">
                    <span v-show="!isAllChoice && selectedData.length">已选择<span ref="countTag">{{selectedData.length}}</span>项</span>
                    <span v-show="isAllChoice && selectedData.length">全部</span>
                    <span v-show="!selectedData.length">{{placeholder}}</span>
                </span>
                <TriangleSvg :class="['p-select-input-svg', !showDropPine&&'p-select-input-rotate']"/>
            </section>
            <!-- input框右边 end-->
        </div>
    </div>
</template>

<script>
import TriangleSvg from '../static/iconSvg/triangle.svg';
import Select from '../Select';
import PopoverTip from '../PopoverTip';
import selectArea from './depend/selectArea';
import { PackageTool, TileTool } from '../static/utils/TreeTool';
import CloneDeep from '../static/utils/CloneDeep';
import { cloneDeep } from '../CascaderSearchList/utils';

export default {
    name: 'MultipleSearchInput',
    components: {
        TriangleSvg, Select
    },
    data() {
        return {
            treeId: '', // 第一个下拉框的id
            typeName: '', // 第一个下拉框的名称
            selectedData: [], // 第二个已选择的数据
            showDropPine: false, // 下拉面板的显示隐藏
            isAllChoice: false, // 是否选择了全部
            selectId: '121',
            popoverTip: null,
            timer: null,
            transferShow: false, // 穿梭框显示
            targetVm: null,
            dropDownButtonShow: false, // 类型选择下拉框的显示隐藏
            project: {
                name: '', // 项目名称
                id: '' // 项目id
            },
            firstTypeData: [], // 类型选择的数据
            tileData: [], // 平铺数据
            finalDropData: [], // 这个是去掉了最外面一层的数据
            finalTreeData: [], // 最终展示在下拉面板上的数据
            curTreeData: [], // 当前展示的树
            breadObj: {}, // 面包屑对象
            activeClose: false,
            popoverText: '', // popover的文字
            selectFocus: false, // 左侧的select组件是否为获得焦点的状态
            dropDownFocus: false // 右侧下拉面板是否为获得焦点的状态
        };
    },
    props: {
        // 盒子宽度
        width: {
            type: [String, Number],
            default: 300
        },
        // 高度
        height: {
            type: [String, Number],
            default: 480
        },
        // 与父级DOM的componentId相对应的id
        transfer: {
            type: [String, Array],
            default: ''
        },
        // 下拉面板的数据
        treeData: {
            type: Object,
            default: () => {}
        },
        // 默认选中的数据
        selectedIds: {
            type: Array,
            default: () => []
        },
        // 占位符
        placeholder: {
            type: String,
            default: '请选择'
        },
        // 联动
        linkage: {
            type: Boolean,
            default: true
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
        }
    },
    computed: {
        selectWidth() {
            return this.width / 3;
        }
    },
    watch: {
        // 监听是否可关闭弹窗
        activeClose: {
            handler(n, o = false) {
                if (n === o) return;
                setTimeout(() => {
                    this.$emit('focusChange', n);
                }, 300);
            },
            immediate: true
        },
        treeId: {
            handler(n, o) {
                const vm = this;
                if (n !== o) {
                    vm.typeId = n;
                    vm.firstTypeData.forEach(item => {
                        if (item.id === n) {
                            vm.typeName = item.name;
                        }
                    });
                    vm.setData(n);
                    // this.setDropDataFn(vm.treeId);
                    this.dropDownButtonShow = false;
                }
            }
        },
        // 下拉面板是否显示
        transferShow(n, o = false) {
            if (n !== o) {
                if (n && this.targetVm) {
                    this.targetVm.transferShow = n;
                    this.targetVm.data = this.treeData;
                    selectArea.renderPosition(this.targetVm);
                    this.targetVm.showChoseData = CloneDeep(this.selectedData);
                }
                if (!n && this.targetVm) {
                    this.targetVm.transferShow = n;
                }
            }
        },
        'targetVm.transferShow': {
            handler(n, o) {
                if (n !== o) {
                    this.dropDownFocus = n;
                }
                this.$nextTick(() => {
                    if (!this.dropDownFocus && !this.selectFocus) {
                        this.activeClose = true;
                    } else {
                        this.activeClose = false;
                    }
                });
            },
            immediate: true
        },
        // 左侧select组件获得焦点与否
        dropDownButtonShow: {
            handler(n, o) {
                if (n !== o) {
                    this.selectFocus = n;
                }
                this.$nextTick(() => {
                    if (!this.dropDownFocus && !this.selectFocus) {
                        this.activeClose = true;
                    } else {
                        this.activeClose = false;
                    }
                });
            },
            immediate: true
        },
        // 监听选择的数据
        selectedData: {
            handler(n, o) {
                if (n !== o) {
                    if (n.length === this.tileData.length) {
                        this.isAllChoice = true;
                    } else {
                        this.isAllChoice = false;
                    }
                    if (n.length !== 0) {
                        this.setPopoverText(n);
                    } else {
                        this.popoverText = '';
                    }
                }
            },
            immediate: true
        }
    },
    mounted() {
        // vm.typeId = vm.firstTypeData[0].id;
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
    },
    created() {
        const vm = this;
        if (vm.treeData) {
            this.getTypeData(vm.treeData);
            const { id } = vm.firstTypeData[0];
            vm.project.name = vm.treeData.name || '';
            vm.project.id = vm.treeData.id || '';
            vm.project.disabled = true;
        }
    },
    methods: {
        // 设置数据 id= 当前选择树的id 如果id不存在时，表示初始化时设置的数据
        setData(id) {
            const vm = this;
            let curTreeIndex = 0;
            if (id) {
                curTreeIndex = vm.firstTypeData.findIndex(d => d.id === id);
            }
            const item = vm.treeData.children[curTreeIndex];
            // vm.breadObj.name = item.name;
            vm.breadObj.name = '首页';
            vm.breadObj.id = item.id;
            vm.resetData();
            vm.curTreeData.push(item);
            vm.finalDropData = vm.initData(vm.curTreeData);// 初始化数据
            vm.tileData = vm.TileTool([], vm.finalDropData, '-1');
            vm.finalDropData = PackageTool(vm.tileData);
            vm.setDropDataFn(vm.breadObj.id);
            if (vm.selectedIds && vm.selectedIds.length) vm.setDefaultData(vm.selectedIds);
        },
        // 初始化数据
        initData(data) {
            if (data && data.length) {
                const tempData = CloneDeep(data);
                return tempData.map((item) => {
                    if (item.children && item.children.length) {
                        item.checked = 'uncheck';
                        item.disabled = data.disabled || false;
                        item.children = this.initData(item.children);
                    } else {
                        item.checked = 'uncheck';
                        item.disabled = item.disabled || false;
                        item.children = [];
                    }
                    return item;
                });
            }
            return [];
        },
        /** *
             * 平铺树形结构
             * @param result 接收结果
             * @param tree 需要平铺的数据
             * @param pid 父级id
             * @constructor
             * @return []
             */
        TileTool(result, data, pid) {
            data.forEach(d => {
                const obj = {
                    ...{
                        parentId: pid,
                        id: d.id,
                        name: d.name,
                        checked: d.checked || 'uncheck',
                        disabled: d.disabled ? d.disabled : false,
                        lastNode: !(d.hasOwnProperty('children') && d.children instanceof Array && d.children.length)
                    },
                    ...d
                };
                result.push(obj);
                if (d.children && d.children instanceof Array && d.children.length) this.TileTool(result, d.children, d.id);
            });
            return result;
        },
        // 获取类型筛选的数据
        getTypeData(data) {
            const vm = this;
            if (data && data.children.length) {
                data.children.forEach(item => {
                    vm.firstTypeData.push({
                        name: item.name,
                        id: item.id
                    });
                });
                this.setTypeIdFn(vm.firstTypeData);
            }
        },
        // 设置初始化的类型选择数据的初始值
        setTypeIdFn(data) {
            const vm = this;
            vm.treeId = data[0].id;
        },
        // 设置popover的文字显示
        setPopoverText(data) {
            const vm = this;
            const curData = JSON.parse(JSON.stringify(data));
            const len = curData.length - 1;
            let text = '';
            curData.forEach((d, i) => {
                if (i < len) {
                    text += `${d.name}、`;
                } else {
                    text += d.name;
                }
            });
            this.popoverText = text;
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
        getParentName(parentId) {
            const tilingTree = TileTool([], cloneDeep(this.finalTreeData), '-1'),
                parent = tilingTree.find(item => item.id === parentId);
            if (parent) {
                return `${this.getParentName(parent.parentId)}${parent.name}/`;
            }
            return '';
        },
        // 设置默认值
        setDefaultData(selectIds) {
            const vm = this;
            for (let i = 0; i < selectIds.length; i++) {
                for (let j = 0; j < vm.tileData.length; j++) {
                    if (selectIds[i] === vm.tileData[j].id && !vm.tileData[j].disabled) {
                        const curItem = vm.tileData[j];
                        if (this.linkage) {
                            this.selectedData.push(curItem);
                            curItem.checked = 'checked';
                            this.selectedData = this.setSelectedData([], this.finalDropData);
                            if (curItem.children && curItem.children.length) vm.setChildNode(curItem.children);
                            if (this.returnParentNode) {
                                if (curItem.parentId && curItem.parentId !== '-1') {
                                    vm.setParentNode(curItem.parentId);
                                }
                            }
                        } else {
                            this.selectedData.push(curItem);
                            curItem.checked = 'checked';
                            this.selectedData = this.setSelectedData([], this.finalDropData);
                        }
                    }
                }
            }
            const obj = {};
            vm.selectedData = this.selectedData.reduce((cur, next) => {
                obj[next.id] ? '' : obj[next.id] = true && cur.push(next);
                return cur;
            }, []);
        },
        // 设置子集选中
        setChildNode(child) {
            const vm = this;
            child.forEach(item => {
                if (!item.disabled) {
                    this.selectedData.push(item);
                    item.checked = 'checked';
                    this.selectedData = this.setSelectedData([], this.finalDropData);
                    if (item.children && item.children.length) this.setChildNode(item.children);
                }
            });
        },
        // 设置父级选中
        setParentNode(parentId) {
            const vm = this;
            vm.tileData.forEach(item => {
                if (item.id === parentId) {
                    vm.selectedData.push(item);
                    if (item.children && item.children.length) {
                        if (item.children.every(item => item.checked === 'checked')) {
                            item.checked = 'checked';
                        } else {
                            item.checked = 'notNull';
                        }
                    }
                    if (item.parentId && item.parentId !== '-1') {
                        this.setParentNode(item.parentId);
                    }
                    this.selectedData = this.setSelectedData([], this.finalDropData);
                }
            });
        },
        // 根据类型设置下拉面板数据
        setDropDataFn(id) {
            const vm = this;
            vm.finalTreeData = [];
            vm.tileData.forEach(item => {
                if (item.id === id) {
                    vm.finalTreeData = item.children;
                }
            });
            // vm.finalTreeData = vm.finalDropData[0].children;
            if (vm.targetVm) {
                vm.$nextTick(() => {
                    vm.targetVm.treeData = vm.finalTreeData;
                });
            }
        },
        // 切换tree后重置数据
        resetData() {
            const vm = this;
            vm.curTreeData = [];
            vm.finalDropData = [];
            vm.finalTreeData = [];
            vm.selectedData = [];
            if (vm.targetVm) {
                vm.targetVm.$refs.transferSelect.resetData(vm.project, vm.breadObj);
                selectArea.remove(this.targetVm);
                vm.targetVm = null;
            }
        },
        // 设置Popover的显示隐藏
        popoverTipEnter() {
            if (!this.popoverText || this.isAllChoice || this.transferShow || this.dropDownButtonShow || (this.targetVm && this.targetVm.transferShow)) return;
            if (this.popoverTip) {
                if (this.timer) this.clearTimer();
                else {
                    this.timerEnter = setTimeout(() => {
                        if (!this.transferShow) {
                            this.popoverTip.content = this.popoverText;
                            PopoverTip.resetPosition(this.popoverTip);
                            clearTimeout(this.timerEnter);
                            this.timerEnter = null;
                        }
                    }, 300);
                }
            } else {
                this.timerEnter = setTimeout(() => {
                    if (!this.transferShow) {
                        const { $refs: { msiTag, countTag } } = this;
                        this.popoverTip = PopoverTip({
                            tag: msiTag, // 触发器
                            countTag, // 数字标签
                            propsData: {
                                content: this.popoverText
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
                    }
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
                return;
            }
            if (this.popoverTip) this.setTimer();
        },
        clearTip() {
            this.popoverTipContent = '';
            if (this.popoverTip) {
                PopoverTip.remove(this.popoverTip);
                this.popoverTip = null;
            }
        },
        // 点击改变 三角形方向/弹窗显示状态
        changeTriangle(status) {
            const vm = this;
            if (vm.showDropPine) return;
            if (this.popoverTip && this.popoverTip.show) {
                this.popoverTip.show = false;
            }
            vm.showDropPine = true;
            vm.transferShow = status;
            if (!vm.targetVm) {
                vm.targetVm = selectArea({
                    tag: vm.$refs.msiTag,
                    params: {
                        transferShow: vm.transferShow,
                        treeData: vm.finalTreeData,
                        allTreeData: vm.finalDropData,
                        width: vm.width < 300 ? 300 : vm.width,
                        height: 480,
                        project: vm.project,
                        breadObj: vm.breadObj,
                        returnParentNode: vm.returnParentNode,
                        notNull: vm.notNull,
                        linkage: vm.linkage,
                        selectedIds: vm.selectedIds,
                        activeClose: vm.activeClose,
                        choiceData: vm.selectedData
                    }
                }).$on('confirm', (data) => {
                    vm.transferShow = false;
                    const { ids, sd, len } = data;
                    vm.selectedData = sd;
                    // vm.$parent.selectedIds = ids;
                    vm.$emit('change', ids, sd);
                }).$on('modalStatus', (flag) => {
                    // vm.activeClose = flag;
                }).$on('cancelModal', (flag) => {
                    vm.$emit('cancelModal');
                    vm.transferShow = flag;
                    // this.activeClose = flag;
                })
                    .$on('changeShowData', (item) => {
                        vm.finalTreeData = [];
                        vm.setDropDataFn(item.id);
                    })
                    .$on('changeParentNodeStatus', (item) => {
                        this.tileData.forEach(d => {
                            if (d.id === item.id) {
                                d.checked = item.checked;
                            }
                        });
                    })
                    .$on('blur', (bol) => {
                        this.showDropPine = false;
                        this.closeDrop();
                    });
            }
            if (!status) vm.targetVm.$refs.transferSelect.handleCancel();
        },
        // 隐藏下拉选择面板
        hidePanel() {
            this.transferShow = false;
            if (this.targetVm) {
                setTimeout(() => {
                    if (this.targetVm) {
                        this.targetVm.$refs.transferSelect.handleCancel();
                    }
                }, 300);
            }
        },
        dropDownFn() {
            this.dropDownButtonShow = true;
            if (this.targetVm && this.targetVm.transferShow) {
                this.hidePanel();
            }
            if (this.popoverInstance) {
                this.popoverInstance.show = false;
            }
        },
        triangleStatus(status) {
            const vm = this;
            if (!status) {
                this.dropDownButtonShow = false;
            }
        },
        // 输入框获取焦点-弹窗显示
        inputFocus() {
            if (this.transferShow) return;
            this.changeTriangle(true);
        },
        // 关闭选择框
        closeDrop() {
            const vm = this;
            // if (!vm.activeClose) return;
            vm.hidePanel();
        },

        // select组件的focusChange事件
        focusChange(bol) {
            this.dropDownButtonShow = !bol;
        }
    },
    beforeDestroy() {
        setTimeout(() => {
            if (this.targetVm) selectArea.remove(this.targetVm);
            this.targetVm = null;
            if (this.popoverInstance) this.clearTip();
        }, 400);
        window.removeEventListener('mousewheel', this.hidePanel);
    }
};
</script>

<style lang="stylus">
    .p-multiple-search-input-component
        position: relative
        display: inline-block
        outline: none
        width: 300px
        min-width 300px
        &.p-multiple-search-input-component-active
            border-color: $blue-500
            box-shadow: 0 0 0 2px rgba(0, 145, 255, 0.2)
            border-radius: 4px;
        .p-multiple-search-input-content
            display: flex
            align-items: center
            position: relative
            background-color: $theme
            border: 1px solid $grey-400
            border-radius: 4px
            width: 100%
            height: 32px
            font-size: 14px
            cursor: pointer
            transition: border 0.3s, box-shadow 0.3s

            &:hover
                border-color: $blue-500

            &:active
                border-color: $blue-600

            svg
                transition: transform 0.3s

            &.p-select-input-content-active
                border-color: $blue-500
                box-shadow: 0 0 0 2px rgba(0, 145, 255, 0.2)
            .p-multiple-search-input-content-left
                .p-select
                    .p-select-header
                        border none
                        height 30px
                        min-height 30px
                    .p-select-header-focused
                        box-shadow none
            .p-multiple-search-input-content-right
                position relative
                .p-select-input-place
                    padding-left: 12px
                    padding-right: 8px
                    line-height: 30px
                    color: $grey-400
                    float left
                    span
                        span
                            padding-left 4px
                            padding-right 4px
                    &.p-select-input-place-selected
                        color: $grey-900
                        span
                            span
                                color $blue-500

                .p-select-input-input
                    position: absolute
                    left: 0
                    top: 0
                    border: 0
                    outline: none
                    background: none
                    padding-left: 12px
                    padding-right: 24px
                    width: 100%
                    height: 100%
                    font-size: 14px
                    color: $grey-900
                    cursor: pointer
                    z-index: 11

                .p-select-input-svg
                    position: absolute
                    right: 8px
                    top: 7px
                    width: 16px
                    height 16px
                    z-index: 10
                    vertical-align middle
                    transition: all 0.3s

                .p-select-clear-icon
                    position: absolute
                    right: 8px
                    top: 7px
                    width: 16px
                    z-index: 1000
                    transition: all 0.3s

                    path
                        transition: fill 0.3s

                    &:hover
                        path
                            fill $blue-500

                .p-select-input-rotate
                    transform: rotate(180deg)
</style>
