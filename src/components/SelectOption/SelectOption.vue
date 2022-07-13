<template>
    <section class="p-select-option" v-show="data&&data.length">
        <article
                v-for="item in data"
                :key="item.id"
                :class="['p-select-option-item', selectedId===item.id&&'p-select-option-item-selected', item.disabled&&'p-select-option-item-disabled']"
                @click="optionClick(item)"
                @mouseenter="optionEnter"
                v-html="item.name"
        />
    </section>
</template>

<script>
export default {
    name: 'SelectOption',
    props: {
        /**
             * 绑定的v-model值
             */
        selectedId: {
            type: String,
            default: ''
        },
        /**
             * 下拉列表数据
             */
        data: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        // 提交当前选择的值
        optionClick({ id, disabled }) {
            if (disabled) return;
            this.$emit('click', id);
        },
        // 子项鼠标移入
        optionEnter(e) {
            const { target } = e;
            const { clientWidth, scrollWidth, title } = target;
            if (!title && scrollWidth > clientWidth) target.title = target.innerText;
        }
    }
};
</script>

<style lang="stylus">

@import "../static/stylus/select/selectOption.styl"

.p-select-option
    .p-select-option-item
        &.p-select-option-item-selected
            color $blue-500
            background-color $blue-100
        &.p-select-option-item-disabled
            color $grey-400
            cursor not-allowed

</style>
