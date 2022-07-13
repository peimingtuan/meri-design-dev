<template>
    <div class="second-cascader-menu" :style="menuWidth" @click.stop>
        <div v-if="root" class="second-cascader-menu-filter">
            <input v-model="queryInput"  class='new-cascader-input' style="padding-left:12px;" placeholder="搜索"  @input="queryContent" />
            <Remove  v-show="filterQuery" class="new-cascader-clear" @click.native.stop="cancelFilter" ></Remove>
        </div>
        <div>
            <div class="select-all-box" v-show="!filterQuery" >
                <Checkbox :checked="selectAll" @change="selectAllItems">{{root ? "所有" : "全部"}}</Checkbox>
            </div>
            <div v-if="filterQuery && !queryItems.length" class="new-cascader-not-found">没有匹配到任何内容</div>

            <ul v-show="filterQuery && queryItems.length" class="new-cascader-menu" :style="UlStyle">
                <li :class="itemClass(item)" v-for="(item, index) in queryItems" :key="index" style="padding-left:32px;">
                    <Checkbox v-if="item.parentId!==-1"
                        :checked ="item.checked"
                        :disabled="item.disabled"
                        :data-id ="item.id"
                        @change="handleQueryCheckbox">
                    </Checkbox>
                    <span :class="['new-cascader-item-text', item.forbidden&&'new-cascader-item-text-disabled' ]" :style="itemWidth"> {{item.title}} </span>
                </li>
            </ul>

            <ul v-if="root && !filterQuery"  class="new-cascader-menu" :style="UlStyle">
                <li :class="itemClass(item)" v-for="(item, index) in subListData" :key="index" style="padding-left:32px;">
                    <Checkbox v-if="item.parentId!==-1"
                        :checked ="item.checked"
                        :disabled="item.disabled"
                        :data-id ="item.id"
                        @change="handleCheckbox">
                    </Checkbox>
                    <span :class="['new-cascader-item-text', item.forbidden&&'new-cascader-item-text-disabled' ]" :style="itemWidth"> {{item.title}} </span>
                </li>
            </ul>
            <ul v-if="!root" class="new-cascader-menu" :style="UlStyle">
                <li :class="itemClass(item)" v-for="(item, index) in subListData" :key="index" style="padding-left:32px;">
                    <Checkbox
                        :checked ="item.checked"
                        :disabled="item.disabled"
                        :data-id ="item.id"
                        @change="handleCheckbox">
                    </Checkbox>
                    <span :class="['new-cascader-item-text', item.forbidden&&'new-cascader-item-text-disabled' ]" :style="itemWidth"> {{item.title}} </span>
                </li>
            </ul>
        </div>
        <div @click.stop class="new-cascader-select-panel-footer"  :style="menuWidth" >
            <span @click.stop="cancalPanel">取消</span>
            <span  @click.stop="confirmEmit">确定</span>
        </div>
    </div>
</template>
<script>
import { cloneDeep } from './utils';
import Checkbox from '../Checkbox';
import Remove from '../static/iconSvg/clear2.svg';

