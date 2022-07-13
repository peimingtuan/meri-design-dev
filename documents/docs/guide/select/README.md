### Select 下拉选择器

####  Select组件

####  width + placeholder + disabled 禁选状态

<Select 
    width="300" 
    @change="testClick" 
    :selectdata="dataSelect1" 
    :placeholder="'请选择'"
    :disabled="true"
/>

```vue
<Select 
    width="300" 
    @change="testClick" 
    :selectdata="dataSelect1" 
    :placeholder="'请选择'"
    :disabled="true"
/>
dataSelect1:[],

testClick (data) {
    console.log(data)
},
```

#### width + isReadOnly + hideClear + placeholder 主副双行-默认选中-单选

<Select 
    width="300" 
    v-model="model" 
    :isReadOnly="true" 
    @change="testClick" 
    :hideClear='true'
    :selectdata="dataSelect2" 
    :placeholder="'请选择'"
/>

```vue
<Select 
    width="300" 
    v-model="model" 
    :isReadOnly="true" 
    @change="testClick" 
    :hideClear='true'
    :selectdata="dataSelect2" 
    :placeholder="'请选择'"
/>
model:'test2',
dataSelect2:[
    {id:'test1', name: '选择项'},
    {id:'test2', name: '单平米'},
    {id:'test3', name: '下级分项' },
    {id:'test4', name: '滑动平均滑动平均'}
],

testClick (data) {
    console.log(data)
},
```

#### width + radius + placeholder 头像-主副双行-单选-圆角

<Select 
    width="300" 
    radius
    @change="testClick" 
    :selectdata="dataSelect3"
    :placeholder="'请选择'"
/>

```vue
<Select 
    width="300" 
    radius
    @change="testClick" 
    :disabled="true" 
    :selectdata="dataSelect3"
     :placeholder="'请选择'"
/>
dataSelect3: [
    {id:'test1', name: '选择项', sub: 'hello111' ,src:src},
    {id:'test2', name: '单平米', sub: 'hola111',src:src},
    {id:'test3', name: '下级分项',sub: 'bonjour', src:src,divider:true},
    {id:'test4', name: '滑动平均滑动平均', sub:'hi',src:src}
],

testClick (data) {
    console.log(data)
},
```

#####  width + isReadOnly + tipPlace + caption + placeholder 带标签-单选

<Select 
    width="300"  
    :isReadOnly="true" 
    tipPlace="top" 
    transfer='selectid100' 
    caption="标题："
    @change="testClick" 
    v-model="model4" 
    :selectdata="dataSelect4" 
    :placeholder="'请选择'"
/>

```vue
<Select 
    width="300" 
    :isReadOnly="true" 
    tipPlace="top" 
    transfer='selectid100' 
    caption="标题："
    @change="testClick" 
    v-model="model4" 
    :selectdata="dataSelect4" 
    :placeholder="'请选择'"
/>
dataSelect4:[
    {id:'test1', name: '选择项',label:"高级"},
    {id:'test2', name: '单平米', label:"中级"},
    {id:'test3', name: '下级分项', label:"初级"},
    {id:'test4', name: '4444444', label:"低级"},
    {id:'test5', name: '555555555', label:"低级"},
    {id:'test6', name: '66666666666', label:"低级"},
    {id:'test7', name: '6666', label:"低级"},
    {id:'test8', name: '6', label:"低级"}
],
model4: 'test3',
testClick (data) {
    console.log(data)
},
```

#### width + tipPlace + placeholder 带分类多选

<Select 
    width="300" 
    tipPlace="top" 
    :selectdata="dataSelect5" 
    v-model="model5" 
    @confirm="testConfirm"
    @cancel="testCancel" 
    @change="testClick" 
    :placeholder="'请选择'" 
    multiple
/>

```vue
<Select 
    width="300" 
    tipPlace="top" 
    :selectdata="dataSelect5" 
    v-model="model5" 
    @confirm="testConfirm"
    @cancel="testCancel" 
    @change="testClick" 
    :placeholder="'请选择'" 
    multiple
/>
model5: ['test1'],
dataSelect5:[
    {id:'test1', name: '选择项', label:"高级"},
    {id:'test2', name: '单平米', label:"中级"},
    {id:'test3', name: '下级分项',  label:"初级",divider:true},
    {id:'test4', name: '滑动平均滑动平均',label:"低级"},
    {id:'test5', name: '滑动平均滑动平均',label:"低级"}
],
testClick (data) {
    console.log(data)
},
testConfirm (data) {

},
testCancel () {

},
```

