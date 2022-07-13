<template>
    <div class="p-select-checkbox" v-show="data&&data.length">
        <div class="p-select-checkbox-item"
             :class="{'p-select-checkbox-disabled': item.disabled}"
             v-for="(item, ind) in selectData"
             :key="item.id"
            >
            <Checkbox :key="`${item.id}-${ind}`"
                      :checked="item.checked"
                      :disabled="item.disabled"
                      :stopPropagation="stopPropagation"
                      :data-id="item.id"
                      @change="change"
                >
                <span class="p-select-checkbox-text"
                      :class="{'p-select-checkbox-text-ellipsis-start': item.excess}"
                      v-html="item.name"
                      :style="textIndent&&{textIndent: `${item.excess - (item.excess && scrollBar)}px`}"
                      @mouseenter="textEllipsis($event, item)"
                ></span>
            </Checkbox>
        </div>
    </div>
</template>

<script>
import Checkbox from '../Checkbox/Checkbox';
import GetTextHideWidth from '../static/utils/GetTextHideWidth';
import GetScrollbarWidth from '../static/utils/GetScrollbarWidth';
import TextEllipsis from '../static/utils/TextEllipsis';

export default {
    name: 'SelectCheckbox',
    components: { Checkbox },
    props: {
        /**
         * 下拉列表数据
         */
        data: {
            type: Array,
            default: () => []
        },
        // 父级选中子级禁用，子级选中不影响父级 (当此值为true时，returnParentNode为false不生效)
        childDisable: {
            type: Boolean,
            default: false
        },
        // 宽
        width: {
            type: [String, Number],
            default: 280
        },
        // 左侧显示省略号
        textIndent: {
            type: Boolean,
            default: true
        },
        // 阻止冒泡
        stopPropagation: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            scrollBar: 0 // 滚动条宽度
        };
    },
    computed: {
        selectData: {
            get() {
                const { data, textIndent } = this;
                if (JSON.stringify(data).length < 4) return [];
                return data.map(d => {
                    if (textIndent) d.excess = -this.getTextWidth(d.name);
                    return d;
                });
            },
            set(newData) {
                return newData;
            }
        }
    },
    mounted() {
        this.scrollBar = GetScrollbarWidth();
    },
    methods: {
        textEllipsis(e, { excess, name }) {
            const { textIndent } = this,
                reg = /<\/?.+?\/?>/g;
            if (textIndent) {
                if (excess) e.target.title = name.replace(reg, '');
            } else {
                TextEllipsis(e);
            }
        },
        // 移除某一个选中的
        removeOption(id) {
            this.selectData = this.selectData.map(d => {
                if (d.id === id) d.checked = 'uncheck';
                return d;
            });
        },
        // 提交当前选择的值
        optionClick(id, checked) {
            let selectedData = {},
                unselectData = {};
            this.selectData = this.selectData.map(d => {
                if (d.id === id && !d.disabled) {
                    d.checked = checked;
                    if (checked.startsWith('c')) selectedData = d;
                    else unselectData = d;
                }
                return d;
            });
            this.$emit('change', selectedData, unselectData);
        },
        // checkbox选中改变
        change(checked, { id }) {
            this.optionClick(id, checked);
        },
        getTextWidth(text = '') {
            const reg = /<\/?.+?\/?>/g,
                { width } = this,
                maxWidth = width - 49;
            // 49 = 1 + 16 + 8 + 16 + 8
            return GetTextHideWidth(maxWidth, text.replace(reg, ''));
        }
    }
};
</script>

<style lang="stylus">
.p-select-checkbox
    border-radius 4px
    width 100%
    font-size 0
.p-select-checkbox-item
    padding-left 16px
    padding-right 8px
    width 100%
    height 38px
    line-height @height
    color $grey-900
    transition background-color.3s
    font-size 0
    &:hover
        background-color $hover-color-grey
        .p-select-checkbox-text-ellipsis-start
            &:before
                background-color $hover-color-grey
    .p-checkbox
        width 100%
.p-select-checkbox-disabled
    .p-select-checkbox-text
        color $grey-400
.p-select-checkbox-text
    display inline-block
    vertical-align middle
    width 100%
    height 100%
    font-size 14px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
.p-select-checkbox-text-ellipsis-start
    position relative
    &:before
        position absolute
        left -1px
        top -1px
        display inline-block
        background-color $theme
        width 12px
        height 100%
        content '...'
        font-size 14px
        color $grey-900
        text-align right
        transition background-color .3s
        pointer-events none
// 搜索高亮
.per-drop-tree-highlight
    color $blue-500
</style>
