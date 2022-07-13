import './style.styl';
import FormatData from './FormatData';
import DropTrigger from '../DropTrigger/DropTrigger';
import CascadeBox from './depend/CascadeBox';

import CreateUlList from './CreateUlList';

export default {
    name: 'MCascade',
    props: {
        width: {
            type: [String, Number],
            default: '120'
        },
        // 下拉弹窗宽
        dropWidth: {
            type: [String, Number],
            default: '300'
        },
        // 触发器标题
        caption: {
            type: String,
            default: ''
        },
        // 占位内容
        placeholder: {
            type: String,
            default: '请选择'
        },
        // 禁用状态
        disabled: {
            type: Boolean,
            default: false
        },
        // 是否隐藏清除按钮
        clearHide: {
            type: Boolean,
            default: false
        },
        // 开启搜索 - 默认可搜索
        openSearch: {
            type: Boolean,
            default: true
        },
        // 默认为false 居左对齐
        alignRight: {
            type: Boolean,
            default: false
        },
        // 单选还是多选
        multiple: {
            type: Boolean,
            default: false
        },
        // 下拉列表菜单展开的触发方式
        trigger: {
            type: String,
            default: 'hover'
        },
        value: {
            type: Array,
            default: () => []
        },
        data: {
            type: Array,
            default: () => []
        },
        // 错误信息提示
        errorText: {
            type: String,
            default: ''
        },
        // 错误信息显示状态
        errorShow: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            dropShow: false, // 下拉列表显示
            dropData: [], // 下拉列表数据
            selectedData: {}, // 选中的数据
            selectedIds: [], // 选中的id
            selectedIdsHis: [], // 选中的id
            floor: 1, // 层级
            ulList: [], // ul列表
            ulListHis: [] // ul列表
        };
    },
    watch: {
        data: {
            handler(n) {
                const { max, data } = FormatData(JSON.parse(JSON.stringify(n)));
                this.floor = max;
                this.dropData = data;
                this.setUlList(data);
            },
            deep: true,
            immediate: true
        },
        value: {
            handler(n) {
                this.selectedIds = n;
                this.selectedIdsHis = JSON.parse(JSON.stringify(n));
                this.setUlList(this.dropData);
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        setUlList(data) {
            if (!data || !data.length) return;
            const { value, floor } = this;
            const ulList = CreateUlList(value, floor, data);
            const list = ulList.map(d => d.name).filter(d => d);

            if (list && list.length) this.selectedData = { name: list.join('/') };
            else this.selectedData = {};
            this.ulList = ulList;
            this.ulListHis = JSON.parse(JSON.stringify(ulList));
        },
        getInputText() {},
        openDropHandle() {
            const { data } = this;
            if (!data || !data.length) return;
            if (this.dropShow) {
                this.setCascadeBox(false);
            } else {
                if (this.cascadeBox) {
                    setTimeout(() => {
                        CascadeBox.resetPosition(this.cascadeBox);
                        this.setCascadeBox(true);
                    }, 100);
                } else {
                    const {
                        multiple, trigger,
                        dropShow, dropWidth, ulList, selectedIds,
                        $refs: { dropTrigger }
                    } = this;
                    this.cascadeBox = CascadeBox({
                        tag: dropTrigger,
                        propsData: {
                            multiple,
                            trigger,
                            dropShow,
                            width: dropWidth,
                            data: ulList,
                            selectedIds
                        }
                    }).$on('change', (item, way) => {
                        const { ulList, floor: floorLevel } = this,
                            that = this;
                        const {
                            id, name, floor, children = []
                        } = item;

                        const ids = [];

                        const strategy = {
                            setState() {
                                ulList[floor].id = id;
                                ulList[floor].name = name;
                                const nexInd = floor + 1;
                                if (nexInd !== floorLevel) ulList[nexInd].data = children;
                                for (let i = (nexInd + 1); i < floorLevel; i++) {
                                    // 设置nextInd下一级的数据为空
                                    ulList[i].name = '';
                                    ulList[i].data = [];
                                }
                                // 设置id
                                if (floor > 0) {
                                    for (let i = 0; i <= floor; i++) {
                                        ids.push(ulList[i].id);
                                    }
                                } else {
                                    // 第一级
                                    ids.push(id);
                                }
                                CascadeBox.resetPosition(that.cascadeBox);
                            },
                            click() {
                                this.setState();

                                that.$emit('change', ids);
                                that.ulListHis = JSON.parse(JSON.stringify(that.ulList));
                                that.selectedIdsHis = JSON.parse(JSON.stringify(ids));
                                that.selectedData = { name: that.ulList.filter(d => ids.includes(d.id)).map(d => d.name).filter(d => d).join('/') };
                                that.setCascadeBox(false);
                            },
                            hover() {
                                this.setState();
                            }
                        };

                        this.ulList = ulList;
                        strategy[way]();
                        if (String(ids)) {
                            this.selectedIds = ids;
                            this.cascadeBox.selectedIds = ids;
                        }
                        this.cascadeBox.data = this.ulList;
                    }).$on('close', status => {
                        this.setCascadeBox(status);
                        setTimeout(() => {
                            this.ulList = JSON.parse(JSON.stringify(this.ulListHis));
                            this.selectedIds = JSON.parse(JSON.stringify(this.selectedIdsHis));
                            this.cascadeBox.data = this.ulList;
                            this.cascadeBox.selectedIds = this.selectedIds;
                            const list = this.ulList.filter(d => this.selectedIds.includes(d.id)).map(d => d.name).filter(d => d);
                            if (list && list.length) this.selectedData = { name: list.join('/') };
                            else this.selectedData = {};
                        }, 300);
                    });

                    this.cascadeBox.$nextTick(() => {
                        CascadeBox.resetPosition(this.cascadeBox);
                        this.setCascadeBox(true);
                    });
                }
            }
        },
        setCascadeBox(status) {
            this.dropShow = status;
            if (this.cascadeBox) this.cascadeBox.dropShow = status;
        },
        delHandle() {
            this.selectedData = {};
            this.selectedIds = [];
            this.selectedIdsHis = [];
            this.ulList = this.ulList.map((d, i) => {
                if (i > 0) {
                    d.id = '';
                    d.name = '';
                    d.data = [];
                } else {
                    d.id = '';
                    d.name = '';
                }
                return d;
            });
            this.ulListHis = JSON.parse(JSON.stringify(this.ulList));
            if (this.cascadeBox) {
                this.cascadeBox.selectedIds = [];
                this.cascadeBox.data = this.ulList;
                if (this.dropShow) CascadeBox.resetPosition(this.cascadeBox);
            }
            this.$emit('change', []);
        },
        enter() {
            if (this.cascadeBox && this.dropShow) this.cascadeBox.activeBlur = false;
        },
        leave() {
            if (this.cascadeBox && this.dropShow) this.cascadeBox.activeBlur = true;
        }
    },
    render(h) {
        const {
            caption, width, placeholder, disabled, clearHide, multiple, errorText, errorShow,
            dropShow, selectedData,
            getInputText, openDropHandle, delHandle, enter, leave
        } = this;
        return (
            <div class="m-cascade" onMouseenter={enter} onMouseleave={leave}>
                <DropTrigger
                    ref="dropTrigger"
                    caption={caption}
                    width={width}
                    placeholder={placeholder}
                    disabled={disabled}
                    clearHide={clearHide}
                    openSearch={false}
                    multiple={multiple}
                    dropShow={dropShow}
                    errorText={errorText}
                    errorShow={errorShow}
                    selectedData={selectedData}
                    onGetInputText={getInputText}
                    onClick={openDropHandle}
                    onDelHandle={delHandle}
                />
            </div>
        );
    }
};
