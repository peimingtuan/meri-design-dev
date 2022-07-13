### PTreeSelect 树形下拉列表

::: warning
此组件功能还不完善<br>
:::

::: tip
基于第二版树形结构开发<br>
:::

#### 1.单选
<PTreeSelect
    v-model="singleId"
    :data="data1"
    caption="单选："
    @change="change"
/>

::: details 查看示例
```vue
<PTreeSelect
    v-model="singleId"
    :data="data1"
    caption="单选："
    @change="change"
/>

singleId: '12'
data1 = dataArr
change(item) {
    console.log('单选::', item);
}
```
:::

#### 2.多选
<PTreeSelect
    :data="data2"
    :multiple="true"
    @change="change"
/>

::: details 查看示例
```vue
<PTreeSelect
    :data="data2"
    :multiple="true"
    @change="change"
/>

data2 = dataArr
change(obj) {
    console.log('多选::', obj);
}
```
:::
#### 3.多选 + 可选面板
<PTreeSelect
    v-model="multipleId"
    :data="data3"
    :multiple="true"
    :panel="true"
    dropWidth="500"
    @change="change"
/>

::: details 查看示例
```vue
<PTreeSelect
    v-model="multipleId"
    :data="data3"
    :multiple="true"
    :panel="true"
    dropWidth="500"
    @change="change"
/>

multipleId: ['12', '121', '322']
data3: dataArr
change(obj) {
    console.log('多选::', obj);
}
```
:::
#### 4.多选 + 可选面板 + childDisable
<PTreeSelect
    v-model="multipleId4"
    :data="data4"
    :multiple="true"
    :childDisable="true"
    :panel="true"
    dropWidth="500"
    @change="change"
/>

::: details 查看示例
```vue
<PTreeSelect
    v-model="multipleId4"
    :data="data4"
    :multiple="true"
    :childDisable="true"
    :panel="true"
    dropWidth="500"
    @change="change"
/>

multipleId4: ['13', '131', '132']
data4: dataArr
change(obj) {
    console.log('多选::', obj);
}
```
:::

#### 5.checkbox可配置
<PTreeSelect
    v-model="multipleId5"
    triggerWidth="300"
    caption="标题："
    type="tag"
    placeholder="输入检索内容"
    :data="testServerData"
    :multiple="true"
    :clearHide="true"
    :childDisable="true"
    :panel="true"
    :dropSearch="true"
    dropWidth="600"
    @change="change"
/>

::: details 查看示例
```vue
<PTreeSelect
    v-model="multipleId5"
    triggerWidth="300"
    type="tag"
    placeholder="输入检索内容"
    :data="testServerData"
    :multiple="true"
    :clearHide="true"
    :childDisable="true"
    :panel="true"
    :dropSearch="true"
    dropWidth="600"
    @change="change"
/>

multipleId5: ['BM7b184adf12d149de912361f7c34db8b2']
data: testServerData
change(obj) {
    console.log('多选::', obj);
}
```
:::

