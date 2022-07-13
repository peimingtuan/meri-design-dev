<template>
    <div ref="SelectSingleTree" class="p-select-search" :style="{width: width+'px'}">
        <div
                :class="[
                    'p-select-search-box', boxFocus&&'p-select-search-box-focus',
                    disabled&&'p-select-search-box-disabled',
                    errorShow&&'p-trigger-error'
                    ]"
                @click="searchBoxClick"
                @mouseenter="enterTrigger"
                @mouseleave="leaveTrigger"
        >
            <div class="p-select-input-search-caption" v-if="caption" ref="captionDom">{{caption}}</div>
            <section class="p-select-search-field"
                     :style="caption&&{left:`${captionWidth}px`,width: `calc(100% - ${captionWidth}px)`, paddingLeft: caption && '4px'}"
                >
                <section ref="fieldSection"
                        v-show="fieldStatus && !inputContent"
                        :class="['p-select-search-field-text',choiceName&& !boxFocus && 'p-select-choice-name']"
                        :style="{paddingLeft:caption&&`${curPaddingLeft}px`}"
                        :title="choiceName"
                >{{choiceName || placeholder}}
                </section>

                <article class="p-select-field-item">
                    <input
                            type="text"
                            class="p-select-search-input"
                            :disabled="disabled"
                            :readonly="isReadOnly"
                            v-model="inputValue"
                            @input="inputContentHandle"
                            @blur="inputBlur"
                            ref="inputField"
                    />
                </article>
                <span class="p-select-search-triangle">
                    <i class="p-select-search-triangle-icon"
                       v-show="!triggerIn || hideClear || (!inputValue && !choiceName)"
                       @click.stop="triangleHandle">
                        <TriangleSvg :class="[!dropDownShow && 'p-select-search-triangle-rotate']" />
                    </i>
<!--                    && !hideClear-->
                    <i class="p-select-search-triangle-icon"
                       v-show="triggerIn && !hideClear && (inputValue || choiceName)"
                       @click.stop="clearChoseData">
                        <DeleteIcon class="p-select-clear-icon" />
                    </i>
                </span>
            </section>
            <span class="p-trigger-error-text"
                  v-if="errorShow"
            >{{errorText}}</span>
        </div>
    </div>
</template>

<script>
import TriangleSvg from '../../static/iconSvg/triangle.svg';
import TreeSinglePanel from '../TreeSinglePanel';
import DeleteIcon from '../../static/iconSvg/delete_icon.svg';
import cloneDeep from '../../static/utils/CloneDeep';
import { FilterTool, PackageTool, TileTool } from '../../static/utils/TreeTool';

