<template>
    <div class="p-tree-node">
        <div
                :class="[
                    'p-tree-node-content',
                    !multiple&&treeItem.checked==='checked'&&'p-tree-node-content-checked',
                    treeItem.disabled&&'p-tree-node-content-disabled',
                    index==='0'&&`p-tree-node-content-${index}`
                ]"
                :style="{paddingLeft: paddingLeft+'px'}"
        >
            <section class="p-tree-svg" @click.stop="openChild">
                <ArrowTriangle
                        :class="['p-tree-icon-svg', (treeItem.open)&&'p-tree-icon-rotate']"
                        v-if="triangleShow"
                />
            </section>
            <div class="p-tree-node-check" @click.stop="handleCheck(treeItem, index)">
                <div class="p-tree-node-checkbox" v-if="checkboxShow && treeItem.name && showCheckBox">
                    <Checkbox
                            :checked="treeItem.checked"
                            :disabled="isDisabled"
                    />
                </div>
                <section :class="[
                            'p-tree-node-title',
                             multiple ? 'p-tree-node-title-multiple' : 'p-tree-node-title-single'
                        ]"
                         v-if="treeItem.name"
                >
                    <article class="p-tree-node-name"
                             @mouseenter="treeItemEnter"
                             v-html="treeItem.name"
                    />
                </section>
            </div>
        </div>
        <div class="p-tree-child" v-if="triangleShow && treeItem.open">
            <TreeNode
                    :multiple="multiple"
                    :linkage="linkage"
                    :childDisabled="childDisabled"
                    :lastStage="lastStage"
                    v-for="(item, ind) in treeItem.children"
                    :key="item.id+'-'+ind"
                    :treeItem.sync="item"
                    :triangleShow="!!(item.children&&item.children.length&&item.children[0].id)"
                    :index="`${index}-${ind}`"
                    :change="change"
                    :clickCallBack="clickCallBack"
                    :leftPosition="leftPosition"
                    :openNode="openNode"
            />
        </div>
    </div>
</template>

<script>
import ArrowTriangle from '../../static/iconSvg/arrow_triangle.svg';
import Checkbox from '../../Checkbox';

export default {
    name: 'TreeNode',
    components: { ArrowTriangle, Checkbox },
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
        // 点击某项后选中的回调
        clickCallBack: {
            type: Function,
            default: () => false
        },
        // 点击节点展开收起的回调
        openNode: {
            type: Function,
            default: () => {}
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
        // 左侧距离
        leftPosition: {
            type: Number,
            default: 12
        },
        // 勾选父级 -- 子级为勾选状态且为disabled
        childDisabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        // 左边内边距
        paddingLeft() {
            return (this.index.split('-').length - 1) * 24 + Number(this.leftPosition);
        },
        checkboxShow() {
            const item = this.treeItem,
                flag = item.hasOwnProperty('isleaf') ? item.isleaf : true;
            return (
                this.multiple
                && (!this.triangleShow || !this.lastStage) && flag) || (this.multiple && (!this.triangleShow || !this.lastStage)
                && flag === false
            );
        },
        showCheckBox() {
            const item = this.treeItem;
            return item.hasOwnProperty('showCheckBox') ? item.showCheckBox : true;
        },
        isDisabled() {
            const curItem = this.treeItem;
            if (curItem.disabled) return true;
            if (curItem.hasOwnProperty('isleaf')) {
                return curItem.isleaf === false;
            }
            return false;
        }
    },
    methods: {
        // 展开/收起
        openChild() {
            // if (!this.disabledOpen && this.treeItem.disabled ) return
            const status = !this.treeItem.open;
            this.treeItem.open = status;
            this.openNode(status, this.treeItem);
        },
        // 鼠标hover
        treeItemEnter(e) {
            const { target } = e;
            const { clientWidth, scrollWidth, title } = target;
            if (!title && scrollWidth > clientWidth) target.title = target.innerText;
        },
        // 选择
        handleCheck(obj, index) {
            if (
                obj.disabled
                || (obj.isleaf === false)
                || (!this.showCheckBox && this.multiple)
            ) return;
            if (this.multiple) {
                if (this.checkboxShow) {
                    let status = '';
                    const { treeItem } = this;
                    const { checked, children } = treeItem;
                    if (checked === 'checked') {
                        status = 'uncheck';
                    } else {
                        //  if (checked === 'uncheck' || checked === 'notNull')
                        status = 'checked';
                    }
                    this.clickCallBack(obj);
                    if (this.linkage) {
                        // 上下级联动
                        if (children && children.length) {
                            treeItem.children = this.setCheckedStatus(children, status);
                        }
                        treeItem.checked = status;
                        this.treeItem = treeItem;
                        this.change(obj, index);
                    } else {
                        // 上下级不联动 this.lastStage为true-表示只能选择末级节点
                        if (this.lastStage && children && children.length) return;
                        this.treeItem = treeItem;
                        treeItem.checked = status;

                        this.change(obj, index);
                    }
                }
            } else {
                const notLastNode = (
                    (obj.children && obj.children.length)
                    || (obj.hasOwnProperty('isleaf') ? !obj.isleaf : false)
                );
                if (this.lastStage && notLastNode) return;
                // 执行父级的函数
                this.change(obj, index);
            }
        },
        // 设置checked状态
        setCheckedStatus(data, status) {
            return data.map(d => {
                if (this.childDisabled) {
                    d.checked = status;
                    if (status === 'checked') {
                        this.$set(d, 'disabled', true);
                    } else {
                        this.$set(d, 'disabled', false);
                    }
                } else {
                    if (!d.disabled) {
                        d.checked = status;
                    }
                }
                if (d.children && d.children.length) {
                    d.children = this.setCheckedStatus(d.children, status);
                }
                return d;
            });
        }
    }
};
</script>
