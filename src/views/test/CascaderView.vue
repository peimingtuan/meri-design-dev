<template>
    <div>
        <div class="cascader-display-panel" style="text-align: right">
            <div>
                 <h2 class="components-title-h2">单选-hover </h2>
                <Cascader placeholder="测试placeholder" caption="选择项目" trigger='hover' :hideClear='false' @change="testChange"
                          v-model="model2" :data="cascaderData1" width="300"></Cascader>
            </div>
            <div>
                 <h2 class="components-title-h2">单选-带请求-click </h2>
                <Cascader   placeholder="测试placeholder" trigger='click' @change="testChange2" :load-data="loadData2"
                          :data="cascaderData2" width="300"></Cascader>
            </div>

        </div>
        <div class="cascader-display-panel">
            <div>
                 <h2 class="components-title-h2">多选-子父级联动-半选也计算在内-带面板-hover </h2>
                <Cascader placeholder="测试placeholder" caption="选择项目选择项目选择项目" all trigger='hover' multiple tipPlace="top" :data="cascaderData3"
                          @confirm="testConfirm" type="normal" showPanel width="300"></Cascader>
            </div>
            <div>
                 <h2 class="components-title-h2">多选-子父级联动-半选不计算在内-带面板-click </h2>
                <Cascader placeholder="测试placeholder" trigger='click' multiple tipPlace="top" :data="cascaderData4"
                          @change="testChange" @confirm="testConfirm" type="normal" showPanel width="300"></Cascader>
            </div>

        </div>
        <div class="cascader-display-panel">
            <div>
                 <h2 class="components-title-h2">多选-子级禁用，子父级不联动-带面板-click </h2>
                <Cascader placeholder="测试placeholder" trigger='click' multiple tipPlace="top" :data="cascaderData5"
                          type="forbidden" showPanel width="300"></Cascader>
            </div>
            <div>
                 <h2 class="components-title-h2">多选-只能选择末级-不带面板-click </h2>
                <Cascader placeholder="测试placeholder" :isShowAllChoice="true" trigger='click' multiple tipPlace="top"
                          :data="cascaderData6" type="normal" width="300"></Cascader>
            </div>
        </div>
        <div class="cascader-display-panel">
            <div>
                 <h2 class="components-title-h2">多选-子父级不联动-带面板-click </h2>
                <Cascader caption="选择项目" placeholder="测试placeholder" trigger='click' multiple tipPlace="top" :data="cascaderData7"
                          type="independent" showPanel width="300"></Cascader>
            </div>
            <div>
                 <h2 class="components-title-h2">多选-只能选择末级- 带面板-click </h2>
                <Cascader placeholder="测试placeholder" trigger='click' @focusChange="focusChange" multiple tipPlace="top" :data="cascaderData8"
                          type="final" showPanel width="300"></Cascader>
            </div>
            <div>
                 <h2 class="components-title-h2">alarmTypem</h2>
                <Cascader
                    v-model="alarmTypem"
                    type="normal"
                    showPanel
                    multiple
                    :data="alarmTypeArr"
                    width="280"
                ></Cascader>
            </div>
        </div>
    </div>
</template>

