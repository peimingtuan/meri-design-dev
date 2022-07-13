<template>
    <div class="component component-padding">
         <h1 class="components-title">Tree组件</h1>
        <div class="treeCom">
            <!--
            <div>
                 <h3 class="components-title-h3">1.单选</h3>
                <PTree
                        v-model="singleId"
                        :data="treeData"
                        @change="change"
                        @openNode="openNode"
                />
            </div>
            <div>
                 <h3 class="components-title-h3">2.多选-联动</h3>
                <PTree
                        v-model="multipleId"
                        :data="treeData2"
                        :multiple="true"
                        :includeParent="false"
                        @change="change2"
                        @openNode="openNode"
                />
            </div>
            -->
            <!--
            <div>
                 <h3 class="components-title-h3">2.1.多选-联动-返回半选状态数据</h3>
                <PTree
                        :multiple="true"
                        :notNull="true"
                        :includeParent="false"
                        :data="treeData21"
                        @change="change21"
                />
            </div>
            <div>
                 <h3 class="components-title-h3">3.多选-不联动</h3>
                <PTree
                        :multiple="true"
                        :linkage="false"
                        :data="treeData3"
                        @change="change3"
                />
            </div>
            <div>
                 <h3 class="components-title-h3">4.多选-只能选择末级</h3>
                <PTree
                        :multiple="true"
                        :linkage="false"
                        :lastStage="true"
                        :data="treeData4"
                        @change="change4"
                />
            </div>
            -->
            <!--
            <div>
                 <h3 class="components-title-h3">5.父级选中子级禁用，子级选中不影响父级</h3>
                <PTree
                        :multiple="true"
                        :childDisable="true"
                        v-model="multipleId5"
                        :data="treeData5"
                        @change="change5"
                />
            </div>
            <div>
                 <h3 class="components-title-h3">6.通过slot自定义内容</h3>
                <PTree
                        render="custom"
                        :multiple="true"
                        :allCheckboxShow="false"
                        :childDisable="true"
                        v-model="multipleId5"
                        :data="treeData5"
                        @change="change5"
                >
                    <template v-for="td in tileData5" #[td.id]="{item}">
                        <div class="section-tag" :key="td.id">
                            <section class="p-tree-com-checkbox">
                                <Checkbox
                                        :disabled="item.disabled"
                                        :checked="item.checked"
                                />
                            </section>
                            <article class="p-tree-com-text">{{item.name}}</article>
                        </div>
                    </template>
                </PTree>
            </div>
            <div>
                <h3 class="components-title-h3">7.设置checkbox显示与否</h3>
                <PTree
                    :multiple="true"
                    :childDisable="true"
                    v-model="multipleId5"
                    :data="TreeData5"
                    @change="change5"
                />
            </div>
            -->
            <div>
                <h3 class="components-title-h3">6.通过slot自定义内容</h3>
<!--                :allCheckboxShow="false"-->
                <PTree
                    render="custom"
                    :multiple="true"
                    :childDisable="true"
                    v-model="multipleId5"
                    :data="treeData5"
                    @change="change5"
                >
                    <template v-for="td in tileData5" #[td.id]="{item}">
                        <div class="section-tag" :key="td.id">
<!--                            <section class="p-tree-com-checkbox">-->
<!--                                <Checkbox-->
<!--                                    :disabled="item.disabled"-->
<!--                                    :checked="item.checked"-->
<!--                                />-->
<!--                            </section>-->
                            <article class="p-tree-com-text">{{item.name}}</article>
                        </div>
                    </template>
                </PTree>
            </div>
        </div>
    </div>
</template>

<script>

/**
     * 参数说明
     * @id id String
     *
     * @name name String
     *
     * @checked 参数状态 String
     * uncheck 未选中
     * checked 选中
     * notNull 非空
     *
     * @open 展开子项 Boolean
     *
     * @isHide 是否隐藏 Boolean
     */