#### 示例数据
::: details 示例数据
```javascript
const dataArr = [
    {
        id: '0',
        name: '顶级顶级',
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
                        // defaultDisabled: true,
                        children: [
                            { id: '13', name: '三级2', defaultDisabled: true },
                            { id: '131', name: '三级3', defaultDisabled: true },
                            { id: '132', name: '三级4', defaultDisabled: true }
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

const testServerData = [
       {
           id: 'BM789da012b46b4b9a834aeced21ef1986',
           name: '商管公司',
           parentId: '-1',
           showCheckbox: false,
           children: [
               {
                   id: 'BM324ccef0ffdc4c75996b19378ad4b88a',
                   name: '530一级部门',
                   parentId: 'BM789da012b46b4b9a834aeced21ef1986',
                   children: [{
                       id: 'BM9e8b6baf82df4fc196729fe0b76468c7',
                       name: '下级部门',
                       parentId: 'BM324ccef0ffdc4c75996b19378ad4b88a',
                       children: [{
                           id: 'BM7b184adf12d149de912361f7c34db8b2',
                           name: '下下级部门',
                           parentId: 'BM9e8b6baf82df4fc196729fe0b76468c7',
                           children: [{
                               id: 'BM5a13eb82fc6647c289215aa9a4cf5d08',
                               name: '嘻嘻嘻家',
                               parentId: 'BM7b184adf12d149de912361f7c34db8b2'
                           }]
                       }]
                   }]
               }, {
                   id: 'BM4eb8427421454c0d8b7c1d9108a86cb2',
                   name: '供应商',
                   parentId: 'BM789da012b46b4b9a834aeced21ef1986'
               }, {
                   id: 'BM5625546a71da4248a8e5dc80a5d6fbf1',
                   name: '总部联合检查部门',
                   parentId: 'BM789da012b46b4b9a834aeced21ef1986'
               }, {
                   id: 'BMac6160753ee14108a0a27b6f3681c484',
                   name: '通用部门',
                   parentId: 'BM789da012b46b4b9a834aeced21ef1986',
                   children: [{
                       id: 'BM061ff92e835d462589e736c9cfb3ce31',
                       name: '外委保洁',
                       parentId: 'BMac6160753ee14108a0a27b6f3681c484'
                   }, {
                       id: 'BM89a52ef2d383425dac8e1c12a0bcaf57',
                       name: '外委消防',
                       parentId: 'BMac6160753ee14108a0a27b6f3681c484'
                   }, {
                       id: 'BMc43d7450f9a44b308979710025d98811',
                       name: '外委电梯',
                       parentId: 'BMac6160753ee14108a0a27b6f3681c484'
                   }]
               }, {
                   id: 'BMc830a01ce5924afa857e3c84199c9856',
                   name: '销售物业工程物业部',
                   parentId: 'BM789da012b46b4b9a834aeced21ef1986'
               }, {
                   id: 'BMca6a8b926f6e42c88e1ec7f3229e45ec',
                   name: '工程部',
                   parentId: 'BM789da012b46b4b9a834aeced21ef1986'
               }, {
                   id: 'BMd6db28c1160240a8a78be8993a211d5b',
                   name: '商场物业部',
                   parentId: 'BM789da012b46b4b9a834aeced21ef1986'
               }, {
                   id: 'BMf168a9ac0f4f49a6893bd58df3d32886',
                   name: '行政人事部',
                   parentId: 'BM789da012b46b4b9a834aeced21ef1986'
               }, {
                   id: 'BMM08e02a97e2fa4c5f8c81b2b0975568d3',
                   name: '工程物业部',
                   parentId: 'BM789da012b46b4b9a834aeced21ef1986'
               }, {
                   id: 'BMM2da53957a466400ca2d88985d91ab146',
                   name: '销售物业部',
                   parentId: 'BM789da012b46b4b9a834aeced21ef1986'
               }, {
                   id: 'BMM3fdbe4b5c0474c12929e2018ffe67929',
                   name: '企划部',
                   parentId: 'BM789da012b46b4b9a834aeced21ef1986'
               }, {
                   id: 'BMM47862e0535fb4d3db824ecb5e06a1420',
                   name: '销售物业招商部',
                   parentId: 'BM789da012b46b4b9a834aeced21ef1986'
               }, {
                   id: 'BMM50caea9f8b7f4f77971316e7b1ce9758',
                   name: '财务部',
                   parentId: 'BM789da012b46b4b9a834aeced21ef1986'
               }, {
                   id: 'BMM52f2d18ef23c4e0eb319c921caa272b7',
                   name: '招商营运部',
                   parentId: 'BM789da012b46b4b9a834aeced21ef1986'
               }, {
                   id: 'BMM9131ff3b5c29415799c29d833dcb6b35',
                   name: '安全品质部',
                   parentId: 'BM789da012b46b4b9a834aeced21ef1986'
               }, {
                   id: 'BMM913e46c6c0ae44279b8e440f97a37e08',
                   name: '运营部',
                   parentId: 'BM789da012b46b4b9a834aeced21ef1986'
               }, {
                   id: 'BMM974762df1e5d4f838cae1d684bcd9ed9',
                   name: '销售物业工程部',
                   parentId: 'BM789da012b46b4b9a834aeced21ef1986'
               }, {
                   id: 'BMMd96fc03c4a2e4a6b8a7aa4a086f2d194',
                   name: '超级菜场部',
                   parentId: 'BM789da012b46b4b9a834aeced21ef1986'
               }, {
                   id: 'BMMe50a11e8942b4dc9811f2f66f9c37e9a',
                   name: '总经理室',
                   parentId: 'BM789da012b46b4b9a834aeced21ef1986'
               }, {
                   id: 'BMMfb5cd4e76e1c4209819916e27a8c6ebe',
                   name: '吾悦菜场部',
                   parentId: 'BM789da012b46b4b9a834aeced21ef1986'
               }]
       },
       {
           id: 'BMa14857716d0e4cde8b69fc9e3865bceb',
           name: '商开公司',
           parentId: '-1',
           showCheckbox: false,
           children: [
               {
                   id: 'BMM06aca59687f2461a9ddcc191578385f6',
                   name: '成本部',
                   parentId: 'BMa14857716d0e4cde8b69fc9e3865bceb'
               }, {
                   id: 'BMM41d637e8083846b1a8d7438f8a8eb796',
                   name: '行政人事部',
                   parentId: 'BMa14857716d0e4cde8b69fc9e3865bceb'
               }, {
                   id: 'BMM513841806a7a42e6af41181ee88b0077',
                   name: '技术部',
                   parentId: 'BMa14857716d0e4cde8b69fc9e3865bceb'
               }, {
                   id: 'BMM74a9a9047a784b0086521b3dc87d1a96',
                   name: '财务部',
                   parentId: 'BMa14857716d0e4cde8b69fc9e3865bceb'
               }, {
                   id: 'BMM83ef17f4891b48f5b85844c71668b1c1',
                   name: '营销部',
                   parentId: 'BMa14857716d0e4cde8b69fc9e3865bceb'
               }, {
                   id: 'BMM95044d522a874dca8a58b0f3901c3a3c',
                   name: '总经理室',
                   parentId: 'BMa14857716d0e4cde8b69fc9e3865bceb'
               }, {
                   id: 'BMMa1de89acd20d4e15a853a777c275b114',
                   name: '工程部',
                   parentId: 'BMa14857716d0e4cde8b69fc9e3865bceb'
               }, {
                   id: 'BMMda71778852ba4945a31a3f7eafc5bede',
                   name: '客服部',
                   parentId: 'BMa14857716d0e4cde8b69fc9e3865bceb'
               }]
       },
       {
           id: 'BMMb53ee282ca474d08b7ebaf7ed7bd5b5c',
           name: '123',
           parentId: '-1',
           showCheckbox: false,
           children: [
               {
                   id: 'BMM273069739da64b2d92a32f813a6be991',
                   name: '1',
                   parentId: 'BMMb53ee282ca474d08b7ebaf7ed7bd5b5c'
               }]
       },
       {
           id: 'BMMede7cf32e2b442b4bc47e5efdc0621f3',
           name: '区域商管公司',
           parentId: '-1',
           showCheckbox: false,
           children: [
               {
                   id: 'BMM0e013551924b4f0fa746a170896e3a4a',
                   name: '营运部',
                   parentId: 'BMMede7cf32e2b442b4bc47e5efdc0621f3'
               }, {
                   id: 'BMM10122e7f8693430c94e213ef29f0e362',
                   name: '总经理室',
                   parentId: 'BMMede7cf32e2b442b4bc47e5efdc0621f3'
               }, {
                   id: 'BMM16174c4a18fc4bc8b44f20fab09e5ef1',
                   name: '招商部',
                   parentId: 'BMMede7cf32e2b442b4bc47e5efdc0621f3'
               }, {
                   id: 'BMM4d44ac2cacd34792b02a5c9b8a3628f9',
                   name: '行政人事部',
                   parentId: 'BMMede7cf32e2b442b4bc47e5efdc0621f3'
               }, {
                   id: 'BMM9793b764cf5449c4a85050e0c35919e3',
                   name: '财务部',
                   parentId: 'BMMede7cf32e2b442b4bc47e5efdc0621f3'
               }, {
                   id: 'BMMd5ce48da59b442569db90128123bb3ce',
                   name: '企划部',
                   parentId: 'BMMede7cf32e2b442b4bc47e5efdc0621f3'
               }, {
                   id: 'BMMe53f174f02374bd0ad4e25b6cd190ddc',
                   name: '工程物业部',
                   parentId: 'BMMede7cf32e2b442b4bc47e5efdc0621f3'
               }]
       }
   ];
```
:::

