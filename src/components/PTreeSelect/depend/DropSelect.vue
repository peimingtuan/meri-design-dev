<template>
    <transition :name="position?'selectDownUpExtend':'selectDownUpExtendTop'">
        <div v-show="dropShow"
             class="per-drop-select"
             :style="{width: `${width}px`, height: `${height}px`}"
        >
            <div :class="[
                    'per-drop-tree',
                    (multiple && !panel)?'per-drop-tree-h-48':'per-drop-tree-h-100',
                     (multiple && panel)?'per-drop-tree-w-50':'per-drop-tree-w-100'
                ]"
            >
                <label v-if="dropSearch" class="per-drop-tree-search">
                    <i class="per-drop-tree-search-svg"><SearchSvg /></i>
                    <input type="text"
                           class="per-drop-tree-input"
                           v-model="dropSearchText"
                           @input="dropInput"
                    >
                    <span class="per-drop-tree-placeholder" v-show="!dropInputStatus">{{ dropPlaceholder }}</span>
                    <i class="per-drop-tree-del" v-if="dropSearchText" @click.prevent="clearDropInput"><DeleteIcon /></i>
                </label>
                <div :class="['per-drop-tree-content', dropSearch ? 'per-drop-tree-content-h-100-48' : 'per-drop-tree-content-h-100']">
                    <!-- 搜索的列表 -->
                    <SelectCheckbox
                        v-if="(inputText || dropSearchText) && searchData.length && multiple"
                        :width="(panel ? Math.ceil(width/2) : width) - 2"
                        :childDisable="childDisable"
                        :data.sync="searchData"
                        @change="selectCheckboxChange"
                    />
                    <SelectOption
                        v-if="(inputText || dropSearchText) && searchData.length && !multiple"
                        :selectedId="value"
                        :data="searchData"
                        @click="optionClick"
                    />
                    <div v-if="(inputText || dropSearchText) && !searchData.length" class="per-drop-tree-not-found">没有找到任何内容</div>

                    <!-- 树形结构列表 -->
                    <PTree
                        v-show="(!inputText && !dropSearchText) && data.length"
                        ref="pTree"
                        :value="value"
                        :data="data"
                        :multiple="multiple"
                        :allCheckboxShow="allCheckboxShow"
                        :notNull="notNull"
                        :linkage="linkage"
                        :lastStage="lastStage"
                        :childDisable="childDisable"
                        :includeParent="includeParent"
                        :sameParams="sameParams"
                        :render="render"
                        :sortByTree="sortByTree"
                        :jointParent="jointParent"
                        @change="change"
                        @openNode="openNode"
                        @treeShowHandle="treeShowHandle"
                        @changeTileData="changeTileData"
                    />
                    <div v-if="(!inputText || !dropSearchText) && !data.length" class="per-drop-tree-not-found">暂无数据</div>
                </div>
                <div  v-if="multiple && !panel"
                      :class="['per-drop-handle', treeShowCount>=8&&'per-drop-handle-shadow']"
                >
                    <section class="per-drop-text per-drop-handle-cancel" @click="cancel">取消</section>
                    <section :class="[
                                'per-drop-text',
                                activeConfirm?'per-drop-handle-active':'per-drop-handle-disabled'
                             ]"
                             @click="confirm"
                    >确定</section>
                </div>
            </div>
            <div class="per-drop-panel" v-if="multiple && panel">
                <div class="per-drop-panel-top">
                    <section class="per-drop-panel-choice"
                    >已选<span class="per-drop-selected-count" v-if="panelData && panelData.length">{{panelData.length}}</span></section>
                    <section :class="['per-drop-text', clearAllStatus?'per-drop-handle-active':'per-drop-handle-disabled']"
                             @click="clearAll"
                    >清空</section>
                </div>
                <div class="per-drop-panel-list">
                    <SelectPanel
                        ellipsis="start"
                        :width="Math.ceil(width/2) - 2"
                        :jointParent="jointParent"
                        :data="panelData"
                        @clearItem="panelClearItem"
                    />
                </div>
                <div :class="['per-drop-handle', panelData.length>6&&'per-drop-handle-shadow']">
                    <section class="per-drop-text per-drop-handle-cancel" @click="cancel">取消</section>
                    <section :class="[
                                'per-drop-text',
                                activeConfirm?'per-drop-handle-active':'per-drop-handle-disabled'
                             ]"
                             @click="confirm"
                    >确定</section>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import PTree from '../../PTree';
