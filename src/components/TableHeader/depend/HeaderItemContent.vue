<template>
    <section class="p-table-header-text">
        <span class="p-table-header-span"
              :style="{maxWidth: !isChild && `${setSpanWidth()}px`, color: header.color}"
              @mouseenter="TextEllipsis"
        >{{header.text}}</span>
        <!-- 筛选 -->
        <template
            v-if="header.screen&&header.screen.open&&header.screen.data&&header.screen.data.length"
        >
            <SelectScreen
                :icon="header.screen.icon"
                :status="header.screen.status"
                :selectedId="header.screen.selectId"
                :selectName="header.screen.selectName"
                :data="header.screen.data"
                @change="screenChange([header, ...arguments])"
            />
        </template>
        <!-- 排序 -->
        <span
            v-if="header.sort && header.sort.open"
            :class="['p-table-header-sort', disableSort&&'p-table-header-sort-disabled']"
            >
                <SortSvg :class="[header.sort.status === 'seq' && 'p-table-header-sort-active']"
                         @click.native.stop="sortHandle('seq')"
                />
                <SortSvg :class="['p-table-header-sort-triangle', header.sort.status === 'ord' && 'p-table-header-sort-active']"
                         @click.native.stop="sortHandle('ord')"
                />
        </span>
        <!-- 提示 -->
        <span class="p-table-header-note"
              v-if="header.tip && header.tip.open"
              :ref="`refTrigger${index}`"
              @mouseenter="noteEnter(header.tip)"
              @mouseleave="noteLeave"
            >
            <NoteSvg :ref="`countTag${index}`" :class="[header.tip&&header.tip.iconColor&&`p-table-header-note-${header.tip.iconColor}`]" />
        </span>
    </section>
</template>

<script>
import NoteSvg from '../../static/iconSvg/action/note.svg';
import SortSvg from '../../static/iconSvg/sort.svg';
import SelectScreen from '../../SelectScreen';
import TextEllipsis from '../../static/utils/TextEllipsis';
import PopoverTip from '../../PopoverTip';

export default {
    name: 'HeaderItemContent',
    components: {
        NoteSvg,
        SortSvg,
        SelectScreen
    },
    props: {
        index: {
            type: Number,
            default: null
        },
        header: {
            type: Object,
            default: () => ({})
        },
        colWidth: {
            type: Array,
            default: () => ([])
        },
        // 显示所有边框
        border: {
            type: Boolean,
            default: false
        },
        disableSort: {
            type: Boolean,
            default: false
        },
        // 是否是子级
        isChild: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        TextEllipsis,
        // 设置文字宽度
        setSpanWidth() {
            const {
                    header, index, colWidth, border
                } = this,
                { screen, sort, tip } = header;
            const status = [
                    screen && screen.open && screen.data && screen.data.length,
                    sort && sort.open,
                    tip && tip.open
                ],
                trueLen = status.filter(d => d).length,
                pw = 40, // padding所占宽度
                ow = trueLen * 24, // 图标所占宽度
                thw = colWidth[index]; // th的宽度
            return (thw - pw - ow - border);
        },
        // 排序函数
        sortHandle(val) {
            const { header, disableSort } = this;
            if (disableSort) return;
            const {
                key, sort: {
                    status, closeDefault = false, event, func, open, type
                }
            } = header;
            let st;
            if (status === val && !closeDefault) st = '';
            else st = val;
            const sort = {
                status: st,
                closeDefault,
                event,
                func,
                open,
                type
            };
            if (event && func) header.sort.func(st, type, key);
            this.$set(header, 'sort', sort);
        },
        // 筛选值改变
        screenChange([header, icon, id, selectedData]) {
            const { key, parentKey, screen: { status } } = header;
            if (status.includes('single')) {
                header.screen.selectId = id;
                header.screen.selectName = selectedData.name;
            }
            header.screen.func(status, key, id, selectedData, icon, parentKey);
        },
        noteEnter({ open, text }) {
            if (!open || !text) return;
            const { index } = this;
            if (this[`popoverTip${index}`]) {
                if (this[`timer${index}`]) this.clearTimer();
                else {
                    this[`timerEnter${index}`] = setTimeout(() => {
                        this[`popoverTip${index}`].content = text;
                        PopoverTip.resetPosition(this[`popoverTip${index}`]);
                        clearTimeout(this[`timerEnter${index}`]);
                        this[`timerEnter${index}`] = null;
                    }, 300);
                }
            } else {
                this[`timerEnter${index}`] = setTimeout(() => {
                    const { $refs } = this,
                        refTrigger = $refs[`refTrigger${index}`],
                        countTag = $refs[`countTag${index}`];
                    this[`popoverTip${index}`] = PopoverTip({
                        tag: refTrigger, // 触发器
                        countTag, // 数字标签
                        propsData: {
                            split: false,
                            theme: 'dark',
                            content: text
                        }
                    }).$on('popoverTipHandle', (str) => {
                        // str 值可选范围 enter leave
                        if (str === 'enter') this.clearTimer();
                        else this.setTimer();
                    });

                    this[`popoverTip${index}`].$nextTick(() => {
                        PopoverTip.resetPosition(this[`popoverTip${index}`]);
                    });
                    clearTimeout(this[`timerEnter${index}`]);
                    this[`timerEnter${index}`] = null;
                }, 300);
            }
        },
        setTimer() {
            const { index } = this;
            this[`timer${index}`] = setTimeout(() => {
                this[`popoverTip${index}`].show = false;
                this.clearTimer();
            }, 300);
        },
        clearTimer() {
            const { index } = this;
            clearTimeout(this[`timer${index}`]);
            this[`timer${index}`] = null;
        },
        noteLeave() {
            const { index } = this;
            if (this[`timerEnter${index}`]) {
                clearTimeout(this[`timerEnter${index}`]);
                return;
            }
            if (this[`popoverTip${index}`]) this.setTimer();
        }
    },
    beforeDestroy() {
        const { index } = this;
        if (this[`timerEnter${index}`]) clearTimeout(this[`timerEnter${index}`]);
        if (this[`popoverTip${index}`]) PopoverTip.remove(this[`popoverTip${index}`]);
    }
};
</script>
