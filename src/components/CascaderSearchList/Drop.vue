<template>
    <transition name="selectDownUpExtend">
        <div ref="dropdown" class="p-cascader-search-list-drop" v-show="showCascader" @wheel.stop>
            <div class="p-cascader-search-list-select-container">
                <div class="p-cascader-search-list-select-panel">
                    <div>
                        <div @click.stop class="p-cascader-search-list-column">
                            <div v-if="root">
                                <ul class="p-cascader-search-list-menu" :style="menuWidth" @click.stop>
                                    <li :class="itemClass(item)"
                                        v-for="(item, index) in data"
                                        :key="index"
                                        @mouseenter.stop="handleHoverItem(item)"
                                        @click.stop="handleClickItem(item)"
                                        @mouseleave.stop="handleLeaveItem(item)"
                                    >
                                        <span class="p-cascader-search-list-item-text"
                                              :style="itemWidth"> {{ item.title }} </span>
                                        <span style="transform: translate(0px, 4px);">
                                        <div class="p-select-multiple-icon" v-show="activeKey === item.id"></div>
                                        <i class="p-cascader-search-list-next-icon" v-if="!item.loading">
                                            <arrow style="width:16px;height:16px"></arrow>
                                        </i>
                                        <i class="p-cascader-search-list-item-loading" v-if="item.loading"><loading
                                            style="width:16px; height:16px;"/></i>
                                    </span>
                                    </li>
                                </ul>
                            </div>
                            <div class="second-cascader-menu" :style="menuWidth" @click.stop>
                                <!-- 级联选择二级菜单的搜素框 -->
                                <div v-if="root" class="second-cascader-menu-filter">
                                    <input v-model="queryInput" class='p-cascader-search-list-input'
                                           style="padding-left:12px;" placeholder="搜索" @input="queryContent"/>
                                    <Remove v-show="filterQuery" class="p-cascader-search-list-clear"
                                            @click.stop="cancelFilter"></Remove>
                                </div>
                                <div>
                                    <div class="select-all-box" v-show="!filterQuery">
                                        <Checkbox :checked="selectAll" @change="selectAllItems">
                                            {{ root ? '所有' : '全部' }}
                                        </Checkbox>
                                    </div>
                                    <div v-if="filterQuery && !queryItems.length"
                                         class="p-cascader-search-list-not-found">没有匹配到任何内容
                                    </div>
                                    <!-- 级联选择的搜索结果面板 -->
                                    <ul v-show="filterQuery && queryItems.length" class="p-cascader-search-list-menu"
                                        :style="UlStyle">
                                        <li :class="itemClass(item)" v-for="(item, index) in queryItems" :key="index"
                                            style="padding-left:32px;">
                                            <Checkbox v-if="item.parentId!==-1"
                                                      :checked="item.checked"
                                                      :disabled="item.disabled"
                                                      :data-id="item.id"
                                                      @change="handleQueryCheckbox">
                                            </Checkbox>
                                            <span
                                                :class="['p-cascader-search-list-item-text', item.forbidden&&'p-cascader-search-list-item-text-disabled' ]"
                                                :style="itemWidth"> {{ item.title }} </span>
                                        </li>
                                    </ul>
                                    <!-- 级联选择的二级面板 -->
                                    <ul v-if="root && !filterQuery" class="p-cascader-search-list-menu"
                                        :style="UlStyle">
                                        <li :class="itemClass(item)" v-for="(item, index) in subListData" :key="index"
                                            style="padding-left:32px;">
                                            <Checkbox v-if="item.parentId!==-1"
                                                      :checked="item.checked"
                                                      :disabled="item.disabled"
                                                      :data-id="item.id"
                                                      @change="handleCheckbox">
                                            </Checkbox>
                                            <span
                                                :class="['p-cascader-search-list-item-text', item.forbidden&&'p-cascader-search-list-item-text-disabled' ]"
                                                :style="itemWidth"> {{ item.title }} </span>
                                        </li>
                                    </ul>
                                    <!-- 单个面板的列表 -->
                                    <ul v-if="!root" class="p-cascader-search-list-menu" :style="UlStyle">
                                        <li :class="itemClass(item)" v-for="(item, index) in subListData" :key="index"
                                            style="padding-left:32px;">
                                            <Checkbox
                                                :checked="item.checked"
                                                :disabled="item.disabled"
                                                :data-id="item.id"
                                                @change="handleCheckbox">
                                            </Checkbox>
                                            <span
                                                :class="['p-cascader-search-list-item-text', item.forbidden&&'p-cascader-search-list-item-text-disabled' ]"
                                                :style="itemWidth"> {{ item.title }} </span>
                                        </li>
                                    </ul>
                                </div>
                                <div @click.stop class="p-cascader-search-list-select-panel-footer" :style="menuWidth">
                                    <span @click.stop="cancalPanel">取消</span>
                                    <span @click.stop="confirmEmit">确定</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import { cloneDeep } from './utils';
