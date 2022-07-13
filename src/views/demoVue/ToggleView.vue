<template>
    <div class="toggleView">
        <div class="component component-padding">
             <h1 class="components-title">Toggle组件</h1>
            <Toggle v-model="toggleVal" />
            <Toggle v-model="toggleVal" :disable="true" />
            <Toggle v-model="toggleVal2" />
            <Toggle v-model="toggleVal2" :disable="true" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'ToggleView',
    data() {
        return {
            toggleVal: true,
            toggleVal2: false
        };
    },
    watch: {
        toggleVal(n, o) {
            if (n !== o) console.log('toggleVal::', n);
        },
        toggleVal2(n, o) {
            if (n !== o) console.log('toggleVal2::', n);
        }
    }
};
</script>

<style lang="stylus" scoped>

</style>
