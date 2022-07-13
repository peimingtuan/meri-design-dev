<template>
    <div class="component component-padding">
         <h1 class="components-title">PickerTime组件</h1>
         <h3 class="components-title-h3">format="h"</h3>
        <br>
        <PickerTime :time="timeH" format="h" @change="timeChangeH" />
        <br><br>
         <h3 class="components-title-h3">format="hm"</h3>
        <br>
        <PickerTime :time="timeHm" format="hm" scopeTime="10:01:29-20:30:49" @change="timeChangeHm" />
<!--        <PickerTime :time="timeHm" format="hm" @change="timeChangeHm" />-->
        <br><br>
         <h3 class="components-title-h3">format="hms"</h3>
        <br>
        <PickerTime :time="timeHms" format="hms" scopeTime="10:01:29-20:30:49" :hideClear="true" placeholder="请选择" @change="timeChangeHms" />
        <br><br>

         <h3 class="components-title-h3">format="h"</h3>
        <br>
        <PickerTime :time="timeHDouble" format="h" :range="true" @change="timeChangeHDouble" />
        <br><br>
         <h3 class="components-title-h3">format="hm"</h3>
        <br>
        <PickerTime :time="timeHmDouble" format="hm" :range="true" @change="timeChangeHmDouble" />
        <br><br>
         <h3 class="components-title-h3">format="hms"</h3>
        <br>
        <PickerTime :time="timeHmsDouble" format="hms" scopeTime="10:01:29-20:30:49" :range="true"
                    :hideClear="true"
                    :errorText="errorText"
                    :errorShow="errorShow"
                    placeholder="开始-结束" @change="timeChangeHmsDouble"/>
        <br><br>
        <!--
         <h3 class="components-title-h3">"PickerTimeEndOf24"</h3>
        <br>
        <PickerTimeEndOf24
                :time="timeEnd24HmDouble"
                :range="true"
                :hideClear="true"
                :scopes="scopes"
                placeholderStart="开始"
                placeholderEnd="结束"
                @change="timeEnd24ChangeHmsDouble"
        />
        <br><br>
        -->
         <h3 class="components-title-h3">"PickerTime2400"</h3>
        <br>
        <PickerTime2400
                format="hm"
                :time="timeEnd2400HmDouble"
                :range="true"
                :hideClear="true"
                @change="timeEnd2400ChangeHmDouble"
        />
        <br><br>
    </div>
</template>

<script>
export default {
    name: 'PickerTimeView',
    data() {
        return {
            timeH: '08',
            timeHm: '10:09',
            timeHms: '',
            timeHDouble: '',
            timeHmDouble: '',
            timeHmsDouble: '11:09:31-13:14:42',
            timeEnd24HmDouble: '',
            timeEnd2400HmDouble: '',
            scopes: [],
            errorText: '错误提示',
            errorShow: true
        };
    },
    mounted() {
        // setTimeout(() => {
        //     this.timeHm = '08:09';
        // }, 3000);
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
            // this.timeEnd24HmDouble = time;
        }
    }
};
</script>

<style lang="stylus" scoped>

.component-padding
    padding-bottom 200px !important
    width 240px

</style>
