 <template>
    <span @click.stop  class="p-cascader-column" >
        <ul class="p-cascader-menu" v-if="!multiple" :style="menuWidth">
            <li :class="itemClass(item)"
                v-for="(item, index) in cascaderList"
                @mouseenter.stop="handleHoverItem(item,$event)"
                @mouseleave.stop="handleLeaveItem(item)"
                @click.stop="handleClickItem(item, index)"
                :key="index">
                <span :class="['p-cascader-item-text', item.forbidden&&'p-cascader-item-text-disabled' ]" :style="itemWidth" >{{item.title}}</span>
                <span style="transform: translate(0px, 4px);">
                    <i class="p-cascader-next-icon" v-if="item.children && item.children.length && !item.loading"><arrow style="width:16px;height:16px"></arrow></i>
                    <i class="p-cascader-item-loading" v-if="item.loading"><loading style="width:16px; height:16px;" /></i>
                </span>
            </li>
        </ul>
        <ul class="p-cascader-menu" v-if="multiple" :style="menuWidth" @click.stop>
            <li :class="itemClass(item)"
                v-for="(item, index) in cascaderList"
                :key="index"
                @mouseenter.stop="handleHoverItem(item)"
                @click.stop="handleClickItem(item)"
                @mouseleave.stop="handleLeaveItem(item)"
                >
                <Checkbox
                    v-if="type && type!=='final'"
                    :checked ="item.checked"
                    :data-id ="item.id"
                    :disabled="item.forbidden || item.disabled"
                    @change="handleCheckbox"
                    >
                </Checkbox>
                <Checkbox v-if="type && type=='final' && item.selectCheckbox"
                    :checked ="item.checked"
                    :disabled="item.forbidden || item.disabled"
                    :data-id ="item.id"
                    @change="handleCheckbox"
                >
                </Checkbox>
                <span :class="['p-cascader-item-text', item.forbidden&&'p-cascader-item-text-disabled' ]" :style="itemWidth"> {{item.title}} </span>
                <span style="transform: translate(0px, 4px);">
                    <i class="p-cascader-next-icon"
                          v-if="item.children && item.children.length && !item.loading"
                           @mouseenter.stop="handleHoverItem(item)"
                           @click.stop="handleClickItem(item)"
                           @mouseleave.stop="handleLeaveItem(item)"
                        >
                        <arrow style="width:16px;height:16px"></arrow>
                    </i>
                    <i class="p-cascader-item-loading" v-if="item.loading"><loading style="width:16px; height:16px;" /></i>
                </span>
            </li>
        </ul>
        <cascaPanel
            v-if="subListData.length"
            :change="change"
            :deepChange="deepChange"
            :checkWidth="checkWidth"
            :loadData="loadData"
            :multiple="multiple"
            :type="type"
            :width="width"
            :trigger="trigger"
            :all="all"
            :cascaderList="subListData">
        </cascaPanel>
    </span>
</template>

<script>
import loading from '../static/iconSvg/loading_grey.svg';
import Checkbox from '../Checkbox';
import arrow from '../static/iconSvg/arrow_right2.svg';
import handleRecursive from './handleRecursive.js';

