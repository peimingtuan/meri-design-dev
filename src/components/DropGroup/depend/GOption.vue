<template>
    <transition :name="position?'selectDownUpExtend':'selectDownUpExtendTop'">
        <div
                tabindex="-1"
                ref="groupOption"
                :class="['p-drop-group-box', `p-drop-group-box-${theme}`]"
                v-show="optionStatus"
                @blur="dropOptionBlur"
                @mouseenter="mouseenterHandle"
                @mouseleave="mouseleaveHandle"
                @wheel.stop
        >
            <div v-for="group in data" :key="group.id">
                <section class="p-drop-item-title">{{group.name}}</section>
                <article
                        :class="['p-drop-group-option', value===item.id&&'p-drop-group-option-selected', item.disabled&&'p-drop-group-option-disable']"
                        v-for="item in group.children"
                        :key="item.id"
                        @click="optionClick(group.id, item.id, item.name, item.disabled)"
                        @mouseenter="optionEnter"
                >{{item.name}}</article>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'DOption',
    props: {
        parent: {
            type: Object,
            default: () => ({})
        },
        /**
         * 数据列表
         */
        data: {
            type: Array,
            default: () => [],
            required: true
        },
        /**
         * 绑定的v-model值
         */
        value: {
            type: [String, Number],
            default: ''
        },
        // 主题
        theme: {
            type: String,
            default: 'light' // 可选值【light、dark】
        }
    },
    data() {
        return {
            position: true, // 动画执行方向
            optionStatus: false // 下拉菜单状态
        };
    },
    watch: {
        optionStatus(n) {
            if (n) {
                this.$nextTick(() => {
                    this.$refs.groupOption.focus();
                    setTimeout(() => { this.$refs.groupOption.style.pointerEvents = 'auto'; }, 300);
                });
            } else {
                this.$refs.groupOption.style.pointerEvents = 'none';
            }
        }
    },
    methods: {
        /**
         * 提交当前选择的值
         * @param pId parentId
         * @param cId childId
         * @param cName childName
         * @param disabled 是否禁用点击
         */
        optionClick(pId, cId, cName, disabled) {
            if (disabled) return;
            this.$emit('change', { cId, cName, pId });
        },
        optionEnter(e) {
            const { target } = e;
            const { clientWidth, scrollWidth, title } = target;
            if (!title && scrollWidth > clientWidth) target.title = target.innerText;
        },
        // 鼠标数去焦点
        dropOptionBlur() {
            this.optionStatus = false;
            this.parent.optionStatus = false;
        },
        mouseenterHandle() {
            if (this.parent.timer) clearTimeout(this.parent.timer);
            if (this.timer) clearTimeout(this.timer);
        },
        mouseleaveHandle() {
            if (this.trigger === 'hover') {
                this.timer = setTimeout(this.dropOptionBlur, 300);
            }
        }
    }
};
</script>
