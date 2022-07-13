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
			<div class="p-tree-node-check" @click="handleCheck(treeItem, index)">
				<Icon v-if="treeItem.icon" class="p-tree-node-icon" :name="treeItem.icon" />
				<Checkbox
					:checked="treeItem.disabled ? 'uncheck' : treeItem.checked"
					:disabled="treeItem.disabled"
					v-if="checkboxShow"
					style="margin-right: 4px"
				/>
				<section :style="{width: `calc(100% - ${labelWidth}px)`}" class="p-tree-node-person-title">
					<article class="p-tree-node-name" @mouseenter="treeItemEnter" v-html="treeItem.name" />
				</section>
				<Icon
					class="p-tree-node-label-icon"
					v-if="treeItem.label&&treeItem.label.type === 'icon'"
					:color="treeItem.label.color"
					:name="treeItem.label.value"
				/>
				<span
					v-if="treeItem.label&&treeItem.label.type === 'number'"
					:style="{width: treeItem.label.value.length * 8 + 'px'}"
					:class="['p-tree-node-label', index.split('-').length === 1 && 'p-tree-node-label-first']"
				>{{treeItem.label.value}}</span>
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
import Icon from '../../Icon';

export default {
    name: 'TreeNode',
    components: { ArrowTriangle, Checkbox, Icon },
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
        },
        labelWidth() {
            let width = 0,
                { treeItem } = this;
            if (treeItem.icon) {
                width = 32;
            }
            if (treeItem.label) {
                if (treeItem.label.type === 'icon') {
                    width += 24;
                } else {
                    width += treeItem.label.value.length * 8 + 8;
                }
            }
            return width;
        }
    },
    methods: {
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
                const notLastNode = obj.hasOwnProperty('children') || (obj.hasOwnProperty('isleaf') ? !obj.isleaf : false);
                if (this.lastStage && notLastNode) return;
                // 执行父级的函数
                this.change(obj, index);
            }
        },
        // 设置checked状态
        setCheckedStatus(data, status) {
            return data.map(d => {
                d.checked = status;
                if (d.children && d.children.length) d.children = this.setCheckedStatus(d.children, status);
                return d;
            });
        }
    }
};
</script>
