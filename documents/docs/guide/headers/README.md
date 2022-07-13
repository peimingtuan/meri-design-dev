### Headers 头部组合

::: tip
Headers组件分为左中右三块内容，使用具名插槽;<br>
插槽那么分别为left、middle、right
:::

::: danger
注意：<br>
Headers组件分为左中右三块内容，使用具名插槽;<br>
插槽名分别为left、middle、right
:::

<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1>Headers组件</h1>
            <h3 style="font-size: 14px">1.Select + Breadcrumb + Tabs + Button</h3>
            <Headers>
                <template v-slot:left>
                    <div style="margin-right: 12px"><Select v-model="selectId" placeholder="请选择" :selectdata="selectData" :radius="true" :hideClear="true" width="144" /></div>
                    <Breadcrumb :data="breadData1" />
                </template>
                <template v-slot:middle>
                    <Tabs type="first-nav" :data="tabData" v-model="tabId" />
                </template>
                <template v-slot:right>
                    <Button type="default">默认</Button>
                    <Button type="disabled">禁用</Button>
                    <Button type="primary">普通</Button>
                </template>
            </Headers>
            <div style="margin: 20px"></div>
            <h3 style="font-size: 14px">2.Breadcrumb + Tabs + Button</h3>
            <Headers>
                <template v-slot:left>
                    <Breadcrumb :data="breadData" v-model="breadId" />
                </template>
                <template v-slot:middle>
                    <div style="font-size: 18px;">这是标题</div>
                </template>
                <template v-slot:right>
                    <Button type="default">默认</Button>
                    <Button type="disabled">禁用</Button>
                    <Button type="primary">普通</Button>
                </template>
            </Headers>
            <div style="margin: 20px"></div>
            <h3 style="font-size: 14px">3.Breadcrumb + 标题</h3>
            <Headers>
                <template v-slot:left>
                    <Breadcrumb :data="breadData" v-model="breadId" />
                </template>
                <template v-slot:middle>
                    <div style="font-size: 18px;">这是标题</div>
                </template>
            </Headers>
            <div style="margin: 20px"></div>
            <h3 style="font-size: 14px">4.其他 + 标题</h3>
            <Headers>
                <template v-slot:left>
                    <span style="font-size: 16px">Home</span>
                </template>
                <template v-slot:middle>
                    <div style="font-size: 18px;">这是标题</div>
                </template>
            </Headers>
            <div style="margin: 20px"></div>
            <h3 style="font-size: 14px">5.标题</h3>
            <Headers>
                <template v-slot:middle>
                    <div style="font-size: 18px;">这是标题</div>
                </template>
            </Headers>
        </div>
    </div>
</template>

<script>
    const data=[
        { id: 'totalEnergy', name: '总量' },
        { id: 'singleParty', name: '单平米' },
        { id: 'lowerLevel', name: '下级分项' },
        { id: 'average', name: '滑动平均啊啊啊啊', disabled: true }
    ];

    export default {
        name: "HeadersView",
        data() {
            return {
                tabId: '1', // 下拉列表绑定的值
                selectId: 'totalEnergy', // 下拉列表绑定的值
                selectData: data, // 下拉列表数据
                breadId: 'average', // 面包屑id
                breadData1: [
                    { id: 'totalEnergy', name: '总量' },
                    { id: 'singleParty', name: '单平米' }
                ], // 面包屑数据
                breadData: data // 面包屑数据
            }
        },
        computed: {
            tabData() {
                return [
                    { id: '1', name: '第1模块' },
                    { id: '2', name: '第2模块' },
                    { id: '3', name: '第3模块' },
                    { id: '4', name: '第4模块' }
                ]
            }
        },
        methods: {
            // 下拉列表改变
            selectChange(id) {
                console.log('********selectChange:::', id);
                this.selectId=id;
            },
            // 面包屑改变
            breadChange(id) {
                console.log('********breadChange:::', id);
                this.breadId=id;
            },
            // 面包屑改变
            btnClick() {
                console.log('********btnClick:::');
            }
        }
    }
