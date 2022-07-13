<template>
    <section class="p-avatar" :style="avatarPadding">
        <article
                :class="[
                    'p-avatar-content', `p-avatar-${size}`,
                     `p-avatar-${type}`,
                      `p-avatar-back-${colorType}`,
                       typeof size === 'number' && size > 32 ? 'p-avatar-large-font' : ''
                ]"
                :style="typeof size === 'number' ? customSize : ''"
        >
            <template v-if="!isSlot">
                <defaultAvatar v-if="type === 'image'"/>
                <defaultLogo v-else-if="type === 'logo'"/>
                <!--type === 'text'-->
                <span v-else class="p-avatar-default-text"
                      :style="{fontSize: typeof size === 'number' && size > 32 ? '14px' : '12px'}">赵</span>
            </template>
            <slot/>
        </article>
    </section>
</template>

<script>
import defaultAvatar from '../static/iconSvg/defaultAvatar.svg';
import defaultLogo from '../static/iconSvg/defaultLogo.svg';

export default {
    name: 'Avatar',
    components: { defaultAvatar, defaultLogo },
    props: {
        /**
             * 背景色
             * 可选值【 blue cyan turquoise green yellow orange red carmine purple 】
             */
        colorType: {
            type: String,
            default: 'blue'
        },
        /**
             * 头像内容
             * 可选值 【 logo text image 】
             */
        type: {
            type: String,
            default: 'image'
        },
        /**
             * 头像大小 medium为默认尺寸
             * 可选值【large medium small minimum other】
             */
        size: {
            type: [String, Number],
            default: 'medium'
        }
    },
    data() {
        return {
            isSlot: false
        };
    },
    computed: {
        customSize() {
            const otherStyle = {};
            if (typeof this.size === 'number') {
                const width = this.size > 32 ? (this.size - (this.size % 4)) : 32;
                otherStyle.width = `${width}px`;
                otherStyle.height = `${width}px`;
                otherStyle.borderRadius = `${width / 2}px`;
            }
            return otherStyle;
        },
        avatarPadding() {
            const targetValue = {
                large: '12px',
                medium: '8px',
                small: '8px',
                minimum: '4px'
            };
            return {
                paddingRight: targetValue[this.size]
            };
        }
    },
    mounted() {
        // 根据是否有slot处理是否显示默认头像，以及处理默认文字头像显示第一个字
        this.isSlot = Object.keys(this.$slots).length > 0;
        if (this.isSlot && this.type === 'text') {
            this.$slots.default[0].text = this.$slots.default[0].text.trim().slice(0, 1);
        }
    }
};
</script>

<style lang="stylus">
    .p-avatar
        position: relative
        display: inline-block
        padding-right: 12px

        .p-avatar-content
            display: flex
            justify-content: center
            align-items: center
            overflow: hidden

        .p-avatar-large
            width: 32px
            height: @width
            border-radius: 16px

        .p-avatar-medium
            width: 28px
            height: @width
            border-radius: 14px

        .p-avatar-small
            width: 24px
            height: @width
            border-radius: 14px

        .p-avatar-minimum
            width: 20px
            height: @width
            border-radius: 10px

        .p-avatar-back-blue
            background-color: $blue-500

        .p-avatar-back-cyan
            background-color: $cyan-500

        .p-avatar-back-turquoise
            background-color: $turquoise-500

        .p-avatar-back-green
            background-color: $green-500

        .p-avatar-back-yellow
            background-color: $yellow-500

        .p-avatar-back-orange
            background-color: $orange-500

        .p-avatar-back-red
            background-color: $red-500

        .p-avatar-back-carmine
            background-color: $carmine-500

        .p-avatar-back-purple
            background-color: $purple-500

        .p-avatar-image
            background-color: $grey-200

            svg
                width: 100%
                height: @width

            img
                display inline-block
                width 100%
                height @width

        .p-avatar-logo
            svg
                width: 100%
                height: @width

            img
                display inline-block
                width 100%
                height @width

        .p-avatar-text
            font-weight: 400
            color: $white
            line-height: 12px
            font-size 12px

        .p-avatar-large-font
            font-size 14px

</style>
