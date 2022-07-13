### InputNumber 数字输入框

<template>
  <div class="input-number-view">
    <h3>1.普通数字输入框</h3>
    <div class="input-number-view-item">
      <InputNumber  type="normal" @focus="inputFocus" @blur="inputBlur" @input="boxInput" name="persagy" :max-length="10" :autofocus="true"/>
      <InputNumber v-model="val" type="normal" @focus="inputFocus" @blur="inputBlur" @input="boxInput" :disabled="true"/>
      <InputNumber v-model="val" type="normal" @focus="inputFocus" @blur="inputBlur" @input="boxInput" :error-info="errorMsg"/>
    </div>
    <h3>2.箭头数字输入框</h3>
    <div class="input-number-view-item">
      <InputNumber v-model="val2" type="right-arrow"/>
    </div>
    <h3>3.按钮数字输入框</h3>
    <div class="input-number-view-item">
      <InputNumber v-model="val3" type="both-button" :step="10"/>
    </div>
    <h3>4.浮点计算</h3>
    <div class="input-number-view-item">
      <InputNumber v-model="val4" type="both-button" :step="10.561"/>
      <InputNumber v-model="val9" type="right-arrow" :step="10.561"/>
    </div>
    <h3>5.禁用状态</h3>
    <div class="input-number-view-item">
      <InputNumber v-model="val5" type="both-button" :step="1.5" :min="-5" :max="50" @input="boxInput"/>
      <InputNumber v-model="val6" type="right-arrow" :step="1" :min="1" :max="50"/>
      <InputNumber v-model="val7" type="right-arrow" :step="1" :disabled="true"/>
      <InputNumber v-model="val8" type="both-button" :step="1" :disabled="true"/>
    </div>
    <h3>6.自定义宽度</h3>
    <div class="input-number-view-item">
      <InputNumber v-model="val10" type="normal" :width="200"/>
      <InputNumber v-model="val11" type="both-button" :step="1" :width="240"/>
      <InputNumber v-model="val12" type="right-arrow" :step="1" :width="300"/>
    </div>
  </div>
</template>

<script>
    export default {
        name: "InputNumberView",
        data () {
            return {
                val: 0,
                val2: 2,
                val3: 3,
                val4: 3.311,
                val5: 1,
                val6: 2,
                val7: 1,
                val8: 1,
                val9: 5.26,
                val10: 5.26,
                val11: 6.26,
                val12: 7.26,
                errorMsg: '密码错误！',
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
        }
    }
</script>

<style lang="stylus">
  .input-number-view
    padding 16px
    h3
      margin 12px
    .input-number-view-item
      font-size 0

</style>


### 代码演示

```vue

<template>
  <div class="input-number-view">
    <h3>1.普通数字输入框</h3>
    <div class="input-number-view-item">
      <InputNumber  type="normal" @focus="inputFocus" @blur="inputBlur" @input="boxInput" name="persagy" :max-length="10" :autofocus="true"/>
      <InputNumber v-model="val" type="normal" @focus="inputFocus" @blur="inputBlur" @input="boxInput" :disabled="true"/>
      <InputNumber v-model="val" type="normal" @focus="inputFocus" @blur="inputBlur" @input="boxInput" :error-info="errorMsg"/>
    </div>
    <h3>2.箭头数字输入框</h3>
    <div class="input-number-view-item">
      <InputNumber v-model="val2" type="right-arrow"/>
    </div>
    <h3>3.按钮数字输入框</h3>
    <div class="input-number-view-item">
      <InputNumber v-model="val3" type="both-button" :step="10"/>
    </div>
    <h3>4.浮点计算</h3>
    <div class="input-number-view-item">
      <InputNumber v-model="val4" type="both-button" :step="10.561"/>
      <InputNumber v-model="val9" type="right-arrow" :step="10.561"/>
    </div>
    <h3>5.禁用状态</h3>
    <div class="input-number-view-item">
      <InputNumber v-model="val5" type="both-button" :step="1.5" :min="-5" :max="50" @input="boxInput"/>
      <InputNumber v-model="val6" type="right-arrow" :step="1" :min="1" :max="50"/>
      <InputNumber v-model="val7" type="right-arrow" :step="1" :disabled="true"/>
      <InputNumber v-model="val8" type="both-button" :step="1" :disabled="true"/>
    </div>
    <h3>6.自定义宽度</h3>
    <div class="input-number-view-item">
      <InputNumber v-model="val10" type="normal" :width="200"/>
      <InputNumber v-model="val11" type="both-button" :step="1" :width="240"/>
      <InputNumber v-model="val12" type="right-arrow" :step="1" :width="300"/>
    </div>
  </div>
</template>

<script>
    export default {
        name: "InputNumberView",
        data () {
            return {
                val: 0,
                val2: 2,
                val3: 3,
                val4: 3.311,
                val5: 1,
                val6: 2,
                val7: 1,
                val8: 1,
                val9: 5.26,
                val10: 5.26,
                val11: 6.26,
                val12: 7.26,
                errorMsg: '密码错误！',
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
        }
    }
</script>

```

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| type    | InputNumber的类型（可选： 普通/normal，带左右按钮/both-button，带箭头按钮/right-arrow） | String | normal |   no  |
| name    | 原生属性 | String | '' |   no   |
| disabled    | 是否禁用 | Boolean | false | no     |
| autofocus    | 是否自动聚焦 | Boolean | false | no     |
| maxLength    | 能输入最大字符长度 | Number | 100 | no     |
| v-model    | 输入框值 | Number | 0 |   no   |
| placeholder    |  占位符  | String | Enter the number | no     |
| min    |  最小值  |  Number  |   无   |   no   |
| max    |  最大值  |  Number  |   无   |   no   |
| errorInfo    |  错误提示  |  Number  |   无   |   no   |
| step    |  步长  |  Number  |   1   |   no   |
| width    |  宽度  |  Number  |   0   |   no   |
| precision    |  数值精度  |  Number  |   -1   |   no   |
