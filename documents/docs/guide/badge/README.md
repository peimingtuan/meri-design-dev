### Badge 徽标

#### 默认
<template>
    <Badge>
        <span class="badge-avatar">
            <img src="http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png" alt="">
        </span>
    </Badge>
</template>

```vue
<Badge>
    <span class="badge-avatar">
        <img src="http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png" alt="">
    </span>
</Badge>
```

#### content
<template>
    <Badge :content="countNum">
        <span class="badge-avatar">
            <img src="http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png" alt="">
        </span>
    </Badge>
</template>

```vue
<Badge :content="countNum">
    <span class="badge-avatar">
        <img src="http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png" alt="">
    </span>
</Badge>

countNum: 9
setCountNum() {
    clearInterval(this.timer);
    this.countNum=0;
    this.timer=setInterval(() => {
        if (this.countNum<111) this.countNum+=parseInt(10*Math.random());
        else this.setCountNum();
    }, 3000)
}
```

#### content + bgColor
<template>
    <Badge content="10" bgColor="#4eb1fd">
        <span class="badge-avatar">
            <img src="http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png" alt="">
        </span>
    </Badge>
</template>

```vue
<Badge :content="10" bgColor="#4eb1fd">
    <span class="badge-avatar">
        <img src="http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png" alt="">
    </span>
</Badge>
```

#### content > 99
<template>
    <Badge content="100">
        <span class="badge-avatar">
            <img src="http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png" alt="">
        </span>
    </Badge>
</template>

```vue
<Badge content="100">
    <span class="badge-avatar">
        <img src="http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png" alt="">
    </span>
</Badge>
```

#### content = New
<template>
    <Badge content="New">
        <span class="badge-avatar">
            <img src="http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png" alt="">
        </span>
    </Badge>
</template>

```vue
<Badge content="New">
    <span class="badge-avatar">
        <img src="http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png" alt="">
    </span>
</Badge>
```

#### content = Hot
<template>
    <Badge content="Hot">
        <span class="badge-avatar">
            <img src="http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png" alt="">
        </span>
    </Badge>
</template>

```vue
<Badge content="Hot">
    <span class="badge-avatar">
        <img src="http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png" alt="">
    </span>
</Badge>
```

#### Button + dot
<template>
    <Badge dot>
        <span class="badge-avatar">
            <img src="http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png" alt="">
        </span>
    </Badge>
</template>

```vue
<Badge dot>
    <span class="badge-avatar">
        <img src="http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png" alt="">
    </span>
</Badge>
```

#### Button + content
<template>
    <Badge :content="25">
        <Button type="primary">按钮</Button>
    </Badge>
</template>

```vue
<Badge :content="25">
    <Button type="primary">按钮</Button>
</Badge>
```

<script>
    export default {
        name: 'BadgeView',
        data() {
            return {
                countNum: 9
            }
        },
        mounted() {
            this.setCountNum();
        },
        methods: {
            setCountNum() {
                clearInterval(this.timer);
                this.countNum=0;
                this.timer=setInterval(() => {
                    if (this.countNum<111) this.countNum+=parseInt(10*Math.random());
                    else this.setCountNum();
                }, 3000)
            }
        }
    }
</script>

<style lang="stylus">
    .badge-avatar
        display inline-block
        vertical-align middle
        img
            border-radius 14px
            width 28px
            height @width

</style>


### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| content    | 内容 | String/Number | '' | no     |