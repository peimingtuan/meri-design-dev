<template>
  <div class="input-number-view">
     <h3 class="components-title-h3">1.普通数字输入框</h3>
    <div class="input-number-view-item">
      <InputNumber type="normal" :maxLength="5" @focus="inputFocus" @blur="inputBlur" @input="boxInput" @pressEnter="pressEnter" name="persagy"/>
      <InputNumber v-model="val" type="normal" @focus="inputFocus" @blur="inputBlur" @input="boxInput" :disabled="true"/>
      <InputNumber v-model="val" type="normal" @focus="inputFocus" @blur="inputBlur" @input="boxInput" @pressEnter="pressEnter" :error-info="errorMsg"/>
    </div>
     <h3 class="components-title-h3">2.箭头数字输入框</h3>
    <div class="input-number-view-item">
      <InputNumber v-model="val2" precision="2" type="right-arrow"/>
    </div>
     <h3 class="components-title-h3">3.按钮数字输入框</h3>
    <div class="input-number-view-item">
      <InputNumber v-model="val3" type="both-button" :step="10"/>
    </div>

     <h3 class="components-title-h3">4.浮点计算</h3>
    <div class="input-number-view-item">
      <InputNumber v-model="val4" type="both-button" :step="10.561"/>
      <InputNumber v-model="val9" type="right-arrow" :step="10.561"/>
    </div>
     <h3 class="components-title-h3">5.禁用状态</h3>
    <div class="input-number-view-item">
      <InputNumber v-model="val5" type="both-button" :step="1.5" :min="-5" :max="50" @input="boxInput"/>
      <InputNumber v-model="val6" type="right-arrow" :step="1" :min="1" :max="50"/>
      <InputNumber v-model="val7" type="right-arrow" :step="1" :disabled="true"/>
      <InputNumber v-model="val8" type="both-button" :step="1" :disabled="true"/>
    </div>
     <h3 class="components-title-h3">6.自定义宽度</h3>
    <div class="input-number-view-item">
      <InputNumber v-model="val10" type="normal" :width="200"/>
      <InputNumber v-model="val11" type="both-button" :step="1" :width="240"/>
      <InputNumber v-model="val12" type="right-arrow" :step="1" :width="300"/>
    </div>
  </div>
</template>

<script>
export default {
    name: 'InputNumberView',
    data() {
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
            errorMsg: '密码错误！'
        };
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
};
</script>

<style lang="stylus">
  .input-number-view
    padding 16px
    h3
      user-select none
      margin 12px
    .input-number-view-item
      font-size 0

</style>
