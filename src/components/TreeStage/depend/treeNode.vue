<template>
    <div class="p-tree-node">
        <div
                class="p-tree-node-content"
                :style="{paddingLeft: paddingLeft+'px'}"
        >
            <section
                    class="p-tree-svg"
                    @click="openChild"
            ><ArrowTriangle :class="['p-tree-icon-svg', treeItem.open&&'p-tree-icon-rotate']" v-if="triangleShow" /></section>
            <div class="p-tree-node-check" @click="handleCheck(treeItem, index)">
                <Checkbox :checked="treeItem.checked" :disabled="treeItem.disabled" v-if="!lastStage||!triangleShow" />
                <section class="p-tree-node-title">
                    <article
                            class="p-tree-node-name"
                            @mouseenter="treeItemEnter"
                            v-html="treeItem.name"
                    />
                </section>
            </div>
        </div>
        <div class="p-tree-child" v-if="triangleShow" v-show="treeItem.open">
            <TreeNode
                    :lastStage="lastStage"
                    v-for="(item, ind) in treeItem.children"
                    :key="item.id+'-'+ind"
                    :treeItem="item"
                    :triangleShow="!!(item.children&&item.children.length)"
                    :index="`${index}-${ind}`"
                    :change="change"
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
                default: {}
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
            }
        },
        computed: {
            // 左边内边距
            paddingLeft() {
                return (this.index.split('-').length-1)*24+8;
            }
        },
        methods: {
            // 展开/收起
            openChild() {
                this.treeItem.open=!this.treeItem.open
            },
            // 鼠标hover
            treeItemEnter(e) {
                const target=e.target;
                const {clientWidth, scrollWidth, title}=target;
                if (!title && scrollWidth > clientWidth) target.title=target.innerText;
            },
            // 选择
            handleCheck(obj, index) {
                if (obj.disabled) return;
                const treeItem=this.treeItem;
                let status='';
                const {checked, children}=treeItem;
                if (checked === 'checked') {
                    status='uncheck';
                } else {
                    //  if (checked === 'uncheck' || checked === 'notNull')
                    status='checked';
                }
                if (this.lastStage) {
                    // 只能选择末级
                    if (children && children.length) return;
                    this.treeItem=treeItem;
                    treeItem.checked=status;
                    // 执行父级的函数
                    this.change(obj, index);
                } else {
                    if (children && children.length) treeItem.children=this.setStatus(children, status);
                    treeItem.checked=status;
                    this.treeItem=treeItem;

                    // 执行父级的函数
                    this.change(obj, index);
                }
            },
            // 设置状态(checked, disabled)
            setStatus(data, status) {
                return data.map(d => {
                    this.$set(d, 'disabled', status === 'checked');
                    d.checked=status;
                    if (d.children && d.children.length) d.children=this.setStatus(d.children, status);
                    return d;
                })
            }
        }
    }
</script>
