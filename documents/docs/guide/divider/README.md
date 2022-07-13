### Divider 分割线

<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1>Divider组件</h1>
            <Divider />
            <br><br>
            <Divider type="v" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "BadgeView"
    }
</script>

```vue
<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1>Divider组件</h1>
            <Divider />
            <br><br>
            <Divider type="v" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "BadgeView"
    }
</script>

```


### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| type    | 类型（可选值：v/h） | String | h | no     |