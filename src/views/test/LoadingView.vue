<template>
    <div class="loadingDom">
        <Button type="primary" @click="globalLoading">全局加载</Button>
        <Button type="primary" @click="globalLoading2">全局加载2</Button>
        <Button type="primary" @click="localLoading">局部加载</Button>
        <Button type="primary" @click="localLoading2">局部加载2</Button>
        <Button type="primary" @click="closeLoading">关闭loading</Button>
        <br><br><br>

        <div class="localDom" ref="localDom">局部加载的DOM</div>
    </div>
</template>

<script>
export default {
    name: 'LoadingView',
    methods: {
        globalLoading() {
            this.global = this.$loading({ type: 'global' });

            setTimeout(() => this.$loading.close(this.global), 5000);
        },
        globalLoading2() {
            this.global = this.$loading.global();

            setTimeout(() => this.$loading.close(this.global), 5000);
        },
        localLoading() {
            this.local = this.$loading({
                el: this.$refs.localDom,
                type: 'local'
            });
        },
        localLoading2() {
            this.local = this.$loading.local({
                el: this.$refs.localDom
            });
        },
        closeLoading() {
            this.$loading.close(this.local);
        }
    }
};
</script>

<style lang="stylus">
.loadingDom
    padding 100px

.localDom
    display flex
    align-items center
    justify-content center
    background-color $turquoise-600
    width 500px
    height 500px
    font-size 14px

</style>