export default {
    data() {
        return {
            queryInput: '',
            filterQuery: '',
            selectAll: 'uncheck',
            activeKey: '',
            confirmedData: [],
            storeSubListData: [],
            selectedItems: [],
            queryItems: []
        };
    },
    props: {
        width: {
            type: Number
        },
        subListData: {
            type: Array,
            default: () => []
        },
        open: {
            type: Boolean,
            default: false
        },
        selectIds: {
            type: Array,
            default: () => []
        },
        root: {
            type: Boolean,
            default: true
        }

    },
    computed: {
        menuWidth() {
            let { width } = this;
            if (width < 180) width = 180;
            if (width > 600) width = 600;
            return { width: `${width}px` };
        },
        itemWidth() {
            let { width } = this;
            if (width < 180) width = 180;
            if (width > 600) width = 600;
            return { width: `${width - 56}px` };
        },
        UlStyle() {
            return {
                height: this.root ? '192px' : '245px'
            };
        }
    },
    components: { Remove, Checkbox },
    mounted() {
    },
    watch: {
        open(n, o) {
            if (n && this.subListData.length) {
                this.selectedItems = this.subListData.filter(item => item.checked === 'checked');
                this.checkAllSelectStatus(this.subListData);
            }
        },
        subListData: {
            handler(n, o) {
                if (n) {
                    this.storeSubListData = cloneDeep(n);
                    // this.queryInput=''
                    // this.filterQuery = ''
                    this.selectedItems = this.subListData.filter(item => item.checked === 'checked');
                    this.checkAllSelectStatus(this.subListData);
                }
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        /**
         *  判断选择所有多选框的状态
         * @param  data 判定的数据
         */
        checkAllSelectStatus(data) {
            if (!data || !Array.isArray(data)) return;
            const allChecked = data.every((item) => item.checked === 'checked');
            const someChecked = data.some((item) => item.checked === 'checked');
            if (allChecked) {
                this.selectAll = 'checked';
            } else if (someChecked) {
                this.selectAll = 'notNull';
            } else {
                this.selectAll = 'uncheck';
            }
        },
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
                if (selectItem.checked === 'checked') {
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
        /**
         * 设置列表中每一条的class名称
         */
        itemClass(item) {
            return ['new-cascader-item', {
                'new-cascader-item-active': this.activeKey === item.id,
                'new-cascader-item-disabled': item.disabled
            }];
        },
        selectAllItems() {
            if (this.selectAll === 'checked') {
                this.selectAll = 'uncheck';
            } else {
                this.selectAll = 'checked';
            }
            this.subListData.forEach(item => {
                item.checked = this.selectAll;
            });
            if (this.selectAll === 'checked') {
                this.selectedItems = cloneDeep(this.subListData);
            } else {
                this.selectedItems = [];
            }
            this.storeSubListData = cloneDeep(this.subListData);
        },
        queryContent(event) {
            this.filterQuery = event.target.value || event.data || '';
            const queryItems = this.storeSubListData.filter(item => (item.title ? item.title.indexOf(this.filterQuery) > -1 : false));
            this.queryItems = cloneDeep(queryItems);
        },
        cancelFilter() {
            this.filterQuery = '';
            this.queryInput = '';
            this.subListData = this.storeSubListData;
        },
        cancalPanel() {
            this.$emit('cancel');
        },
        confirmEmit() {
            this.confirmedData = cloneDeep(this.selectedItems);
            this.$emit('confirm', this.confirmedData);
        },
        clearData() {
            this.selectAll = 'uncheck';
            this.activeKey = '';
            this.queryInput = '';
            this.filterQuery = '';
            if (this.root) {
                this.subListData = [];
            } else {
                this.subListData.forEach(item => {
                    item.checked = 'uncheck';
                });
            }
        }
    }
};
</script>
<style lang="stylus">
    .second-cascader-menu
        input::-webkit-input-placeholder
            color: $grey-400;
        input:-moz-placeholder
            color: $grey-400;
        input::-moz-placeholder
            color: $grey-400;
        input::-ms-input-placeholder
            color: $grey-400;
        display relative
        box-sizing border-box
        .select-all-box
            display flex
            align-items center
            padding-left 12px
            height 38px
        .new-cascader-not-found
            height 38px
            line-height 38px
            color $grey-400
            font-size 14px
            padding-left 34px
        .second-cascader-menu-filter
            position relative
            padding 10px 14px
            border-bottom 1px solid $grey-200
            .new-cascader-clear
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
        .new-cascader-menu
            width 100%
            padding:0;
            overflow-y auto
            li.new-cascader-item
                padding: 8px 12px 8px 24px
        .new-cascader-select-panel-footer
            position absolute
            right 0
            bottom 0
            display flex
            justify-content flex-end
            align-items center
            padding 0 12px 0 16px
            height 45px
            line-height 45px
            background $white
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
