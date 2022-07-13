<template>
    <div class="pTreeSelectView">
        <div>
            <h3 class="components-title-h3">3.多选</h3>
            <PTreeSelect
                caption="标题："
                triggerWidth="300"
                :data="TreeData5"
                :multiple="true"
                type="tag"
                :panel="true"
                @change="change"
            />
        </div>
<!--        &lt;!&ndash;-->
        <div>
             <h3 class="components-title-h3">1.disabled</h3>
            <PTreeSelect :disabled="true" />
        </div>
        <div>
            <h3 class="components-title-h3">2.单选</h3>
            <PTreeSelect
                v-model="singleId"
                :data="data1"
                caption="单选："
                @change="change"
            />
        </div>
        <div>
             <h3 class="components-title-h3">3.多选</h3>
<!--            :panel="true"-->
            <PTreeSelect
                    :data="data2"
                    :multiple="true"
                    :includeParent="false"
                    dropWidth="200"
                    @change="change"
            />
        </div>
        <div>
             <h3 class="components-title-h3">4.多选 + 可选面板</h3>
            <PTreeSelect
                    v-model="multipleId"
                    :data="data3"
                    :multiple="true"
                    :panel="true"
                    :clearHide="true"
                    dropWidth="500"
                    @change="change"
            />
        </div>
        <div>
             <h3 class="components-title-h3">5.多选 + 可选面板 + childDisable</h3>
            <PTreeSelect
                    v-model="multipleId4"
                    :data="data4"
                    :multiple="true"
                    :childDisable="true"
                    :panel="true"
                    dropWidth="500"
                    @change="change"
            />
        </div>
<!--        &ndash;&gt;-->
<!--        &lt;!&ndash;-->
        <div>
             <h3 class="components-title-h3">6.多选 + 可选面板 + childDisable + 测试环境数据</h3>
            <PTreeSelect
                    v-model="multipleId5"
                    caption="标题："
                    :data="treeData"
                    :multiple="true"
                    :childDisable="true"
                    :panel="true"
                    :dropSearch="false"
                    dropWidth="500"
                    @change="change"
            />
        </div>
        <div>
             <h3 class="components-title-h3">7.多选 + 可选面板 + childDisable + type</h3>
            <PTreeSelect
                    v-model="multipleId5"
                    triggerWidth="300"
                    caption="标题："
                    type="tag"
                    placeholder="输入检索内容"
                    :data="treeData"
                    :multiple="true"
                    :childDisable="true"
                    :panel="true"
                    :dropSearch="true"
                    dropWidth="600"
                    @change="change"
            />
        </div>
<!--        &ndash;&gt;-->
<!--        &lt;!&ndash;-->
        <div>
            <h3 class="components-title-h3">8.checkbox可配置 + type=tag + childDisable</h3>
            <PTreeSelect
                v-model="multipleId5"
                triggerWidth="300"
                caption="标题："
                type="tag"
                placeholder="请选择"
                dropPlaceholder="输入检索内容"
                :data="treeData"
                :multiple="true"
                :clearHide="true"
                :childDisable="true"
                :panel="true"
                :dropSearch="true"
                dropWidth="600"
                @change="change"
            />
        </div>
        <div>
            <h3 class="components-title-h3">9.checkbox可配置 + type=tag</h3>
            <PTreeSelect
                v-model="multipleId9"
                triggerWidth="300"
                caption="标题："
                type="tag"
                placeholder="请选择"
                dropPlaceholder="输入检索内容"
                :data="treeData"
                :multiple="true"
                :clearHide="true"
                :panel="true"
                :dropSearch="true"
                dropWidth="600"
                @change="change"
            />
        </div>
        <div>
            <h3 class="components-title-h3">10.lastStage</h3>
            <PTreeSelect
                v-model="multipleId10"
                triggerWidth="300"
                caption="标题："
                placeholder="请选择"
                :data="treeData"
                :multiple="true"
                :clearHide="true"
                :panel="true"
                :includeParent="false"
                dropWidth="600"
                @change="change"
            />
        </div>
        -->
    </div>
</template>

<script>
import treeData from 'treeData';
import selectCheckboxData from 'selectCheckboxData';
import CreatePTreeJson from 'createPTreeJson';

const TreeData5 = CreatePTreeJson(15);
const dataArr = [
    {
        id: '0',
        name: '顶级顶级',
        open: true,
        children: [
            {
                id: '1',
                name: '一级1',
                open: true,
                children: [
                    { id: '12', name: '二级2' },
                    { id: '121', name: '二级3' },
                    { id: '122', name: '二级4' },
                    {
                        id: '1321',
                        name: '二级1',
                        // defaultDisabled: true,
                        children: [
                            { id: '13', name: '三级2' },
                            { id: '131', name: '三级3' },
                            { id: '132', name: '三级4' }
                            // { id: '13', name: '三级2', defaultDisabled: true },
                            // { id: '131', name: '三级3', defaultDisabled: true },
                            // { id: '132', name: '三级4', defaultDisabled: true }
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
    name: 'PTreeSelectView',
    data() {
        return {
            singleId: '12',
            data1: JSON.parse(JSON.stringify(dataArr)),
            multipleId: ['12', '121', '322'],
            data2: JSON.parse(JSON.stringify(dataArr)),
            data3: JSON.parse(JSON.stringify(dataArr)),
            multipleId4: [],
            data4: [],
            optionData1: [
                { id: '000', name: '零零零零零零零' },
                { id: '111', name: '壹壹壹壹壹壹' },
                { id: '222', name: '贰贰贰贰贰贰贰贰贰' }
            ],
            treeData,
            multipleId5: ['BM7b184adf12d149de912361f7c34db8b2'],
            // multipleId5: [],
            multipleId9: [
                'BM324ccef0ffdc4c75996b19378ad4b88a',
                'BM9e8b6baf82df4fc196729fe0b76468c7',
                'BM7b184adf12d149de912361f7c34db8b2',
                'BM5a13eb82fc6647c289215aa9a4cf5d08'
            ],
            multipleId10: [
                'BM324ccef0ffdc4c75996b19378ad4b88a',
                'BM9e8b6baf82df4fc196729fe0b76468c7',
                'BM7b184adf12d149de912361f7c34db8b2',
                'BM5a13eb82fc6647c289215aa9a4cf5d08'
            ],
            selectCheckboxData,
            TreeData5
        };
    },
    mounted() {
        setTimeout(() => {
            this.data4 = JSON.parse(JSON.stringify(dataArr));
            setTimeout(() => {
                // this.multipleId4 = ['13', '131', '132'];
                // this.multipleId4 = ['12', '121'];
                // this.multipleId4 = ['13', '2', '3'];
                this.multipleId4 = ['1321', '2'];
                // this.multipleId4 = ['122', '2'];
            });
            // }, 3000);
        }, 0);
    },
    methods: {
        // 选择数据改变
        change(item) {
            console.log('选择数据改变::', item);
        }
    }
};
</script>

<style lang="stylus" scoped>
.pTreeSelectView
    display flex
    justify-content space-around
    flex-wrap wrap
    h3
        margin-bottom 8px

</style>
