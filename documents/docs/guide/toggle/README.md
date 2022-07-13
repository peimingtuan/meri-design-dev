### Toggle 开关

<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1 style="margin-bottom: 20px">Toggle组件</h1>
            <Toggle v-model="toggleVal" />
            <Toggle v-model="toggleVal" :disable="true" />
            <Toggle v-model="toggleVal2" />
            <Toggle v-model="toggleVal2" :disable="true" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "ToggleView",
        data() {
            return {
                toggleVal: true,
                toggleVal2: false
            }
        },
        watch: {
            toggleVal(n, o) {
                if (n !== o) console.log('toggleVal::', n);
            },
            toggleVal2(n, o) {
                if (n !== o) console.log('toggleVal2::', n);
            }
        }
    }
</script>

```vue
<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1 style="margin-bottom: 20px">Toggle组件</h1>
            <Toggle v-model="toggleVal" />
            <Toggle v-model="toggleVal" :disable="true" />
            <Toggle v-model="toggleVal2" />
            <Toggle v-model="toggleVal2" :disable="true" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "ToggleView",
        data() {
            return {
                toggleVal: true,
                toggleVal2: false
            }
        },
        watch: {
            toggleVal(n, o) {
                if (n !== o) console.log('toggleVal::', n);
            },
            toggleVal2(n, o) {
                if (n !== o) console.log('toggleVal2::', n);
            }
        }
    }
</script>

```

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| v-model    | 绑定的值 | Boolean | false | Yes     |
| disable   | 是否禁用 | Boolean | false | no     |