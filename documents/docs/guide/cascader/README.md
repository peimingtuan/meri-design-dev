### Cascader 级联选择器

#### 单选模式 - 触发方式：hover
<Cascader   trigger='hover'  v-model="model2" :data="cascaderData1"  width="300"></Cascader>

```vue
<Cascader   trigger='hover'  v-model="model2" :data="cascaderData1"  width="300"></Cascader>
```

#### 单选模式 - 触发方式：click  异步请求数据
<Cascader   trigger='click'  @change="testChange2" :load-data="loadData2"  :data="cascaderData2"  width="300"></Cascader>

```vue
<Cascader   trigger='click'  @change="testChange2" :load-data="loadData2"  :data="cascaderData2"  width="300"></Cascader>
```

#### 配置标题 caption
<Cascader    caption="选择项目"  multiple :data="cascaderData6" showPanel width="300"></Cascader>

```vue
<Cascader    caption="选择项目"  multiple :data="cascaderData6" showPanel width="300"></Cascader>
```

#### 配置占位符 placeholder
<Cascader  placeholder="请不要输入非法字符" multiple  :data="cascaderData6"   showPanel width="300"></Cascader>

```vue
<Cascader  placeholder="请不要输入非法字符" multiple  :data="cascaderData6"   showPanel width="300"></Cascader>
```

#### 隐藏清空图标 hideClear
<Cascader  :hideClear='true'    :data="cascaderData6"   width="300"></Cascader>

```vue
<Cascader  :hideClear='true'    :data="cascaderData6"   width="300"></Cascader>
```

#### 半选状态不计入已选项 all
<Cascader :all="false" showPanel  multiple   :data="cascaderData6"   width="300"></Cascader>

```vue
<Cascader :all="false" showPanel  multiple   :data="cascaderData6"   width="300"></Cascader>
```

#### 配置全选时的显示文字 allText
<Cascader  showPanel :isShowAllChoice="true" allText="全部选中"  multiple   :data="cascaderData6"   width="300"></Cascader>

```vue
<Cascader  showPanel :isShowAllChoice="true" allText="全部选中"  multiple   :data="cascaderData6"   width="300"></Cascader>
```

#### 最顶级父级在不在所选项统计中 excludeTop
<Cascader   :excludeTop="true"  showPanel  multiple   :data="cascaderData6"   width="300"></Cascader>

```vue
<Cascader   :excludeTop="true"  showPanel  multiple   :data="cascaderData6"   width="300"></Cascader>
```

#### 配置是否支持搜索 filterable
<Cascader   :filterable="false" showPanel  multiple   :data="cascaderData6"   width="300"></Cascader>

```vue
<Cascader   :filterable="false" showPanel  multiple   :data="cascaderData6"   width="300"></Cascader>
```

#### 多选常规模式 normal
<Cascader  type="normal"   showPanel  multiple   :data="cascaderData6"   width="300"></Cascader>

```vue
<Cascader   type="normal"  showPanel  multiple   :data="cascaderData6"   width="300"></Cascader>
```

#### 多选-子级禁用，子父级不联动 forbidden
<Cascader  type="forbidden"    showPanel  multiple   :data="cascaderData6"   width="300"></Cascader>

```vue
<Cascader  type="forbidden"  showPanel  multiple   :data="cascaderData6"   width="300"></Cascader>
```

#### 多选-子父级不联动 independent
<Cascader  type="independent"   showPanel  multiple   :data="cascaderData6"   width="300"></Cascader>

```vue
<Cascader  type="independent"   showPanel  multiple   :data="cascaderData6"   width="300"></Cascader>
```

#### 多选-只能选择末级 final
<Cascader  type="final"  showPanel  multiple     :data="cascaderData6"   width="300"></Cascader>

```vue
<Cascader  type="final"   showPanel  multiple   :data="cascaderData6"   width="300"></Cascader>
```
 
