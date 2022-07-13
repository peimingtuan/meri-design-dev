<template>
    <div class="mSelect">
        <h3 class="components-title-h3">width + caption</h3>
        <MSelect
            width="180"
            caption="标题："
            v-model="sid"
            :clearHide="true"
            :data="selectData"
            :maxCount="6"
            :errorText="errorText"
            :errorShow="errorShow"
            @change="change"
        />
        <br><br><br>
        <MSelect
            width="180"
            caption="标题："
            :data="selectData2"
            @change="change"
        />
        <br><br><br>
        <MSelect
            width="300"
            :multiple="true"
            v-model="mid"
            :data="selectData3"
            @change="change3"
        />
    </div>
</template>

<script>
const selectData = [
    { id: '000', name: '000' },
    { id: '111', name: '111' },
    { id: '222', name: '222' },
    { id: '333', name: '333', disabled: true },
    { id: '444', name: '是第四  个这是 第四个啊啊 啊啊啊啊啊四个' },
    { id: '555', name: '555呀555' },
    { id: '666', name: '6666' },
    { id: '777', name: '77777' },
    { id: '888', name: '88888' }
];
const selectData2 = [
    { id: '000', name: '000' },
    { id: '111', name: '111' }
];
const selectData3 = [
    { id: '000', name: '000', checked: 'uncheck' },
    { id: '111', name: '111', checked: 'uncheck' },
    { id: '222', name: '222', checked: 'uncheck' },
    {
        id: '333', name: '333', disabled: true, checked: 'uncheck'
    },
    { id: '444', name: '是第四个这是第四个啊啊啊啊啊啊啊四个', checked: 'uncheck' },
    { id: '555', name: '555呀555', checked: 'uncheck' }
];

export default {
    name: 'MSelectView',
    data() {
        return {
            // sid: '222',
            sid: '',
            selectData: [],
            selectData2,
            mid: ['222', '444'],
            selectData3,
            errorText: '错误提示',
            errorShow: false
        };
    },
    mounted() {
        this.sid = '222';
        setTimeout(() => {
            this.selectData = selectData;
            this.errorText = '这是错误提示';
            this.errorShow = true;
        }, 3000);
    },
    watch: {
    },
    methods: {
        change(id, item) {
            console.log('change:::', id, item);
        },
        change3(ids, items) {
            console.log('change3:::', ids, items);
        }
    }
};
</script>

<style lang="stylus" scoped>
.mSelect
    padding 40px

</style>