####  width + tipPlace + placeholder + multiple  带标题多选

<Select  
    width="300" 
    tipPlace="top" 
    :selectdata="dataSelect6" 
    @confirm="testConfirm" 
    @cancel="testCancel" 
    @change="testClick"   
    :placeholder="'请选择'" 
    multiple 
/>

```vue
<Select  
    width="300" 
    tipPlace="top" 
    :selectdata="dataSelect6" 
    @confirm="testConfirm" 
    @cancel="testCancel" 
    @change="testClick"   
    :placeholder="'请选择'" 
    multiple 
/>
dataSelect6:[
    {id:'test1', name: '选择项',label:"高级", disabled:true},
    {id:'test2', name: '单平米', label:"中级"},
    {id:'test3', classify:'分类一'},
    {id:'test4', name: '下级分项', label:"初级"},
    {id:'test5', classify:'分类二'},
    {id:'test6', name: '滑动平均滑动平均',label:"低级"},
    {id:'test7', name: '滑动平均滑动平均',label:"低级"}
],

testClick (data) {
    console.log(data)
},
testConfirm (data) {

},
testCancel () {

},
```

#### width + tipPlace + caption + placeholder + multiple 头像单行多选

<Select  
    width="300" 
    tipPlace="top"  
    caption="标题：" 
    v-model="model2" 
    :selectdata="dataSelect7"  
    @confirm="testConfirm" 
    @cancel="testCancel" 
    @change="testClick"   
    :placeholder="'请选择'" 
    multiple 
/>

```vue
<Select  
    width="300" 
    tipPlace="top"  
    caption="标题：" 
    v-model="model2" 
    :selectdata="dataSelect7"  
    @confirm="testConfirm" 
    @cancel="testCancel" 
    @change="testClick"   
    :placeholder="'请选择'" 
    multiple 
/>
model2: ['test1', 'test4'],
dataSelect7: [
    {id:'test1', name: '总量1111',src:src, sub:'测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出'},
    {id:'test2', name: '总量2222',src:src, sub:'测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出'},
    {id:'test3', name: '总量3333',src:src, sub:'测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出'},
    {id:'test4', name: '总量4444',src:src, sub:'测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出'},
],

testClick (data) {
    console.log(data)
},
testConfirm (data) {

},
testCancel () {

}
```

#### width + tipPlace + placeholder + multiple  头像带分类单行多选

<Select  
    width="300" 
    tipPlace="bottom" 
    :selectdata="dataSelect8" 
    @confirm="testConfirm" 
    @cancel="testCancel" 
    @change="testClick"   
    :placeholder="'请选择'" 
    multiple 
/>

```vue
<Select  
    width="300" 
    tipPlace="bottom" 
    :selectdata="dataSelect8" 
    @confirm="testConfirm" 
    @cancel="testCancel" 
    @change="testClick"   
    :placeholder="'请选择'" 
    multiple 
/>
dataSelect8: [
    {id:'test1', name: '选择项',src:src},
    {id:'test2', name: '总量2222',src:src},
    {id:'test3', name: '总量3333',src:src},
    {id:'test4', name: '总量3333',src:src},
    {id:'test5', name: '总量3333',src:src},
    {id:'test6', name: '总量3333',src:src},
    {id:'test7', name: '总量3333',src:src},
],

testClick (data) {
    console.log(data)
},
testConfirm (data) {

},
testCancel () {

},
```

