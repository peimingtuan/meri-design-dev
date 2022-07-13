import './index.styl';

export default {
    name: 'Toggle',
    props: {
        // 绑定的值
        value: {
            type: Boolean,
            default: false
        },
        // 是否禁用
        disable: {
            type: Boolean,
            default: false
        }
    },
    model: {
        props: 'value',
        event: 'change'
    },
    methods: {
        // 开关切换回调
        handleToggle(e) {
            e.stopPropagation();
            if (!this.disable) this.$emit('change', !this.value);
            e.preventDefault();
        }
    },
    render(h) {
        const {
            value, disable,
            handleToggle
        } = this;
        return (
            <label class={
                [
                    'p-toggle',
                    value ? 'p-toggle-on' : 'p-toggle-off',
                    disable && (value ? 'p-toggle-disable-on' : 'p-toggle-disable-off')
                ]
            }
            onClick={handleToggle}
            >
                <input type="checkbox" value={value}/>
            </label>
        );
    }
};
