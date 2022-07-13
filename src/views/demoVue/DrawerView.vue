<template>
    <div class="Button">
        <div class="component component-padding">
             <h1 class="components-title">Drawer组件</h1>
            <Button type="primary" @click="drawerShow">drawerShow</Button>
            <Button type="default" @click="closeLoading">打开关闭loading</Button>
            <Drawer
                    :show="drawerStatus"
                    :bottom="true"
                    :shadow="true"
                    :penetrate="false"
                    :focus="true"
                    @close="changeStatus"
                    :loadingMore="loadingMore"
                    @getMore="getMore"
                    :loading="loading"
                    componentId="drawerCom"
            >
                <template #title>
                    <div class="titleContent">
                        <span class="title">标题</span>
                        <Icon name='edit' hoverColor="#f01d94" />
                    </div>
                </template>
                <template #content>
                    <div style="font-size: 20px;width: 500px; padding: 16px">
                        123
                        456
                        789
                        <PickerDate caption="标题：" @focusChange="focusChange"/>
                        <br>
                        <Select width="300"
                                 v-model="model"
                                 :isReadOnly="false"
                                 :hideClear="true"
                                 :selectdata="selectdata"
                                 placeholder="请选择"
                        />
                        <br>
                        <textarea name="" id="" cols="30" rows="10" style="font-size: 14px"></textarea>
                        <div style="font-size: 16px;" :style="{height: height+'px'}">
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                        </div>
                    </div>
                </template>
                <template #handle>
                    <div>
                        <Button type="primary" @click="drawerConfirm">确定</Button>
                        <Button type="default" @click="drawerCancel">取消</Button>
                    </div>
                </template>
            </Drawer>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DrawerView',
    data() {
        return {
            drawerStatus: false,
            loadingMore: false,
            loading: false,
            activeClose: true, // 是否可关闭弹窗
            height: 1000,
            model2: ['test1', 'test4'],
            // model: 'test2',
            model: '', // v-model绑定的id
            selectdata: [] // Select数据
        };
    },
    mounted() {
        setTimeout(() => {
            this.model = 45;
            this.selectdata = [{
                id: '44',
                paramType: 6,
                code: '1',
                name: '广场原因'
            }, {
                id: 45,
                paramType: 6,
                code: '2',
                name: '策略原因'
            }, {
                id: '46',
                paramType: 6,
                code: '3',
                name: '其他'
            }];
        }, 3000);
    },
    methods: {
        // 改变抽屉显示状态
        changeStatus(v) {
            this.drawerStatus = v;
        },
        drawerShow() {
            if (this.drawerStatus) return;
            this.drawerStatus = true;
            console.log(this.drawerStatus);
        },
        drawerConfirm() {
            console.log('alertConfirm');
        },
        drawerCancel() {
            console.log('drawerCancel');
            this.drawerStatus = false;
        },
        getMore() {
            console.log('1::', this.loadingMore);
            this.loadingMore = true;
            console.log('2::', this.loadingMore);
            setTimeout(() => {
                this.loadingMore = false;
                this.height = this.height + 100;
            }, 3000);
            console.log('3::', this.loadingMore);
        },
        closeLoading() {
            this.loading = !this.loading;
        },
        focusChange(focus) {
            console.log('focusChange:::', focus);
            this.activeClose = focus;
        }
    }
};
</script>

<style lang="stylus" scoped>
    .titleContent
        display flex
        align-items center
        .title
            padding-right 8px
            font-size 16px
            font-weight 600

</style>