export default {
    name: 'cascaPanel',
    components: { loading, arrow, Checkbox },
    mixins: [handleRecursive],
    inject: ['flatData'],
    props: {
        cascaderList: {
            type: Array,
            default: () => []
        },
        change: {
            type: Function,
            default: () => false
        },
        deepChange: {
            type: Function,
            default: () => false
        },
        checkWidth: {
            type: Function,
            default: () => false
        },
        loadData: {
            type: Function
        },
        type: {
            type: String
        },
        width: {
            type: [Number, String]
        },
        multiple: {
            type: Boolean
        },
        trigger: {
            validator(value) {
                return ['click', 'hover'].indexOf(value) > -1;
            },
            default: 'click'
        },
        all: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            subListData: [],
            activeKey: '',
            initKey: 1,
            currentHandleItem: null,
            timer: null
        };
    },
    watch: {

    },
    computed: {
        itemWidth() {
            let { width } = this;
            if (width < 180) width = 180;
            if (width > 600) width = 600;
            return { width: `${width - 56}px` };
        },
        menuWidth() {
            let { width } = this;
            if (width < 180) width = 180;
            if (width > 600) width = 600;
            return { width: `${width}px` };
        }
    },
    mounted() {
        this.$on('clear', () => {
            this.subListData = [];
        });
    },
    methods: {
        /**
         * 设置列表中每一条的class名称
         */
        itemClass(item) {
            return ['p-cascader-item', {
                'p-cascader-item-active': this.activeKey === item.id,
                'p-cascader-item-disabled': item.disabled
            }];
        },
        /**
         * 点击多选框  根据type参数的不同有以下4种不同的操作
         * normal: 常规 子父级联动 父级有半选状态
         * independent: 父级和子级都可以选择，且互不干
         * final:只有子级节点可以选择，此时的父级节不能选择
         * forbidden: 选择了父级，子级全部勾选，且不可操作
         *
         * @param  holder 此处没有意义 只是为了占位
         * @param selectedItem 当前所勾选的那一条数据
         */
        handleCheckbox(holder, selectedItem) {
            const item = this.flatData.find(option => option.id === selectedItem.id);
            if (item) {
                if (this.type === 'normal') {
                    this.handleNormal(item);
                }
                if (this.type === 'forbidden') {
                    this.handleForbidden(item);
                }
                if (this.type === 'independent') {
                    this.handleIndependent(item);
                }
                if (this.type === 'final') {
                    this.handleFinal(item);
                }
                // 如果数据来源是通过接口调用等异步方法获取的 则需要对这条数据的子元素设置后续业务需要的一些属性
                if (typeof this.loadData === 'function') {
                    if (item.children.length) {
                        this.setAttributeOfNode(item);
                    }
                }
                this.deepChange();
            }
        },
        /**
         * @description 处理type参数为final的情况  （只有子级节点可以选择，此时的父级节不能选择）
         * @param  item 当前所勾选的那一条数据
         */
        handleFinal(item) {
            if (item.checked === 'checked') {
                item.checked = 'uncheck';
            } else {
                item.checked = 'checked';
            }
        },
        /**
         * @description 处理type参数为independent的情况  （父级和子级都可以选择，且互不干）
         * @param item 当前所勾选的那一条数据
         */
        handleIndependent(item) {
            if (item.checked === 'checked') {
                item.checked = 'uncheck';
            } else {
                item.checked = 'checked';
            }
        },
        /**
         * @description 处理type参数为forbidden的情况  （选择了父级，子级全部勾选，且不可操作）
         * @param item 当前所勾选的那一条数据
         */
        handleForbidden(item) {
            if (item.checked === 'checked') {
                item.checked = 'uncheck';
                this.recursiveSetChecked(item, 'uncheck', false);
            } else {
                item.checked = 'checked';
                this.recursiveSetChecked(item, 'checked', true);
            }
        },
        /**
         * @description 处理type参数为normal的情况  （常规 子父级联动 父级有半选状态）
         * @param item 当前所勾选的那一条数据
         */
        handleNormal(item) {
            if (item.checked === 'checked') {
                item.checked = 'uncheck';
                this.recursiveSetChecked(item, 'uncheck');
                this.checkParentStatus(this, item);
            } else {
                item.checked = 'checked';
                this.recursiveSetChecked(item, 'checked');
                this.checkParentStatus(this, item);
            }
        },
        handleLeaveItem() {
            if (this.timer) {
                clearTimeout(this.timer);
            }
        },
        /**
         * @description 处理hover事件
         * @param item 当前所勾选的那一条数据
         */
        handleHoverItem(item) {
            if (this.trigger === 'hover') {
                if (item.children && item.children.length) {
                    this.activeKey = item.id;
                } else {
                    this.activeKey = '';
                }
            }
            if (this.trigger !== 'hover') return;
            this.expandNextPanel(item);
        },
        /**
         * @description 处理Click事件
         * @param item 当前所勾选的那一条数据
         */
        handleClickItem(item) {
            if (this.trigger === 'click') {
                if (item.children && item.children.length) {
                    this.activeKey = item.id;
                } else {
                    this.activeKey = '';
                }
            }
            if (this.trigger === 'hover' && !item.disabled) {
                this.change(item, true);
            }
            if (this.trigger !== 'click' && item.children && item.children.length) return;
            this.expandNextPanel(item);
        },
        /**
         * @description 展开下一级
         * @param  item 当前所勾选的那一条数据
         */
        expandNextPanel(item) {
            const vm = this;
            if (!this.multiple && !item.disabled && this.trigger === 'click') {
                if (this.loadData) {
                    if (item.last) {
                        this.change(item);
                    }
                } else {
                    this.change(item);
                }
            }
            this.clearData();
            if (typeof this.loadData === 'function') {
                this.timer = setTimeout(() => {
                    this.loadData(item, () => {
                        if (item.children) {
                            this.setAttributeOfNode(item);
                            this.subListData = item.children;
                        } else {
                            this.subListData = [];
                        }
                        this.timer = null;
                        this.$nextTick(() => {
                            this.checkWidth();
                        });
                    });
                }, 300);
            } else {
                if (item.children && item.children.length) {
                    this.subListData = item.children;
                } else {
                    this.subListData = [];
                }
                this.$nextTick(() => {
                    this.checkWidth();
                });
            }
        },
        /**
         * @description  如果数据来源是通过接口调用等异步方法获取的 对这条数据的子元素设置后续业务需要的一些属性
         * @param  item 当前所勾选的那一条数据
         */
        setAttributeOfNode(item) {
            item.children.forEach(option => {
                this.initKey++;
                this.$set(option, 'parentId', item.nodekey);
                this.$set(option, 'loading', false);
                this.$set(option, 'nodekey', `${item.nodekey}${Date.now()}`);
                if (!option.hasOwnProperty('id')) {
                    this.$set(option, 'id', `${item.nodekey}${Date.now()}${Math.random()}`);
                }
                this.$set(option, '_title', `${item.title}/${option.title}`);
                this.$set(option, '_ids', `${item.id}/${option.id}`);
                this.$set(option, 'last', true);
                if (this.multiple) {
                    this.$set(option, 'checked', 'uncheck');
                    if (this.type === 'forbidden') {
                        this.$set(option, 'forbidden', false);
                    }
                }
                this.flatData.push(option);
            });
        },
        /**
         * @description 对点击的数据向上递归检查并设置它的父节点勾选状态  在type参数为normal即子父级需要联动的情况下调用
         * @param  node 当前的Vue组件
         * @param  item 当前所勾选的那一条数据
         */
        checkParentStatus(node, item) {
            const vm = this;
            const selectedLen = node.cascaderList.filter(item => item.checked === 'checked').length;
            const uncheckLen = node.cascaderList.filter(item => item.checked === 'notNull').length;
            const allLen = node.cascaderList.length;
            const parent = vm.flatData.find(option => option.nodekey === item.parentId);
            if (parent) {
                if (selectedLen === allLen) {
                    parent.checked = 'checked'; // 全选
                }
                if (!selectedLen) {
                    parent.checked = 'uncheck'; // 全不选
                }
                if ((selectedLen && selectedLen < allLen) || uncheckLen) { // 不全选 不全不选
                    parent.checked = 'notNull';
                }
                if (node.$parent && node.$parent.$options.name === 'cascaPanel') {
                    this.checkParentStatus(node.$parent, parent);
                }
            }
        },
        /**
         * @description  清空数据
         */
        clearData() {
            if (this.$children) {
                this.findChldComponent(this.$children);
            }
        },
        /**
         * @description  从当前Vue组件向下递归查找指定组件并发送clear事件
         * @param   parent 当前的vue组件
         */
        findChldComponent(parent) {
            parent.forEach(comp => {
                if (comp.$options.name === 'cascaPanel') {
                    comp.activeKey = '';
                    comp.$emit('clear');
                    if (comp.$children) {
                        this.findChldComponent(comp.$children);
                    }
                }
            });
        }
    }
};
</script>
<style lang="stylus">
.p-cascader-column
    width 100%
    box-sizing border-box
    overflow auto
    .p-cascader-menu
        display: inline-block
        padding 8px 0
        min-width: 120px
        height 222px
        border-right: 1px solid $grey-200
        vertical-align: top
        overflow: auto
        font-size 0
        li.p-cascader-item
            display flex
            //justify-content space-between
            align-items center
            height 38px
            padding: 8px 12px
            box-sizing border-box
            color: $grey-900
            line-height: 22px
            font-size: 14px;
            white-space: nowrap;
            list-style: none;
            cursor: pointer
            text-align left
            transition: all .3s;
            .p-cascader-item-text
                white-space: nowrap
                overflow hidden
                text-overflow ellipsis
            .p-checkbox
                padding-right 4px
                padding-top 0
                height 24px
            .p-cascader-item-text-disabled
                color $grey-400
                cursor not-allowed
            &:hover
                background-color $hover-color-grey
        li.p-cascader-item-active
            color $blue-500
            background $blue-100
            i.p-cascader-item-loading
                pointer-events none
        li.p-cascader-item-disabled
            color $grey-400
            cursor not-allowed
            &:hover
                background: transparent

</style>
