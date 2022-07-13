<template>
    <div class="p-drop-trigger"
         :class="[
         `p-drop-trigger-${type}`,
         disabled ? 'p-drop-trigger-disabled' : 'p-drop-trigger-active',
         errorShow && 'p-trigger-error'
     ]"
         :style="{width: `${width}px`}"
    >
        <div class="p-drop-trigger-main"
             :class="[`p-drop-trigger-main-${type}`]"
             @click="dropOpenClick"
        >
            <div v-if="caption"
                 class="p-drop-trigger-caption p-drop-trigger-text-overflow"
                 :style="{width: `${captionWidth}px`}"
            >{{ caption }}
            </div>
            <section v-if="type === 'normal'" class="p-drop-trigger-label"
                     :class="{'p-drop-trigger-label-pl': caption && !hasColon}"
                     :style="captionWidth && {width: `calc(100% - ${captionWidth}px)`}"
            >
                <template v-if="!inputStatus">
                    <span v-if="hasSelected" class="p-drop-trigger-selected"
                          :class="{'p-drop-trigger-selected-focus': !readonlyActive}"
                    >
                        <span v-if="multiple" class="p-drop-trigger-selected-m"
                              @mouseenter="triggerEnter"
                              @mouseleave="triggerLeave"
                        >已选择<span class="p-drop-trigger-selected-m-c"
                                  ref="countTag">{{ selectedData.length }}</span>项</span>
                        <span v-else class="p-drop-trigger-selected-s"
                              @mouseenter="TextEllipsis">{{ selectedData.name }}</span>
                    </span>
                    <span v-else
                          class="p-drop-trigger-placeholder p-drop-trigger-text-overflow">{{ placeholder }}</span>
                </template>
                <input v-if="openSearch && !disabled && !dropSearch && inputShow"
                       type="text"
                       class="p-drop-trigger-input p-drop-trigger-text-overflow"
                       :class="{
                            'p-drop-trigger-input-readonly': readonlyActive && !dropShow,
                            'p-drop-trigger-label-pl': caption && !hasColon
                        }"
                       v-model="inputText"
                       @input="inputHandle"
                       @focus="focusHandle"
                       @blur="blurHandle"
                >
            </section>
            <template v-else>
                <div v-if="selectedData && JSON.stringify(selectedData).length > 4"
                     class="p-drop-trigger-main-tag-box"
                     :style="{width: `calc(100% - ${captionWidth}px)`}"
                >
                    <section class="p-drop-trigger-tag-list">
                        <article class="p-drop-trigger-tag-list-item" v-for="(sd, sdi) in selectedData"
                                 :key="`${sd.id}-${sdi}`">
                        <span class="p-drop-trigger-tag-list-text p-drop-trigger-text-overflow"
                              :style="{maxWidth: `${tabMaxWidth}px`}"
                              @mouseenter="TextEllipsis"
                        >{{ sd.name }}</span>
                            <i class="p-drop-trigger-tag-list-svg"
                               :class="[sd.disabled ? 'p-drop-trigger-tag-list-svg-disabled' : 'p-drop-trigger-tag-list-svg-normal']"
                               @click.stop="tagCloseHandle(sd)"
                            >
                                <CloseIcon/>
                            </i>
                        </article>
                    </section>
                </div>
                <section v-else class="p-drop-trigger-label" :style="{width: `calc(100% - ${captionWidth}px)`}">
                    <span class="p-drop-trigger-placeholder p-drop-trigger-text-overflow">{{ placeholder }}</span>
                </section>
            </template>
        </div>
        <div class="p-drop-trigger-icon" :class="{'p-drop-trigger-icon-clear': !clearHide && hasSelected && !disabled}">
            <i class="p-drop-trigger-svg p-drop-trigger-tgl"
               :class="{'p-drop-trigger-tgl-open': !dropShow}"
               @click.stop="triangleHandle"
            >
                <TriangleIcon/>
            </i>
            <i class="p-drop-trigger-svg p-drop-trigger-del" @click.stop="delHandle">
                <DeleteIcon/>
            </i>
        </div>
        <span class="p-trigger-error-text"
              v-if="errorShow"
              :style="errorTop&&{top: `${errorTop}px`}"
        >{{ errorText }}</span>
    </div>
