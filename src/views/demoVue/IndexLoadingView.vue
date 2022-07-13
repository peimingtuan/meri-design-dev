<template>
    <div>
        <Button type="default" @click="openLoading">首屏加载</Button>
    </div>
</template>

<script>
    export default {
        name: "IndexLoadingView",
        mounted() {
            const loading=this.$indexLoading();

            setTimeout(() => this.$indexLoading.remove(loading), 3000)
        },
        methods: {
            openLoading() {
                this.loading=this.$indexLoading();
                setTimeout(() => this.$indexLoading.remove(this.loading), 3000)
            }
        }
    }
</script>