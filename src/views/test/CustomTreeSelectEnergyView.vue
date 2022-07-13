<template>
    <div class="customTreeSelectEnergyView">
        <Button @click="showClick">选中项互不影响</Button>
        <br>
        <!--
            :onlySearchLastLevel="true"
        -->
        <CustomTreeSelectEnergy
            :show.sync="show"
            title="添加设备"
            :omit="true"
            :jointParent="true"
            :moreBtn="moreBtn"
            v-model="value1"
            :data="data1"
            :selectedSave="false"
            @change="change"
            @addGroup="addGroup"
        />
        <br><br>
        <Button @click="showClick2">选中项相互影响</Button>
        <br>
        <!--
        -->
        <CustomTreeSelectEnergy
            :show.sync="show2"
            :linkage="true"
            :jointParent="true"
            :moreBtn="moreBtn2"
            v-model="value2"
            :data="data2"
            :autoClose="true"
            @change="change"
            @prevStep="prevStep"
        />
<!--        :selectedSave="false"-->
    </div>
</template>

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
            value1: ['2'],
            // value1: [],
            data1: JSON.parse(JSON.stringify(data)),
            value2: ['122'],
            data2: JSON.parse(JSON.stringify(data)),
            show: false,
            show2: false,
            // 开启更多按钮
            moreBtn: {
                open: true,
                // weight: true, // 权重
                disabled: false,
                // text: '上一步',
                text: '添加至分组',
                event: 'addGroup'
            },
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
    // mounted() {
    //     setTimeout(() => {
    //         this.show = false;
    //     }, 5000);
    // },
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

<style lang="stylus">
.customTreeSelectEnergyView
    padding 40px
</style>