</template>

<script>
import TriangleIcon from '../static/iconSvg/triangle.svg';
import DeleteIcon from '../static/iconSvg/delete_icon.svg';
import CloseIcon from '../static/iconSvg/icon_close.svg';
import TextEllipsis from '../static/utils/TextEllipsis';
import GetCaptionWidth from './GetCaptionWidth';
import GetPopoverContent from './GetPopoverContent';
import GetScrollbarWidth from '../static/utils/GetScrollbarWidth';
import PopoverTip from '../PopoverTip';

export default {
    name: 'DropTrigger',
    components: {
        TriangleIcon,
        DeleteIcon,
        CloseIcon
    },
    props: {
        // 触发器宽度
        width: {
            type: [String, Number],
            default: ''
        },
        // 触发器类型
        type: {
            type: String,
            default: 'normal' // normal tag
        },
        // 占位内容
        placeholder: {
            type: String,
            default: '请选择'
        },
        // 触发器标题
        caption: {
            type: String,
            default: ''
        },
        // 禁用状态
        disabled: {
            type: Boolean,
            default: false
        },
        // 可显示清除按钮
        clearHide: {
            type: Boolean,
            default: false
        },
        // 开启搜索 - 默认可搜索
        openSearch: {
            type: Boolean,
            default: true
        },
        // 下拉列表可搜索
        dropSearch: {
            type: Boolean,
            default: false
        },
        // 单选还是多选
        multiple: {
            type: Boolean,
            default: false
        },
        selectedData: {
            type: [Array, Object],
            default: () => ({})
        },
        // 下拉列表展开
        dropShow: {
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
        }
    },
    data() {
        return {
            // 输入的内容
            inputText: '',
            // 输入框只读状态
            readonlyActive: true,
            // 输入框显示
            inputShow: false,
            // 是否正在输入
            inputStatus: null,
            // 标题宽度
            captionWidth: 0,
            // 滚动条宽度
            scrollbarWidth: 6,
            errorTop: 0
        };
    },
    computed: {
        // 标题是否带有冒号
        hasColon() {
            const { caption } = this;
            return (caption.includes(':') || caption.includes('：'));
        },
        // 已选择
        hasSelected() {
            const {
                    multiple,
                    selectedData
                } = this,
                len = JSON.stringify(selectedData).length;
            if (multiple) return len > 4;
            return len > 2;
        },
        // tag标签的最大宽度
        tabMaxWidth() {
            const {
                width = 120,
                scrollbarWidth = 6
            } = this;
            // 64 = 8 + 30 + 22 + 4
            return width - scrollbarWidth - 64;
        }
    },
    watch: {
        // 提交输入的值
        inputText(n, o) {
            if (n === o) return;
            if (this.timerInputText) clearTimeout(this.timerInputText);
            this.timerInputText = setTimeout(() => {
                this.$emit('getInputText', n);
            }, 500);
        },
        // 监听标题改变
        caption(n, o) {
            if (n === o) return;
            if (this.type === 'tag') return;
            if (n) this.captionWidth = GetCaptionWidth(n);
        },
        dropShow(n, o) {
            if (n === o) return;
            if (this.type === 'tag') return;
            if (n && this.popoverTip) this.clearPopoverTip();
            setTimeout(() => {
                this.inputShow = n;
                if (!n) {
                    this.inputStatus = null;
                    this.inputText = '';
                }
            }, 300);
        },
        // 没有选中的项时，移除popoverTip
        selectedData: {
            handler(n, o) {
                const nd = JSON.stringify(n),
                    od = JSON.stringify(o);
                if (nd === od) return;
                const {
                    multiple,
                    type
                } = this;
                if (multiple && nd.length <= 4 && this.popoverTip) {
                    PopoverTip.remove(this.popoverTip);
                    this.popoverTip = null;
                }
                this.$nextTick(() => {
                    if (type === 'tag') this.errorTop = this.$el.clientHeight + 6;
                });
            },
            deep: true
        }
    },
    mounted() {
        const {
            caption,
            type
        } = this;
        // 获取标题宽度
        if (caption) this.captionWidth = GetCaptionWidth(caption);
        // 滚动条宽度
        if (type === 'tag') this.scrollbarWidth = GetScrollbarWidth();
    },
    methods: {
        TextEllipsis,
        // 输入监听
        inputHandle(e) {
            const {
                data,
                target: { value }
            } = e;
            this.inputStatus = data || value;
        },
        // 点击三角形
        triangleHandle() {
            this.dropOpenClick('triangle');
        },
        // 清除按钮回调
        delHandle() {
            this.inputStatus = null;
            this.$emit('delHandle');
        },
        // 输入框获取了焦点
        focusHandle() {
            this.readonlyActive = false;
        },
        blurHandle() {
            this.readonlyActive = true;
        },
        // 点击触发器
        dropOpenClick(flag) {
            this.clearPopoverTip();
            this.$emit('click', flag);
        },
        // 清除提示
        clearPopoverTip() {
            if (this.type === 'tag' || this.disabled) return;
            if (this.timerEnter) clearTimeout(this.timerEnter);
            PopoverTip.remove(this.popoverTip);
            this.popoverTip = null;
        },
        // 触发器鼠标移入
        triggerEnter() {
            const {
                type,
                disabled,
                dropShow,
                selectedData
            } = this;
            if (type === 'tag' || disabled || dropShow) return;
            const popoverTipContent = GetPopoverContent(selectedData);
            if (!popoverTipContent) return;
            if (this.popoverTip) {
                if (this.timerPopover) {
                    this.clearTimer();
                } else {
                    this.timerEnter = setTimeout(() => {
                        this.popoverTip.content = popoverTipContent;
                        PopoverTip.resetPosition(this.popoverTip);
                        clearTimeout(this.timerEnter);
                        this.timerEnter = null;
                    }, 500);
                }
            } else {
                this.timerEnter = setTimeout(() => {
                    const {
                        $el,
                        $refs: { countTag }
                    } = this;
                    this.popoverTip = PopoverTip({
                        tag: $el, // 触发器
                        countTag, // 数字标签
                        propsData: {
                            content: popoverTipContent
                        }
                    })
                        .$on('tipHandle', str => {
                            // str 值可选范围 enter leave
                            if (str === 'enter') {
                                this.clearTimer();
                            } else {
                                this.setTimer();
                            }
                        });

                    this.popoverTip.$nextTick(() => {
                        PopoverTip.resetPosition(this.popoverTip);
                    });
                    clearTimeout(this.timerEnter);
                    this.timerEnter = null;
                }, 500);
            }
        },
        setTimer() {
            this.timerPopover = setTimeout(() => {
                this.popoverTip.show = false;
                this.clearTimer();
            }, 500);
        },
        clearTimer() {
            clearTimeout(this.timerPopover);
            this.timerPopover = null;
        },
        // 触发器鼠标移出
        triggerLeave() {
            if (this.type === 'tag') return;
            if (this.timerEnter) {
                clearTimeout(this.timerEnter);
                return;
            }
            if (this.popoverTip) this.setTimer();
        },
        // type = tag 点击X按钮回调
        tagCloseHandle(item) {
            if (item.disabled) return;
            this.$emit('clearItem', item);
        }
    }
};
</script>

