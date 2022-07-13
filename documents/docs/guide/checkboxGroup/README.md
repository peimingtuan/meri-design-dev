### CheckboxGroup 复选框组

<template>
  <div class="checkbox-group-view">
    <h2>CheckboxGroup</h2>
    <div class="checkbox-group-view-item">
      <checkbox-group :group-data.sync="data1" :type="type1" :title="title" @change="handleChange"/>
    </div>
    <h2>多行CheckboxGroup组</h2>
    <div class="checkbox-group-view-item">
      <checkbox-group :group-data.sync="data2" :type="type2" :forbidden.sync="forbidden" @change="handleChange"/>
    </div>
    <h2>多行CheckboxGroup组（无禁用）</h2>
    <div class="checkbox-group-view-item">
      <checkbox-group :group-data.sync="data3" :type="type3" @change="handleChange"/>
    </div>
  </div>
</template>

<script>
    export default {
        name: "CheckboxGroupView",
        data () {
            return {
                title: 'checkbox', // 标题
                type1: 'single', // single  -单行checkbox组
                type2: 'multiple', // multiple  -多行checkbox组
                type3: 'multiple',
                data1: [
                    {
                        id: '1',
                        name: 'option1',
                        checked: 'checked',
                        disabled: false
                    },
                    {
                        id: '2',
                        name: 'option2',
                        checked: 'uncheck',
                        disabled: false
                    },
                    {
                        id: '3',
                        name: 'option3',
                        checked: 'checked',
                        disabled: true
                    },
                ],
                forbidden: {
                    id: '1',
                    name: 'option1',
                    checked: 'uncheck'
                }, // 禁用/启用状态切换
                data2: [
                    {
                        id: '11',
                        name: 'option11',
                        checked: 'uncheck',
                        disabled: false,
                        children: [
                            {
                                id: '111',
                                type: 'checkbox',
                                children: [
                                    {
                                        id: '1111',
                                        name: 'option1111',
                                        checked: 'checked',
                                        disabled: false,
                                    },
                                    {
                                        id: '1112',
                                        name: 'option1112',
                                        checked: 'uncheck',
                                        disabled: false
                                    },
                                    {
                                        id: '1113',
                                        name: 'option1113',
                                        checked: 'uncheck',
                                        disabled: false
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: '12',
                        name: 'option12',
                        checked: 'uncheck',
                        disabled: false,
                        children: [
                            {
                                id: '121',
                                type: 'radio',
                                children: [
                                    {
                                        id: '1211',
                                        name: 'option1211',
                                        checked: 'checked',
                                        disabled: false
                                    },
                                    {
                                        id: '1212',
                                        name: 'option1212',
                                        checked: 'uncheck',
                                        disabled: false
                                    },
                                    {
                                        id: '1213',
                                        name: 'option1213',
                                        checked: 'notNull',
                                        disabled: false
                                    }
                                ]
                            }
                        ]
                    }
                ],
                data3: [
                    {
                        id: '11',
                        name: 'option11',
                        checked: 'uncheck',
                        disabled: false,
                        children: [
                            {
                                id: '111',
                                type: 'checkbox',
                                children: [
                                    {
                                        id: '1111',
                                        name: 'option1111',
                                        checked: 'checked',
                                        disabled: false
                                    },
                                    {
                                        id: '1112',
                                        name: 'option1112',
                                        checked: 'uncheck',
                                        disabled: false
                                    },
                                    {
                                        id: '1113',
                                        name: 'option1113',
                                        checked: 'uncheck',
                                        disabled: false
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: '12',
                        name: 'option12',
                        checked: 'uncheck',
                        disabled: false,
                        children: [
                            {
                                id: '121',
                                type: 'radio',
                                children: [
                                    {
                                        id: '1211',
                                        name: 'option1211',
                                        checked: 'checked',
                                        disabled: false
                                    },
                                    {
                                        id: '1212',
                                        name: 'option1212',
                                        checked: 'uncheck',
                                        disabled: false
                                    },
                                    {
                                        id: '1213',
                                        name: 'option1213',
                                        checked: 'notNull',
                                        disabled: false
                                    }
                                ]
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
  .checkbox-group-view
    padding-left 20px
    h2
      padding 20px
    .checkbox-group-view-item
      width 800px
      border 1px solid $grey-200

</style>


```vue

<template>
  <div class="checkbox-group-view">
    <h2>CheckboxGroup</h2>
    <div class="checkbox-group-view-item">
      <checkbox-group :group-data.sync="data1" :type="type1" :title="title" @change="handleChange"/>
    </div>
    <h2>多行CheckboxGroup组</h2>
    <div class="checkbox-group-view-item">
      <checkbox-group :group-data.sync="data2" :type="type2" :forbidden.sync="forbidden" @change="handleChange"/>
    </div>
    <h2>多行CheckboxGroup组（无禁用）</h2>
    <div class="checkbox-group-view-item">
      <checkbox-group :group-data.sync="data3" :type="type3" @change="handleChange"/>
    </div>
  </div>
</template>

<script>
    export default {
        name: "CheckboxGroupView",
        data () {
            return {
                title: 'checkbox', // 标题
                type1: 'single', // single  -单行checkbox组
                type2: 'multiple', // multiple  -多行checkbox组
                type3: 'multiple',
                data1: [
                    {
                        id: '1',
                        name: 'option1',
                        checked: 'checked',
                        disabled: false
                    },
                    {
                        id: '2',
                        name: 'option2',
                        checked: 'uncheck',
                        disabled: false
                    },
                    {
                        id: '3',
                        name: 'option3',
                        checked: 'checked',
                        disabled: true
                    },
                ],
                forbidden: {
                    id: '1',
                    name: 'option1',
                    checked: 'uncheck'
                }, // 禁用/启用状态切换
                data2: [
                    {
                        id: '11',
                        name: 'option11',
                        checked: 'uncheck',
                        disabled: false,
                        children: [
                            {
                                id: '111',
                                type: 'checkbox',
                                children: [
                                    {
                                        id: '1111',
                                        name: 'option1111',
                                        checked: 'checked',
                                        disabled: false,
                                    },
                                    {
                                        id: '1112',
                                        name: 'option1112',
                                        checked: 'uncheck',
                                        disabled: false
                                    },
                                    {
                                        id: '1113',
                                        name: 'option1113',
                                        checked: 'uncheck',
                                        disabled: false
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: '12',
                        name: 'option12',
                        checked: 'uncheck',
                        disabled: false,
                        children: [
                            {
                                id: '121',
                                type: 'radio',
                                children: [
                                    {
                                        id: '1211',
                                        name: 'option1211',
                                        checked: 'checked',
                                        disabled: false
                                    },
                                    {
                                        id: '1212',
                                        name: 'option1212',
                                        checked: 'uncheck',
                                        disabled: false
                                    },
                                    {
                                        id: '1213',
                                        name: 'option1213',
                                        checked: 'notNull',
                                        disabled: false
                                    }
                                ]
                            }
                        ]
                    }
                ],
                data3: [
                    {
                        id: '11',
                        name: 'option11',
                        checked: 'uncheck',
                        disabled: false,
                        children: [
                            {
                                id: '111',
                                type: 'checkbox',
                                children: [
                                    {
                                        id: '1111',
                                        name: 'option1111',
                                        checked: 'checked',
                                        disabled: false
                                    },
                                    {
                                        id: '1112',
                                        name: 'option1112',
                                        checked: 'uncheck',
                                        disabled: false
                                    },
                                    {
                                        id: '1113',
                                        name: 'option1113',
                                        checked: 'uncheck',
                                        disabled: false
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: '12',
                        name: 'option12',
                        checked: 'uncheck',
                        disabled: false,
                        children: [
                            {
                                id: '121',
                                type: 'radio',
                                children: [
                                    {
                                        id: '1211',
                                        name: 'option1211',
                                        checked: 'checked',
                                        disabled: false
                                    },
                                    {
                                        id: '1212',
                                        name: 'option1212',
                                        checked: 'uncheck',
                                        disabled: false
                                    },
                                    {
                                        id: '1213',
                                        name: 'option1213',
                                        checked: 'notNull',
                                        disabled: false
                                    }
                                ]
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
| type    | 类型（可选值：single/multiple） | String | 'single' | Yes |
| group-data| checkboxGroup数据状态 | Array | [] | no     |
| title   | 标题 | String | '' | no     |
| forbidden| 禁用/启用 | Object | {} | no     |
