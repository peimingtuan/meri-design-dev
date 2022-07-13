### Modal 对话框

#### 提示模态框
<template>
    <div>
        <Button type="primary" @click="modalShowTip">Tip</Button>
        <Modal
                :show="modalStatusTip"
                title="弹窗提示"
                mode="tip"
                type="error"
                @close="modalClose">
            <template #content>
                This is a message. 弹窗最小高度144px，最大高度166px (该对话框仅用于删除)
            </template>
            <template #handle>
                <Button @click="modalClose" type="default">close</Button>
                <Button @click="modalConfirm" type="error">primary</Button>
            </template>
        </Modal>
    </div>
</template>

```vue
<Button type="primary" @click="modalShowTip">Tip</Button>
<Modal
        :show="modalStatusTip"
        title="弹窗提示"
        mode="tip"
        type="error"
        @close="modalClose"
>
    <template #content>
        This is a message. 弹窗最小高度144px，最大高度166px (该对话框仅用于删除)
    </template>
    <template #handle>
        <Button @click="modalClose" type="default">close</Button>
        <Button @click="modalConfirm" type="error">primary</Button>
    </template>
</Modal>

modalStatusTip: false
modalShowTip() {
    this.modalStatusTip = true;
}
modalClose() {
    this.modalStatusTip = false;
}
modalConfirm() {
    console.log('alertConfirm');
}
```

#### 默认模态框
<template>
    <div>
        <Button type="default" @click="modalShowDefault">Default</Button>
        <Modal
                :show="modalStatusDefault"
                title="弹窗提示"
                mode="default"
                @close="modalClose"
        >
            <template #content>
                <div style="font-size: 20px; padding-left: 16px;padding-top: 16px;">
                    123
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    456
                </div>
            </template>
            <template #handle>
                <Button @click="modalClose" type="default">close</Button>
                <Button @click="modalConfirm" type="primary">primary</Button>
            </template>
        </Modal>
    </div>
</template>


```vue
<Button type="default" @click="modalShowDefault">Default</Button>
<Modal
        :show="modalStatusDefault"
        title="弹窗提示"
        mode="default"
        @close="modalClose"
>
    <template #content>
        <div style="font-size: 20px; padding-left: 16px;padding-top: 16px;">
            123
            <br><br><br><br><br><br><br><br>
            456
        </div>
    </template>
    <template #handle>
        <Button @click="modalClose" type="default">close</Button>
        <Button @click="modalConfirm" type="primary">primary</Button>
    </template>
</Modal>

modalStatusDefault: false
modalShowDefault() {
    this.modalStatusDefault = true;
}
modalClose() {
    this.modalStatusDefault = false;
}
modalConfirm() {
    console.log('alertConfirm');
}
```

#### 最小模态框
<template>
    <div>
        <Button type="primary" @click="modalShowSmall">Small</Button>
        <Modal
                :show="modalStatusSmall"
                title="弹窗提示"
                mode="small"
                @close="modalClose"
        >
            <template #content>
                <div style="font-size: 20px; padding-left: 16px;padding-top: 16px;">
                    123456
                </div>
            </template>
            <template #handle>
                <Button @click="modalClose" type="default">close</Button>
                <Button @click="modalConfirm" type="primary">primary</Button>
            </template>
        </Modal>
    </div>
</template>

```vue
<Button type="primary" @click="modalShowSmall">Small</Button>
<Modal
        :show="modalStatusSmall"
        title="弹窗提示"
        mode="small"
        @close="modalClose"
>
    <template #content>
        <div style="font-size: 20px; padding-left: 16px;padding-top: 16px;">
            123456
        </div>
    </template>
    <template #handle>
        <Button @click="modalClose" type="default">close</Button>
        <Button @click="modalConfirm" type="primary">primary</Button>
    </template>
</Modal>

modalStatusSmall: false
modalShowSmall() {
    this.modalStatusSmall = true;
}
modalClose() {
    this.modalStatusSmall = false;
}
modalConfirm() {
    console.log('alertConfirm');
}
```

#### 中模态框
<template>
    <div>
        <Button type="default" @click="modalShowMiddle">Middle</Button>
        <Modal
                :show="modalStatusMiddle"
                title="弹窗提示"
                mode="middle"
                componentId="middle1111"
                @close="modalClose"
        >
            <template #content>
                <div style="font-size: 20px;  padding-left: 16px;padding-top: 16px;">
                    123
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    456
                </div>
            </template>
            <template #handle>
                <Button @click="modalClose" type="default">close</Button>
                <Button @click="modalConfirm" type="primary">primary</Button>
            </template>
        </Modal>
    </div>
</template>

```vue
<Button type="default" @click="modalShowMiddle">Middle</Button>
<Modal
        :show="modalStatusMiddle"
        title="弹窗提示"
        mode="middle"
        componentId="middle1111"
        @close="modalClose"
>
    <template #content>
        <div style="font-size: 20px;  padding-left: 16px;padding-top: 16px;">
            123
            <br><br><br><br><br><br><br><br>
            456
        </div>
    </template>
    <template #handle>
        <Button @click="modalClose" type="default">close</Button>
        <Button @click="modalConfirm" type="primary">primary</Button>
    </template>
</Modal>

modalStatusMiddle: false
modalShowMiddle() {
    this.modalStatusMiddle = true;
}
modalClose() {
    this.modalStatusMiddle = false;
}
modalConfirm() {
    console.log('alertConfirm');
}
```