<style lang="stylus">
.p-drop-trigger
    position relative
    display inline-flex
    justify-content space-between
    align-items flex-start
    border 1px solid $grey-400
    border-radius 4px
    width 120px
    font-size 0
    transition border-color .3s

.p-drop-trigger-active
    cursor pointer

    &:hover
        border-color $blue-500

    &:active
        border-color $blue-600

.p-drop-trigger-disabled
    background-color $grey-200
    cursor not-allowed

    .p-drop-trigger-caption
        color $grey-400

    .p-drop-trigger-icon
        svg
            path
                fill $grey-400

    .p-drop-trigger-label
        cursor not-allowed

        .p-drop-trigger-selected
            > span
                color $grey-400

            .p-drop-trigger-selected-m-c
                color $grey-400

.p-drop-trigger-normal
    height 32px

.p-drop-trigger-tag
    min-height 32px
    max-height 84px

//overflow hidden

.p-drop-trigger-text-overflow
    overflow hidden
    white-space nowrap
    text-overflow ellipsis

.p-drop-trigger-main
    padding-left 8px
    width calc(100% - 30px)

.p-drop-trigger-main-normal
    height 30px

.p-drop-trigger-caption
    display inline-block
    max-width 98px
    height 30px
    line-height @height
    color $grey-600
    font-size 14px

