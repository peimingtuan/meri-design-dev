<template>
    <div class="sidebarCustom">
<!--        <div style="width: 200px;height: 100%;background-color: #1d3144"></div>-->
<!--        <div style="width: calc(100% - 200px)">-->
        <div style="width: 100%;">
            <SidebarCustom @change="sidebarChange" width="250">
                <template #icon><IconMenu /></template>
<!--                <template #icon><Icon name="edit" /></template>-->
                <template #left>
                    <div style="font-size: 14px;width: 500px;">123</div>
                </template>
                <template #right>
                    <div style="font-size: 14px;width: 2000px;">456</div>
                </template>
            </SidebarCustom>
        </div>
    </div>
</template>

<script>
import IconMenu from '../../components/static/iconSvg/menu.svg';

export default {
    name: 'SidebarCustomView',
    components: { IconMenu },
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
.icon
    display inline-block
    width 16px
    height 16px
</style>
