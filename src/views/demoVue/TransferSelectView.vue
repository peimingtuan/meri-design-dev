<template>
    <div class="transferSelect">
        <div class="transferSelectList">
             <h3 class="components-title-h3">1.一维结构</h3>
            <TransferSelect
                    title="已选设备"
                    unit="个"
                    placeholder="添加设备"
                    tipPlace="bottom"
                    :linkage="false"
                    :lastStage="true"
                    height="300"
                    :data="selectData"
                    @confirm="treeConfirm"
            />
        </div>
        <div class="transferSelectList">
             <h3 class="components-title-h3">2.树形结构</h3>
            <TransferSelect
                    title="已选设备"
                    unit="个"
                    placeholder="添加设备"
                    tipPlace="top"
                    height="300"
                    :data="treeData"
                    @confirm="treeConfirm"
            />
        </div>
        <div class="transferSelectList">
             <h3 class="components-title-h3">2.1.树形结构-返回半选状态的数据</h3>
            <TransferSelect
                    title="已选设备"
                    unit="个"
                    placeholder="添加设备"
                    tipPlace="bottom"
                    height="300"
                    :notNull="true"
                    :data="treeData1"
                    @confirm="treeConfirm"
            />
        </div>
        <div class="transferSelectList">
             <h3 class="components-title-h3">3.树形结构-上下级不联动</h3>
            <TransferSelect
                    title="已选设备"
                    unit="个"
                    placeholder="添加设备"
                    tipPlace="right"
                    :linkage="false"
                    height="300"
                    :data="treeData2"
                    @confirm="treeConfirm"
            />
        </div>
        <div class="transferSelectList" style="padding-left: 300px; width: 600px">
             <h3 class="components-title-h3">4.树形结构-只能选择末级</h3>
            <TransferSelect
                    title="已选设备"
                    unit="个"
                    placeholder="添加设备"
                    tipPlace="left"
                    :linkage="false"
                    :lastStage="true"
                    height="300"
                    :data="treeData3"
                    @confirm="treeConfirm"
            />
        </div>
    </div>
</template>

<script>
    const selectData=[
        {id: '100', name: '乔峰', selected: false},
        {id: '200', name: '阿三2', selected: false},
        {id: '300', name: '段誉3', selected: false},
        {id: '400', name: '阿紫4', selected: false},
        {id: '500', name: '洪七公5', selected: false},
        {id: '600', name: '慕容复6', selected: false},
        {id: '700', name: '慕容复7', selected: false},
        {id: '800', name: '慕容复8', selected: false},
        {id: '900', name: '慕容复9', selected: false},
        {id: '1000', name: '慕容复10', selected: false},
        {id: '1100', name: '慕容复11', selected: false},
        {id: '1200', name: '慕容复12', selected: false},
        {id: '1300', name: '慕容复13', selected: false},
    ];
    const dataArr=[
        {
            id: '0', name: '顶级', open: true, checked: 'uncheck',
            children: [
                {
                    id: '1',  name: '一级1', open: true, checked: 'uncheck',
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
                        {id: '2222', name: '二二级3',checked: 'uncheck'}
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
    export default {
        name: "TransferSelectView",
        data() {
            return {
                selectData, // type: Array
                treeData: dataArr, // type: Array
                treeData1: JSON.parse(JSON.stringify(dataArr)), // type: Array
                treeData2: JSON.parse(JSON.stringify(dataArr)), // type: Array
                treeData3: JSON.parse(JSON.stringify(dataArr)), // type: Array
            }
        },
        methods: {
            treeConfirm(ids) {
                console.log('确定：：：', ids);
            }
        }
    }
</script>

<style lang="stylus" scoped>
.transferSelect
    padding 16px
    .transferSelectList
        width 300px
    h3
        font-size 16px
        margin 12px

</style>
