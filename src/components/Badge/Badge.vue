<template>
    <div class="p-badge" :title="countTitle" @click="handleClick">
        <div>
            <!-- @slot html内容 -->
            <slot />
        </div>
        <div
                v-if="typeof dot==='string'"
                class="p-badge-normal p-badge-dot"
                :style="{backgroundColor: bgColor}"
        >
        </div>
        <div
                v-else-if="contentArr.length&&contentArr[0]>0"
                class="p-badge-normal"
                :style="{backgroundColor: bgColor}"
        >
            <section class="p-badge-text" v-if="contentArr.length<3">
                <article class="p-badge-figure" v-if="contentArr[0]" :style="{transform: `translate3d(0,-${contentArr[0]*18}px,0)`}">
                    <span v-for="n1 in figure" :key="'n1-'+n1">{{n1}}</span>
                </article>
                <article class="p-badge-figure" v-if="contentArr[1]" :style="{transform: `translate3d(0,-${contentArr[1]*18}px,0)`}">
                    <span v-for="n2 in figure" :key="'n2-'+n2">{{n2}}</span>
                </article>
                <article class="p-badge-add" v-if="contentArr[2]">+</article>
            </section>
            <section class="p-badge-text" v-else>
                <article class="p-badge-figure">
                    <span>9</span>
                </article>
                <article class="p-badge-figure">
                    <span>9</span>
                </article>
                <article class="p-badge-add">+</article>
            </section>
        </div>
        <div
                v-else-if="contentStr"
                class="p-badge-normal"
                :style="{backgroundColor: bgColor}"
        >
            <section class="p-badge-str">{{contentStr}}</section>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Badge',
    props: {
        /**
         * 右上角显示内容
         */
        content: {
            type: [Number, String],
            default: ''
        },
        /**
         * 是否显示圆点
         */
        dot: {
            type: String
        },
        /**
         * 背景颜色
         */
        bgColor: {
            type: String,
            default: '#f54e45'
        }
    },
    data() {
        return {
            // 当前内容-数字数组
            contentArr: [],
            // 当前内容-字符
            contentStr: ''
        };
    },
    computed: {
        // 数字列表
        figure() {
            return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        },
        // 鼠标hover显示title
        countTitle() {
            if (this.contentArr > 100) return this.content;
            return '';
        }
    },
    watch: {
        // 监听内容发生改变
        content: {
            handler(n, o) {
                if (n === o) return;
                this.setContent(n);
            },
            immediate: true
        }
    },
    methods: {
        // 设置内容显示
        setContent(n) {
            // eslint-disable-next-line no-restricted-globals
            if (isNaN(n)) {
                // 表示是纯字符
                this.contentArr = [];
                this.contentStr = n;
            } else {
                // 表示是数字
                this.contentStr = '';
                const strNum = typeof n === 'number' ? String(n) : n;
                this.contentArr = strNum.split('');
            }
        },
        /**
         * 点击事件
         */
        handleClick() {
            /**
             * 点击事件
             * @type Function
             */
            this.$emit('click');
        }
    }
};
</script>

<style lang="stylus">
    .p-badge
        position relative
        display inline-block
        cursor pointer
        &+.p-badge
            margin-left 20px
        .p-badge-normal
            position absolute
            top 0
            right 0
            transform translate(50%, -50%)
            border-radius 9px
            height 18px
            text-align center
            color $white
            z-index 10
            &.p-badge-dot
                padding 0
                width 8px
                height 8px
            .p-badge-text
                display flex
                align-items flex-start
                justify-content center
                padding-left 4px
                padding-right 4px
                min-width 18px
                height 18px
                overflow-y hidden
                .p-badge-figure
                    height 180px
                    text-align center
                    transition transform .3s
                    span
                        display block
                        width 7px
                        height 18px
                        line-height @height
                        font-size 12px
                        text-align center
                .p-badge-add
                    width 7px
                    height 18px
                    line-height @height
                    font-size 12px
            .p-badge-str
                padding-left 4px
                padding-right 4px
                height 18px
                line-height @height
                font-size 12px

</style>
