### PickerDate 日期选择

### 一、时间点选择

#### caption
<PickerDate caption="标题："/>

```vue
<PickerDate caption="标题："/>
```
 
#### 有默认值
<PickerDate :date="date1" @change="date1Change"/>

```vue
<PickerDate :date="date1" @change="date1Change"/>

date1: '2020.04.05'
date1Change(date) {
    this.date1 = date;
}
```

#### picker=['day', 'month', 'year']
<PickerDate :picker="['day', 'month', 'year']" placeholder="请选择xx日期"/>

```vue
<PickerDate :picker="['day', 'month', 'year']" placeholder="请选择xx日期"/>
```

#### picker=['month', 'year']
<PickerDate :picker="['month', 'year']"/>

```vue
<PickerDate :picker="['month', 'year']"/>
```

#### picker=day
<PickerDate picker="day"/>

```vue
<PickerDate picker="day"/>
```

#### [时间点时间段]切换+quickSwitch
<PickerDate :date="date2" :quickSwitch="true" :toggle="true" @change="date2Change"/>

```vue
<PickerDate :date="date2" :quickSwitch="true" :toggle="true" @change="date2Change"/>

date2: '2020.04.05'
date2Change(date) {
    this.date2 = date;
}
```

#### 带选择时间
<PickerDate :date="date3" format="hms" width="190" @change="date3Change"/>

```vue
<PickerDate :date="date3" format="hms" width="190" @change="date3Change"/>

date3: '2020.04.05 10:12:16'
date3Change(date) {
    console.log('date3:::', date);
    this.date3 = date;
}
```

#### 带选择时间+hms+scope
<PickerDate :date="date4" format="hms" width="190" scope="2020.04.04 08:10:30-2020.06.17 20:10:20" @change="date4Change"/>

```vue
<PickerDate :date="date4" format="hms" width="190" scope="2020.04.04 08:10:30-2020.06.17 20:10:20" @change="date4Change"/>

date4: ''
date4Change(date) {
    console.log('date4:::', date);
    this.date4 = date;
}
```

### 二、多选

#### caption
<PickerDate caption="标题：" :range="true"/>

```vue
<PickerDate caption="标题：" :range="true"/>
```

#### 有默认值
<PickerDate :date="dateRange1" :range="true" width="280" @change="dateRange1Change"/>

```vue
<PickerDate :date="dateRange1" :range="true" width="280" @change="dateRange1Change"/>

dateRange1: ''
dateRange1Change(date) {
    console.log('dateRange1:::', date);
    this.dateRange1 = date;
}
```

#### [时间点时间段]切换+锁定周期+format
<PickerDate
        :date="dateRange2"
        :range="true"
        :toggle="true"
        :lockCycle="true"
        format="hm"
        width="320"
        @change="dateRange2Change"
/>

```vue
<PickerDate
        :date="dateRange2"
        :range="true"
        :toggle="true"
        :lockCycle="true"
        format="hm"
        width="320"
        @change="dateRange2Change"
/>

dateRange2: '2020.04.05 10:12-2020.05.20 18:30'
dateRange2Change(date) {
    this.dateRange2 = date;
}
```

#### [时间点时间段]切换+placeholder+scope
<PickerDate :date="dateRange3"
            :range="true"
            :toggle="true"
            width="400"
            placeholder="请选择"
            placeholderStart="入库开始日期"
            placeholderEnd="入库结束日期"
            @change="dateRange3Change"
/>

```vue
<PickerDate :date="dateRange3"
            :range="true"
            :toggle="true"
            width="400"
            placeholder="请选择"
            placeholderStart="入库开始日期"
            placeholderEnd="入库结束日期"
            @change="dateRange3Change"
/>

dateRange3: ''
dateRange3Change(date) {
    this.dateRange3 = date;
}
```

#### caption+scope
<PickerDate :date="dateRange4"
            :range="true"
            :toggle="true"
            format="hm"
            width="400"
            scope="2020.04.04 08:10-2020.06.17 20:10"
            @change="dateRange4Change"
/>

```vue
<PickerDate :date="dateRange4"
            :range="true"
            :toggle="true"
            format="hm"
            width="400"
            scope="2020.04.04 08:10-2020.06.17 20:10"
            @change="dateRange4Change"
/>

dateRange4: ''
dateRange4Change(date) {
    this.dateRange4 = date;
}
```

