<template>
    <div>
        <div class="component component-padding">
             <h1 class="components-title">Dropdown组件</h1>
             <h3 class="components-title-h3">1</h3>
            <div>
                <Dropdown v-model="selVal" :data="dataSelect"
                          maxCount="5" @change="dropdownChange">
                    {{selText}}
                </Dropdown>
            </div>
             <h3 class="components-title-h3">2</h3>
            <div>
                <Dropdown v-model="selVal" :data="dataSelect" trigger="click" :openSearch="true" @change="dropdownChange">
                    <span class="text">{{selText}}</span>
                </Dropdown>
            </div>
            <div style="padding-right: 50px;text-align: right">
                 <h3 class="components-title-h3">3</h3>
                <Dropdown v-model="selVal" minWidth="120" maxWidth="240" :data="dataSelect2">
                    <span class="text">{{selText}}</span>
                </Dropdown>
            </div>

             <h3 class="components-title-h3">4</h3>
            <div>
                <Dropdown v-model="selVal" :data="dataSelect">
                    <span class="text">{{selText}}</span>
                </Dropdown>
            </div>
            <div style="padding-right: 10px;text-align: right">
                 <h3 class="components-title-h3">5</h3>
                <Dropdown v-model="selVal" minWidth="112" maxWidth="112" :data="dataSelect">
                    <span class="text">{{selText}}</span>
                </Dropdown>
            </div>

            <div style="font-size: 16px;">
                <br><br><br><br><br><br><br><br>
            </div>
            <div style="margin-left: 200px">
                <Dropdown v-model="selVal2" :data="dataSelect2">
                    <span class="avatar">
                        <img src="http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png" alt="">
                    </span>
                </Dropdown>
            </div>

             <h3 class="components-title-h3">暗色版</h3>
            <div style="background-color: #004375">
                <Dropdown v-model="selVal2" :data="dataSelect2" theme="dark">
                    <span class="avatar">
                        <img src="http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png" alt="">
                    </span>
                </Dropdown>
            </div>
            <br><br>
            <div style="background-color: #004375">
                <Dropdown v-model="selVal" :data="dataSelect" theme="dark" @change="dropdownChange">
                    <span class="text" style="color: #fff">{{selText}}</span>
                </Dropdown>
            </div>
            <br><br><br>
            <Button type="default" @click="openModal">打开弹窗</Button>

            <Modal
                    :show="modalStatusDefault"
                    title="弹窗提示"
                    mode="large"
                    @close="modalClose"
            >
                <template #content>
                    <div style="font-size: 20px; padding-left: 16px;padding-right: 16px;">
                        <br>
                        <Dropdown v-model="selVal" :data="dataSelect">
                            <span class="text">{{selText}}</span>
                        </Dropdown>
                        <br>
                        <div style="text-align: right">
                            <Dropdown v-model="selVal" :data="dataSelect">
                                <span class="text">{{selText}}</span>
                            </Dropdown>
                        </div>
                        <div>
                            <PickerDate :date="''" :range="true" sort="month" :quickSwitch="true" format="hms" @change="() => {}" />
                        </div>
                        <div style="text-align: right">
                            <PickerDate :date="''" :range="true" sort="month" :quickSwitch="true" format="hms" @change="() => {}" />
                        </div>

                        <br>
                        <PickerDate :date="''" @change="() => {}" />
                        123
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        456
                    </div>
                </template>
            </Modal>
        </div>
    </div>
</template>

<script>
const data = [
    { id: 'totalEnergy', name: '总量' },
    { id: 'singleParty', name: '单平米' },
    { id: 'lowerLevel', name: '下级分项' },
    { id: 'lowerLevel2', name: '下级分项2' },
    { id: 'lowerLevel3', name: '下级分项3' },
    { id: 'lowerLevel4', name: '下级分项4' },
    { id: 'lowerLevel45', name: '下级分项5' },
    { id: 'average', name: '滑动平均滑动平均滑动平均滑动平均', disabled: true },
    { id: 'lowerLevel451', name: '下级分项6' }
];
const data2 = [
    { id: 'totalEnergy', name: '总量' },
    { id: 'singleParty', name: '单平米' }
];

const data3 = [
    {
        id: 'id_xcxm',
        name: '新城项目',
        children: [
            {
                id: 'xincehng',
                url: 'http://47.95.122.141:8200/HedyLamarrFrontend/V2/index.html',
                name: '新城项目'
            }
        ]
    },
    {
        id: 'id_index',
        name: '首页',
        children: [
            {
                id: 'tencent',
                url: 'https://cloud.tencent.com',
                name: '腾讯云'
            },
            {
                id: 'animate',
                url: 'https://daneden.github.io/animate.css',
                name: 'animate',
                disabled: true
            },
            {
                id: 'aliyun',
                url: 'https://www.aliyun.com/',
                name: '阿里云'
            }
        ]
    }
];
export default {
    name: 'DropdownView',
    data() {
        return {
            selVal: '',
            selText: '',
            dataSelect: data,
            selVal2: 'totalEnergy',
            dataSelect2: data2,
            selValGroup: 'xincehng',
            selTextGroup: '新城项目',
            dataGroup: data3,
            modalStatusDefault: false
        };
    },
    watch: {
        selVal(n, o) {
            if (n === o) return;
            this.selText = this.dataSelect.find(d => d.id === n).name;
        }
    },
    mounted() {
        setTimeout(() => {
            this.selVal = 'totalEnergy';
            this.selText = '总量';
        }, 0);
    },
    methods: {
        dropdownChange(id, name) {
            console.log('dropdownChange::', id, name);
        },
        openModal() {
            this.modalStatusDefault = true;
        },
        modalClose() {
            this.modalStatusDefault = false;
        },
        modalConfirm() {
            console.log('alertConfirm');
        },

        groupChange({ cId, cName, pId }) {
            console.log(cId, cName, pId);
            this.selVal = cId;
            this.selText = cName;
        }
    }
};
</script>

<style lang="stylus" scoped>

.text
    font-size 14px
    color $grey-900
    line-height 16px

.avatar
    img
        border-radius 14px
        width 28px
        height @width

</style>
