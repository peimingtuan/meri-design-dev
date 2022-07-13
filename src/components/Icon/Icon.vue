<template>
    <i class="p-icon" @click="iconClick">
        <component :style="{width: height+'px', height: height+'px'}"
                   :is="handleName"
                   @mouseenter.native.stop="svgEnter"
                   @mouseleave.native.stop="svgOut"
        />
    </i>
</template>

<script>
import IconHandler from './IconHandler';

export default {
    name: 'Icon',
    components: {
        ...IconHandler
    },
    props: {
        // icon名称
        name: {
            type: String,
            default: '',
            required: true
        },
        // 颜色
        color: {
            type: String,
            default: ''
        },
        // 鼠标移入的颜色
        hoverColor: {
            type: String,
            default: ''
        },
        width: {
            type: [String, Number],
            default: '16'
        },
        height: {
            type: [String, Number],
            default: '16'
        }
    },
    data() {
        return {
            defaultColorList: [], // svg path的默认颜色
            colorProp: '' // svg path传入的颜色
        };
    },
    computed: {
        // 处理icon组件名字
        handleName() {
            // return `Icon${this.name}`;
            // return `Icon${ToUpperFirstCode(this.name.replace(/_/g, ''))}`;
            return `Icon${this.name.replace(/_/g, '').toLowerCase()}`;
        }
    },
    watch: {
        color(n, o) {
            if (n === o) return;
            if (n) this.changeColor(this.color);
            else this.resetColor(true);
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.getColorList();
            this.colorProp = this.color;
            if (this.color) this.changeColor(this.color);
        });
    },
    methods: {
        // 点击icon
        iconClick() {
            this.$emit('click');
        },
        // 获取默认颜色
        getColorList() {
            if (this.name.includes('_')) return;
            const path = this.$el.querySelectorAll('path');
            path.forEach(d => {
                this.defaultColorList.push(getComputedStyle(d, null).fill);
            });
        },
        // 修改颜色
        changeColor(color) {
            if (this.name.includes('_')) return;
            const path = this.$el.querySelectorAll('path');
            path.forEach(d => {
                d.style.fill = color;
            });
        },
        // 鼠标移入
        svgEnter() {
            if (this.hoverColor) {
                this.changeColor(this.hoverColor);
            }
        },
        // 鼠标移出
        svgOut() {
            if (this.hoverColor) this.resetColor();
        },
        // 重置颜色
        resetColor(f) {
            const colorList = this.defaultColorList;
            const path = this.$el.querySelectorAll('path');
            path.forEach((d, i) => {
                d.style.fill = f ? colorList[i] : this.colorProp;
            });
        }
    }
};
</script>

<style lang="stylus">
    .p-icon
        text-align: center
        cursor: pointer
        font-size: 0
        + .p-icon
            margin-left 8px
        svg
            vertical-align middle
            path
                transition fill .3s

</style>
