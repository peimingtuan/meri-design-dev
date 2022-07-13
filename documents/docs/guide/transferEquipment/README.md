### TransferEquipment 针对设备设施项目的穿梭框
<template>
    <div class="transfer">
        <h3>3.设备设施穿梭框-不联动</h3>
        <transferEquipment :data="treeData" :linkage="false" @confirm="treeConfirm" />
    </div>
</template>

<script>
    const dataArr=[
        {
            id: '0', name: '顶级', open: true, checked: 'uncheck',panel:false,tag: {name: '分项', color: '#FAF1D1'},
            children: [
                {
                    id: '1',  name: '一级1', open: true, checked: 'uncheck',tag: {name: '分项', color: '#FAF1D1'},
                    children: [
                        {id: '12', name: '一二级2', checked: 'checked', disabled: true},
                        {id: '121', name: '一二级3', checked: 'uncheck'},
                        {id: '122', name: '一二级4', checked: 'uncheck'},
                        {
                            id: '1321', name: '二级1', open: true, checked: 'uncheck',
                            children: [
                                {id: '13', name: '二三级2', checked: 'uncheck', tag: {name: '分项', color: '#FAF1D1'}},
                                {id: '131', name: '二三级3', checked: 'uncheck', tag: {name: '计算单元', color: '#EFF0F1'}},
                                {id: '132', name: '二三级4', checked: 'uncheck'},
                            ]
                        }
                    ]
                },
                {
                    id: '2', name: '一级2', open: true, checked: 'uncheck', disabled: false,
                    children: [
                        {id: '222', name: '二二级2', checked: 'checked', disabled: true},
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
        name: "TransferView",
        data() {
            return {
                treeData: dataArr, // type: Array
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
.transfer
    padding 16px
    h3
        font-size 16px
        margin 12px

</style>

```vue
<template>
    <div class="transfer">
        <h3>3.设备设施穿梭框-不联动</h3>
        <TransferEquipment :data="treeData" :linkage="false" @confirm="treeConfirm" />
    </div>
</template>

<script>
    const dataArr=[
        {
            id: '0', name: '顶级', open: true, checked: 'uncheck',panel:false,tag: {name: '分项', color: '#FAF1D1'},
            children: [
                {
                    id: '1',  name: '一级1', open: true, checked: 'uncheck',tag: {name: '分项', color: '#FAF1D1'},disabled: true,
                    children: [
                        {id: '12', name: '一二级2', checked: 'checked', disabled: true},
                        {id: '121', name: '一二级3', checked: 'uncheck'},
                        {id: '122', name: '一二级4', checked: 'uncheck'},
                        {
                            id: '1321', name: '二级1', open: true, checked: 'uncheck',
                            children: [
                                {id: '13', name: '二三级2', checked: 'uncheck', tag: {name: '分项', color: '#FAF1D1'}},
                                {id: '131', name: '二三级3', checked: 'uncheck', tag: {name: '计算单元', color: '#EFF0F1'}},
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
        name: "TransferView",
        data() {
            return {
                treeData: dataArr, // type: Array
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
.transfer
    padding 16px
    h3
        font-size 16px
        margin 12px

</style>

```

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| data    | 数据列表 | Array | [] | Yes     |
| linkage    | 树形结构上下级是否联动 | Boolean | true | No     |
| @cancel   | 取消回调 | Function | -- | No     |
| @confirm    | 确定回调，返回选中的id组 | Function | -- | Yes     |


### data参数说明

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| id    | id | String | '' | Yes     |
| name   | name | String | '' | Yes     |
| open   | 是否展开子项 | Boolean | false | Yes     |
| disabled   | 是否禁用 | Boolean | false | Yes     |
| tag: {name: '分项', color: '#FAF1D1'}   | 树节点的标签tag（采用组件库tag） | Object | '' | No     |
| checked   | 是否选中（可选值：uncheck/checked/notNull） | String | uncheck | Yes     |

::: tip
tag参数：
<br>
name: tag显示的内容
<br>
color: tag的颜色，采用tag组件提供的颜色
:::
