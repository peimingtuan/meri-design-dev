### IndexLoading 首屏加载

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


### 代码演示

```vue
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


```

::: tip
局部加载请使用
import {IndexLoading} from 'meri-design-dev';<br/>
this.indexLoading=IndexLoading();
:::

