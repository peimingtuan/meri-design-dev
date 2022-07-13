<template>
    <div id="baseexample">
         <h2 class="components-title-h2">鼠标移入后显示省略类容或提示信息</h2>
        <div class="display-panel">
             <h2 class="components-title-h2">显示省略类容 无需传值 </h2>
            <div class="tool-tip" v-ptitle>我是天空里</div>
        </div>
        <div class="display-panel">
             <h2 class="components-title-h2">显示提示信息 需要传值 </h2>
            <div class="tool-tip-info" v-ptitle:width:400="testText">你我相逢在黑夜的海上，你有你的，我有我的，方向；你记得也好，最好你忘掉，在这交会时互放的光亮！</div>
            <br><br><br><br><br>
            <div class="tool-tip-info" v-ptitle:width:400="testText"><router-link to="/selectView">123</router-link></div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // eslint-disable-next-line max-len
            testText: '计划开启时段：00:00-00:15,00:30-00:45,01:00-01:15,01:30-01:45,02:00-02:15,02:30-02:45,03:00-03:15,03:30-03:45,04:00-04:15,04:30-04:45,05:00-05:15,05:30-05:45,06:00-06:15,06:30-06:45,07:00-07:15,07:30-07:45,08:00-08:15,08:30-08:45,09:00-09:15,09:30-09:45,10:00-10:15,10:30-10:45,11:00-11:15,11:30-11:45,12:00-12:15,12:30-12:45,13:00-13:15,13:30-13:45,14:00-14:15,14:30-14:45,15:00-15:15,15:30-15:45,16:00-16:15,16:30-16:45,17:00-17:15,17:30-17:45,18:00-18:15,18:45-19:00,19:15-19:30,19:45-20:00,20:15-20:30,20:45-21:00,21:15-21:30,21:45-22:00,22:15-22:30,22:45-23:00,23:15-23:30,23:45-24:00;实际开启时段：05:15-16:00;'
        };
    },
    methods: {
        mouseleave() {
            console.log(1123456);
        }
    }
};
</script>
<style lang="stylus">
#baseexample
    height 5000px
.display-panel
    padding 50px
    h5
        margin 20px
    .tool-tip
        display inline-block
        text-overflow ellipsis
        white-space nowrap
        overflow hidden
        color #666
    .tool-tip-info
        display inline-block
        color #666

</style>
