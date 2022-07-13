<template>
    <div class="p-editable-list" :style="width&&{width: width+'px'}">
        <div class="p-editable-list-item" v-for="(item, ind) in editableData" :key="item.id">
            <Editable
                :key="item.id"
                :item="item"
                :showCheckbox="showCheckbox"
                @iconHandle="iconHandle"
                @enter="enterHandle"
                @open="openChildHandle"
                @check="parentCheckHandle"
            />
            <div class="p-editable-child" :style="{height: `${item.childHeight}px`}">
                <section
                        :class="['p-editable-child-list', childId===itemChild.id&&'p-editable-child-list-active']"
                        v-for="(itemChild, indChild) in item.children" :key="'child-'+indChild+'-'+itemChild.id"
                        @click="clickChild(itemChild.id, item)"
                >
                    <article class="p-editable-child-list-dot" :style="{backgroundColor: itemChild.dot}"/>
                    <Checkbox v-if="showCheckbox" :checked="itemChild.checked" :data-ind="`${ind}-${indChild}`" @change="childCheckHandle"/>
                    <article
                            :class="['p-editable-child-list-text', `p-editable-child-list-text-${showCheckbox?'c':'n'}`]"
                    >{{itemChild.name}}</article>
                    <article class="p-editable-child-list-tag">
                        <Tag size="small" :color="itemChild.tagColor">{{itemChild.tag}}</Tag>
                    </article>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import Editable from '../Editable';
import Tag from '../Tag';
import Checkbox from '../Checkbox';

export default {
    name: 'EditableList',
    components: { Editable, Tag, Checkbox },
    props: {
        data: {
            type: Array,
            default: () => []
        },
        width: {
            type: [String, Number],
            default: 180
        },
        // 是否显示checkbox
        showCheckbox: {
            type: Boolean,
            default: false
        },
        // 默认展开的项
        defaultOpenId: {
            type: [String, Number],
            default: ''
        },
        // 选中的id
        selectedId: {
            type: [String, Array],
            default: ''
        }
    },
    data() {
        return {
            editableData: [],
            childId: '' // 子项id
        };
    },
    watch: {
        data: {
            handler(n) {
                this.editableData = this.setEditableData(n);
            },
            deep: true,
            immediate: true
        },
        selectedId: {
            handler(n) {
                this.childId = n;
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        // 格式化数据
        setEditableData(data) {
            return data.map(d => {
                d.openChild = !!(d.children && d.children.length && d.openChild);
                if (d.openChild && d.children && d.children.length) {
                    d.childHeight = d.children.length * 38;
                } else {
                    d.childHeight = 0;
                }
                if (!d.checked) d.checked = 'uncheck';
                const iChild = d.children;
                if (iChild && !iChild.length) {
                    iChild.forEach(dc => {
                        if (!dc.checked) dc.checked = 'uncheck';
                    });
                }
                return d;
            });
        },
        // 展开下级
        openChildHandle(id, status) {
            this.editableData = this.editableData.map(d => {
                if (status && d.id === id) {
                    d.openChild = status;
                    d.childHeight = (d.children?.length || 0) * 38;
                } else {
                    d.openChild = false;
                    d.childHeight = 0;
                }
                return d;
            });

            this.$emit('open', id, status);
        },
        // 点击图标回调
        iconHandle(id, iconName) {
            const data = this.editableData;
            if (iconName === 'delete') {
                const ind = data.findIndex(d => d.id === id);
                data.splice(ind, 1);
            }
            this.$emit('iconHandle', id, iconName);
        },
        // 回车回调
        enterHandle(item) {
            // 在这里左验证
            this.$emit('enter', item, this.editableData);
        },

        // 点击子项 - 单选
        clickChild(id, item) {
            if (this.showCheckbox) return;
            this.childId = id;
            this.$emit('change', id, item);
        },

        // 父级选中回调 - 多选
        parentCheckHandle(id, checked, item) {
            const iChildren = item.children;
            if (!iChildren || !iChildren.length) return;
            iChildren.forEach(d => {
                d.checked = checked;
            });
        },
        // 子集选中回调 - 多选
        childCheckHandle(v, obj) {
            const { editableData } = this,
                [ind, indChild] = obj.ind.split('-'), // 子父级索引
                iChildren = editableData[ind].children;
            editableData[ind].children[indChild].checked = v; // 设置子集数据
            const everyChecked = iChildren.every(d => d.checked === 'checked'), // 子集是否所有是选中
                someChecked = iChildren.some(d => d.checked === 'checked'); // 子集是否某项是选中
            if (everyChecked) editableData[ind].checked = 'checked';
            else if (someChecked) editableData[ind].checked = 'notNull';
            else editableData[ind].checked = 'uncheck';

            // 返回选中的id，若虚半选状态的id，可在下循环列表中添加
            const ids = [];
            editableData.forEach(d => {
                if (d.checked === 'checked') ids.push(d.id);
                const iChildren = d.children;
                if (iChildren && iChildren.length) {
                    iChildren.forEach(dc => {
                        if (dc.checked === 'checked') ids.push(dc.id);
                    });
                }
            });
            this.$emit('change', ids, editableData);
        }
    }
};
</script>

<style lang="stylus">

.p-editable-list
    width 100%
    font-size 0
.p-editable-list-item
    width 100%
.p-editable-child
    display inline-block
    width 100%
    overflow hidden
    transition height .3s
    .p-editable-child-list
        display flex
        align-items center
        padding-left 24px
        width 100%
        height 38px
        //line-height @height
        cursor pointer
        transition background-color .3s
        &:hover
            background-color $grey-200
        &.p-editable-child-list-active
            background-color $blue-100
            .p-editable-child-list-text
                color $blue-500
        .p-editable-child-list-dot
            margin-right 8px
            border-radius 4px
            width 8px
            height @width
        .p-editable-child-list-text
            padding-left 8px
            padding-right 8px
            max-width calc(100% - 92px)
            color $grey-900
            font-size 14px
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
        .p-editable-child-list-text-n
            max-width calc(100% - 64px)
        .p-editable-child-list-text-c
            max-width calc(100% - 92px)
        .p-editable-child-list-tag
            display inherit

</style>
