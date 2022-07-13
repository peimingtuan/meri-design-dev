<template>
    <div class="MultipleSearchInputView">
        <MultipleSearchInput
            :treeData="dataTreeArr"
            width="250"
            :linkage="true"
            :lastStage="true"
            :notNull="true"
            @focusChange="focusChange"
            :returnParentNode="false"
            :selectedIds="selectedIds"
            placeholder="请选择"
            @change="selectedDataFn"
        >
        </MultipleSearchInput>
    </div>
</template>

<script>
const obj = {
    id: '0',
    name: '万达广场asdasda',
    typeName: '',
    typeId: '',
    children: [
        {
            id: '1',
            name: '中心1',
            children: [
                {
                    id: '11',
                    name: '区域1',
                    children: [
                        {
                            id: '111',
                            name: '项目1',
                            children: [
                                {
                                    id: '1111',
                                    name: 'item1'
                                },
                                {
                                    id: '1112',
                                    name: 'item2'
                                },
                                {
                                    id: '1113',
                                    name: 'item3'
                                }
                            ]
                        },
                        {
                            id: '112',
                            name: '项目2',
                            children: [
                                {
                                    name: 'item1',
                                    id: '1121'
                                },
                                {
                                    name: 'item2',
                                    id: '1122'
                                },
                                {
                                    name: 'item3',
                                    id: '1123'
                                }
                            ]
                        },
                        {
                            id: '113',
                            name: '项目3',
                            children: [
                                {
                                    name: 'item1',
                                    id: 'sssss'
                                },
                                {
                                    name: 'item2',
                                    id: 'aaaaa'
                                },
                                {
                                    name: 'item3',
                                    id: 'qqqqq'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: '12',
                    name: '区域2'
                },
                {
                    id: '13',
                    name: '区域3',
                    children: [
                        {
                            id: '111ddd',
                            name: '项目13',
                            children: [
                                {
                                    id: '11113',
                                    name: 'item13'
                                },
                                {
                                    id: '11123',
                                    name: 'item23'
                                },
                                {
                                    id: '11133',
                                    name: 'item33'
                                }
                            ]
                        },
                        {
                            id: '112ddd',
                            name: '项目22',
                            children: [
                                {
                                    name: 'item12',
                                    id: '11212'
                                },
                                {
                                    name: 'item22',
                                    id: '11222'
                                },
                                {
                                    name: 'item32',
                                    id: '11232'
                                }
                            ]
                        },
                        {
                            id: '113dddd',
                            name: '项目33',
                            children: [
                                {
                                    name: 'item13',
                                    id: '1231'
                                },
                                {
                                    name: 'item23',
                                    id: '1232'
                                },
                                {
                                    name: 'item33',
                                    id: '1233'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: '2',
            name: '中心2',
            children: [
                {
                    id: '212',
                    name: '区域7',
                    children: [
                        {
                            id: '11112',
                            name: '项目12',
                            children: [
                                {
                                    id: '11211',
                                    name: 'item14'
                                },
                                {
                                    id: '12112',
                                    name: 'item24'
                                },
                                {
                                    id: '11413',
                                    name: 'item34'
                                }
                            ]
                        },
                        {
                            id: '112',
                            name: '项目244',
                            children: [
                                {
                                    name: 'item14',
                                    id: 'itemxx'
                                },
                                {
                                    name: 'item24',
                                    id: 'itemcc'
                                },
                                {
                                    name: 'item34',
                                    id: 'itemvv'
                                }
                            ]
                        },
                        {
                            id: '11323',
                            name: '项目323',
                            children: [
                                {
                                    name: 'item123',
                                    id: 'itemsdd'
                                },
                                {
                                    name: 'item223',
                                    id: 'itemdfs'
                                },
                                {
                                    name: 'item323',
                                    id: 'itemgfds'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: '2233',
                    name: '区域833'
                },
                {
                    id: '23332',
                    name: '区域9332'
                }
            ]
        },
        {
            id: '3111',
            name: '中心12123',
            children: [
                {
                    id: '11111',
                    name: '区域1111',
                    children: [
                        {
                            id: '1111111',
                            name: '项目111111',
                            children: [
                                {
                                    id: '11114444',
                                    name: 'item1444'
                                },
                                {
                                    id: '111',
                                    name: 'i44'
                                },
                                {
                                    id: '11134444',
                                    name: 'item34444'
                                }
                            ]
                        },
                        {
                            id: '112888',
                            name: '项目2888',
                            children: [
                                {
                                    name: 'item1888',
                                    id: 'item12'
                                },
                                {
                                    name: 'item2888',
                                    id: 'item32'
                                },
                                {
                                    name: 'item3888',
                                    id: 'item432'
                                }
                            ]
                        },
                        {
                            id: '113999',
                            name: '项目39999',
                            children: [
                                {
                                    name: 'item1999',
                                    id: 'item5324'
                                },
                                {
                                    name: 'item2999',
                                    id: 'item4534'
                                },
                                {
                                    name: 'item3999',
                                    id: 'item6345'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: '12234',
                    name: '区域5345'
                },
                {
                    id: '1323423',
                    name: '区域35234'
                }
            ]
        }
    ]
};
export default {
    name: 'MultipleSearchInputView',
    data() {
        return {
            dataTreeArr: JSON.parse(JSON.stringify(obj)),
            selectedIds: ['1111', '11114444']
        };
    },
    methods: {
        selectedDataFn(ids, sd) {
            console.log('这个是选择的数据', ids);
            console.log('这个是选择的数据', sd);
        },
        focusChange(bol) {
            console.log(bol, '788787878');
        }
    }

};
</script>

<style lang="stylus">
    .MultipleSearchInputView
        display flex
        padding 16px
        width 800px

</style>
