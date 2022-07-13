<template>
    <div
            :class="['p-modal-main', 'p-modal-main-not-full', 'p-modal-main-'+mode]"
            :style="{left: modalMainLeft+'px', top: modalMainTop+'px'}"
    >
        <div class="p-modal-title">
            <section class="p-title-text">{{title}}</section>
            <i class="p-modal-title-icon" @click="$emit('close')">
                <Close />
            </i>
        </div>
        <div :id="componentId"
             class="p-modal-content p-modal-content-max-height" :class="[`p-modal-content-${mode}`]"
             ref="modalContentMain"
            >
            <slot name="default" />
        </div>
        <div :class="['p-modal-handle', handleShadow&&'p-modal-handle-shadow']" v-if="$slots.handle">
            <slot name="handle" />
        </div>
    </div>
</template>

<script>
import Close from '../../static/iconSvg/icon_close.svg';
import DomObserver from '../../static/utils/DomObserver';

export default {
    name: 'Default',
    components: { Close },
    props: {
        title: {
            type: String,
            default: '',
            required: true
        },
        mode: {
            type: String,
            default: 'default'
        },
        // 当前组件的id，具有唯一性
        componentId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            modalMainLeft: 0, // 内容距离左边位置
            modalMainTop: 120, // 内容距离顶部位置
            handleShadow: false // 操作区按钮投影
        };
    },
    mounted() {
        this.countPos();
        window.addEventListener('resize', this.countPos);

        this.addMutationObserver();
    },
    methods: {
        // 动态计算弹窗
        countPos() {
            const bodyWidth = window.innerWidth,
                bodyHeight = window.innerHeight,
                contentHeight = bodyHeight - 248;
            this.$nextTick(() => {
                const mc = this.$refs.modalContentMain;
                if (!mc) return;
                const { mode } = this;
                let modalContentWidth,
                    modalMainTop;
                switch (mode) {
                case 'small':
                    modalContentWidth = 420;
                    break;
                case 'middle':
                    modalContentWidth = 840;
                    break;
                case 'large':
                    modalContentWidth = 1260;
                    break;
                case 'default':
                    modalContentWidth = 600;
                    break;
                default:
                    modalContentWidth = 0;
                    break;
                }
                const modalContentHeight = mc.clientHeight;
                this.modalMainLeft = (bodyWidth - modalContentWidth) / 2;
                const top = (bodyHeight - modalContentHeight - 161) / 2;
                if (top > 60 && top < 120) modalMainTop = top;
                else if (top <= 60) modalMainTop = 60;
                else modalMainTop = 120;
                this.modalMainTop = modalMainTop;

                this.handleShadow = modalContentHeight > contentHeight - 32;
            });
        },
        // 注册dom观察器
        addMutationObserver() {
            const { $refs: { modalContentMain: ele } } = this;
            this.observer = DomObserver({
                ele,
                cb: this.modalContentMainResize
            });
        },
        // 观察器回调
        modalContentMainResize(mutationsList) {
            mutationsList.forEach(mutation => {
                if (mutation.type === 'attributes') this.countPos();
            });
        }
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.countPos);
        if (this.observer) this.observer.close();
    }
};
</script>

<style lang="stylus">
.p-modal-main-not-full
    border-radius 4px
.p-modal-main-default
    width 600px
    min-height 288px
.p-modal-main-small
    width 420px
    //min-height 206px
.p-modal-main-middle
    width 840px
    //min-height 592px
.p-modal-main-large
    width 1260px
    //min-height 400px

</style>
