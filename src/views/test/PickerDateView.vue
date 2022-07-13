<template>
    <div class="pickerDate">
        <h3 class="components-title-h3">一、单选</h3>
        <br>
        <h3 class="components-title-h3">caption </h3>
        <PickerDate :caption="caption" @focusChange="focusChange"/>
        <h3 class="components-title-h3">有默认值 </h3>
        <PickerDate :date="date1" :panel="panel" @change="date1Change"/>
        <Button type="primary" @click="pickerHandle">picker</Button>

        <h3 class="components-title-h3">picker=['day', 'month', 'year'] </h3>
        <PickerDate :picker="['day', 'month', 'year']" placeholder="请选择xx日期"/>
        <h3 class="components-title-h3">picker=['month', 'year'] </h3>
        <PickerDate :date="yearMonthDate" :toggle="true" :picker="['year', 'month']" @change="yearMonthDateChange"/>
        <h3 class="components-title-h3">picker=day </h3>
        <PickerDate picker="day"/>
        <h3 class="components-title-h3">picker=week </h3>
        <PickerDate picker="week" :scope="scope3" :date="timeModel" sort="week" :thTextWeek="thTextWeek" @change="changeWeekDate"/>
        <h3 class="components-title-h3">[时间点时间段]切换+quickSwitch </h3>
        <!--<PickerDate :date="date2" panel="month" :quickSwitch="true" :toggle="true" scope="2020.08.08 08:10:30-2020.08.26 20:10:20" @change="date2Change"/>-->
        <!--<PickerDate :date="date2" panel="month" :quickSwitch="true" :toggle="true" @change="date2Change"/>-->
        <PickerDate :date="date2" panel="month" :toggle="true" @change="date2Change"/>
        <h3 class="components-title-h3">带选择时间 </h3>
        <PickerDate :date="date3" format="hms" width="220" @change="date3Change"/>
        <h3 class="components-title-h3">带选择时间+hms+scope </h3>
        <PickerDate :date="date4" format="hms" width="190" scope="2020.04.04 08:10:30-2020.06.17 20:10:20" @change="date4Change"/>
        <br><br>
        <br><br>

        <h3 class="components-title-h3">二、多选</h3>
        <br>
        <PickerDate caption="标题：" :range="true"/>
        <h3 class="components-title-h3">picker=week </h3>
        <PickerDate caption="标题：" :range="true" picker="week"/>
        <h3 class="components-title-h3">有默认值 </h3>
        <PickerDate :date="dateRange1" :panel="panel" :range="true" width="280" @change="dateRange1Change"/>
        <Button type="primary" @click="pickerHandle">picker</Button>
        <h3 class="components-title-h3">[时间点时间段]切换+锁定周期+format </h3>
        <PickerDate
            :date="dateRange2"
            :range="true"
            :toggle="true"
            :lockCycle="true"
            :hideClear="true"
            format="hm"
            width="320"
            @change="dateRange2Change"
        />
        <h3 class="components-title-h3">[时间点时间段]切换+placeholder+scope </h3>
        <PickerDate :date="dateRange3"
                    :range="true"
                    :toggle="true"
                    width="400"
                    placeholder="请选择"
                    placeholderStart="入库开始日期"
                    placeholderEnd="入库结束日期"
                    @change="dateRange3Change"
        />
        <h3 class="components-title-h3">caption+scope </h3>
        <PickerDate :date="dateRange4"
                    :range="true"
                    :toggle="true"
                    format="hm"
                    width="400"
                    :scope="scope"
                    @change="dateRange4Change"
        />
        <h3 class="components-title-h3">锁定周期 </h3>
        <PickerDate :date="dateRange5"
                    :range="true"
                    :lockCycle="true"
                    sort="month"
                    width="300"
                    @change="dateRange5Change"
        />
        <h3 class="components-title-h3">quickSwitch </h3>
        <PickerDate :date="dateRange6"
                    :range="true"
                    :quickSwitch="true"
                    sort="month"
                    width="300"
                    :scope="scope2"
                    @change="dateRange6Change"
        />
    </div>