#### 锁定周期
<PickerDate :date="dateRange5"
            :range="true"
            :lockCycle="true"
            sort="month"
            width="300"
            @change="dateRange5Change"
/>

```vue
<PickerDate :date="dateRange5"
            :range="true"
            :lockCycle="true"
            sort="month"
            width="300"
            @change="dateRange5Change"
/>

dateRange5: ''
dateRange5Change(date) {
    this.dateRange5 = date;
}
```

#### quickSwitch
<PickerDate :date="dateRange6"
            :range="true"
            :quickSwitch="true"
            sort="month"
            width="300"
            @change="dateRange6Change"
/>

```vue
<PickerDate :date="dateRange6"
            :range="true"
            :quickSwitch="true"
            sort="month"
            width="300"
            @change="dateRange6Change"
/>

dateRange6: ''
dateRange6Change(date) {
    this.dateRange6 = date;
}
```

<script>
export default {
    name: 'PickerDateView',
    data() {
        return {
            date1: '',
            date2: '2020.04.05',
            date3: '2020.04.05 10:12:16',
            date4: '',
            dateRange1: '',
            dateRange2: '2020.05.22 10:12-2020.05.22 18:30',
            dateRange3: '',
            dateRange4: '',
            dateRange5: '',
            dateRange6: ''
        };
    },
    mounted() {
        setTimeout(() => {
            this.date1 = '2020.05.05';
        }, 3000);
    },
    methods: {
        focusChange(focus) {
            console.log('focusChange:::', focus);
        },
        date1Change(date) {
            console.log('date1:::', date);
            this.date1 = date;
        },
        date2Change(date) {
            console.log('date2:::', date);
            this.date2 = date;
        },
        date3Change(date) {
            console.log('date3:::', date);
            this.date3 = date;
        },
        date4Change(date) {
            console.log('date4:::', date);
            this.date4 = date;
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
        },
        dateRange4Change(date) {
            console.log('dateRange4:::', date);
            this.dateRange4 = date;
        },
        dateRange5Change(date) {
            console.log('dateRange5:::', date);
            this.dateRange5 = date;
        },
        dateRange6Change(date) {
            console.log('dateRange6:::', date);
            this.dateRange6 = date;
        }
    }
};
</script>

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| date    | 默认时间 | String | '' | no     |
| panel    | 显示面板，可选值【day、week、month、year】 | String | day或picker[0] | no     |
| scope    | 可选择的时间段 | String | '' | no     |
| format    | 时分秒格式可选值【h/hm/hms】 | String | 'hms' | no     |
| picker    | 时间选择器类型，可选值【day/week/month/year】 | String | '' | no     |
| sort    | 周选择器的排序方式，可选值【month/year】 | String | year | no     |
| quickSwitch    | 是否可快速切换时间 | Boolean | false | no     |
| range    | 开启时间段选择器 | Boolean | false | no     |
| disabled    | 禁用点击 | Boolean | false | no     |
| width    | 自定义宽度 | String/Number | '' | no     |
| caption    | 标题 | String | '' | no     |
| hideClear    | 是否隐藏清除按钮 | Boolean | false | no     |
| placeholder    | 占位符 | String | false | '选择日期'/'开始日期-结束日期'     |
| toggle    | 是否显示单/多选切换 | Boolean | false | no    |
| lockCycle    | 是否显示锁定时间周期【选择时间段有效】 | Boolean | false | no    |
| change    | 提交选中时间回调，返回选中的日期和日期粒度、当日期粒度为week时，会返回选中的周，否则返回false | Function | -- | Yes     |
| focusChange    | 时间组件展开的回调 | Function | -- | No     |
| errorText   | 错误提示文本 | String | ''  | no     |
| errorShow   | 错误提示文本显隐状态 | Boolean | false  | no     |
| triggerBorder   | 触发器边框是否显示 | Boolean | true  | no     |


::: tip
***如果开启了scope（可选择的时间段），lockCycle（锁定周期不生效）***<br>
***如果开启了quickSwitch（可快速切换），caption（标题不生效）***<br>
:::

::: danger 警告
    绑定的date中不要有空格
:::