import Checkbox from '../Checkbox';
import clickoutside from './clickoutside';
import Remove from '../static/iconSvg/clear2.svg';
import arrow from '../static/iconSvg/arrow_right2.svg';
import loading from '../static/iconSvg/loading_grey.svg';

export default {
    provide() {
        return {
            flatData: this.flatData
        };
    },
    name: 'cascaderDrop',
    components: {
        loading,
        arrow,
        Remove,
        Checkbox
    },
    data() {
        return {
            showCascader: false, // 控制下拉弹出框的显示隐藏
            subListData: [],
            storeIds: [],
            initKey: 1,
            timer: null,
            showPanel: true,
            parentName: '',
            activeKey: '',
            confirmedData: [],
            queryInput: '',
            filterQuery: '',
            selectAll: 'uncheck',
            storeSubListData: [],
            selectedItems: [],
            queryItems: []
        };
    },
    watch: {
        showCascader: {
            handler(n, o) {
                if (n) {
                    this.$nextTick(() => {
                        if (Array.isArray(this.selectIds) && this.selectIds.length) {
                            if (this.root) {
                                this.findDefaultSelectedData(this.selectIds); // 针对级联选择的情况  选中绑定值
                            } else { // 针对只有一级面板的情况  选中绑定值
                                const items = [];
                                this.subListData.forEach(item => {
                                    if (this.selectIds.includes(item.id)) {
                                        item.checked = 'checked';
                                        items.push(item);
                                    } else {
                                        item.checked = 'uncheck';
                                    }
                                });
                                this.confirmedData = cloneDeep(items);
                            }

                            this.checkAllSelectStatus(this.subListData); // 根据选中项来设置全选按钮的选中状态
                            this.selectedItems = this.subListData.filter(item => item.checked === 'checked');
                        } else {
                            if (this.root) { // 如果没有默认值  且是级联的情况下 需要默认选中第一项 并且选中所有子级
                                this.defaultSelectFirstLevel();
                            }
                        }
                    });
                }
            }
        },
        subListData: {
            handler(n, o) {
                if (JSON.stringify(n) === JSON.stringify(o)) return;
                if (n) {
                    this.storeSubListData = cloneDeep(n); // 存储数据
                }
            },
            deep: true,
            immediate: true
        }
    },
    directives: {
        clickoutside
    },
    computed: {
        /**
         * 设置空内容提示框样式
         */
        itemWidth() {
            let { width } = this;
            if (width < 180) width = 180;
            if (width > 600) width = 600;
            return { width: `${width - 64}px` };
        },
        menuWidth() {
            let { width } = this;
            if (width < 180) width = 180;
            if (width > 600) width = 600;
            return { width: `${width}px` };
        },
        UlStyle() {
            return {
                height: this.root ? '192px' : '245px'
            };
        }

    },
    props: {
        loadData: {
            type: Function
        },
        width: {
            type: [Number, String]
        },
        data: {
            type: Array,
            default: () => []
        },
        root: {
            type: Boolean,
            default: true
        },
        selectIds: {
            type: Array,
            default: () => []
        },
        flatData: {
            type: Array
        },
        type: {
            type: String
        },
        trigger: {
            validator(value) {
                return ['click', 'hover'].indexOf(value) > -1;
            },
            default: 'click'
        }

    },
    created() {
        if (!this.root) {
            this.showPanel = true;
            this.subListData = this.data;
        }
    },
    methods: {
        defaultSelectFirstLevel() {
            const firstData = this.data[0];
            this.activeKey = firstData.id;
            this.subListData = firstData.children;
            firstData.children.forEach(item => {
                item.checked = 'checked';
                this.selectedItems.push(item);
            });
            this.showPanel = true;
            this.confirmedData = cloneDeep(firstData.children);
            this.selectAll = 'checked';
            // this.$emit('confirm', firstData.children);
        },
        /**
         * 默认选中绑定项
         */
        findDefaultSelectedData(ids) {
            const node = this.flatData.find(item => item.id === ids[0]);
            let parentId = null;
            if (node) {
                parentId = node._ids.split('/')[0]; // 获取父级ID
                this.activeKey = parentId; // 默认选中父级
            }
            const parentNode = this.flatData.find(item => item.id === parentId);
            if (parentNode && parentNode.children) {
                this.showPanel = true;
                const items = [];
                parentNode.children.forEach(item => {
                    if (this.selectIds.includes(item.id)) {
                        item.checked = 'checked';
                        items.push(item);
                    } else {
                        item.checked = 'uncheck';
                    }
                });
                this.confirmedData = cloneDeep(items);
                this.subListData = parentNode.children;
            }
        },

        /**
         * 设置列表中每一条的class名称
         */
        itemClass(item) {
            return ['p-cascader-search-list-item', {
                'p-cascader-search-list-item-active': this.activeKey === item.id,
                'p-cascader-search-list-item-disabled': item.disabled
            }];
        },

        handleLeaveItem() {
            if (this.timer) {
                clearTimeout(this.timer);
            }
        },
        /**
         * @description 处理hover事件
         * @param item 当前所勾选的那一条数据
         */
        handleHoverItem(item) {
            if (this.trigger === 'hover') {
                if (item.children && item.children.length) {
                    this.activeKey = item.id;
                } else {
                    this.activeKey = '';
                }
            }
            if (this.trigger !== 'hover') return;
            this.expandNextPanel(item);
        },
        /**
         * @description 处理Click事件
         * @param item 当前所勾选的那一条数据
         */
        handleClickItem(item) {
            if (this.trigger === 'click') {
                if (item.children && item.children.length) {
                    this.activeKey = item.id;
                } else {
                    this.activeKey = '';
                }
            }
            if (this.trigger === 'hover' && !item.disabled) {
                this.change(item, true);
            }
            if (this.trigger !== 'click' && item.children && item.children.length) return;
            this.expandNextPanel(item);
        },
        /**
         * @description 展开下一级
         * @param  item 当前所勾选的那一条数据
         */
        expandNextPanel(item) {
            const vm = this;
            const { children } = item;
            if (!children || !children.length) return;
            this.parentName = item.title;

            children.forEach(item => { // 默认选中全部
                item.checked = 'checked';
            });
            this.selectedItems = cloneDeep(children);
            if (typeof this.loadData === 'function') {
                this.timer = setTimeout(() => {
                    this.loadData(item, () => {
                        if (children.length) {
                            this.setAttributeOfNode(item);
                            this.subListData = children;
                            this.$nextTick(() => {
                                this.$emit('checkWidth');
                            });
                        }
                        this.timer = null;
                    });
                }, 300);
            } else {
                this.subListData = children;
                this.$nextTick(() => {
                    this.$emit('checkWidth');
                });
            }
            this.$emit('select', item);
            this.showPanel = true;
        },
        /**
         * @description  如果数据来源是通过接口调用等异步方法获取的 对这条数据的子元素设置后续业务需要的一些属性
         * @param  item 当前所勾选的那一条数据
         */
        setAttributeOfNode(item) {
            item.children.forEach(option => {
                this.initKey++;
                this.$set(option, 'parentId', item.nodekey);
                this.$set(option, 'loading', false);
                this.$set(option, 'nodekey', `${item.nodekey}${this.initKey}`);
                if (!option.hasOwnProperty('id')) {
                    this.$set(option, 'id', `${item.nodekey}${this.initKey}`);
                }
                this.$set(option, '_title', `${item.title}/${option.title}`);
                this.$set(option, '_ids', `${item.id}/${option.id}`);
                this.$set(option, 'checked', 'uncheck');
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

        /**
         *  判断选择所有多选框的状态
         * @param  data 判定的数据
         */
        checkAllSelectStatus(data) {
            if (!data || !Array.isArray(data)) return;
            const noDisabledData = data.filter(d => !d.disabled);
            const allChecked = noDisabledData.every((item) => item.checked === 'checked');
            const someChecked = noDisabledData.some((item) => item.checked === 'checked');
            if (allChecked) {
                this.selectAll = 'checked';
            } else if (someChecked) {
                this.selectAll = 'notNull';
            } else {
                this.selectAll = 'uncheck';
            }
        },
        /** *
         * 勾选筛选列表中的某一项
         */
        handleQueryCheckbox(holder, selectedItem) {
            const queryItem = this.queryItems.find(option => option.id === selectedItem.id);
            const index2 = this.storeSubListData.findIndex(item => item.id === selectedItem.id);
            const index = this.selectedItems.findIndex(item => item.id === selectedItem.id);
            const selectItem = this.subListData.find(option => option.id === selectedItem.id);
            if (selectItem) {
                if (selectItem.checked === 'checked') {
                    this.storeSubListData[index2].checked = 'uncheck';
                    selectItem.checked = 'uncheck';
                    if (index > -1) {
                        this.selectedItems.splice(index, 1);
                    }
                } else {
                    selectItem.checked = 'checked';
                    this.storeSubListData[index2].checked = 'checked';
                    if (index === -1) {
                        this.selectedItems.push(selectItem);
                    }
                }
            }
            if (queryItem) {
                if (queryItem.checked === 'checked') {
                    queryItem.checked = 'uncheck';
                } else {
                    queryItem.checked = 'checked';
                }
            }
        },
        /**
         * 点击多选框  根据type参数的不同有以下4种不同的操作
         * @param  holder 此处没有意义 只是为了占位
         * @param selectedItem 当前所勾选的那一条数据
         */
        handleCheckbox(holder, selectedItem) {
            const item = this.subListData.find(option => option.id === selectedItem.id);
            const index2 = this.storeSubListData.findIndex(item => item.id === selectedItem.id);
            const index = this.selectedItems.findIndex(item => item.id === selectedItem.id);
            if (item) {
                if (item.checked === 'checked') {
                    this.storeSubListData[index2].checked = 'uncheck';
                    item.checked = 'uncheck';
                    if (index > -1) {
                        this.selectedItems.splice(index, 1);
                    }
                } else {
                    item.checked = 'checked';
                    this.storeSubListData[index2].checked = 'checked';
                    if (index === -1) {
                        this.selectedItems.push(item);
                    }
                }
            }
            this.checkAllSelectStatus(this.subListData);
        },
        /** *
         * 勾选全部输入框
         */
        selectAllItems() {
            if (this.selectAll === 'checked') {
                this.selectAll = 'uncheck';
            } else {
                this.selectAll = 'checked';
            }
            this.subListData.forEach(item => {
                if (!item.disabled) item.checked = this.selectAll;
            });
            if (this.selectAll === 'checked') {
                this.selectedItems = cloneDeep(this.subListData); // 全选时
            } else {
                this.selectedItems = [];
                this.subListData.forEach(item => {
                    if (item.disabled) this.selectedItems.push(item);
                });
            }
            this.storeSubListData = cloneDeep(this.subListData);
        },
        /**
         * 根据搜索信息生成列表
         */
        queryContent(event) {
            this.filterQuery = event.target.value || event.data || '';
            const queryItems = this.storeSubListData.filter(item => (item.title ? item.title.indexOf(this.filterQuery) > -1 : false));
            this.queryItems = cloneDeep(queryItems);
            if (!this.filterQuery) {
                this.subListData = this.storeSubListData;
            }
        },
        /**
         * 清除操作
         */
        cancelFilter() {
            this.queryInput = '';
            this.filterQuery = '';
            this.subListData = this.storeSubListData;
        },
        /**
         * 取消操作
         */
        cancalPanel() {
            this.showCascader = false;
        },
        /**
         * 确认操作
         */
        confirmEmit() {
            this.queryInput = '';
            this.filterQuery = '';
            this.showCascader = false;
            this.confirmedData = cloneDeep(this.selectedItems);
            if (this.confirmedData.length === 0) {
                this.$emit('clearPopover');
            }
            this.$emit('confirm', this.confirmedData);
        }
    }
};
</script>
<style lang="stylus">
@import '../static/stylus/animate/selectDownUpExtend.styl'
.second-cascader-menu
    input:

    :-webkit-input-placeholder
        color: $grey-400;

    input:-moz-placeholder
        color: $grey-400;
    input:

    :-moz-placeholder
        color: $grey-400;
    input:

    :-ms-input-placeholder
        color: $grey-400;
    display relative
    box-sizing border-box
    padding-bottom 40px

    .select-all-box
        display flex
        align-items center
        padding-left 12px
        height 38px

    .p-cascader-search-list-not-found
        height 38px
        line-height 38px
        color $grey-400
        font-size 14px
        padding-left 34px

    .second-cascader-menu-filter
        position relative
        padding 10px 14px
        border-bottom 1px solid $grey-200

        .p-cascader-search-list-clear
            position absolute
            z-index 99
            right 24px
            top 20px
            width 14px
            height 14px

            path
                fill $grey-300

            &:hover
                path
                    fill $blue-500
                    transition fill .3s

    .p-cascader-search-list-menu
        min-height 10px
        width 100%
        padding: 0;
        overflow-y auto

        li.p-cascader-search-list-item
            padding: 8px 12px 8px 24px
            width 100%

    .p-cascader-search-list-select-panel-footer
        position absolute
        right 0
        bottom 0
        z-index 10
        display flex
        justify-content flex-end
        align-items center
        padding 0 12px 0 16px
        height 45px
        line-height 45px
        background $theme
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

.p-cascader-search-list-drop
    position absolute
    width auto
    border 1px solid $grey-300
    border-radius 4px
    box-shadow $box-shadow-bottom
    background $theme
    font-size 0

    .p-cascader-search-list-select-container
        display flex
        justify-content flex-start

        background $theme
            .p-cascader-search-list-no-found
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

    .p-cascader-search-list-column
        display flex
        width 100%
        box-sizing border-box
        overflow: hidden;

        .p-cascader-search-list-input
            width 100%
            height 32px
            position relative
            z-index 10
            background none
            border 1px solid $grey-400
            border-radius 4px
            outline none
            font-size 14px
            color $grey-900

        .p-cascader-search-list-menu
            display: inline-block
            padding 8px 0
            min-width: 120px
            height 325px
            border-right: 1px solid $grey-200
            vertical-align: top
            overflow: auto
            font-size 0

            li.p-cascader-search-list-item
                position relative
                display flex
                justify-content space-between
                align-items center
                height 38px
                padding: 8px 12px
                box-sizing border-box
                color: $grey-900
                line-height: 22px
                font-size: 14px;
                white-space: nowrap;
                list-style: none;
                cursor: pointer
                text-align left
                transition: all .3s;

                .p-select-multiple-icon
                    position absolute
                    right 26px
                    top 34%
                    width 12px
                    height 6px
                    border: 2px solid rgb(0, 145, 255)
                    border-top none
                    border-right none
                    transform translateY(-50%) rotate(-45deg)

                .p-cascader-search-list-item-text
                    width calc(100% - 20px)
                    white-space: nowrap
                    overflow hidden
                    text-overflow ellipsis

                .p-checkbox
                    padding-right 4px
                    padding-top 0
                    height 24px

                .p-cascader-search-list-item-text-disabled
                    color $grey-400
                    cursor not-allowed

                &:hover
                    background $hover-color-grey

            li.p-cascader-search-list-item-active
                color $blue-500
                background $blue-100!important

                i.p-cascader-search-list-item-loading
                    pointer-events none

            li.p-cascader-search-list-item-disabled
                color $grey-400
                cursor not-allowed

                &:hover
                    background: transparent

    .second-cascader-menu
        input:

        :-webkit-input-placeholder
            color: $grey-400;

        input:-moz-placeholder
            color: $grey-400;
        input:

        :-moz-placeholder
            color: $grey-400;
        input:

        :-ms-input-placeholder
            color: $grey-400;
        display relative
        box-sizing border-box

        .select-all-box
            display flex
            align-items center
            padding-left 12px
            height 38px

        .p-cascader-search-list-not-found
            height 38px
            line-height 38px
            color $grey-400
            font-size 14px
            padding-left 34px

        .second-cascader-menu-filter
            position relative
            padding 10px 14px
            border-bottom 1px solid $grey-200

            .p-cascader-search-list-clear
                position absolute
                z-index 99
                right 24px
                top 20px
                width 14px
                height 14px

                path
                    fill $grey-300

                &:hover
                    path
                        fill $blue-500
                        transition fill .3s

        .p-cascader-search-list-menu
            height 138px
            width 100%
            overflow-y auto

            li.p-cascader-search-list-item
                padding: 8px 12px 8px 24px

        .p-cascader-search-list-select-panel-footer
            position absolute
            right 0
            bottom 0
            display flex
            justify-content flex-end
            align-items center
            padding 0 12px 0 16px
            height 45px
            line-height 45px
            background $theme
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

</style>
