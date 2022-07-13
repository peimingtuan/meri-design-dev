<template>
    <div class="p-editable" :style="width&&{width: `${width}px`}" v-if="item">
        <div class="p-editable-item">
            <section class="p-editable-item-title">
                <article class="p-editable-item-content">
                    <template>
                        <i :class="[
                               'p-editable-item-triangle',
                                item.openChild&&'p-editable-item-triangle-show'
                           ]"
                           @click="openChildHandle"
                        ><ArrowTriangle /></i>
                        <Checkbox v-if="showCheckbox" :checked="item.checked" @change="checkboxHandle" />
                    </template>
                    <span class="p-editable-item-text">
                        <input class="p-editable-item-text-input"
                               v-if="item.edit"
                               ref="inputTag"
                               :value="item.name"
                               @keyup.enter="keyup"
                               @blur="blur"
                        />
                        <span class="p-editable-item-text-span"
                              v-else
                              @mouseenter="mouseHover"
                        >{{item.name}}</span>
                    </span>
                </article>
                <article
                        v-show="!item.edit"
                        class="p-editable-icon-handle"
                >
                    <Icon
                            v-for="(icon, iconInd) in item.icons"
                            :key="`icon-${iconInd}-${icon.name}`"
                            :name="icon.name"
                            :color="icon.color"
                            :hoverColor="icon.hoverColor"
                            @click="iconHandle(icon.name)"
                    />
                </article>
            </section>
        </div>
    </div>
</template>

<script>
import ArrowTriangle from '../static/iconSvg/arrow_triangle.svg';
import Icon from '../Icon';
import Checkbox from '../Checkbox';

export default {
    name: 'Editable',
    components: { ArrowTriangle, Icon, Checkbox },
    props: {
        item: {
            type: Object,
            default: () => {}
        },
        width: {
            type: [String, Number],
            default: ''
        },
        // 是否显示checkbox
        showCheckbox: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        // 鼠标hover判断是否显示省略号
        mouseHover(e) {
            const { target } = e;
            const { clientWidth, scrollWidth, title } = target;
            if (!title && scrollWidth > clientWidth) target.title = target.innerText;
        },
        // 点击checkbox - 选中
        checkboxHandle() {
            const d = this.item;
            if (d.checked === 'checked') d.checked = 'uncheck';
            else d.checked = 'checked';
            this.$emit('check', d.id, d.checked, d);
        },
        // 展开下级
        openChildHandle() {
            const d = this.item;
            if (d.children && d.children.length) {
                const status = !d.openChild;
                d.openChild = status;

                this.$emit('open', d.id, status);
            }
        },
        // 点击图标
        iconHandle(iconName) {
            const d = this.item;
            if (iconName === 'edit') {
                d.edit = true;
                this.$nextTick(() => {
                    this.$refs.inputTag.focus();
                });
            }

            // 提交数据
            this.$emit('iconHandle', d.id, iconName);
        },
        keyup(e) {
            this.activeBlur = true; // 关闭失去焦点事件
            this.keyupEnter(e);
        },
        blur(e) {
            if (!this.activeBlur) this.keyupEnter(e);
        },
        // 回车键
        keyupEnter(e) {
            const d = this.item;
            const { value } = e.target;
            d.name = value;
            d.edit = false;
            this.$emit('enter', d);

            setTimeout(() => { this.activeBlur = false; });
        }
    }
};
</script>

<style lang="stylus">
.p-editable
    background-color $theme
    width 100%
    font-size 0
    overflow hidden
.p-editable-item
    width 100%
    .p-editable-item-title
        display inline-flex
        align-content center
        justify-content space-between
        padding-right 12px
        width 100%
        height 38px
        line-height @height
        cursor pointer
        transition background-color .3s
        &:hover
            background-color $hover-color-grey
            .p-editable-icon-handle
                opacity 1
                transform translateX(0)
        .p-editable-item-content
            display flex
            width calc(100% - 52px)
        .p-editable-item-triangle
            width 24px
            height @width
            svg
                vertical-align middle
                width 100%
                height @width
                transform rotate(90deg)
                transition transform .3s
        .p-editable-item-triangle-show
            svg
                transform rotate(180deg)
.p-editable-item-text
    padding-left 4px
    max-width calc(100% - 44px)
    color $grey-900
    .p-editable-item-text-input,
    .p-editable-item-text-span
        display block
        width 100%
        height 38px
        line-height @height
        font-size 14px
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
    .p-editable-item-text-input
        outline none
        background none
        border 0
        font-size 14px
.p-editable-icon-handle
    opacity .8
    transform translateX(52px)
    transition all .3s .36s

</style>
