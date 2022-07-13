### PickerTime 时分秒选择

### 时间点

#### format="h"
<PickerTime :time="timeH" format="h" @change="timeChangeH" />

```vue
<PickerTime :time="timeH" format="h" @change="timeChangeH" />

timeH: '08'
timeChangeH(time) {
    this.timeH = time;
}
```

#### format="hm" + scopeTime
<PickerTime :time="timeHm" format="hm" scopeTime="10:01:29-20:30:49" @change="timeChangeHm" />

```vue
<PickerTime :time="timeHm" format="hm" scopeTime="10:01:29-20:30:49" @change="timeChangeHm" />

timeHm: '10:09'
timeChangeHm(time) {
    this.timeHm = time;
}
```

#### format="hms" + scopeTime + hideClear + placeholder
<PickerTime :time="timeHms" format="hms" scopeTime="10:01:29-20:30:49" :hideClear="true" placeholder="请选择" @change="timeChangeHms" />

```vue
<PickerTime :time="timeHms" format="hms" scopeTime="10:01:29-20:30:49" :hideClear="true" placeholder="请选择" @change="timeChangeHms" />

timeHms: ''
timeChangeHms(time) {
    this.timeHms = time;
}
```

### 时间段

#### format="h" + range
<PickerTime :time="timeHDouble" format="h" :range="true" @change="timeChangeHDouble" />

```vue
<PickerTime :time="timeHDouble" format="h" :range="true" @change="timeChangeHDouble" />

timeHDouble: ''
timeChangeHDouble(time) {
    this.timeHDouble = time;
}
```

#### format="hm" + range
<PickerTime :time="timeHmDouble" format="hm" :range="true" @change="timeChangeHmDouble" />

```vue
<PickerTime :time="timeHmDouble" format="hm" :range="true" @change="timeChangeHmDouble" />

timeHmDouble: ''
timeChangeHmDouble(time) {
    this.timeHmDouble = time;
}
```

#### format="hms" + scopeTime + range + hideClear + placeholder
<PickerTime :time="timeHmsDouble" format="hms" scopeTime="10:01:29-20:30:49" :range="true" :hideClear="true" placeholder="开始-结束" @change="timeChangeHmsDouble" />

```vue
<PickerTime :time="timeHmsDouble" format="hms" scopeTime="10:01:29-20:30:49" :range="true" :hideClear="true" placeholder="开始-结束" @change="timeChangeHmsDouble" />

timeHmsDouble: '11:09:31-13:14:42'
timeChangeHmsDouble(time) {
    this.timeHmsDouble = time;
}
```

<script>
export default {
    name: 'PickerTimeView',
    data() {
        return {
            timeH: '08',
            timeHm: '08:09',
            timeHms: '',
            timeHDouble: '',
            timeHmDouble: '',
            timeHmsDouble: '11:09:31-13:14:42',
            timeEnd24HmDouble: '',
            timeEnd2400HmDouble: '',
            scopes: []
        };
    },
    methods: {
        timeChangeH(time) {
            console.log('选择的时分::::', time);
            this.timeH = time;
        },
        timeChangeHm(time) {
            console.log('选择的时分::::', time);
            this.timeHm = time;
        },
        timeChangeHms(time) {
            console.log('选择的时分秒::::', time);
            this.timeHms = time;
        },
        timeChangeHDouble(time) {
            console.log('选择的时分秒::::', time);
            this.timeHDouble = time;
        },
        timeChangeHmDouble(time) {
            console.log('选择的时分秒::::', time);
            this.timeHmDouble = time;
        },
        timeChangeHmsDouble(time) {
            console.log('选择的时分秒::::', time);
            this.timeHmsDouble = time;
        },
        timeEnd24ChangeHmsDouble(time) {
            console.log('选择的时分秒::::', time);
            // this.timeEnd24HmDouble = time;
            this.scopes = [time];
        },
        timeEnd2400ChangeHmDouble(time) {
            console.log('选择的时分秒::::', time);
            // this.timeEnd2400HmDouble = time;
        }
    }
};
</script>


### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| time    | 时间 | String | '' | no     |
| format    | 时分秒格式可选值【h/hm/hms】 | String | 'hms' | no     |
| scopeTime    | 可选择的时间段 | String | '' | no     |
| range    | 开启时间段选择器 | Boolean | false | no     |
| disabled    | 禁用点击 | Boolean | false | no     |
| hideClear    | 是否隐藏清除按钮 | Boolean | false | no     |
| placeholder    | 占位符 | String | false | '选择时间'/'开始时间-结束时间'     |
| change    | 提交选中时间回调 | Function | -- | Yes     |
| focusChange    | 时间空间展开的回调 | Function | -- | No     |
| errorText   | 错误提示文本 | String | ''  | no     |
| errorShow   | 错误提示文本显隐状态 | Boolean | false  | no     |
| triggerBorder   | 触发器边框是否显示 | Boolean | true  | no     |
