### Message 全局提示

<template>
    <div class="Button">
        <div class="component component-padding">
            <h1>Message组件</h1>
            <Button type="default" @click="messageInfo">info</Button>
            <Button type="primary" @click="messageSuccess">success</Button>
            <Button type="default" @click="messageWarning">warning</Button>
            <Button type="error" @click="messageError">error</Button>
            <Button type="default" @click="removeInfo">移除info</Button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MessageView",
        methods: {
            messageInfo() {
                this.info=this.$message.info('这是一条消息这是');
            },
            messageSuccess() {
                this.$message.success('Oh,yes');
            },
            messageWarning() {
                this.$message.warning('Oh,no');
            },
            messageError() {
                if (this.msgErr && !this.msgErr._isDestroyed) {
                    this.$message.changeMessage(this.msgErr, '错了哦，这是一条错误消息');
                } else {
                    this.msgErr=this.$message({
                        type: 'error',
                        message: `
                            错了哦，这是一条错误消息
                            错了哦，这是一条错误消息
                            错了哦，这是一条错误消息
                            错了哦，这是一条错误消息
                            错了哦，这是一条错误消息
                            错了哦，这是一条错误消息
                            错了哦，这是一条错误消息
                            错了哦，这是一条错误消息
                        `
                    });
                }
            },
            removeInfo() {
                if (this.info) this.$message.remove(this.info);
            }
        }
    }
</script>


::: tip
当全局引入时，请使用 `this.$message.xxx('msg')`<br>
或者：<br>
this.$message({
    type: 'error',
    message: '提示内容'
});
:::

::: tip
import { Message } from 'meri-design-dev';<br>
Message.xxx('string');<br>
或者：<br>
Message({
    type: 'error',
    message: '提示内容'
});
:::

```vue
<template>
    <div class="Button">
        <div class="component component-padding">
            <h1>Message组件</h1>
            <Button type="default" @click="messageInfo">info</Button>
            <Button type="primary" @click="messageSuccess">success</Button>
            <Button type="default" @click="messageWarning">warning</Button>
            <Button type="error" @click="messageError">error</Button>
            <Button type="default" @click="removeInfo">移除info</Button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MessageView",
        methods: {
            messageInfo() {
                this.info=this.$message.info('这是一条消息这是');
            },
            messageSuccess() {
                this.$message.success('Oh,yes');
            },
            messageWarning() {
                this.$message.warning('Oh,no');
            },
            messageError() {
                if (this.msgErr && !this.msgErr._isDestroyed) {
                    this.$message.changeMessage(this.msgErr, '错了哦，这是一条错误消息');
                } else {
                    this.msgErr=this.$message({
                        type: 'error',
                        message: `
                            错了哦，这是一条错误消息
                            错了哦，这是一条错误消息
                            错了哦，这是一条错误消息
                            错了哦，这是一条错误消息
                            错了哦，这是一条错误消息
                            错了哦，这是一条错误消息
                            错了哦，这是一条错误消息
                            错了哦，这是一条错误消息
                        `
                    });
                }
            },
            // 移除当前实例
            removeInfo() {
                if (this.info) this.$message.remove(this.info);
            }
        }
    }
</script>


```

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| type    | 类型(可选 info/success/warning/error) | String | -- | Yes     |
| message    | 提示内容 | String | ‘’  | no     |
| remove    | 移除当前实例 | Function | --  | no     |
