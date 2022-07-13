<template>
    <transition :name="position?'selectDownUpExtend':'selectDownUpExtendTop'">
        <div class="p-select-option-box"  v-show="dropVisible">
            <div >
                <ul class="p-select-option-menu" ref="optionMenu" v-show="data.length" @mousewheel.stop @click.stop>
                    <template v-for="(option, index) in data" >
                        <li v-if="option.classify"  @click.stop="handlePrevent" class="p-select-option-classify" :key="index+option.classify"
                        >{{option.classify}}</li>
                        <li v-else
                            :class="[
                                'p-select-option',
                                option.divider && 'p-select-option-divider',
                                option.disabled ? 'p-select-option-disabled' : option.selected ? 'p-select-option-selected' : ''
                                ]"
                            :key="index"
                            @click.stop="clickHandle(option,index)"
                        >
                            <div class="p-select-option-content" >
                                <div class="p-select-option-wraper" v-if="option.src || option.label">
                                    <div v-if="option.src" class="p-select-option-avatar"  >
                                        <Avatar :size="option.sub? 'large':'medium'">
                                            <img :src="option.src">
                                        </Avatar>
                                    </div>
                                    <span v-if="option.label" :style="labelStyle(index)" class="p-select-option-label">{{option.label}}</span>
                                </div>
                                <div>
                                    <section v-if="option.display" :style="widthStyle(option)"
                                             :class="[
                                                 'p-select-option-main', option.disabled
                                                 ? 'p-select-option-main-disabled' :option.selected
                                                 ? 'p-select-option-main-selected' : ''
                                             ]"
                                             :title="option.name" v-html="option.display"></section>
                                    <section v-else :style="widthStyle(option)"
                                             :class="[
                                                 'p-select-option-main', option.disabled
                                                 ? 'p-select-option-main-disabled' :option.selected
                                                 ? 'p-select-option-main-selected' : ''
                                                 ]" :title="option.name">{{option.name}}</section>
                                    <section v-if="option.sub" :style="widthStyle(option)"
                                             :class="['p-select-option-desc', option.disabled
                                             ? 'p-select-option-desc-disabled' :option.selected
                                             ? 'p-select-option-desc-selected' : ''
                                             ]" :title="option.sub">{{option.sub}}</section>
                                </div>
                            </div>
                            <div class="p-select-multiple-icon" v-if="multiple&&option.selected"></div>
                        </li>
                    </template>
                </ul>
                <div @click.stop="() => false" v-if="multiple&&data.length" :class="['p-select-confirm-panel', data.length > 5 ? 'p-select-panel-shadow': '' ]">
                    <span @click.stop.capture="cancel">取消</span>
                    <span @click.stop.capture="confirm" :class="[disableConfirm ? 'disabled-confirm-button' : '']">确定</span>
                </div>
            </div>
            <div ref='notfound' class="p-select-not-found"  v-show="(query && !data.length) || !data.length" >没有找到任何内容</div>
        </div>
    </transition>
</template>

<script>

import Avatar from '../Avatar';

