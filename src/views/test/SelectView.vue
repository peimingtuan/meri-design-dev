<template>
    <section class="select-display-panel" id="selectid100">
        <h1 class="components-title">Select组件</h1>
        <input type="text">
        <section class="row">
            <section>
                <h2 class="components-title-h2">禁选状态333 </h2>
                <Select width="300" :disabled="true" @change="testClick" :selectdata="dataSelect1"
                        :placeholder="'请选择'"/>
            </section>
            <section>
                <h2 class="components-title-h2">主副双行-默认选中-单选 </h2>
                <Select width="300" v-model="model" :isReadOnly="false" @change="testClick" :hideClear='true'
                        :selectdata="dataSelect2" :placeholder="'请选择'"/>
            </section>
        </section>
        <section class="row">
            <section>
                <h2 class="components-title-h2">头像-主副双行-单选-圆角 </h2>
                <Select width="300" radius @change="testClick" :selectdata="dataSelect3" :placeholder="'请选择'"/>
            </section>
            <section>
                <h2 class="components-title-h2">带标签-单选 </h2>
                <Select width="300" transfer='selectid100' :isReadOnly="true" tipPlace="top" caption="标题："
                        @change="testClick" v-model="model4" :selectdata="dataSelect4" :placeholder="'请选择'"/>
            </section>
        </section>
        <section class="row">
            <section>
                <h2 class="components-title-h2">带分类多选 </h2>
                <Select width="300" tipPlace="top" :selectdata="dataSelect5" v-model="model5" @confirm="testConfirm"
                        @cancel="testCancel" @change="testClick" :placeholder="'请选择'" multiple/>
            </section>
        </section>
        <section class="row">
            <section>
                <h2 class="components-title-h2">带标题多选 </h2>
                <Select width="300" tipPlace="top" :selectdata="dataSelect6" @confirm="testConfirm" @cancel="testCancel"
                        @change="testClick" :placeholder="'请选择'" multiple/>
            </section>
            <section>
                <h2 class="components-title-h2">头像单行多选222 </h2>
                <Select width="300" tipPlace="top" caption="标题：" v-model="model2" :selectdata="dataSelect7"
                        @confirm="testConfirm" @cancel="testCancel" @change="testClick" :placeholder="'请选择'" multiple/>
            </section>
        </section>
        <section class="row">
            <section>
                <h2 class="components-title-h2">头像带分类单行多选 </h2>
                <Select width="300" tipPlace="bottom" :selectdata="dataSelect8" @confirm="testConfirm"
                        @cancel="testCancel" @change="testClick" :placeholder="'请选择'" multiple
                        :errorText="errorText"
                        :errorShow="errorShow"
                        maxCount="8"
                />
            </section>
        </section>

        <router-link to="/inputview">inputView</router-link>

        <button @click="deleteModel">deleteModel</button>
    </section>
</template>