import SelectOption from '../../SelectOption/SelectOption';
import SelectCheckbox from '../../SelectCheckbox';
import SelectPanel from '../../SelectPanel';
import SearchSvg from '../../static/iconSvg/search.svg';
import DeleteIcon from '../../static/iconSvg/delete_icon.svg';
import { SetPanelData, SetSearchData } from '../utils/utils';

export default {
    name: 'DropSelect',
    components: {
        PTree,
        SelectOption,
        SelectCheckbox,
        SelectPanel,
        SearchSvg,
        DeleteIcon
    },
    props: {
        // 绑定的id
        value: {
            type: [String, Number, Array],
            default: ''
        },
        // 占位符
        dropPlaceholder: {
            type: String,
            default: '请输入搜索内容'
        },
        // 树形数据
        data: {
            type: Array,
            default: () => []
        },
        // 宽
        width: {
            type: [String, Number],
            default: 280
        },
        // 高
        height: {
            type: [String, Number],
            default: 360
        },
        // 多选
        multiple: {
            type: Boolean,
            default: false
        },
        // 所有checkbox是否显示
        allCheckboxShow: {
            type: Boolean,
            default: true
        },
        // 是否返回半选
        notNull: {
            type: Boolean,
            default: false
        },
        // 是否上下级联动
        linkage: {
            type: Boolean,
            default: true
        },
        // 只能选择末级
        lastStage: {
            type: Boolean,
            default: false
        },
        // 父级选中子级禁用，子级选中不影响父级 (当此值为true时，returnParentNode为false不生效)
        childDisable: {
            type: Boolean,
            default: false
        },
        // 是否返回父对象数据
        includeParent: {
            type: Boolean,
            default: true
        },
        // 自定义渲染内容
        render: {
            type: String,
            default: ''
        },
        // 显示 - 可选面板
        panel: {
            type: Boolean,
            default: false
        },
        // 动画执行方向
        position: {
            type: Boolean,
            default: true
        },
        // 动画执行方向
        dropShow: {
            type: Boolean,
            default: false
        },
        // 选中的项
        selectedData: {
            type: [Array, Object],
            default: () => ({})
        },
        // 搜索 输入的值
        inputText: {
            type: String,
            default: ''
        },
        // 开启搜索 - 默认可搜索
        dropSearch: {
            type: Boolean,
            default: false
        },
        // 是否存在相同的参数
        sameParams: {
            type: Boolean,
            default: false
        },
        // 按照树形结构排序选中的数据
        sortByTree: {
            type: Boolean,
            default: false
        },
        // 可选面板是否拼接父级name
        jointParent: {
            type: Boolean,
            default: false
        },
        // 只能搜索最后一级
        onlySearchLastLevel: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            // 平铺数据列表
            tile: [],
            // 搜索数据
            searchData: [],
            // 已选面板数据
            panelData: [],
            panelDataHistory: [],
            // 树形列表显示的个数
            treeShowCount: 0,
            // 激活确定按钮
            activeConfirm: false,
            // 多选 - 选择的数据
            currentObj: {},
            // 下拉框搜索输入的值
            dropSearchText: '',
            // 下拉框搜索输入状态
            dropInputStatus: ''
        };
    },
    computed: {
        // 清空状态
        clearAllStatus() {
            const { panelData } = this;
            return panelData.length && JSON.stringify(panelData).length > 4 && panelData.some(d => !d.disabled);
        }
    },
    watch: {
        // 监听下拉列表显示
        dropShow(n, o) {
            if (n === o) return;
            if (n) {
                this.$nextTick(() => {
                    this.$emit('setDropStatus', true);
                });
            } else {
                setTimeout(() => { this.clearDropInput(); }, 300);
            }
        },
        // 监听输入的值改变
        inputText(n, o = '') {
            const {
                dropSearch, multiple, tile, onlySearchLastLevel
            } = this;
            if (dropSearch || n === o) return;
            this.searchData = SetSearchData(n, tile, multiple, onlySearchLastLevel);
        },
        // 监听下拉弹窗输入的值改变
        dropSearchText(n, o = '') {
            const {
                dropSearch, multiple, tile, onlySearchLastLevel
            } = this;
            if (!dropSearch || n === o) return;
            this.searchData = SetSearchData(n, tile, multiple, onlySearchLastLevel);
        }
    },
    methods: {
        // input输入
        dropInput(e) {
            const { data, target: { value } } = e;
            this.dropInputStatus = data || value;
        },
        // 清除按钮
        clearDropInput() {
            this.dropInputStatus = null;
            this.dropSearchText = '';
        },
        // 选择数据改变 status=true表示需要向父级提交数据并带确定操作
        async change(obj, status = false) {
            const {
                multiple,
                panel,
                selectedData
            } = this;
            if (multiple) {
                const { checkedData } = obj;
                const his = selectedData.map(d => ({ id: d.id, name: d.name })),
                    cur = checkedData.map(d => ({ id: d.id, name: d.name }));
                this.activeConfirm = !status && (JSON.stringify(his) !== JSON.stringify(cur));
                this.currentObj = obj;
                if (panel) {
                    const panelData = SetPanelData(checkedData.map(d => d.id), this.tile);
                    // const panelData = checkedData;
                    this.panelData = panelData;
                    if (status) this.panelDataHistory = JSON.parse(JSON.stringify(panelData));
                }
                if (status) this.$emit('change', obj);
            } else {
                // 单选
                this.$emit('change', obj);
            }
        },
        // 展开回调
        openNode(item) {
            this.$emit('openNode', item);
        },
        // 获取 树形列表显示的个数
        treeShowHandle(num) {
            this.treeShowCount = num;
        },
        // 初始化获取平铺数据列表
        changeTileData(tile, flag) {
            this.tile = tile;
            if (!flag) return;
            const { panel, selectedData } = this;
            if (panel) {
                // 设置已选面板数据
                if (selectedData instanceof Array) {
                    const selectedIds = selectedData.map(d => d.id); // 选中的id
                    const panelData = SetPanelData(selectedIds, tile);
                    this.panelData = panelData;
                    this.panelDataHistory = JSON.parse(JSON.stringify(panelData));
                }
            }
        },
        // 单选搜索 列表
        optionClick(id) {
            const { $refs: { pTree } } = this;
            if (!pTree) return;
            const { tileList = [], changeTileList } = pTree;
            const item = tileList.find(d => d.id === id);
            changeTileList(item);
            this.$emit('setDropStatus', false);
        },
        // 多选搜索 列表
        selectCheckboxChange(selectedData, unselectData) {
            const {
                    $refs: { pTree },
                    childDisable,
                    inputText,
                    dropSearch,
                    dropSearchText,
                    multiple,
                    onlySearchLastLevel
                } = this,
                { id: sid = null } = selectedData,
                { id: uid = null } = unselectData;
            if (!pTree) return;
            const id = sid || uid,
                { tileList = [], changeTileList } = pTree,
                item = tileList.find(d => d.id === id);
            changeTileList(item);
            if (childDisable) {
                let text = '';
                if (dropSearch && dropSearchText) text = dropSearchText;
                if (!dropSearch && inputText) text = inputText;
                if (text) this.searchData = SetSearchData(text, tileList, multiple, onlySearchLastLevel);
            }
        },
        // 已选面板 清空
        clearAll() {
            const {
                clearAllStatus, $refs: { pTree }, panel, childDisable,
                selectedData,
                searchData
            } = this;
            if ((panel && !clearAllStatus) || !pTree) return;
            pTree.setTileListStatus('uncheck');
            let currentObj, his, cur;
            if (childDisable) {
                const { tile } = this,
                    checkedData = tile.filter(d => (d.checked === 'checked' && d.defaultDisabled)),
                    checkedIds = checkedData.map(d => d.id);
                currentObj = { item: {}, checkedIds, checkedData };
                if (panel) this.panelData = SetPanelData(checkedIds, tile);
                his = selectedData.map(d => ({ id: d.id, name: d.name }));
                cur = checkedData.map(d => ({ id: d.id, name: d.name }));
            } else {
                if (panel) this.panelData = [];
                currentObj = { item: {}, checkedIds: [], checkedData: [] };
                his = selectedData.map(d => ({ id: d.id, name: d.name }));
                cur = [];
            }
            this.activeConfirm = JSON.stringify(his) !== JSON.stringify(cur);
            this.currentObj = currentObj;
            if (JSON.stringify(searchData).length > 4) {
                this.searchData = searchData.map(d => {
                    if (!d.disabled) d.checked = 'uncheck';
                    return d;
                });
            }
        },
        // 已选面板 删除一项 status=true表示需要向父级提交数据并带确定操作
        panelClearItem(item, status) {
            const { $refs: { pTree }, searchData } = this;
            if (JSON.stringify(searchData).length > 4) {
                this.searchData = searchData.map(d => {
                    if (d.id === item.id) d.checked = 'uncheck';
                    return d;
                });
            }
            if (!pTree) return;
            pTree.changeTileList(item, status);
        },

        // 取消
        cancel() {
            this.$emit('setDropStatus', false);
            setTimeout(() => {
                const {
                    panel, activeConfirm, $refs: { pTree }, panelDataHistory
                } = this;
                if (!pTree) return;
                if (activeConfirm) {
                    pTree.resetTileList('recoverHistory');
                    pTree.checkedData = JSON.parse(JSON.stringify(panelDataHistory));
                    if (panel) this.panelData = JSON.parse(JSON.stringify(panelDataHistory));
                }
                this.activeConfirm = false;
            }, 300);
        },
        // 确定
        confirm() {
            if (!this.activeConfirm) return;
            this.$emit('setDropStatus', false);
            this.$emit('change', this.currentObj);
            setTimeout(() => { this.clearDropInput(); }, 300);
            this.activeConfirm = false;
            this.panelDataHistory = JSON.parse(JSON.stringify(this.panelData));
            const { $refs: { pTree } } = this;
            if (!pTree) return;
            pTree.resetTileList('setHistory');
        }
    }
};
</script>