export default {
    name: 'SelectDrop',
    props: {
        /**
         * 是否多选
         */
        multiple: {
            type: Boolean,
            default: false
        },
        /**
         * 搜索内容
         */
        query: {
            type: String,
            default: ''
        },
        /**
         * 下拉框数据
         */
        data: {
            type: Array,
            default: () => []
        },
        width: {
            type: [String, Number]
        },
        // 下拉列表容纳最大条数
        maxCount: {
            type: [String, Number],
            default: 5
        }
    },
    computed: {
        tagBgColors() { // 标签背景颜色
            return ['#E1F2FF', '#D5F6F2', '#D9F5D6', '#FAF1D1', '#FEEAD2', '#FDE3E2', '#FDDDEF', '#ECE2FE', '#B2E6F2', '#EFF0F1'];
        },
        tagTextColors() { // 标签字体颜色
            return ['#0065B3', '#078372', '#237B19', '#AA7803', '#B26206', '#AC2F28', '#8C218C', '#4E1BA7', '#161FA2', '#373C43'];
        }
    },
    data() {
        return {
            position: true, // 动画执行方向
            dropVisible: false,
            value: '',
            disableConfirm: true
        };
    },
    watch: {
        value: {
            handler(n, o) {
                if (n !== o) {
                    this.selectById();
                }
            },
            immediate: true
        }
    },
    components: { Avatar }, // √ 图标
    methods: {
        widthStyle(option) {
            let width = 0;
            if (option.src) {
                width = option.sub ? this.width - 68 : this.width - 60; // 有头像的情况
            } else if (option.label) {
                width = this.width - 76; // 有标签的情况
            } else {
                width = this.width - 24; // 只有文字的情况
            }
            if (this.multiple) {
                width = width - 28; // 多选情况下还要再减去右边勾选图标的宽度
            }
            return { width: `${width}px` };
        },
        handlePrevent(e) {
            return false;
        },
        /**
         * description 如果用户设置了默认选中项 则默认选中
         */
        selectById() {
            const index = this.data.findIndex(item => item.id === this.value);
            if (index > -1) {
                this.data[index].selected = true;
            }
        },
        /**
         * description 设置标签的样式
         * params  index: 序号
        */
        labelStyle(index) {
            return {
                color: this.tagTextColors[index],
                backgroundColor: this.tagBgColors[index]
            };
        },
        /**
         * description 处理点击操作 向上传递事件和选中项
         * params  option：当前项个   index: 序号
        */
        clickHandle(option) {
            if (option.disabled) {
                return;
            }
            option.selected = !option.selected;
            this.$emit('change', option);
        },
        /**
         * description 响应取消事件
        */
        cancel() {
            this.$emit('cancel');
        },
        /**
         * description 响应确认事件
        */
        confirm() {
            if (this.disableConfirm) return;
            this.disableConfirm = true;
            let allCancel = true;
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].selected && this.data[i].selected === true) {
                    allCancel = false;
                }
            }
            if (allCancel) {
                this.$emit('clearPopover');
            }
            this.$emit('confirm');
        }
    }
};
</script>
 <style lang="stylus">
 @import '../static/stylus/animate/selectDownUpExtend.styl'
.p-select-not-found
    height 54px
    padding 16px 0 16px 12px
    border-radius 4px
    line-height 22px
    font-size 14px
    color $grey-400
    background: $theme
    box-sizing border-box
    min-width 180px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
.p-select-option-box
    position absolute
    border 1px solid $grey-300
    //max-height 300px
    border-radius 4px
    box-shadow $box-shadow-bottom
    background $theme
    font-size 0
    .p-select-option-menu
        font-size 0
        padding-top 8px
        padding-bottom 8px
        max-height 248px
        overflow auto
        .p-select-option-selected
            background-color $blue-100
        .p-select-option
            display flex
            align-items center
            justify-content space-between
            position relative
            width 100%
            box-size border-box
            border-radius 0
            padding 8px 0 8px 12px
            cursor pointer
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            transition background-color.3s
            &:hover
                background-color $hover-color-grey
            .p-select-option-content
                display flex
                align-items center
                justify-content: flex-start
                font-size 0
                .p-select-option-wraper
                    display flex
                    align-items center
                    justify-content: center
                    .p-select-option-avatar
                        display flex
                        align-items center
                        justify-content: center
                        margin 4px 0 4px 0
                        overflow hidden
                    .p-select-option-label
                        display inline-block
                        width 44px
                        height 24px
                        margin-right 8px
                        line-height 24px
                        font-size 14px
                        text-align center
                        overflow hidden
                .p-select-option-main
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                    font-size 14px
                    line-height 22px
                    color $grey-900
                .p-select-option-main-selected
                    color $blue-500
                .p-select-option-main-disabled
                    color $grey-400
                .p-select-option-desc
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                    font-size 12px
                    line-height 18px
                    color $grey-500
                .p-select-option-desc-selected
                    color $blue-500
                .p-select-option-desc-disabled
                    color $grey-400
            .p-select-multiple-icon
                position absolute
                right 12px
                top 50%
                width 12px
                height 6px
                border:2px solid rgb(0, 145, 255)
                border-top none
                border-right none
                transform translateY(-50%) rotate(-45deg)
    .p-select-confirm-panel
        display flex
        justify-content flex-end
        align-items center
        height 46px
        width 100%
        span
            font-size 14px
            cursor pointer
        span:first-child
            color $grey-900
            margin-right 16px
        span:last-child
            color $blue-500
            margin-right 12px
        span.disabled-confirm-button
            font-size 14px
            color $grey-400
            cursor not-allowed
    .p-select-panel-shadow
        position relative
        &::after
            content ''
            display block
            position absolute
            top 0
            left 0
            width 100%
            height 100%
            pointer-events none
            box-shadow  $box-shadow-top
    .p-select-option-divider
        border-bottom 1px solid $grey-200
    .p-select-option-disabled
        color $grey-400
        background none
        cursor not-allowed!important
        &:hover
            background none!important
    .p-select-option-classify
        padding 8px 0 8px 12px
        color $grey-500
        font-size 14px
        line-height 24px

</style>