<script>
export default {
    name:'CascaderView',
    watch:{
        model1(n,o){
        }
    },
    data () {
        return {
            model1:['id1','id2'],
            model2:['id1','id2'],
            cascaderData1:[
                {
                    title:'United Kingdom',
                    id:'id1',
                    children:[
                        {id:'id2',title:'London', disabled: true},
                        {id:'id3',title:'Edinburgh'},
                        {id:'id4',title:'Cardiff'},
                        {id:'id5',title:'Birmingham'},
                        {id:'id6',title:'Liverpool'},
                        {id:'id7',title:'Oxford'},
                        {id:'id8',title:'Plymouth'},
                    ]
                },
                {
                    title:'AMERICAN',
                    id:'id9',
                    children:[
                        {id:'id10',title:'Chicago'},
                        {id:'id11',title:'Philadelphia',disabled: true},
                        {id:'id12',title:'Boston'},
                        {id:'id13',title:'Houston'},
                        {id:'id14',title:'Atlanta'},
                        {id:'id15',title:'San Francisco'},
                    ]
                },
                {
                    title:'CHINA',
                    id:'id16',
                    children:[
                        {id:'id17',title:'BeiJing'},
                        {id:'id18',title:'ShangHAI'},
                        { 
                            title:'GuiYang',
                            id:'id19',
                            children:[
                                {id:'id20',title:'Qingyan'},
                                {id:'id21',title:'Guian'},
                            ]    
                        },
                        {id:'id22',title:'ZunYi'},
                    ]
                }, 
                {
                    title:'韩国',
                    id:'id23',
                    children:[
                        {id:'id24',title:'首尔'},
                        {id:'id25',title:'仁川'},
                        {id:'id26',title:'釜山'},
                        {id:'id27',title:'蔚山'}
                    ]
                }
            ],
            
            cascaderData2:[
                {
                    title:'United Kingdom',
                    id:'id1',
                    children:[
                    ]
                },
                {
                    title:'AMERICAN',
                    id:'id9',
                    children:[
                    ]
                },
                {
                    title:'CHINA',
                    id:'id16',
                    children:[
                    ]
                }, 
                {
                    title:'韩国',
                    id:'id23',
                    children:[
                    ]
                }
            ],
            cascaderData3:[
                {
                    title:'United Kingdom',
                    id:'id1',
                    children:[
                        {id:'id2',title:'London'},
                        {id:'id3',title:'Edinburgh'},
                        {id:'id4',title:'Cardiff'},
                        {id:'id5',title:'Birmingham'},
                        {id:'id6',title:'Liverpool'},
                        {id:'id7',title:'Oxford'},
                        {id:'id8',title:'Plymouth'},
                    ]
                },
                {
                    title:'AMERICAN',
                    id:'id9',
                    children:[
                        {id:'id10',title:'Chicago'},
                        {id:'id11',title:'Philadelphia' },
                        {id:'id12',title:'Boston'},
                        {id:'id13',title:'Houston'},
                        {id:'id14',title:'Atlanta'},
                        {id:'id15',title:'San Francisco'},
                    ]
                },
                {
                    title:'CHINA',
                    id:'id16',
                    children:[
                        {id:'id17',title:'BeiJing'},
                        {id:'id18',title:'ShangHAI'},
                        { 
                            title:'GuiYang',
                            id:'id19',
                            children:[
                                {id:'id20',title:'Qingyan'},
                                {id:'id21',title:'Guian'},
                            ]    
                        },
                        {id:'id22',title:'ZunYi'},
                    ]
                }, 
                {
                    title:'韩国',
                    id:'id23',
                    children:[
                        {id:'id24',title:'首尔'},
                        {id:'id25',title:'仁川'},
                        {id:'id26',title:'釜山'},
                        {id:'id27',title:'蔚山'}
                    ]
                }
            ],
            cascaderData4:[
                {
                    title:'United Kingdom',
                    id:'id1',
                    children:[
                        {id:'id2',title:'London', disabled: true},
                        {id:'id3',title:'Edinburgh'},
                        {id:'id4',title:'Cardiff'},
                        {id:'id5',title:'Birmingham'},
                        {id:'id6',title:'Liverpool'},
                        {id:'id7',title:'Oxford'},
                        {id:'id8',title:'Plymouth'},
                    ]
                },
                {
                    title:'AMERICAN',
                    id:'id9',
                    children:[
                        {id:'id10',title:'Chicago'},
                        {id:'id11',title:'Philadelphia',disabled: true},
                        {id:'id12',title:'Boston'},
                        {id:'id13',title:'Houston'},
                        {id:'id14',title:'Atlanta'},
                        {id:'id15',title:'San Francisco'},
                    ]
                },
                {
                    title:'CHINA',
                    id:'id16',
                    children:[
                        {id:'id17',title:'BeiJing'},
                        {id:'id18',title:'ShangHAI'},
                        { 
                            title:'GuiYang',
                            id:'id19',
                            children:[
                                {id:'id20',title:'Qingyan'},
                                {id:'id21',title:'Guian'},
                            ]    
                        },
                        {id:'id22',title:'ZunYi'},
                    ]
                }, 
                {
                    title:'韩国',
                    id:'id23',
                    children:[
                        {id:'id24',title:'首尔'},
                        {id:'id25',title:'仁川'},
                        {id:'id26',title:'釜山'},
                        {id:'id27',title:'蔚山'}
                    ]
                }
            ],
            cascaderData5:[
                {
                    title:'United Kingdom',
                    id:'id1',
                    children:[
                        {id:'id2',title:'London'},
                        {id:'id3',title:'Edinburgh'},
                        {id:'id4',title:'Cardiff'},
                        {id:'id5',title:'Birmingham'},
                        {id:'id6',title:'Liverpool'},
                        {id:'id7',title:'Oxford'},
                        {id:'id8',title:'Plymouth'},
                    ]
                },
                {
                    title:'AMERICAN',
                    id:'id9',
                    children:[
                        {id:'id10',title:'Chicago'},
                        {id:'id11',title:'Philadelphia',disabled: true},
                        {id:'id12',title:'Boston'},
                        {id:'id13',title:'Houston'},
                        {id:'id14',title:'Atlanta'},
                        {id:'id15',title:'San Francisco'},
                    ]
                },
                {
                    title:'CHINA',
                    id:'id16',
                    children:[
                        {id:'id17',title:'BeiJing'},
                        {id:'id18',title:'ShangHAI'},
                        { 
                            title:'GuiYang',
                            id:'id19',
                            children:[
                                {id:'id20',title:'Qingyan'},
                                {id:'id21',title:'Guian'},
                            ]    
                        },
                        {id:'id22',title:'ZunYi'},
                    ]
                }, 
                {
                    title:'韩国',
                    id:'id23',
                    children:[
                        {id:'id24',title:'首尔'},
                        {id:'id25',title:'仁川'},
                        {id:'id26',title:'釜山'},
                        {id:'id27',title:'蔚山'}
                    ]
                }
            ],
            cascaderData6:[
                {
                    title:'United Kingdom',
                    id:'id1',
                    children:[
                        {id:'id2',title:'London', disabled: true},
                        {id:'id3',title:'Edinburgh'},
                        {id:'id4',title:'Cardiff'},
                        {id:'id5',title:'Birmingham'},
                        {id:'id6',title:'Liverpool'},
                        {id:'id7',title:'Oxford'},
                        {id:'id8',title:'Plymouth'},
                    ]
                },
                {
                    title:'AMERICAN',
                    id:'id9',
                    children:[
                        {id:'id10',title:'Chicago'},
                        {id:'id11',title:'Philadelphia',disabled: true},
                        {id:'id12',title:'Boston'},
                        {id:'id13',title:'Houston'},
                        {id:'id14',title:'Atlanta'},
                        {id:'id15',title:'San Francisco'},
                    ]
                },
                {
                    title:'CHINA',
                    id:'id16',
                    children:[
                        {id:'id17',title:'BeiJing'},
                        {id:'id18',title:'ShangHAI'},
                        { 
                            title:'GuiYang',
                            id:'id19',
                            children:[
                                {id:'id20',title:'Qingyan'},
                                {id:'id21',title:'Guian'},
                            ]    
                        },
                        {id:'id22',title:'ZunYi'},
                    ]
                }, 
                {
                    title:'韩国',
                    id:'id23',
                    children:[
                        {id:'id24',title:'首尔'},
                        {id:'id25',title:'仁川'},
                        {id:'id26',title:'釜山'},
                        {id:'id27',title:'蔚山'}
                    ]
                }
            ],
            cascaderData7:[
                {
                    title:'United Kingdom',
                    id:'id1',
                    children:[
                        {id:'id2',title:'London', disabled: true},
                        {id:'id3',title:'Edinburgh'},
                        {id:'id4',title:'Cardiff'},
                        {id:'id5',title:'Birmingham'},
                        {id:'id6',title:'Liverpool'},
                        {id:'id7',title:'Oxford'},
                        {id:'id8',title:'Plymouth'},
                    ]
                },
                {
                    title:'AMERICAN',
                    id:'id9',
                    children:[
                        {id:'id10',title:'Chicago'},
                        {id:'id11',title:'Philadelphia',disabled: true},
                        {id:'id12',title:'Boston'},
                        {id:'id13',title:'Houston'},
                        {id:'id14',title:'Atlanta'},
                        {id:'id15',title:'San Francisco'},
                    ]
                },
                {
                    title:'CHINA',
                    id:'id16',
                    children:[
                        {id:'id17',title:'BeiJing'},
                        {id:'id18',title:'ShangHAI'},
                        { 
                            title:'GuiYang',
                            id:'id19',
                            children:[
                                {id:'id20',title:'Qingyan'},
                                {id:'id21',title:'Guian'},
                            ]    
                        },
                        {id:'id22',title:'ZunYi'},
                    ]
                }, 
                {
                    title:'韩国',
                    id:'id23',
                    children:[
                        {id:'id24',title:'首尔'},
                        {id:'id25',title:'仁川'},
                        {id:'id26',title:'釜山'},
                        {id:'id27',title:'蔚山'}
                    ]
                }
            ],
            cascaderData8:[
                {
                    title:'United Kingdom',
                    id:'id1',
                    children:[
                        {id:'id2',title:'London', disabled: true},
                        {id:'id3',title:'Edinburgh'},
                        {id:'id4',title:'Cardiff'},
                        {id:'id5',title:'Birmingham'},
                        {id:'id6',title:'Liverpool'},
                        {id:'id7',title:'Oxford'},
                        {id:'id8',title:'Plymouth'},
                    ]
                },
                {
                    title:'AMERICAN',
                    id:'id9',
                    children:[
                        {id:'id10',title:'Chicago'},
                        {id:'id11',title:'Philadelphia',disabled: true},
                        {id:'id12',title:'Boston'},
                        {id:'id13',title:'Houston'},
                        {id:'id14',title:'Atlanta'},
                        {id:'id15',title:'San Francisco'},
                    ]
                },
                {
                    title:'CHINA',
                    id:'id16',
                    children:[
                        {id:'id17',title:'BeiJing'},
                        {id:'id18',title:'ShangHAI'},
                        { 
                            title:'GuiYang',
                            id:'id19',
                            children:[
                                {id:'id20',title:'Qingyan'},
                                {id:'id21',title:'Guian'},
                            ]    
                        },
                        {id:'id22',title:'ZunYi'},
                    ]
                }, 
                {
                    title:'韩国',
                    id:'id23',
                    children:[
                        {id:'id24',title:'首尔'},
                        {id:'id25',title:'仁川'},
                        {id:'id26',title:'釜山'},
                        {id:'id27',title:'蔚山'}
                    ]
                }
            ],
            cascaderData9:[
                {
                    title:'United Kingdom',
                    id:'id1',
                    children:[
                        {id:'id2',title:'London', disabled: true},
                        {id:'id3',title:'Edinburgh'},
                        {id:'id4',title:'Cardiff'},
                        {id:'id5',title:'Birmingham'},
                        {id:'id6',title:'Liverpool'},
                        {id:'id7',title:'Oxford'},
                        {id:'id8',title:'Plymouth'},
                    ]
                },
                {
                    title:'AMERICAN',
                    id:'id9',
                    children:[
                        {id:'id10',title:'Chicago'},
                        {id:'id11',title:'Philadelphia',disabled: true},
                        {id:'id12',title:'Boston'},
                        {id:'id13',title:'Houston'},
                        {id:'id14',title:'Atlanta'},
                        {id:'id15',title:'San Francisco'},
                    ]
                },
                {
                    title:'CHINA',
                    id:'id16',
                    children:[
                        {id:'id17',title:'BeiJing'},
                        {id:'id18',title:'ShangHAI'},
                        { 
                            title:'GuiYang',
                            id:'id19',
                            children:[
                                {id:'id20',title:'Qingyan'},
                                {id:'id21',title:'Guian'},
                            ]    
                        },
                        {id:'id22',title:'ZunYi'},
                    ]
                }, 
                {
                    title:'韩国',
                    id:'id23',
                    children:[
                        {id:'id24',title:'首尔'},
                        {id:'id25',title:'仁川'},
                        {id:'id26',title:'釜山'},
                        {id:'id27',title:'蔚山'}
                    ]
                }
            ],
            cascaderData8:[
                {
                    title:'United Kingdom',
                    id:'id1',
                    children:[
                        {id:'id2',title:'London', disabled: true},
                        {id:'id3',title:'Edinburgh'},
                        {id:'id4',title:'Cardiff'},
                        {id:'id5',title:'Birmingham'},
                        {id:'id6',title:'Liverpool'},
                        {id:'id7',title:'Oxford'},
                        {id:'id8',title:'Plymouth'},
                    ]
                },
                {
                    title:'AMERICAN',
                    id:'id9',
                    children:[
                        {id:'id10',title:'Chicago'},
                        {id:'id11',title:'Philadelphia',disabled: true},
                        {id:'id12',title:'Boston'},
                        {id:'id13',title:'Houston'},
                        {id:'id14',title:'Atlanta'},
                        {id:'id15',title:'San Francisco'},
                    ]
                },
                {
                    title:'CHINA',
                    id:'id16',
                    children:[
                        {id:'id17',title:'BeiJing'},
                        {id:'id18',title:'ShangHAI'},
                        { 
                            title:'GuiYang',
                            id:'id19',
                            children:[
                                {id:'id20',title:'Qingyan'},
                                {id:'id21',title:'Guian'},
                            ]    
                        },
                        {id:'id22',title:'ZunYi'},
                    ]
                }, 
                {
                    title:'韩国',
                    id:'id23',
                    children:[
                        {id:'id24',title:'首尔'},
                        {id:'id25',title:'仁川'},
                        {id:'id26',title:'釜山'},
                        {id:'id27',title:'蔚山'}
                    ]
                }
            ],
            cascaderData9:[
                {
                    title:'United Kingdom',
                    id:'id1'
                },
                {
                    title:'AMERICAN',
                    id:'id2'
                },
                {
                    title:'CHINA',
                    id:'id3'
                },
            ],
        }
    },
    methods:{
        testChange (data) {
        },
        testChange2 (data) {
        },
        testConfirm (data) {
        },
        loadData2 (item, callback) {
                item.loading = true;
                setTimeout(() => {
                    if (item.title === 'United Kingdom') {
                        item.children = [
                            {
                                title: 'UK1'
                            },
                            {
                                title: 'UK2',
                            },
                            {
                                title: 'UK3'
                            }
                        ]
                    }else if (item.title === 'AMERICAN') {
                        item.children = [
                            {
                                title: 'AMERICAN1'
                            },
                            {
                                title: 'AMERICAN2',
                            },
                            {
                                title: 'AMERICAN3'
                            }
                        ]
                    }else if (item.title === 'CHINA') {
                        item.children = [
                            {
                                title: 'CHINA1'
                            },
                            {
                                title: 'CHINA2',
                            },
                            {
                                title: 'CHINA3'
                            }
                        ]
                    }  
                    item.loading = false;
                    callback()
                }, 1000);
        },
    }
}
</script>

