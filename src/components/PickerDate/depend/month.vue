<template>
    <div class="p-picker-panel-content">
        <div class="p-picker-panel-select">
            <section class="p-picker-panel-list-box">
                <article
                        :class="[
                       'p-picker-panel-text',
                       (yearNow===ma.year&&monthNow===ma.month)&&'p-picker-panel-text-current',
                       ma.multiple&&'p-picker-panel-text-'+ma.multiple,
                       ma.selected&&'p-picker-panel-text-'+ma.selected,
                       ma.disabled&&'p-picker-panel-text-'+ma.disabled,
                       ma.grey&&'p-picker-panel-text-'+ma.grey
                    ]"
                        :lang="(mai+1)%3&&ma.selected"
                        v-for="(ma, mai) in monthsArray"
                        :key="'month-'+ma.month+mai"
                        @click="monthClick(ma)"
                        @mouseenter="monthEnter(ma)"
                >
                    <span>{{ma.monthText}}</span>
                    <section v-if="ma.grey" class="p-picker-panel-text-tip">该周期内包含未来月份</section>
                </article>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Month',
    props: {
        yearNow: {
            type: String,
            default: ''
        },
        monthNow: {
            type: String,
            default: ''
        },
        monthsArray: {
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
        monthClick(obj) {
            if (obj.disabled) return;
            this.$emit('change', obj, this.panel);
        },
        monthEnter(obj) {
            if (!this.multiple || obj.disabled) return;
            this.$emit('enter', obj, this.panel);
        }
    }
};
</script>
