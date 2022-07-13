import './index.styl';

export default {
    name: 'MButton',
    props: {
        type: {
            type: String,
            default: 'default' // default blue word
        },
        size: {
            type: String,
            default: 'medium' // large medium small
        },
        disabled: {
            type: Boolean,
            default: false
        },
        width: {
            type: [String, Number],
            default: ''
        }
    },
    data() {
        return {
        };
    },
    methods: {
        clickHandle() {
            this.$emit('click');
        }
    },
    render(h) {
        const {
            type, size, disabled, width,
            clickHandle
        } = this;
        return (
            <div class={
                [
                    'm-button',
                    `m-button-${type}`,
                    `m-button-${size}`,
                    `m-button-${disabled ? 'disabled' : 'normal'}`
                ]
            }
            type={type}
            style={{ width: `${width}px` }}
            onClick={clickHandle}
            >
                <section class="m-button-content">
                    <span class="m-button-text">{this.$slots.default}</span>
                </section>
            </div>
        );
    }
};
