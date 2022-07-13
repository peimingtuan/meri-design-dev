<template>
    <div class="p-modal-main p-modal-main-full">
        <div class="p-modal-title">
            <div class="p-title-text p-title-full-text">{{title}}</div>
            <div class="p-left-handle">
                <slot name="handle"/>
            </div>
            <i class="p-modal-title-icon" @click="$emit('close')">
                <Close />
            </i>
        </div>
        <div :id="componentId" class="p-modal-content p-modal-content-full">
            <div class="p-modal-content-main" ref="modalContentMain">
                <slot name="content" />
            </div>
        </div>
    </div>
</template>

<script>
import Close from '../../static/iconSvg/icon_close.svg';

export default {
    name: 'Full',
    components: { Close },
    props: {
        title: {
            type: String,
            default: '',
            required: true
        },
        // 当前组件的id，具有唯一性
        componentId: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="stylus">
    .p-modal-main-full
        width 100%
        .p-title-full-text
            width 50%
        .p-left-handle
            display flex
            align-items center
            justify-content flex-end
            padding-right 16px
            width 50%
            text-align right
            vertical-align middle

</style>
