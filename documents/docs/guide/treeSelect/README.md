### TreeSelect树下拉选择

### 一. 单选

####  width+hideClear+isReadOnly+disabled 单选

<TreeSelect
    width="280"
    @change="changeSingle"
    :hideClear="false"
    v-model="selectId"
    :isReadOnly='false'
    :caption="'标题：'"
    :data="dataTreeSingle"
    :lastStage="false"
    @focusChange="focusChange"
    :disabled="false"
/>

```vue
<TreeSelect
    width="280"
    @change="changeSingle"
    :hideClear="false"
    v-model="selectId"
    :isReadOnly='false'
    :caption="'标题：'"
    :data="dataTreeSingle"
    :lastStage="false"
    @focusChange="focusChange"
    :disabled="false"
/>

selectId: "121"
dataTreeSingle: JSON.parse(JSON.stringify(dataTree))
changeSingle(id,dataObj) {
    console.log('这个是treeSelectView：',id);
}
focusChange(status) {
    console.log('focusChange', status);
}

```

#### 二.多选

#### title + placeholder + unit + multiple + width + hideClear + caption + isShowAllChoice + isReadOnly  联动

 <TreeSelect
    title="已选项"
    unit="个"
    placeholder="请选择"
    :multiple="true"
    width="280"
    :hideClear="false"
    :caption="'多选项目:'"
    :isShowAllChoice="true"
    :selectedIds="selectedIds"
    :isReadOnly='true'
    :data="dataTest"
    @change="selectChange"
    @focusChange="focusChange"
/>

```vue
 <TreeSelect
    title="已选项"
    unit="个"
    placeholder="请选择"
    :multiple="true"
    width="280"
    :hideClear="false"
    :caption="'多选项目:'"
    :isShowAllChoice="true"
    :selectedIds="selectedIds"
    :isReadOnly='true'
    :data="dataTest"
    @change="selectChange"
    @focusChange="focusChange"
/>
selectedIds: ['322', '12'],
dataTest: JSON.parse(JSON.stringify(dataTree1))
setTimeout(() => {
    this.dataTest.forEach(item =>{
        this.selectTests.push(item.id)
    })
}, 3000);

// 多选返回的id组
selectChange(ids) {
    console.log('多选返回的id组:::', ids);
},
focusChange(status) {
    console.log('focusChange', status);
}
```

#### title + placeholder + unit + multiple + width + disabled 禁用

<TreeSelect
    title="已选项"
    unit="个"
    placeholder="请选择"
    :multiple="true"
    width="280"
    :data="dataTreeMultiple"
    @change="selectChange"
    :disabled="true"
/>

```vue
<TreeSelect
    title="已选项"
    unit="个"
    placeholder="请选择"
    :multiple="true"
    width="280"
    :data="dataTreeMultiple"
    @change="selectChange"
    :disabled="true"
/>
dataTreeMultiple: JSON.parse(JSON.stringify(dataTree)),

// 多选返回的id组
selectChange(ids) {
    console.log('多选返回的id组:::', ids);
},
```

#### title + placeholder + unit + multiple + width + notNull + caption + returnParentNode + isShowAllChoice 返回半选父对象数据

<TreeSelect
    title="已选项"
    unit="个"
    placeholder="请选择"
    :multiple="true"
    :caption="'标题：'"
    :notNull="true"
    :returnParentNode="true"
    :isShowAllChoice="true"
    :selectedIds="selectedIds"
    width="240"
    :data="dataTreeMultiple1"
    @change="selectChange"
    @focusChange="focusChange"
/>

```vue
<TreeSelect
    title="已选项"
    unit="个"
    placeholder="请选择"
    :multiple="true"
    :caption="'标题：'"
    :notNull="true"
    :returnParentNode="true"
    :isShowAllChoice="true"
    :selectedIds="selectedIds"
    width="240"
    :data="dataTreeMultiple1"
    @change="selectChange"
    @focusChange="focusChange"
/>
selectedIds: [],
dataTreeMultiple1: JSON.parse(JSON.stringify(dataTree)),

// 多选返回的id组
selectChange(ids) {
    console.log('多选返回的id组:::', ids);
},
focusChange(status) {
    console.log('focusChange', status);
}
```

#### title + placeholder + unit + multiple + width + linkage  不联动 

<TreeSelect
    title="已选项"
    unit="个"
    placeholder="请选择"
    :multiple="true"
    :linkage="false"
    :selectedIds="selectedIds"
    width="240"
    :data="dataTreeMultiple2"
    @change="selectChange"
    @focusChange="focusChange"
/>

