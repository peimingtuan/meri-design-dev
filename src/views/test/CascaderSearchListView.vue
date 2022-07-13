<template>
    <div class="newCascader-display-panel">
        <div>
             <h2 class="components-title-h2">带二级面板-可筛选 </h2>
            <CascaderSearchList
                    placeholder="测试placeholder"
                    :title="title"
                    :caption="title"
                    tipPlace="top"
                    v-model="model"
                    :data="cascaderData8"
                    @changeCaption="changeCaption"
                    @confirm = "testConfirm"
                    width="300">
            </CascaderSearchList>
        </div>
        <div class="cascaderSearchList">
             <h2 class="components-title-h2">只有一级面板 </h2>
            <CascaderSearchList
                    placeholder="测试placeholder"
                    tipPlace="top"
                    v-model="model2"
                    :data="cascaderData"
                    :root="false"
                    @focusChange="focusChange"
                    @confirm = "testConfirm"
                    width="300">
            </CascaderSearchList>
        </div>
    </div>
</template>
<script>

export default {
    name: 'CascaderSearchListView',
    watch: {
        model1(n, o) {
        }
    },
    data() {
        return {
            model: ['id10', 'id11', 'id2', 'id20'],
            model2: [],
            cascaderData: [
                { id: 'id2', title: 'London' },
                { id: 'id3', title: 'Edinburgh', disabled: true },
                { id: 'id4', title: 'Cardiff' },
                { id: 'id5', title: 'Birmingham' },
                { id: 'id6', title: 'Liverpool' },
                { id: 'id7', title: 'Oxford' },
                { id: 'id8', title: 'Plymouth' }
            ],
            cascaderData8: [
                {
                    title: 'United Kingdom',
                    id: 'id1',
                    children: [
                        { id: 'id2', title: 'London' },
                        { id: 'id3', title: 'Edinburgh' },
                        { id: 'id4', title: 'Cardiff' },
                        { id: 'id5', title: 'Birmingham' },
                        { id: 'id6', title: 'Liverpool' },
                        { id: 'id7', title: 'Oxford' },
                        { id: 'id8', title: 'Plymouth' }
                    ]
                },
                {
                    title: 'AMERICAN',
                    id: 'id9',
                    children: [
                        { id: 'id10', title: 'Chicago' },
                        { id: 'id11', title: 'Philadelphia' },
                        { id: 'id12', title: 'Boston' },
                        { id: 'id13', title: 'Houston' },
                        { id: 'id14', title: 'Atlanta' },
                        { id: 'id15', title: 'San Francisco' }
                    ]
                },
                {
                    title: 'CHINA',
                    id: 'id16',
                    children: [
                        { id: 'id17', title: 'BeiJing' },
                        { id: 'id18', title: 'ShangHAI' },
                        {
                            title: 'GuiYang',
                            id: 'id19',
                            children: [
                                { id: 'id20', title: 'Qingyan' },
                                { id: 'id21', title: 'Guian' }
                            ]
                        },
                        { id: 'id22', title: 'ZunYi' }
                    ]
                },
                {
                    title: '韩国',
                    id: 'id23',
                    children: [
                        { id: 'id24', title: '首尔' },
                        { id: 'id25', title: '仁川' },
                        { id: 'id26', title: '釜山' },
                        { id: 'id27', title: '蔚山' }
                    ]
                }

            ],
            cascaderData9: [
                {
                    title: 'United Kingdom',
                    id: 'id1'
                },
                {
                    title: 'AMERICAN',
                    id: 'id2'
                },
                {
                    title: 'CHINA',
                    id: 'id3'
                }
            ],
            title: '区域'
        };
    },
    mounted() {
        setTimeout(() => {
            this.cascaderData.forEach(d => {
                this.model2.push(d.id);
            });
        }, 200);
    },
    methods: {
        testChange(data) {
        },
        testChange2(data) {
        },
        testConfirm(data) {

        },
        changeCaption(val) {
            this.title = val;
        },
        focusChange(bol) {}
    }
};
</script>

<style lang="stylus">
.newCascader-display-panel
    padding 100px
    .cascaderSearchList
        margin-top 40px

</style>
