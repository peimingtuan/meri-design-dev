### MSelect 下拉选择v2

::: tip
第二版下拉选择器<br>
:::

### 单选
<MSelect
    width="180"
    v-model="selectId"
    :data="selectData"
    @change="change"
/>

::: details 查看示例
```vue
<MSelect
    width="180"
    v-model="selectId"
    :data="selectData"
    @change="change"
/>

const selectData = [
    { id: '000', name: '000' },
    { id: '111', name: '111' },
    { id: '222', name: '222' },
    { id: '333', name: '333', disabled: true },
    { id: '444', name: '是第四个这是第四个啊啊啊啊啊啊啊四个' },
    { id: '555', name: '555呀555' }
];
change(id, item) {
    console.log('change:::', id, item);
}

selectId: '222'
```
:::

### 多选

<MSelect
    width="300"
    :multiple="true"
    v-model="mid"
    :data="selectData3"
    @change="change3"
/>

::: details 查看示例
```vue
<MSelect
    width="300"
    :multiple="true"
    v-model="mid"
    :data="selectData3"
    @change="change3"
/>

const selectData3 = [
    { id: '000', name: '000', checked: 'uncheck' },
    { id: '111', name: '111', checked: 'uncheck' },
    { id: '222', name: '222', checked: 'uncheck' },
    {
        id: '333', name: '333', disabled: true, checked: 'uncheck'
    },
    { id: '444', name: '是第四个这是第四个啊啊啊啊啊啊啊四个', checked: 'uncheck' },
    { id: '555', name: '555呀555', checked: 'uncheck' }
];

mid: ['222', '444']

change3(ids, items) {
    console.log('change3:::', ids, items);
}
```
:::

<script>
const selectData = [
    { id: '000', name: '000' },
    { id: '111', name: '111' },
    { id: '222', name: '222' },
    { id: '333', name: '333', disabled: true },
    { id: '444', name: '是第四个这是第四个啊啊啊啊啊啊啊四个' },
    { id: '555', name: '555呀555' }
];

const selectData3 = [
    { id: '000', name: '000', checked: 'uncheck' },
    { id: '111', name: '111', checked: 'uncheck' },
    { id: '222', name: '222', checked: 'uncheck' },
    {
        id: '333', name: '333', disabled: true, checked: 'uncheck'
    },
    { id: '444', name: '是第四个这是第四个啊啊啊啊啊啊啊四个', checked: 'uncheck' },
    { id: '555', name: '555呀555', checked: 'uncheck' }
];

export default {
    name: 'MSelectView',
    data() {
        return {
            selectId: '222',
            selectData,
            mid: ['222', '444'],
            selectData3
        };
    },
    methods: {
        change(id, item) {
            console.log('change:::', id, item);
        },
        change3(ids, items) {
         console.log('change3:::', ids, items);
        }
    }
};
</script>


### Attributes

| 参数     | 说明    | 类型    | 默认值   | 必须  |  
| ------- | ----    | ------  | ------- | ------|
| width    | 宽度 | String/Number | 120     | no     |
| caption   | 触发器标题 | String | '' | no     |
| placeholder   | 占位内容 | String | 请选择 | no     |
| disabled   | 禁用状态 | Boolean | false | no     |
| clearHide   | 是否隐藏清除按钮 | Boolean | false | no     |
| openSearch   | 开启搜索 | Boolean | true | no     |
| maxCount   | 下拉列表做大展示数量 | Number/String | 5 or 8 | no     |
| v-model    | 绑定的id| Number/String/Array | ''    | no     |
| data   | 列表数据 | Array | []  | no     |
| errorText   | 错误提示文本 | String | ''  | no     |
| errorShow   | 错误提示文本显隐状态 | Boolean | false  | no     |
| @change   | 选中后的回调 | Function | (id, item) => {}  | no     |
| errorText   | 错误提示文本 | String | ''  | no     |
| errorShow   | 错误提示文本显隐状态 | Boolean | false  | no     |
