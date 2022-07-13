<template>
    <div class="datePicker">
         <h3 class="components-title-h3">一、单选</h3>
        <br>
        <DatePicker/>
        <br><br>
        <DatePicker :date="date1" @change="date1Change"/>
        <br><br>
         <h3 class="components-title-h3">picker=['day', 'month', 'year']</h3>
        <br>
        <DatePicker :picker="['day', 'month', 'year']" placeholder="请选择xx日期"/>
        <br><br>
         <h3 class="components-title-h3">picker=['month', 'year']</h3>
        <br>
        <DatePicker :picker="['month', 'year']"/>
        <br><br>
         <h3 class="components-title-h3">picker=day</h3>
        <br>
        <DatePicker picker="day"/>
        <br><br>
         <h3 class="components-title-h3">[时间点时间段]切换+quickSwitch</h3>
        <br>
        <DatePicker :date="date2" :quickSwitch="true" :toggle="true" @change="date2Change"/>
        <br><br>
         <h3 class="components-title-h3">带选择时间</h3>
        <br>
        <DatePicker :date="date3" format="hms" width="190" @change="date3Change"/>
        <br><br>
         <h3 class="components-title-h3">带选择时间+hms+scope</h3>
        <br>
        <DatePicker :date="date4" format="hms" width="190" scope="2020.04.04 08:10:30-2020.06.17 20:10:20" @change="date4Change"/>
        <br><br>
        <br><br>

         <h3 class="components-title-h3">二、多选</h3>
        <br>
        <DatePicker :range="true"/>
        <br><br>
        <DatePicker :date="dateRange1" :range="true" width="280" @change="dateRange1Change"/>
        <br><br>
         <h3 class="components-title-h3">[时间点时间段]切换+锁定周期+format</h3>
        <br>
        <DatePicker
                :date="dateRange2"
                :range="true"
                :toggle="true"
                :lockCycle="true"
                format="hm"
                width="320"
                @change="dateRange2Change"
        />
        <br><br>
         <h3 class="components-title-h3">[时间点时间段]切换+placeholder+scope</h3>
        <br>
        <DatePicker :date="dateRange3"
                    :range="true"
                    :toggle="true"
                    sort="month"
                    format="hm"
                    scope="2020.04.04 08:10-2020.06.17 20:10"
                    width="400"
                    caption="入库日期："
                    placeholder="请选择"
                    placeholderStart="入库开始日期"
                    placeholderEnd="入库结束日期"
                    @change="dateRange3Change"
        />
        <br><br>
         <h3 class="components-title-h3">锁定周期</h3>
        <br>
        <DatePicker :date="dateRange4"
                    :range="true"
                    :lockCycle="true"
                    sort="month"
                    width="300"
                    @change="dateRange4Change"
        />
    </div>
</template>

<script>
export default {
    name: 'DatePickerView',
    data() {
        return {
            date1: '2020.04.05',
            date2: '2020.04.05',
            date3: '2020.04.05 10:12:16',
            date4: '',
            dateRange1: '',
            dateRange2: '2020.04.05 10:12-2020.05.20 18:30',
            dateRange3: '',
            dateRange4: ''
        };
    },
    mounted() {
        setTimeout(() => {
            this.dateRange1 = '2020.04.05-2020.05.20';
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
        }
    }
};
</script>

<style lang="stylus" scoped>
.datePicker
    padding 40px

</style>