.p-drop-trigger-label
    position relative
    display inline-block
    width 100%
    height 30px
    overflow hidden
    cursor pointer

.p-drop-trigger-label-pl
    padding-left 8px

.p-drop-trigger-placeholder
    display block
    width 100%
    height 30px
    line-height @height
    font-size 14px
    color $grey-400

.p-drop-trigger-selected
    display block
    width 100%
    height 30px
    line-height @height

    > span
        display block
        width 100%
        height 100%
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        font-size 14px
        color $grey-900
        transition color .3s

.p-drop-trigger-selected-m-c
    padding-left 4px
    padding-right 4px
    color $blue-500

.p-drop-trigger-selected-focus
    > span
        color $grey-400

    .p-drop-trigger-selected-m-c
        color $grey-400

.p-drop-trigger-input
    position absolute
    left 0
    top 0
    outline none
    background none
    border 0
    width 100%
    height 30px
    font-size 14px
    color $grey-900

.p-drop-trigger-input-readonly
    cursor pointer

.p-drop-trigger-main-tag
    display inline-flex
    min-height 30px

.p-drop-trigger-main-tag-box
    min-height 28px
    max-height 82px
    overflow-x hidden
    overflow-y auto

.p-drop-trigger-tag-list
    display inline-flex
    align-items flex-start
    flex-wrap wrap
    padding-top 4px
    width 100%
    min-height 28px

.p-drop-trigger-tag-list-item
    display inline-flex
    align-items center
    margin-right 4px
    margin-bottom 4px
    padding-left 4px
    background-color $grey-200
    height 22px
    line-height @height

    .p-drop-trigger-tag-list-text
        font-size 14px
        color $grey-900
        cursor text

    .p-drop-trigger-tag-list-svg
        width 22px
        height @width
        text-align center

        svg
            vertical-align middle
            width 10px
            height @width
            font-size 0

            path
                transition fill .3s

    .p-drop-trigger-tag-list-svg-normal
        &:hover
            path
                fill $blue-500

    .p-drop-trigger-tag-list-svg-disabled
        cursor not-allowed

.p-drop-trigger-icon
    width 30px
    height @width

.p-drop-trigger-icon-clear
    &:hover
        .p-drop-trigger-tgl
            display none

        .p-drop-trigger-del
            display block

.p-drop-trigger-svg
    display block
    padding-top 7px
    width 100%
    height 100%
    text-align center
    transition transform .3s

    svg
        vertical-align middle
        width 16px
        height @width
        font-size 0

        path
            transition fill .3s

.p-drop-trigger-del
    display none

    svg
        &:hover
            path
                fill $blue-500

.p-drop-trigger-tgl
    display block

.p-drop-trigger-tgl-open
    transform rotate(180deg)

.p-trigger-error
    border-color $red-500

.p-trigger-error-text
    position absolute
    left 0
    top 36px
    line-height 14px
    font-size 14px
    color $red-500
</style>
