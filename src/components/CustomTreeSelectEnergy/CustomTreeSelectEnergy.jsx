import './index.styl';

import CloseSvg from '../static/iconSvg/close.svg';
import SearchSvg from '../static/iconSvg/action/search.svg';
import ClearSvg from '../static/iconSvg/clear2.svg';
import PTree from '../PTree/PTree';
import SelectPanel from '../SelectPanel';
import MButton from '../MButton';
import SelectCheckbox from '../SelectCheckbox';
import { SetSearchData } from '../PTreeSelect/utils/utils';

export default {
    name: 'CustomTreeSelectEnergy',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        // 点击蒙层或者按esc关闭弹窗
        autoClose: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '标题'
        },
        placeholder: {
            type: String,
            default: '搜索'
        },
        // 是否返回半选状态的数据
        notNull: {
            type: Boolean,
            default: false
        },
        // 是否上下级联动
        linkage: {
            type: Boolean,
            default: false
        },
        // 只能选择最后一级
        lastStage: {
            type: Boolean,
            default: false
        },
        // 返回数据是否包含父级
        includeParent: {
            type: Boolean,
            default: true
        },
        // 可选面板是否拼接父级name
        jointParent: {
            type: Boolean,
            default: false
        },
        // 显示更多操作
        omit: {
            type: Boolean,
            default: false
        },
        value: {
            type: Array,
            default: () => []
        },
        data: {
            type: Array,
            default: () => []
        },
        // 按照树形结构排序选中的数据
        sortByTree: {
            type: Boolean,
            default: false
        },
        // 点击确定按钮是否保存选中的数据在已选面板
        selectedSave: {
            type: Boolean,
            default: true
        },
        // 更多按钮
        moreBtn: {
            type: Object,
            default: () => ({
                open: false,
                weight: false, // 权重
                disabled: false,
                selectedSave: false,
                text: '添加至分组',
                event: 'moreBtnClick'
            })
        },
        // 只能搜索最后一级
        onlySearchLastLevel: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            tileData: [], // 平铺的数据
            item: {},
            itemHistory: {},
            checkedIds: [], // 选中的数据
            checkedIdsHistory: [], // 选中的数据
            checkedData: [], // 选中的数据
            checkedDataHistory: [], // 选中的数据
            panelWidth: 0, // 已选择的宽度
            panelHeight: 0, // 已选择的高度
            confirmDisable: true, // 确定按钮禁用
            inputText: '', // 输入的值
            inputStatus: '', // 输入状态
            searchData: [] // 搜索的数据
        };
    },
    computed: {
        // 确定按钮禁用
        moreDisable() {
            const { checkedData } = this;
            return !(checkedData && checkedData.length);
        }
    },
    watch: {
        // 监听显示状态
        show(n, o) {
            if (n === o) return;
            if (n) {
                this.$nextTick(() => {
                    this.getPanelWidth();
                });
            } else {
                this.confirmDisable = true;
                setTimeout(this.inputClear, 300);
            }
        },
        // 监听输入的值
        inputText(n, o) {
            if (n === o) return;
            if (this.timer) clearTimeout(this.timer);
            if (n) {
                this.timer = setTimeout(() => {
                    const { tileData } = this;
                    this.searchData = SetSearchData(n, tileData, true);
                }, 300);
            } else {
                this.searchData = [];
            }
        },
        value: {
            handler(n, o) {
                if (String(n) === String(o)) return;
                this.checkedIds = n;
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {
        this.getPanelWidth();
        window.addEventListener('resize', this.getPanelWidth, false);
        if (this.autoClose) window.addEventListener('keyup', this.autoCloseKeyup, false);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.getPanelWidth);
        if (this.autoClose) window.removeEventListener('keyup', this.autoCloseKeyup);
    },
    methods: {
        // 获取面板宽度
        getPanelWidth() {
            const { $refs: { selectContent } } = this;
            if (!selectContent) return;
            const { clientWidth, clientHeight } = selectContent;
            this.panelWidth = clientWidth;
            this.panelHeight = clientHeight;
            selectContent.style.marginLeft = `${-clientWidth / 2}px`;
            selectContent.style.marginTop = `${-clientHeight / 2}px`;
        },
        // 输入回调
        inputHandle(e) {
            const { data, target: { value } } = e;
            this.inputStatus = data || value;
            this.inputText = value;
        },
        // 清除input
        inputClear() {
            this.inputStatus = '';
            this.inputText = '';
            if (!this.selectedSave) this.clear();
        },
        // 搜索面板数据改变
        selectCheckboxChange(selectedData, unselectData) {
            const { $refs: { pTree } } = this,
                { id: sid = null } = selectedData,
                { id: uid = null } = unselectData;
            if (!pTree) return;
            const id = sid || uid,
                { tileList = [], changeTileList } = pTree,
                item = tileList.find(d => d.id === id);
            changeTileList(item, true);
            setTimeout(() => {
                if (this.inputText) this.searchData = SetSearchData(this.inputText, this.tileData, true);
            });
        },
        // 获取平铺数据
        changeTileData(tileData, flag) {
            this.tileData = tileData;
            if (!flag) return;
            // 设置已选面板数据
            const { $refs: { pTree }, selectedSave } = this;
            if (pTree && selectedSave) {
                const { checkedData } = pTree;
                this.checkedData = checkedData;
                const his = JSON.parse(JSON.stringify(checkedData));
                this.checkedIdsHistory = his.map(d => d.id);
                this.checkedDataHistory = his;
            } else {
                this.checkedData = [];
                this.checkedIdsHistory = [];
                this.checkedDataHistory = [];
            }
        },
        // Tree change回调
        treeChange({ item, checkedIds, checkedData }) {
            this.item = item;
            this.checkedIds = checkedIds;
            this.checkedData = checkedData;
            this.confirmDisable = JSON.stringify(checkedIds) === JSON.stringify(this.checkedIdsHistory);
        },
        // 已选面板单个清除
        panelClearItem(item) {
            const { $refs: { pTree }, searchData } = this;
            if (searchData && searchData.length) {
                this.searchData = searchData.map(d => {
                    if (d.id === item.id) d.checked = 'uncheck';
                    return d;
                });
            }
            if (pTree) pTree.changeTileList(item, true);
            setTimeout(() => {
                if (this.inputText) this.searchData = SetSearchData(this.inputText, this.tileData, true);
            });
        },
        // reset表示是否清除数据
        close() {
            this.$emit('update:show', false);
            if (!this.confirmDisable) this.resetData();
        },
        // 清空
        clear() {
            const {
                $refs: { pTree }, searchData, checkedIdsHistory
            } = this;
            if (pTree) pTree.setTileListStatus('uncheck');
            if (searchData && searchData.length) {
                this.searchData = searchData.map(d => {
                    d.checked = 'uncheck';
                    return d;
                });
            }
            this.item = {};
            this.checkedIds = [];
            this.checkedData = [];
            this.confirmDisable = String(checkedIdsHistory) === '';
        },
        resetData() {
            setTimeout(() => {
                const {
                    itemHistory, checkedIdsHistory, checkedDataHistory, $refs: { pTree }
                } = this;
                this.item = JSON.parse(JSON.stringify(itemHistory));
                this.checkedIds = JSON.parse(JSON.stringify(checkedIdsHistory));
                this.checkedData = JSON.parse(JSON.stringify(checkedDataHistory));
                if (!pTree) return;
                pTree.resetTileList('recoverHistory');
                this.confirmDisable = true;
            }, 300);
        },
        // 取消
        cancel() {
            this.close();
            setTimeout(() => {
                const { $refs: { pTree }, checkedIdsHistory, checkedDataHistory } = this;
                if (pTree) {
                    pTree.resetTileList('recoverHistory');
                    pTree.checkedData = JSON.parse(JSON.stringify(checkedDataHistory));
                }
                this.checkedIds = JSON.parse(JSON.stringify(checkedIdsHistory));
                this.checkedData = JSON.parse(JSON.stringify(checkedDataHistory));
            }, 300);
        },
        // 提交数据
        emitData(cusEvent) {
            const {
                item, checkedIds, checkedData, selectedSave, moreBtn: { selectedSave: moreSelectedSave }
            } = this;
            let status = false;
            if (cusEvent === 'change') status = selectedSave;
            else status = moreSelectedSave;

            if (status) {
                this.itemHistory = JSON.parse(JSON.stringify(item));
                this.checkedIdsHistory = JSON.parse(JSON.stringify(checkedIds));
                this.checkedDataHistory = JSON.parse(JSON.stringify(checkedData));
            } else {
                if (cusEvent === 'change') {
                    this.checkedData = [];
                    this.checkedIdsHistory = [];
                    this.checkedDataHistory = [];
                }
            }
            this.$emit(cusEvent, { item, checkedIds, checkedData });
        },
        // 确定
        confirm() {
            if (this.confirmDisable) return;
            this.$emit('update:show', false);
            setTimeout(() => {
                this.confirmDisable = true;
                // this.$emit('update:value', this.checkedIds);
                this.emitData('change');
                const { $refs: { pTree }, selectedSave } = this;
                if (!pTree) return;
                if (selectedSave) pTree.resetTileList('setHistory');
                else pTree.setTileListStatus('uncheck');
                this.inputText = '';
                this.inputStatus = '';
            }, 300);
        },
        // 添加至分组
        moreBtnClick() {
            const { moreBtn: { weight, event } } = this;
            // 开启权重不会提交数据
            if (weight) {
                this.$emit(event);
            }
            if (this.moreDisable) return;
            this.emitData(event);
            setTimeout(() => {
                this.inputText = '';
                this.inputStatus = '';
            }, 300);
        },
        // 按esc关闭弹窗
        autoCloseKeyup(e) {
            if (!this.show || e.keyCode !== 27) return;
            this.autoCloseHandle();
        },
        // 关闭弹窗
        autoCloseHandle() {
            const { autoClose } = this;
            if (!autoClose) return;
            this.close();
        }
    },
    render(h) {
        const {
            show,
            title, placeholder, notNull, linkage, lastStage, includeParent, jointParent, omit, sortByTree, selectedSave, moreBtn,
            panelWidth,
            moreDisable,
            confirmDisable,
            inputText,
            inputStatus,
            value,
            data,
            checkedData,
            inputHandle,
            inputClear,
            changeTileData,
            treeChange, panelClearItem,
            close,
            clear,
            cancel, confirm,
            moreBtnClick,
            searchData,
            selectCheckboxChange,
            autoCloseHandle
        } = this;
        return (
            <div class="custom-tree-select-energy">
                <transition name="opacityInUiOut">
                    <div vShow={show} class="custom-tree-select-shadow" onClick={autoCloseHandle} />
                </transition>
                <transition name="bounceInUiOut">
                    <div vShow={show}
                        class="custom-tree-select-content"
                        ref="selectContent"
                    >
                        <div class="custom-tree-select-head">
                            <span class="custom-tree-select-title">{title}</span>
                            <span class="custom-tree-select-close" onClick={close}><CloseSvg/></span>
                        </div>
                        <div class="custom-tree-select-body">
                            <div class="custom-tree-select-body-child custom-tree-select-tree">
                                <section class="custom-tree-select-child-top">
                                    <article class="custom-tree-select-search">
                                        <span class="custom-tree-select-svg"><SearchSvg/></span>
                                        <input class="custom-tree-select-input" type="text" value={inputText} onInput={inputHandle}/>
                                        {inputText && <span class="custom-tree-select-input-clear" onClick={inputClear}><ClearSvg/></span>}
                                        {!inputStatus && <span class="custom-tree-select-placeholder">{placeholder}</span>}
                                    </article>
                                </section>
                                <div class="custom-tree-select-com">
                                    {
                                        (inputText || inputStatus) && (
                                            searchData.length
                                                ? (
                                                    <SelectCheckbox
                                                        width={panelWidth / 2 - 24}
                                                        data={searchData}
                                                        onChange={selectCheckboxChange}
                                                    />
                                                )
                                                : <div class="custom-tree-select-none">没有找到任何内容</div>
                                        )
                                    }
                                    <PTree
                                        ref="pTree"
                                        vShow={(!inputText && !inputStatus)}
                                        multiple={true}
                                        notNull={notNull}
                                        linkage={linkage}
                                        lastStage={lastStage}
                                        includeParent={includeParent}
                                        jointParent={jointParent}
                                        omit={omit}
                                        sortByTree={sortByTree}
                                        value={selectedSave ? value : ''}
                                        data={data}
                                        onChange={treeChange}
                                        onChangeTileData={changeTileData}
                                    />
                                </div>
                            </div>
                            <div class="custom-tree-select-body-child custom-tree-select-panel">
                                <section class="custom-tree-select-child-top">
                                    <article class="custom-tree-select-choose"
                                    >已选<span class="custom-choose-count"
                                        >{checkedData && checkedData.length}</span></article>
                                    <article class={
                                        [
                                            'custom-tree-select-clear',
                                            checkedData && checkedData.length ? 'custom-tree-select-clear-active' : 'custom-tree-select-clear-disabled'
                                        ]
                                    }
                                    onClick={clear}
                                    >清空
                                    </article>
                                </section>
                                <div class="custom-tree-select-panel-list">
                                    <SelectPanel
                                        ellipsis="start"
                                        width={panelWidth / 2 - 13}
                                        omit={omit}
                                        jointParent={jointParent}
                                        data={checkedData}
                                        onClearItem={panelClearItem}
                                    />
                                </div>
                                <div class={[
                                    'custom-tree-select-panel-handle',
                                    (checkedData && checkedData.length >= 10) && 'custom-tree-select-panel-handle-shadow'
                                ]}>
                                    <MButton type="word" size="word" onClick={cancel}>取消</MButton>
                                    {moreBtn.open && <MButton type="default"
                                        disabled={moreBtn.weight ? moreBtn.disabled : moreDisable}
                                        onClick={moreBtnClick}
                                    >{moreBtn.text}</MButton>}
                                    <MButton type="blue" disabled={confirmDisable} onClick={confirm}>确定</MButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        );
    }
};
