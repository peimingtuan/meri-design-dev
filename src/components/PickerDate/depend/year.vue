<template>
    <div class="p-picker-panel-content">
        <div class="p-picker-panel-select">
            <section class="p-picker-panel-list-box">
                <article
                        :class="[
                       'p-picker-panel-text',
                       yearNow===ya.year&&'p-picker-panel-text-current',
                       ya.multiple&&'p-picker-panel-text-'+ya.multiple,
                       ya.selected&&'p-picker-panel-text-'+ya.selected,
                       ya.disabled&&'p-picker-panel-text-'+ya.disabled
                    ]"
                        :lang="(yai+1)%3&&ya.selected"
                        v-for="(ya, yai) in yearsArray"
                        :key="'year-'+ya.year+'-'+yai"
                        @click="yearClick(ya)"
                        @mouseenter="yearEnter(ya)"
                >
                    <span>{{ya.year}}</span>
                </article>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Year',
    props: {
        yearNow: {
            type: String,
            default: ''
        },
        yearsArray: {
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
        yearClick(obj) {
            if (obj.disabled) return;
            this.$emit('change', obj, this.panel);
        },
        yearEnter(obj) {
            if (!this.multiple) return;
            this.$emit('enter', obj, this.panel);
        }
    }
};
</script>
