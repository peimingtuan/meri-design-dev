### Transfer 穿梭框

<template>
    <div class="transferSelect">
        <div class="transferSelectList">
            <Button type="primary" @click="handleModalShow">1.一维结构</Button>
            <TransferSelectModal
                    :modalShow="modalShow"
                    placeholder="添加设备"
                    :linkage="false"
                    :lastStage="true"
                    :selectedIds="selectedIds2"
                    :data="selectData"
                    @cancel="treeCancel"
                    @confirm="treeConfirm"
            />
        </div>
        <div class="transferSelectList">
            <Button type="primary" @click="handleModalShow2">2.树形结构</Button>
            <TransferSelectModal
                    :modalShow="modalShow2"
                    placeholder="添加设备"
                    :data="treeData"
                    :notNull="true"
                    :selectedIds="selectedIds"
                    :returnParentNode="true"
                    @cancel="treeCancel"
                    @confirm="treeConfirm"
            />
        </div>
        <div class="transferSelectList">
            <Button type="primary" @click="handleModalShow21">2.1.返回半选状态父对象数据</Button>
            <TransferSelectModal
                    :modalShow="modalShow21"
                    placeholder="添加设备"
                    :data="treeData21"
                    :notNull="true"
                    :selectedIds="selectedIds4"
                    :returnParentNode="true"
                    @cancel="treeCancel"
                    @confirm="treeConfirm"
            />
        </div>
        <div class="transferSelectList">
            <Button type="primary" @click="handleModalShow3">3.上下级不联动</Button>
            <TransferSelectModal
                    :modalShow="modalShow3"
                    placeholder="添加设备"
                    :linkage="false"
                    :data="treeData2"
                    :selectedIds="selectedIds3"
                    @cancel="treeCancel"
                    @confirm="treeConfirm"
            />
        </div>
        <div class="transferSelectList">
            <Button type="primary" @click="handleModalShow4">4.只能选择末级</Button>
            <TransferSelectModal
                    :modalShow="modalShow4"
                    placeholder="添加设备"
                    :linkage="false"
                    :lastStage="true"
                    :data="treeData3"
                    :selectedIds="selectedIds1"
                    @cancel="treeCancel"
                    @confirm="treeConfirm"
            />
        </div>
    </div>
</template>