#### 大模态框
<template>
    <div>
        <Button type="primary" @click="modalShowLarge">Large</Button>
        <Modal
                :show="modalStatusLarge"
                title="弹窗提示"
                mode="large"
                @close="modalClose"
        >
            <template #content>
                <div style="font-size: 20px;  padding-left: 16px;padding-top: 16px;">
                    123
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    456
                </div>
            </template>
            <template #handle>
                <Button @click="modalClose" type="default">close</Button>
                <Button @click="modalConfirm" type="primary">primary</Button>
            </template>
        </Modal>
    </div>
</template>

```vue
<Button type="primary" @click="modalShowLarge">Large</Button>
<Modal
        :show="modalStatusLarge"
        title="弹窗提示"
        mode="large"
        @close="modalClose"
>
    <template #content>
        <div style="font-size: 20px;  padding-left: 16px;padding-top: 16px;">
            123
            <br><br><br><br><br><br><br><br>
            456
        </div>
    </template>
    <template #handle>
        <Button @click="modalClose" type="default">close</Button>
        <Button @click="modalConfirm" type="primary">primary</Button>
    </template>
</Modal>

modalStatusLarge: false
modalShowLarge() {
    this.modalStatusLarge = true;
}
modalClose() {
    this.modalStatusLarge = false;
}
modalConfirm() {
    console.log('alertConfirm');
}
```

#### 全屏模态框
<template>
    <div>
        <Button type="default" @click="modalShowFull">Full</Button>
        <Modal
                :show="modalStatusFull"
                title="弹窗提示Full"
                mode="full"
                @close="modalClose"
                @confirm="modalConfirm"
        >
            <template #content>
                <div style="font-size: 20px;  padding-left: 16px;padding-top: 16px;">
                    123
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
                    <br><br><br><br><br><br><br><br>
                    <br><br><br><br><br><br><br><br>
                    456
                </div>
            </template>
            <template #handle>
                <Button @click="modalClose" type="default">close</Button>
                <Button @click="modalConfirm" type="primary">primary</Button>
            </template>
        </Modal>
    </div>
</template>

```vue
<Button type="default" @click="modalShowFull">Full</Button>
<Modal
        :show="modalStatusFull"
        title="弹窗提示Full"
        mode="full"
        @close="modalClose"
        @confirm="modalConfirm"
>
    <template #content>
        <div style="font-size: 20px;  padding-left: 16px;padding-top: 16px;">
            123
            <br><br><br><br><br><br><br><br>
            456
        </div>
    </template>
    <template #handle>
        <Button @click="modalClose" type="default">close</Button>
        <Button @click="modalConfirm" type="primary">primary</Button>
    </template>
</Modal>

modalStatusFull: false
modalShowFull() {
    this.modalStatusFull = true;
}
modalClose() {
    this.modalStatusFull = false;
}
modalConfirm() {
    console.log('alertConfirm');
}
```

<script>
    export default {
        name: 'ModalView',
        data() {
            return {
                modalStatusTip: false,
                modalStatusDefault: false,
                modalStatusSmall: false,
                modalStatusMiddle: false,
                modalStatusLarge: false,
                modalStatusFull: false
            }
        },
        methods: {
            modalShowTip() {
                this.modalStatusTip=true
            },
            modalShowDefault() {
                this.modalStatusDefault=true
            },
            modalShowSmall() {
                this.modalStatusSmall=true
            },
            modalShowMiddle() {
                this.modalStatusMiddle=true
            },
            modalShowLarge() {
                this.modalStatusLarge=true
            },
            modalShowFull() {
                this.modalStatusFull=true
            },
            modalClose() {
                this.modalStatusTip=false;
                this.modalStatusDefault=false;
                this.modalStatusSmall=false;
                this.modalStatusMiddle=false;
                this.modalStatusLarge=false;
                this.modalStatusFull=false;
            },
            modalConfirm() {
                console.log('alertConfirm')
            }
        }
    }
</script>


### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| show    | 弹窗显示状态 | Boolean | false | Yes     |
| title    | 弹窗标题 | String | '' | no     |
| mode    | 弹窗类型（可选值：tip/default/small/middle/large/full） | String | '' | Yes     |
| esc    | 点击esc键关闭弹窗 | Boolean | false | No     |
| shade    | 点击遮罩层键关闭弹窗 | Boolean | false | No     |
| componentId    | 组件content区的唯一id，类似html标签的id | String | '' | no     |
| secondary    | 点击关闭、取消按钮在close回调返回此参数 | Boolean | false | no     |
| zIndex    | 自定义弹窗层级（开启secondary生效） | String/Number | 4999 | no     |
| @close    | 弹窗关闭回调 | Function | -- | Yes     |
| @confirm    | 弹窗确定回调 | Function | -- | Yes     |


### mode='small'

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| type    | 提示图标类型（info/error） | String | '' | no     |


### mode=default | middle | large时需要重计算Modal位置需调用`this.$refs.xxx.countPos()`
