<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1 class="main-title">Tabs组件</h1>
            <div class="display-box">
                <div class="display-panel">
                     <h2 class="components-title-h2">一级页签 </h2>
                    <Tabs type="first-nav" :data="tabData" v-model="model1" />
                </div>

<!--                <div class="display-panel">-->
<!--                     <h2 class="components-title-h2">二级页签 </h2>-->
<!--                    <Tabs type="second-nav" :data="tabData" v-model="model2"/>-->
<!--                </div>-->

<!--                <div class="display-panel">-->
<!--                     <h2 class="components-title-h2">卡片页签 </h2>-->
<!--                    <Tabs type="card" :data="tabData" v-model="model3"/>-->
<!--                </div>-->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TabsView',
    data() {
        return {
            model1: '0',
            model2: 'id1',
            model3: 'id5',
            model4: 'id4',
            tabData: [
                { name: '一', id: 'id1' },
                { name: '弟二', id: 'id2' },
                { name: '第三个', id: 'id3', disabled: true },
                { name: '第四个字', id: 'id4' },
                { name: '五个字字字', id: 'id5' },
                { name: '六个字的情况', id: 'id6' }
            ]
        };
    }
};
</script>

<style lang="stylus" scoped>
.component
    .main-title
        margin-bottom 30px
        border-bottom 1px solid $grey-800
        padding-bottom 12px
    .display-box
        padding 20px
        .display-panel
            margin-bottom 60px
            h5
                margin-bottom 10px

</style>
