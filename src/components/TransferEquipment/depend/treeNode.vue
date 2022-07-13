<template>
	<div class="p-tree-node">
		<div
			:class="['p-tree-node-content', !multiple&&treeItem.checked==='checked'&&'p-tree-node-content-checked', treeItem.disabled&&'p-tree-node-content-disabled']"
			:style="{paddingLeft: paddingLeft+'px'}"
		>
			<section class="p-tree-svg" @click="openChild">
				<ArrowTriangle
					:class="['p-tree-icon-svg', (treeItem.open)&&'p-tree-icon-rotate']"
					v-if="triangleShow"
				/>
			</section>
			<div class="p-equipment-tree-node-check">
				<div class="p-equipment-node-box" @click="handleCheck(treeItem, index)">
					<Checkbox
						:checked="treeItem.checked"
						:disabled="treeItem.disabled"
						v-if="checkboxShow"
						style="margin-right: 4px"
					/>
					<section class="p-equipment-tree-node-title" >
						<article
							class="p-equipment-tree-node-name"
							@mouseenter="treeItemEnter"
							v-html="treeItem.name"
						/>
					</section>
				</div>
				<div class="p-equipment-tree-node-icon-box" @click="changePanel">
					<Icon v-if="treeItem.children" class="p-equipment-tree-node-icon" name="more" />
				</div>
			</div>
			<div :ref="`chosePanel${index}`" tabindex="-1" @blur="closePanel" v-show="treeItem.panel" class="p-equipment-tree-panel">
				<p @click="choseAllChild">选择所有子级</p>
				<p @click="choseNextChild">选择下一级</p>
				<p @click="cancelAllChild">取消所有子级</p>
			</div>
		</div>
		<div class="p-tree-child" v-if="triangleShow" v-show="treeItem.open">
			<TreeNode
				:multiple="multiple"
				:linkage="linkage"
				:lastStage="lastStage"
				v-for="(item, ind) in treeItem.children"
				:key="item.id+'-'+ind"
				:treeItem="item"
				:triangleShow="!!(item.children&&item.children.length)"
				:index="`${index}-${ind}`"
				:change="change"
				:leftPosition="leftPosition"
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
            default: false
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
        },
        leftPosition: {
            type: Number,
            default: 12
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
            return this.multiple && (!this.triangleShow || !this.lastStage) && flag;
        }
    },
    methods: {
        closePanel() {
            this.treeItem.panel = false;
        },
        choseAllChild() {
            const item = this.treeItem;
            // if (item.disabled) return;
            if (this.checkboxShow) {
                const status = '';
                const treeItem = item;
                const { checked, children } = treeItem;

                if (children && children.length) treeItem.children = this.setCheckedStatus(children, 'checked');

                this.change(treeItem, this.index, true);
            }
            this.closePanel();
        },
        choseNextChild() {
            this.treeItem.children.forEach((item, index) => {
                if (this.lastStage && children && children.length) return;
                if (item.checked !== 'checked' && !item.disabled) {
                    item.checked = 'checked';
                    this.change(item, `${this.index}-${index}`);
                }
            });
            this.closePanel();
        },
        cancelAllChild() {
            const item = this.treeItem;
            // if (item.disabled) return;
            if (this.checkboxShow) {
                const status = '';
                const treeItem = item;
                const { checked, children } = treeItem;
                if (children && children.length) treeItem.children = this.setCheckedStatus(children, 'uncheck');
                this.change(treeItem, this.index, true);
            }
            this.closePanel();
        },
        // 显示快速选择菜单
        changePanel(event) {
            if (this.treeItem.panel) {
                this.treeItem.panel = !this.treeItem.panel;
                if (this.treeItem.panel) {
                    this.$refs[`chosePanel${this.index}`].focus();
                } else {
                    this.$refs[`chosePanel${this.index}`].blur();
                }
            } else {
                this.$set(this.treeItem, 'panel', true);
                this.$nextTick(() => {
                    this.$refs[`chosePanel${this.index}`].focus();
                });
            }
        },
        // 展开/收起
        openChild() {
            // if (!this.disabledOpen && this.treeItem.disabled ) return
            this.treeItem.open = !this.treeItem.open;
        },
        // 鼠标hover
        treeItemEnter(e) {
            const { target } = e;
            const { clientWidth, scrollWidth, title } = target;
            if (!title && scrollWidth > clientWidth) target.title = target.innerText;
        },
        // 选择
        handleCheck(obj, index) {
            if (obj.disabled) return;
            if (this.multiple) {
                if (this.checkboxShow) {
                    let status = '';
                    // const treeItem=this.treeItem;
                    const treeItem = obj;
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
                        this.change(obj, index);
                    } else {
                        // 上下级不联动 this.lastStage为true-表示只能选择末级节点
                        if (this.lastStage && children && children.length) return;
                        // this.treeItem=treeItem;
                        treeItem.checked = status;
                        this.change(obj, index);
                    }
                }
            } else {
                const notLastNode = obj.hasOwnProperty('children') || (obj.hasOwnProperty('isleaf') ? !obj.isleaf : false);
                if (this.lastStage && notLastNode) return;
                // 执行父级的函数
                this.change(obj, index);
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
        }
    }
};
</script>
<style lang="stylus">
.p-equipment-tree-node-check
	display: inline-block
	vertical-align: middle
	width: calc(100% - 24px)
	.p-equipment-node-box
		display inline-block
		width calc(100% - 40px)
		.p-equipment-tree-node-title
			position: relative
			display: inline-block
			vertical-align: middle
			user-select: none
			width: calc(100% - 32px)
			.p-equipment-tree-node-name
				width: 100%
				height: 38px
				line-height: @height
				white-space: nowrap
				text-overflow: ellipsis
				overflow: hidden
				font-size: 14px
				color: $grey-900
	.p-equipment-tree-node-icon-box
		display inline-block
		width 16px
		.p-equipment-tree-node-icon
			line-height 38px
			vertical-align middle
			margin-right 16px
.p-equipment-tree-panel
	position absolute
	right 16px
	top 25px
	width:108px;
	height:130px;
	background #ffffff
	box-shadow:$box-shadow-bottom;
	border-radius:4px;
	border:1px solid $grey-300;
	z-index 1000
	padding 8px 0
	outline none
	animation selectPanel .3s ease-in-out
	>p
		font-size 14px
		width 100%
		height:38px;
		font-size:14px;
		font-weight:400;
		color: $grey-900;
		line-height:38px;
		padding-left  8px
		padding-right  12px
		user-select none
		&:hover
			background $hover-color-grey
@keyframes selectPanel {
	from {
		opacity 0
		transform translateY(-20)
	}
 	to {
		opacity 1
		transform translateY(0)
	 }
}
</style>
