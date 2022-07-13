### Drawer 抽屉

<template>
    <div class="Button">
        <div class="component component-padding">
            <h1>Drawer组件</h1>
            <Button type="primary" @click="drawerShow">drawerShow</Button>
            <Button type="default" @click="closeLoading">打开关闭loading</Button>
            <Drawer
                    :show="drawerStatus"
                    :bottom="true"
                    :shadow="true"
                    :penetrate="true"
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
                height: 1000
            }
        },
        methods: {
            // 改变抽屉显示状态
            changeStatus(v) {
                this.drawerStatus=v
            },
            drawerShow() {
                if (this.drawerStatus) return;
                this.drawerStatus=true;
                console.log(this.drawerStatus);
            },
            drawerConfirm() {
                console.log('alertConfirm')
            },
            drawerCancel() {
                console.log('drawerCancel');
                this.drawerStatus=false;
            },
            getMore() {
                console.log('1::', this.loadingMore);
                this.loadingMore=true;
                console.log('2::', this.loadingMore);
                setTimeout(() => {
                    this.loadingMore=false;
                    this.height=this.height+100;
                }, 3000)
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
    }
</script>

```vue
<Button type="primary" @click="drawerShow">drawerShow</Button>
<Button type="default" @click="closeLoading">打开关闭loading</Button>
<Drawer
        :show="drawerStatus"
        :bottom="true"
        @close="changeStatus"
        :loadingMore="loadingMore"
        @getMore="getMore"
        :loading="loading"
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
            <div style="font-size: 16px;" :style="{height: height+'px'}">
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

<script>
    export default {
        name: 'DrawerView',
        data() {
            return {
                drawerStatus: false,
                loadingMore: false,
                loading: false,
                height: 1000
            }
        },
        methods: {
            // 改变抽屉显示状态
            changeStatus(v) {
                this.drawerStatus=v
            },
            drawerShow() {
                if (this.drawerStatus) return;
                this.drawerStatus=true;
                console.log(this.drawerStatus);
            },
            drawerConfirm() {
                console.log('alertConfirm')
            },
            drawerCancel() {
                console.log('drawerCancel');
                this.drawerStatus=false;
            },
            getMore() {
                console.log('1::', this.loadingMore);
                this.loadingMore=true;
                console.log('2::', this.loadingMore);
                setTimeout(() => {
                    this.loadingMore=false;
                    this.height=this.height+100;
                }, 3000);
                console.log('3::', this.loadingMore);
            },
            closeLoading() {
                this.loading = !this.loading;
            }
        }
    }
</script>

```

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| show    | 侧拉窗显示状态 | Boolean | false | yes     |
| focus    | 开启点击抽屉外关闭弹窗 | Boolean | false | no     |
| shadow    | 是否显示遮罩(遮罩是透明的) | Boolean | false | no     |
| bottom    | 是否固定底部操作栏 | Boolean | false | no     |
| penetrate    | 遮罩层的鼠标事件是否穿透 | Boolean | false | no     |
| top    | 侧拉窗距离顶部距离 | String/Number | '' | no     |
| loadingMore    | 底部加载更多 | Boolean | false | no     |
| loading    | 侧拉窗加载中 | Boolean | false | no     |
| componentId    | 组件content区的唯一id，类似html标签的id | String | '' | no     |
| @close    | 关闭回调 | Function | -- | yes     |
| @getMore    | 触底-加载更多数据回调 | Function | -- | no     |
| slot    | title | 头部内容 | -- | no     |
| slot    | content | 主内容 | -- | no     |
| slot    | handle | 底部内容 | -- | no     |