export default {
    name: 'selectSingleSearchTree',
    components: {
        TriangleSvg,
        DeleteIcon
    },
    props: {
        // 选中项的id
        selectedId: {
            type: String,
            default: ''
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false
        },
        // 盒子宽度
        width: {
            type: [String, Number],
            default: 240
        },
        // 盒子宽度
        overWidth: {
            type: [String, Number],
            default: ''
        },
        // 盒子高度
        height: {
            type: [String, Number],
            default: 360
        },
        // 传入的数据
        data: {
            type: Array,
            default: () => []
        },
        // 最后一级
        lastStage: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: ''
        },
        hideClear: {
            type: Boolean,
            default: false
        },
        transfer: {
            type: [String, Array],
            default: ''
        },
        // input框是否为readonly状态
        isReadOnly: {
            type: Boolean,
            default: false
        },
        // 标题
        caption: {
            type: String,
            default: ''
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
        }
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    data() {
        return {
            pleaseSelect: '请选择', // 请搜索占位符
            choiceName: '',
            searchPlaceHolder: false, // 控制文字颜色
            fieldStatus: true, // 控制占位符是否显示
            boxFocus: false, // box-focus是否获取焦点
            inputValue: '', // 输入框输入的值
            inputContent: '', // 输入框输入的内容
            // inputWidth: 10, // 输入框的宽度
            // 下拉框是否显示
            dropDownShow: false,
            // 树形结构数据
            treeData: [],
            // 搜索的数据
            searchData: [],
            // 激活关闭
            closeDrop: false,
            // 搜索无内容
            notFound: false,
            // 下拉框实例
            targetVm: null,
            // 鼠标是否进入触发器
            triggerIn: false,
            captionWidth: 0 // 标题占用宽度
        };
    },
    watch: {
        dropDownShow(n, o) {
            this.$emit('focusChange', !n);
        },
        // 监听文字输入
        inputValue(n, o) {
            this.targetVm.inputValue = n;
            if (n === o) return;
            this.fieldStatus = !n;
            this.filterSelect(n);
        },
        notFound(n, o) {
            if (n === o) return;
            this.targetVm.notFound = n;
        },
        searchData(n, o) {
            if (n === o) return;
            this.targetVm.searchData = n;
        },
        data(n, o) {
            if (n === o) return;
            if (n && n.length) {
                this.setChoseData(this.selectedId, n);
            }
        },
        selectedId(n, o) {
            if (n !== o) {
                if (this.data && this.data.length) {
                    this.setChoseData(n, this.data);
                }
            }
        },
        // 监听标题值改变
        caption: {
            handler(n, o) {
                if (n === o) return;
                if (n) {
                    this.$nextTick(() => this.getCaptionWidth());
                } else {
                    this.captionWidth = 0;
                }
            },
            immediate: true
        }
    },
    computed: {
        calcWidth() {
            return this.width > 600 ? 600 : (this.width < 180 ? 180 : this.width);
        },
        curPaddingLeft() {
            let code = 0;
            if (this.caption) {
                code = this.caption.charCodeAt(this.caption.length - 1);
                if (code === 65306) { // 判断是中文的冒号还是英文的冒号 中文 65306 英文 58
                    return 2;
                }
                return 8;
            }
            return 0;
        }

    },
    mounted() {
        if (this.data && this.data.length) {
            this.setChoseData(this.selectedId, this.data);
        }
        if (this.transfer) {
            let { transfer } = this;
            if (!transfer.startsWith('#')) {
                transfer = `#${transfer}`;
            }
            this.scrollDom = document.querySelector(transfer);
            if (this.scrollDom) {
                this.scrollDom.addEventListener('mousewheel', this.hidePanel, false);
                this.scrollDom.addEventListener('scroll', this.hidePanel, false);
            }
        } else {
            document.addEventListener('mousewheel', this.hidePanel, false);
            document.addEventListener('scroll', this.hidePanel, false);
        }

        this.$once('hook:beforeDestroy', () => {
            if (this.targetVm) TreeSinglePanel.remove(this.targetVm);
            if (this.transfer) {
                if (this.scrollDom) {
                    this.scrollDom.removeEventListener('mousewheel', this.hidePanel);
                    this.scrollDom.removeEventListener('scroll', this.hidePanel);
                }
            } else {
                document.removeEventListener('mousewheel', this.hidePanel);
                document.removeEventListener('scroll', this.hidePanel);
            }
        });
    },
    methods: {
        // 获取标题宽度
        getCaptionWidth() {
            if (!this.caption) return;
            setTimeout(() => {
                const { captionDom } = this.$refs;
                if (!captionDom) return;
                const { scrollWidth } = captionDom;
                if (scrollWidth < 100) {
                    this.captionWidth = scrollWidth;
                } else {
                    this.captionWidth = 100;
                }
            });
        },
        inputContentHandle(e) {
            this.inputContent = e.target.value || e.data || '';
        },

        // 进入触发器
        enterTrigger() {
            this.closeDrop = false;
            this.triggerIn = true;
            const target = this.$refs.fieldSection;
            const { clientWidth, scrollWidth } = target;
            if (scrollWidth > clientWidth) this.$el.title = target.innerText;
            else this.$el.title = '';
        },
        // 离开触发器
        leaveTrigger() {
            this.closeDrop = true;
            this.triggerIn = false;
        },
        // 隐藏下拉选择面板设置相应的变量值
        hidePanel() {
            // 判断是否下拉面板含有实例
            if (this.targetVm) {
                this.targetVm.dropDownShow = false;
            }
            // const inputField = this.$refs.inputField;
            // if (inputField) inputField.blur();
            this.boxFocus = false;
            this.dropDownShow = false;
            this.searchPlaceHolder = true;
            setTimeout(() => {
                this.inputValue = '';
                this.inputContent = '';
                this.fieldStatus = true;
            }, 300);
        },
        // 点击三角形
        triangleHandle() {
            const { dropDownShow } = this;
            if (dropDownShow) {
                this.hidePanel();
            } else {
                this.searchBoxClick();
            }
        },
        // 清除按钮点击清除回到初始化状态
        clearChoseData() {
            this.inputValue = '';
            this.inputContent = '';
            this.choiceName = '';
            this.$emit('change', '');
            this.setChoseData('', this.data);
            if (this.targetVm) this.targetVm.dropDownShow = false;
        },
        /**
         * 初始化通过已选择的ids设置树结构状态
         * selectData:已选择的数据包括初始化
         * oriData:无任何变化的原始数据
         */
        setChoseData(selectData, oriData) {
            if (selectData) {
                // 设置选中并设置树结构显示
                const TilingData = TileTool([], oriData, '-1'),
                    findParentAndSetStatus = (parentId) => {
                        // 找出父级
                        const parent = TilingData.find(item => item.id === parentId);
                        if (parent) {
                            // 找出当前父级的子集并对当前父级进行设置
                            parent.open = true;
                            findParentAndSetStatus(parent.parentId);
                        } else {
                            return false;
                        }
                    },
                    selectedIndex = TilingData.findIndex(item => item.id === selectData);
                let checkedData = null;
                if (selectedIndex !== -1) {
                    TilingData[selectedIndex].checked = 'checked';
                    checkedData = TilingData[selectedIndex];
                    findParentAndSetStatus(checkedData.parentId);
                }
                this.treeData = PackageTool(TilingData);
                this.choiceName = checkedData ? checkedData.name : '';
                this.searchPlaceHolder = !!checkedData;
            } else {
                // 无默认值直接使用最新数据
                this.treeData = cloneDeep(oriData);
                this.choiceName = '';
                if (this.targetVm) {
                    this.targetVm.treeData = this.treeData;
                }
            }
        },
        // 点击触发器使输入框获取焦点打开下拉面板
        searchBoxClick() {
            if (this.disabled || this.dropDownShow) return;
            if (this.targetVm) {
                TreeSinglePanel.renderPosition(this.targetVm);
                this.targetVm.dropDownShow = true;
                this.targetVm.treeData = this.treeData;
            } else {
                this.targetVm = TreeSinglePanel({
                    tag: this.$refs.SelectSingleTree,
                    params: {
                        dropDownShow: this.dropDownShow,
                        notFound: this.notFound,
                        inputValue: this.inputValue,
                        selectedId: this.selectedId,
                        searchData: this.searchData,
                        treeData: this.treeData,
                        height: this.height,
                        lastStage: this.lastStage,
                        width: this.calcWidth,
                        overWidth: this.overWidth
                    }
                })
                    .$on('changeChose', (data) => {
                        this.$emit('change', data.id, data);
                        this.setDataNow(data.name.replace(/<[^<>]+>/g, ''));
                        // 关闭下拉列表
                        this.hidePanel();
                    })
                    .$on('modalStatus', (status) => {
                        this.closeDrop = status;
                        if (this.dropDownShow) {
                            if (status) this.$refs.inputField.focus();
                        }
                    });
                this.targetVm.$nextTick(() => {
                    this.targetVm.dropDownShow = true;
                    this.dropDownShow = true;
                });
            }
            this.dropDownShow = true;
            this.boxFocus = true;
            this.closeDrop = false;
            this.$nextTick(() => {
                this.$refs.inputField.focus();
            });
        },
        /**
             * 筛选搜索的收据
             * @param v 搜索框输入的值
             */
        filterSelect(v) {
            const tileData = TileTool([], cloneDeep(this.data), '-1'); // 平铺树形结构
            const re = new RegExp(v, 'g');
            let fData = null;
            // 筛选出包涵有搜索字符的数据
            if (this.lastStage) {
                fData = tileData.filter(d => {
                    const hasChild = tileData.find(fd => fd.parentId === d.id); // 查看是否还有子级
                    if (d.isleaf) {
                        if (!hasChild && d.name.includes(v) && !d.disabled) {
                            d.name = d.name.replace(re, `<span class="p-select-search-highlight">${v}</span>`);
                            return d;
                        }
                        return null;
                    }
                    return null;
                });
            } else {
                fData = tileData.filter(d => {
                    if (d.isleaf) {
                        if (d.name.includes(v) && !d.disabled) {
                            d.name = d.name.replace(re, `<span class="p-select-search-highlight">${v}</span>`);
                            return d;
                        }
                        return null;
                    }
                    return null;
                });
            }
            // 得到筛选后的数据 一维数据列表
            const tData = FilterTool(tileData, fData);
            this.searchData = tData;
            this.notFound = tData.length === 0;
        },
        // 输入框失去焦点
        inputBlur() {
            if (!this.closeDrop || !this.dropDownShow) return;
            this.hidePanel();
        },
        /**
         * 设置选中的数据
         * @param name 当前选中的name
         */
        setDataNow(name) {
            this.choiceName = name;
            this.hidePanel();
        }
    }
};
</script>

<style lang="stylus">
.p-select-search-field
    position absolute
    display: inline-flex
    width calc(100% - 12px)
    height 30px
    .p-select-search-field-text
        display: inline-block
        //width calc(100% - 26px)
        padding-left 0
        text-align left
        line-height 30px
.p-select-input-search-caption
    display: inline-block
    position: absolute
    top: 6px
    left: 0
    line-height 20px
    padding-left: 12px;
    max-width: 114px;
    font-size: 14px;
    color: $grey-500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
.p-select-search-highlight
    font-size 14px
    color $blue-500

</style>
