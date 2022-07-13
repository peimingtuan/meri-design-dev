<template>
    <div class="selectScreenView">
         <h3 class="components-title-h3">1.单选</h3>
        <br>
        <!--
        -->
        <SelectScreen
                status="single"
                :selectedId="id"
                :data="data1"
                @change="screenHandle"
        />
        <br><br><br>
         <h3 class="components-title-h3">2.单选 + 搜索</h3>
        <br>
        <SelectScreen
                status="singleSearch"
                :selectedId="id"
                :data="data1"
        />
        <br><br><br>
         <h3 class="components-title-h3">3.多选</h3>
        <br>
        <SelectScreen
                status="multiple"
                :selectedId="id2"
                :data="data1"
                @change="screenHandle"
        />
        <br><br><br>
         <h3 class="components-title-h3">4.多选 + 搜索</h3>
        <br>
        <!--
        -->
        <SelectScreen
                status=" -"
                :selectedId="id2"
                :data="data1"
        />
        <br><br><br>
    </div>
</template>

<script>
const data1 = [
    { id: 'all', name: '全部' },
    { id: 'executed', name: '已执行已执行已执行已执行已执行已执行已执行已执行已执行已执行' },
    { id: 'non-execution', name: '未执行' },
    { id: 'audit', name: '审核中' },
    { id: 'has-approval', name: '已审批' },
    { id: 'has-approval2', name: '已审批' },
    { id: 'has-approval3', name: '已审批' },
    { id: 'has-approval4', name: '已审批' }
];
export default {
    name: 'SelectScreenView',
    data() {
        return {
            id: 'all',
            name: '全部',
            data1,
            id2: 'all,executed,audit'
        };
    },
    methods: {
        screenHandle(id, obj) {
            console.log('选中的id：', id, obj);
        }
    }
};
</script>

<style lang="stylus">

</style>