<script>
const src ='http://47.95.122.141:8200/persagy_ui_kit/images/defaultImage.png';
export default {
    name: 'SelectView',
    data() {
        return {
            model: 'test2',
            model2: ['test1', 'test4'],
            model4: 'test3',
            model5: ['test1'],
            dataSelect1:[
            ],
            dataSelect2:[
                {id:'test1', name: '选择项'},
                {id:'test2', name: '单平米'},
                {id:'test3', name: '下级分项' },
                {id:'test4', name: '滑动平均滑动平均'}
            ],
            dataSelect3: [
                {id:'test1', name: '选择项', sub: 'hello111' ,src:src},
                {id:'test2', name: '单平米', sub: 'hola111',src:src},
                {id:'test3', name: '下级分项',sub: 'bonjour', src:src,divider:true},
                {id:'test4', name: '滑动平均滑动平均', sub:'hi',src:src}
            ],
            dataSelect4:[
                {id:'test1', name: '选择项',label:"高级"},
                {id:'test2', name: '单平米', label:"中级"},
                {id:'test3', name: '下级分项', label:"初级"},
                {id:'test4', name: '4444444', label:"低级"},
                {id:'test5', name: '555555555', label:"低级"},
                {id:'test6', name: '66666666666', label:"低级"},
                {id:'test7', name: '6666', label:"低级"},
                {id:'test8', name: '6', label:"低级"}
            ],
            dataSelect5:[
                {id:'test1', name: '选择项', label:"高级"},
                {id:'test2', name: '单平米', label:"中级"},
                {id:'test3', name: '下级分项',  label:"初级",divider:true},
                {id:'test4', name: '滑动平均滑动平均',label:"低级"},
                {id:'test5', name: '滑动平均滑动平均',label:"低级"}
            ],
            dataSelect6:[
                {id:'test1', name: '选择项',label:"高级", disabled:true},
                {id:'test2', name: '单平米', label:"中级"},
                {id:'test3', classify:'分类一'},
                {id:'test4', name: '下级分项', label:"初级"},
                {id:'test5', classify:'分类二'},
                {id:'test6', name: '滑动平均滑动平均',label:"低级"},
                {id:'test7', name: '滑动平均滑动平均',label:"低级"}
            ],
            dataSelect7: [
                {id:'test1', name: '总量1111',src:src, sub:'测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出'},
                {id:'test2', name: '总量2222',src:src, sub:'测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出'},
                {id:'test3', name: '总量3333',src:src, sub:'测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出'},
                {id:'test4', name: '总量4444',src:src, sub:'测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出'},
            ],
            dataSelect8: [
                {id:'test1', name: '选择项',src:src},
                {id:'test2', name: '总量2222',src:src},
                {id:'test3', name: '总量3333',src:src},
                {id:'test4', name: '总量3333',src:src},
                {id:'test5', name: '总量3333',src:src},
                {id:'test6', name: '总量3333',src:src},
                {id:'test7', name: '总量3333',src:src},
            ],
            
        }
    },
    mounted () {
    },
    methods:{
        testClick (data) {
            console.log(data)
        },
        testConfirm (data) {
        },
        testCancel () {
        },
    },
    watch:{
        testModel(n,o){
            console.log(n,o)
        }
    }
}
</script>


### Attributes

| 参数     |      说明      | 类型    |  默认值  | 必须    |
| -------  |     ----       | ------  | ------- | ------ |
| selectdata     |  下拉框的数据   |   Array |   []    |  Yes     |
| v-model  |    绑定的默认值 | String/Number/Array|   ''    |  Yes     |
| width    |     宽度       | String/Number | 180 | no     |
| caption  |     标题       | String  | ''    | no     | 
| radius   |     圆角       | Boolean | false | no     | 
| disabled |     禁用       | Boolean | false | no     | 
| hideClear|是否隐藏清空图标 | Boolean | false | no     | 
| change   |     点击       | function| ()=>{}| no     | 
| cancel   |     取消       | function| ()=>{}| no     | 
| confirm  |     确认       | function| ()=>{}| no     | 
| focusChange|  select组件下拉列表展开的回调   | function | ()=>{} | no |
| isReadOnly |  input框是否允许输入内容进行数据筛选 | Boolean | false | No |
| transfer |  设置父标签出现滚动条的id  | String |   ''   |  no |
|placeholder | 设置默认占位符 | String | 请选择 | no | 
|isReadOnly | 关闭搜索 | Boolean | false | no | 
| errorText   | 错误提示文本 | String | ''  | no     |
| errorShow   | 错误提示文本显隐状态 | Boolean | false  | no     |
