<template>
    <div class="Button">
        <div class="component component-padding">
             <h1 class="components-title">Message组件</h1>
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
    name: 'MessageView',
    methods: {
        messageInfo() {
            this.info = this.$message.info('这是一条消息这是');
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
                this.msgErr = this.$message({
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
};

</script>

<style lang="stylus" scoped>
.s-btn
  margin-bottom 16px

</style>