```vue
<TreeSelect
    title="已选项"
    unit="个"
    placeholder="请选择"
    :multiple="true"
    :linkage="false"
    :selectedIds="selectedIds"
    width="240"
    :data="dataTreeMultiple2"
    @change="selectChange"
    @focusChange="focusChange"
/>
selectedIds: ['322', '12'],
dataTreeMultiple2: JSON.parse(JSON.stringify(dataTree)),

// 多选返回的id组
selectChange(ids) {
    console.log('多选返回的id组:::', ids);
},
focusChange(status) {
    console.log('focusChange', status);
}
```

#### title + placeholder + unit + multiple + width + height + linkage + lastStage 只能选择末级

<TreeSelect
    title="已选项"
    unit="个"
    placeholder="请选择"
    :multiple="true"
    :linkage="false"
    :lastStage="true"
    :selectedIds="selectedIds"
    width="240"
    height="50"
    :data="dataTreeMultiple3"
    @change="selectChange"
    @focusChange="focusChange"
/>

```vue
<TreeSelect
    title="已选项"
    unit="个"
    placeholder="请选择"
    :multiple="true"
    :linkage="false"
    :lastStage="true"
    :selectedIds="selectedIds"
    width="240"
    height="50"
    :data="dataTreeMultiple3"
    @change="selectChange"
    @focusChange="focusChange"
/>
selectedIds: ['322', '12'],
dataTreeMultiple3: JSON.parse(JSON.stringify(dataTree)),

// 多选返回的id组
selectChange(ids) {
    console.log('多选返回的id组:::', ids);
},
focusChange(status) {
    console.log('focusChange', status);
}

```
#### 三.多选带选择区域

#### title + unit + placeholder + height + width + choseArea + hideClear + caption + isReadOnly + isShowAllChoice 联动选择

<TreeSelect
    title="已选项"
    unit="个"
    placeholder="请选择"
    width="300"
    height="300"
    :caption="'标题：'"
    :selectedIds="selectedIds"
    :isReadOnly='true'
    :choseArea="true"
    :data="dataTreeMultiple1"
    :isShowAllChoice="true"
    :hideClear="false"
    @change="treeConfirm"
    @focusChange="focusChange"
/>

```vue
<TreeSelect
    title="已选项"
    unit="个"
    placeholder="请选择222"
    width="300"
    height="300"
    :caption="'标题面板：'"
    :selectedIds="selectedIds"
    :isReadOnly='true'
    :choseArea="true"
    :data="dataTreeMultiple1"
    :isShowAllChoice="true"
    :hideClear="false"
    @change="treeConfirm"
    @focusChange="focusChange"
/>
selectedIds: [],
dataTreeMultiple1: JSON.parse(JSON.stringify(dataTree)),

// 多选返回的id组
treeConfirm(data) {
    console.log(data)
},
focusChange(status) {
    console.log('focusChange', status);
}
```

#### title + unit + placeholder + height + notNull + choseArea + returnParentNode + isShowAllChoice + selectedIds 联动选择半选并不返回父对象

<TreeSelect
    title="已选项"
    unit="个"
    placeholder="请选择"
    height="300"
    :notNull="true"
    :returnParentNode="false"
    :isShowAllChoice="true"
    :selectedIds="select11"
    :choseArea="true"
    :data="dataTreeMultiple5"
    @change="treeConfirm"
    @focusChange="focusChange"
/>

```vue
<TreeSelect
    title="已选项"
    unit="个"
    placeholder="请选择"
    height="300"
    :notNull="true"
    :returnParentNode="false"
    :isShowAllChoice="true"
    :selectedIds="select11"
    :choseArea="true"
    :data="dataTreeMultiple5"
    @change="treeConfirm"
    @focusChange="focusChange"
/>
dataTreeMultiple5: JSON.parse(JSON.stringify(dataTree)),
select11: []

// 多选返回的id组
treeConfirm(data) {
    console.log(data)
},
focusChange(status) {
    console.log('focusChange', status);
}
```

#### title + unit + placeholder + height + linkage + choseArea 上下级不联动

<TreeSelect
    title="已选项"
    unit="个"
    placeholder="请选择"
    height="300"
    :linkage="false"
    :choseArea="true"
    :data="dataTreeMultiple6"
    @change="treeConfirm"
    @focusChange="focusChange"
/>

```vue
<TreeSelect
    title="已选项"
    unit="个"
    placeholder="请选择"
    height="300"
    :linkage="false"
    :choseArea="true"
    :data="dataTreeMultiple6"
    @change="treeConfirm"
    @focusChange="focusChange"
/>
dataTreeMultiple6: JSON.parse(JSON.stringify(dataTree)),

// 多选返回的id组
treeConfirm(data) {
    console.log(data)
},
focusChange(status) {
    console.log('focusChange', status);
}
```

