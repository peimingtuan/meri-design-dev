### PickerMonth 月选择（业务型）

### 一、单选

#### default + disabled
<PickerMonth :date="date1" :disabled="true" @change="date1Change"/>

```vue
<PickerMonth :date="date1" :disabled="true" @change="date1Change"/>

date1: '2020.04'
date1Change(date) {
    this.date1 = date;
}
```

#### caption + toggle + quickSwitch + hideClear
<PickerMonth :date="date2" caption="标题：" :toggle="true" :quickSwitch="true" :hideClear="true" @change="date2Change"/>

```vue
<PickerMonth :date="date2" caption="标题：" :toggle="true" :quickSwitch="true" :hideClear="true" @change="date2Change"/>

date2: '2020.04'
date2Change(date) {
    this.date2 = date;
}
```

### 一、多选

#### caption + range
<PickerMonth caption="标题：" :range="true"/>

```vue
<PickerMonth caption="标题：" :range="true"/>
```

#### 有默认值 + range + width
<PickerMonth :date="dateRange1" :range="true" width="280" @change="dateRange1Change"/>

```vue
<PickerMonth :date="dateRange1" :range="true" width="280" @change="dateRange1Change"/>

dateRange1: ''
dateRange1Change(date) {
    this.dateRange3 = date;
}
```

#### 锁定周期为12个月 + range + toggle + width + lockCycle
<PickerMonth :date="dateRange2" :range="true" :toggle="true" width="280" :lockCycle="true" @change="dateRange2Change"/>

```vue
<PickerMonth :date="dateRange2" :range="true" :toggle="true" width="280" :lockCycle="true" @change="dateRange2Change"/>

dateRange2: ''
dateRange2Change(date) {
    this.dateRange3 = date;
}
```

#### quickSwitch + toggle + range + width
<PickerMonth :date="dateRange3" :quickSwitch="true" :toggle="true" :range="true" width="280" @change="dateRange3Change"/>

```vue
<PickerMonth :date="dateRange3" :quickSwitch="true" :toggle="true" :range="true" width="280" @change="dateRange3Change"/>

dateRange3: ''
dateRange3Change(date) {
    this.dateRange3 = date;
}
```

#### maxLen
<PickerMonth :date="date2" :toggle="true" :quickSwitch="true" :hideClear="true" maxLen="12" @change="date2Change"/>

```vue
<PickerMonth :date="date2" :toggle="true" :quickSwitch="true" :hideClear="true" maxLen="12" @change="date2Change"/>
date2: '2020.04'
dateRange2Change(date) {
    console.log('dateRange2:::', date);
    this.dateRange2 = date;
}
```

<script>
export default {
    name: 'PickerMonthView',
    data() {
        return {
            date1: '2020.04.05',
            date2: '2020.04.05',
            dateRange1: '',
            dateRange2: '',
            dateRange3: ''
        };
    },
    mounted() {
        setTimeout(() => {
            this.dateRange1 = '2020.04-2020.05';
        }, 3000);
    },
    methods: {
        date1Change(date) {
            console.log('date1:::', date);
            this.date1 = date;
        },
        date2Change(date) {
            console.log('date2:::', date);
            this.date2 = date;
        },
        dateRange1Change(date) {
            console.log('dateRange1:::', date);
            this.dateRange1 = date;
        },
        dateRange2Change(date) {
            console.log('dateRange2:::', date);
            this.dateRange2 = date;
        },
        dateRange3Change(date) {
            console.log('dateRange3:::', date);
            this.dateRange3 = date;
        }
    }
};
</script>



### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| date    | 默认时间 | String | '' | no     |
| quickSwitch    | 是否可快速切换时间 | Boolean | false | no     |
| range    | 开启时间段选择器 | Boolean | false | no     |
| width    | 自定义宽度 | String/Number | '' | no     |
| caption    | 标题 | String | '' | no     |
| hideClear    | 是否隐藏清除按钮 | Boolean | false | no     |
| placeholder    | 占位符 | String | false | '选择日期'     |
| placeholderStart    | 占位符 | String | false | '开始日期'     |
| placeholderEnd    | 占位符 | String | false | '结束日期'     |
| toggle    | 是否显示单/多选切换 | Boolean | false | no    |
| disabled    | 禁用点击 | Boolean | false | no     |
| lockCycle    | 是否锁定时间周期(12个月)【选择时间段有效】 | Boolean | false | no    |
| maxLen    | 选择月份的最大长度 | String/Number | '' | no     |
| change    | 提交选中时间回调 | Function | -- | Yes     |
| errorText   | 错误提示文本 | String | ''  | no     |
| errorShow   | 错误提示文本显隐状态 | Boolean | false  | no     |
| triggerBorder   | 触发器边框是否显示 | Boolean | true  | no     |


::: tip
***如果开启了quickSwitch（可快速切换），caption（标题不生效）***<br>
设置lockCycle之后不支持maxLen<br>
:::
