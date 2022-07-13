<template>
    <div class="p-table-cell">
        <slot v-if="render === 'custom'" :name="header.key"
              :item="{headerKey :header.key, rowIndex: itemIndex, colIndex: headerIndex, item}"
        />
        <section v-else  class="p-table-cell-wrapper">
                                    <span v-if="item[header.key].dot"
                                          class="p-table-cell-dot"
                                          :style="{backgroundColor: item[header.key].dot}"
                                    ></span>
            <span class="p-table-cell-text"
                  :style="{
                      maxWidth: `${setSpanWidth()}px`,
                      color: item[header.key].color
                  }"
                  @mouseenter="TextEllipsis"
            >{{item[header.key].text}}</span>
        </section>
    </div>
</template>

<script>
import TextEllipsis from '../../static/utils/TextEllipsis';

export default {
    name: 'MainItem',
    props: {
        render: {
            type: String,
            default: ''
        },
        colWidth: {
            type: Array,
            default: () => ([])
        },
        border: {
            type: Boolean,
            default: false
        },
        item: {
            type: Object,
            default: () => ({})
        },
        header: {
            type: Object,
            default: () => ({})
        },
        itemIndex: {
            type: Number,
            default: null
        },
        headerIndex: {
            type: Number,
            default: null
        },
        headerKey: {
            type: String,
            default: ''
        }
    },
    methods: {
        TextEllipsis,
        setSpanWidth() {
            const {
                    item, header, headerIndex,
                    colWidth, border
                } = this,
                { dot } = item[header.key];
            const dw = typeof dot === 'string' ? 10 : 0,
                thw = colWidth[headerIndex]; // th的宽度
            return (thw - 40 - dw - border);
        }
    }
};
</script>
