<template>
<!--    <div class="p-tree-node p-tree-node-bi" v-show="!(index==='0'&&total!==0)">-->
    <div class="p-tree-node p-tree-node-bi" v-show="!(index==='0'&&total===0)">
        <div
                v-show="!treeItem.isHide"
                :class="['p-tree-node-content', !multiple&&treeItem.checked==='checked'&&'p-tree-node-content-checked']"
                :style="{paddingLeft: paddingLeft+'px'}"
        >
            <section
                    class="p-tree-svg"
                    @click="openChild"
            ><ArrowTriangle :class="['p-tree-icon-svg', treeItem.open&&'p-tree-icon-rotate']" v-if="triangleShow" /></section>
            <div class="p-tree-node-check" @click="handleCheck(treeItem.id, index)">
                <Checkbox :checked="treeItem.checked" v-if="multiple" />
                <section class="p-tree-node-title">
                    <article
                            class="p-tree-node-name"
                            :style="{width: (treeItem.children&&treeItem.children.length&&index!=='0')?'calc(100% - 32px)':'100%'}"
                            @mouseenter="treeItemEnter"
                            v-html="treeItem.name"
                    />
                    <article class="p-tree-checked-num" v-if="index.length>2&&checkedNumShow">{{quantity}}/{{total}}</article>
                </section>
            </div>
        </div>
        <div class="p-tree-child" v-show="treeItem.open">
            <TreeNodeBi
                    :multiple="multiple"
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
        name: 'TreeNodeBi',
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
            // 没想左边内边距
            paddingLeft() {
                return (this.index.split('-').length-1)*24+8;
            },
            // 显示选中数量比
            checkedNumShow() {
                return this.multiple && this.treeItem.children && this.treeItem.children.length;
            },
            // 选中的数量
            total() {
                const len=this.treeItem.children.filter(d => !d.isHide).length;
                this.treeItem.isHide = !len;
                return len;
            },
            // 选中的数量
            quantity() {
                return this.treeItem.children.filter(d => !d.isHide && (d.checked==='checked' || d.checked==='notNull')).length;
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
            handleCheck(id, index) {
                if (this.multiple) {
                    let status='';
                    const treeItem=this.treeItem;
                    const {checked, children}=treeItem;

                    if (checked === 'checked') {
                        status='uncheck';
                    } else {
                        //  if (checked === 'uncheck' || checked === 'notNull')
                        status='checked';
                    }

                    if (children && children.length) treeItem.children=this.setCheckedStatus(children, status);
                    treeItem.checked=status;
                    this.treeItem=treeItem;
                }

                // 执行父级的函数
                this.change(id, index);
            },
            // 设置checked状态
            setCheckedStatus(data, status) {
                return data.map(d => {
                    d.checked=status;
                    if (d.children && d.children.length)
                        d.children=this.setCheckedStatus(d.children, status);
                    return d;
                })
            }
        }
    }
</script>

<style lang="stylus">
.p-tree-node-bi
    .p-tree-node-content
        .p-tree-node-check
            .p-tree-node-title
                .p-tree-checked-num
                    position absolute
                    right 0
                    top 0
                    width 32px
                    height 32px
                    line-height @height
                    text-align right
                    font-size 12px
                    color $grey-600
</style>
