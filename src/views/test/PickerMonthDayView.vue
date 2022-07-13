<template>
    <div class="component component-padding">
         <h1 class="components-title">PickerMonthDay组件</h1>
         <h3 class="components-title-h3">时间点</h3>
        <br>
        <PickerMonthDay :date="monthDayNull" :leapYear="true" placeholder="请选择" :triggerBorder="false" @change="monthDayChangeNull" />
        <br><br>
        <PickerMonthDay :date="monthDay" scope="01.15-08.19" @change="monthDayChange" />
        <br><br>

         <h3 class="components-title-h3">时间段</h3>
        <br>
        <PickerMonthDay :date="monthDayNullDouble" :range="true" @change="monthDayChangeDoubleNull" />
        <br><br>
        <PickerMonthDay :date="monthDayDouble"
                        :range="true"
                        :hideClear="true"
                        scope="01.15-10.19"
                        :errorText="errorText"
                        :errorShow="errorShow"
                        @change="monthDayChangeDouble"
        />
    </div>
</template>

<script>
export default {
    name: 'PickerMonthDayView',
    data() {
        return {
            monthDayNull: '',
            monthDay: '08.07',
            monthDayNullDouble: '',
            monthDayDouble: '03.05-10.11',
            errorText: '错误提示',
            errorShow: true
        };
    },
    methods: {
        monthDayChangeNull(monthDay) {
            console.log('选择的月日::::', monthDay);
            this.monthDayNull = monthDay;
        },
        monthDayChange(monthDay) {
            console.log('选择的月日::::', monthDay);
            this.monthDay = monthDay;
        },
        monthDayChangeDoubleNull(monthDay) {
            console.log('选择的月日::::', monthDay);
            this.monthDayNullDouble = monthDay;
        },
        monthDayChangeDouble(monthDay) {
            console.log('选择的月日::::', monthDay);
            this.monthDayDouble = monthDay;
        }
    }
};
</script>

<style lang="stylus" scoped>

.component-padding
    padding-bottom 200px !important
    width 240px

</style>
