### RadioGroup 单选组

<template>
  <div class="radio-group-view">
    <h2>单行RadioGroup</h2>
    <div class="radio-group-view-item">
      <radio-group :group-data.sync="data1" :type="type1" @change="handleChange" :title="title"/>
    </div>
    <h2>多行RadioGroup组</h2>
    <div class="radio-group-view-item">
      <radio-group :group-data.sync="data2" :type="type2" @change="handleChange"/>
    </div>
  </div>
</template>

<script>
    export default {
        name: "RadioGroupView",
        data () {
            return {
                title: 'RadioGroup',
                type1: 'single', // single -单行RadioGroup multiple -多行RadioGroup
                type2: 'multiple',
                data1: [
                    {
                        id: '1',
                        name: 'option1',
                        checked: 'uncheck',
                        disabled: false
                    },
                    {
                        id: '2',
                        name: 'option2',
                        checked: 'checked',
                        disabled: false
                    },
                    {
                        id: '3',
                        name: 'option3',
                        checked: 'uncheck',
                        disabled: true
                    }
                ],
                data2: [
                    {
                        id: '1',
                        name: 'option1',
                        checked: 'uncheck',
                        disabled: false,
                        type: 'checkbox',
                        children: [

                            {
                                id: '111',
                                name: 'option111',
                                checked: 'checked'

                            },
                            {
                                id: '112',
                                name: 'option112',
                                checked: 'uncheck'
                            },
                            {
                                id: '113',
                                name: 'option113',
                                checked: 'uncheck'
                            }
                        ]
                    },
                    {
                        id: '2',
                        name: 'option2',
                        checked: 'uncheck',
                        disabled: false,
                        type: 'radio',
                        children: [
                            {
                                id: '121',
                                name: 'option121',
                                checked: 'checked'

                            },
                            {
                                id: '122',
                                name: 'option122',
                                checked: 'uncheck'
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            handleChange (e) {
                console.log(e)
            }
        }
    }
</script>

<style lang="stylus">
  .radio-group-view
    padding-left 20px
    h2
      padding 20px
    .radio-group-view-item
      width 800px
      border 1px solid $grey-200

</style>

```vue

<template>
  <div class="radio-group-view">
    <h2>单行RadioGroup</h2>
    <div class="radio-group-view-item">
      <radio-group :group-data.sync="data1" :type="type1" @change="handleChange" :title="title"/>
    </div>
    <h2>多行RadioGroup组</h2>
    <div class="radio-group-view-item">
      <radio-group :group-data.sync="data2" :type="type2" @change="handleChange"/>
    </div>
  </div>
</template>

<script>
    export default {
        name: "RadioGroupView",
        data () {
            return {
                title: 'RadioGroup',
                type1: 'single', // single -单行RadioGroup multiple -多行RadioGroup
                type2: 'multiple',
                data1: [
                    {
                        id: '1',
                        name: 'option1',
                        checked: 'uncheck',
                        disabled: false
                    },
                    {
                        id: '2',
                        name: 'option2',
                        checked: 'checked',
                        disabled: false
                    },
                    {
                        id: '3',
                        name: 'option3',
                        checked: 'uncheck',
                        disabled: true
                    }
                ],
                data2: [
                    {
                        id: '1',
                        name: 'option1',
                        checked: 'uncheck',
                        disabled: false,
                        type: 'checkbox',
                        children: [

                            {
                                id: '111',
                                name: 'option111',
                                checked: 'checked'

                            },
                            {
                                id: '112',
                                name: 'option112',
                                checked: 'uncheck'
                            },
                            {
                                id: '113',
                                name: 'option113',
                                checked: 'uncheck'
                            }
                        ]
                    },
                    {
                        id: '2',
                        name: 'option2',
                        checked: 'uncheck',
                        disabled: false,
                        type: 'radio',
                        children: [
                            {
                                id: '121',
                                name: 'option121',
                                checked: 'checked'

                            },
                            {
                                id: '122',
                                name: 'option122',
                                checked: 'uncheck'
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            handleChange (e) {
                console.log(e)
            }
        }
    }
</script>

```

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| type    | 类型（可选值：single -单行/multiple -多行） | String | 'single' | Yes |
| group-data| RadioGroup数据状态 | Array | [] | no |
| title   | 标题 | String | '' | no  |
