<template>
    <div class="toggleView">
        <div class="component component-padding">
             <h1 class="components-title">Breadcrumb组件</h1>
            <!--
             data: Breadcrumb数据
             v-model绑定的面包屑的值，若有绑定了该值，表示可点击
             -->

            <Breadcrumb :data="breadData" v-model="breadId" />
            <Breadcrumb :data="breadData" />
        </div>
    </div>
</template>

<script>

const data = [
    { id: 'totalEnergy', name: '总量总量总量总量总量总量总量' },
    { id: 'singleParty', name: '单平米' },
    { id: 'lowerLevel', name: '下级分项' },
    { id: 'average', name: '滑动平均啊啊啊啊', disabled: true }
];
export default {
    name: 'BreadcrumbView',
    data() {
        return {
            breadData: data,
            breadId: 'average'
        };
    },
    watch: {
        breadId(n, o) {
            if (n === o) return;
            console.log('breadId:::', n);
        }
    }
};
</script>

<style lang="stylus" scoped>

    .textCar
        width 240px

</style>
