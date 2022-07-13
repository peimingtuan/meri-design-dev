<template>
    <div :class="['p-modal-main', 'p-modal-main-small', type&&'p-modal-main-small-svg']">
        <section class="p-modal-info-svg" v-if="type">
            <InfoBlurSvg v-if="type==='info'"/>
            <ErrorRedSvg v-else/>
        </section>
        <div class="p-modal-title" v-if="title">
            <section class="p-title-text">{{ title }}</section>
        </div>
        <div class="p-modal-content">
            <div class="p-modal-content-main" ref="modalContentMain">
                <slot name="content"/>
            </div>
        </div>
        <slot name="handle" v-if="$slots.handle"/>
    </div>
</template>

<script>
import InfoBlurSvg from '../../static/iconSvg/info_blue.svg';
import ErrorRedSvg from '../../static/iconSvg/error_red.svg';

export default {
    name: 'Small',
    components: { InfoBlurSvg, ErrorRedSvg },
    props: {
        title: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="stylus">
.p-modal-main-small
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
        height 40px
    .p-modal-content
        min-height auto

.p-modal-main-small-svg
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