####  title + unit + placeholder + width + width + lastStage + choseArea + linkage  只能选择末级

<TreeSelect
    title="已选择人员"
    unit="个"
    placeholder="请选择"
    width="300"
    height="50"
    :lastStage="true"
    :linkage="false"
    :choseArea="true"
    :data="dataTreeMultiple7"
    @change="treeConfirm"
    @focusChange="focusChange"
/>

````vue
<TreeSelect
    title="已选择人员"
    unit="个"
    placeholder="请选择"
    width="300"
    height="50"
    :lastStage="true"
    :linkage="false"
    :choseArea="true"
    :data="dataTreeMultiple7"
    @change="treeConfirm"
    @focusChange="focusChange"
/>
dataTreeMultiple7: JSON.parse(JSON.stringify(dataTree)),

// 多选返回的id组
treeConfirm(data) {
    console.log(data)
},
focusChange(status) {
    console.log('focusChange', status);
}
````

::: details 点击查看数据格式
```vue
const dataTree = [
        {
            id: "0",
            name: "顶级顶级",
            open: true,
            checked: "uncheck",
            children: [
                {
                    id: "1",
                    name: "一级1",
                    open: false,
                    checked: "uncheck",
                    children: [
                        {
                            id: "12",
                            name:
                                "测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测",
                            checked: "uncheck"
                        },
                        { id: "121", name: "二级3111", checked: "uncheck"},
                        { id: "122", name: "二级4", checked: "uncheck"},
                        {
                            id: "1321",
                            name: "二级1",
                            open: false,
                            checked: "uncheck"
                        }
                    ]
                },
                {
                    id: "2",
                    name: "一级2",
                    open: false,
                    checked: "uncheck",
                    children: [
                        { id: "2220", name: "测试222", checked: "uncheck", isleaf: true },
                        { id: "2221", name: "二级21", checked: "uncheck", isleaf: true },
                        { id: "2222", name: "二级22", checked: "uncheck", isleaf: true }
                    ]
                },
                {
                    id: "3",
                    name: "一级3",
                    open: false,
                    checked: "uncheck",
                    children: [
                        { id: "3220", name: "测试222", checked: "uncheck", isleaf: true },
                        { id: "32201", name: "二级31", checked: "uncheck", isleaf: true, disabled: true },
                        { id: "3221", name: "二级32", checked: "uncheck", isleaf: true }
                    ]
                },
                {
                    id: "4",
                    name: "测试末级配置不可选",
                    checked: "uncheck",
                    isleaf: false
                }
            ]
        }
    ];

    const dataTree1 = [
        {
            id: "0",
            name: "顶级顶级",
            checked: "checked"
        },
        {
            id: "1",
            name: "顶213",
            checked: "uncheck"
        },
        {
            id: "2",
            name: "顶852",
            open: true,
            checked: "checked"
        }
    ]
```
:::

