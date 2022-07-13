<template>
    <transition :name="position?'selectDownUpExtend':'selectDownUpExtendTop'">
        <div :class="[
                'p-drop-box',
                status.includes('multiple')
                ?`p-drop-box-multiple${status.includes('Search')?'-search':''}`
                :`p-drop-box-single${status.includes('Search')?'-search':''}`
            ]"
             v-show="dropBoxStatus"
             tabindex="-1"
             @blur="blurHandle"
             @mouseenter="dropBoxEnter"
             @mouseleave="dropBoxLeave"
            >
            <div class="p-drop-box-search" v-if="status.includes('Search')">
                <input v-model="searchText" class="p-drop-box-input" type="text" :placeholder="placeholder">
                <i @click="clearText" class="p-drop-box-input-clear" v-show="!!searchText"><ClearSvg /></i>
            </div>
            <div class="p-drop-box-list">
                <template v-for="(item, i) in dropData">
                    <div :class="[
                            'p-drop-box-item',
                             status.includes('multiple')&&'p-drop-box-item-checkbox',
                             (status.includes('single')&&selectedId===item.id)&&'p-drop-box-item-selected'
                         ]"
                         :key="`item-${item.id}-${i}`"
                        >
                        <Checkbox v-if="status.includes('multiple')"
                                  :checked="item.checked"
                                  :disabled="item.disabled"
                                  :data-i="i"
                                  @change="checkboxChange"
                        >{{item.name}}</Checkbox>
                        <section v-else class="p-drop-box-text"
                                 @mouseenter="TextEllipsis"
                                 @click.stop="itemClick(item)"
                        >{{item.name}}</section>
                    </div>
                </template>
            </div>
            <template v-if="status.includes('multiple')">
                <div :class="['p-drop-box-handle', (dropData.length>5)&&'p-drop-box-handle-shadow']">
                    <section class="p-drop-box-btn p-drop-box-cancel" @click="cancel">取消</section>
                    <section :class="['p-drop-box-btn', activeConfirm?'p-drop-box-confirm':'p-drop-box-disabled']"
                             @click="confirm"
                    >确定</section>
                </div>
            </template>
        </div>
    </transition>
</template>

<script>
import ClearSvg from '../../static/iconSvg/clear2.svg';
import TextEllipsis from '../../static/utils/TextEllipsis';

import Checkbox from '../../Checkbox';

export default {
    name: 'DropBox',
    components: { ClearSvg, Checkbox },
    props: {
        data: {
            type: Array,
            default: () => []
        },
        selectedId: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: '请输入'
        },
        // 筛选4种状态 【'single', 'multiple', 'singleSearch', 'multipleSearch'】
        status: {
            type: String,
            default: 'single'
        },
        // screen triangle
        icon: {
            type: String,
            default: 'screen'
        }
    },
    data() {
        return {
            position: true, // 动画执行方向
            dropBoxStatus: false, // 下拉面板状态
            activeClose: true, // 是否可关闭弹窗
            activeConfirm: false, // 是否可点击确定
            searchText: '', // 搜索输入的文字
            dropDataHistory: [], // 下拉面板数据
            dropData: [], // 下拉面板数据
            confirmClicked: false // 点击过确定
        };
    },
    watch: {
        data: {
            handler(n) {
                this.setDropData(JSON.parse(JSON.stringify(n)));
            },
            deep: true,
            immediate: true
        },
        // 监听输入的文字
        searchText(n, o) {
            if (n === o) return;
            if (n) {
                if (this.timer) clearTimeout(this.timer);
                const { data } = this;
                this.timer = setTimeout(() => {
                    this.setDropData(JSON.parse(JSON.stringify(data)), n);
                }, 300);
            } else {
                this.dropData = [];
            }
        },
        dropBoxStatus(n) {
            if (n) {
                this.$nextTick(() => {
                    this.$el.focus();
                });
            }
        }
    },
    methods: {
        // 设置title
        TextEllipsis,
        // 清楚输入的文字
        clearText() {
            const { status, dropDataHistory, dropData } = this;
            this.searchText = '';
            this.dropData = [];
            if (status.includes('Search')) {
                if (status.includes('single')) {
                    this.$emit('change', '', {});
                } else {
                    this.activeConfirm = JSON.stringify(dropDataHistory) !== JSON.stringify(dropData);
                }
            }
        },
        // 设置下拉列表数据 kw——keyWords
        setDropData(data, kw = '') {
            const that = this,
                { status } = this;
            const strategy = {
                filter() {
                    if (kw) {
                        return data.filter(d => {
                            if (d.name.includes(kw)) return d;
                            return null;
                        });
                    }
                    return [];
                },
                single() {
                    that.dropData = data;
                },
                multiple() {
                    that.dropData = data.map(d => {
                        d.checked = d.checked || 'uncheck';
                        d.disabled = d.disabled || false;
                        return d;
                    });
                },
                singleSearch() {
                    that.dropData = this.filter();
                },
                multipleSearch() {
                    that.dropData = this.filter().map(d => {
                        d.checked = d.checked || 'uncheck';
                        d.disabled = d.disabled || false;
                        return d;
                    });
                }
            };
            strategy[status]();
            this.dropDataHistory = JSON.parse(JSON.stringify(that.dropData));
        },
        // 选中项 - 单选
        itemClick(item) {
            /*
            const { status } = this;
            if (status.includes('Search')) {
                setTimeout(() => {
                    this.searchText = '';
                    this.dropData = [];
                }, 300);
            }
            */
            this.$emit('change', item.id, item);
        },
        // checkbox状态改变
        checkboxChange(v, { i }) {
            const { dropData } = this;
            const dData = dropData.map((d, ind) => {
                if (Number(i) === ind) d.checked = v;
                return d;
            });
            this.dropData = dData;
            this.activeConfirm = JSON.stringify(this.dropDataHistory) !== JSON.stringify(dData);
        },
        blurHandle() {
            const { activeClose } = this;
            if (!activeClose) return;
            this.cancel();
        },
        dropBoxEnter() {
            this.activeClose = false;
        },
        dropBoxLeave() {
            this.activeClose = true;
            this.$el.focus();
        },
        // 取消
        cancel() {
            const { status, confirmClicked, dropDataHistory } = this;
            if (status.includes('multiple')) this.dropData = JSON.parse(JSON.stringify(dropDataHistory));
            this.activeConfirm = false;
            if (status.includes('Search') && !confirmClicked) setTimeout(() => { this.clearText(); }, 300);
            this.$emit('cancel', false);
        },
        // 确定
        confirm() {
            if (!this.activeConfirm) return;
            const { dropData } = this,
                selectedData = [],
                selectedId = [];
            dropData.forEach(d => {
                if (d.checked === 'checked') {
                    selectedData.push(d);
                    selectedId.push(d.id);
                }
            });
            setTimeout(() => { this.dropDataHistory = JSON.parse(JSON.stringify(this.dropData)); }, 300);
            this.$emit('change', selectedId.toString(), selectedData);
            this.activeConfirm = false;
            this.confirmClicked = true;
        }
    },
    beforeDestroy() {
        if (this.timer) clearTimeout(this.timer);
    }
};
</script>