<style lang="stylus">
@import "../../static/stylus/animate/selectDownUpExtend.styl"

.per-drop-select
    position absolute
    z-index 7000
    display inline-flex
    align-items flex-start
    outline none
    background-color $theme
    border 1px solid $grey-300
    border-radius 4px
    box-shadow $box-shadow-bottom
    overflow hidden
    transition all .3s
.per-drop-tree
    flex auto
.per-drop-tree-h-100
    height 100%
.per-drop-tree-h-48
    height calc(100% - 48px)
.per-drop-tree-w-100
    width 100%
.per-drop-tree-w-50
    width 50%
.per-drop-tree-search
    position relative
    display block
    padding 8px 16px
    width 100%
    height 48px
    .per-drop-tree-search-svg
        position absolute
        left 17px
        top 9px
        width 30px
        height 30px
        line-height @height
        text-align center
        font-size 0
        svg
            vertical-align middle
            width 16px
            height 16px
    .per-drop-tree-input
        position relative
        z-index 2
        outline none
        padding-left 30px
        padding-right @padding-left
        background none
        border 1px solid $grey-400
        border-radius 4px
        width 100%
        height 32px
        font-size 14px
        color $grey-900
    .per-drop-tree-placeholder
        position absolute
        left 0
        top 8px
        display block
        padding-left 48px
        padding-right @padding-left
        width 100%
        height 32px
        line-height @height
        font-size 14px
        color $grey-400
    .per-drop-tree-del
        position absolute
        right 17px
        top 9px
        z-index 3
        padding-top 7px
        width 30px
        height @width
        text-align center
        font-size 0
        cursor pointer
        svg
            width 16px
            height @width
            path
                transition fill .3s
            &:hover
                path
                    fill $blue-500
