<template>
    <div class="p-picker-box-content p-picker-day-content">
        <div class="p-picker-day-select">
            <section class="p-picker-panel-list-box">
                <article
                        :class="[
                        'p-picker-day-text',
                        !da.multiple&&da.flag&&'p-picker-day-text-'+da.flag,
                        (yearNow===da.year&&monthNow===da.month&&dayNow===da.day&&da.flag==='n')&&'p-picker-day-text-current',
                        (!da.disabled&&da.flag==='n'&&da.selected)&&('p-picker-day-text-'+da.selected),
                        da.flag==='n'&&da.disabled&&'p-picker-day-text-'+da.disabled,
                        !da.disabled&&multiple&&da.multiple&&'p-picker-day-text-'+da.multiple
                    ]"
                        :lang="(dai+1)%7&&da.selected"
                        v-for="(da, dai) in daysArray"
                        :key="'day-'+da.day+dai"
                        @click="dayClick(da)"
                        @mouseenter="dayEnter(da)"
                >
                    <span>{{da.day}}</span>
                </article>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Day',
    props: {
        yearNow: {
            type: String,
            default: ''
        },
        monthNow: {
            type: String,
            default: ''
        },
        dayNow: {
            type: String,
            default: ''
        },
        daysArray: {
            type: Array,
            default: () => []
        },
        multiple: {
            type: Boolean,
            default: false
        },
        // 在那个面板
        panel: {
            type: String,
            default: ''
        }
    },
    methods: {
        dayClick(obj) {
            if (obj.flag !== 'n' || obj.disabled) return;
            this.$emit('change', obj, this.panel);
        },
        dayEnter(obj) {
            if (!this.multiple || obj.flag !== 'n' || obj.disabled) return;
            this.$emit('enter', obj, this.panel);
        }
    }
};
</script>

<style lang="stylus">
.p-picker-day-content
    .p-picker-panel-list-box
        display flex
        flex-wrap wrap
        width 100%

    .p-picker-day-text
        margin-right 16px
        margin-bottom 8px
        border-width 1px
        border-style solid
        border-color transparent
        border-radius 4px
        width 24px
        height 24px
        text-align center
        transition background-color .3s
        &:nth-of-type(7n)
            margin-right 0
        span
            position relative
            line-height 22px
            color $grey-900
            font-size 14px
            text-align center
            transition color .3s
            user-select none
            z-index 10
        &.p-picker-day-text-n
            cursor pointer
            &:hover
                background-color $hover-color-grey
        &.p-picker-day-text-p,
        &.p-picker-day-text-f
            span
                color $grey-400
        &.p-picker-day-text-current
            background-color $theme
            border-color $blue-500
            span
                color $blue-500
        &.p-picker-day-text-multiple
            position relative
            cursor pointer
            &::before
                position absolute
                top -1px
                left -10px
                display inline-block
                background-color $grey-200
                border-radius 0 !important
                width 40px
                height 24px
                content ''
        &.p-picker-day-text-selected
            background-color $blue-500
            &:hover
                background-color $blue-500
            span
                color $white
            &::before
                display none
        &.p-picker-day-text-disabled
            position relative
            background-color none
            border-color none
            cursor not-allowed !important
            span
                color $grey-400
            &::before
                position absolute
                top -1px
                left -1px
                display inline-block
                background-color none
                border-radius 4px
                width 24px
                height 24px
                content ''
        &.p-picker-day-text-selected:lang(selected) + .p-picker-day-text-multiple::before
            left -20px
            width 50px
            z-index -1
        &.p-picker-day-text-multiple + .p-picker-day-text-selected
            position relative
            z-index 1
            &::before
                position absolute
                top -1px
                left -10px
                display inline-block
                background-color $grey-200
                border-radius 0
                width 20px
                height 24px
                content ''
                z-index -1
            &::after
                position absolute
                top -1px
                left -1px
                display inline-block
                background-color $blue-500
                border-radius 4px
                width 24px
                height 24px
                content ''
                z-index 1
        &.p-picker-day-text-selected + .p-picker-day-text-selected
            &::before
                display none
            &::after
                display none

</style>
