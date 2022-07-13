### Dropdown 下拉菜单


#### 文字下拉列表
<template>
    <Dropdown v-model="selVal" :data="dataSelect">{{selText}}</Dropdown>
</template>

```vue
<Dropdown v-model="selVal" :data="dataSelect">{{selText}}</Dropdown>

<style lang="stylus">
.drop-text
    font-size 14px
    color #1f2329
    line-height 16px

</style>
```

#### 头像下拉列表
<template>
    <Dropdown v-model="selVal2" :data="dataSelect2">
        <span class="drop-avatar">
            <img src="http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png" alt="">
        </span>
    </Dropdown>
</template>

```vue
<Dropdown v-model="selVal2" :data="dataSelect2">
    <span class="drop-avatar">
        <img src="http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png" alt="">
    </span>
</Dropdown>

<style lang="stylus">
.drop-avatar
    display inline-block
    vertical-align middle
    img
        border-radius 14px
        width 28px
        height @width

</style>
```

```vue
<script>
    const data=[
        { id: 'totalEnergy', name: '总量' },
        { id: 'singleParty', name: '单平米' },
        { id: 'lowerLevel', name: '下级分项' },
        { id: 'average', name: '滑动平均', disabled: true }
    ];
    const data2=[
        { id: 'totalEnergy', name: '总量' },
        { id: 'singleParty', name: '单平米' }
    ];
    export default {
        name: 'DropdownView',
        data() {
            return {
                selVal: 'totalEnergy',
                selText: '总量',
                dataSelect: data,
                selVal2: 'totalEnergy',
                dataSelect2: data2
            }
        },
        watch: {
            selVal(n, o) {
                if (n === o) return;
                this.selText=this.dataSelect.find(d => d.id === n).name
            }
        }
    }
</script>
```

<script>
    const data=[
        { id: 'totalEnergy', name: '总量' },
        { id: 'singleParty', name: '单平米' },
        { id: 'lowerLevel', name: '下级分项' },
        { id: 'average', name: '滑动平均', disabled: true }
    ];
    const data2=[
        { id: 'totalEnergy', name: '总量' },
        { id: 'singleParty', name: '单平米' }
    ];
    export default {
        name: 'DropdownView',
        data() {
            return {
                selVal: 'totalEnergy',
                selText: '总量',
                dataSelect: data,
                selVal2: 'totalEnergy',
                dataSelect2: data2
            }
        },
        watch: {
            selVal(n, o) {
                if (n === o) return;
                this.selText=this.dataSelect.find(d => d.id === n).name
            }
        }
    }
</script>

<style lang="stylus">
.drop-text
    font-size 14px
    color #1f2329
    line-height 16px

.drop-avatar
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
| data    | 数据列表 | Array | [] | no     |
| trigger    | 出发下拉列表展开方式['hover', 'click'] | String | hover | no     |
| openSearch   | 开启下拉框搜索 | Boolean | false | no     |
| maxCount   | 下拉列表做大展示数量 | Number/String | 5 | no     |
| v-model    | 绑定的id值 | String | ‘’ | no     |
| @getStatus    | 获取下拉列表状态 | Function | (status) => {} | no     |

::: danger 警告
    该组件单页在理论情况(即页面只存在Dropdown) data数据全部展开且子父级之和可容纳225条，超过225弹出动画会卡，
    若不考虑css动画，数据可容纳最多3000条
:::
