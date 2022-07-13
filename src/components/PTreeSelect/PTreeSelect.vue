<template>
    <div class="per-tree-select"
         @mouseenter="treeSelectEnter"
         @mouseleave="treeSelectLeave"
        >
        <DropTrigger
            :width="triggerWidth"
            :type="type"
            :placeholder="placeholder"
            :caption="caption"
            :disabled="disabled"
            :clearHide="clearHide"
            :openSearch="openSearch"
            :dropSearch="dropSearch"
            :multiple="multiple"
            :dropShow="dropShow"
            :selectedData="selectedData"
            :errorText="errorText"
            :errorShow="errorShow"
            @click="openDropSelect"
            @delHandle="delHandle"
            @getInputText="getInputText"
            @clearItem="clearItem"
        />
    </div>
</template>

<script>
import DropTrigger from '../DropTrigger/DropTrigger';
import { SetInitData } from './utils/utils';
import DropSelect from './depend/DropSelect';
import ClickOutside from '../static/utils/ClickOutside';
import DeWeight from '../static/utils/DeWeight';

export default {
    name: 'PTreeSelect',
    components: { DropTrigger },
    props: {
        // 触发器宽
        triggerWidth: {
            type: [String, Number],
            default: 180
        },
        // 触发器类型
        type: {
            type: String,
            default: 'normal' // normal tag
        },
        // 下拉选择盒子宽
        dropWidth: {
            type: [String, Number],
            default: 280
        },
        // 占位符
        placeholder: {
            type: String,
            default: '请选择'
        },
        // 下拉弹出安 - 占位符
        dropPlaceholder: {
            type: String,
            default: '请选择'
        },
        // 标题
        caption: {
            type: String,
            default: ''
        },
        // 开启搜索 - 默认可搜索
        openSearch: {
            type: Boolean,
            default: true
        },
        // 开启搜索 - 默认可搜索
        dropSearch: {
            type: Boolean,
            default: false
        },
        // 多选
        multiple: {
            type: Boolean,
            default: false
        },
        disabled: {
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
        // hover到触发器上是否显示清除按钮
        clearHide: {
            type: Boolean,
            default: false
        },
        // 自定义渲染内容
        render: {
            type: String,
            default: ''
        },
        // 绑定的id
        value: {
            type: [String, Number, Array],
            default: ''
        },
        // tree数据
        data: {
            type: Array,
            default: () => []
        },
        // 显示 - 可选面板
        panel: {
            type: Boolean,
            default: false
        },
        // 设置父标签出现滚动条的id
        transfer: {
            type: String,
            default: ''
        },
        // 是否存在相同的参数
        sameParams: {
            type: Boolean,
            default: false
        },
        // 错误信息提示
        errorText: {
            type: String,
            default: ''
        },
        // 错误信息显示状态
        errorShow: {
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
            default: true
        },
        // 只能搜索最后一级
        onlySearchLastLevel: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            // 激活关闭下拉弹窗
            activeClose: false,
            // 选中的id/ids
            dropSelectValue: '',
            // 输入的值 - 双向绑定
            inputText: '',
            // 选中的项
            selectedData: [],
            // 下拉列表显示状态
            dropShow: false,
            // 滚动条距离顶部的位置
            scrollTop: 0
        };
    },
    watch: {
        data: {
            handler(n) {
                if (n && n instanceof Array && JSON.stringify(n).length > 4) this.setInitData(this.value, n);
                if (this.dropSelect) this.dropSelect.data = n;
            },
            deep: true,
            immediate: true
        },
        value: {
            handler(n) {
                const { data } = this;
                this.dropSelectValue = n;
                if (data && data instanceof Array && JSON.stringify(data).length > 4) this.setInitData(n, data);
                if (this.dropSelect) this.dropSelect.value = n;
            },
            deep: true
        },
        // 监听下拉列表显示
        dropShow(n, o) {
            if (n === o) return;
            if (n) this.addWindowEvent();
            else this.remWindowEvent();
        }
    },
    mounted() {
        this.dropSelectValue = this.value;
    },
    methods: {
        // 监听鼠标移入
        treeSelectEnter() {
            this.activeClose = true;
        },
        // 监听鼠标移除
        treeSelectLeave() {
            this.activeClose = false;
        },
        // 获取输入的值
        getInputText(str) {
            if (this.dropSelect) this.dropSelect.inputText = str;
        },
        // 初始化设置选中的数据
        async setInitData(value, data) {
            const { multiple, sameParams } = this,
                typeofValue = typeof value;
            if ((typeofValue === 'string' && !value) || (typeofValue === 'object' && !value.length)) return;
            let selectedArr = [];
            const arr = await SetInitData(this, multiple, value, data);
            if (multiple && sameParams) {
                // 查找相同的id
                const objSameIds = arr.filter(d => d.sameId);
                if (objSameIds && objSameIds.length > 1) {
                    const objArr = DeWeight(objSameIds, 'sameId', true),
                        ids = objArr.map(d => d.id);
                    selectedArr = arr.filter(d => {
                        if (!d.sameId || (d.sameId && ids.includes(d.id))) return d;
                        return null;
                    });
                } else {
                    selectedArr = arr;
                }
            } else {
                selectedArr = arr;
            }
            this.selectedData = selectedArr;
            if (this.dropSelect) this.dropSelect.selectedData = selectedArr;
        },
        // 监听滚轮事件
        wheelListener() {
            const { dropSelect, dropShow } = this;
            if (!dropSelect || !dropShow) return;
            if (this.wheelTimer) clearTimeout(this.wheelTimer);
            this.wheelTimer = setTimeout(() => {
                DropSelect.resetPosition(this.dropSelect);
            }, 360);
        },
        // 点击下拉弹窗意外区域
        clickOutSide(e) {
            const { activeClose, dropShow } = this,
                dom = this.dropSelect.$el;
            if (activeClose || !dropShow) return;
            ClickOutside(e, dom, () => {
                if (this.dropSelect) this.dropSelect.cancel();
            });
        },
        // 注册监听window事件
        addWindowEvent() {
            setTimeout(() => {
                window.addEventListener('click', this.clickOutSide, true);
                this.$once('hook:beforeDestroy', () => {
                    window.removeEventListener('click', this.clickOutSide);
                });
            });
        },
        // 移除监听window事件
        remWindowEvent() {
            window.removeEventListener('click', this.clickOutSide);
        },
        // 打开下拉列表 flag为triangle表示点击的是三角形
        openDropSelect(flag) {
            const {
                openSearch,
                dropSelect,
                dropShow,
                disabled
            } = this;
            if (disabled) return;
            /*
            */
            if (flag === 'triangle' && dropShow) {
                this.setDropStatus(false);
                return;
            }
            if (dropSelect) {
                if (dropShow) {
                    if (!openSearch) this.setDropStatus(false);
                } else {
                    DropSelect.resetPosition(dropSelect);
                    this.dropShow = true;
                    this.dropSelect.dropShow = true;
                }
            } else {
                const {
                    $el, selectedData,
                    dropWidth, multiple, allCheckboxShow, notNull, linkage, lastStage, childDisable, includeParent, render,
                    dropSelectValue, data,
                    panel, inputText,
                    transfer,
                    dropSearch,
                    dropPlaceholder,
                    sameParams,
                    sortByTree,
                    jointParent,
                    onlySearchLastLevel
                } = this;
                const value = sameParams ? selectedData.map(d => d.id) : dropSelectValue;
                this.dropSelect = DropSelect({
                    tag: $el,
                    propsData: {
                        value,
                        data,
                        width: dropWidth,
                        multiple,
                        allCheckboxShow,
                        notNull,
                        linkage,
                        lastStage,
                        childDisable,
                        includeParent,
                        render,
                        dropShow,
                        panel,
                        selectedData,
                        inputText,
                        dropSearch,
                        dropPlaceholder,
                        sameParams,
                        sortByTree,
                        jointParent,
                        onlySearchLastLevel
                    }
                }).$on('change', obj => {
                    const { checkedData } = obj;
                    if (multiple) {
                        this.selectedData = checkedData;
                        this.dropSelect.selectedData = checkedData;
                    } else {
                        this.selectedData = obj;
                        this.setDropStatus(false);
                    }
                    this.$emit('change', obj);
                }).$on('openNode', item => {
                    this.$emit('openNode', item);
                }).$on('setDropStatus', status => {
                    this.setDropStatus(status);
                });
                this.dropSelect.$nextTick(() => {
                    DropSelect.resetPosition(this.dropSelect);
                    this.dropShow = true;
                    this.dropSelect.dropShow = true;
                });
                this.scrollTop = window.scrollY;
                // 监听滚轮
                window.addEventListener('mousewheel', this.wheelListener, false);
                // 监听滚动条
                window.addEventListener('scroll', this.wheelListener, false);
                let transferDom = null;
                if (transfer && document) {
                    transferDom = document.getElementById(transfer);
                    if (transferDom) transferDom.addEventListener('scroll', this.wheelListener, false);
                }
                this.$once('hook:beforeDestroy', () => {
                    DropSelect.remove(this.dropSelect);
                    window.removeEventListener('mousewheel', this.wheelListener);
                    window.removeEventListener('scroll', this.wheelListener);
                    if (transferDom) transferDom.removeEventListener('scroll', this.wheelListener);
                });
            }
            setTimeout(() => {
                if (this.popoverTip && this.popoverTip.show) this.popoverTip.show = false;
            });
        },
        // 设置下拉弹窗状态
        setDropStatus(status) {
            if (this.dropShow && this.dropSelect) {
                this.dropShow = status;
                this.dropSelect.dropShow = status;
                if (this.openSearch) {
                    setTimeout(() => {
                        this.inputText = '';
                        this.inputStatus = '';
                        this.dropSelect.inputText = '';
                    }, 300);
                }
            }
        },
        // 点击清除按钮
        delHandle() {
            this.selectedData = []; // {} | []
            this.dropSelectValue = '';
            if (this.dropSelect) {
                this.dropSelect.value = null;
                this.dropSelect.clearAll();
                this.dropSelect.confirm();
            } else {
                const { data } = this;
                this.setInitData([], data);
                this.$emit('change', { checkedData: [], checkedIds: [], item: {} });
            }
        },
        // tag 清除一个
        clearItem(item) {
            const { selectedData } = this,
                { defaultDisabled, id } = item;
            if (defaultDisabled) return;
            const sd = selectedData.filter(d => d.id !== id);
            this.selectedData = sd;
            if (this.dropSelect) {
                // true 表示需要向父级提交数据并带确定操作
                this.dropSelect.panelClearItem(item, true);
            } else {
                const { value, data } = this,
                    ids = sd.map(d => d.id);
                this.dropSelectValue = JSON.stringify(ids).length > 4 ? ids : null;
                if (
                    JSON.stringify(sd).length <= 2
                    && JSON.stringify(data).includes('"defaultDisabled":true')
                ) {
                    this.setInitData(value, data);
                }
                setTimeout(() => {
                    const { selectedData: sdd } = this,
                        checkedData = sdd,
                        checkedIds = sdd.map(d => d.id);
                    // 没有生成下拉列表的时候清除tag也提交数据
                    this.$emit('change', { checkedData, checkedIds, item });
                });
            }
        }
    }
};
</script>

<style lang="stylus">
.per-tree-select
    display inline-block
    font-size 0
</style>
