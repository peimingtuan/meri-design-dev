### Tree 树形结构

#### 单选
<Tree
    :data="treeData"
    @change="change"
    @openNode="openNode"
/>

```vue
<Tree
    :data="treeData"
    @change="change"
    @openNode="openNode"
/>

treeData: dataArr
change({ id }) {
    console.log('选择的项::::', id);
}
```

#### 多选-联动
<Tree
    :multiple="true"
    :data="treeData2"
    @change="change2"
/>

```vue
<Tree
    :multiple="true"
    :data="treeData2"
    @change="change2"
/>

treeData2: dataArr
change2({ id, checkedIds }) {
    console.log('选择的项::::', id, checkedIds);
}
```

#### 多选-联动-返回半选状态数据
<Tree
    :multiple="true"
    :notNull="true"
    :returnParentNode="false"
    :data="treeData21"
    @change="change21"
/>

```vue
<Tree
    :multiple="true"
    :notNull="true"
    :returnParentNode="false"
    :data="treeData21"
    @change="change21"
/>

treeData21: dataArr
change21({ id, checkedIds }) {
    console.log('选择的项::::', id, checkedIds);
}
```

#### 多选-不联动
<Tree
    :multiple="true"
    :linkage="false"
    :data="treeData3"
    @change="change3"
/>

```vue
<Tree
    :multiple="true"
    :linkage="false"
    :data="treeData3"
    @change="change3"
/>

treeData3: dataArr
change3({ id, checkedIds }) {
    console.log('选择的项::::', id, checkedIds);
}
```

#### 多选-不联动
<Tree
    :multiple="true"
    :linkage="false"
    :lastStage="true"
    :data="treeData4"
    @change="change4"
/>

```vue
<Tree
    :multiple="true"
    :linkage="false"
    :lastStage="true"
    :data="treeData4"
    @change="change4"
/>

treeData4: dataArr
change4({ id, checkedIds }) {
    console.log('选择的项::::', id, checkedIds);
}
```

#### demo数据
```vue
const dataArr = [
    {
        id: '0',
        name: '顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级',
        open: true,
        checked: 'uncheck',
        children: [
            {
                id: '1',
                name: '一级1',
                open: true,
                checked: 'uncheck',
                children: [
                    { id: '12', name: '二级2', checked: 'uncheck' },
                    { id: '121', name: '二级3', checked: 'uncheck', disabled: true },
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
```

<script>
    const dataArr=[
        {
            id: '0', name: '顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级', open: false, checked: 'uncheck',
            children: [
                {
                    id: '1',  name: '一级1', open: false, checked: 'uncheck',
                    children: [
                        {id: '12', name: '二级2', checked: 'uncheck'},
                        {id: '121', name: '二级3', checked: 'uncheck'},
                        {id: '122', name: '二级4', checked: 'uncheck'},
                        {
                            id: '1321', name: '二级1', open: false, checked: 'uncheck',
                            children: [
                                {id: '13', name: '三级2', checked: 'uncheck'},
                                {id: '131', name: '三级3', checked: 'uncheck'},
                                {id: '132', name: '三级4', checked: 'uncheck'},
                            ]
                        }
                    ]
                },
                {
                    id: '2', name: '一级2', open: false, checked: 'uncheck',
                    children: [
                        {id: '222', name: '二级2', checked: 'uncheck'},
                        {id: '2221', name: '二级1', checked: 'uncheck'},
                        {id: '2222', name: '二级3',checked: 'uncheck'}
                    ]
                },
                {
                    id: '3',
                    name: '一级3',
                    open: false,
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
        name: "TreeView",
        data() {
            return {
                treeData: dataArr,
                treeData2: JSON.parse(JSON.stringify(dataArr)),
                treeData21: JSON.parse(JSON.stringify(dataArr)),
                treeData3: JSON.parse(JSON.stringify(dataArr)),
                treeData4: JSON.parse(JSON.stringify(dataArr))
            }
        },
        methods: {
            change({id}) {
                console.log('选择的项::::', id);
            },
            change2({id, checkedIds}) {
                console.log('选择的项::::', id, checkedIds);
            },
            change21({id, checkedIds}) {
                console.log('选择的项::::', id, checkedIds);
            },
            change3({id, checkedIds}) {
                console.log('选择的项::::', id, checkedIds);
            },
            change4({id, checkedIds}) {
                console.log('选择的项::::', id, checkedIds);
            },
            openNode(obj){
                console.log(obj)
            }
        }
    }
</script>


### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| data    | 数据列表 | Array | [] | Yes     |
| @change   | 点击回调 | Function | -- | Yes     |
| multiple  | 是否可多选 | Boolean | false | no     |
| linkage  | 是否上下级联动选择（在多选条件下才生效） | Boolean | true | no     |
| notNull  | 是否返回半选状态的数据（在多选条件下才生效） | Boolean | false | no     |
| lastStage  | 只能选择最后一级（在多选条件下才生效） | Boolean | false | no     |
| returnParentNode | 是否返回父对象数据 | Boolean | true | No |
| openNode | 展开收起节点的回调函数 | Function | (open, item) => {} | No |

### data参数说明

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| id    | id | String | '' | Yes     |
| name   | name | String | '' | Yes     |
| open   | 是否展开子项 | Boolean | false | Yes     |
| disabled   | 是否禁用 | Boolean | false | Yes     |
| checked   | 是否选中（可选值：uncheck/checked/notNull） | String | uncheck | Yes     |

::: tip
checked:
<br>
uncheck-未选中
<br>
checked-选中
<br>
notNull-半选状态
<br>
:::

::: danger 警告
    该组件单页在理论情况(即页面只存在Tree) data数据全部展开且子父级之和可容纳3600条
:::

::: tip
在多选情况下返回选中的id也就是checked的id，如需半选状态请设置notNull为true
:::
