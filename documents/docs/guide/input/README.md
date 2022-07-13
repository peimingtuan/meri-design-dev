### Input 输入框

<template>
    <div class="input-view">
        <h3>1.普通输入框</h3>
        <div class="input-view-item">
            <Input v-model="inputVal1" placeholder="请搜索" @focus="inputFocus" @blur="inputBlur" @input="boxInput" name="persager" />
        </div>
        <h3>2.带icon</h3>
        <div class="input-view-item">
            <Input iconType="search" v-model="inputVal2" @pressEnter="pressEnter"/>
        </div>
        <h3>3.禁用</h3>
        <div class="input-view-item">
            <Input v-model="inputVal4" :disabled="true"/>
        </div>
        <h3>4.报错</h3>
        <div class="input-view-item">
            <Input v-model="inputVal5" :error-info="errorMsg"/>
        </div>
        <h3>5.左按钮</h3>
        <div class="input-view-item">
            <Input v-model="inputVal6" :left-button="leftButton" @blur="inputBlur" @pressEnter="pressEnter"/>
        </div>
        <h3>6.右按钮</h3>
        <div class="input-view-item">
            <Input v-model="inputVal7" :right-button="rightButton" @blur="inputBlur" @pressEnter="pressEnter"/>
        </div>
        <h3>7.输入框 (自定义宽度)</h3>
        <div class="input-view-item">
            <Input v-model="inputVal7" @blur="inputBlur" @pressEnter="pressEnter" :width="300" iconType="search"/>
        </div>
        <h3>8.type=textarea</h3>
        <div class="input-view-item">
            <Input v-model="inputVal8" type="textarea" @blur="inputBlur" @pressEnter="pressEnter" @focus="inputFocus" :rows="6" :autofocus="false" name="persagy-aera" :max-length="10"/>
        </div>
        <h3>9.type=textarea (禁用)</h3>
        <div class="input-view-item">
            <Input v-model="inputVal9" type="textarea" @blur="inputBlur" @pressEnter="pressEnter" @focus="inputFocus" :disabled="true"/>
        </div>
        <h3>10.type=textarea (报错)</h3>
        <div class="input-view-item">
            <Input v-model="inputVal10" type="textarea" @blur="inputBlur" @pressEnter="pressEnter" @focus="inputFocus" :error-info="errorMsg"/>
        </div>
        <h3>11.type=textarea （自定义宽度）</h3>
        <div class="input-view-item">
            <Input v-model="inputVal11" type="textarea" @blur="inputBlur" @pressEnter="pressEnter" @focus="inputFocus" :width="400"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "InputView",
        data() {
            return {
                leftButton: [{
                    id: '1',
                    name: 'https://',
                    checked: 'checked'
                }],
                rightButton: [{
                    id: '1',
                    name: 'https://',
                    checked: 'checked'
                }],
                errorMsg: '密码错误！',
                inputVal1: '',
                inputVal2: '',
                inputVal4: '',
                inputVal5: '',
                inputVal6: '',
                inputVal7: '',
                inputVal8: '',
                inputVal9: '',
                inputVal10: '',
                inputVal11: ''
            }
        },
        methods: {
            inputFocus(e) {
                console.log('focus', e);
            },
            inputBlur(e) {
                console.log('blur', e);
            },
            boxInput(e) {
                console.log('input', e);
            },
            pressEnter(e) {
                console.log('pressEnter', e);
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .input-view
        padding 16px
        h3
            margin 12px
        .input-view-item
            font-size 0

</style>

### 代码演示

```vue

<template>
    <div class="input-view">
        <h3>1.普通输入框</h3>
        <div class="input-view-item">
            <Input v-model="inputVal" placeholder="请搜索" @focus="inputFocus" @blur="inputBlur" @input="boxInput" name="persager"/>
        </div>
        <h3>2.带icon</h3>
        <div class="input-view-item">
            <Input iconType="search" v-model="inputVal2" @pressEnter="pressEnter"/>
        </div>
        <h3>3.禁用</h3>
        <div class="input-view-item">
            <Input v-model="inputVal4" :disabled="true"/>
        </div>
        <h3>4.报错</h3>
        <div class="input-view-item">
            <Input v-model="inputVal5" :error-info="errorMsg"/>
        </div>
        <h3>5.左按钮</h3>
        <div class="input-view-item">
            <Input v-model="inputVal6" :left-button="leftButton" @blur="inputBlur" @pressEnter="pressEnter"/>
        </div>
        <h3>6.右按钮</h3>
        <div class="input-view-item">
            <Input v-model="inputVal7" :right-button="rightButton" @blur="inputBlur" @pressEnter="pressEnter"/>
        </div>
        <h3>7.输入框 (自定义宽度)</h3>
        <div class="input-view-item">
            <Input v-model="inputVal7" @blur="inputBlur" @pressEnter="pressEnter" :width="300" iconType="search"/>
        </div>
        <h3>8.type=textarea</h3>
        <div class="input-view-item">
            <Input v-model="inputVal8" type="textarea" @blur="inputBlur" @pressEnter="pressEnter" @focus="inputFocus" :rows="6" :autofocus="false" name="persagy-aera" :max-length="10"/>
        </div>
        <h3>9.type=textarea (禁用)</h3>
        <div class="input-view-item">
            <Input v-model="inputVal9" type="textarea" @blur="inputBlur" @pressEnter="pressEnter" @focus="inputFocus" :disabled="true"/>
        </div>
        <h3>10.type=textarea (报错)</h3>
        <div class="input-view-item">
            <Input v-model="inputVal10" type="textarea" @blur="inputBlur" @pressEnter="pressEnter" @focus="inputFocus" :error-info="errorMsg"/>
        </div>
        <h3>11.type=textarea （自定义宽度）</h3>
        <div class="input-view-item">
            <Input v-model="inputVal11" type="textarea" @blur="inputBlur" @pressEnter="pressEnter" @focus="inputFocus" :width="400"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "InputView",
        data() {
            return {
                leftButton: [{
                    id: '1',
                    name: 'https://',
                    checked: 'checked'
                }],
                rightButton: [{
                    id: '1',
                    name: 'https://',
                    checked: 'checked'
                }],
                errorMsg: '密码错误！',
                inputVal: '',
                inputVal2: '',
                inputVal4: '',
                inputVal5: '',
                inputVal6: '',
                inputVal7: '',
                inputVal8: '',
                inputVal9: '',
                inputVal10: '',
                inputVal11: ''
            }
        },
        methods: {
            inputFocus (e) {
                console.log('focus', e);
            },
            inputBlur (e) {
                console.log('blur', e);
            },
            boxInput (e) {
                console.log('input', e);
            },
            pressEnter (e) {
                console.log('pressEnter', e);
            }
        }
    }
</script>

```

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| type    | Input的类型（可选：text,textarea,password） | String | text |   no  |
| name    | 原生name属性 | String | '' |   no   |
| disabled    | 是否禁用 | Boolean | false |    no     |
| autofocus    | 是否自动聚焦 | Boolean | false |   no     |
| maxLength    | 能输入最大字符长度 | Number | 100 |   no     |
| computeNumber    | 是否计算数量 | Boolean | false |   no     |
| v-model    | 输入框值 | String | '' |   yes   |
| placeholder    |  占位符  | String | Please enter |   no     |
| errorInfo    |  错误提示  |  String  |   无   |   no   |
| rightButton    |  右按钮数据  |  Array  |   无   |   no   |
| leftButton    |  左按钮数据  |  Array  |   无   |   no   |
| iconType    |  icon类型(参考Icon组件name)  |  String  |   ''   |   no   |
| rows    |  行数  |  Number  |   4   |   no   |
| width    |  宽度  |  Number  |   0   |   no   |

### events 事件

| 名称     | 说明  | 参数    | 返回值  |
| ------- | ---- | ------ | ------- |
|  focus |  输入框聚焦  |  无  |  输入框值  |
|  blur |  输入框失去焦点  |  无  |  输入框值  |
|  input |  输入框输入  |  无  |  输入框值  |
|  clear |  清理  |  无  |  无  |
|  pressEnter |  输入框按键盘enter  |  无  |  输入框值  |
|  focusChange |  焦点改变事件  |  无  |  焦点返回true，失去焦点返回false  |