<script>
const alarmTypeArr = [
    {
        title: 'systemName1',
        id: 'systemCode1',
        level: '1',
        children: [
            {
                title: '1-cateLName1',
                id: '1-cateL3Code1',
                level: '2',
                params: [
                    {
                        infoCode: '1-1-infoCode1',
                        infoCodeName: '1-1-infoCodeName1'
                    }
                ],
                children: [
                    {
                        title: '1-1-euqipName1',
                        id: '1-1-euqipCode1',
                        level: '3'
                    },
                    {
                        title: '1-1-euqipName2',
                        id: '1-1-euqipCode2',
                        level: '3'
                    }
                ]
            },
            {
                title: '1-cateLName2',
                id: '1-cateL3Code2',
                level: '2',
                params: [
                    {
                        infoCode: '1-2-infoCode1',
                        infoCodeName: '1-2-infoCodeName1'
                    }
                ],
                children: [
                    {
                        title: '1-2-euqipName1',
                        id: '1-2-euqipCode1',
                        level: '3'
                    },
                    {
                        title: '1-2-euqipName2',
                        id: '1-2-euqipCode2',
                        level: '3'
                    }
                ]
            }
        ]
    },
    {
        title: 'systemName2',
        id: 'systemCode2',
        level: '1',
        children: [
            {
                title: '2-cateLName1',
                id: '2-cateL3Code1',
                level: '2',
                params: [
                    {
                        infoCode: '2-1-infoCode1',
                        infoCodeName: '2-1-infoCodeName1'
                    }
                ],
                children: [
                    {
                        title: '2-1-euqipName1',
                        id: '2-1-euqipCode1',
                        level: '3'
                    },
                    {
                        title: '2-1-euqipName2',
                        id: '2-1-euqipCode2',
                        level: '3'
                    }
                ]
            },
            {
                title: '2-cateLName2',
                id: '2-cateL3Code2',
                level: '2',
                params: [
                    {
                        infoCode: '2-2-infoCode1',
                        infoCodeName: '2-2-infoCodeName1'
                    }
                ],
                children: [
                    {
                        title: '2-2-euqipName1',
                        id: '2-2-euqipCode1',
                        level: '3'
                    },
                    {
                        title: '2-2-euqipName2',
                        id: '2-2-euqipCode2',
                        level: '3'
                    }
                ]
            }
        ]
    }
];
export default {
    name: 'CascaderView',
    watch: {
        model1(n, o) {
            console.log(n);
        }
    },
    data() {
        return {
            model2: [],
            model3: [],
            cascaderData1: [
                {
                    title: 'United Kingdom',
                    id: 'id1',
                    children: [
                        { id: 'id2', title: 'London', disabled: true },
                        { id: 'id3', title: 'Edinburgh' },
                        { id: 'id4', title: 'Cardiff' },
                        { id: 'id5', title: 'Birmingham' },
                        { id: 'id6', title: 'Liverpool' },
                        { id: 'id7', title: 'Oxford' },
                        { id: 'id8', title: 'Plymouth' }
                    ]
                },
                {
                    title: 'AMERICAN',
                    id: 'id9',
                    children: [
                        { id: 'id10', title: 'Chicago' },
                        { id: 'id11', title: 'Philadelphia', disabled: true },
                        { id: 'id12', title: 'Boston' },
                        { id: 'id13', title: 'Houston' },
                        { id: 'id14', title: 'Atlanta' },
                        { id: 'id15', title: 'San Francisco' }
                    ]
                },
                {
                    title: 'CHINA',
                    id: 'id16',
                    children: [
                        { id: 'id17', title: 'BeiJing' },
                        { id: 'id18', title: 'ShangHAI' },
                        {
                            title: 'GuiYang',
                            id: 'id19',
                            children: [
                                { id: 'id20', title: 'Qingyan' },
                                { id: 'id21', title: 'Guian' }
                            ]
                        },
                        { id: 'id22', title: 'ZunYi' }
                    ]
                },
                {
                    title: '韩国',
                    id: 'id23',
                    children: [
                        { id: 'id24', title: '首尔' },
                        { id: 'id25', title: '仁川' },
                        { id: 'id26', title: '釜山' },
                        { id: 'id27', title: '蔚山' }
                    ]
                }
            ],

            cascaderData2: [
                {
                    title: 'United Kingdom',
                    id: 'id1',
                    children: [
                        { id: 'id2', title: 'London', disabled: true },
                        { id: 'id3', title: 'Edinburgh' },
                        { id: 'id4', title: 'Cardiff' },
                        { id: 'id5', title: 'Birmingham' },
                        { id: 'id6', title: 'Liverpool' },
                        { id: 'id7', title: 'Oxford' },
                        { id: 'id8', title: 'Plymouth' }
                    ]
                },
                {
                    title: 'AMERICAN',
                    id: 'id9',
                    children: [
                        { id: 'id10', title: 'Chicago' },
                        { id: 'id11', title: 'Philadelphia', disabled: true },
                        { id: 'id12', title: 'Boston' },
                        { id: 'id13', title: 'Houston' },
                        { id: 'id14', title: 'Atlanta' },
                        { id: 'id15', title: 'San Francisco' }
                    ]
                },
                {
                    title: 'CHINA',
                    id: 'id16',
                    children: [
                        { id: 'id17', title: 'BeiJing' },
                        { id: 'id18', title: 'ShangHAI' },
                        {
                            title: 'GuiYang',
                            id: 'id19',
                            children: [
                                { id: 'id20', title: 'Qingyan' },
                                { id: 'id21', title: 'Guian' }
                            ]
                        },
                        { id: 'id22', title: 'ZunYi' }
                    ]
                },
                {
                    title: '韩国',
                    id: 'id23',
                    children: [
                        { id: 'id24', title: '首尔' },
                        { id: 'id25', title: '仁川' },
                        { id: 'id26', title: '釜山' },
                        { id: 'id27', title: '蔚山' }
                    ]
                }
            ],
            cascaderData3: [
                {
                    title: 'United Kingdom',
                    id: 'id1',
                    children: [
                        { id: 'id2', title: 'London' },
                        { id: 'id3', title: 'Edinburgh' },
                        { id: 'id4', title: 'Cardiff' },
                        { id: 'id5', title: 'Birmingham' },
                        { id: 'id6', title: 'Liverpool' },
                        { id: 'id7', title: 'Oxford' },
                        { id: 'id8', title: 'Plymouth' }
                    ]
                },
                {
                    title: 'AMERICAN',
                    id: 'id9',
                    children: [
                        { id: 'id10', title: 'Chicago' },
                        { id: 'id11', title: 'Philadelphia', disabled: true },
                        { id: 'id12', title: 'Boston' },
                        { id: 'id13', title: 'Houston' },
                        { id: 'id14', title: 'Atlanta' },
                        { id: 'id15', title: 'San Francisco' }
                    ]
                },
                {
                    title: 'CHINA',
                    id: 'id16',
                    children: [
                        { id: 'id17', title: 'BeiJing' },
                        { id: 'id18', title: 'ShangHAI' },
                        {
                            title: 'GuiYang',
                            id: 'id19',
                            children: [
                                { id: 'id20', title: 'Qingyan' },
                                { id: 'id21', title: 'Guian' }
                            ]
                        },
                        { id: 'id22', title: 'ZunYi' }
                    ]
                },
                {
                    title: '韩国',
                    id: 'id23',
                    children: [
                        { id: 'id24', title: '首尔' },
                        { id: 'id25', title: '仁川' },
                        { id: 'id26', title: '釜山' },
                        { id: 'id27', title: '蔚山' }
                    ]
                }
            ],
            cascaderData4: [
                {
                    title: 'United Kingdom',
                    id: 'id1',
                    children: [
                        { id: 'id2', title: 'London', disabled: true },
                        { id: 'id3', title: 'Edinburgh' },
                        { id: 'id4', title: 'Cardiff' },
                        { id: 'id5', title: 'Birmingham' },
                        { id: 'id6', title: 'Liverpool' },
                        { id: 'id7', title: 'Oxford' },
                        { id: 'id8', title: 'Plymouth' }
                    ]
                },
                {
                    title: 'AMERICAN',
                    id: 'id9',
                    children: [
                        { id: 'id10', title: 'Chicago' },
                        { id: 'id11', title: 'Philadelphia', disabled: true },
                        { id: 'id12', title: 'Boston' },
                        { id: 'id13', title: 'Houston' },
                        { id: 'id14', title: 'Atlanta' },
                        { id: 'id15', title: 'San Francisco' }
                    ]
                },
                {
                    title: 'CHINA',
                    id: 'id16',
                    children: [
                        { id: 'id17', title: 'BeiJing' },
                        { id: 'id18', title: 'ShangHAI' },
                        {
                            title: 'GuiYang',
                            id: 'id19',
                            children: [
                                { id: 'id20', title: 'Qingyan' },
                                { id: 'id21', title: 'Guian' }
                            ]
                        },
                        { id: 'id22', title: 'ZunYi' }
                    ]
                },
                {
                    title: '韩国',
                    id: 'id23',
                    children: [
                        { id: 'id24', title: '首尔' },
                        { id: 'id25', title: '仁川' },
                        { id: 'id26', title: '釜山' },
                        { id: 'id27', title: '蔚山' }
                    ]
                }
            ],
            cascaderData5: [
                {
                    title: 'United Kingdom',
                    id: 'id1',
                    children: [
                        { id: 'id2', title: 'London', disabled: true },
                        { id: 'id3', title: 'Edinburgh' },
                        { id: 'id4', title: 'Cardiff' },
                        { id: 'id5', title: 'Birmingham' },
                        { id: 'id6', title: 'Liverpool' },
                        { id: 'id7', title: 'Oxford' },
                        { id: 'id8', title: 'Plymouth' }
                    ]
                },
                {
                    title: 'AMERICAN',
                    id: 'id9',
                    children: [
                        { id: 'id10', title: 'Chicago' },
                        { id: 'id11', title: 'Philadelphia', disabled: true },
                        { id: 'id12', title: 'Boston' },
                        { id: 'id13', title: 'Houston' },
                        { id: 'id14', title: 'Atlanta' },
                        { id: 'id15', title: 'San Francisco' }
                    ]
                },
                {
                    title: 'CHINA',
                    id: 'id16',
                    children: [
                        { id: 'id17', title: 'BeiJing' },
                        { id: 'id18', title: 'ShangHAI' },
                        {
                            title: 'GuiYang',
                            id: 'id19',
                            children: [
                                { id: 'id20', title: 'Qingyan' },
                                { id: 'id21', title: 'Guian' }
                            ]
                        },
                        { id: 'id22', title: 'ZunYi' }
                    ]
                },
                {
                    title: '韩国',
                    id: 'id23',
                    children: [
                        { id: 'id24', title: '首尔' },
                        { id: 'id25', title: '仁川' },
                        { id: 'id26', title: '釜山' },
                        { id: 'id27', title: '蔚山' }
                    ]
                }
            ],
            cascaderData6: [
                {
                    title: 'United Kingdom',
                    id: 'id1',
                    children: [
                        { id: 'id2', title: 'London', disabled: true },
                        { id: 'id3', title: 'Edinburgh' },
                        { id: 'id4', title: 'Cardiff' },
                        { id: 'id5', title: 'Birmingham' },
                        { id: 'id6', title: 'Liverpool' },
                        { id: 'id7', title: 'Oxford' },
                        { id: 'id8', title: 'Plymouth' }
                    ]
                },
                {
                    title: 'AMERICAN',
                    id: 'id9',
                    children: [
                        { id: 'id10', title: 'Chicago' },
                        { id: 'id11', title: 'Philadelphia', disabled: true },
                        { id: 'id12', title: 'Boston' },
                        { id: 'id13', title: 'Houston' },
                        { id: 'id14', title: 'Atlanta' },
                        { id: 'id15', title: 'San Francisco' }
                    ]
                },
                {
                    title: 'CHINA',
                    id: 'id16',
                    children: [
                        { id: 'id17', title: 'BeiJing' },
                        { id: 'id18', title: 'ShangHAI' },
                        {
                            title: 'GuiYang',
                            id: 'id19',
                            children: [
                                { id: 'id20', title: 'Qingyan' },
                                { id: 'id21', title: 'Guian' }
                            ]
                        },
                        { id: 'id22', title: 'ZunYi' }
                    ]
                },
                {
                    title: '韩国',
                    id: 'id23',
                    children: [
                        { id: 'id24', title: '首尔' },
                        { id: 'id25', title: '仁川' },
                        { id: 'id26', title: '釜山' },
                        { id: 'id27', title: '蔚山' }
                    ]
                }
            ],
            cascaderData7: [
                {
                    title: 'United Kingdom',
                    id: 'id1',
                    children: [
                        { id: 'id2', title: 'London', disabled: true },
                        { id: 'id3', title: 'Edinburgh' },
                        { id: 'id4', title: 'Cardiff' },
                        { id: 'id5', title: 'Birmingham' },
                        { id: 'id6', title: 'Liverpool' },
                        { id: 'id7', title: 'Oxford' },
                        { id: 'id8', title: 'Plymouth' }
                    ]
                },
                {
                    title: 'AMERICAN',
                    id: 'id9',
                    children: [
                        { id: 'id10', title: 'Chicago' },
                        { id: 'id11', title: 'Philadelphia', disabled: true },
                        { id: 'id12', title: 'Boston' },
                        { id: 'id13', title: 'Houston' },
                        { id: 'id14', title: 'Atlanta' },
                        { id: 'id15', title: 'San Francisco' }
                    ]
                },
                {
                    title: 'CHINA',
                    id: 'id16',
                    children: [
                        { id: 'id17', title: 'BeiJing' },
                        { id: 'id18', title: 'ShangHAI' },
                        {
                            title: 'GuiYang',
                            id: 'id19',
                            children: [
                                { id: 'id20', title: 'Qingyan' },
                                { id: 'id21', title: 'Guian' }
                            ]
                        },
                        { id: 'id22', title: 'ZunYi' }
                    ]
                },
                {
                    title: '韩国',
                    id: 'id23',
                    children: [
                        { id: 'id24', title: '首尔' },
                        { id: 'id25', title: '仁川' },
                        { id: 'id26', title: '釜山' },
                        { id: 'id27', title: '蔚山' }
                    ]
                }
            ],
            cascaderData8: [
                {
                    title: 'United Kingdom',
                    id: 'id1',
                    children: [
                        { id: 'id2', title: 'London', disabled: true },
                        { id: 'id3', title: 'Edinburgh' },
                        { id: 'id4', title: 'Cardiff' },
                        { id: 'id5', title: 'Birmingham' },
                        { id: 'id6', title: 'Liverpool' },
                        { id: 'id7', title: 'Oxford' },
                        { id: 'id8', title: 'Plymouth' }
                    ]
                },
                {
                    title: 'AMERICAN',
                    id: 'id9',
                    children: [
                        { id: 'id10', title: 'Chicago' },
                        { id: 'id11', title: 'Philadelphia', disabled: true },
                        { id: 'id12', title: 'Boston' },
                        { id: 'id13', title: 'Houston' },
                        { id: 'id14', title: 'Atlanta' },
                        { id: 'id15', title: 'San Francisco' }
                    ]
                },
                {
                    title: 'CHINA',
                    id: 'id16',
                    children: [
                        { id: 'id17', title: 'BeiJing' },
                        { id: 'id18', title: 'ShangHAI' },
                        {
                            title: 'GuiYang',
                            id: 'id19',
                            children: [
                                { id: 'id20', title: 'Qingyan' },
                                { id: 'id21', title: 'Guian' }
                            ]
                        },
                        { id: 'id22', title: 'ZunYi' }
                    ]
                },
                {
                    title: '韩国',
                    id: 'id23',
                    children: [
                        { id: 'id24', title: '首尔' },
                        { id: 'id25', title: '仁川' },
                        { id: 'id26', title: '釜山' },
                        { id: 'id27', title: '蔚山' }
                    ]
                }
            ],
            cascaderData9: [
                {
                    title: 'United Kingdom',
                    id: 'id1'
                },
                {
                    title: 'AMERICAN',
                    id: 'id2'
                },
                {
                    title: 'CHINA',
                    id: 'id3'
                }
            ],
            alarmTypem: ['2-2-euqipCode2'], // 报警类型默认选项
            alarmTypeArr
        };
    },
    methods: {
        testChange(data) {
        },
        testChange2(data) {
        },
        testConfirm(data) {
        },
        loadData2(item, callback) {
            item.loading = true;
            setTimeout(() => {
                if (item.title === 'United Kingdom') {
                    item.children = [
                        {
                            title: 'UK1'
                        },
                        {
                            title: 'UK2'
                        },
                        {
                            title: 'UK3'
                        }
                    ];
                } else if (item.title === 'AMERICAN') {
                    item.children = [
                        {
                            title: 'AMERICAN1'
                        },
                        {
                            title: 'AMERICAN2'
                        },
                        {
                            title: 'AMERICAN3'
                        }
                    ];
                } else if (item.title === 'CHINA') {
                    item.children = [
                        {
                            title: 'CHINA1'
                        },
                        {
                            title: 'CHINA2'
                        },
                        {
                            title: 'CHINA3'
                        }
                    ];
                }
                item.loading = false;
                callback();
            }, 1000);
        },
        focusChange(bol) {
            console.log('........Cascader:', bol);
        }
    }
};
</script>

<style lang="stylus">
.cascader-display-panel
    display flex
    justify-content space-between
    //width 800px
    margin-top 120px
    margin-left 40px
    div
        h5
            margin-bottom 12px
</style>