</template>

<script>
export default {
    name: 'PickerDateView',
    data() {
        return {
            panel: 'day',
            date1: '',
            date2: '2020.04.05',
            // date2: '2020.04',
            date3: '2020.04.05 10:12:16',
            date4: '',
            dateRange1: '2020.05.04-2020.05.10',
            // dateRange1: '',
            dateRange2: '2020.05.22 10:12-2020.05.22 18:30',
            dateRange3: '',
            dateRange4: '2020.06.10 00:00-2020.06.16 15:52',
            dateRange5: '',
            dateRange6: '',
            scope: '2020.03.19 15:52-2020.06.16 15:52',
            scope2: '2019.03.19 15:52-2020.08.25 15:52',
            caption: '标题：',
            yearMonthDate: '2020.05',
            //scope3:'1900.01.01-2022.07.15',
            // timeModel:'2022.07.11-2022.07.17'
        };
    },
    computed:{
        /**
         * 当前是第几周
         */
        thTextWeek(){
            const year=new Date().getFullYear()
            const Month=new Date().getMonth()+1
            const month=Month>9?Month:`0${Month}`
            const day=new Date().getDate()
            const firstDay = new Date(year, Number(month) - 1, 1); // 当月第一天
            const dayOfWeek = firstDay.getDay()===1?0:1; // 当前月第一天是星期几
            return `${year}.${month}第0${Math.ceil(day/7)+dayOfWeek}周`
        },
        /**
         * 当前周日是几号
         */
        timeModel(){
            const year=new Date().getFullYear()
            const Month=new Date().getMonth()+1
            const month=Month>9?Month:`0${Month}`
            const day=new Date().getDate()
            const weekStudy=new Date().getDay() //当前周几
            const Start=weekStudy===0?(day-6):(day-weekStudy+1)
            const start=Start>9?Start:`0${Start}`
            const End=weekStudy===0?day:(7-weekStudy+day)
            const end=End>9?End:`0${End}`
            return `${year}.${month}.${start}-${year}.${month}.${end}`
        },
        /**
         * 区间范围
         */
        scope3(){
            const year=new Date().getFullYear()
            const Month=new Date().getMonth()+1
            const month=Month>9?Month:`0${Month}`
            const day=new Date().getDate()
            const weekStudy=new Date().getDay() //当前周几
            const End=weekStudy===0?day:(7-weekStudy+day)
            const end=End>9?End:`0${End}`
            return `1900.01.01-${year}.${month}.${end}`
        }
    },
    mounted() {
        setTimeout(() => {
            this.date1 = '2020.05.05';
        }, 3000);
        console.log("timeModel:",this.timeModel)
    },
    methods: {
        yearMonthDateChange(date) {
            this.yearMonthDate = date;
        },
        pickerHandle() {
            this.panel = 'week';
            // this.dateRange1 = '2020.06.01-2020.06.07';
            this.dateRange1 = '2020.06.01-2020.06.21';
        },
        focusChange(focus) {
            console.log('focusChange:::', focus);
        },
        date1Change(date, tabKey, th) {
            console.log('date1:::', date);
            console.log('tabKey:::', tabKey);
            console.log('th:::', th);
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
        dateRange1Change(date, tabKey, th) {
            console.log('dateRange1:::', date);
            console.log('tabKey:::', tabKey);
            console.log('th:::', th);
            this.dateRange1 = date;
            // setTimeout(() => {
            //     this.dateRange1 = '2020.04.05-2020.04.06';
            // }, 3000);
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
        },
        changeWeekDate(data){
            console.log("data:",data)
        }
    }
};
</script>

<style lang="stylus" scoped>
.pickerDate
    padding 40px
.pickerDateTitle
    margin-top 36px
    margin-bottom 12px

</style>
