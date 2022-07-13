 <template>
    <div class="app">
        <div class="backBox">
            <section class="title">{{routeName}}</section>
        </div>
        <div class="app-main">
            <div class="app-hidden"></div>
            <div class="app-content" id="appContent">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            backShow: false, // 当前路由
            routeName: '' // 当前路由名字
        };
    },
    created() {
        const { path, name } = this.$route;
        this.routeName = name;
        this.backShow = path !== '/componentLists';
    },
    mounted() {
        console.log('%capp mounted', 'color:#0091ff;font-size:16px;');
    },
    watch: {
        $route(to) {
            // （监听路由变化）控制tab显示
            this.routeName = to.name;
            this.backShow = to.path !== '/componentLists';
        }
    },
    methods: {
        backFn() {
            // 返回上一页
            this.$router.back();
        }
    }
};
</script>

<style lang="stylus">
    .app
        width 100%
        .backBox
            box-shadow $box-shadow-bottom
            width 100%
            height 48px
            line-height 48px
            .title
                text-align center
                color $grey-900
                font-size 18px
                font-weight 600
        .component-padding
            padding 16px
        .component
            h1
                margin-bottom 8px
                font-size 20px
        .titleLine
            padding-left 12px
            border-left 4px solid $grey-400

    .app-main
        width 100%
    .components-title,
    .components-title-h2,
    .components-title-h3
        color $grey-900

</style>
