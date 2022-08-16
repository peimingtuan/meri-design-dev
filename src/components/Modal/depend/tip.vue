<template>
    <div :class="['p-modal-main', 'p-modal-main-tip', type&&'p-modal-main-tip-svg']">
        <section class="p-modal-info-svg" v-if="type">
            <InfoBlurSvg v-if="type==='info'" />
            <ErrorRedSvg v-else />
        </section>
        <div class="p-modal-title" v-if="title">
            <section class="p-title-text" v-if="customTitle"><slot name="customTitle"/></section>
            <section class="p-title-text" v-else>{{title}}</section>
        </div>
        <div class="p-modal-content">
            <div class="p-modal-content-main">
<!--                <section :class="['p-modal-content-main-text', `p-modal-content-main-text-${title ? 'has' : 'no'}-title`]">-->
                <section :class="['p-modal-content-main-text', `p-modal-content-main-text-${title ? 'has' : 'no'}-title`]">
                    <slot name="content" />
                </section>
            </div>
        </div>
        <div class="p-modal-handle" v-if="$slots.handle">
            <slot name="handle" />
        </div>
    </div>
</template>

<script>
import InfoBlurSvg from '../../static/iconSvg/info_blue.svg';
import ErrorRedSvg from '../../static/iconSvg/error_red.svg';

export default {
    name: 'Tip',
    components: { InfoBlurSvg, ErrorRedSvg },
    props: {
        title: {
            type: String,
            default: ''
        },
        customTitle:{
            type:Boolean,
            default:false
        },
        type: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="stylus">
.p-modal-main-tip
  top 120px
  left 50%
  margin-left -210px
  border-radius 4px
  width 420px
  .p-modal-info-svg
    width 24px
    height 24px
    svg
        width 24px
        height 24px
  .p-modal-title
    border 0
  .p-modal-content
    width calc(100% - 32px)
    min-height auto
    .p-modal-content-main-text
        margin-top 24px
        font-size 14px
        color $grey-900
        line-height 22px
    .p-modal-content-main-text-has-title
        margin-top 8px
        color $grey-600
    .p-modal-content-main-text-no-title
        font-size 16px
        //font-weight 600
.p-modal-main-tip-svg
    position relative
    .p-modal-info-svg
        position absolute
        top 24px
        left 32px
    .p-modal-title
        padding-top 8px
        padding-left 72px
    .p-modal-content
        padding-left 72px

</style>
