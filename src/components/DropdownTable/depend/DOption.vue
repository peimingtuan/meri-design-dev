<template>
    <transition :name="position?'selectDownUpExtend':'selectDownUpExtendTop'">
        <div v-show="optionStatus"
             :class="[
                 'p-drop-content',
                  openSearch ? 'p-drop-content-search' : 'p-drop-content-normal',
                   `p-drop-content-${theme}`
             ]"
             :style="{minWidth: `${minWidth}px`,maxWidth: `${maxWidth}px`, minHeight: `${minHeight}px`, maxHeight: `${maxHeight}px`}"
             tabindex="-1"
             @wheel.stop
             @blur="dropClose"
             @mouseenter="dropEnter"
             @mouseleave="dropLeave"
            >
            <label v-if="openSearch" class="p-drop-search">
                <input class="p-drop-input"
                       type="text"
                       :placeholder="placeholder"
                       v-model="inputVal"
                       @mousedown="inputDown"
                >
                <i v-show="inputVal" class="p-drop-clear" @click="clearInput"><ClearSvg/></i>
            </label>
            <div class="p-drop-option">
                <section
                    :class="['p-drop-option-item', value===item.id&&'p-drop-option-selected', item.disabled&&'p-drop-option-disable']"
                    v-for="(item, ind) in optionData"
                    :key="`${ind}-${item.id}`"
                    @click="optionClick(item.id, item.name, item.disabled)"
                    @mouseenter="TextEllipsis"
                >
                    <i class="p-drop-option-svg" v-if="item.icon" v-html="item.icon"/>
                    <span>{{item.name}}</span>
                </section>
            </div>
        </div>
    </transition>
</template>

<script>
import ClearSvg from '../../static/iconSvg/clear2.svg';
import TextEllipsis from '../../static/utils/TextEllipsis';

export default {
    name: 'DOption',
    components: { ClearSvg },
    props: {
        parent: {
            type: Object,
            default: () => ({})
        },
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
        // 最小宽度
        minWidth: {
            type: [String, Number],
            default: ''
        },
        maxWidth: {
            type: [String, Number],
            default: ''
        },
        // 最小高度
        minHeight: {
            type: [String, Number],
            default: ''
        },
        maxHeight: {
            type: [String, Number],
            default: ''
        },
        // 主题
        theme: {
            type: String,
            default: 'light' // 可选值【light、dark】
        },
        // 通过点击或hover打开下拉列表
        trigger: {
            type: String,
            default: 'hover'
        },
        // 显示搜索
        openSearch: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: '请搜索'
        }
    },
    data() {
        return {
            position: true, // 动画执行方向
            optionStatus: false, // 下拉菜单状态
            activeClose: true, // 激活关闭
            inputVal: '', // 搜索输入的值
            optionData: [] // 列表数据
        };
    },
    watch: {
        optionStatus(n) {
            if (n) {
                setTimeout(() => {
                    this.$el.style.pointerEvents = 'auto';
                    this.$el.focus();
                }, 300);
            } else {
                this.$el.style.pointerEvents = 'none';
            }
        },
        data: {
            handler(n, o) {
                const nData = JSON.stringify(n),
                    oData = JSON.stringify(o);
                if (nData === oData) return;
                this.optionData = JSON.parse(nData);
            },
            deep: true
        },
        inputVal(n, o) {
            if (n === o) return;
            if (this.timer) clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.searchHandle(n);
            }, 300);
        }
    },
    mounted() {
        this.optionData = JSON.parse(JSON.stringify(this.data));
    },
    methods: {
        TextEllipsis,
        inputDown() {
            this.activeClose = false;
        },
        // 搜索数据
        searchHandle(str) {
            const data = JSON.parse(JSON.stringify(this.data));
            if (str) {
                this.optionData = data.filter(d => {
                    if (d.name.includes(str)) return d;
                    return null;
                });
            } else {
                this.optionData = data;
            }
        },
        // 清除输入的内容
        clearInput() {
            this.inputVal = '';
        },
        /**
         * 提交当前选择的值
         * @param id 返回值id
         * @param name 返回值name
         * @param disabled 是否禁用点击
         */
        optionClick(id, name, disabled) {
            if (disabled) return;
            this.$emit('change', id, name);
        },
        // 鼠标数去焦点
        dropClose() {
            if (!this.activeClose) return;
            this.optionStatus = false;
            this.parent.optionStatus = false;
        },
        dropEnter() {
            if (this.parent.dropTimer) clearTimeout(this.parent.dropTimer);
            if (this.dropTimer) clearTimeout(this.dropTimer);
        },
        dropLeave() {
            this.activeClose = true;
            this.$el.focus();
            if (this.trigger === 'hover') this.dropTimer = setTimeout(this.dropClose, 300);
        }
    }
};
</script>
