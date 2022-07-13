<template>
    <transition name="fadeDownUpUi">
        <div v-show="visible" :class="`p-message p-message-${type}`">
            <section class="p-message-hint">
                <HintInfo v-if="type==='info'" />
                <HintSuccess v-else-if="type==='success'" />
                <HintWaring v-else-if="type==='warning'" />
                <HintError v-else />
            </section>
            <section class="p-message-text">{{message}}</section>
            <section class="p-message-close" @click="closeNode"><IconClose /></section>
        </div>
    </transition>
</template>

<script>
import IconClose from '../static/iconSvg/icon_close_white.svg';
import HintError from '../static/iconSvg/hint_error.svg';
import HintInfo from '../static/iconSvg/hint_info.svg';
import HintSuccess from '../static/iconSvg/hint_success.svg';
import HintWaring from '../static/iconSvg/hint_waring.svg';

export default {
    name: 'Message',
    components: {
        IconClose,
        HintError,
        HintInfo,
        HintSuccess,
        HintWaring
    },
    data() {
        return {
            type: 'info',
            message: '',
            visible: false
        };
    },
    methods: {
        // 移除当前节点
        closeNode() {
            this.$el.style.transition = 'all .3s';
            this.$el.style.opacity = '.5';
            this.$el.style.marginTop = '0';
            this.$el.style.transform = 'translateY(-100%)';
            this.$destroy();
            setTimeout(() => {
                this.$el.parentNode.removeChild(this.$el);
                if (this.cb) this.cb();
            }, 300);
        }
    }
};
</script>

<style lang="stylus">
    @import "../static/stylus/animate/fadeDownUpUi.styl"

    .p-message
        display flex
        justify-content space-around
        align-items flex-start
        padding 8px 8px 8px 12px
        border-radius 4px
        box-shadow $box-shadow-bottom
        min-width 240px
        max-width 600px
        min-height 40px
        & + .p-message
            margin-top 24px
        .p-message-hint
            line-height 24px
            font-size 0
            svg
                vertical-align middle
                width 16px
                height 16px
        .p-message-text
            padding-left 8px
            padding-right 8px
            width 100%
            text-align left
            font-size 14px
            color $white
            word-wrap break-word
            line-height 24px
        .p-message-close
            height 24px
            line-height @height
            pointer-events auto
            font-size 0
            svg
                vertical-align middle
                width 12px
                opacity .5
                transition opacity .3s
                cursor pointer
                &:hover
                    opacity 1
    .p-message-info
        background-color $blue-500
    .p-message-success
        background-color $turquoise-500
    .p-message-warning
        background-color $orange-400
    .p-message-error
        background-color $red-400

</style>