import TreeData from 'treeData';
import CreatePTreeJson from 'createPTreeJson';
import Checkbox from '../../components/Checkbox/Checkbox';

const TreeData5 = CreatePTreeJson(3);
// console.log(TreeData5);

const dataArr = [
    {
        id: '0',
        name: '顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级',
        open: true,
        children: [
            {
                id: '1',
                name: '一级1',
                open: true,
                children: [
                    { id: '12', name: '二级2' },
                    { id: '121', name: '二级3' },
                    { id: '122', name: '二级4' },
                    {
                        id: '1321',
                        name: '二级1',
                        open: true,
                        defaultDisabled: true,
                        children: [
                            { id: '13', name: '三级2' },
                            { id: '131', name: '三级3' },
                            { id: '132', name: '三级4' }
                        ]
                    }
                ]
            },
            {
                id: '2',
                name: '一级2',
                children: [
                    { id: '222', name: '二级2' },
                    { id: '2221', name: '二级1' },
                    { id: '2222', name: '二级3' }
                ]
            },
            {
                id: '3',
                name: '一级3',
                children: [
                    { id: '322', name: '二级2' },
                    { id: '3220', name: '二级0' },
                    { id: '3221', name: '二级1' }
                ]
            }
        ]
    }
];

export default {
    name: 'PTreeView',
    components: { Checkbox },
    data() {
        return {
            singleId: '12',
            multipleId: ['12', '121', '322'],
            multipleId2: ['12', '121', '322'],
            treeData: dataArr, // type: Array
            treeData2: JSON.parse(JSON.stringify(dataArr)), // type: Array
            treeData21: JSON.parse(JSON.stringify(dataArr)), // type: Array
            treeData3: JSON.parse(JSON.stringify(dataArr)), // type: Array
            treeData4: JSON.parse(JSON.stringify(dataArr)), // type: Array
            multipleId5: ['1321'],
            treeData5: [], // type: Array
            tileData5: [], // type: Array
            TreeData,
            TreeData5
        };
    },
    mounted() {
        const treeData = JSON.parse(JSON.stringify(dataArr));
        this.setTileTool([], treeData).then(res => {
            this.tileData5 = res;
            this.treeData5 = treeData;
        });
    },
    methods: {
        // 选择的项
        change(item) {
            console.log('选择的项::::', item);
        },
        // 选择的项
        change2({ item, checkedIds, checkedData }) {
            console.log('选择的项::::', item, checkedIds, checkedData);
        },
        // 选择的项
        change21({ item, checkedIds, checkedData }) {
            console.log('选择的项::::', item, checkedIds, checkedData);
        },
        // 选择的项
        change3({ item, checkedIds, checkedData }) {
            console.log('选择的项::::', item, checkedIds, checkedData);
        },
        // 选择的项
        change4({ item, checkedIds, checkedData }) {
            console.log('选择的项::::', item, checkedIds, checkedData);
        },
        // 选择的项
        change5({ item, checkedIds, checkedData }) {
            console.log('选择的项::::', item, checkedIds, checkedData);
        },
        // 展开子项
        openNode(item) {
            console.log('展开子项::', item);
        },

        // 平铺数据
        setTileTool(result, tree, parentId = '-1') {
            return new Promise(resolve => {
                tree.forEach(d => {
                    const obj = {
                        parentId,
                        id: d.id,
                        name: d.name
                    };
                    result.push(obj);
                    if (d.children && d.children instanceof Array && JSON.stringify(d.children).length > 4) {
                        this.setTileTool(result, d.children, d.id);
                    }
                });
                resolve(result);
            });
        }
    }
};
</script>

<style lang="stylus" scoped>

.component-padding
    padding-bottom 200px !important
    .treeCom
        display flex
        justify-content space-between
        width 100%
        > div
            width 190px
            margin-right 24px
            overflow-y auto
    .section-tag
        display flex

</style>
