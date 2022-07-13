<template>
    <div class="transfer">
        <h3 class="components-title-h3">3.设备设施穿梭框-不联动</h3>
        <TransferEquipment :data="treeData" :linkage="false" @confirm="treeConfirm" @cancel="treeCancel" />
    </div>
</template>

<script>
const dataArr = [
    {
        id: '0',
        name: '顶级',
        open: true,
        checked: 'uncheck',
        panel: false,
        tag: { name: '分项', color: '#FAF1D1' },
        children: [
            {
                id: '1',
                name: '一级1',
                open: true,
                checked: 'uncheck',
                tag: { name: '分项', color: '#FAF1D1' },
                disabled: true,
                children: [
                    {
                        id: '12', name: '二级2', checked: 'checked', disabled: true
                    },
                    { id: '121', name: '二级3', checked: 'uncheck' },
                    { id: '122', name: '二级4', checked: 'uncheck' },
                    {
                        id: '1321',
                        name: '2级1',
                        open: true,
                        checked: 'uncheck',
                        children: [
                            {
                                id: '13', name: '三级2', checked: 'uncheck', tag: { name: '分项', color: '#FAF1D1' }
                            },
                            {
                                id: '131', name: '三级3', checked: 'uncheck', tag: { name: '计算单元', color: '#EFF0F1' }
                            },
                            {
                                id: '132',
                                name: '3级4',
                                checked: 'uncheck',
                                children: [
                                    {
                                        id: '1321', name: '4级2', checked: 'uncheck', tag: { name: '分项', color: '#FAF1D1' }
                                    },
                                    {
                                        id: '13211', name: '4级3', checked: 'uncheck', tag: { name: '计算单元', color: '#EFF0F1' }
                                    },
                                    {
                                        id: '13212',
                                        name: '4级4',
                                        checked: 'uncheck',
                                        children: [
                                            {
                                                id: '132123', name: '5级2', checked: 'uncheck', tag: { name: '分项', color: '#FAF1D1' }
                                            },
                                            {
                                                id: '132121', name: '5级3', checked: 'uncheck', tag: { name: '计算单元', color: '#EFF0F1' }
                                            },
                                            {
                                                id: '132122',
                                                name: '5级4',
                                                checked: 'uncheck',
                                                children: [
                                                    {
                                                        id: '1321231', name: '6级2', checked: 'uncheck', tag: { name: '分项', color: '#FAF1D1' }
                                                    },
                                                    {
                                                        id: '1321212', name: '6级3', checked: 'uncheck', tag: { name: '计算单元', color: '#EFF0F1' }
                                                    },
                                                    { id: '1321223', name: '6级4', checked: 'uncheck' }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
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
    name: 'TransferEquipmentView',
    data() {
        return {
            treeData: dataArr // type: Array
        };
    },
    methods: {
        treeConfirm(ids) {
            console.log('确定：：：', ids);
        },
        treeCancel(data) {
            console.log(data);
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