<style lang="stylus">
@import "../../static/stylus/animate/selectDownUpExtend.styl"

.p-drop-box
    position absolute
    outline none
    padding-top 8px
    padding-bottom 8px
    background-color $theme
    border 1px solid $grey-300
    border-radius 4px
    box-shadow $box-shadow-bottom
    min-width 120px
    max-width 240px
    z-index 7000
    font-size 0
    //pointer-events none
    overflow hidden
.p-drop-box-multiple
    max-height 250px
.p-drop-box-multiple-search
    height 250px
.p-drop-box-single
    max-height 208px
.p-drop-box-single-search
    height 208px
.p-drop-box-search
    position relative
    margin 4px 12px
    width calc(100% - 24px)
.p-drop-box-input
    outline none
    padding-left 8px
    padding-right 30px
    border 1px solid $grey-400
    border-radius 4px
    width 100%
    height 32px
    font-size 14px
    color $grey-900
    transition border-color .3s
    &:active, &:focus, &:hover
        border-color $blue-500
.p-drop-box-input-clear
    position absolute
    right 1px
    top 1px
    padding-top 7px
    display inline-block
    width 30px
    height 30px
    text-align center
    cursor pointer
    svg
        width 16px
        height 16px
        path
            transition fill .3s
    &:hover
        svg
            path
                fill $blue-500
.p-drop-box-list
    width 100%
    max-height 190px
    overflow-x hidden
    overflow-y auto
.p-drop-box-item
    display flex
    align-items center
    padding-left 12px
    padding-right 12px
    width 100%
    height 38px
    line-height @height
    color $grey-900
    cursor pointer
    white-space nowrap
    text-overflow ellipsis
    overflow hidden
    transition background-color .3s
    &:hover
        background-color $grey-200
    &.p-drop-item-selected
        color $blue-500
        background-color $blue-100
    .p-drop-box-text
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        width 100%
        font-size 14px
.p-drop-box-item-checkbox
    .p-drop-box-text
        width calc(100% - 20px)
.p-drop-box-item-selected
    background-color $blue-100
    .p-drop-box-text
        color $blue-500
.p-drop-box-handle
    position absolute
    left 0
    bottom 0
    z-index 10
    display flex
    justify-content flex-end
    padding-left 12px
    padding-right 12px
    background-color $theme
    width 100%
    height 42px
    line-height @height
    .p-drop-box-btn
        font-size 14px
        cursor pointer
        transition color .3s
    .p-drop-box-cancel
        margin-right 16px
        color $grey-900
        &:hover
            color $blue-500
    .p-drop-box-confirm
        color $blue-500
        &:active
            color $blue-600
    .p-drop-box-disabled
        color $grey-400
        cursor not-allowed
.p-drop-box-handle-shadow
    box-shadow $box-shadow-top

</style>