<script>
    const dataTree = [
        {
            id: "0",
            name: "顶级顶级",
            open: true,
            checked: "uncheck",
            children: [
                {
                    id: "1",
                    name: "一级1",
                    open: false,
                    checked: "uncheck",
                    children: [
                        {
                            id: "12",
                            showCheckBox: false,
                            name:
                                "测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测",
                            checked: "uncheck"
                        },
                        { id: "121", name: "二级3111", checked: "checked", disabled: true},
                        { id: "122", name: "二级4", checked: "uncheck"},
                        {
                            id: "1321",
                            name: "二级1",
                            open: false,
                            checked: "uncheck"
                        }
                    ]
                },
                {
                    id: "2",
                    name: "一级2",
                    open: false,
                    checked: "uncheck",
                    children: [
                        { id: "2220", name: "测试222", checked: "uncheck", isleaf: true },
                        { id: "2221", name: "二级21", checked: "checked", isleaf: true, disabled: true },
                        { id: "2222", name: "二级22", checked: "uncheck", isleaf: true }
                    ]
                },
                {
                    id: "3",
                    name: "一级3",
                    open: false,
                    checked: "uncheck",
                    children: [
                        { id: "3220", name: "测试222", checked: "uncheck", isleaf: true },
                        { id: "32201", name: "二级31", checked: "checked", isleaf: true, disabled: true },
                        { id: "3221", name: "二级32", checked: "uncheck", isleaf: true }
                    ]
                },
                {
                    id: "4",
                    name: "测试末级配置不可选",
                    checked: "uncheck",
                    isleaf: false
                }
            ]
        }
    ];

    const dataTree1 = [
        {
            id: "0",
            name: "顶级顶级",
            checked: "checked"
        },
        {
            id: "1",
            name: "顶213",
            checked: "uncheck"
        },
        {
            id: "2",
            name: "顶852",
            open: true,
            checked: "checked"
        }
    ]

    export default {
        name: "TreeSelectView",
        data() {
            return {
                selectId: "121",
                selectedIds: [],
                selectTests: [],
                select11: [],
                dataTree: dataTree,
                dataTreeSingle: JSON.parse(JSON.stringify(dataTree)),
                dataTreeSingle1: JSON.parse(JSON.stringify(dataTree)),
                dataTreeMultiple: null,
                dataTreeMultiple1: JSON.parse(JSON.stringify(dataTree)),
                dataTreeMultiple2: JSON.parse(JSON.stringify(dataTree)),
                dataTreeMultiple3: JSON.parse(JSON.stringify(dataTree)),
                dataTreeMultiple4: JSON.parse(JSON.stringify(dataTree)),
                dataTreeMultiple5: JSON.parse(JSON.stringify(dataTree)),
                dataTreeMultiple6: JSON.parse(JSON.stringify(dataTree)),
                dataTreeMultiple7: JSON.parse(JSON.stringify(dataTree)),
                dataTest: JSON.parse(JSON.stringify(dataTree1))
            };
        },
        watch: {
            selectId(n) {
                console.log("单选选中的项：", n);
            }
        },
        mounted() {
            setTimeout(() => {
                this.dataTreeMultiple = JSON.parse(JSON.stringify(dataTree))
            }, 3000);
            setTimeout(() => {
                this.dataTest.forEach(item =>{
                    this.selectTests.push(item.id)
                })
            }, 3000);
            setTimeout(() =>{
                this.selectedIds = ['121','32201'];
                this.select11 = ['12','121']
            },3000)
        },
        methods: {
            test() {
                this.selectId = '';
                this.selectedIds = [];
            },
            selectChange(ids,dataObj) {
                console.log("多选返回的id组:::", ids);
            },
            treeConfirm(ids,dataObj) {
                console.log('这个是最后的接收数据：',ids);
            },
            changeSingle(id,dataObj) {
                this.selectId = id
                console.log('这个是treeSelectView 单选：',id);
            },
            focusChange(status) {
                console.log('focusChange', status);
            }
        }
    };
</script>


### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| title    | 选择内容后的title | String | 已选项 | No   |
| unit    | 选择内容后的提示单位 | String | 个 | No   |
| placeholder    | 无选择提示 | String | 请选择 | No   |
| disabled   | 是否禁用 | Boolean | false | No   |
|  width   | 触发器宽度 | Number | 240 | No   |
|  overWidth   | 面板宽度 | String/Number | '' | No   |
|  height   | 下来容器高度,最小高度360 | Number | 360 | No   |
|  data   | 传入的树结构数据 | Array | [] | No   |
|  multiple   | 是否开启多选 | Boolean | false | No   |
|  value   | 单选情况下v-model绑定的值 | String | '' | No   |
|  linkage   | 上下级是否联动 | Boolean | true | No   |
|  notNull   | 是否返回半选状态的id | Boolean | false | No   |
|  choseArea | 是否带选择区域 | Boolean | false | No   |
|  lastStage | 是否只可选最后一级 | Boolean | false | No   |
|  isleaf | 配置末级是否可选 | Boolean | true | No   |
|  hideClear | 配置触发器清除按钮是否显示 | Boolean | false | No   |
| focusChange    | treeSelect组件展开的回调 | Function | -- | No     |
| returnParentNode | 是否返回父对象数据 | Boolean | true | No |
| change | 接收返回的已选择数据，接收两个参数，ids，dataObj | Function | -- | No |
| isShowAllChoice | 当值为true时，在全选的情况下触发器内容会显示‘全部’且不会显示popover | Boolean | false | No |
| isReadOnly | input框是否允许输入数据进行数据筛选 | Boolean | false | No|
| caption | input框设置title | String | '' | No |
| selectedIds | 设置多选默认选中数据 | Array | [] | No |
| transfer |  设置父标签出现滚动条的id  | String |   ''   |  no |
| showCheckBox | 设置是否展示checkBox勾选框 | Boolean | true | no |
| errorText   | 错误提示文本 | String | ''  | no     |
| errorShow   | 错误提示文本显隐状态 | Boolean | false  | no     |


::: tip
***如果linkage = false 或者 lastStage = true，isShowAllChoice、returnParentNode无效***
:::

::: tip
***只能通过 selectedIds 属性来设置数据的默认选中***
:::

::: danger 警告
    该组件单页在理论情况(即页面只存在TreeSelect) data数据全部展开且子父级之和可容纳225条，超过225弹出动画会卡，
    若不考虑css动画，数据可容纳最多3000条
:::

