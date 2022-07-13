### Breadcrumb 面包屑

#### 展示类
<Breadcrumb :data="breadData" />

```vue
<Breadcrumb :data="breadData" />
```

#### 可点击类
<Breadcrumb :data="breadData" v-model="breadId" />

```vue
<Breadcrumb :data="breadData" v-model="breadId" />
```

#### 数据
```vue
<script>
    const data=[
        { id: 'totalEnergy', name: '总量' },
        { id: 'singleParty', name: '单平米' },
        { id: 'lowerLevel', name: '下级分项' },
        { id: 'average', name: '滑动平均啊啊啊啊'}
    ];
    export default {
        name: "BreadcrumbView",
        data() {
            return {
                breadData: data,
                breadId: 'average'
            }
        }
    }
</script>
```

<script>
    const data=[
        { id: 'totalEnergy', name: '总量' },
        { id: 'singleParty', name: '单平米' },
        { id: 'lowerLevel', name: '下级分项' },
        { id: 'average', name: '滑动平均啊啊啊啊'}
    ];
    export default {
        name: "BreadcrumbView",
        data() {
            return {
                breadData: data,
                breadId: 'average'
            }
        }
    }
</script>

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| data    | 数据列表 | Array | '' | Yes     |
| v-model    | 双向绑定的值 | String | '' | no     |
| ellipsis    | 每个item都显示省略号 | Boolean | false | no     |
| @change    | 点击item回调 | Function | -- | no     |
