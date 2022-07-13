<template>
    <div class="toggleView">
        <div class="component component-padding">
             <h1 class="components-title">Headers组件</h1>
            <div>
                 <h2 class="components-title-h2">·说明</h2>
                <pre style="font-size: 14px;color: red;line-height: 20px;">
                    Headers组件分为左中右三块内容，使用具名插槽;
                    插槽名分别为left、middle、right
                </pre>
            </div>
             <h3 class="components-title-h3">1.Select + Breadcrumb + Tabs + Button</h3>
            <Headers>
                <template v-slot:left>
                    <div style="margin-right: 12px">
                        <Select v-model="selectId" placeholder="请选择" :selectdata="selectData" :radius="true" :hideClear="true" width="144" />
                    </div>
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
             <h3 class="components-title-h3">2.Breadcrumb + Tabs + Button</h3>
            <Headers>
                <template v-slot:left>
                    <Breadcrumb :data="breadData" v-model="breadId" />
                </template>
                <template v-slot:middle>
                    <div class="header-middle-title">这是标题</div>
                </template>
                <template v-slot:right>
                    <Button type="default">默认</Button>
                    <Button type="disabled">禁用</Button>
                    <Button type="primary">普通</Button>
                </template>
            </Headers>
            <div style="margin: 20px"></div>
             <h3 class="components-title-h3">3.Breadcrumb + 标题</h3>
            <Headers>
                <template v-slot:left>
                    <Breadcrumb :data="breadData" v-model="breadId" />
                </template>
                <template v-slot:middle>
                    <div class="header-middle-title">这是标题</div>
                </template>
            </Headers>
            <div style="margin: 20px"></div>
             <h3 class="components-title-h3">4.其他 + 标题</h3>
            <Headers>
                <template v-slot:left>
                    <span class="header-middle-title">Home</span>
                </template>
                <template v-slot:middle>
                    <div class="header-middle-title">这是标题</div>
                </template>
            </Headers>
            <div style="margin: 20px"></div>
             <h3 class="components-title-h3">5.标题</h3>
            <Headers>
                <template v-slot:middle>
                    <div class="header-middle-title">这是标题</div>
                </template>
            </Headers>
        </div>
    </div>
</template>

<script>
const data = [
    { id: 'totalEnergy', name: '总量' },
    { id: 'singleParty', name: '单平米' },
    { id: 'lowerLevel', name: '下级分项' },
    { id: 'average', name: '滑动平均啊啊啊啊', disabled: true }
];

export default {
    name: 'HeadersView',
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
        };
    },
    computed: {
        tabData() {
            return [
                { id: '1', name: '第1模块' },
                { id: '2', name: '第2模块' },
                { id: '3', name: '第3模块' },
                { id: '4', name: '第4模块' }
            ];
        }
    },
    methods: {
        // 下拉列表改变
        selectChange(id) {
            console.log('********selectChange:::', id);
            this.selectId = id;
        },
        // 面包屑改变
        breadChange(id) {
            console.log('********breadChange:::', id);
            this.breadId = id;
        },
        // 面包屑改变
        btnClick() {
            console.log('********btnClick:::');
        }
    }
};
</script>

<style lang="stylus">
.header-middle-title
    font-size 18px
    color $grey-900
</style>
