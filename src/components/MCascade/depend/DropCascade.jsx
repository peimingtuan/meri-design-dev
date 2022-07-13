import './style.styl';

import UlCascade from './UlCascade';

export default {
    name: 'DropCascade',
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
        selectedIds: {
            type: Array,
            default: () => []
        },
        // ul窗宽
        width: {
            type: [String, Number],
            default: 300
        }
    },
    data() {
        return {
            position: true,
            dropShow: false,
            activeBlur: false // 激活关闭
        };
    },
    watch: {
        dropShow(n) {
            if (!n) return;
            this.$nextTick(() => {
                this.$el.focus();
            });
        }
    },
    methods: {
        change(item, way) {
            this.$emit('change', item, way);
        },
        blur() {
            if (!this.activeBlur) return;
            this.$emit('close', false);
        },
        enter() {
            this.activeBlur = false;
        },
        leave() {
            this.activeBlur = true;
            this.$nextTick(() => {
                this.$el.focus();
            });
        }
    },
    render(h) {
        const {
            trigger, width, selectedIds, data, position, dropShow,
            change, blur, enter, leave
        } = this;

        return (
            <transition name={position ? 'selectDownUpExtend' : 'selectDownUpExtendTop'}>
                <div v-show={dropShow}
                    class={[
                        'm-drop-cascade',
                        `m-drop-cascade-${position ? 'bottom' : 'top'}`
                    ]}
                    tabIndex="-1"
                    onBlur={blur}
                    onMouseenter={enter}
                    onMouseleave={leave}
                >
                    {
                        data.map((item, i) => (
                            (item.data && item.data.length > 0) && (
                                <UlCascade
                                    trigger={trigger}
                                    width={width}
                                    key={item.ul}
                                    data={item.data}
                                    selectedId={selectedIds[i]}
                                    onChange={change}
                                />
                            )
                        ))
                    }
                </div>
            </transition>
        );
    }
};
