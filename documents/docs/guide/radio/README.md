### Radio 单选框

<template>
    <div class="checkbox">
        <Radio :checked="checked1" @change="handleChange" />
        <Radio :checked="checked1" :disabled="true" />
        <Radio :checked="checked2" />
        <Radio :checked="checked2" :disabled="true" />
        <div style="margin: 12px"></div>
        <Radio :checked="checked1" @change="handleChange">战三</Radio>
        <Radio :checked="checked1" :disabled="true">战三</Radio>
        <Radio :checked="checked2">卢俊义</Radio>
        <Radio :checked="checked2" :disabled="true">卢俊义</Radio>
    </div>
</template>

<script>
    export default {
        name: "RadioView",
        data() {
            return {
                checked1: 'checked', // checked-选中 uncheck-未选中
                checked2: 'uncheck'
            }
        },
        methods: {
            handleChange(v) {
                this.checked1=v;
            }
        }
    }
</script>

<style lang="stylus" scoped>
.checkbox
    padding 16px
    font-size 0

</style>
 

```vue

<template>
    <div class="checkbox">
        <Radio :checked="checked1" @change="handleChange" />
        <Radio :checked="checked1" :disabled="true" />
        <Radio :checked="checked2" />
        <Radio :checked="checked2" :disabled="true" />
        <div style="margin: 12px"></div>
        <Radio :checked="checked1" @change="handleChange">战三</Radio>
        <Radio :checked="checked1" :disabled="true">战三</Radio>
        <Radio :checked="checked2">卢俊义</Radio>
        <Radio :checked="checked2" :disabled="true">卢俊义</Radio>
    </div>
</template>

<script>
    export default {
        name: "RadioView",
        data() {
            return {
                checked1: 'checked', // checked-选中 uncheck-未选中
                checked2: 'uncheck'
            }
        },
        methods: {
            handleChange(v) {
                this.checked1=v;
            }
        }
    }
</script>

```


### Attributes

| 参数     | 说明    | 类型    | 默认值   | 必须  |
| ------- | ----    | ------  | ------- | ------|
| checked    | 选中状态，可选值[checked/uncheck'] | String | ''     | no     |
| disabled    | 是否禁用 | Boolean | false    | no     |
| slot    | 插槽值 | String | ''    | no     |
| change   | 改变状态触发事件 | Function | ''| no     |
