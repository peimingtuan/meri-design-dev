<template>
    <div :class="['p-shake', activateStatus&&'p-shake-activate']">
        <!-- @slot html内容 -->
        <slot/>
    </div>
</template>

<script>
export default {
    name: 'Shake',
    props: {
        /**
         * 激活状态
         * @type Boolean, String, Number
         * 说明 ‘若果类型为Boolean且值为true，会一直抖动；若果类型为String、Number，当值改变的时候会抖动一次’
         */
        activate: {
            type: [Boolean, String, Number],
            default: false
        }
    },
    data() {
        return {
            // 上一个状态值
            activateStatus: null
        };
    },
    created() {
        // 初始化状态
        this.setActivate(this.activate);
    },
    watch: {
        // 监听状态改变
        activate(n, o) {
            if (n === o) return;
            this.setActivate(n);
        }
    },
    methods: {
        // 设置状态
        setActivate(n) {
            const tpf = typeof n;
            if (tpf === 'boolean') {
                this.activateStatus = n;
            } else {
                if (n !== this.activateStatus) {
                    this.activateStatus = n;
                    setTimeout(() => {
                        this.activateStatus = null;
                    }, 1800);
                }
            }
        }
    }
};
</script>

<style lang="stylus">
    .p-shake
        display inline-block
    .p-shake-activate
        animation shake 1.8s infinite ease-in-out
    @keyframes shake
        0%
            transform rotate(0)
        5%
            transform rotate(2deg)
        10%
            transform rotate(-2deg)
        15%
            transform rotate(4deg)
        20%
            transform rotate(-4deg)
        25%
            transform rotate(6deg)
        30%
            transform rotate(-6deg)
        35%
            transform rotate(8deg)
        40%
            transform rotate(-8deg)
        45%
            transform rotate(10deg)
        50%
            transform rotate(-10deg)
        55%
            transform rotate(10deg)
        60%
            transform rotate(-10deg)
        65%
            transform rotate(8deg)
        70%
            transform rotate(-8deg)
        75%
            transform rotate(6deg)
        80%
            transform rotate(-6deg)
        85%
            transform rotate(4deg)
        90%
            transform rotate(-4deg)
        95%
            transform rotate(2deg)
        100%
            transform rotate(-2deg)

</style>