</script>


```vue
<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1>Headers组件</h1>
            <h3 style="font-size: 14px">1.Select + Breadcrumb + Tabs + Button</h3>
            <Headers>
                <template v-slot:left>
                   <div style="margin-right: 12px"><Select v-model="selectId" placeholder="请选择" :selectdata="selectData" :radius="true" width="144" /></div>
                    <Breadcrumb :data="breadData1" />
                </template>
                <template v-slot:middle>
                    <Tabs :data="tabData" v-model="tabId" />
                </template>
                <template v-slot:right>
                    <Button type="default">默认</Button>
                    <Button type="disabled">禁用</Button>
                    <Button type="primary">普通</Button>
                </template>
            </Headers>
            <div style="margin: 20px"></div>
            <h3 style="font-size: 14px">2.Breadcrumb + Tabs + Button</h3>
            <Headers>
                <template v-slot:left>
                    <Breadcrumb :data="breadData" v-model="breadId" />
                </template>
                <template v-slot:middle>
                    <div style="font-size: 18px;">这是标题</div>
                </template>
                <template v-slot:right>
                    <Button type="default">默认</Button>
                    <Button type="disabled">禁用</Button>
                    <Button type="primary">普通</Button>
                </template>
            </Headers>
            <div style="margin: 20px"></div>
            <h3 style="font-size: 14px">3.Breadcrumb + 标题</h3>
            <Headers>
                <template v-slot:left>
                    <Breadcrumb :data="breadData" v-model="breadId" />
                </template>
                <template v-slot:middle>
                    <div style="font-size: 18px;">这是标题</div>
                </template>
            </Headers>
            <div style="margin: 20px"></div>
            <h3 style="font-size: 14px">4.其他 + 标题</h3>
            <Headers>
                <template v-slot:left>
                    <span style="font-size: 16px">Home</span>
                </template>
                <template v-slot:middle>
                    <div style="font-size: 18px;">这是标题</div>
                </template>
            </Headers>
            <div style="margin: 20px"></div>
            <h3 style="font-size: 14px">5.标题</h3>
            <Headers>
                <template v-slot:middle>
                    <div style="font-size: 18px;">这是标题</div>
                </template>
            </Headers>
        </div>
    </div>
</template>

<script>
    const data=[
        { id: 'totalEnergy', name: '总量' },
        { id: 'singleParty', name: '单平米' },
        { id: 'lowerLevel', name: '下级分项' },
        { id: 'average', name: '滑动平均啊啊啊啊', disabled: true }
    ];

    export default {
        name: "HeadersView",
        data() {
            return {
                tabId: '1', // 下拉列表绑定的值
                selectId: 'totalEnergy', // 下拉列表绑定的值
                selectData: data, // 下拉列表数据
                breadId: 'average', // 面包屑id
                breadData1: [
                    { id: 'totalEnergy', name: '总量' },
                    { id: 'singleParty', name: '单平米' }
                ], // 面包屑数据
                breadData: data // 面包屑数据
            }
        },
        computed: {
            tabData() {
                return [
                    { id: '1', name: '第1模块' },
                    { id: '2', name: '第2模块' },
                    { id: '3', name: '第3模块' },
                    { id: '4', name: '第4模块' }
                ]
            }
        },
        methods: {
            // 下拉列表改变
            selectChange(id) {
                console.log('********selectChange:::', id);
                this.selectId=id;
            },
            // 面包屑改变
            breadChange(id) {
                console.log('********breadChange:::', id);
                this.breadId=id;
            },
            // 面包屑改变
            btnClick() {
                console.log('********btnClick:::');
            }
        }
    }
</script>

```

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| Select    | Select组件 | Component | -- | no     |
| Breadcrumb    | Breadcrumb组件 | Component | -- | no     |
| Tabs    | Tabs组件 | Component | -- | no     |
| Button    | Button组件 | Component | -- | no     |