.per-drop-tree-content
    padding-top 8px
    padding-bottom 8px
    width 100%
    overflow-x hidden
    overflow-y auto
    content-visibility auto
.per-drop-tree-content-h-100
    height 100%
.per-drop-tree-content-h-100-48
    height calc(100% - 48px)
.per-drop-tree-not-found
    padding-left 12px
    line-height 38px
    color $grey-400
    font-size 14px
.per-drop-panel
    border-left 1px solid $grey-300
    width 50%
    height 100%
.per-drop-panel-choice
    font-size 14px
.per-drop-selected-count
    padding-left 8px
    color $grey-900
.per-drop-text
    font-size 14px
    cursor pointer
    transition color .3s
.per-drop-panel-choice
    color $grey-500
.per-drop-handle-cancel
    color $grey-900
.per-drop-handle-cancel
    margin-right 16px
.per-drop-handle-active
    color $blue-500
    &:hover
        color $blue-400
    &:active
        color $blue-600
.per-drop-handle-shadow
    box-shadow $box-shadow-top
.per-drop-handle-disabled
    color $grey-400
    cursor not-allowed
.per-drop-panel-top
    display flex
    justify-content space-between
    align-items center
    padding-left 12px
    padding-right 12px
    border-bottom 1px solid $grey-300
    width 100%
    height 48px
.per-drop-handle
    display flex
    justify-content flex-end
    align-items center
    background-color $theme
    padding-left 12px
    padding-right 12px
    width 100%
    height 48px
.per-drop-panel-list
    padding-top 8px
    width 100%
    height 262px
    overflow-x hidden
    overflow-y auto

// 搜索高亮
.per-drop-tree-highlight
    color $blue-500

</style>
