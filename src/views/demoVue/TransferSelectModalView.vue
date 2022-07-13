<template>
    <div class="transferSelect">
        <div class="transferSelectList">
            <Button type="primary" @click="handleModalShow">1.一维结构</Button>
            <TransferSelectModal
                    :modalShow="modalShow"
                    placeholder="添加设备"
                    :linkage="false"
                    :lastStage="true"
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
                    @cancel="treeCancel"
                    @confirm="treeConfirm"
            />
        </div>
    </div>
</template>

<script>
const selectData = [
    {id: '100', name: '乔峰', selected: false},
    {id: '200', name: '阿三2', selected: false},
    {id: '300', name: '段誉3', selected: false},
    {id: '400', name: '阿紫4', selected: false},
    {id: '500', name: '洪七公5', selected: false},
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
                    {id: '12', name: '一二级2', checked: 'uncheck'},
                    {id: '121', name: '一二级3', checked: 'uncheck'},
                    {id: '122', name: '一二级4', checked: 'uncheck'},
                    {
                        id: '1321', name: '二级1', open: true, checked: 'uncheck',
                        children: [
                            {id: '13', name: '二三级2', checked: 'uncheck'},
                            {id: '131', name: '二三级3', checked: 'uncheck'},
                            {id: '132', name: '二三级4', checked: 'uncheck'},
                        ]
                    }
                ]
            },
            {
                id: '2', name: '一级2', open: true, checked: 'uncheck',
                children: [
                    {id: '222', name: '二二级2', checked: 'uncheck'},
                    {id: '2221', name: '二二级1', checked: 'uncheck'},
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
                checked: "uncheck"
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
        open: true,
        checked: "uncheck"
    },
    {
        id: "7a7eca5ccfb041c8a73d17261fcb4afa",
        name: "KTV",
        projectLocalId: null,
        order: 3,
        listStyle: null,
        remark: null,
        equips: [
            {
                id: "VOEicf8e0d73811a426e93f0e52e731ed26d",
                localId: "EI10101010106001",
                projectLocalId: null,
                name: "KTV",
                ratedPower: 10,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 2,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEi64a0a3807ec241519086214ca1aa9fb9",
                localId: "EI1010101010602001",
                projectLocalId: null,
                name: "KTV空调",
                ratedPower: null,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 0,
                open: true,
                checked: "uncheck",
                disabled: true
            },
            {
                id: "VOEi5d1f89e1711f4a21a87348f28eac8ed4",
                localId: "EI1010101010603001",
                projectLocalId: null,
                name: "KTV其它用电",
                ratedPower: null,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 0,
                open: true,
                checked: "uncheck",
                disabled: true
            },
            {
                id: "VOEi5030d2ff830748caaaddebdd47d101ff",
                localId: "EI1010101010601001",
                projectLocalId: null,
                name: "KTV照明插座",
                ratedPower: null,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 0,
                open: true,
                checked: "uncheck",
                disabled: true
            },
            {
                id: "VOEi7668feda4fea46228e95b210d5789453",
                localId: "EI1010201010102002",
                projectLocalId: null,
                name: "百货冷冻泵",
                ratedPower: null,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 0,
                open: true,
                checked: "uncheck",
                disabled: true
            }
        ],
        children: [
            {
                id: "VOEicf8e0d73811a426e93f0e52e731ed26d",
                localId: "EI10101010106001",
                projectLocalId: null,
                name: "KTV",
                ratedPower: 10,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 2,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEi64a0a3807ec241519086214ca1aa9fb9",
                localId: "EI1010101010602001",
                projectLocalId: null,
                name: "KTV空调",
                ratedPower: null,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 0,
                open: true,
                checked: "uncheck",
                disabled: true
            },
            {
                id: "VOEi5d1f89e1711f4a21a87348f28eac8ed4",
                localId: "EI1010101010603001",
                projectLocalId: null,
                name: "KTV其它用电",
                ratedPower: null,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 0,
                open: true,
                checked: "uncheck",
                disabled: true
            },
            {
                id: "VOEi5030d2ff830748caaaddebdd47d101ff",
                localId: "EI1010101010601001",
                projectLocalId: null,
                name: "KTV照明插座",
                ratedPower: null,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 0,
                open: true,
                checked: "uncheck",
                disabled: true
            },
            {
                id: "VOEi7668feda4fea46228e95b210d5789453",
                localId: "EI1010201010102002",
                projectLocalId: null,
                name: "百货冷冻泵",
                ratedPower: null,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 0,
                open: true,
                checked: "uncheck",
                disabled: true
            }
        ],
        open: true,
        checked: "uncheck"
    },
    {
        id: "3cce4a13b86149d9a8e3bfb1d9cce84f",
        name: "大萨达",
        projectLocalId: null,
        order: 4,
        listStyle: null,
        remark: null,
        equips: [
            {
                id: "VOEiaea66b9bab9347a08a2b28923a8b0468",
                localId: "EI1010201001",
                projectLocalId: null,
                name: "暖通空调",
                ratedPower: 568500,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 1,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEi6523ff676e2d43009f2a8cfef2886fcf",
                localId: "EI10101010203001",
                projectLocalId: null,
                name: "其他外租商铺",
                ratedPower: 1041,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 2,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEi4300fd43b1164430a193c035ce6a6418",
                localId: "EI10101010109001",
                projectLocalId: null,
                name: "其它自营商户",
                ratedPower: 34,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 2,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEid218dc6c31eb4a1e9fd44d78c0568686",
                localId: "EI10102001",
                projectLocalId: null,
                name: "商管物业公区",
                ratedPower: 8800,
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
                id: "VOEiaea66b9bab9347a08a2b28923a8b0468",
                localId: "EI1010201001",
                projectLocalId: null,
                name: "暖通空调",
                ratedPower: 568500,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 1,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEi6523ff676e2d43009f2a8cfef2886fcf",
                localId: "EI10101010203001",
                projectLocalId: null,
                name: "其他外租商铺",
                ratedPower: 1041,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 2,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEi4300fd43b1164430a193c035ce6a6418",
                localId: "EI10101010109001",
                projectLocalId: null,
                name: "其它自营商户",
                ratedPower: 34,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 2,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEid218dc6c31eb4a1e9fd44d78c0568686",
                localId: "EI10102001",
                projectLocalId: null,
                name: "商管物业公区",
                ratedPower: 8800,
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
        id: "0a46395208ec477e904a63f33732c4a8",
        name: "的顶顶顶顶顶的多多",
        projectLocalId: null,
        order: 5,
        listStyle: null,
        remark: null,
        equips: [
            {
                id: "VOEi23c318bb66ee44abb752bb9aac616bf2",
                localId: "EI1010201002",
                projectLocalId: null,
                name: "百货暖通空调",
                ratedPower: null,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 0,
                open: true,
                checked: "uncheck",
                disabled: true
            },
            {
                id: "VOEi2ad3f78d4f77458fade09a08f459fb7e",
                localId: "EI10102002",
                projectLocalId: null,
                name: "百货物业公区",
                ratedPower: null,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 0,
                open: true,
                checked: "uncheck",
                disabled: true
            },
            {
                id: "VOEib393e9225bf345009d1f4de9d0c16fa1",
                localId: "EI10101002",
                projectLocalId: null,
                name: "百货物业租户",
                ratedPower: null,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 0,
                open: true,
                checked: "uncheck",
                disabled: true
            },
            {
                id: "VOEifb3d8fa89ead4979a0ba9fc5767cde5c",
                localId: "EI10101010107001",
                projectLocalId: null,
                name: "宝贝王",
                ratedPower: 70,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 1,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEi19e2746b7d5b44bca21c2613b1d03f6f",
                localId: "EI10101010201001",
                projectLocalId: null,
                name: "步行街小商铺",
                ratedPower: 2550,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 0,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEi629b126ed89e46008c29bfa6b76faddd",
                localId: "EI10101010105001",
                projectLocalId: null,
                name: "超市",
                ratedPower: null,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 0,
                open: true,
                checked: "uncheck",
                disabled: true
            },
            {
                id: "VOEiecf42fe4bc814754aaeed29210ea9cad",
                localId: "EI10101010202001",
                projectLocalId: null,
                name: "非自营主力店",
                ratedPower: 1140,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 1,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEi668eeb84ee894b8d9a1c97e7c1a02940",
                localId: "EI101010102001",
                projectLocalId: null,
                name: "外租商户",
                ratedPower: 4731,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 0,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEi3da0695073fa4eb8a6dde99fca8e46a2",
                localId: "EI10101010103001",
                projectLocalId: null,
                name: "影城",
                ratedPower: 320,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 0,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEi084b6e0ced8a4fa6ab129cff82aff2e0",
                localId: "EI1010101010302001",
                projectLocalId: null,
                name: "影城空调",
                ratedPower: 110,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 0,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEi407daebea2d64ec487744cac77a21295",
                localId: "EI1010101010303001",
                projectLocalId: null,
                name: "影城其它用电",
                ratedPower: 140,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 0,
                open: true,
                checked: "uncheck"
            }
        ],
        children: [
            {
                id: "VOEi23c318bb66ee44abb752bb9aac616bf2",
                localId: "EI1010201002",
                projectLocalId: null,
                name: "百货暖通空调",
                ratedPower: null,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 0,
                open: true,
                checked: "uncheck",
                disabled: true
            },
            {
                id: "VOEi2ad3f78d4f77458fade09a08f459fb7e",
                localId: "EI10102002",
                projectLocalId: null,
                name: "百货物业公区",
                ratedPower: null,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 0,
                open: true,
                checked: "uncheck",
                disabled: true
            },
            {
                id: "VOEib393e9225bf345009d1f4de9d0c16fa1",
                localId: "EI10101002",
                projectLocalId: null,
                name: "百货物业租户",
                ratedPower: null,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 0,
                open: true,
                checked: "uncheck",
                disabled: true
            },
            {
                id: "VOEifb3d8fa89ead4979a0ba9fc5767cde5c",
                localId: "EI10101010107001",
                projectLocalId: null,
                name: "宝贝王",
                ratedPower: 70,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 1,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEi19e2746b7d5b44bca21c2613b1d03f6f",
                localId: "EI10101010201001",
                projectLocalId: null,
                name: "步行街小商铺",
                ratedPower: 2550,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 0,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEi629b126ed89e46008c29bfa6b76faddd",
                localId: "EI10101010105001",
                projectLocalId: null,
                name: "超市",
                ratedPower: null,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 0,
                open: true,
                checked: "uncheck",
                disabled: true
            },
            {
                id: "VOEiecf42fe4bc814754aaeed29210ea9cad",
                localId: "EI10101010202001",
                projectLocalId: null,
                name: "非自营主力店",
                ratedPower: 1140,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 1,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEi668eeb84ee894b8d9a1c97e7c1a02940",
                localId: "EI101010102001",
                projectLocalId: null,
                name: "外租商户",
                ratedPower: 4731,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 0,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEi3da0695073fa4eb8a6dde99fca8e46a2",
                localId: "EI10101010103001",
                projectLocalId: null,
                name: "影城",
                ratedPower: 320,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 0,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEi084b6e0ced8a4fa6ab129cff82aff2e0",
                localId: "EI1010101010302001",
                projectLocalId: null,
                name: "影城空调",
                ratedPower: 110,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 0,
                open: true,
                checked: "uncheck"
            },
            {
                id: "VOEi407daebea2d64ec487744cac77a21295",
                localId: "EI1010101010303001",
                projectLocalId: null,
                name: "影城其它用电",
                ratedPower: 140,
                connectToFM: 0,
                groupId: null,
                type: 0,
                runPlanStatus: 0,
                open: true,
                checked: "uncheck"
            }
        ],
        open: true,
        checked: "uncheck"
    }
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
            selectData, // type: Array
            treeData: dataArr, // type: Array
            treeData21: [], // type: Array
            treeData2: JSON.parse(JSON.stringify(dataArr)), // type: Array
            treeData3: JSON.parse(JSON.stringify(dataArr)), // type: Array
        };
    },
    mounted() {
        setTimeout(() => {
            this.treeData21 = dataArr2;
            console.log('====== Bingo');
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
