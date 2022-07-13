<template>
    <div class="transfer">
         <h3 class="components-title-h3">1.一维结构</h3>
        <Transfer :data="selectData" height="300" @confirm="treeConfirm" @cancel="treeCancel" />
         <h3 class="components-title-h3">2.树形结构-联动</h3>
        <Transfer :data="treeData" @confirm="treeConfirm" />
         <h3 class="components-title-h3">2.1.树形结构-联动-返回半选状态的数据</h3>
        <Transfer :data="treeData1" :notNull="true" @confirm="treeConfirm1" />
         <h3 class="components-title-h3">3.树形结构-不联动</h3>
        <Transfer :data="treeData2" :linkage="false" @confirm="treeConfirm2" />
         <h3 class="components-title-h3">4.树形结构-只能选择末级</h3>
        <Transfer :data="treeData3" :linkage="false" :lastStage="true" @confirm="treeConfirm3" />
    </div>
</template>

<script>
const selectData = [
    { id: '100', name: '乔峰', selected: false },
    { id: '200', name: '阿三2', selected: false },
    { id: '300', name: '段誉3', selected: false },
    { id: '400', name: '阿紫4', selected: false },
    { id: '500', name: '洪七公5', selected: false },
    { id: '600', name: '慕容复6', selected: false },
    { id: '700', name: '慕容复7', selected: false },
    { id: '800', name: '慕容复8', selected: false },
    { id: '900', name: '慕容复9', selected: false },
    { id: '1000', name: '慕容复10', selected: false },
    { id: '1100', name: '慕容复11', selected: false },
    { id: '1200', name: '慕容复12', selected: false },
    { id: '1300', name: '慕容复13', selected: false }
];
const dataArr = [
    {
        id: '0',
        name: '顶级',
        open: true,
        checked: 'checked',
        children: [
            {
                id: '1',
                name: '一级1',
                open: true,
                checked: 'checked',
                children: [
                    { id: '12', name: '一二级2', checked: 'checked' },
                    { id: '121', name: '一二级3', checked: 'checked' },
                    { id: '122', name: '一二级4', checked: 'checked' },
                    {
                        id: '1321',
                        name: '二级1',
                        open: true,
                        checked: 'uncheck',
                        children: [
                            { id: '13', name: '二三级2', checked: 'uncheck' },
                            { id: '131', name: '二三级3', checked: 'uncheck' },
                            { id: '132', name: '二三级4', checked: 'uncheck' }
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
                    { id: '222', name: '二二级2', checked: 'uncheck' },
                    { id: '2221', name: '二二级1', checked: 'uncheck' },
                    { id: '2222', name: '二二级3', checked: 'uncheck' }
                ]
            },
            {
                id: '3',
                name: '一级3',
                open: true,
                checked: 'uncheck',
                children: [
                    { id: '3220', name: '三二级0', checked: 'uncheck' },
                    { id: '3221', name: '三二级1', checked: 'uncheck' },
                    { id: '322', name: '三二级2', checked: 'uncheck' }
                ]
            }
        ]
    }
];
export default {
    name: 'TransferView',
    data() {
        return {
            selectData, // type: Array
            treeData: dataArr, // type: Array
            treeData1: JSON.parse(JSON.stringify(dataArr)), // type: Array
            treeData2: JSON.parse(JSON.stringify(dataArr)), // type: Array
            treeData3: JSON.parse(JSON.stringify(dataArr)) // type: Array
        };
    },
    methods: {
        treeConfirm(ids, dataObj) {
            console.log('1确定：：：', ids);
            console.log('1确定：：：', dataObj);
        },
        treeConfirm1(ids, dataObj) {
            console.log('2确定：：：', ids);
            console.log('2确定：：：', dataObj);
        },
        treeConfirm2(ids, dataObj) {
            console.log('3确定：：：', ids);
            console.log('3确定：：：', dataObj);
        },
        treeConfirm3(ids, dataObj) {
            console.log('4确定：：：', ids);
            console.log('4确定：：：', dataObj);
        },
        treeCancel() {
            console.log('cancel');
        }
    }
};
</script>

<style lang="stylus" scoped>
.transfer
    padding 16px
    h3
        font-size 16px
        margin 12px

</style>
