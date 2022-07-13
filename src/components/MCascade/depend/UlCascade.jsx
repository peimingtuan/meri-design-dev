import './style.styl';
import Arrow from '../../static/iconSvg/arrow_right2.svg';

import TextEllipsis from '../../static/utils/TextEllipsis';

export default {
    name: 'UlCascade',
    props: {
        // 下拉列表菜单展开的触发方式
        trigger: {
            type: String,
            default: 'hover'
        },
        data: {
            type: Array,
            default: () => []
        },
        selectedId: {
            type: [String, Number],
            default: ''
        },
        // ul窗宽
        width: {
            type: [String, Number],
            default: 300
        }
    },
    data() {
        return {
        };
    },
    watch: {},
    methods: {
        liClick(item) {
            if (item.disabled) return;
            const { trigger } = this,
                { children } = item;
            if (trigger === 'click') {
                // 下拉列表展开方式为click，当有children时就是展开下级
                if (children && children.length) this.$emit('change', item, 'hover');
                else this.$emit('change', item, 'click');
            } else {
                if (children && children.length) return;
                this.$emit('change', item, 'click');
            }
        },
        liEnter(item) {
            if (this.timer) clearTimeout(this.timer);
            if (item.disabled) return;
            this.timer = setTimeout(() => {
                const { trigger } = this;
                if (trigger === 'click') return;
                this.$emit('change', item, 'hover');
            }, 300);
        },
        ulLeave() {
            if (this.timer) clearTimeout(this.timer);
        }
    },
    render(h) {
        const {
            width, data, selectedId, liClick, liEnter, ulLeave
        } = this;
        return (
            <div class="m-ul-cascade" style={{ width: `${width}px` }} onMouseleave={ulLeave}>
                {
                    data.map(item => (
                        <div class={[
                            'm-li-cascade', (selectedId === item.id) && 'm-li-cascade-active', item.disabled && 'm-li-cascade-disabled'
                        ]}
                        onClick={() => liClick(item)}
                        onMouseenter={() => liEnter(item)}
                        >
                            <section class="m-li-cascade-name" onMouseenter={TextEllipsis}>{item.name}</section>
                            {(item.children && item.children.length) && <section class="m-li-cascade-arrow"><Arrow/></section>}
                        </div>
                    ))
                }
            </div>
        );
    }
};
