<template>
    <transition :name="position?'selectDownUpExtend':'selectDownUpExtendTop'">
        <div ref="dropdown" class="p-cascader-drop" v-show="showCascader" @wheel.stop>
            <div class="p-cascader-select-container">
                <div class="p-cascader-select-panel">
                    <div>
                        <cascaPanel
                            v-show=" !query && !queryItems.length"
                            :cascaderList="data"
                            :loadData="loadData"
                            :multiple="multiple"
                            :type="type"
                            :width="width"
                            :deepChange="deepChange"
                            :checkWidth="checkWidth"
                            :trigger="trigger"
                            :change="change"
                            :all="all"
                        >
                        </cascaPanel>
                        <div @click.stop class="p-cascader-filter" :style="{width: width+'px', height: '222px'}"
                             v-show="query && queryItems.length">
                            <ul class="p-cascader-filter-menu">
                                <li class="p-cascader-filter-menu-item"
                                    v-for="(item, index) in queryItems"
                                    @click="handleSelectItem(item)"
                                    :key="index">
                                    <Checkbox
                                        v-if="type && type!=='final'"
                                        :checked="item.checked"
                                        :disabled="item.forbidden || item.disabled"
                                        :data-id="item.id"
                                        @change="handleCheckbox"
                                    >
                                    </Checkbox>
                                    <Checkbox v-if="type && type==='final' && item.selectCheckbox"
                                              :checked="item.checked"
                                              :disabled="item.forbidden || item.disabled"
                                              :data-id="item.id"
                                              @change="handleCheckbox"
                                    >
                                    </Checkbox>
                                    <span class="p-cascader-item-text" :title="item.title"
                                          :style="{width: (width - 50 )+'px' }" v-html="item.display"></span>
                                </li>
                            </ul>
                        </div>
                        <div class="p-cascader-no-found" ref='notfound' :style="notFoundStyle"
                             v-show=" query  && !queryItems.length || !data.length">没有找到任何内容
                        </div>
                    </div>
                    <div @click.stop class="p-cascader-select-panel-footer" v-if="multiple && !showPanel">
                        <span @click="cancelPanel">取消</span>
                        <span :class="controlConfirmBtn? 'disabled-confirm-btn': ''" @click="confirmEmit">确定</span>
                    </div>
                </div>
                <div @click.stop class="p-cascader-select-list" v-if="showPanel" :style="{width: width + 'px'}">
                    <div class="p-cascader-select-list-header">
                        <span class="p-cascader-selected">已选<span
                            class="p-cascader-selected-text">{{ selectedItems.length }}</span></span>
                        <span class="p-cascader-clear" :style="cursorStyle"
                              @click.capture="clearSelectAll">清空</span>
                    </div>
                    <div class="p-cascader-select-list-body">
                        <ul class="p-cascader-select-list-items">
                            <li v-for="(item, index) in selectedItems" :key="index">
                            <span :style="itemWidth"> {{ item._title || item.title }}
                            </span>
                                <span class="p-cascader-clear-icon">
                                <i @click.stop="clearSingleItem(item,index)"><clear style="width:14px;height:14px"></clear></i>
                            </span>
                            </li>
                        </ul>
                    </div>
                    <div :style="boxShadowStyle" :class="panelClass">
                        <span @click="cancelPanel">取消</span>
                        <span :class="controlConfirmBtn? 'disabled-confirm-btn': ''" @click="confirmEmit">确定</span>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import cascaPanel from './cascaPanel';
import clickoutside from './clickoutside';
import clear from '../static/iconSvg/clear2.svg';
import Checkbox from '../Checkbox';
import { cloneDeep } from './utils';
import handleRecursive from './handleRecursive';

