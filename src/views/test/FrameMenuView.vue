<template>
    <div>
        <Button @click="openMenu">打开菜单</Button>
        <FrameMenu
                :show="show"
                :data="menuData"
                @changeShow="changeShow"
                @change="change"
        />
    </div>
</template>

<script>
import MenuData from 'menuData';

export default {
    name: 'FrameMenuView',
    data() {
        return {
            // 显示状态
            show: true,
            // 菜单数据
            menuData: []
            // menuData: MenuData
        };
    },
    mounted() {
        setTimeout(() => {
            this.menuData = MenuData;
        }, 30);
    },
    methods: {
        // 打开菜单
        openMenu() {
            this.changeShow(true);
        },
        // 改变现实状态
        changeShow(status) {
            this.show = status;
        },
        // 点击菜单返回数据
        change(obj) {
            console.log('点击菜单返回数据::', obj);
        }
    }
};
</script>

<style lang="stylus" scoped>

</style>
