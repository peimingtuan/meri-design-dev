<template>
    <div class="pickerDate">
         <h3 class="components-title-h3">一、单选</h3>
        <br>
        <PickerDate :triggerBorder="false"/>
        <PickerDate :range="true" :triggerBorder="false"/>
        <br><br><br><br>
        <PickerDate
            :date='dateRange1'
            caption='操作时间：'
            :range='true'
            :panel='panel'
            :toggle='true'
            :lockCycle='true'
            width='320'
            @change='dateRange4Change'
            :errorText="errorText"
            :errorShow="errorShow"
        />
    </div>
</template>

<script>
export default {
    name: 'PickerDateView',
    data() {
        return {
            panel: 'day',
            date1: '2020.04.05',
            date2: '2020.04.05',
            // date2: '2020.04',
            date3: '2020.04.05 10:12:16',
            date4: '',
            // dateRange1: '2020.05-2020.10',
            dateRange1: '',
            dateRange2: '2020.05.22 10:12-2020.05.22 18:30',
            dateRange3: '',
            dateRange4: '2020.06.10 00:00-2020.06.16 15:52',
            dateRange5: '',
            dateRange6: '',
            scope: '2020.03.19 15:52-2020.06.16 15:52',
            scope2: '2019.03.19 15:52-2020.08.25 15:52',
            caption: '标题：',
            errorText: '错误提示',
            errorShow: true
        };
    },
    mounted() {
        setTimeout(() => {
            this.date1 = '2020.05.05';
        }, 3000);
    },
    methods: {
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
            // this.panel = 'month';
            this.dateRange1 = '2020.01-2020.10';
            setTimeout(() => {
            }, 300);
            // this.dateRange4 = date;
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

<style lang="stylus" scoped>
    .pickerDate
        padding 40px
    .pickerDateTitle
        margin-top 36px
        margin-bottom 12px

</style>