<script>
const dataArr = [
    {
        id: '0',
        name: '顶级顶级',
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
                        children: [
                            { id: '13', name: '三级2', defaultDisabled: true },
                            { id: '131', name: '三级3', defaultDisabled: true },
                            { id: '132', name: '三级4', defaultDisabled: true }
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

const testServerData = [
   {
       id: 'BM789da012b46b4b9a834aeced21ef1986',
       name: '商管公司',
       parentId: '-1',
       showCheckbox: false,
       children: [
           {
               id: 'BM324ccef0ffdc4c75996b19378ad4b88a',
               name: '530一级部门',
               parentId: 'BM789da012b46b4b9a834aeced21ef1986',
               children: [{
                   id: 'BM9e8b6baf82df4fc196729fe0b76468c7',
                   name: '下级部门',
                   parentId: 'BM324ccef0ffdc4c75996b19378ad4b88a',
                   children: [{
                       id: 'BM7b184adf12d149de912361f7c34db8b2',
                       name: '下下级部门',
                       parentId: 'BM9e8b6baf82df4fc196729fe0b76468c7',
                       children: [{
                           id: 'BM5a13eb82fc6647c289215aa9a4cf5d08',
                           name: '嘻嘻嘻家',
                           parentId: 'BM7b184adf12d149de912361f7c34db8b2'
                       }]
                   }]
               }]
           }, {
               id: 'BM4eb8427421454c0d8b7c1d9108a86cb2',
               name: '供应商',
               parentId: 'BM789da012b46b4b9a834aeced21ef1986'
           }, {
               id: 'BM5625546a71da4248a8e5dc80a5d6fbf1',
               name: '总部联合检查部门',
               parentId: 'BM789da012b46b4b9a834aeced21ef1986'
           }, {
               id: 'BMac6160753ee14108a0a27b6f3681c484',
               name: '通用部门',
               parentId: 'BM789da012b46b4b9a834aeced21ef1986',
               children: [{
                   id: 'BM061ff92e835d462589e736c9cfb3ce31',
                   name: '外委保洁',
                   parentId: 'BMac6160753ee14108a0a27b6f3681c484'
               }, {
                   id: 'BM89a52ef2d383425dac8e1c12a0bcaf57',
                   name: '外委消防',
                   parentId: 'BMac6160753ee14108a0a27b6f3681c484'
               }, {
                   id: 'BMc43d7450f9a44b308979710025d98811',
                   name: '外委电梯',
                   parentId: 'BMac6160753ee14108a0a27b6f3681c484'
               }]
           }, {
               id: 'BMc830a01ce5924afa857e3c84199c9856',
               name: '销售物业工程物业部',
               parentId: 'BM789da012b46b4b9a834aeced21ef1986'
           }, {
               id: 'BMca6a8b926f6e42c88e1ec7f3229e45ec',
               name: '工程部',
               parentId: 'BM789da012b46b4b9a834aeced21ef1986'
           }, {
               id: 'BMd6db28c1160240a8a78be8993a211d5b',
               name: '商场物业部',
               parentId: 'BM789da012b46b4b9a834aeced21ef1986'
           }, {
               id: 'BMf168a9ac0f4f49a6893bd58df3d32886',
               name: '行政人事部',
               parentId: 'BM789da012b46b4b9a834aeced21ef1986'
           }, {
               id: 'BMM08e02a97e2fa4c5f8c81b2b0975568d3',
               name: '工程物业部',
               parentId: 'BM789da012b46b4b9a834aeced21ef1986'
           }, {
               id: 'BMM2da53957a466400ca2d88985d91ab146',
               name: '销售物业部',
               parentId: 'BM789da012b46b4b9a834aeced21ef1986'
           }, {
               id: 'BMM3fdbe4b5c0474c12929e2018ffe67929',
               name: '企划部',
               parentId: 'BM789da012b46b4b9a834aeced21ef1986'
           }, {
               id: 'BMM47862e0535fb4d3db824ecb5e06a1420',
               name: '销售物业招商部',
               parentId: 'BM789da012b46b4b9a834aeced21ef1986'
           }, {
               id: 'BMM50caea9f8b7f4f77971316e7b1ce9758',
               name: '财务部',
               parentId: 'BM789da012b46b4b9a834aeced21ef1986'
           }, {
               id: 'BMM52f2d18ef23c4e0eb319c921caa272b7',
               name: '招商营运部',
               parentId: 'BM789da012b46b4b9a834aeced21ef1986'
           }, {
               id: 'BMM9131ff3b5c29415799c29d833dcb6b35',
               name: '安全品质部',
               parentId: 'BM789da012b46b4b9a834aeced21ef1986'
           }, {
               id: 'BMM913e46c6c0ae44279b8e440f97a37e08',
               name: '运营部',
               parentId: 'BM789da012b46b4b9a834aeced21ef1986'
           }, {
               id: 'BMM974762df1e5d4f838cae1d684bcd9ed9',
               name: '销售物业工程部',
               parentId: 'BM789da012b46b4b9a834aeced21ef1986'
           }, {
               id: 'BMMd96fc03c4a2e4a6b8a7aa4a086f2d194',
               name: '超级菜场部',
               parentId: 'BM789da012b46b4b9a834aeced21ef1986'
           }, {
               id: 'BMMe50a11e8942b4dc9811f2f66f9c37e9a',
               name: '总经理室',
               parentId: 'BM789da012b46b4b9a834aeced21ef1986'
           }, {
               id: 'BMMfb5cd4e76e1c4209819916e27a8c6ebe',
               name: '吾悦菜场部',
               parentId: 'BM789da012b46b4b9a834aeced21ef1986'
           }]
   },
   {
       id: 'BMa14857716d0e4cde8b69fc9e3865bceb',
       name: '商开公司',
       parentId: '-1',
       showCheckbox: false,
       children: [
           {
               id: 'BMM06aca59687f2461a9ddcc191578385f6',
               name: '成本部',
               parentId: 'BMa14857716d0e4cde8b69fc9e3865bceb'
           }, {
               id: 'BMM41d637e8083846b1a8d7438f8a8eb796',
               name: '行政人事部',
               parentId: 'BMa14857716d0e4cde8b69fc9e3865bceb'
           }, {
               id: 'BMM513841806a7a42e6af41181ee88b0077',
               name: '技术部',
               parentId: 'BMa14857716d0e4cde8b69fc9e3865bceb'
           }, {
               id: 'BMM74a9a9047a784b0086521b3dc87d1a96',
               name: '财务部',
               parentId: 'BMa14857716d0e4cde8b69fc9e3865bceb'
           }, {
               id: 'BMM83ef17f4891b48f5b85844c71668b1c1',
               name: '营销部',
               parentId: 'BMa14857716d0e4cde8b69fc9e3865bceb'
           }, {
               id: 'BMM95044d522a874dca8a58b0f3901c3a3c',
               name: '总经理室',
               parentId: 'BMa14857716d0e4cde8b69fc9e3865bceb'
           }, {
               id: 'BMMa1de89acd20d4e15a853a777c275b114',
               name: '工程部',
               parentId: 'BMa14857716d0e4cde8b69fc9e3865bceb'
           }, {
               id: 'BMMda71778852ba4945a31a3f7eafc5bede',
               name: '客服部',
               parentId: 'BMa14857716d0e4cde8b69fc9e3865bceb'
           }]
   },
   {
       id: 'BMMb53ee282ca474d08b7ebaf7ed7bd5b5c',
       name: '123',
       parentId: '-1',
       showCheckbox: false,
       children: [
           {
               id: 'BMM273069739da64b2d92a32f813a6be991',
               name: '1',
               parentId: 'BMMb53ee282ca474d08b7ebaf7ed7bd5b5c'
           }]
   },
   {
       id: 'BMMede7cf32e2b442b4bc47e5efdc0621f3',
       name: '区域商管公司',
       parentId: '-1',
       showCheckbox: false,
       children: [
           {
               id: 'BMM0e013551924b4f0fa746a170896e3a4a',
               name: '营运部',
               parentId: 'BMMede7cf32e2b442b4bc47e5efdc0621f3'
           }, {
               id: 'BMM10122e7f8693430c94e213ef29f0e362',
               name: '总经理室',
               parentId: 'BMMede7cf32e2b442b4bc47e5efdc0621f3'
           }, {
               id: 'BMM16174c4a18fc4bc8b44f20fab09e5ef1',
               name: '招商部',
               parentId: 'BMMede7cf32e2b442b4bc47e5efdc0621f3'
           }, {
               id: 'BMM4d44ac2cacd34792b02a5c9b8a3628f9',
               name: '行政人事部',
               parentId: 'BMMede7cf32e2b442b4bc47e5efdc0621f3'
           }, {
               id: 'BMM9793b764cf5449c4a85050e0c35919e3',
               name: '财务部',
               parentId: 'BMMede7cf32e2b442b4bc47e5efdc0621f3'
           }, {
               id: 'BMMd5ce48da59b442569db90128123bb3ce',
               name: '企划部',
               parentId: 'BMMede7cf32e2b442b4bc47e5efdc0621f3'
           }, {
               id: 'BMMe53f174f02374bd0ad4e25b6cd190ddc',
               name: '工程物业部',
               parentId: 'BMMede7cf32e2b442b4bc47e5efdc0621f3'
           }]
   }
];

export default {
    name: 'PTreeSelectView',
    data() {
        return {
            singleId: '12',
            data1: JSON.parse(JSON.stringify(dataArr)),
            multipleId: ['12', '121', '322'],
            data2: JSON.parse(JSON.stringify(dataArr)),
            data3: JSON.parse(JSON.stringify(dataArr)),
            multipleId4: [],
            multipleId5: ['BM7b184adf12d149de912361f7c34db8b2'],
            data4: [],
            optionData1: [
                { id: '000', name: '零零零零零零零' },
                { id: '111', name: '壹壹壹壹壹壹' },
                { id: '222', name: '贰贰贰贰贰贰贰贰贰' }
            ],
            testServerData
        };
    },
    mounted() {
        setTimeout(() => {
            this.data4 = JSON.parse(JSON.stringify(dataArr));
            setTimeout(() => {
                this.multipleId4 = ['13', '131', '132'];
            }, 3000);
        }, 3000);
    },
    methods: {
        change(item) {
            console.log('单选::', item);
        }
    }
};
</script>

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| triggerWidth    | 触发器宽 | String/Number | 180 | No     |
| dropWidth    | 下拉选择盒子宽 | String/Number | 280 | No     |
| placeholder    | 占位符 | String | 请选择 | No     |
| caption    | 标题 | String | '' | No     |
| v-model    | 选中的id/ids | String/Number/Array | '' | No     |
| data    | 数据列表 | Array | [] | Yes     |
| panel    | 是否显示可选面板 | Boolean | false | No     |
| multiple  | 是否可多选 | Boolean | false | no     |
| allCheckboxShow  | 所有checkbox是否显示 | Boolean | true | no     |
| notNull  | 是否返回半选状态的数据（在多选条件下才生效） | Boolean | false | no     |
| linkage  | 是否上下级联动选择（在多选条件下才生效） | Boolean | true | no     |
| lastStage  | 只能选择最后一级（在多选条件下才生效） | Boolean | false | no     |
| childDisable  | 父级选中子级禁用，子级选中不影响父级(当值为true时不支持清除) | Boolean | false | no     |
| includeParent | 返回数据是否包含父级 | Boolean | true | No |
| clearHide | hover到触发器上是否显示清除按钮 | Boolean | false | No |
| render  | 自定义渲染内容可选值['', 'custom'] | String | '' | no     |
| transfer |  设置父标签出现滚动条的id  | String |   ''   |  no |
| sameParams   | 设置相同name和sameId的值禁用 | Boolean | false | no     |
| sortByTree  | 按照树形结构排序选中的数据 | Boolean | false | no     |
| jointParent  | 可选面板是否拼接父级name | Boolean | true | no     |
| onlySearchLastLevel  | 只能搜索最后一级 | Boolean | false | no     |
| @change   | 点击回调 | Function | item => {}/( item, checkedIds, checkedData ) => {}  | Yes     |
| @openNode | 展开收起节点的回调函数 | Function | item => {} | No |

### data参数说明

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| id    | id | String | '' | Yes     |
| name   | name | String | '' | Yes     |
| open   | 是否展开子项 | Boolean | false | Yes     |
| disabled   | 是否禁用 | Boolean | false | Yes     |
| checked   | 是否选中（可选值：uncheck/checked/notNull） | String | uncheck | Yes     |
| sameId   | 同一棵树下相同name的id | String | '' | no     |

::: danger 警告
    该组件单页在理论情况(即页面只存在PTreeSelect) data数据全部展开且子父级之和可容纳225条，超过225弹出动画会卡，
    若不考虑css动画，数据子父级之和可容纳最多3000条
:::

::: tip checked值状态
checked:
<br>
uncheck-未选中
<br>
checked-选中
<br>
notNull-半选状态
<br>
:::

::: tip 提示
在多选情况下返回选中的id也就是checked的id，如需返回半选状态的数据请设置notNull为true<br>
当childDisable为true时，includeParent值为false不生效<br>
:::

::: tip 返回参数(data参数)说明
{<br>
    index: 'xxx-xxx-xxx', // String 索引字符串<br>
    parentId: 'xxx', // String 父级id<br>
    id: 'xxx', // String 当前项id<br>
    name: 'xxx', // String <br>
    checked: uncheck/checked/notNull, // String checkbox选中状态<br>
    open: true/false, // Boolean 是否展开子项<br>
    defaultDisabled: true/false, // Boolean 设置默认禁用，此参数表示不能被修改disabled、checked状态, 作用：1.可设置末级不可选；2.可得到默认选中的数据；<br>
    disabled: true/false, // Boolean 当前项是否禁用的状态<br>
    lastNode: true/false, // Boolean 是否是最后一级节点(叶子节点)<br>
    show: true/false, // Boolean 当前项是否显示<br>
    showCheckbox: true/false // Boolean 是否显示checkbox<br>
}
:::
