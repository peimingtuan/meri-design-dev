### PickerMonthDay 月日选择器

### 一、时间点

#### leapYear + placeholder
<PickerMonthDay :date="monthDayNull" :leapYear="true" placeholder="请选择" @change="monthDayChangeNull" />

```vue
<PickerMonthDay :date="monthDayNull" :leapYear="true" placeholder="请选择" @change="monthDayChangeNull" />

monthDayNull: ''
monthDayChangeNull(monthDay) {
    this.monthDayNull = monthDay;
}
```

#### scope
<PickerMonthDay :date="monthDay" scope="01.15-08.19" @change="monthDayChange" />

```vue
<PickerMonthDay :date="monthDay" scope="01.15-08.19" @change="monthDayChange" />

monthDay: '08.07'
monthDayChange(monthDay) {
    this.monthDay = monthDay;
}
```

### 二、时间段

#### range
<PickerMonthDay :date="monthDayNullDouble" :range="true" @change="monthDayChangeDoubleNull" />

```vue
<PickerMonthDay :date="monthDayNullDouble" :range="true" @change="monthDayChangeDoubleNull" />

monthDayNullDouble: ''
monthDayChangeDoubleNull(monthDay) {
    this.monthDayNullDouble = monthDay;
}
```

#### scope + range
<PickerMonthDay :date="monthDayDouble" :range="true" scope="01.15-10.19" @change="monthDayChangeDouble" />

```vue
<PickerMonthDay :date="monthDayDouble" :range="true" scope="01.15-10.19" @change="monthDayChangeDouble" />

monthDayDouble: '03.05-10.11'
monthDayChangeDouble(monthDay) {
    this.monthDayDouble = monthDay;
}
```

<script>
    export default {
        name: "PickerMonthDayView",
        data() {
            return {
                monthDayNull: '',
                monthDay: '08.07',
                monthDayNullDouble: '',
                monthDayDouble: '03.05-10.11',
            }
        },
        methods: {
            monthDayChangeNull(monthDay) {
                console.log('选择的月日::::', monthDay);
                this.monthDayNull=monthDay;
            },
            monthDayChange(monthDay) {
                console.log('选择的月日::::', monthDay);
                this.monthDay=monthDay;
            },
            monthDayChangeDoubleNull(monthDay) {
                console.log('选择的月日::::', monthDay);
                this.monthDayNullDouble=monthDay;
            },
            monthDayChangeDouble(monthDay) {
                console.log('选择的月日::::', monthDay);
                this.monthDayDouble=monthDay;
            },
        }
    }
</script> 


### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| date    | 默认时间 | String | '' | no     |
| scope    | 可选择的时间段 | String | '' | no     |
| leapYear    | 平年还是闰年 | Boolean | false | no     |
| range    | 开启时间段选择器 | Boolean | false | no     |
| disabled    | 禁用点击 | Boolean | false | no     |
| hideClear    | 是否隐藏清除按钮 | Boolean | false | no     |
| placeholder    | 占位符 | String | false | '选择日期'/'开始日期-结束日期'     |
| change    | 提交选中时间回调 | Function | -- | Yes     |
| focusChange    | 时间空间展开的回调 | Function | -- | No     |
| errorText   | 错误提示文本 | String | ''  | no     |
| errorShow   | 错误提示文本显隐状态 | Boolean | false  | no     |
| triggerBorder   | 触发器边框是否显示 | Boolean | true  | no     |
