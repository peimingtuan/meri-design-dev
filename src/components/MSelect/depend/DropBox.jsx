import TextEllipsis from '../../static/utils/TextEllipsis';

import SelectCheckbox from '../../SelectCheckbox';

export default {
    name: 'DropBox',
    props: {
        width: {
            type: [String, Number],
            default: ''
        },
        // 默认为true 居左对齐
        alignRight: {
            type: Boolean,
            default: true
        },
        // 单选还是多选
        multiple: {
            type: Boolean,
            default: false
        },
        // 选中的id
        selectedId: {
            type: [Number, String, Array]
        },
        data: {
            type: Array,
            default: () => []
        },
        // 容纳最大数量
        maxCount: {
            type: [String, Number],
            default: 5
        }
    },
    data() {
        return {
            position: true, // 弹出方式
            dropShow: false, // 是否显示
            confirmDisable: true, // 确定按钮禁用
            selectedData: [], // 选中的数据
            selectedDataHistory: [] // 选中的历史数据
        };
    },
    computed: {
        dropData: {
            get() {
                return this.data;
            },
            set(newData) {
                return newData;
            }
        }
    },
    watch: {
        dropShow(n, o) {
            if (n === o) return;
            const { confirmDisable, selectedDataHistory } = this;
            if (n || confirmDisable) return;
            setTimeout(() => {
                this.selectedData = JSON.parse(JSON.stringify(selectedDataHistory));
                this.confirmDisable = true;
                const ids = selectedDataHistory.map(d => d.id);
                this.dropData = this.data.map(d => {
                    if (ids.includes(d.id)) d.checked = 'checked';
                    else d.checked = 'uncheck';
                    return d;
                });
            }, 300);
        }
    },
    mounted() {
        const { multiple, data, selectedId = [] } = this;
        const selectedData = multiple ? data.filter(d => selectedId.includes(d.id)) : data.find(d => d.id === selectedId);
        if (selectedData) {
            this.selectedData = selectedData;
            this.selectedDataHistory = JSON.parse(JSON.stringify(selectedData));
        }
    },
    methods: {
        // 点击列表
        optionHandle(item) {
            if (item.disabled) return;
            // this.selectedId = item.id;
            const obj = JSON.parse(JSON.stringify(item));
            obj.name = obj.name.replace(/<[^<>]+>/g, '');
            this.$emit('change', obj);
        },
        // 多选change回调
        change(selected, unselect) {
            const { selectedData, selectedDataHistory } = this;
            let sd = [];
            if (JSON.stringify(selected).length > 4) {
                selectedData.push(selected);
                sd = selectedData;
            } else {
                sd = selectedData.filter(d => d.id !== unselect.id);
            }
            this.selectedData = sd;
            const cur = sd.map(d => d.id).sort().join(''),
                his = selectedDataHistory.map(d => d.id).sort().join('');
            this.confirmDisable = (cur || his) ? cur === his : (!cur || !his);
        },
        // 取消
        cancel() {
            this.$emit('cancel');
        },
        // 确定
        confirm() {
            const { confirmDisable, selectedData } = this;
            if (confirmDisable) return;
            this.selectedDataHistory = JSON.parse(JSON.stringify(selectedData));
            this.confirmDisable = true;
            this.$emit('change', selectedData);
        }
    },
    render(h) {
        const {
            width, position, dropShow, maxCount, selectedId, multiple,
            dropData,
            confirmDisable,
            change,
            optionHandle,
            cancel, confirm
        } = this;
        return (
            <transition name={position ? 'selectDownUpExtend' : 'selectDownUpExtendTop'}>
                <div vShow={dropShow}
                    class={
                        [
                            'm-drop-box',
                            `m-drop-box-shadow-${position ? 'bottom' : 'top'}`
                        ]
                    }
                    style={{ width: `${width}px` }}
                >
                    <div class={[
                        'm-drop-box-content',
                        `m-drop-box-content-${maxCount <= 5 ? 'normal' : 'max'}`
                    ]}>
                        {
                            (dropData && dropData.length) ? (
                                multiple ? (
                                    <SelectCheckbox
                                        textIndent={false}
                                        data={dropData}
                                        stopPropagation={true}
                                        onChange={change}
                                    />
                                ) : (
                                    dropData.map((d, i) => (
                                        <div key={`${d.id}-${i}`}
                                            class={[
                                                'm-drop-option',
                                                d.id === selectedId && 'm-drop-option-selected',
                                                d.disabled ? 'm-drop-option-disabled' : 'm-drop-option-normal'
                                            ]}
                                            onClick={() => optionHandle(d)}
                                        >
                                            <section class="m-drop-option-text"
                                                onMouseenter={TextEllipsis}
                                                domPropsInnerHTML={d.name}
                                            />
                                        </div>
                                    ))
                                )
                            ) : <div class="m-drop-option-none">没有找到任何内容</div>
                        }
                    </div>
                    {
                        multiple && (
                            <div class={['m-drop-handle', (dropData.length > maxCount) && 'm-drop-handle-shadow']}>
                                <span class="m-drop-btn m-drop-btn-cancel" onClick={cancel}>取消</span>
                                <span class={['m-drop-btn', confirmDisable ? 'm-drop-btn-disabled' : 'm-drop-btn-confirm']} onClick={confirm}>确定</span>
                            </div>
                        )
                    }
                </div>
            </transition>
        );
    }
};
