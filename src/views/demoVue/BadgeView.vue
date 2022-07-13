<template>
    <div class="toggleView">
        <div class="component component-padding">
             <h1 class="components-title">Badge组件</h1>
            <Badge>
                <span class="avatar">
                    <img src="http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png" alt="">
                </span>
            </Badge>
            <Badge :content="countNum">
                <span class="avatar">
                    <img src="http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png" alt="">
                </span>
            </Badge>
            <Badge :content="20" bgColor="#0091ff">
                <span class="avatar">
                    <img src="http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png" alt="">
                </span>
            </Badge>
            <Badge :content="100">
                <span class="avatar">
                    <img src="http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png" alt="">
                </span>
            </Badge>
            <Badge :content="'New'">
                <span class="avatar">
                    <img src="http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png" alt="">
                </span>
            </Badge>
            <Badge :content="'Hot'">
                <span class="avatar">
                    <img src="http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png" alt="">
                </span>
            </Badge>
            <Badge dot>
                <span class="avatar">
                    <img src="http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png" alt="">
                </span>
            </Badge>
            <Badge dot>
                <Button type="primary">按钮</Button>
            </Badge>
            <Badge :content="25">
                <Button type="default">按钮1</Button>
            </Badge>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BadgeView",
        data() {
            return {
                countNum: 9
            }
        },
        mounted() {
            this.setCountNum();
        },
        methods: {
            setCountNum() {
                clearInterval(this.timer);
                this.countNum=0;
                this.timer=setInterval(() => {
                    if (this.countNum<111) this.countNum+=parseInt(10*Math.random());
                    else this.setCountNum();
                }, 3000)
            }
        }
    }
</script>

<style lang="stylus" scoped>

    .avatar
        display inline-block
        vertical-align middle
        img
            border-radius 14px
            width 28px
            height @width

</style>
