<template>
    <div class="mCascade">
<!--        trigger="click"-->
        <div class="mc1">
            <MCascade
                width="280"
                dropWidth="280"
                v-model="selectedIds"
                :data="cascadeData"
                @change="change"
            />
        </div>
        <br><br>
    </div>
</template>

<script>

const data = [
    {
        name: '全局',
        id: 'quanju'
    },
    {
        name: 'United Kingdom',
        id: 'id1',
        children: [
            { id: 'id2', name: 'London' },
            { id: 'id3', name: 'Edinburgh' },
            { id: 'id4', name: 'Cardiff' },
            { id: 'id5', name: 'Birmingham' },
            { id: 'id6', name: 'Liverpool' },
            { id: 'id7', name: 'Oxford' },
            { id: 'id8', name: 'Plymouth' }
        ]
    },
    {
        name: 'AMERICAN',
        id: 'id9',
        children: [
            { id: 'id10', name: 'Chicago' },
            { id: 'id11', name: 'Philadelphia' },
            { id: 'id12', name: 'Boston' },
            { id: 'id13', name: 'Houston' },
            { id: 'id14', name: 'Atlanta' },
            { id: 'id15', name: 'San Francisco' }
        ]
    },
    {
        name: 'CHINA',
        id: 'id16',
        children: [
            { id: 'id17', name: 'BeiJing' },
            { id: 'id18', name: 'ShangHAI' },
            {
                name: 'GuiYang',
                id: 'id19',
                children: [
                    { id: 'id20', name: 'Qingyan' },
                    { id: 'id21', name: 'Guian' }
                ]
            },
            { id: 'id22', name: 'ZunYi' }
        ]
    },
    {
        name: '韩国',
        id: 'id23',
        disabled: true,
        children: [
            { id: 'id24', name: '首尔' },
            { id: 'id25', name: '仁川' },
            { id: 'id26', name: '釜山' },
            { id: 'id27', name: '蔚山' }
        ]
    }
];

export default {
    name: 'MCascadeView',
    data() {
        return {
            selectedIds: ['quanju'], // [一级id, 二级id, 三级id, ...]
            // selectedIds: ['id1', 'id3'], // [一级id, 二级id, 三级id, ...]
            // selectedIds: [], // [一级id, 二级id, 三级id, ...]
            cascadeData: []
        };
    },
    mounted() {
        setTimeout(() => {
            this.cascadeData = data;
            setTimeout(() => {
                this.selectedIds = ['id1', 'id3'];
            }, 1000);
            setTimeout(() => {
                this.selectedIds = ['id9', 'id11'];
            }, 5000);
        }, 1000);
    },
    methods: {
        change(ids) {
            console.log('change==', ids);
        }
    }
};
</script>

<style lang="stylus">
.mCascade
    padding 40px
.mc1
    padding-left 50%
</style>