<script>
const selectData = [
    {id: '100', name: '乔峰', selected: false},
    {id: '200', name: '阿三2', selected: false, disabled: true},
    {id: '300', name: '段誉3', selected: true},
    {id: '400', name: '阿紫4', selected: false},
    {id: '500', name: '洪七公5', selected: true},
    {id: '600', name: '慕容复6', selected: false},
    {id: '700', name: '欧阳锋7', selected: false},
    {id: '800', name: '黄老邪8', selected: false},
    {id: '900', name: '段正淳9', selected: false},
    {id: '1000', name: '王语嫣10', selected: false},
    {id: '1100', name: '王重阳11', selected: false},
    {id: '1200', name: '周伯通12', selected: false},
    {id: '1300', name: '虚竹13', selected: false}
];
const dataArr = [
    {
        id: '0', name: '顶级', open: true, checked: 'uncheck',
        children: [
            {
                id: '1', name: '一级1', open: true, checked: 'uncheck',
                children: [
                    {id: '12', name: '一二级2', checked: 'checked', disabled: true},
                    {id: '121', name: '一二级3', checked: 'uncheck'},
                    {id: '122', name: '一二级4', checked: 'uncheck'},
                    {
                        id: '1321', name: '二级1', open: true, checked: 'uncheck',
                    }
                ]
            },
            {
                id: '2', name: '一级2', open: true, checked: 'uncheck',
                children: [
                    {id: '222', name: '二二级2', checked: 'uncheck'},
                    {id: '2221', name: '二二级1', checked: 'checked', disabled: true},
                    {id: '2222', name: '二二级3', checked: 'uncheck'}
                ]
            },
            {
                id: '3', name: '一级3', open: true, checked: 'uncheck',
                children: [
                    {id: '3220', name: '三二级0', checked: 'uncheck'},
                    {id: '3221', name: '三二级1', checked: 'uncheck'},
                    {id: '322', name: '三二级2', checked: 'uncheck'}
                ]
            }
        ]
    }
];
const dataArr2 = [
    {
        id: "DEFAULT",
        name: "未分组设备",
        projectLocalId: null,
        order: 999999,
        listStyle: null,
        remark: null,
        equips: [],
        children: [],
        open: true,
        checked: "uncheck"
    },
    {
        id: "98ab47aff8fc45449ab6d8334a255ac1",
        name: "lm测试",
        projectLocalId: null,
        order: 0,
        listStyle: null,
        remark: null,
        equips: [
            {
                id: "VOCu00997f71f0b6423e9000fa925011ffc3",
                localId: "CU010123",
                projectLocalId: null,
                name: "2-11AA08-影城3F、5F应急照明（备用）",
                ratedPower: 10,
                connectToFM: 0,
                groupId: null,
                type: 1,
                runPlanStatus: 1,
                open: true,
                checked: "uncheck",
                disabled: true
            },
            {
                id: "VOEi3c6ed57aa3bb4bbb98518708a14eaff4",
                localId: "EI1010201010103002",
                projectLocalId: null,
                name: "百货冷却泵",
                ratedPower: 12.222,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 1,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEi40fc93133999441c82d070b18e32e49c",
                localId: "EI1010101010301001",
                projectLocalId: null,
                name: "影城照明插座",
                ratedPower: 70,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 1,
                open: true,
                checked: "checked"
            }
        ],
        children: [
            {
                id: "VOCu00997f71f0b6423e9000fa925011ffc3",
                localId: "CU010123",
                projectLocalId: null,
                name: "2-11AA08-影城3F、5F应急照明（备用）",
                ratedPower: 10,
                connectToFM: 0,
                groupId: null,
                type: 1,
                runPlanStatus: 1,
                open: true,
                checked: "checked",
                disabled: true
            },
            {
                id: "VOEi3c6ed57aa3bb4bbb98518708a14eaff4",
                localId: "EI1010201010103002",
                projectLocalId: null,
                name: "百货冷却泵",
                ratedPower: 12.222,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 1,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEi40fc93133999441c82d070b18e32e49c",
                localId: "EI1010101010301001",
                projectLocalId: null,
                name: "影城照明插座",
                ratedPower: 70,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 1,
                open: true,
                checked: "uncheck"
            }
        ],
        open: true,
        checked: "uncheck"
    },
    {
        id: "f2c6914d41b94cb8b58a2802eb15aba2",
        name: "王程宏勿动",
        projectLocalId: null,
        order: 2,
        listStyle: null,
        remark: null,
        equips: [
            {
                id: "VOEib820d461839d46c391e37cf46b831760",
                localId: "EI10101001",
                projectLocalId: null,
                name: "商管物业租户",
                ratedPower: 52110,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 1,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEi0d6d3e5b704949dc9c1b0fdaa9a5c0c1",
                localId: "EI1001",
                projectLocalId: null,
                name: "万达广场总电耗",
                ratedPower: 140110,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 1,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEie3fec41cc7b64a0eaee99f8efe6ea14d",
                localId: "EI101010101001",
                projectLocalId: null,
                name: "自营主力店",
                ratedPower: 480,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 1,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEi4ce42da250684679a2b9b66386ae3b8e",
                localId: "EI10101003",
                projectLocalId: null,
                name: "租户",
                ratedPower: 5211,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 1,
                open: true,
                checked: "uncheck"
            }
        ],
        children: [
            {
                id: "VOEib820d461839d46c391e37cf46b831760",
                localId: "EI10101001",
                projectLocalId: null,
                name: "商管物业租户",
                ratedPower: 52110,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 1,
                open: true,
                checked: "checked"
            },
            {
                id: "VOEi0d6d3e5b704949dc9c1b0fdaa9a5c0c1",
                localId: "EI1001",
                projectLocalId: null,
                name: "万达广场总电耗",
                ratedPower: 140110,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 1,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEie3fec41cc7b64a0eaee99f8efe6ea14d",
                localId: "EI101010101001",
                projectLocalId: null,
                name: "自营主力店",
                ratedPower: 480,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 1,
                open: true,
                checked: "uncheck"
            }
        ],
        open: true,
        checked: "uncheck"
    },
];
export default {
    name: 'TransferSelectModalView',
    data() {
        return {
            modalShow: false,
            modalShow21: false,
            modalShow2: false,
            modalShow3: false,
            modalShow4: false,
            selectData: selectData,
            treeData: dataArr,
            treeData21: [],
            treeData2: JSON.parse(JSON.stringify(dataArr)),
            treeData3: JSON.parse(JSON.stringify(dataArr)),
            selectedIds: ['121','2222'], 
            selectedIds1: ['222','322'],
            selectedIds2: ['100','600'], 
            selectedIds3: ['2','3221'],
            selectedIds4: ['VOCu00997f71f0b6423e9000fa925011ffc3','VOEie3fec41cc7b64a0eaee99f8efe6ea14d'],
        };
    },
    mounted() {
        setTimeout(() => {
            this.treeData21 = dataArr2
        }, 3000);
    },
    methods: {
        treeConfirm(ids,dataObj) {
            console.log('确定：：：', ids);
            console.log('确定：：：', dataObj);
        },
        treeCancel() {
            this.modalShow = false;
            this.modalShow21 = false;
            this.modalShow2 = false;
            this.modalShow3 = false;
            this.modalShow4 = false;
        },
        handleModalShow() {
            this.modalShow = true;
        },
        handleModalShow21() {
            this.modalShow21 = true;
        },
        handleModalShow2() {
            this.modalShow2 = true;
        },
        handleModalShow3() {
            this.modalShow3 = true;
        },
        handleModalShow4() {
            this.modalShow4 = true;
        }
    }
};
</script>

