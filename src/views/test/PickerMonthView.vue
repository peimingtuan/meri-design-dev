<template>
    <div class="pickerDate">
         <h3 class="components-title-h3">一、单选</h3>
        <br>
         <h3 class="components-title-h3">default </h3>
        <PickerMonth :date="date1" :disabled="true" @change="date1Change"/>
         <h3 class="components-title-h3">caption+toggle </h3>
        <PickerMonth :date="date2" caption="标题：" :toggle="true" :quickSwitch="true" :hideClear="true" maxLen="12" @change="date2Change"/>
        <br><br>
        <br><br>

         <h3 class="components-title-h3">二、多选</h3>
        <br>
        <PickerMonth caption="标题：" :range="true"/>
         <h3 class="components-title-h3">有默认值 </h3>
        <PickerMonth :date="dateRange1" :range="true" :hideClear="true" width="280" @change="dateRange1Change"/>
         <h3 class="components-title-h3">锁定周期为12个月 </h3>
        <PickerMonth :date="dateRange2" :range="true"
                     :quickSwitch="true"
                     :toggle="true"
                     width="280"
                     :lockCycle="true"
                     :hideClear="true"
                     :errorText="errorText"
                     :errorShow="errorShow"
                     @change="dateRange2Change"
        />
      <!--
         <h3 class="components-title-h3">quickSwitch </h3>
        <PickerMonth :date="dateRange3" :quickSwitch="true" :toggle="true" :range="true" width="280" @change="dateRange3Change"/>
         <h3 class="components-title-h3">maxLen</h3>
        <PickerMonth :date="dateRange4" :range="true" :hideClear="true" width="280" maxLen="10" @change="dateRange1Change"/>
        -->
        <br>
        <br>
        <PickerMonth :date="date2" :toggle="true" :quickSwitch="true" :hideClear="true" maxLen="12" @change="date2Change"/>
        <br>
        <br>
        <br>
        <Button @click="setDateRange2">dateRange2</Button>
    </div>
</template>

<script>
export default {
    name: 'PickerMonthView',
    data() {
        return {
            date1: '2020.04',
            date2: '2020.04',
            dateRange1: '',
            dateRange2: '2019.04-2020.05',
            dateRange3: '',
            dateRange4: '',
            errorText: '错误提示',
            errorShow: true
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
        },
        setDateRange2() {
            this.dateRange2 = '2019.06-2020.07';
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