<style lang="stylus">
.cascader-display-container
    padding-top 40px
    .cascader-display-panel
        margin-bottom 30px
        margin-left 40px
        h5
            margin-bottom 12px
</style>
 

### Attributes

| 参数     |      说明         | 类型    | 默认值  | 必须    |  可选值  |
| -------  |      -------     | -------  | ------- | -------  |   -------   |
| data     |    绑定的数据     | Array   |    []   | no    |          |
| v-model  |    默认选中值     | Array   |    []   | no     |          |
| width    |      组件宽度     | Number  |    200  | no     |          |
| load-data| 异步获取数据       | function|    无   | no    |           |
| caption  |    配置输入框标题  | string  | ''      | no     |          |
| placeholder| 配置输入框占位符  | string |   ''    |    no   |          |
| multiple |        是否多选    | Boolean | false   | no    |          |
| trigger  | 配置次级菜单展开方式| String  | click  |  no    | click/hover  |
| tipPlace  | 配置提示框弹出方向| String    | top   | no    | top/bottom  |
| showPanel| 是否显示筛选面板 | Boolean | false | no  |   |
|   type   | 多选情况下的选择交互类型 | String | 'normal' | no  | normal / independent /  final / forbidden|
|   all    | type为normal情况下设置半选状态是否计入已选项 | Boolean | true | no  | |
| hideClear|是否隐藏清空图标 | Boolean | false | no     |  |
| allText  |配置全选时的显示文字（只能在多选且type为normal的情况下可配置） | string | 全部 | no     |  |
|excludeTop|是否将最顶级父级在所选项统计中筛除（只能在多选且type为normal的情况下可配置）| Boolean | false | no     |  |
|filterable|配置是否支持搜索 | Boolean | true | no  |  |
|isShowAllChoice| 全选时是否显示指定文本 | Boolean | false | no | |
| transfer |  设置父标签出现滚动条的id  | String |   ''   |  no | 

 
### props
| 参数     |   说明      | 类型    | 默认值  | 必须    | 
| -------  |   ----     | ------ | ------- | ------ |   
| disabled | 配置是否禁用  | boolean  |  false  | no    |   


### type
| 参数         |   说明      | 
| -------      |   ----     | 
| normal       | 常规 子父级联动 父级有半选状态  | 
| independent  | 父级和子级都可以选择，且互不干  | 
| final        | 只有末级节点可以选择，此时的父级节不能选择 | 
| forbidden    | 选择了父级，子级勾选，且不可操作 | 


### Events

| 事件名称  |   说明      | 返回数据    |  
| -------  |   ----     | ------ | 
| change   |单击某一项触发  |    当前值  | 
| confirm  | 多选情况下点击确认按钮触发  | 选中值  |    
