### CascaderSearchList 列表选择器

<template>
    <div>
        <div class="newCascader-display-panel">
            <div>
                <h5>带二级面板-可筛选</h5>
                <CascaderSearchList 
                    placeholder="测试placeholder" 
                    title="区域"
                    tipPlace="top"  
                    v-model="model"
                    :data="cascaderData8"
                    @confirm = "testConfirm"  
                    width="300">
                </CascaderSearchList>
            </div>
             <div>
                <h5>只有一级面板</h5>
                <CascaderSearchList 
                    placeholder="测试placeholder" 
                    title="区域"
                    tipPlace="top"  
                    v-model="model2"
                    :data="cascaderData"
                    :root="false"
                    @confirm = "testConfirm"  
                    width="300">
                </CascaderSearchList>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'CascaderSearchListView',
    watch:{
        model1(n,o){
        }
    },
    data () {
        return {
            model:['id10','id11'],
            model2:['id3','id4'],
            cascaderData:[
                {id:'id2',title:'London'},
                {id:'id3',title:'Edinburgh'},
                {id:'id4',title:'Cardiff'},
                {id:'id5',title:'Birmingham'},
                {id:'id6',title:'Liverpool'},
                {id:'id7',title:'Oxford'},
                {id:'id8',title:'Plymouth'}
            ],
            cascaderData8:[
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
                        {id:'id11',title:'Philadelphia'},
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
                },
        
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
    }
}
</script>

<style lang="stylus">
.newCascader-display-panel
    display flex
    justify-content flex-start
    padding 100px
    margin-top 100px
    margin-left 40px
    div
        margin-right 40px
        h5
            margin-bottom 12px
           
</style>


```vue
 <template>
    <div>
        <div class="newCascader-display-panel">
            <div>
                <h5>带二级面板-可筛选</h5>
                <CascaderSearchList 
                    placeholder="测试placeholder" 
                    title="区域"
                    tipPlace="top"  
                    v-model="model"
                    :data="cascaderData8"
                    @confirm = "testConfirm"  
                    width="300">
                </CascaderSearchList>
            </div>
             <div>
                <h5>只有一级面板</h5>
                <CascaderSearchList 
                    placeholder="测试placeholder" 
                    title="区域"
                    tipPlace="top"  
                    v-model="model2"
                    :data="cascaderData"
                    :root="false"
                    @confirm = "testConfirm"  
                    width="300">
                </CascaderSearchList>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'CascaderSearchListView',
    watch:{
        model1(n,o){
        }
    },
    data () {
        return {
            model:['id10','id11'],
            model2:['id3','id4'],
            cascaderData:[
                {id:'id2',title:'London'},
                {id:'id3',title:'Edinburgh'},
                {id:'id4',title:'Cardiff'},
                {id:'id5',title:'Birmingham'},
                {id:'id6',title:'Liverpool'},
                {id:'id7',title:'Oxford'},
                {id:'id8',title:'Plymouth'}
            ],
            cascaderData8:[
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
                        {id:'id11',title:'Philadelphia'},
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
                },
        
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
    }
}
</script>


```


### Attributes

| 参数     |   说明      | 类型    | 默认值  | 必须    |  可选值  |
| -------  |   ----     | ------ | ------- | ------ | ------   |
| data     | 绑定的数据  | Array  |    []   | yes    |   |
| tipPlace | 弹出框的显示位置| String |  top   | no   |   |
| v-model  | 默认绑定值  | Array  |    []   |  no    |   |
| placeholder| 输入框提示类容 | String  | "请选择"  |  no    |   |
| width    | 组件宽度    | Number |    200   | no    |    |
| title  | 输入框标题 | String | '' | no    |    |
| caption | 配置输入框标题 | String | '' | no |   |
| transfer |  设置父标签出现滚动条的id  | String |   ''   |  no |
 
 

### Events

| 事件名称  |   说明      | 返回数据    |  
| -------  |   ----     | ------ | 
| confirm  | 点击确认按钮触发  | 选中值  |
