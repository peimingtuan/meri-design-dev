<template>
    <div class="component component-padding">
         <h1 class="components-title">Tree组件</h1>
        <div class="treeCom">
            <!--
            <div>
                 <h3 class="components-title-h3">1.单选</h3>
                <Tree
                        :data="treeData"
                        @change="change"
                        @openNode="openNode"
                />
            </div>
            -->
            <div>
                 <h3 class="components-title-h3">2.多选-联动</h3>
                <Tree
                        :multiple="true"
                        :data="TreeData5"
                        @change="change2"
                        @openNode="openNode"
                />
            </div>
            <!--
            <div>
                 <h3 class="components-title-h3">2.1.多选-联动-返回半选状态数据</h3>
                <Tree
                        :multiple="true"
                        :notNull="true"
                        :data="treeData21"
                        @change="change21"
                />
            </div>
            <div>
                 <h3 class="components-title-h3">3.多选-不联动</h3>
                <Tree
                        :multiple="true"
                        :linkage="false"
                        :data="treeData3"
                        @change="change3"
                />
            </div>
            <div>
                 <h3 class="components-title-h3">4.多选-只能选择末级</h3>
                <Tree
                        :multiple="true"
                        :linkage="false"
                        :lastStage="true"
                        :data="treeData4"
                        @change="change4"
                />
            </div>
            -->
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
import CreatePTreeJson from 'createPTreeJson';

const TreeData5 = CreatePTreeJson(7);
const dataArr = [
    {
        id: '0',
        name: '顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级',
        open: true,
        checked: 'uncheck',
        disabled: true,
        children: [
            {
                id: '1',
                name: '一级1',
                open: true,
                checked: 'uncheck',
                disabled: true,
                children: [
                    { id: '12', name: '二级2', checked: 'uncheck' },
                    {
                        id: '121', name: '二级3', checked: 'uncheck', disabled: true
                    },
                    { id: '122', name: '二级4', checked: 'uncheck' },
                    {
                        id: '1321',
                        name: '二级1',
                        open: true,
                        checked: 'uncheck',
                        children: [
                            { id: '13', name: '三级2', checked: 'uncheck' },
                            { id: '131', name: '三级3', checked: 'uncheck' },
                            { id: '132', name: '三级4', checked: 'uncheck' }
                        ]
                    }
                ]
            },
            {
                id: '2',
                name: '一级2',
                open: true,
                checked: 'uncheck',
                children: [
                    { id: '222', name: '二级2', checked: 'uncheck' },
                    { id: '2221', name: '二级1', checked: 'uncheck' },
                    { id: '2222', name: '二级3', checked: 'uncheck' }
                ]
            },
            {
                id: '3',
                name: '一级3',
                open: true,
                checked: 'uncheck',
                children: [
                    { id: '322', name: '二级2', checked: 'uncheck' },
                    { id: '3220', name: '二级0', checked: 'uncheck' },
                    { id: '3221', name: '二级1', checked: 'uncheck' }
                ]
            }
        ]
    }
];
export default {
    name: 'TreeView',
    data() {
        return {
            treeData: dataArr, // type: Array
            treeData2: JSON.parse(JSON.stringify(dataArr)), // type: Array
            treeData21: JSON.parse(JSON.stringify(dataArr)), // type: Array
            treeData3: JSON.parse(JSON.stringify(dataArr)), // type: Array
            treeData4: JSON.parse(JSON.stringify(dataArr)), // type: Array
            TreeData5
        };
    },
    methods: {
        // 选择的项
        change({ id }) {
            console.log('选择的项::::', id);
        },
        // 选择的项
        change2({ id, checkedIds }) {
            console.log('选择的项::::', id, checkedIds);
        },
        // 选择的项
        change21({ id, checkedIds }) {
            console.log('选择的项::::', id, checkedIds);
        },
        // 选择的项
        change3({ id, checkedIds }) {
            console.log('选择的项::::', id, checkedIds);
        },
        // 选择的项
        change4({ id, checkedIds }) {
            console.log('选择的项::::', id, checkedIds);
        },
        openNode(open, item) {
            console.log('---', open, item);
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

</style>
