<template>
    <div class="toggleView">
        <div class="component component-padding">
             <h1 class="components-title">Tabs组件</h1>
            <!--
             data:数据
             v-model绑定的id
             change：点击事件
             -->
            <Shake :activate="activate">
                <span style="font-size: 20px;color: red;">抖动</span>
            </Shake>
            <br><br>
            <Shake activate="New">
                <span style="font-size: 20px;color: red;">抖动</span>
            </Shake>
            <br><br>
            <Shake :activate="activateNum">
                <span style="font-size: 20px;color: red;">抖动</span>
            </Shake>
            <br><br>
            <Button type="primary" @click="handleClick">按钮</Button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TabsView",
        data() {
            return {
                activate: true,
                activateNum: 0
            }
        },
        mounted() {
            this.setCountNum();
        },
        methods: {
            handleClick() {
                this.activate=!this.activate;
            },
            setCountNum() {
                window.clearInterval(this.timer);
                this.activateNum=0;
                this.timer=window.setInterval(() => {
                    const num=parseInt(10*window.Math.random());
                    console.log(num);
                    if (this.activateNum<111) this.activateNum+=num;
                    else this.setCountNum();
                }, 5000)
            }
        },
        beforeDestroy() {
            clearInterval(this.timer);
        }
    }
</script>

<style lang="stylus" scoped>


</style>