export default {
    provide() {
        return {
            flatData: this.flatData
        };
    },
    name: 'cascaderDrop',
    components: {
        cascaPanel,
        clear,
        Checkbox
    },
    data() {
        return {
            showCascader: false, // 控制下拉弹出框的显示隐藏
            queryItems: [], // 存储通过搜索操作筛选出来的数据
            selectedItems: [], // 存储当前所选择的数据
            storeFlatData: [], //
            confirmedData: [], // 存储用户点击确认时所选择的数据
            storeHandleData: [],
            storeQueryData: [],
            storeSelectedItems: [],
            depth: 1,
            selectedItemsCloneStr: null,
            storeIds: [],
            initHandle: 0,
            position: true // 动画执行方向
        };
    },
    mixins: [handleRecursive],
    directives: {
        clickoutside
    },
    computed: {
        /**
         * 实时计算列表的宽度
         */
        itemWidth() {
            return { width: `${this.width - 50}px` };
        },
        /**
         * 设置空内容提示框样式
         */
        notFoundStyle() {
            return {
                height: this.multiple ? '222px' : '54px',
                width: `${this.width}px`,
                borderRight: this.multiple ? '1px solid #eff0f1' : 'none'
            };
        },
        /**
         * 设置下拉框操作面板的样式  只有在数据超出4条 即下拉框出现滚动条时才显示投影
         */
        boxShadowStyle() {
            return {
                boxShadow: this.selectedItems.length > 4 ? '' : ''
            };
        },
        panelClass() {
            return ['p-cascader-select-list-footer', this.selectedItems.length > 4 ? 'p-cascader-select-list-footer-shadow' : ''
            ];
        },
        cursorStyle() {
            return {
                cursor: this.selectedItems.length ? 'pointer' : 'not-allowed',
                color: this.selectedItems.length ? 'rgb(0, 145, 255)' : 'rgb(195, 199, 203)'
            };
        },
        containerWidth() {
            const add = this.showPanel ? 1 : 0;
            return {
                width: `${(this.depth + add) * Number(this.width)}px`
            };
        },
        controlConfirmBtn() {
            if (!this.selectedItems.length && this.initHandle === 0) return true;
            if (this.selectedItemsCloneStr) {
                const selectedItemsCloneStr = JSON.parse(this.selectedItemsCloneStr);
                const flag = this.selectedItems.every(item => selectedItemsCloneStr.findIndex(option => item.id === option.id) > -1);
                return (this.selectedItems.length === this.confirmedData.length) && flag;
            }
            return false;
        }
    },
    props: {
        query: {
            type: String,
            default: ''
        },
        data: {
            type: Array,
            default: () => []
        },
        loadData: {
            type: Function
        },
        selectIds: {
            type: Array
        },
        flatData: {
            type: Array
        },
        type: {
            type: String
        },
        multiple: {
            type: Boolean
        },
        showPanel: {
            type: Boolean
        },
        width: {
            type: [Number, String]
        },
        recursionData: {
            type: Array
        },
        trigger: {
            validator(value) {
                return ['click', 'hover'].indexOf(value) > -1;
            },
            default: 'click'
        },
        all: {
            type: Boolean,
            default: false
        },
        excludeTop: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        this.checkWidth();
    },
    watch: {
        selectedItems(n, o) {
            if (n !== o) {
                this.initHandle++;
            }
        },
        selectIds: {
            handler(n, o) {
                if (n !== o) {
                    this.query = '';
                    this.queryItems = [];
                    if (!n.length) {
                        if (this.multiple) {
                            this.clearSelectAll();
                            this.confirmedData = [];
                        }
                    }
                }
            }
        },
        showCascader: {
            handler(n, o) {
                if (n !== o) {
                    if (n) {
                        if (this.multiple) {
                            if (this.selectIds.length) { // 只执行一次
                                this.formatPIdsAndFindDeepest(this.selectIds);
                                if (this.storeHandleData.length) {
                                    this.recursiveReset(this.data);
                                }
                                if (this.selectedItemsCloneStr) {
                                    this.selectedItems = JSON.parse(this.selectedItemsCloneStr);
                                }
                                setTimeout(() => {
                                    this.checkWidth();
                                    this.$emit('checkWidth', this.depth);
                                }, 0);
                            } else {
                                if (!this.confirmedData.length) {
                                    this.clearSelectAll();
                                    this.clearData();
                                } else {
                                    this.recursiveReset(this.data);
                                    this.selectedItems = JSON.parse(this.selectedItemsCloneStr);
                                    if (!this.query) {
                                        this.queryItems = [];
                                    }
                                }
                            }
                        } else {
                            if (this.selectIds.length) {
                                this.refillCascader(this.data, this, this.selectIds);
                            }
                        }

                        this.$nextTick(() => {
                            setTimeout(() => {
                                this.$refs.dropdown.style.pointerEvents = 'auto';
                            }, 300);
                        });
                    } else {
                        this.$refs.dropdown.style.pointerEvents = 'none';
                    }
                }
            }
        },
        depth(n, o) {
            if (n !== o) {
                this.$emit('checkWidth', n);
            }
        }
    },
    methods: {
        /**
         * @description 关闭面板  如果当前没有确定选中项则执行情况操作 并通知父组件
         */
        cancelPanel() {
            if (!this.confirmedData.length) {
                this.query = '';
                this.clearSelectAll();
                this.clearData();
                this.depth = 1;
                this.$children[0].subListData = [];
                this.$emit('checkWidth', 1);
            }
            if (this.showPanel) {
                this.selectedItems = JSON.parse(this.selectedItemsCloneStr);
            }
            this.$emit('change', this.confirmedData);
            this.showCascader = false;
        },
        /**
         * @description 为了实现如果的用户没有点击确认按钮则再次打开面板时需要恢复到上一次的数据选择状态的需求  这里根据用户执行
         * 确定操作时存储的数据状态进行递归还原之前的选择状态
         */
        recursiveReset(data) {
            data.forEach(item => {
                const res = this.storeHandleData.find(option => option.id === item.id);
                if (res) {
                    item.checked = res.checked;
                }
                if (this.type === 'forbidden') {
                    item.forbidden = res.forbidden;
                }
                if (item.children && item.children.length) {
                    this.recursiveReset(item.children);
                }
            });
        },
        /**
         * @description 执行确认操作 并存储选择状态
         */
        confirmEmit() {
            if (this.controlConfirmBtn) {
                return;
            }
            if (this.query) {
                this.confirmedData.forEach(item => {
                    this.checkParent(item);
                });
                this.query = '';
            }
            this.showCascader = false;
            this.confirmedData = cloneDeep(this.selectedItems);
            this.selectedItemsCloneStr = JSON.stringify(this.selectedItems);
            if (!this.selectedItems.length) {
                this.$emit('clearPopover', this.confirmedData);
                this.$emit('checkWidth', 1);
            }
            this.storeHandleData = cloneDeep(this.flatData);
            this.$emit('confirm', this.confirmedData);
        },
        /**
         * @description 在多选状态下 用户可以通过传值实现默认展开和选择  由于用户传值的数量不定 不能确定需要展开多少级面板  这里采用的方法是对用户所传的每一
         * 个id进行计算  找出最深层级并按照这个层级展开面板
         */
        formatPIdsAndFindDeepest(ids) {
            if (!Array.isArray(ids) || (!ids.length)) return;
            const idArr = [];
            ids.forEach(id => {
                const findItem = this.flatData.find(option => option.id === id);
                if (findItem && findItem._ids) {
                    idArr.push(findItem._ids.split('/'));
                }
            });
            const maxLen = Math.max.apply(null, idArr.map(item => item.length));
            const maxLIndex = idArr.findIndex((item) => item.length === maxLen);
            if (maxLIndex > -1) {
                this.refillCascader(this.data, this, idArr[maxLIndex]);
            }
            this.checkWidth();
        },
        /**
         * @description 统计被选中的数据项 并存储数据  该函数只在用户有传默认选中值的情况下执行一次
         */
        emitSelectedData() {
            this.selectedItems = [];
            this.flatData.forEach(option => {
                if (option.checked === 'checked') {
                    this.selectedItems.push(option);
                }
            });
            this.confirmedData = cloneDeep(this.selectedItems);
            this.selectedItemsCloneStr = JSON.stringify(this.selectedItems);
            this.$emit('change', this.selectedItems);
        },
        /**
         *  @description 根据用户所传的默认选中值 来逐级渲染层级面板
         */
        refillCascader(data, obj, ids) {
            let index = -1;
            const vm = this;

            findComp(data, obj, ids);
            if (this.multiple) {
                setTimeout(() => {
                    this.confirmedData = cloneDeep(this.selectedItems);
                    this.selectedItemsCloneStr = JSON.stringify(this.selectedItems);
                    this.storeHandleData = cloneDeep(this.flatData);
                });
            }

            function findNextComp(Comp) {
                let target = null;
                if (Comp.$children && Comp.$children.length) {
                    Comp.$children.forEach(comp => {
                        if (comp.$options.name === 'cascaPanel') {
                            target = comp;
                        }
                    });
                    return target;
                }
            }
            function findComp(data, parent, arr) {
                index++;
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    if (item.id === arr[index]) {
                        vm.$nextTick(() => {
                            const comp = findNextComp(parent);
                            if (!comp) return;
                            comp.activeKey = item.id;
                            if (item.children) {
                                comp.subListData = item.children;
                                findComp(item.children, comp, arr);
                            } else {
                                comp.subListData = [];
                            }
                        });
                    }
                }
            }
        },
        /**
         * @description 判断面板层级深度 并通知向父级重新进行宽度和位置计算
         */
        checkWidth() {
            let depth = 0;
            function findChildComponent(parent) {
                parent.forEach(comp => {
                    if (comp.$options.name === 'cascaPanel') {
                        depth++;
                        if (comp.$children) {
                            findChildComponent(comp.$children);
                        }
                    }
                });
            }
            findChildComponent(this.$children);
            this.depth = depth;
        },
        /**
         * @description 执行清空操作
         */
        clearSelectAll() {
            this.flatData.forEach(item => {
                if (this.type === 'forbidden') {
                    item.forbidden = false;
                    item.checked = 'uncheck';
                }
                item.active = false;
            });
            this.selectedItems.forEach(item => {
                const result = this.flatData.find(option => item.id === option.id);
                if (result) {
                    result.checked = 'uncheck';
                    this.checkParent(result);
                }
            });
            this.selectedItemsCloneStr = JSON.stringify(this.selectedItems);
            this.selectedItems = [];
        },
        /**
         * @description 在统计面板中对已选项执行删除操作
         */
        clearSingleItem(item, index) {
            const vm = this;
            function recursiveClear(data) {
                data.children.forEach(item => {
                    item.checked = 'uncheck';
                    const hasSome = vm.selectedItems.some(option => item.id === option.id);
                    if (hasSome) {
                        vm.selectedItems.splice(index, 1);
                    }
                    if (item.children && item.children.length) {
                        recursiveClear(item);
                    }
                });
            }
            function recursiveSetChecked(data, status, disabled) {
                if (data.children && data.children.length) {
                    data.children.forEach(item => {
                        if (item.disabled) return;
                        item.checked = status;
                        if (typeof disabled !== 'undefined') {
                            vm.$set(item, 'forbidden', disabled);
                        }
                        recursiveSetChecked(item, status, disabled);
                    });
                }
            }
            const ids = (item._ids || item.ids).split('/');
            const id = ids[ids.length - 1];
            const result = this.flatData.find(option => id === option.id);
            if (result) {
                result.checked = 'uncheck';
                if (this.type === 'normal') {
                    this.checkParent(result);
                    if (result.children && result.children.length) {
                        recursiveClear(result);
                    }
                }
                if (this.type === 'forbidden') {
                    recursiveSetChecked(result, 'uncheck', false);
                }
            }
            this.selectedItems.splice(index, 1);
            if (!this.selectedItems.length) {
                this.$emit('change', []);
            }
            if (this.type === 'normal') {
                this.checkParent(result);
                this.countSelectedNumber();
            }
            if (this.query) {
                const find = this.queryItems.find(option => option.id === item.id);
                if (find) {
                    find.checked = 'uncheck';
                }
            }
        },
        /**
         * @description 在统计面板中对已选项执行删除操作
         */
        handleClose() {
            this.showCascader = false;
        },
        /**
         * @description 点击列表中的多选框执行的操作
         * @param  holder 此处没有意义 只是为了占位
         * @param selectedItem 当前所勾选的那一条数据
         */
        handleCheckbox(holder, selectedItem) {
            const item = this.queryItems.find(option => option.id === selectedItem.id);
            const index = this.selectedItems.findIndex(item => item.id === selectedItem.id);
            const data = this.flatData.find(item => item.id === selectedItem.id);
            if (data.disabled) return;
            if (item && data) {
                if (item.checked === 'checked') {
                    item.checked = 'uncheck';
                    data.checked = 'uncheck';
                    if (index > -1) {
                        this.selectedItems.splice(index, 1);
                    }
                } else {
                    item.checked = 'checked';
                    data.checked = 'checked';
                    if (index === -1) {
                        if (!data.disabled) {
                            this.selectedItems.push(item);
                        }
                    }
                }
                if (this.type !== 'final') {
                    this.checkParent(item);
                    this.countSelectedNumber();
                }
            }
        },
        /**
         * @description 执行对在筛选结果列表中的列进行点击时向父级发送消息并传递数据
         */
        handleSelectItem(item) {
            const ids = item._ids;
            if (!ids) return;
            const idsArr = ids.split('/');
            const parentId = idsArr[0];
            const find = this.flatData.find(option => option.id === parentId);
            if (typeof this.loadData === 'function' && !find.children.length) {
                this.loadData(find, () => {
                    if (find.children.length) {
                        this.setAttributeOfNode(find);
                        this.$emit('select', find);
                    }
                    this.timer = null;
                    this.$nextTick(() => {
                        this.checkWidth();
                    });
                });
            } else {
                this.$emit('select', find);
            }
        },
        /**
         * @description  如果数据来源是通过接口调用等异步方法获取的 对这条数据的子元素设置后续业务需要的一些属性
         * @param  item 当前所勾选的那一条数据
         */
        setAttributeOfNode(item) {
            item.children.forEach(option => {
                this.$set(option, 'parentId', item.nodekey);
                this.$set(option, 'loading', false);
                // this.$set(option,'children', item.children)
                this.$set(option, 'last', true);
                this.$set(option, 'nodekey', `${item.nodekey}${Date.now()}`);
                if (!option.hasOwnProperty('id')) {
                    this.$set(option, 'id', `${item.nodekey}${Date.now()}${Math.random()}`);
                }
                this.$set(option, '_title', `${item.title}/${option.title}`);
                this.$set(option, '_ids', `${item.id}/${option.id}`);
                if (this.multiple) {
                    this.$set(option, 'checked', 'uncheck');
                    if (this.type === 'forbidden') {
                        this.$set(option, 'forbidden', false);
                    }
                }
                this.flatData.push(option);
            });
        },
        /**
         * @description 执行对列表进行点击时的操作
         */
        change(item, flag) {
            this.storeIds = item._ids.split('/');
            if (!this.multiple) {
                if (flag) {
                    this.$emit('change', {
                        item,
                        flag
                    });
                } else {
                    this.$emit('change', item);
                }
            }
        },
        deepChange() {
            if (this.type !== 'final') {
                this.countSelectedNumber();
            }
            if (this.type === 'final') {
                const arr = [];
                this.flatData.forEach(item => {
                    if (item.checked === 'checked') {
                        arr.push(item);
                    }
                });
                this.selectedItems = arr;
            }
        },
        /**
         * @description 计算所选选择的项目
         */
        countSelectedNumber() {
            let selections = [];
            this.$nextTick(() => {
                this.flatData.forEach(item => {
                    if (this.type === 'normal' || this.type === 'independent') {
                        if (item.checked === 'checked' && !item.disabled) {
                            selections.push(item);
                        }
                        if (item.checked === 'notNull' && this.type === 'normal' && this.all && !item.disabled) {
                            selections.push(item);
                        }
                    }
                    if (this.type === 'forbidden') {
                        if (item.checked === 'checked' && !item.forbidden) {
                            selections.push(item);
                        }
                    }
                });
                if (this.type === 'normal') {
                    if (this.excludeTop) { // 是否需要筛除掉最顶层父级  这个条件只在type为normal的情况下可以配置
                        selections = selections.filter(item => item.parentId !== -1);
                    }
                }
                this.selectedItems = selections;
                if (!this.selectedItems.length) { // 所选项为空的情况下向父级报告
                    this.$emit('change', this.selectedItems);
                }
                this.checkWidth();
                this.$emit('checkWidth', this.depth);
            });
        },
        clearData() {
            if (this.$children) {
                this.findChildComponent(this.$children);
                this.$emit('checkWidth', 1);
            }
        },
        findChildComponent(parent) {
            parent.forEach(comp => {
                if (comp.$options.name === 'cascaPanel') {
                    comp.activeKey = '';
                    comp.subListData = [];
                    comp.$emit('clear');
                    if (comp.$children) {
                        this.findChildComponent(comp.$children);
                    }
                }
            });
        }
    }
};
</script>
<style lang="stylus">
@import '../static/stylus/animate/selectDownUpExtend.styl'

