### CustomTreeSelectEnergy 运行能耗诊断弹窗选择器

::: tip
基于v2版树形结构(Tree)开发<br>
:::

### 选中项互不影响

<template>
    <div>
        <Button @click="showClick">选中项互不影响</Button>
        <br>
        <CustomTreeSelectEnergy
            :show.sync="show"
            :multiple="true"
            :moreBtn="moreBtn"
            :data="data1"
            @change="change"
            @addGroup="addGroup"
        />
    </div>
</template>

<script>
    export default {
        name: "BadgeView"
    }
</script>

::: details 查看示例
```vue
<template>
    <div class="customTreeSelectEnergyView">
        <Button @click="showClick">show=true</Button>
        <br>
        <CustomTreeSelectEnergy
            :show.sync="show"
            :multiple="true"
            :moreBtn="moreBtn"
            :data="data1"
            @change="change"
            @addGroup="addGroup"
        />
    </div>
</template>

<script>
const data1 = [
    {
        id: '0',
        name: '顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级',
        tag: { name: '分项', color: '#aa7803', bgColor: '#faf1d1' },
        open: true,
        children: [
            {
                id: '1',
                name: '一级1',
                open: true,
                children: [
                    { id: '12', name: '二级2', tag: { name: '计算单元', color: '#373c43', bgColor: '#eff0f1' } },
                    { id: '121', name: '二级3' },
                    { id: '122', name: '二级4', tag: { name: '分项', color: '#aa7803', bgColor: '#faf1d1' } },
                    {
                        id: '1321',
                        name: '二级1',
                        defaultDisabled: true,
                        children: [
                            {
                                id: '13', name: '三级2', defaultDisabled: true, tag: { name: '计算单元', color: '#373c43', bgColor: '#eff0f1' }
                            },
                            {
                                id: '131', name: '三级3', defaultDisabled: true, tag: { name: '计算单元', color: '#373c43', bgColor: '#eff0f1' }
                            },
                            {
                                id: '132', name: '三级4', defaultDisabled: true, tag: { name: '计算单元', color: '#373c43', bgColor: '#eff0f1' }
                            }
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
    name: 'CustomTreeSelectEnergyView',
    data() {
        return {
            data1,
            show: false,
            moreBtn: {
                open: true,
                // weight: true, // 权重
                disabled: false,
                // text: '上一步',
                text: '添加至分组',
                event: 'addGroup'
            }
        };
    },
    methods: {
        showClick() {
            console.log(123);
            this.show = true;
        },
        change({ item, checkedIds, checkedData }) {
            console.log(item, checkedIds, checkedData);
        },
        addGroup({ item, checkedIds, checkedData }) {
            console.log(item, checkedIds, checkedData);
        }
    }
};
</script>
```
:::

### 选中项相互影响

<template>
    <div>
        <Button @click="showClick2">选中项相互影响</Button>
        <CustomTreeSelectEnergy
            :show.sync="show2"
            :linkage="true"
            :jointParent="true"
            :moreBtn="moreBtn2"
            :data="data2"
            :autoClose="true"
            @change="change"
            @prevStep="prevStep"
        />
    </div>
</template>

::: details 查看示例
```vue
<CustomTreeSelectEnergy
    :show.sync="show2"
    :linkage="true"
    :jointParent="true"
    :moreBtn="moreBtn2"
    :data="data2"
    :autoClose="true"
    @change="change"
    @prevStep="prevStep"
/>

<script>
const data = [
    {
        id: '0',
        name: '顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级',
        tag: { name: '分项', color: '#aa7803', bgColor: '#faf1d1' },
        open: true,
        children: [
            {
                id: '1',
                name: '一级1',
                open: true,
                children: [
                    { id: '12', name: '二级2', tag: { name: '计算单元', color: '#373c43', bgColor: '#eff0f1' } },
                    { id: '121', name: '二级3' },
                    { id: '122', name: '二级4', tag: { name: '分项', color: '#aa7803', bgColor: '#faf1d1' } },
                    {
                        id: '1321',
                        name: '二级1',
                        defaultDisabled: true,
                        children: [
                            {
                                id: '13', name: '三级2', defaultDisabled: true, tag: { name: '计算单元', color: '#373c43', bgColor: '#eff0f1' }
                            },
                            {
                                id: '131', name: '三级3', defaultDisabled: true, tag: { name: '计算单元', color: '#373c43', bgColor: '#eff0f1' }
                            },
                            {
                                id: '132', name: '三级4', defaultDisabled: true, tag: { name: '计算单元', color: '#373c43', bgColor: '#eff0f1' }
                            }
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
    name: 'CustomTreeSelectEnergyView',
    data() {
        return {
            data2: JSON.parse(JSON.stringify(data)),
            show2: false,
            // 开启更多按钮
            moreBtn2: {
                open: true,
                weight: true, // 权重
                disabled: false,
                text: '上一步',
                // text: '下一步',
                event: 'prevStep'
            }
        };
    },
    methods: {
        showClick2() {
            console.log(123);
            this.show2 = true;
        },
        change({ item, checkedIds, checkedData }) {
            console.log(item, checkedIds, checkedData);
        },
        prevStep() {
            console.log('上一步');
        }
    }
};
</script>
```
:::

