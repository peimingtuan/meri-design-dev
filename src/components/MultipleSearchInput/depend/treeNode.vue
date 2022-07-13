<template>
    <div class="p-tree-node">
        <div
                :class="['p-tree-node-content', treeItem.disabled&&'p-tree-node-content-disabled']"
                :style="{paddingLeft: paddingLeft*4+'px'}"
        >
            <div class="p-tree-node-check">
                <!-- :checked="treeItem.disabled ? 'uncheck' : treeItem.checked" -->
                <section style="display: inline-block" @click="handleCheck(treeItem,'item')">
                    <Checkbox
                            :checked="treeItem.checked"
                            :disabled="treeItem.disable"
                            style="margin-right: 4px"
                    />
                </section>
                <section class="p-tree-node-title p-tree-node-title-item" :style="{width: showArrow&&`calc(100% - 60px) !important`}" @click="showChildrenFn(treeItem)">
                    <article class="p-tree-node-name" @mouseenter="treeItemEnter" v-html="treeItem.name"/>
                </section>
                <article class="p-tree-node-arrow" v-if="showArrow">
                    <ArrowRight />
                </article>
            </div>
        </div>
    </div>
</template>

<script>
import Checkbox from '../../Checkbox';
import ArrowRight from '../../static/iconSvg/arrow_right.svg';

export default {
    name: 'TreeNode',
    components: { Checkbox, ArrowRight },
    props: {
        /**
             * 是否开启多选
             */
        multiple: {
            type: Boolean,
            default: false
        },
        /**
             * 是否联动选择
             */
        linkage: {
            type: Boolean,
            default: true
        },
        /**
             * 只能选择末级
             */
        lastStage: {
            type: Boolean,
            default: false
        },
        /**
             * 树形结构子项数据列表
             */
        treeItem: {
            type: Object,
            default: () => {}
        },
        /**
         * 点击某项
         */
        change: {
            type: Function,
            default: () => false
        },
        /**
             * 下拉三角形是否显示
             */
        triangleShow: {
            type: Boolean,
            default: false
        },
        /**
             * 索引
             */
        index: {
            type: String,
            default: ''
        },
        // 是否显示右边的箭头
        showArrow: {
            type: Boolean,
            default: false
        },
        leftPosition: {
            type: Number,
            default: 12
        },
        /**
             * 点击某项
             */
        change: {
            type: Function,
            default: () => false
        },
        showCheckBox: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        // 左边内边距
        paddingLeft() {
            return (this.index.split('-').length - 1) * 24 + Number(this.leftPosition);
        }
    },
    methods: {
        // 鼠标hover
        treeItemEnter(e) {
            const { target } = e;
            const { clientWidth, scrollWidth, title } = target;
            if (!title && scrollWidth > clientWidth) target.title = target.innerText;
        },
        // 选择
        handleCheck(obj, type) {
            if (obj.disabled || (obj.isleaf === false)) return;
            let status = '';
            this.$parent.clickType = type;
            const { treeItem } = this;
            const { checked, children } = treeItem;
            if (checked === 'checked') {
                status = 'uncheck';
            } else {
                //  if (checked === 'uncheck' || checked === 'notNull')
                status = 'checked';
            }
            if (this.linkage) {
                // 上下级联动
                if (children && children.length) treeItem.children = this.setCheckedStatus(children, status);
                treeItem.checked = status;
                this.treeItem = treeItem;
                this.$parent.change(obj);
            } else {
                // 上下级不联动 this.lastStage为true-表示只能选择末级节点
                // if (this.lastStage && children && children.length) return;
                this.treeItem = treeItem;
                treeItem.checked = status;
                this.$parent.change(obj);
            }
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

        // 展开下一级
        showChildrenFn(item) {
            if (!item.children || item.disabled) return;
            item.flag = 'clickItem';
            this.$emit('changeShowData', item);
        }
    }

};
</script>

<style lang="stylus">
    @import "../../static/stylus/tree/tree.styl"
    .p-tree-node-title-item
        width calc(100% - 40px) !important
    .p-tree-node-arrow
        display inline-block
        vertical-align middle
        margin-left 4px
        margin-right 4px
        width 8px
        height 24px
        line-height @height
        svg
            vertical-align middle
            width 8px
            height 14px
</style>