.p-cascader-drop
    position absolute
    width auto
    border 1px solid $grey-300
    border-radius 4px
    box-shadow $box-shadow-bottom
    background $white
    font-size 0
    .p-cascader-select-container
        display flex
        justify-content flex-start
        white-space nowrap
        background $theme
        .p-cascader-select-panel
            .p-cascader-filter
                min-width 120px
                border-right 1px solid $grey-300
                width 100%
                ul.p-cascader-filter-menu
                    overflow auto
                    height 222px
                    li.p-cascader-filter-menu-item
                        display flex
                        align-items center
                        height 38px
                        padding: 8px 16px
                        color: $grey-900
                        white-space: nowrap
                        list-style: none
                        cursor: pointer
                        .p-cascader-item-text
                            display inline-block
                            white-space: nowrap
                            overflow hidden
                            text-overflow ellipsis
                            font-size 14px
            .p-cascader-no-found
                width 100%
                padding 16px 0 16px 12px
                border-radius 4px
                line-height 22px
                font-size 14px
                color $grey-400
                min-width 180px
                max-width 600px
                background: white
                box-shadow $box-shadow-bottom
                box-sizing border-box
                white-space: nowrap
                overflow hidden
                text-overflow ellipsis
            .p-cascader-select-panel-footer
                display flex
                justify-content flex-end
                align-items center
                padding 0 12px 0 16px
                height 45px
                line-height 45px
                font-size 14px
                border-top 1px solid $grey-200
                span
                    cursor pointer
                span:first-child
                    margin-right 16px
                    color $grey-900
                span:last-child
                    color $blue-500
                    margin-right 12px
                span.disabled-confirm-btn
                    color $grey-400
                    cursor not-allowed
        .p-cascader-select-list
            position relative
            min-width 200px
            height 222px
            .disabled-confirm-btn
                cursor not-allowed
                color $grey-400
            .p-cascader-select-list-header
                display flex
                justify-content space-between
                align-items center
                padding 0 12px 0 16px
                height 45px
                line-height 45px
                border-bottom 1px solid $grey-200
                font-size 14px
                color $grey-500
                .p-cascader-selected-text
                    font-weight 600
                    margin 0 4px
                    color $grey-900
                span.p-cascader-clear
                    color $grey-400
            .p-cascader-select-list-body
                height calc(100% - 90px)
                .p-cascader-select-list-items
                    height 100%;
                    overflow-y auto
                    li
                        position: relative
                        display flex
                        align-items center
                        justify-content flex-start
                        line-height: 22px
                        padding: 8px 16px
                        color: $grey-900
                        font-size: 14px
                        list-style: none
                        cursor: pointer
                        span:first-child
                            white-space: nowrap
                            overflow hidden
                            text-overflow ellipsis
                        .p-cascader-clear-icon
                            position absolute
                            width 14px
                            height 14px
                            top 50%
                            right 16px
                            transform translate(0px, -60%)
                            &:hover
                                svg
                                    path
                                        fill $blue-500
                        &:hover
                            background $grey-100
            .p-cascader-select-list-footer
                display flex
                justify-content flex-end
                align-items center
                width 100%
                height 45px
                font-size 14px
                color $grey-900
                span
                    cursor pointer
                span:first-child
                    margin-right 16px
                    color $grey-900
                span:last-child
                    color $blue-500
                    margin-right 12px
                span.disabled-confirm-btn
                    color $grey-400
                    cursor not-allowed
            .p-cascader-select-list-footer-shadow
                box-shadow $box-shadow-top

</style>