<style lang="stylus" scoped>
.transferSelect
    padding 16px
    .transferSelectList
        margin-bottom 16px
        width 300px
    h3
        font-size 16px
        margin 12px

</style>

```vue
<template>
    <div class="transferSelect">
        <div class="transferSelectList">
            <Button type="primary" @click="handleModalShow">1.一维结构</Button>
            <TransferSelectModal
                    :modalShow="modalShow"
                    placeholder="添加设备"
                    :linkage="false"
                    :lastStage="true"
                    :selectedIds="selectedIds2"
                    :data="selectData"
                    @cancel="treeCancel"
                    @confirm="treeConfirm"
            />
        </div>
        <div class="transferSelectList">
            <Button type="primary" @click="handleModalShow2">2.树形结构</Button>
            <TransferSelectModal
                    :modalShow="modalShow2"
                    placeholder="添加设备"
                    :data="treeData"
                    :notNull="true"
                    :selectedIds="selectedIds"
                    :returnParentNode="true"
                    @cancel="treeCancel"
                    @confirm="treeConfirm"
            />
        </div>
        <div class="transferSelectList">
            <Button type="primary" @click="handleModalShow21">2.1.返回半选状态父对象数据</Button>
            <TransferSelectModal
                    :modalShow="modalShow21"
                    placeholder="添加设备"
                    :data="treeData21"
                    :notNull="true"
                    :selectedIds="selectedIds4"
                    :returnParentNode="true"
                    @cancel="treeCancel"
                    @confirm="treeConfirm"
            />
        </div>
        <div class="transferSelectList">
            <Button type="primary" @click="handleModalShow3">3.上下级不联动</Button>
            <TransferSelectModal
                    :modalShow="modalShow3"
                    placeholder="添加设备"
                    :linkage="false"
                    :data="treeData2"
                    :selectedIds="selectedIds3"
                    @cancel="treeCancel"
                    @confirm="treeConfirm"
            />
        </div>
        <div class="transferSelectList">
            <Button type="primary" @click="handleModalShow4">4.只能选择末级</Button>
            <TransferSelectModal
                    :modalShow="modalShow4"
                    placeholder="添加设备"
                    :linkage="false"
                    :lastStage="true"
                    :data="treeData3"
                    :selectedIds="selectedIds1"
                    @cancel="treeCancel"
                    @confirm="treeConfirm"
            />
        </div>
    </div>
</template>

<script>
const selectData = [
    {id: '100', name: '乔峰', selected: false},
    {id: '200', name: '阿三2', selected: false, disabled: true},
    {id: '300', name: '段誉3', selected: true},
    {id: '400', name: '阿紫4', selected: false},
    {id: '500', name: '洪七公5', selected: true},
    {id: '600', name: '慕容复6', selected: false},
    {id: '700', name: '欧阳锋7', selected: false},
    {id: '800', name: '黄老邪8', selected: false},
    {id: '900', name: '段正淳9', selected: false},
    {id: '1000', name: '王语嫣10', selected: false},
    {id: '1100', name: '王重阳11', selected: false},
    {id: '1200', name: '周伯通12', selected: false},
    {id: '1300', name: '虚竹13', selected: false}
];
const dataArr = [
    {
        id: '0', name: '顶级', open: true, checked: 'uncheck',
        children: [
            {
                id: '1', name: '一级1', open: true, checked: 'uncheck',
                children: [
                    {id: '12', name: '一二级2', checked: 'checked', disabled: true},
                    {id: '121', name: '一二级3', checked: 'uncheck'},
                    {id: '122', name: '一二级4', checked: 'uncheck'},
                    {
                        id: '1321', name: '二级1', open: true, checked: 'uncheck',
                    }
                ]
            },
            {
                id: '2', name: '一级2', open: true, checked: 'uncheck',
                children: [
                    {id: '222', name: '二二级2', checked: 'uncheck'},
                    {id: '2221', name: '二二级1', checked: 'checked', disabled: true},
                    {id: '2222', name: '二二级3', checked: 'uncheck'}
                ]
            },
            {
                id: '3', name: '一级3', open: true, checked: 'uncheck',
                children: [
                    {id: '3220', name: '三二级0', checked: 'uncheck'},
                    {id: '3221', name: '三二级1', checked: 'uncheck'},
                    {id: '322', name: '三二级2', checked: 'uncheck'}
                ]
            }
        ]
    }
];
const dataArr2 = [
    {
        id: "DEFAULT",
        name: "未分组设备",
        projectLocalId: null,
        order: 999999,
        listStyle: null,
        remark: null,
        equips: [],
        children: [],
        open: true,
        checked: "uncheck"
    },
    {
        id: "98ab47aff8fc45449ab6d8334a255ac1",
        name: "lm测试",
        projectLocalId: null,
        order: 0,
        listStyle: null,
        remark: null,
        equips: [
            {
                id: "VOCu00997f71f0b6423e9000fa925011ffc3",
                localId: "CU010123",
                projectLocalId: null,
                name: "2-11AA08-影城3F、5F应急照明（备用）",
                ratedPower: 10,
                connectToFM: 0,
                groupId: null,
                type: 1,
                runPlanStatus: 1,
                open: true,
                checked: "uncheck",
                disabled: true
            },
            {
                id: "VOEi3c6ed57aa3bb4bbb98518708a14eaff4",
                localId: "EI1010201010103002",
                projectLocalId: null,
                name: "百货冷却泵",
                ratedPower: 12.222,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 1,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEi40fc93133999441c82d070b18e32e49c",
                localId: "EI1010101010301001",
                projectLocalId: null,
                name: "影城照明插座",
                ratedPower: 70,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 1,
                open: true,
                checked: "checked"
            }
        ],
        children: [
            {
                id: "VOCu00997f71f0b6423e9000fa925011ffc3",
                localId: "CU010123",
                projectLocalId: null,
                name: "2-11AA08-影城3F、5F应急照明（备用）",
                ratedPower: 10,
                connectToFM: 0,
                groupId: null,
                type: 1,
                runPlanStatus: 1,
                open: true,
                checked: "checked",
                disabled: true
            },
            {
                id: "VOEi3c6ed57aa3bb4bbb98518708a14eaff4",
                localId: "EI1010201010103002",
                projectLocalId: null,
                name: "百货冷却泵",
                ratedPower: 12.222,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 1,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEi40fc93133999441c82d070b18e32e49c",
                localId: "EI1010101010301001",
                projectLocalId: null,
                name: "影城照明插座",
                ratedPower: 70,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 1,
                open: true,
                checked: "uncheck"
            }
        ],
        open: true,
        checked: "uncheck"
    },
    {
        id: "f2c6914d41b94cb8b58a2802eb15aba2",
        name: "王程宏勿动",
        projectLocalId: null,
        order: 2,
        listStyle: null,
        remark: null,
        equips: [
            {
                id: "VOEib820d461839d46c391e37cf46b831760",
                localId: "EI10101001",
                projectLocalId: null,
                name: "商管物业租户",
                ratedPower: 52110,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 1,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEi0d6d3e5b704949dc9c1b0fdaa9a5c0c1",
                localId: "EI1001",
                projectLocalId: null,
                name: "万达广场总电耗",
                ratedPower: 140110,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 1,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEie3fec41cc7b64a0eaee99f8efe6ea14d",
                localId: "EI101010101001",
                projectLocalId: null,
                name: "自营主力店",
                ratedPower: 480,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 1,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEi4ce42da250684679a2b9b66386ae3b8e",
                localId: "EI10101003",
                projectLocalId: null,
                name: "租户",
                ratedPower: 5211,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 1,
                open: true,
                checked: "uncheck"
            }
        ],
        children: [
            {
                id: "VOEib820d461839d46c391e37cf46b831760",
                localId: "EI10101001",
                projectLocalId: null,
                name: "商管物业租户",
                ratedPower: 52110,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 1,
                open: true,
                checked: "checked"
            },
            {
                id: "VOEi0d6d3e5b704949dc9c1b0fdaa9a5c0c1",
                localId: "EI1001",
                projectLocalId: null,
                name: "万达广场总电耗",
                ratedPower: 140110,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 1,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEie3fec41cc7b64a0eaee99f8efe6ea14d",
                localId: "EI101010101001",
                projectLocalId: null,
                name: "自营主力店",
                ratedPower: 480,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 1,
                open: true,
                checked: "uncheck"
            }
        ],
        open: true,
        checked: "uncheck"
    },
];
export default {
    name: 'TransferSelectModalView',
    data() {
        return {
            modalShow: false,
            modalShow21: false,
            modalShow2: false,
            modalShow3: false,
            modalShow4: false,
            selectData: selectData,
            treeData: dataArr, // type: Array
            treeData21: [], // type: Array
            treeData2: JSON.parse(JSON.stringify(dataArr)), // type: Array
            treeData3: JSON.parse(JSON.stringify(dataArr)), // type: Array
            selectedIds: ['121','2222'], // 设置默认选中展示数据
            selectedIds1: ['222','322'],
            selectedIds2: ['100','600'], //单选设置默认选中展示数据
            selectedIds3: ['2','3221'],
            selectedIds4: ['VOCu00997f71f0b6423e9000fa925011ffc3','VOEie3fec41cc7b64a0eaee99f8efe6ea14d'],
        };
    },
    mounted() {
        setTimeout(() => {
            this.treeData21 = dataArr2
        }, 3000);
    },
    methods: {
        treeConfirm(ids,dataObj) {
            console.log('确定：：：', ids);
            console.log('确定：：：', dataObj);
        },
        treeCancel() {
            this.modalShow = false;
            this.modalShow21 = false;
            this.modalShow2 = false;
            this.modalShow3 = false;
            this.modalShow4 = false;
        },
        handleModalShow() {
            this.modalShow = true;
        },
        handleModalShow21() {
            this.modalShow21 = true;
        },
        handleModalShow2() {
            this.modalShow2 = true;
        },
        handleModalShow3() {
            this.modalShow3 = true;
        },
        handleModalShow4() {
            this.modalShow4 = true;
        }
    }
};
</script>

```

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| data    | 数据列表 | Array | [] | Yes     |
| height    | 穿梭框弹窗高度 | String/Number | 480 | No     |
| linkage    | 树形结构上下级是否联动 | Boolean | true | No     |
| lastStage    | 树形结构是否只能选择最后一级 | Boolean | false | No     |
| notNull  | 是否返回半选状态的数据（在多选条件下才生效） | Boolean | false | no     |
| @cancel   | 取消回调 | Function | -- | No     |
| @confirm    | 确定回调，返回选中的id组和选中的对象数组 | Function | -- | Yes    |
| returnParentNode | 是否返回父对象数据 | Boolean | true | No |
| selectedIds | 设置默认选中数据 | Array | [] | false | 

::: tip
***如果linkage = false 或者 lastStage = true，isShowAllChoice、returnParentNode无效***
:::

::: tip
***只能通过 selectedIds 属性来设置数据的默认选中***
:::




