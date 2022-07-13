<template>
    <div class="sidebarCustom">
<!--        <div style="width: 200px;height: 100%;background-color: #1d3144"></div>-->
<!--        <div style="width: calc(100% - 200px)">-->
        <!--
        <div style="width: 100%;">
            <SidebarCustom @change="sidebarChange">
                <template #left>
                    <div style="font-size: 14px;width: 500px;">123</div>
                </template>
                <template #right>
                    <div style="font-size: 14px;width: 2000px;">456</div>
                </template>
            </SidebarCustom>
        </div>
        -->
        <div class="sidebarCustom" style="width: 100%; height: 800px;">
            <SidebarCustom @change="sidebarChange" width="250">
                <template #left>
                    <div style="font-size: 14px;">123</div>
                </template>
                <template #right>
                    <div style="font-size: 14px;">456</div>
                </template>
            </SidebarCustom>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SidebarCustomView',
    methods: {
        sidebarChange(leftWidth, leftShow) {
            console.log('leftWidth::', leftWidth);
            console.log('leftShow::', leftShow);
        }
    }
};
</script>

<style lang="stylus">
.sidebarCustom
    display flex
    height calc(100vh - 48px)
</style>