<script>
const src = 'http://47.95.122.141:8200/persagy_ui_kit/images/defaultImage.png';
export default {
    name: 'SelectView',
    data() {
        return {
            // model: 'test2',
            model: null,
            model2: ['test1', 'test4'],
            model4: 'test3',
            model5: ['test1'],
            dataSelect1: [],
            dataSelect2: [
                {
                    id: 'test1',
                    name: '选择项',
                    disabled: true
                },
                {
                    id: 'test2',
                    name: '单平米'
                },
                {
                    id: 'test3',
                    name: '下级分项'
                },
                {
                    id: 'test4',
                    name: '滑动平均滑动平均'
                }
            ],
            dataSelect3: [
                {
                    id: 'test1',
                    name: '选择项',
                    sub: 'hello111',
                    src
                },
                {
                    id: 'test2',
                    name: '单平米',
                    sub: 'hola111',
                    src
                },
                {
                    id: 'test3',
                    name: '下级分项',
                    sub: 'bonjour',
                    src,
                    divider: true
                },
                {
                    id: 'test4',
                    name: '滑动平均滑动平均',
                    sub: 'hi',
                    src
                }
            ],
            dataSelect4: [
                {
                    id: 'test1',
                    name: '选择项',
                    label: '高级'
                },
                {
                    id: 'test2',
                    name: '单平米',
                    label: '中级'
                },
                {
                    id: 'test3',
                    name: '下级分项',
                    label: '初级'
                },
                {
                    id: 'test4',
                    name: '4444444',
                    label: '低级'
                },
                {
                    id: 'test5',
                    name: '555555555',
                    label: '低级'
                },
                {
                    id: 'test6',
                    name: '66666666666',
                    label: '低级'
                },
                {
                    id: 'test7',
                    name: '6666',
                    label: '低级'
                },
                {
                    id: 'test8',
                    name: '6',
                    label: '低级'
                }
            ],
            dataSelect5: [
                {
                    id: 'test1',
                    name: '选择项',
                    label: '高级'
                },
                {
                    id: 'test2',
                    name: '单平米',
                    label: '中级'
                },
                {
                    id: 'test3',
                    name: '下级分项',
                    label: '初级',
                    divider: true
                },
                {
                    id: 'test4',
                    name: '滑动平均滑动平均',
                    label: '低级'
                },
                {
                    id: 'test5',
                    name: '滑动平均滑动平均',
                    label: '低级'
                }
            ],
            dataSelect6: [
                {
                    id: 'test1',
                    name: '选择项',
                    label: '高级'
                },
                {
                    id: 'test2',
                    name: '单平米',
                    label: '中级'
                },
                {
                    id: 'test3',
                    classify: '分类一'
                },
                {
                    id: 'test4',
                    name: '下级分项',
                    label: '初级'
                },
                {
                    id: 'test5',
                    classify: '分类二'
                },
                {
                    id: 'test6',
                    name: '滑动平均滑动平均',
                    label: '低级'
                },
                {
                    id: 'test7',
                    name: '滑动平均滑动平均',
                    label: '低级'
                }
            ],
            dataSelect7: [
                {
                    id: 'test1',
                    name: '总量1111',
                    src,
                    sub: '测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出'
                },
                {
                    id: 'test2',
                    name: '总量2222',
                    src,
                    sub: '测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出'
                },
                {
                    id: 'test3',
                    name: '总量3333',
                    src,
                    sub: '测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出'
                },
                {
                    id: 'test4',
                    name: '总量4444',
                    src,
                    sub: '测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出'
                }
            ],
            dataSelect8: [
                {
                    id: 'test1',
                    name: '选择项',
                    src
                },
                {
                    id: 'test2',
                    name: '总量2222',
                    src
                },
                {
                    id: 'test3',
                    name: '总量3333',
                    src
                },
                {
                    id: 'test4',
                    name: '总量3333',
                    src
                },
                {
                    id: 'test5',
                    name: '总量3333',
                    src
                },
                {
                    id: 'test6',
                    name: '总量3333',
                    src
                },
                {
                    id: 'test7',
                    name: '总量3333',
                    src
                },
                {
                    id: 'test8',
                    name: '总量3333',
                    src
                },
                {
                    id: 'test9',
                    name: '总量3333',
                    src
                }
            ],
            errorText: '错误提示',
            errorShow: true
        };
    },
    mounted() {
        setTimeout(() => {
            this.model = 'test2';
        }, 3000);
    },
    watch: {},
    methods: {
        testClick(data) {
            console.log('testConfirm:::', data);
        },
        testConfirm(data) {
        },
        testCancel() {
        },
        deleteModel() {
            this.model4 = '';
            this.model2 = [];
            this.model5 = [];
        }
    }
};
</script>

<style lang="stylus" scoped>
.select-display-panel
    padding 60px
    width 800px

    h1
        margin-bottom 40px

    .row
        display flex
        justify-content space-between
        align-items center
        margin-bottom 40px

        section
            h5
                margin-bottom 20px

</style>
