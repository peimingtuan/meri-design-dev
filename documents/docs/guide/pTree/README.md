### PTree 树形结构-(平铺渲染)v2

::: tip
第二版树形结构<br>
:::

#### 1.单选
<PTree
    v-model="singleId"
    :data="treeData"
    @change="change"
    @openNode="openNode"
/>

::: details 查看示例
```vue
<PTree
    v-model="singleId"
    :data="treeData"
    @change="change"
    @openNode="openNode"
/>

singleId: '12'
treeData: dataArr
change(item) {
    console.log('选择的项::::', item);
}
openNode(item) {
    console.log('展开子项::', item);
}
```
:::

#### 2.多选-联动
<PTree
    :multiple="true"
    v-model="multipleId"
    :data="treeData2"
    @change="change2"
    @openNode="openNode"
/>

::: details 查看示例
```vue
<PTree
    :multiple="true"
    v-model="multipleId"
    :data="treeData"
    @change="change"
    @openNode="openNode"
/>

treeData: dataArr
multipleId: ['12', '121', '322']
change({ item, checkedIds, checkedData }) {
    console.log('选择的项::::', item, checkedIds, checkedData);
}
openNode(item) {
    console.log('展开子项::', item);
}
```
:::

<script>
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
                        open: false,
                        defaultDisabled: true,
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
                open: false,
                children: [
                    { id: '222', name: '二级2' },
                    { id: '2221', name: '二级1' },
                    { id: '2222', name: '二级3' }
                ]
            },
            {
                id: '3',
                name: '一级3',
                open: false,
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
    data() {
        return {
            singleId: '12',
            multipleId: ['12', '121', '322'],
            treeData: dataArr,
            treeData2: JSON.parse(JSON.stringify(dataArr)),
            treeData21: JSON.parse(JSON.stringify(dataArr)),
            treeData3: JSON.parse(JSON.stringify(dataArr)),
            treeData4: JSON.parse(JSON.stringify(dataArr)),
            multipleId5: ['1321', '13', '131', '132'],
            treeData5: [],
            tileData5: []
        };
    },
    mounted() {
        const treeData = JSON.parse(JSON.stringify(dataArr));
        this.setTileTool([], treeData, '-1').then(res => {
            this.tileData5 = res;
            this.treeData5 = treeData;
        });
    },
    methods: {
        change(item) {
            console.log('选择的项::::', item);
        },
        change2({ item, checkedIds, checkedData }) {
            console.log('选择的项::::', item, checkedIds, checkedData);
        },
        change21({ item, checkedIds, checkedData }) {
            console.log('选择的项::::', item, checkedIds, checkedData);
        },
        change3({ item, checkedIds, checkedData }) {
            console.log('选择的项::::', item, checkedIds, checkedData);
        },
        change4({ item, checkedIds, checkedData }) {
            console.log('选择的项::::', item, checkedIds, checkedData);
        },
        change5({ item, checkedIds, checkedData }) {
            console.log('选择的项::::', item, checkedIds, checkedData);
        },
        openNode(item) {
            console.log('展开子项::', item);
        },
        setTileTool(result, tree, pid) {
            return new Promise(resolve => {
                tree.forEach(d => {
                    const obj = {
                        parentId: pid,
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

#### 2.1.多选-联动-返回半选状态数据
<PTree
    :multiple="true"
    :notNull="true"
    :data="treeData21"
    @change="change21"
/>

::: details 查看示例
```vue
<PTree
    :multiple="true"
    :notNull="true"
    :data="treeData"
    @change="change"
/>

treeData: dataArr
change({ item, checkedIds, checkedData }) {
    console.log('选择的项::::', item, checkedIds, checkedData);
}
openNode(item) {
    console.log('展开子项::', item);
}
```
:::

#### 3.多选-不联动
<PTree
    :multiple="true"
    :linkage="false"
    :data="treeData3"
    @change="change3"
/>

::: details 查看示例
```vue
<PTree
    :multiple="true"
    :linkage="false"
    :data="treeData"
    @change="change"
/>

treeData: dataArr
change({ item, checkedIds, checkedData }) {
    console.log('选择的项::::', item, checkedIds, checkedData);
}
```
:::

#### 4.多选-只能选择末级
<PTree
    :multiple="true"
    :linkage="false"
    :lastStage="true"
    :data="treeData4"
    @change="change4"
/>

::: details 查看示例
```vue
<PTree
    :multiple="true"
    :linkage="false"
    :lastStage="true"
    :data="treeData"
    @change="change"
/>

treeData: dataArr
change({ item, checkedIds, checkedData }) {
    console.log('选择的项::::', item, checkedIds, checkedData);
}
```
:::

#### 5.父级选中子级禁用，子级选中不影响父级
<PTree
    :multiple="true"
    :childDisable="true"
    :data="treeData5"
    @change="change5"
/>

::: details 查看示例
```vue
<PTree
    :multiple="true"
    :childDisable="true"
    :data="treeData"
    @change="change"
/>

treeData: dataArr
change({ item, checkedIds, checkedData }) {
    console.log('选择的项::::', item, checkedIds, checkedData);
}
```
:::

#### 6.通过slot自定义内容
<div>
    <PTree
        render="custom"
        :multiple="true"
        :allCheckboxShow="false"
        v-model="multipleId5"
        :data="treeData5"
        @change="change5"
        >
        <template v-for="td in tileData5" v-slot:[td.id]="{item}">
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

::: details 查看示例
```vue
<PTree
    render="custom"
    :multiple="true"
    :allCheckboxShow="false"
    v-model="multipleId"
    :data="treeData"
    @change="change"
    >
    <template v-for="td in tileData" #[td.id]="{item}">
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

multipleId: ['1321', '13', '131', '132']
treeData: dataArr
tileData: [] // 详见 ‘平铺数据’
change({ item, checkedIds, checkedData }) {
    console.log('选择的项::::', item, checkedIds, checkedData);
}
```
:::

::: details 示例数据
```javascript
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
                        defaultDisabled: true,
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
```
:::

::: details 平铺工具函数
```vue
setTileTool(result, tree, parentId = -1'') {
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

// 调用函数
this.setTileTool([], dataArr).then(res => {
    this.tileData5 = res;
});
```
:::

<script>
const dataArr = [
    {
        id: '0',
        name: '顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级',
        open: true,
        children: [
            {
                id: '1',
                name: '一级1',
                children: [
                    { id: '12', name: '二级2' },
                    { id: '121', name: '二级3' },
                    { id: '122', name: '二级4' },
                    {
                        id: '1321',
                        name: '二级1',
                        defaultDisabled: true,
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
export default {
    name: 'PTreeView',
    data() {
        return {
            singleId: '12',
            multipleId: ['12', '121', '322'],
            treeData: dataArr,
            treeData2: JSON.parse(JSON.stringify(dataArr)),
            treeData21: JSON.parse(JSON.stringify(dataArr)),
            treeData3: JSON.parse(JSON.stringify(dataArr)),
            treeData4: JSON.parse(JSON.stringify(dataArr)),
            multipleId5: ['1321', '13', '131', '132'],
            treeData5: [],
            tileData5: []
        };
    },
    mounted() {
        const treeData = JSON.parse(JSON.stringify(dataArr));
        this.setTileTool([], treeData, '-1').then(res => {
            this.tileData5 = res;
            this.treeData5 = treeData;
        });
    },
    methods: {
        change(item) {
            console.log('选择的项::::', item);
        },
        change2({ item, checkedIds, checkedData }) {
            console.log('选择的项::::', item, checkedIds, checkedData);
        },
        change21({ item, checkedIds, checkedData }) {
            console.log('选择的项::::', item, checkedIds, checkedData);
        },
        change3({ item, checkedIds, checkedData }) {
            console.log('选择的项::::', item, checkedIds, checkedData);
        },
        change4({ item, checkedIds, checkedData }) {
            console.log('选择的项::::', item, checkedIds, checkedData);
        },
        change5({ item, checkedIds, checkedData }) {
            console.log('选择的项::::', item, checkedIds, checkedData);
        },
        openNode(item) {
            console.log('展开子项::', item);
        },
        setTileTool(result, tree, pid) {
            return new Promise(resolve => {
                tree.forEach(d => {
                    const obj = {
                        parentId: pid,
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

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| v-model    | 选中的id | String/Array | [] | No     |
| data    | 数据列表 | Array | [] | Yes     |
| multiple  | 是否可多选 | Boolean | false | no     |
| allCheckboxShow  | 所有checkbox是否显示 | Boolean | true | no     |
| notNull  | 是否返回半选状态的数据（在多选条件下才生效） | Boolean | false | no     |
| linkage  | 是否上下级联动选择（在多选条件下才生效） | Boolean | true | no     |
| lastStage  | 只能选择最后一级（在多选条件下才生效） | Boolean | false | no     |
| childDisable  | 父级选中子级禁用，子级选中不影响父级 | Boolean | false | no     |
| includeParent | 返回数据是否包含父级 | Boolean | true | No |
| render  | 自定义渲染内容可选值['', 'custom'] | String | '' | no     |
| sortByTree  | 按照树形结构排序选中的数据 | Boolean | false | no     |
| jointParent  | 可选面板是否拼接父级name | Boolean | false | no     |
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

::: danger 警告
    该组件单页在理论情况(即页面只存在PTree) data数据全部展开且子父级之和可容纳3600条
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