<script>
const data = [
    {
        id: '0',
        name: '顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级',
        tag: { name: '分项', color: '#aa7803', bgColor: '#faf1d1' },
        open: true,
        children: [
            {
                id: '1',
                name: '一级1',
                open: true,
                children: [
                    { id: '12', name: '二级2', tag: { name: '计算单元', color: '#373c43', bgColor: '#eff0f1' } },
                    { id: '121', name: '二级3' },
                    { id: '122', name: '二级4', tag: { name: '分项', color: '#aa7803', bgColor: '#faf1d1' } },
                    {
                        id: '1321',
                        name: '二级1',
                        defaultDisabled: true,
                        children: [
                            {
                                id: '13', name: '三级2', defaultDisabled: true, tag: { name: '计算单元', color: '#373c43', bgColor: '#eff0f1' }
                            },
                            {
                                id: '131', name: '三级3', defaultDisabled: true, tag: { name: '计算单元', color: '#373c43', bgColor: '#eff0f1' }
                            },
                            {
                                id: '132', name: '三级4', defaultDisabled: true, tag: { name: '计算单元', color: '#373c43', bgColor: '#eff0f1' }
                            }
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
    name: 'CustomTreeSelectEnergyView',
    data() {
        return {
            data1: JSON.parse(JSON.stringify(data)),
            data2: JSON.parse(JSON.stringify(data)),
            show: false,
            show2: false,
            moreBtn: {
                open: true,
                disabled: false,
                text: '添加至分组',
                event: 'addGroup'
            },
            moreBtn2: {
             open: true,
             weight: true,
             disabled: false,
             text: '上一步',
             event: 'prevStep'
            }
        };
    },
    methods: {
        showClick() {
            console.log(123);
            this.show = true;
        },
        showClick2() {
            console.log(123);
            this.show2 = true;
        },
        change({ item, checkedIds, checkedData }) {
            console.log(item, checkedIds, checkedData);
        },
        addGroup({ item, checkedIds, checkedData }) {
            console.log(item, checkedIds, checkedData);
        },
        prevStep() {
         console.log('上一步');
        }
    }
};
</script>


### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| show    | 弹窗显示状态 | Boolean | false | yes     |
| autoClose    | 点击遮罩/按下Esc关闭弹窗 | Boolean | false | no     |
| title    | 标题 | String | '标题' | no     |
| placeholder    | 输入框占位符 | String | '搜索' | no     |
| notNull  | 是否返回半选状态的数据 | Boolean | false | no     |
| linkage  | 是否上下级联动 | Boolean | false | no     |
| lastStage  | 只能选择最后一级 | Boolean | false | no     |
| includeParent  | 返回数据是否包含父级 | Boolean | true | no     |
| jointParent  | 可选面板是否拼接父级name | Boolean | false | no     |
| omit  | 显示更多操作 | Boolean | false | no     |
| sortByTree  | 按照树形结构排序选中的数据 | Boolean | false | no     |
| selectedSave  | 点击确定按钮是否保存选中的数据在已选面板 | Boolean | true | no     |
| moreBtn  | 更多按钮 | Object | false | no     |
| onlySearchLastLevel  | 只能搜索最后一级 | Boolean | false | no     |
| data    | 数据列表 | Array | [] | false     |
| @change    | 点击确定回调 | Function | ({ item, checkedIds, checkedData }) => {} | false     |
| @addGroup    | 点击添加到分组回调 | Function | ({ item, checkedIds, checkedData }) => {} | false     |

### moreBtn

```vue
{
    open: false, // 开启
    weight: false, // 权重
    disabled: false, // 禁用状态
    selectedSave: false, // 点击按钮是否保存选中的数据在已选面板
    text: '添加至分组', // 按钮显示的文字
    event: 'moreBtnClick' // 回调
}
```
