<template>
    <transition :name="position?'selectDownUpExtend':'selectDownUpExtendTop'">
        <div
                tabindex="-1"
                ref="groupOption"
                :class="['p-drop-frame-box', divider && 'p-drop-frame-box-divider', `p-drop-frame-box-${theme}`]"
                v-show="optionStatus"
                @blur="dropOptionBlur"
                @mouseenter="mouseenterHandle"
                @mouseleave="mouseleaveHandle"
                @wheel.stop
        >
            <div class="p-drop-frame-search" v-if="search">
                <i class="p-drop-frame-svg p-drop-frame-search-svg"><SearchSvg /></i>
                <input type="text" v-model="inputText" :placeholder="placeholder" />
                <i v-show="inputText" class="p-drop-frame-svg p-drop-frame-close-svg" @click="clearInput"><DeleteIcon/></i>
            </div>
            <template v-if="search && searchData.length">
                <div v-for="group in searchData" :key="group.id">
                    <section class="p-drop-frame-item-title"
                             :class="[
                                 !divider && 'p-drop-frame-item-title-can',
                                 (!divider && selectedId===group.id) && 'p-drop-frame-item-title-selected'
                             ]"
                             @click="optionTitleClick(group.id, group.name)"
                    >{{group.name}}</section>
                    <article
                        :class="['p-drop-frame-option', selectedId===item.id&&'p-drop-frame-option-selected', item.disabled&&'p-drop-frame-option-disable']"
                        v-for="item in group.children"
                        :key="item.id"
                        @click="optionClick(item.id, item.name, item.disabled)"
                        @mouseenter="optionEnter"
                        v-html="item.name"
                    />
                </div>
            </template>
            <template v-else>
                <div v-for="group in data" :key="group.id">
                    <section class="p-drop-frame-item-title"
                             :class="[
                                 !divider && 'p-drop-frame-item-title-can',
                                 (!divider && selectedId===group.id) && 'p-drop-frame-item-title-selected'
                             ]"
                             @click="optionTitleClick(group.id, group.name)"
                    >{{group.name}}</section>
                    <article
                        :class="['p-drop-frame-option', selectedId===item.id&&'p-drop-frame-option-selected', item.disabled&&'p-drop-frame-option-disable']"
                        v-for="item in group.children"
                        :key="item.id"
                        @click="optionClick(item.id, item.name, item.disabled)"
                        @mouseenter="optionEnter"
                    >{{item.name}}</article>
                </div>
            </template>
        </div>
    </transition>
</template>

<script>
import SearchSvg from '../../static/iconSvg/search.svg';
import DeleteIcon from '../../static/iconSvg/delete_icon.svg';
import AddClassNameForText, { GetSameItem } from '../../MSelect/depend/AddClassNameForText';

export default {
    name: 'DFrameOption',
    components: { SearchSvg, DeleteIcon },
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
        selectedId: {
            type: [String, Number],
            default: ''
        },
        // 主题
        theme: {
            type: String,
            default: 'light' // 可选值【light、dark】
        },
        // 分割线
        divider: {
            type: Boolean,
            default: false
        },
        // 搜索
        search: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: '搜索'
        }
    },
    data() {
        return {
            position: true, // 动画执行方向
            optionStatus: false, // 下拉菜单状态
            activeClose: true,
            inputText: '',
            searchData: [] // 搜索的数据
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
        },
        inputText(n, o) {
            if (n === o) return;
            if (this.timer) clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.searchHandle(n);
            }, 300);
        }
    },
    methods: {
        /**
         * 提交当前选择的值
         * @param id childId
         * @param name childName
         * @param disabled 是否禁用点击
         */
        optionClick(id, name, disabled) {
            if (disabled) return;
            this.$emit('change', { id, name });
        },
        optionTitleClick(id, name) {
            if (this.divider) return;
            this.$emit('change', { id, name });
        },
        optionEnter(e) {
            const { target } = e;
            const { clientWidth, scrollWidth, title } = target;
            if (!title && scrollWidth > clientWidth) target.title = target.innerText;
        },
        // 鼠标数去焦点
        dropOptionBlur() {
            if (!this.activeClose) return;
            this.optionStatus = false;
            const { parent } = this;
            parent.optionStatus = false;
        },
        mouseenterHandle() {
            this.activeClose = false;
            if (this.parent.timer) clearTimeout(this.parent.timer);
            if (this.timer) clearTimeout(this.timer);
        },
        mouseleaveHandle() {
            this.activeClose = true;
            this.$refs.groupOption.focus();
            if (this.trigger === 'hover') {
                this.timer = setTimeout(this.dropOptionBlur, 300);
            }
        },
        searchHandle(val) {
            if (val) {
                this.searchData = JSON.parse(JSON.stringify(this.data)).map(d => {
                    const { children } = d;
                    if (children && children.length) {
                        d.children = children.filter(d2 => {
                            if (!d2.disabled && GetSameItem(d2.name, val)) {
                                d2.name = AddClassNameForText(d2.name, val, 'p-drop-frame-option-text-highlight');
                                return d2;
                            }
                            return null;
                        });
                    }
                    return d;
                });
            } else {
                this.searchData = [];
            }
        },
        clearInput() {
            this.inputText = '';
        }
    },
    beforeDestroy() {
        if (this.timer) clearTimeout(this.timer);
    }
};
</script>
